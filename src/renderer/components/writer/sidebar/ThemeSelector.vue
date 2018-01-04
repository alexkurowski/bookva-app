<template lang='slm'>
  #theme-selector
    Dropdown[ type='scheme'
              suffix='colors'
              :options='schemes'
              :change='change' ]/

    Dropdown[ type='fontFamily'
              suffix='font'
              :options='fontFamilies'
              :change='change' ]/

    Dropdown[ type='fontSize'
              suffix='size'
              :options='fontSizes'
              :change='change' ]/

    /select data-type='scheme' @change='changeOld'
      option[ v-for='name, value in schemes'
              :value='value'
              :selected='isSelected(value, "scheme")' ]
        | {{ name }} colors

    /select data-type='fontFamily' @change='changeOld'
      option[ v-for='name, value in fontFamilies'
              :value='value'
              :selected='isSelected(value, "fontFamily")' ]
        | {{ name }} font

    /select data-type='fontSize' @change='changeOld'
      option[ v-for='name, value in fontSizes'
              :value='value'
              :selected='isSelected(value, "fontSize")' ]
        | {{ name }} font size
</template>

<script>
  import Dropdown from './theme_selector/Dropdown'

  import { Writer } from '@/helpers/store_helper'

  export default {
    name: 'ThemeSelector',

    components: {
      Dropdown
    },

    data () {
      return {
        schemes: {
          sharp:    'Sharp',
          smooth:   'Smooth',
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
        return Writer[type]
      },

      isSelected (value, type) {
        return Writer[type] == value
      },

      change (type, value) {
        this.$store.commit('writerUpdateTheme', {
          value,
          type
        })
      },

      changeOld (event) {
        let value = event.target.value
        let type  = event.target.dataset.type

        this.$store.commit('writerUpdateTheme', {
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

  select
    width: 80%
    color: inherit
    background: inherit
    margin: 1rem auto
    padding: .5rem
    border-radius: 4px

    option
      color: #333
</style>
