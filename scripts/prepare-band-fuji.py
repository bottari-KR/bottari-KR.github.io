"""목록 페이지 제목 띠 배경 — 사용자가 준 목판화풍 그림(portpolio3.jpg, 736x946)에서 빨간 해를 지우고
(우리 산호색 원이 해 자리를 대신한다) 산·호수 구간을 잘라 2배로 키워 WebP 로 저장한다.

사용법: python scripts/prepare-band-fuji.py <원본 jpg 경로>
출력: public/media/band-fuji.webp (+ 같은 폴더에 band-fuji-preview.jpg 는 만들지 않는다 — 확인은 빌드 캡처로)
필요 패키지: numpy, Pillow.

해 지우기: 빨강이 강한(R-G, R-B 큰) 픽셀 덩어리를 찾아 몇 px 넓힌 마스크를 만들고, 그 자리를 왼쪽으로 떨어진 하늘
패치(같은 종이 질감)로 덮은 뒤 가장자리를 부드럽게 섞는다. 하늘이 거의 균일한 크림색이라 이 정도면 티가 안 난다.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

SRC = sys.argv[1]
OUT = 'public/media/band-fuji.webp'

im = Image.open(SRC).convert('RGB')
a = np.asarray(im).astype(np.float32)
H, W, _ = a.shape

# 1) 해 마스크 — 빨강 우세 픽셀
r, g, b = a[..., 0], a[..., 1], a[..., 2]
# 해는 진한 주홍(#e8603c 근처). 왼쪽 위 매화는 연분홍이라 g·b 상한으로 거르고, 탐색 영역도 오른쪽 위 하늘로 한정
red = (r > 190) & (g < 140) & (b < 120)
red[int(H * 0.35):, :] = False
red[:, : int(W * 0.55)] = False
ys, xs = np.nonzero(red)
if len(xs) == 0:
    raise SystemExit('해를 못 찾았다 — 임계값 확인')
cx, cy = xs.mean(), ys.mean()
rad = max(xs.max() - xs.min(), ys.max() - ys.min()) / 2
print(f'sun center=({cx:.0f},{cy:.0f}) r={rad:.0f}')

# 2) 마스크를 원으로 다시 그리고 6px 넓힘, 가장자리 6px 는 부드럽게
yy, xx = np.mgrid[0:H, 0:W]
d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
R = rad + 6
soft = np.clip((R + 6 - d) / 6, 0, 1)  # 1=안쪽, 0=바깥, 6px 램프

# 3) 덮을 패치 — 같은 높이의 왼쪽 하늘(해 지름의 3배만큼 떨어진 곳)에서 가져온다
shift = int(rad * 3.2)
patch = np.roll(a, shift, axis=1)  # 왼쪽 픽셀이 오른쪽으로 옴
out = a * (1 - soft[..., None]) + patch * soft[..., None]

# 4) 산·호수 구간 크롭(위 5% ~ 아래 74%) → 2배 확대(Lanczos) + 가벼운 샤픈
crop = out[int(H * 0.05):int(H * 0.74), :, :]
img = Image.fromarray(np.clip(crop, 0, 255).astype(np.uint8))
img = img.resize((img.width * 2, img.height * 2), Image.LANCZOS)
img = img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
img.save(OUT, quality=80, method=6)
import os
print(OUT, img.size, os.path.getsize(OUT), 'bytes')
