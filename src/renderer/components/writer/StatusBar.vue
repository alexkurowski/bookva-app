<template lang='slm'>
  #status-bar
    .info

    .spacer

    .fullscreen @click='toggleFullscreen'
      i.fa :class='fullscreenClass'
</template>

<script>
  import electron from 'electron'

  const getWindow = () => (
    electron
      .remote
      .getCurrentWindow()
  )

  export default {
    name: 'StatusBar',

    data () {
      return {
        fullscreenMode: getWindow().isFullScreen()
      }
    },

    computed: {
      fullscreenClass () {
        return this.fullscreenMode
          ? 'fa-compress'
          : 'fa-expand'
      }
    },

    methods: {
      toggleFullscreen () {
        this.fullscreenMode = !this.fullscreenMode
        getWindow().setFullScreen(this.fullscreenMode)
      }
    }
  }
</script>

<style lang='sass' scoped>
  #status-bar
    display: flex
    align-items: center
    justify-content: flex-end
    position: fixed
    bottom: 0
    left: 0
    right: 0
    height: $status-bar-height
    border-top: 1px solid $color-more-subtle

  .spacer
    width: 3rem

  .fullscreen
    padding: .5rem
    cursor: pointer
    transition: opacity .3s

    &:hover
      opacity: .5
</style>
