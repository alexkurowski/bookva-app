import sanitizeHtml from 'sanitize-html'

export const txt2html = function (text) {
  return sanitizeHtml(text, {
      allowedTags: [],
      allowedAttributes: []
    })
    .replace(/\r\n?/g, "\n")
    .split(/\n/)
    .map(paragraph => {
      if (/^\s*$/.test(paragraph))
        return '<p><br></p>'
      else
        return `<p>${ paragraph }</p>`
    })
    .join('')
}
