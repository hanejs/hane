
export default class HaneTheme {
  static register(renderClass) {
    hane.runtime.theme = new renderClass()
  }
  constructor(options) {
    this.config = {}
    this.options = options
    this.data = {}
    this.initialContentType = 'index'
  }
  setContenType(v) {
    this.initialContentType = v
  }
  render(data) {
    this.data = data || {}
    return ''
  }
}
