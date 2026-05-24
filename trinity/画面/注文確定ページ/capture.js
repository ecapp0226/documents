const puppeteer = require('puppeteer')
const path = require('path')

async function capture() {
  const html = path.join(__dirname, '../../../../../projects/ph1/docs/画面要求/購入確認/checkout.html')
  const fileUrl = `file:///${path.resolve(html).replace(/\\/g, '/')}`

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(fileUrl, { waitUntil: 'networkidle0' })

  await page.screenshot({ path: path.join(__dirname, 'checkout_design.png'), fullPage: true })
  console.log('Captured: checkout_design.png')

  const main = await page.$('main')
  if (main) {
    await main.screenshot({ path: path.join(__dirname, 'checkout_main.png') })
    console.log('Captured: checkout_main.png')
  }

  const orderDetail = await page.$('.bg-white.rounded-xl.shadow-sm.overflow-hidden')
  if (orderDetail) {
    await orderDetail.screenshot({ path: path.join(__dirname, 'order_detail.png') })
    console.log('Captured: order_detail.png')
  }

  const errorCards = await page.$$('.bg-red-50')
  if (errorCards[0]) {
    await errorCards[0].screenshot({ path: path.join(__dirname, 'order_error_product.png') })
    console.log('Captured: order_error_product.png')
  }
  if (errorCards[1]) {
    await errorCards[1].screenshot({ path: path.join(__dirname, 'order_error_system.png') })
    console.log('Captured: order_error_system.png')
  }

  const completionCards = await page.$$('.bg-white.rounded-xl.shadow-sm:not(.overflow-hidden)')
  if (completionCards[0]) {
    await completionCards[0].screenshot({ path: path.join(__dirname, 'order_complete.png') })
    console.log('Captured: order_complete.png')
  }

  await browser.close()
}

capture()
