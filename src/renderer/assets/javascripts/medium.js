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
  parent.scrollTop = parent.scrollHeight
  setTimeout(() => {
    parent.scrollTop = parent.scrollHeight
  }, 0)
}

global.focusAndSelectEnd = function (editor) {
  editor.focus()
  const range = document.createRange()
  range.selectNodeContents(editor.lastElementChild || editor)
  range.collapse(false)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)

  scrollEditorToBottom(editor)
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

global.insertTab = function () {
  const selection = document.getSelection()
  const range     = selection.getRangeAt(0)
  const tabNode   = document.createTextNode("\u2003")

  range.insertNode(tabNode);

  range.setStartAfter(tabNode);
  range.setEndAfter(tabNode);
  selection.removeAllRanges();
  selection.addRange(range);
}
