<template lang='slm'>
  #app[
    :class='appearanceClass'
  ]
    router-view/
</template>

<script>
  require('./assets/javascripts/global.js')

  import { Appearance } from '@/helpers/store_helper'

  export default {
    name: 'Bookva',

    computed: {
      appearanceClass () {
        return `
        scheme-${ Appearance.scheme }
        font-family-${ Appearance.fontFamily }
        font-size-${ Appearance.fontSize }
        statusbar-${ Appearance.statusbar }
        width-${ Appearance.width }
        `
      }
    }
  }
</script>

<style lang='sass'>
  @import '~normalize.css/normalize.css'
  @import '~font-awesome/css/font-awesome.min.css'
  @import '~medium-editor/dist/css/medium-editor.min.css'
  @import '~medium-editor/dist/css/themes/default.min.css'

  @import './assets/stylesheets/icomoon'
  @import './assets/stylesheets/fonts'

  @import './assets/stylesheets/classes'
  @import './assets/stylesheets/layout'
  @import './assets/stylesheets/appearance'

  #app
    &.statusbar-always
      #status-bar
        opacity: 1 !important

    &.statusbar-never
      #status-bar
        opacity: 0 !important

    &.width-wide
      .medium-container
        max-width: 100% !important
</style>
