import { Application, Search } from '@/helpers/store_helper'
import sanitizeRegexp from '@/helpers/regexp_escape'

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

/**
 * Remove all occurances of `<span class="search">` in a
 * given `content`, and try to preserve selection`
 */
global.removeSearch = function (content) {
  const searches = content.querySelectorAll('span.search')
  if (searches.length == 0) return

  const selection       = document.getSelection()
  const contentSelected = content.contains(selection.anchorNode)

  let anchorNode   = selection.anchorNode
  let anchorOffset = selection.anchorOffset
  let focusNode    = selection.focusNode
  let focusOffset  = selection.focusOffset

  if ( anchorNode &&
       anchorNode.classList &&
       anchorNode.classList.contains('search') ) {
    anchorNode = anchorNode.childNodes[0]
    anchorOffset = 0
  }

  if ( focusNode &&
       focusNode.classList &&
       focusNode.classList.contains('search') ) {
    focusNode = focusNode.childNodes[0]
    focusOffset = 0
  }

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

/**
 * Search last focused content for `searchFor` string
 * and replaces it with `<span class="search">${ searchFor }</span>`
 * all safe and sanitized.
 */
global.applySearch = function () {
  removeAllSearch()

  const searchInput = document.getElementById('search-input')
  if (!searchInput) return

  const searchFor = searchInput.value
  if (!searchFor || searchFor.length <= 1) return

  const lastPane =
    document.querySelector(
      `.medium-content.medium-editor-index-${ Application.lastPaneFocused }`
    )
  const firstPane =
    document.querySelector('.medium-content')

  const content =
    lastPane || firstPane

  if (!content) return

  const lookahead = "(?=[^>]*<)" // Check that there is a tag openning and no tag closing (i.e. we're not inside a tag)
  const flags = Search.caseSensitivity
    ? 'g'
    : 'gi'
  const regex = new RegExp(`(${ sanitizeRegexp(searchFor) })${ lookahead }`, flags)

  const result =
    content
      .innerHTML
      .replace(regex, '<span class="search">$1</span>')

  content.innerHTML = result
}


const scrollToAndSelectSearchNode = function (node) {
  if (!node) return

  const pane = node.closest('.pane')

  const scrollTo =
    node.getBoundingClientRect().top +
    pane.scrollTop -
    window.innerHeight * 0.5

  node
    .closest('.pane')
    .scroll({
      top: scrollTo,
      left: 0,
      behavior: 'smooth'
    })

  setTimeout(() => {
    const range = document.createRange()
    range.selectNodeContents(node)
    const selection = document.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    // FIXME (Alex): When clicking through too quickly
    // this selection will result in medium editor context menu
    // to show up in a wrong place
  }, 350)
}

const findFirstSearchNodeOnScreen = function () {
  let node = null

  document
    .querySelectorAll('span.search')
    .forEach(span => {
      if (node)
        return

      if (span.getBoundingClientRect().top >= 0)
        node = span
    })

  return node
}

const findFirstSearchNode = function () {
  return document.querySelector('span.search')
}

const findLastSearchNode = function () {
  const searches = document.querySelectorAll('span.search')
  return searches[searches.length - 1]
}

const findPrevSearchNode = function (currentSelect) {
  let node = null
  let previousSpan = null

  document
    .querySelectorAll('span.search')
    .forEach(span => {
      if (node)
        return

      if (span == currentSelect && previousSpan)
        return node = previousSpan

      previousSpan = span
    })

  return node
}

const findNextSearchNode = function (currentSelect) {
  let node = null
  let foundCurrent = false

  document
    .querySelectorAll('span.search')
    .forEach(span => {
      if (node)
        return

      if (foundCurrent)
        return node = span

      if (span == currentSelect)
        foundCurrent = true
    })

  return node
}

global.selectPrevSearch = function (currentSelect) {
  if (!document.querySelector('span.search')) return null

  let node = null

  if (currentSelect) {
    node = findPrevSearchNode(currentSelect)
  } else {
    node = findFirstSearchNodeOnScreen()
  }

  if (!node) {
    node = findLastSearchNode()
  }

  scrollToAndSelectSearchNode(node)
  return node
}

global.selectNextSearch = function (currentSelect) {
  if (!document.querySelector('span.search')) return null

  let node = null

  if (currentSelect) {
    node = findNextSearchNode(currentSelect)
  } else {
    node = findFirstSearchNodeOnScreen()
  }

  if (!node) {
    node = findFirstSearchNode()
  }

  scrollToAndSelectSearchNode(node)
  return node
}
