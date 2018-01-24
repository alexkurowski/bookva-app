import sanitizeHtml from 'sanitize-html'

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

global.removeSearch = function () {
  const content = document.querySelector('.medium-content')
  const anySearch = content.innerHTML.indexOf('<span class="search">') != -1

  // TODO (Alex): if content is focused, we have to keep the caret at the same place.
  //              right now it jumps to the beginning of the content

  if (anySearch)
    content.innerHTML = stripSearch(content.innerHTML)
}

global.applySearch = function (searchFor) {
  removeSearch()

  if (searchFor.length <= 1) return

  const content = document.querySelector('.medium-content')
  const lookahead = "(?=[^>]*<)" // Check that there is a tag openning and no tag closing (i.e. we're not inside a tag)
  const regex = new RegExp(`${ sanitizeHtml(searchFor) }${ lookahead }`, 'g')

  const result =
    content
      .innerHTML
      .replace(regex, `<span class="search">${ searchFor }</span>`)
  console.log("SEARCH RESULT HTML:", result)

  content.innerHTML = result
}
