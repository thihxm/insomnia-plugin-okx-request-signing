const { generateSignature, createHtmlElementWith } = require('./utils')

const okxURLRegex = new RegExp('(okx.com)|(www.okc.com)')

// A request hook will be run before sending the request to API, but after everything else is finalized
module.exports.requestHooks = [
  async (context) => {
    const req = context.request

    // Validate URL
    if (
      !req.hasOwnProperty('getUrl') ||
      req['getUrl'] == null ||
      req['getUrl'].constructor.name != 'Function' ||
      !req.getUrl().match(okxURLRegex)
    ) {
      console.log('Not a OKX API URL')
      return
    }

    // Check for a valid api key config
    const config = req.getEnvironmentVariable('OKX_CONFIG')

    if (!config.API_KEY || !config.SECRET_KEY || !config.PASSPHRASE) {
      const { title, message } = require('./help')
      context.app.dialog(title, createHtmlElementWith(message))
      return
    }
    const { API_KEY, SECRET_KEY, PASSPHRASE } = config

    const body = req.getBody()
    let bodyText = req.getBodyText()
    if (body.mimeType === 'application/json') {
      bodyText = bodyText
    } else {
      bodyText = ''
    }

    const requestParams = req
      .getParameters()
      .reduce((path, param) => {
        path += `${param.name}=${param.value}&`
        return path
      }, '')
      .slice(0, -1)

    const urlPath =
      new URL(req.getUrl()).pathname +
      (requestParams.length > 0 ? `?${requestParams}` : '')

    const { timestamp, signature } = generateSignature(
      req.getMethod().toUpperCase(),
      urlPath,
      bodyText,
      SECRET_KEY
    )

    req.setHeader('OK-ACCESS-KEY', API_KEY)
    req.setHeader('OK-ACCESS-SIGN', signature)
    req.setHeader('OK-ACCESS-TIMESTAMP', timestamp)
    req.setHeader('OK-ACCESS-PASSPHRASE', PASSPHRASE)
  },
]
