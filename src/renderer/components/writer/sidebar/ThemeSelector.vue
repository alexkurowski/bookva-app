<template lang='slm'>
  #theme-selector
    .select-container
      .select[ data-type='scheme'
               @click='openMenu' ]
        span {{ selectedValue("scheme") }} {{ suffix("scheme") }}
        i.fa.fa-sort

    .select-container
      .select[ data-type='fontFamily'
               @click='openMenu' ]
        span {{ selectedValue("fontFamily") }} {{ suffix("fontFamily") }}
        i.fa.fa-sort

    .select-container
      .select[ data-type='fontSize'
               @click='openMenu' ]
        span {{ selectedValue("fontSize") }} {{ suffix("fontSize") }}
        i.fa.fa-sort
</template>

<script>
  import { Appearance } from '@/helpers/store_helper'

  export default {
    name: 'ThemeSelector',

    data () {
      return {
        scheme: {
          sharp:    'Sharp',
          smooth:   'Smooth',
          frost:    'Frost',
          dark:     'Dark',
          contrast: 'Contrast',
        },

        fontFamily: {
          merriweather: 'Merriweather',
          roboto:       'Roboto',
          ptmono:       'PT Mono',
        },

        fontSize: {
          small:  'Small',
          normal: 'Normal',
          big:    'Large',
          bigger: 'Largest',
        },
      }
    },

    methods: {
      selectedValue (type) {
        return this[type][ Appearance[type] ]
      },

      suffix (type) {
        switch (type) {
          case 'scheme':     return ' colors'
          case 'fontFamily': return ' font'
          case 'fontSize':   return ' size'
        }
      },

      openMenu (event) {
        const type  = event.target.dataset.type
        const items = []

        for (const key in this[type]) {
          items.push({
            text: this[type][key] + this.suffix(type),
            callback: 'appearanceUpdateTheme',
            callbackArgs: {
              value: key,
              type
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
  #theme-selector
    text-align: center
    user-select: none

  .select-container
    position: relative
    width: 80%
    margin: 1rem auto 2rem

    i
      position: absolute
      top: .5rem
      right: .5rem
      pointer-events: none

  select,
  .select
    width: 100%
    color: inherit
    background: inherit
    padding: .4rem .5rem
    border-radius: 4px
    cursor: pointer
    outline: none
    -webkit-appearance: none

    option
      color: #333

  .select
    text-align: left
    border: 1px solid $color-less-subtle
    box-sizing: border-box

    > *
      pointer-events: none
</style>
