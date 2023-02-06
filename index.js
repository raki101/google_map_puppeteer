const puppeteer = require('puppeteer');

async function parse(page){
    let places = [];

    const elements = await page.$$('.fontHeadlineSmall span');
    if(elements && elements.length)
    {
        for(const el of elements)
        {
            const name = await  el.evaluate(span => span.textContent);
            places.push({name})
        }
    }
    return places;
}
async function start(){
    const browser = await puppeteer.launch({headless:false});
    const page =  await browser.newPage();

    await page.setViewport({
        width:1300,
        height:900
    })

    await page.goto("https://www.google.com/maps/search/sushi/@13.0086135,80.1858472,11z");
    await page.screenshot({path:"amazing.png"})
    const places = await parse(page)
    console.log(places)

}
//qBF1Pd fontHeadlineSmall
start();
