"""One-time migration used for the navy rebrand (green -> navy). Kept for reference; safe to re-run (idempotent)."""
import re, os
hexmap = {
 '0f1f14':'030e1d','132719':'05152a','1b3420':'061f3f','274a2d':'062d59','355e3b':'0e3d72','3b6a42':'1a4d88',
 '447a4c':'2b609e','8db594':'8ea9cb','ddeadf':'dce5f1','f1f6f1':'eef3f9','0b150e':'020a15','1c2420':'121a26',
 '5b665f':'525c6b','e9e4d6':'e6e9f0','a9b8ad':'9fb0c7','34403a':'2a3444','8a948d':'858f9e','e9efe6':'e9eef5','dfe8dc':'dfe6f0',
}
rgbmap = {
 (53,94,59):(30,84,148),(68,122,76):(43,96,158),(15,31,20):(3,14,29),(27,52,32):(6,31,63),(19,39,25):(5,21,42),
 (141,181,148):(142,169,203),(233,228,214):(230,233,240),
}
files=['astro.config.mjs']
for base in ['src','scripts','public']:
    for dp,dn,fn in os.walk(base):
        for f in fn:
            if f.endswith(('.astro','.ts','.css','.mjs','.js','.svg','.webmanifest')) :
                files.append(os.path.join(dp,f))
for p in files:
    s=open(p).read(); o=s
    def hx(m):
        v=m.group(1).lower()
        if v in hexmap:
            r=hexmap[v]; return '#'+(r.upper() if m.group(1).isupper() else r)
        return m.group(0)
    s=re.sub(r'#([0-9a-fA-F]{6})\b',hx,s)
    def rg(m):
        t=tuple(int(x) for x in re.split(r'\s*,\s*',m.group(1)))
        if t in rgbmap:
            sep=', ' if ', ' in m.group(0) else ','
            return 'rgba('+sep.join(map(str,rgbmap[t]))+sep+m.group(2)+')'
        return m.group(0)
    s=re.sub(r'rgba\((\d+\s*,\s*\d+\s*,\s*\d+)\s*,\s*([0-9.]+)\)',rg,s)
    s=s.replace('evergreen','navy').replace('Evergreen','Navy').replace('btn-green','btn-navy')
    s=s.replace('highlight in green','highlight in the accent color')
    if s!=o:
        open(p,'w').write(s); print('updated',p)
