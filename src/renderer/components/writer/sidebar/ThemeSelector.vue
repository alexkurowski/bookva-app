<template lang='slm'>
  #theme-selector
    select data-type='scheme' @change='change'
      option[ v-for='name, value in schemes'
              :value='value'
              :selected='isSelected(value, "scheme")' ]
        | {{ name }} colors

    select data-type='fontFamily' @change='change'
      option[ v-for='name, value in fontFamilies'
              :value='value'
              :selected='isSelected(value, "fontFamily")' ]
        | {{ name }}

    select data-type='fontSize' @change='change'
      option[ v-for='name, value in fontSizes'
              :value='value'
              :selected='isSelected(value, "fontSize")' ]
        | {{ name }} font
</template>

<script>
  import { Writer } from '@/helpers/store_helper'

  export default {
    name: 'ThemeSelector',

    data () {
      return {
        schemes: {
          default: 'Sharp',
          smooth:  'Smooth',
          dark:    'Dark',
        },

        fontFamilies: {
          default: 'Merriweather',
          modern:  'Roboto',
          mono:    'PT Mono',
        },

        fontSizes: {
          small:   'Small',
          default: 'Normal',
          big:     'Large',
          bigger:  'Largest',

        },
      }
    },

    methods: {
      isSelected (value, type) {
        return Writer[type] == value
      },

      change (event) {
        let value = event.target.value
        let type  = event.target.dataset.type

        this.$store.commit('updateTheme', {
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
    margin-bottom: 1rem
    padding: .5rem
    border-radius: 4px

    option
      color: #333
</style>
