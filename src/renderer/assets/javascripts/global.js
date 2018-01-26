import { Application } from '@/helpers/store_helper'
import sanitizeRegexp from '@/helpers/regexp_escape'

document.addEventListener('DOMContentLoaded', () => {
  document.body.ondragstart = (event) => {
    if ( !event.target.className )
      return false

    if ( event.target.className.indexOf('entry') == -1 )
      return false
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key == 'F11')
    document.getElementById('fullscreen-toggle').click()
})

global.resetEditors = function () {
  setTimeout(() => {
    document
      .querySelectorAll('.medium-editor')
      .forEach(editor => {
        editor.__vue__.reset()
        if ( editor.innerText.replace(/\n| /, '') )
          editor.classList.remove('medium-editor-placeholder')
        else
          editor.classList.add('medium-editor-placeholder')
      })
  }, 0)
}

global.searchBarFocus = function () {
  setTimeout(() => {
    const searchInput = document.querySelector('#search-bar input')
    if (searchInput)
      searchInput.focus()
  }, 0)
}

global.searchBarOnHide = function () {
  const searchInput = document.querySelector('#search-bar input')
  if (searchInput)
    searchInput.value = ""
}

global.stripSearch = function (html) {
  return html.replace(/<span class="search">(.*?)<\/span>/g, '$1')
}

global.removeSearch = function (content) {
  const searches = content.querySelectorAll('span.search')
  if (searches.length == 0) return

  const selection       = document.getSelection()
  const contentSelected = content.contains(selection.anchorNode)

  const anchorNode   = selection.anchorNode
  const anchorOffset = selection.anchorOffset
  const focusNode    = selection.focusNode
  const focusOffset  = selection.focusOffset

  searches.forEach(search => {
    const parentNode = search.parentNode
    if (!parentNode) return
    parentNode.insertBefore(search.firstChild, search)
    parentNode.removeChild(search)
  })

  if (contentSelected) {
    const range = document.createRange()
    range.setStart(anchorNode, anchorOffset)
    range.setEnd(focusNode, focusOffset)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

global.removeAllSearch = function () {
  document
    .querySelectorAll('.medium-content')
    .forEach(content => removeSearch(content))
}

global.applySearch = function (searchFor) {
  removeAllSearch()

  if (searchFor.length <= 1) return

  const content =
    document.querySelector(
      `.medium-content.medium-editor-index-${ Application.lastPaneFocused }`
    )

  if (!content) return

  const lookahead = "(?=[^>]*<)" // Check that there is a tag openning and no tag closing (i.e. we're not inside a tag)
  const regex = new RegExp(`(${ sanitizeRegexp(searchFor) })${ lookahead }`, 'g')

  const result =
    content
      .innerHTML
      .replace(regex, '<span class="search">$1</span>')

  content.innerHTML = result
}
