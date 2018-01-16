<template lang='slm'>
  #configurations
    .info
      | {{ $t('writer.sidebar.configurations.info') }}

    label {{ $t('writer.sidebar.configurations.label.scheme') }}
    .select-container
      .select[
        data-type='scheme'
        @click='openMenu'
      ]
        span {{ selectedValue("scheme") }}
        i.fa.fa-sort

    label {{ $t('writer.sidebar.configurations.label.fontFamily') }}
    .select-container
      .select[
        data-type='fontFamily'
        @click='openMenu'
      ]
        span {{ selectedValue("fontFamily") }}
        i.fa.fa-sort

    label {{ $t('writer.sidebar.configurations.label.fontSize') }}
    .select-container
      .select[
        data-type='fontSize'
        @click='openMenu'
      ]
        span {{ selectedValue("fontSize") }}
        i.fa.fa-sort

    label {{ $t('writer.sidebar.configurations.label.statusbar') }}
    .select-container
      | ayy

    label {{ $t('writer.sidebar.configurations.label.width') }}
    .select-container
      | lmao
</template>

<script>
  import { Appearance } from '@/helpers/store_helper'

  export default {
    name: 'Configurations',

    data () {
      return {
        scheme: {
          sharp:          'Sharp',
          smooth:         'Smooth',
          frost:          'Frost',
          solarizedLight: 'Solarized Light',
          solarizedDark:  'Solarized Dark',
          night:          'Blue Night',
          dark:           'Dark',
          contrast:       'Contrast',
        },

        fontFamily: {
          // serif
          merriweather: 'Merriweather',
          slabo:        'Slabo',
          sourceserif:  'Source Serif Pro',
          // sans-serif
          roboto:       'Roboto',
          lato:         'Lato',
          ptsans:       'PT Sans',
          // monospace
          sharetech:    'Share Tech',
          overpass:     'Overpass',
          ptmono:       'PT Mono',
        },

        fontSize: {
          small:  'Small',
          normal: 'Normal',
          big:    'Large',
          bigger: 'Largest',
        },

        statusbar: {
          always:   'Always shown',
          autohide: 'Auto hide',
          never:    'Always hidden',
        },

        width: {
          normal: 'Normal',
          wide:   'Wide',
        }
      }
    },

    methods: {
      selectedValue (type) {
        return this[type][ Appearance[type] ]
      },

      openMenu (event) {
        const type  = event.target.dataset.type
        const items = []

        for (const key in this[type]) {
          items.push({
            text: this[type][key],
            commit: 'appearanceUpdateTheme',
            params: {
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
  #configurations
    width: 80%
    margin: 0 auto
    user-select: none

  .info
    text-align: center
    margin-bottom: 2rem
    font-weight: bold
    opacity: .75

  label
    text-align: left
    padding-left: .25rem

  .select-container
    position: relative
    width: 100%
    margin: .5rem 0 2rem

    i
      position: absolute
      top: .5rem
      right: .5rem
      pointer-events: none

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
</style>
