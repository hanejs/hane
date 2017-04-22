
import htmlparser from 'htmlparser2'

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
  getShortIntroduction(html) {
    let sintro = ''
    let stext = ''
    let depth = 0
    let enough = false
    const parser = new htmlparser.Parser({
      onopentag: function (name, attribs) {
        if (enough) {
          return
        }
        depth++
        let openTag = '<' + name
        if (attribs && Object.keys(attribs).length > 0) {
          for (const key in attribs) {
            openTag += ' ' + key + '=' + JSON.stringify(attribs[key])
          }
        }
        if (name !== 'img') {
          openTag += '>'
        } else {
          stext += openTag
        }
        sintro += openTag
      },
      ontext: function (text) {
        if (enough) {
          return
        }
        const lines = text.split('\n')
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i] + (i < lines.length - 1 ? '\n' : '')
          stext += line
          sintro += line
          if (depth <= 0 && stext.length >= 80) {
            enough = true
            break
          }
        }
      },
      onclosetag: function (name) {
        if (enough) {
          return
        }
        depth--
        if (name === 'img') {
          sintro += ' />'
          stext += ' />'
        } else {
          sintro += '</' + name + '>'
        }
        if (depth <= 0 && stext.length >= 80) {
          enough = true
        }
      }
    }, { decodeEntities: false })
    parser.write(html)
    parser.end()
    return sintro
  }
  render(data) {
    this.data = data || {}
    return ''
  }
}
