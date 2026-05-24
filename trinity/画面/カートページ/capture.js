const puppeteer = require('puppeteer')
const path = require('path')

async function capture() {
  const html = 'c:/Users/saki0/git/projects/ph1/docs/画面要求/かご/cart.html'
  const fileUrl = `file:///${path.resolve(html).replace(/\\/g, '/')}`

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(fileUrl, { waitUntil: 'networkidle0' })

  await page.screenshot({ path: path.join(__dirname, 'cart_design.png'), fullPage: true })
  console.log('Captured: cart_design.png')

  const main = await page.$('main')
  if (main) {
    await main.screenshot({ path: path.join(__dirname, 'cart_main.png') })
    console.log('Captured: cart_main.png')
  }

  await browser.close()
}

capture()
