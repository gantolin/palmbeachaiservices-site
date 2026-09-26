"""
Vectorize the supplied logo PNG (brand/source/*.png) into clean SVG paths with potrace.
Outputs brand/traced/{mark,wordmark}.json: path data + viewBox, consumed by scripts/make-assets.mjs
and src/components/ui/Logo.astro.

Usage: python3 -m venv .venv && .venv/bin/pip install potracer pillow numpy
       .venv/bin/python scripts/trace-logo.py
"""
import json, os
import numpy as np
from PIL import Image
import potrace

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'brand/source/palm-beach-ai-services-logo-original.png')
OUT = os.path.join(ROOT, 'brand/traced')
os.makedirs(OUT, exist_ok=True)
SCALE = 3  # upsample before thresholding for smoother curves

im = Image.open(SRC).convert('L')
# white artwork sits on the navy plate: crop inside the plate (measured: x 40..1733, y 165..696)
plate = (60, 185, 1713, 676)
im = im.crop(plate)
big = im.resize((im.width * SCALE, im.height * SCALE), Image.LANCZOS)
arr = np.array(big) > 150  # True = white artwork

def trace(region, name):
    x0, x1 = region
    sub = arr[:, x0 * SCALE:x1 * SCALE]
    ys, xs = np.where(sub)
    top, left = ys.min(), xs.min()
    sub = sub[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = sub.shape
    # potracer fills the "dark" (False) pixels, so invert: artwork must be False
    bm = potrace.Bitmap(~sub)
    plist = bm.trace(turdsize=20, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.0, opticurve=True, opttolerance=0.2)
    s = 1 / SCALE
    f = lambda p: f"{p.x * s:.1f} {p.y * s:.1f}"
    d = []
    for curve in plist:
        d.append(f"M{f(curve.start_point)}")
        for seg in curve.segments:
            if seg.is_corner:
                d.append(f"L{f(seg.c)}L{f(seg.end_point)}")
            else:
                d.append(f"C{f(seg.c1)} {f(seg.c2)} {f(seg.end_point)}")
        d.append('Z')
    # x/y: top-left of this artwork in original-PNG pixels, so the lockup keeps the original spacing
    data = {'d': ''.join(d), 'width': round(w * s, 1), 'height': round(h * s, 1),
            'x': round(plate[0] + x0 + left * s, 1), 'y': round(plate[1] + top * s, 1)}
    json.dump(data, open(os.path.join(OUT, f'{name}.json'), 'w'))
    print(name, data['width'], data['height'], len(data['d']))

# columns measured on the original: mark 148..466, text 505..1687 (minus plate x offset 60)
trace((148 - 60 - 4, 466 - 60 + 6), 'mark')
trace((505 - 60 - 4, 1687 - 60 + 6), 'wordmark')
