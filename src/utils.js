const crypto = require('crypto')

const generateSignature = (method, path, bodyString, secret) => {
  const timestamp = new Date().toISOString()
  const prehash = timestamp + method + path + bodyString

  const signature = crypto
    .createHmac('sha256', secret)
    .update(prehash)
    .digest('base64')

  return { timestamp, signature }
}

const createHtmlElementWith = (content) => {
  const element = document.createElement('div')
  element.innerHTML = content
  return element
}

module.exports = {
  generateSignature,
  createHtmlElementWith,
}
