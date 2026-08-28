"""홈 히어로의 산호색 그레인 원을 직접 렌더한다 — 레퍼런스 픽셀은 쓰지 않고 실측 수치(형태·가장자리·색·노이즈)만 쓴다.

실측(1400px 레퍼런스, analyze.py): 타원 584x417px, 장축이 왼쪽 위→오른쪽 아래로 37도 기울어짐, 왼쪽·왼쪽 위는
가장자리가 짧고(지름의 ~12%) 오른쪽·오른쪽 아래는 길게 번짐(~35%), 속 #f36255 → 중간 #f2877d → 가장자리 #f5a89e,
밝기 노이즈 표준편차 속 8 / 가장자리 12.5 (0..255).

사용법: python scripts/render-hero-blob.py [한 변 px, 기본 1200] [dark]
       → 현재 폴더에 hero-blob(.png/.webp) 또는 hero-blob-dark(.png/.webp) + preview-*.jpg.
       webp 를 public/media/ 로 복사한다(Hero.astro 의 <picture> 가 라이트/다크를 고른다). 필요 패키지: numpy, Pillow.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

S = int(sys.argv[1]) if len(sys.argv) > 1 else 1200
DARK = len(sys.argv) > 2 and sys.argv[2] == 'dark'  # 다크 배경용 — 번짐 쪽이 흰 분홍으로 밝아지면 검정 위에서 후광이 돼서 진한 산호로
SEED = 7
NAME = 'hero-blob-dark' if DARK else 'hero-blob'


def smoothstep(t):
    t = np.clip(t, 0.0, 1.0)
    return t * t * (3 - 2 * t)


def blur(arr, radius):
    """float 2D 배열 가우시안 블러 (PIL 경유, -1..1 범위 가정)"""
    im = Image.fromarray(((np.clip(arr, -1, 1) + 1) * 127.5).astype(np.uint8))
    out = np.asarray(im.filter(ImageFilter.GaussianBlur(radius))).astype(np.float32) / 127.5 - 1
    return out


yy, xx = np.mgrid[0:S, 0:S].astype(np.float32)
cx, cy = S * 0.47, S * 0.49
x = (xx - cx) / S
y = (yy - cy) / S

# 타원 좌표 — 장축을 37도 기울인다(화면 기준 왼쪽 위 → 오른쪽 아래)
th = np.radians(37)
u = x * np.cos(th) + y * np.sin(th)
v = -x * np.sin(th) + y * np.cos(th)
A, B = 0.30, 0.30  # 반지름(캔버스 비율). 이 경계가 "본색이 끝나는 선". 레퍼런스는 원 — 타원(0.355/0.295)은
                   # 사용자가 "휘어졌다"로 기각(2026-08-28). 모멘트 실측의 584x417 은 번짐 비대칭이 섞인 값이었다.
rho = np.sqrt((u / A) ** 2 + (v / B) ** 2)

# 방향별 번짐 폭 — 오른쪽 위(1~2시)로 갈수록 길게, 왼쪽·아래는 짧고 또렷하게
ang = np.arctan2(y, x)
soft = (1 + np.cos(ang - np.radians(-35))) / 2  # 1 = 가장 부드러운 방향
soft = soft ** 1.6
w_in = 0.018 + 0.12 * soft
w_out = 0.008 + 0.42 * soft
t = (rho - (1 - w_in)) / (w_in + w_out)
alpha = 1 - smoothstep(t)

# 색 — 진한 속은 왼쪽 아래로 치우쳐 있다(실측). 색용 반지름은 중심을 조금 옮겨 계산
xc = (xx - (cx - 0.05 * S)) / S
yc = (yy - (cy + 0.03 * S)) / S
uc = xc * np.cos(th) + yc * np.sin(th)
vc = -xc * np.sin(th) + yc * np.cos(th)
rc = np.sqrt((uc / A) ** 2 + (vc / B) ** 2)
core = np.array([0xF3, 0x5E, 0x50], np.float32)
mid = np.array([0xF3, 0x7E, 0x72], np.float32)
edge = np.array([0xF9, 0xC6, 0xBE], np.float32)  # 번짐 쪽은 흰 분홍으로 밝아진다(회색으로 죽지 않게)
if DARK:
    core = np.array([0xEE, 0x5A, 0x4C], np.float32)
    mid = np.array([0xE2, 0x66, 0x5A], np.float32)
    edge = np.array([0xA8, 0x4A, 0x42], np.float32)
g1 = smoothstep(rc / 1.05)[..., None]
g2 = smoothstep((rc - 0.95) / 0.45)[..., None]
rgb = core * (1 - g1) + mid * g1
rgb = rgb * (1 - g2) + edge * g2

# 그레인 — 밝기 노이즈(속 8, 가장자리 12.5). 축소 표시돼도 남게 아주 살짝 저역 통과
rng = np.random.default_rng(SEED)
n1 = rng.normal(0, 1, (S, S)).astype(np.float32)
n1 = 0.75 * n1 + 0.25 * blur(n1 * 0.5, 1) * 2
edge_w = smoothstep(1 - np.abs(alpha - 0.5) * 2)  # 가장자리(alpha≈0.5)에서 1
sigma = 11.0 + 6.0 * edge_w
rgb = rgb + (n1 * sigma)[..., None]

# 가장자리 흩어짐 — 알파에 노이즈를 섞어 번짐이 디더처럼 보이게. 조금 굵은 알갱이
n2 = blur(rng.normal(0, 1, (S, S)).astype(np.float32) * 0.5, 1.0) * 2
alpha = alpha + n2 * 0.14 * edge_w

rgb = np.clip(rgb, 0, 255)
alpha = np.clip(alpha, 0, 1)
out = np.dstack([rgb, alpha[..., None] * 255]).astype(np.uint8)
im = Image.fromarray(out, 'RGBA')
im.save(f'{NAME}.png', optimize=True)
im.save(f'{NAME}.webp', quality=82, method=6)

# 미리보기 — 히어로 배경색 위에 얹어 본다
bg = Image.new('RGBA', (S, S), (0x15, 0x15, 0x16, 255) if DARK else (0xEF, 0xEF, 0xEF, 255))
prev = Image.alpha_composite(bg, im).convert('RGB')
prev.save(f'preview-{NAME}.jpg', quality=88)
import os
print(NAME, 'png', os.path.getsize(f'{NAME}.png'), 'webp', os.path.getsize(f'{NAME}.webp'))
nz = np.nonzero(alpha > 0.1)
print('visible extent x', nz[1].min() / S, nz[1].max() / S, 'y', nz[0].min() / S, nz[0].max() / S)
