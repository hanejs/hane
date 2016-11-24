
export default class HaneRender {
  static register(renderClass) {
    hane.runtime.render = new renderClass()
  }
  constructor() {
    this.name = 'HaneRender'
    this.config = hane.config.render
  }
  feed(str) {
    // prototype of feed method
    return new Promise((resolve, reject) => {
      resolve(str)
    })
  }
  get validConfigFields() {
    // valid config fields from user config
    return []
  }
  getConfig() {
    const opts = {}
    // overwritten by user config
    for (let k of this.validConfigFields) {
      if (k in this.config) {
        opts[k] = this.config[k]
      }
    }
    return opts
  }
}
