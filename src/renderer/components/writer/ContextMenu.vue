<template lang='slm'>
  #context-menu[ :style='style'
                 v-if='shown'
                 v-clickaway='hide' ]

    .item[ v-for='item, index in items'
           :data-index='index'
           @click='select' ]
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
    width: 160px
    color: $dark-fg
    margin: 1px
    background: rgba( $dark-bg, 0.7 )
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

      span
        pointer-events: none
</style>
