const puppeteer = require('puppeteer')
const path = require('path')

async function capture() {
  const html = path.join(__dirname, '../../../../../projects/ph1/docs/画面要求/top/top.html')
  const fileUrl = `file:///${path.resolve(html).replace(/\\/g, '/')}`

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(fileUrl, { waitUntil: 'networkidle0' })

  await page.screenshot({ path: path.join(__dirname, 'top_design.png'), fullPage: true })
  console.log('Captured: top_design.png')

  const parts = [
    { selector: 'header.sticky', name: 'header.png' },
    { selector: 'section:nth-of-type(1)', name: 'hero_banner.png' },
    { selector: 'section:nth-of-type(2)', name: 'recommended.png' },
    { selector: 'section:nth-of-type(3)', name: 'new_arrivals.png' },
    { selector: 'footer', name: 'footer.png' },
  ]

  for (const { selector, name } of parts) {
    const el = await page.$(selector)
    if (el) {
      await el.screenshot({ path: path.join(__dirname, name) })
      console.log(`Captured: ${name}`)
    }
  }

  await browser.close()
}

capture()
