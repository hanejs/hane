
global.Promise = require('bluebird')

import HaneConfig from '../../hane-config'
import HaneRender from './render'
import HaneTheme from './theme'

function readConfig(root) {
  hane.config = new HaneConfig(root)
}

global.hane = {
  Theme: HaneTheme,
  Render: HaneRender,
  readConfig,
  runtime: {},
}
