<template lang='slm'>
  #configurations
    .info
      | {{ $t('writer.sidebar.configurations.info') }}

    label {{ $t('writer.sidebar.configurations.label.scheme') }}
    .schemes.select-container
      Select [
        type='scheme'
        :items='scheme'
      ]

    label {{ $t('writer.sidebar.configurations.label.fontFamily') }}
    .font-families.select-container
      Select [
        type='fontFamily'
        :items='fontFamily'
      ]

    label {{ $t('writer.sidebar.configurations.label.fontSize') }}
    .font-sizes.select-container
      Select [
        type='fontSize'
        :items='fontSize'
      ]

    label {{ $t('writer.sidebar.configurations.label.indent') }}
    .select-container
      Select [
        type='indent'
        :items='indent'
      ]

    label {{ $t('writer.sidebar.configurations.label.width') }}
    .select-container
      Select [
        type='width'
        :items='width'
      ]

    label {{ $t('writer.sidebar.configurations.label.statusbar') }}
    .select-container
      Select [
        type='statusbar'
        :items='statusbar'
      ]
</template>

<script>
  import Select from './configurations/Select'

  import { Appearance } from '@/helpers/store_helper'

  export default {
    name: 'Configurations',

    components: {
      Select
    },

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
          ptserif:      'PT Serif',
          merriweather: 'Merriweather',
          // slabo:        'Slabo',
          // sourceserif:  'Source Serif Pro',

          hr1:          'hr',
          // sans-serif
          ptsans:       'PT Sans',
          roboto:       'Roboto',
          //lato:         'Lato',

          hr2:          'hr',
          // monospace
          ptmono:       'PT Mono',
          sharetech:    'Share Tech',
          // overpass:     'Overpass',
        },

        fontSize: {
          small:  'Small',
          normal: 'Normal',
          big:    'Large',
          bigger: 'Largest',
        },

        indent: {
          x0: 'None',
          x1: 'Normal',
          x2: 'Wide',
        },

        width: {
          normal: 'Normal',
          wide:   'Wide',
        },

        statusbar: {
          always:   'Always shown',
          autohide: 'Auto hide',
          never:    'Always hidden',
        },
      }
    },
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
</style>
