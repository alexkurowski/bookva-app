<template lang='slm'>
  #search-bar.flex-item [
    v-if='shown'
    :class='className'
  ]
    input [
      @input='input'
    ]

    button.prev-btn [
      @click='selectPrev'
    ]
      i.fa.fa-angle-left

    button.next-btn [
      @click='selectNext'
    ]
      i.fa.fa-angle-right

    button.find-btn [
    ]
      | Find

    button.close-btn [
      @click='hide'
    ]
      | Close
</template>

<script>
  import { Search, Sidebar } from '@/helpers/store_helper'

  export default {
    name: 'SearchBar',

    data () {
      return {
        currentSelect: null
      }
    },

    computed: {
      shown () {
        return Search.searchBarOpen
      },

      className () {
        return Sidebar.sidebarOpen
          ? 'sidebar-open'
          : ''
      }
    },

    methods: {
      input (event) {
        const searchFor = event.target.value
        applySearch(searchFor)
        this.currentSelect = null
      },

      scrollToNode (node) {
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
          this.currentSelect = node
          const range = document.createRange()
          range.selectNodeContents(node)
          const selection = document.getSelection()
          selection.removeAllRanges()
          selection.addRange(range)
        }, 350)
      },

      selectPrev () {
        if (!document.querySelector('span.search')) return

        let node = null

        if (this.currentSelect) {
          let previousSpan = null
          document
            .querySelectorAll('span.search')
            .forEach(span => {
              if (node)
                return

              if (span == this.currentSelect && previousSpan)
                return node = previousSpan

              previousSpan = span
            })
        } else {
          document
            .querySelectorAll('span.search')
            .forEach(span => {
              if (node)
                return

              if (span.getBoundingClientRect().top >= 0)
                node = span
            })
        }

        if (!node) {
          const searches = document.querySelectorAll('span.search')
          node = searches[searches.length - 1]
        }

        this.scrollToNode(node)
      },

      selectNext () {
        if (!document.querySelector('span.search')) return

        let node = null

        if (this.currentSelect) {
          let foundCurrent = false
          document
            .querySelectorAll('span.search')
            .forEach(span => {
              if (node)
                return

              if (foundCurrent)
                return node = span

              if (span == this.currentSelect)
                foundCurrent = true
            })
        } else {
          document
            .querySelectorAll('span.search')
            .forEach(span => {
              if (node)
                return

              if (span.getBoundingClientRect().top >= 0)
                node = span
            })
        }

        if (!node) {
          node = document.querySelector('span.search')
        }

        this.scrollToNode(node)
      },

      hide () {
        this.$store.commit('searchHideSearchBar')
      }
    }
  }
</script>

<style lang='sass' scoped>
  $next-prev-width: 2rem

  #search-bar
    align-items: center
    justify-content: space-between
    position: fixed
    bottom: 0
    left: 0
    right: 0
    padding: 0 1rem
    transition: background .3s, left .2s ease
    z-index: 2100

    &.sidebar-open
      left: $sidebar-width

  .flex-item
    display: flex
    align-items: center
    flex-direction: row
    height: $status-bar-height

  .full-flex
    flex: 1
    height: $status-bar-height

  input
    width: 100%
    height: $status-bar-height - 8px
    padding: 0 .5rem
    margin-right: 1rem
    border-radius: 4px
    font-family: Cabin
    box-sizing: border-box

  button
    display: flex
    align-items: center
    justify-content: center
    height: $status-bar-height
    cursor: pointer
    transition: opacity .3s

    &:hover
      opacity: .5

  input,
  button
    color: inherit
    background: transparent
    border: none
    outline: none

  .prev-btn,
  .next-btn,
    width: $status-bar-height
    min-width: $status-bar-height
    padding: 0

  .find-btn,
  .close-btn
    width: $status-bar-height * 2
    min-width: $status-bar-height * 2
    padding: 0
    font-family: Cabin
</style>
