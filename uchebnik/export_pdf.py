#!/usr/bin/env python3
"""Build illustrated printable PDFs from existing standalone textbook.
Uses original website scripts and images; only creates files under uchebnik/pdf/.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from pypdf import PdfReader, PdfWriter
import tempfile, time, os, re, sys

ROOT=Path(__file__).resolve().parent.parent
BOOK=ROOT/"uchebnik"
OUTPUT=BOOK/"pdf"
OUT_NAMES={"lpk":"Drevo_otrasley_LPK.pdf","apk":"Drevo_otrasley_APK.pdf","mix":"Drevo_otrasley_Mezhotraslevoe.pdf","extra":"Drevo_otrasley_Spravochniki.pdf"}
GRP={
 "lpk":["lres","lprod","lproc","tech","real","uis","lfut","cyl","lreg"],
 "apk":["ares","aprod","aproc","atech","econ","auis","afut","cya","areg"],
 "mix":["mres","mprod","mproc","mtech","mmkt","muis","mfut","mcyc","mreg"],
 "extra":["tools","terms"]
}
SECTOR={"lpk":"Лесопромышленный комплекс","apk":"Агропромышленный комплекс","mix":"Межотраслевое взаимодействие","extra":"Справочные приложения"}
def log(*s): print(*s,flush=True)

def get_browser(playwright):
    return playwright.chromium.launch(headless=True,args=["--no-sandbox","--disable-dev-shm-usage","--allow-file-access-from-files"])

def run():
    assert (BOOK/"index.html").is_file()
    OUTPUT.mkdir(exist_ok=True)
    log("Root",ROOT)
    with sync_playwright() as p, tempfile.TemporaryDirectory() as tdir:
        browser=get_browser(p)
        context=browser.new_context(viewport={"width":1170,"height":950},device_scale_factor=1,accept_downloads=False)
        page=context.new_page()
        errors=[]
        page.on("pageerror",lambda err: errors.append(str(err)))
        page.goto((BOOK/"index.html").as_uri(),wait_until="load",timeout=120000)
        page.wait_for_selector('[data-chapter="lres"]',timeout=60000)
        stats=page.locator("#stats").inner_text()
        log("Book stats:",stats)
        if "27 глав" not in stats:
            raise RuntimeError("Bad book navigation: "+stats)
        for group,keys in GRP.items():
            files=[]
            for j,key in enumerate(keys):
                log("Printing",group,j+1,"/",len(keys),key)
                page.locator('[data-chapter="'+key+'"]').click(timeout=60000)
                page.wait_for_function("(key)=>document.body.dataset.activeChapter===key",arg=key,timeout=30000)
                page.evaluate("""() => {document.querySelectorAll('img').forEach(i=>{i.loading='eager';i.decoding='sync'});window.scrollTo(0,0)}""")
                nimgs=page.locator("#chapters img").count()
                # Decode loaded figures in batches, even if lazy attributes existed previously.
                page.evaluate("""async () => {
                  const images=Array.from(document.querySelectorAll('#chapters img'));
                  await Promise.all(images.map(img=>new Promise(resolve=>{
                    if(img.complete) return resolve();
                    img.addEventListener('load',resolve,{once:true});
                    img.addEventListener('error',resolve,{once:true});
                  })));
                }""")
                bad=page.evaluate("""()=>Array.from(document.querySelectorAll('#chapters img')).filter(x=>!x.naturalWidth).map(x=>x.src)""")
                if bad: log("WARN missing pictures",key,len(bad),bad[:3])
                file=Path(tdir)/f"{group}_{j:02}_{key}.pdf"
                page.pdf(path=str(file),format="A4",print_background=True,prefer_css_page_size=True,
                         margin={"top":"15mm","right":"15mm","bottom":"17mm","left":"15mm"},
                         display_header_footer=True,header_template="<span></span>",
                         footer_template='<div style="font-size:8px; width:100%;text-align:right;padding:0 15mm;color:#667266"><span class="pageNumber"></span></div>',
                         )
                n=PdfReader(file)
                files.append(file)
                log(" Done",len(n.pages),"pages,",nimgs,"images,",round(file.stat().st_size/1024/1024,2),"MiB")
            writer=PdfWriter()
            for f in files: writer.append(str(f))
            target=OUTPUT/OUT_NAMES[group]
            with target.open("wb") as stream:writer.write(stream)
            writer.close()
            pages=len(PdfReader(target).pages)
            log("VOLUME",group,pages,"pages",round(target.stat().st_size/1024/1024,2),"MiB",target)
            if target.stat().st_size>95_000_000:
                # GitHub limits individual files to 100MB. Publish chapter-level PDFs instead.
                log("WARN: oversized group; publishing separately numbered chapter PDFs")
                target.unlink()
                for i,file in enumerate(files):
                    title=keys[i]
                    (OUTPUT/f"Drevo_otrasley_{group}_{i+1:02}_{title}.pdf").write_bytes(file.read_bytes())
            page.goto((BOOK/"index.html").as_uri(),wait_until="load",timeout=120000)
            page.wait_for_selector('[data-chapter="lres"]',timeout=60000)
        log("BROWSER ERRORS:",errors[:10])
        browser.close()
    log("SUCCESS. PDFs:",[x.name for x in OUTPUT.glob("*.pdf")])
if __name__=="__main__":
    run()
