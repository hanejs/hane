
require('./lib')

hane.readConfig()
require('../hane-render-markdown')

hane.runtime.render.feed('# Render test')
  .then(result => {
    console.log(result)
  })
