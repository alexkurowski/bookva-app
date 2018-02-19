import { Application } from '@/helpers/store_helper'

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

global.scrollEditorToBottom = function (editor) {
  const parent = editor.closest('.pane')
  setTimeout(() => {
    parent.scrollTop = parent.scrollHeight
  }, 0)
}

global.focusAndSelectEnd = function (el) {
  el.focus()
  const range = document.createRange()
  range.selectNodeContents(el.lastElementChild || el)
  range.collapse(false)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)

  scrollEditorToBottom(el)
}

global.resetSelection = function () {
  const content =
    document.querySelector(
      `.medium-content.medium-editor-index-${ Application.lastPaneFocused }`
    )

  focusAndSelectEnd(content)
}

global.stripSearch = function (html) {
  return html.replace(/<span class="search">(.*?)<\/span>/g, '$1')
}
