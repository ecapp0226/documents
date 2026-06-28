const puppeteer = require('puppeteer')
const path = require('path')

async function capture() {
  const html = path.join(__dirname, 'order_history.html')
  const fileUrl = `file:///${path.resolve(html).replace(/\\/g, '/')}`

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(fileUrl, { waitUntil: 'networkidle0' })

  await page.screenshot({ path: path.join(__dirname, 'order_history_design.png'), fullPage: true })
  console.log('Captured: order_history_design.png')

  const main = await page.$('main')
  if (main) {
    await main.screenshot({ path: path.join(__dirname, 'order_history_main.png') })
    console.log('Captured: order_history_main.png')
  }

  await page.evaluate(() => {
    const el = document.getElementById('error-toast')
    if (el) el.classList.remove('hidden')
  })
  const toast = await page.$('#error-toast')
  if (toast) {
    await toast.screenshot({ path: path.join(__dirname, 'error_toast.png') })
    console.log('Captured: error_toast.png')
  }

  await browser.close()
}

capture()
