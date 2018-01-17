<template lang='slm'>
  .select [
    @click='openMenu'
  ]
    span {{ selectedValue }}
    i.fa.fa-sort
</template>

<script>
  import { Appearance } from '@/helpers/store_helper'

  export default {
    name: 'Select',

    props: [ 'type', 'items' ],

    computed: {
      selectedValue () {
        return this.items[ Appearance[this.type] ]
      }
    },

    methods: {
      openMenu (event) {
        const items = []

        for (const key in this.items) {
          items.push({
            text: this.items[key],
            commit: 'appearanceUpdateTheme',
            params: {
              value: key,
              type: this.type
            }
          })
        }

        this.$store.dispatch('contextMenuShow', {
          position: {
            x: event.x,
            y: event.y
          },
          items: items
        })
      }
    }
  }
</script>

<style lang='sass' scoped>
  .select
    width: 100%
    color: inherit
    background: inherit
    padding: .4rem .5rem
    border-radius: 4px
    border: 1px solid $color-less-subtle
    text-align: left
    cursor: pointer
    outline: none
    -webkit-appearance: none
    transition: border-color .3s
    box-sizing: border-box

    > *
      pointer-events: none

    i
      position: absolute
      top: .5rem
      right: .5rem
      pointer-events: none
</style>
