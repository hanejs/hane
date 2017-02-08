'use strict'

const fs = require('fs-extra-promise')
const path = require('path')
const beautify_html = require('js-beautify').html
require('./lib')

hane.readConfig()
require('../hane-render-markdown')
require('../hane-theme-simple')

const distPath = path.join(__dirname, '../dist')

async function main() {
  const { render, theme } = hane.runtime
  const result = await render.feed('# Render test')
  let html = await theme.render({
    categories: [],
    items: [
      {
        title: 'Hello World',
        content: result,
        pubDate: new Date().toString(),
      },
    ],
    tags: [],
  })
  if (hane.config.theme.beautify) {
    html = beautify_html(html, { indent_size: 2 })
  }
  try {
    await fs.mkdirAsync(distPath)
  } catch (e) {}
  await fs.writeFileAsync(path.join(distPath, 'index.html'), html)
  console.log('done')
}

main()
