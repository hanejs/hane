
require('./lib')

hane.readConfig()
require('../hane-render-markdown')
require('../hane-theme-simple')

async function main() {
  const { render, theme } = hane.runtime
  const result = await render.feed('# Render test')
  const html = await theme.render({
    categories: [],
    items: [
      {
        title: 'Hello World',
        content: result,
        pubDate: new Date().toString(),
      }
    ],
    tags: [],
  })
  console.log(html)
}

main()
