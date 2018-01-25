// Referring to the table here:
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/regexp
// these characters should be escaped
// \ ^ $ * + ? . ( ) | { } [ ]
// These characters only have special meaning inside of brackets
// they do not need to be escaped, but they MAY be escaped
// without any adverse effects (to the best of my knowledge and casual testing)
// : ! , =
// my test "~!@#$%^&*(){}[]`/=?+\|-_;:'\",<.>".match(/[\#]/g)

const specials = [
  "-",
  "[",
  "]",
  "/",
  "{",
  "}",
  "(",
  ")",
  "*",
  "+",
  "?",
  ".",
  "\\",
  "^",
  "$",
  "|",
]

const html = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;',
}

const regex = RegExp('[' + specials.join('\\') + ']', 'g')

function escapeHtml (str) {
  return str.replace(/[&<>"']/g, (ch) => html[ch])
}

export default function (str) {
  return escapeHtml(str).replace(regex, "\\$&")
}
