<template lang='slm'>
  #find-bar.flex-item [
    v-if='shown'
    :class='className'
  ]
    input

    button.prev-btn
      i.fa.fa-angle-left
    button.next-btn
      i.fa.fa-angle-right

    button.find-btn
      | Find
    button.close-btn [
      @click='hide'
    ]
      | Close
</template>

<script>
  import { Application, Sidebar } from '@/helpers/store_helper'

  export default {
    name: 'FindBar',

    computed: {
      shown () {
        return Application.findBarShown
      },

      className () {
        return Sidebar.sidebarOpen
          ? 'sidebar-open'
          : ''
      }
    },

    methods: {
      hide () {
        this.$store.commit('applicationHideFindBar')
      }
    }
  }
</script>

<style lang='sass' scoped>
  $next-prev-width: 2rem

  #find-bar
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
