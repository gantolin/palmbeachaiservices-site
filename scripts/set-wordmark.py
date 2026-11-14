"""
Set the "West Palm Beach SEO" wordmark as outlines (rebrand, 2026-11-14) and write
brand/traced/wordmark.json, which scripts/make-assets.mjs turns into the logo files.
Font: Fraunces (OFL), soft corners, the closest free match to the original traced lettering.
Two even bold lines ("West Palm / Beach SEO") keep the original lockup's proportions.

Usage: uv run --with fonttools --with uharfbuzz --with skia-pathops python scripts/set-wordmark.py
"""
import json, os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont, OverlapMode
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import io

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, 'brand/source/Fraunces-variable.ttf')
OUT = os.path.join(ROOT, 'brand/traced/wordmark.json')

LINES = [
    ('West Palm', {'wght': 800, 'SOFT': 100, 'WONK': 0, 'opsz': 144}),
    ('Beach SEO', {'wght': 800, 'SOFT': 100, 'WONK': 0, 'opsz': 144}),
]
# Keep the original wordmark's top-left and total height so the pin spacing stays the same.
ORIG = {'x': 505.0, 'y': 254.0, 'height': 352.7}
LEADING = 1.26  # baseline-to-baseline distance as a multiple of cap height (measured from the original)


def instance(axes):
    f = TTFont(FONT)
    inst = instantiateVariableFont(f, axes, overlap=OverlapMode.REMOVE)  # merged outlines, so evenodd fill leaves no holes
    buf = io.BytesIO(); inst.save(buf)
    return inst, buf.getvalue()


def shape(text, data):
    face = hb.Face(data); font = hb.Font(face)
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(font, buf, {'kern': True, 'liga': True})
    return buf.glyph_infos, buf.glyph_positions


def draw(text, axes, baseline_y, pen_factory):
    font, data = instance(axes)
    gs = font.getGlyphSet(); order = font.getGlyphOrder()
    infos, poss = shape(text, data)
    x = 0
    for info, pos in zip(infos, poss):
        name = order[info.codepoint]
        # font units, y up -> flip to y down
        gs[name].draw(TransformPen(pen_factory(), (1, 0, 0, -1, x + pos.x_offset, baseline_y - pos.y_offset)))
        x += pos.x_advance
    return font


base_font = TTFont(FONT)
cap = base_font['OS/2'].sCapHeight
baselines = [0, round(cap * LEADING)]

# Pass 1: bounds
bp = BoundsPen(None)
for (text, axes), by in zip(LINES, baselines):
    draw(text, axes, by, lambda: bp)
xmin, ymin, xmax, ymax = bp.bounds
scale = ORIG['height'] / (ymax - ymin)

# Pass 2: path, normalized to (0,0) and scaled
sp = SVGPathPen(None, ntos=lambda v: f'{v:.1f}')
t = (scale, 0, 0, scale, -xmin * scale, -ymin * scale)
for (text, axes), by in zip(LINES, baselines):
    draw(text, axes, by, lambda: TransformPen(sp, t))

w = round((xmax - xmin) * scale, 1)
json.dump({'d': sp.getCommands(), 'width': w, 'height': ORIG['height'], 'x': ORIG['x'], 'y': ORIG['y']},
          open(OUT, 'w'))
print('wordmark written', {'width': w, 'height': ORIG['height']})
