const puppeteer = require('puppeteer')
const path = require('path')

async function capture() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  // 商品詳細
  const html = 'c:/Users/saki0/git/projects/ph1/docs/画面要求/商品詳細/product_detail.html'
  await page.goto(`file:///${path.resolve(html).replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' })

  await page.screenshot({ path: path.join(__dirname, 'product_detail_design.png'), fullPage: true })
  console.log('Captured: product_detail_design.png')

  const breadcrumb = await page.$('nav')
  if (breadcrumb) {
    await breadcrumb.screenshot({ path: path.join(__dirname, 'breadcrumb.png') })
    console.log('Captured: breadcrumb.png')
  }

  const mainGrid = await page.$('.grid')
  if (mainGrid) {
    await mainGrid.screenshot({ path: path.join(__dirname, 'product_main.png') })
    console.log('Captured: product_main.png')
  }

  const toast = await page.$('.fixed.top-20')
  if (toast) {
    await toast.screenshot({ path: path.join(__dirname, 'toast.png') })
    console.log('Captured: toast.png')
  }

  // エラー画面
  const errorHtml = 'c:/Users/saki0/git/projects/ph1/docs/画面要求/エラー/error.html'
  await page.goto(`file:///${path.resolve(errorHtml).replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' })

  await page.screenshot({ path: path.join(__dirname, 'error_design.png'), fullPage: true })
  console.log('Captured: error_design.png')

  const cards = await page.$$('.bg-white.rounded-2xl')
  if (cards[0]) {
    await cards[0].screenshot({ path: path.join(__dirname, 'error_404.png') })
    console.log('Captured: error_404.png')
  }
  if (cards[1]) {
    await cards[1].screenshot({ path: path.join(__dirname, 'error_500.png') })
    console.log('Captured: error_500.png')
  }

  await browser.close()
}

capture()
