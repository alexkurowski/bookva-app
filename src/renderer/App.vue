<template lang='slm'>
  #app
    router-view/
</template>

<script>
  require('./assets/javascripts/global.js')

  export default {
    name: 'wrtr',
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
</style>
