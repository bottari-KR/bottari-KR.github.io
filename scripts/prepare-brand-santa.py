"""헤더 브랜드 마크 — 사용자가 준 산타 사진(흰 배경 JPG)에서 배경을 지워 작은 투명 WebP 로 만든다.

    python scripts/prepare-brand-santa.py <입력 jpg> [출력 높이 px=128]

배경 제거는 모서리에서 시작하는 flood fill(거의 흰 픽셀만) — 산타의 흰 털이 배경과 맞닿은 가장자리는 조금 먹히지만
헤더 높이 1.35em(≈27px)에서는 보이지 않는다. 가장자리는 1px 부드럽게. 결과: public/media/brand-santa.webp
"""
import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

src = Path(sys.argv[1])
height = int(sys.argv[2]) if len(sys.argv) > 2 else 128
out = Path(__file__).resolve().parent.parent / 'public' / 'media' / 'brand-santa.webp'

im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(np.int16)
h, w, _ = a.shape
near_white = a.min(axis=2) > 236  # 세 채널 다 밝아야 배경 후보

bg = np.zeros((h, w), dtype=bool)
q = deque()
for y, x in [(0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1), (0, w // 2), (h - 1, w // 2), (h // 2, 0), (h // 2, w - 1)]:
    if near_white[y, x] and not bg[y, x]:
        bg[y, x] = True
        q.append((y, x))
while q:
    y, x = q.popleft()
    for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
        if 0 <= ny < h and 0 <= nx < w and not bg[ny, nx] and near_white[ny, nx]:
            bg[ny, nx] = True
            q.append((ny, nx))

alpha = Image.fromarray(np.where(bg, 0, 255).astype(np.uint8))
alpha = alpha.filter(ImageFilter.GaussianBlur(0.8))
rgba = im.copy()
rgba.putalpha(alpha)

bbox = alpha.getbbox()
rgba = rgba.crop(bbox)
pad = int(rgba.height * 0.04)
canvas = Image.new('RGBA', (rgba.width + 2 * pad, rgba.height + 2 * pad), (0, 0, 0, 0))
canvas.paste(rgba, (pad, pad))
scale = height / canvas.height
canvas = canvas.resize((round(canvas.width * scale), height), Image.LANCZOS)
out.parent.mkdir(parents=True, exist_ok=True)
canvas.save(out, 'WEBP', quality=92, method=6)
print(f'{out} {canvas.size} {out.stat().st_size} bytes, bg pixels {int(bg.sum())}/{h * w}')
