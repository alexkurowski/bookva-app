<template lang='slm'>
  #context-menu[
    :style='style'
    v-if='shown'
    v-clickaway='hide'
  ]

    .item[
      v-for='item, index in items'
      :data-index='index'
      @click='select'
    ]

      i.icon[
        v-if='!!item.icon'
        :class='item.icon'
      ]

      span {{ item.text }}
</template>

<script>
  import { ContextMenu } from '@/helpers/store_helper'

  export default {
    name: 'ContextMenu',

    computed: {
      shown () {
        return ContextMenu.shown
      },

      items () {
        return ContextMenu.items
      },

      style () {
        return {
          left: ContextMenu.position.x + 'px',
          top:  ContextMenu.position.y + 'px'
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
        const params = this.items[index]
        this.$store.dispatch(params.callback, params.callbackArgs)
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
    backdrop-filter: blur(2px)
    z-index: 7500
    overflow: hidden

    .item
      padding: .5rem .75rem
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
