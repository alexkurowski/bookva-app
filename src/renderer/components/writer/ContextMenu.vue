<template lang='slm'>
  #context-menu[ :style='style'
                 v-if='shown'
                 v-clickaway='hide' ]

    .item[ v-for='item, index in items'
           @data-index='index' ]
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
      hide () {
        if (Date.now() < ContextMenu.shownAt + 100) return

        this.$store.commit('contextMenuHide')
      }
    }
  }
</script>

<style lang='sass' scoped>
  #context-menu
    position: fixed
    width: 100px
    height: 100px
    color: $dark-fg
    background: rgba( $dark-bg, 0.6 )
    backdrop-filter: blur(2px)
    z-index: 7500
</style>
