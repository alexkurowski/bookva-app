<template lang='slm'>
  #search-bar.flex-item [
    v-if='shown'
    :class='className'
  ]
    input [
      ref='searchFor'
      @input='input'
    ]

    button.case-sensitivity [
      @click='toggleCaseSensitivity'
    ]
      span.first-letter [
        v-if='caseSensitivity'
      ] a
      span.first-letter [
        v-else
      ] A
      span.last-letter a

    button.prev-btn [
      @click='selectPrev'
    ]
      i.fa.fa-angle-left

    button.next-btn [
      @click='selectNext'
    ]
      i.fa.fa-angle-right

    button.close-btn [
      @click='hide'
    ]
      | Close
</template>

<script>
  import { Search, Sidebar } from '@/helpers/store_helper'

  export default {
    name: 'SearchBar',

    computed: {
      shown () {
        return Search.searchBarOpen
      },

      className () {
        return Sidebar.sidebarOpen
          ? 'sidebar-open'
          : ''
      },

      caseSensitivity () {
        return Search.caseSensitivity
      },
    },

    methods: {
      input () {
        const searchFor = this.$refs.searchFor.value
        applySearch(searchFor)
      },

      toggleCaseSensitivity () {
        this.$store.commit('searchToggleCaseSensitivity')
        this.input()
      },

      selectPrev () {
        this.$store.dispatch('searchSelectPrev')
      },

      selectNext () {
        this.$store.dispatch('searchSelectNext')
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

  .case-sensitivity,
  .close-btn
    width: $status-bar-height * 2
    min-width: $status-bar-height * 2
    padding: 0
    text-align: center
    font-family: Cabin
    white-space: nowrap

  .case-sensitivity
    position: relative

    .first-letter,
    .last-letter
      display: inline-block
      position: absolute
      width: 10px
      text-align: center

    .first-letter
      left: 22px

    .last-letter
      right: 22px
</style>
