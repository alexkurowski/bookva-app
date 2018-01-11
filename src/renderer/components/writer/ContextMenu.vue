<template lang='slm'>
  #context-menu[
    :class='className'
    :style='style'
    v-clickaway='hide'
  ]

    .item[
      v-for='item, index in items'
      :data-index='index'
      @mouseup='select'
    ]

      i[
        v-if='!!item.icon'
        :class='item.icon'
      ]

      span {{ item.text }}
</template>

<script>
  import { ContextMenu } from '@/helpers/store_helper'

  export default {
    name: 'ContextMenu',

    data () {
      return {
        itemWidth: 160,
        itemHeight: 30
      }
    },

    computed: {
      shown () {
        return ContextMenu.shown
      },

      items () {
        return ContextMenu.items
      },

      className () {
        return this.shown
          ? 'shown'
          : ''
      },

      style () {
        let x = ContextMenu.position.x
        let y = ContextMenu.position.y

        let xKey = 'left'
        let yKey = 'top'

        if (x + this.itemWidth > window.innerWidth) {
          xKey = 'right'
          x = window.innerWidth - x
        }

        if (y + this.itemHeight * this.items.length > window.innerHeight) {
          yKey = 'bottom'
          y = window.innerHeight - y
        }

        return {
          [xKey]: `${ x }px`,
          [yKey]: `${ y }px`
        }
      }
    },

    methods: {
      hide (force) {
        if ( force !== true &&
             Date.now() < ContextMenu.shownAt + 100 ) return

        this.$store.commit('contextMenuHide')
      },

      select (event) {
        const index = Number(event.target.dataset.index)
        const item  = this.items[index]

        if (item.commit) {
          this.$store.commit(item.commit, item.params)
        }

        if (item.dispatch) {
          this.$store.dispatch(item.dispatch, item.params)
        }

        this.hide(true)
      }
    }
  }
</script>

<style lang='sass' scoped>
  #context-menu
    position: fixed
    min-width: 160px
    margin: 1px
    border-radius: 6px
    opacity: 0
    z-index: 7500
    overflow: hidden
    transition: opacity .2s

    &.shown
      opacity: 1
      backdrop-filter: blur(2px)

    &:not(.shown)
      pointer-events: none

    .item
      display: flex
      align-items: center
      height: $context-menu-item-height
      padding: 0 .75rem
      cursor: pointer
      transition: background .1s

      &:hover
        background: $color-less-subtle

      i
        position: relative
        display: inline-block
        top: 1px
        width: 1.5rem

      > *
        pointer-events: none
</style>
