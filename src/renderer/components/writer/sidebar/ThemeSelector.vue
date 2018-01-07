<template lang='slm'>
  #theme-selector
    .select-container
      select data-type='scheme' @change='change'
        option[ v-for='name, value in schemes'
                :value='value'
                :selected='isSelected(value, "scheme")' ]
          | {{ name }} colors
      i.fa.fa-sort

    .select-container
      select data-type='fontFamily' @change='change'
        option[ v-for='name, value in fontFamilies'
                :value='value'
                :selected='isSelected(value, "fontFamily")' ]
          | {{ name }} font
      i.fa.fa-sort

    .select-container
      select data-type='fontSize' @change='change'
        option[ v-for='name, value in fontSizes'
                :value='value'
                :selected='isSelected(value, "fontSize")' ]
          | {{ name }} font size
      i.fa.fa-sort
</template>

<script>
  import { Appearance } from '@/helpers/store_helper'

  export default {
    name: 'ThemeSelector',

    data () {
      return {
        schemes: {
          sharp:    'Sharp',
          smooth:   'Smooth',
          frost:    'Frost',
          dark:     'Dark',
          contrast: 'Contrast',
        },

        fontFamilies: {
          merriweather: 'Merriweather',
          roboto:       'Roboto',
          ptmono:       'PT Mono',
        },

        fontSizes: {
          small:  'Small',
          normal: 'Normal',
          big:    'Large',
          bigger: 'Largest',
        },
      }
    },

    methods: {
      selected (type) {
        return Appearance[type]
      },

      isSelected (value, type) {
        return Appearance[type] == value
      },

      change (event) {
        const value = event.target.value
        const type  = event.target.dataset.type

        this.$store.commit('appearanceUpdateTheme', {
          value,
          type
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

  select
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
</style>
