<template lang='slm'>
  #drop-opener[ @dragover='dragover'
                @drop='drop' ]
</template>

<script>
  export default {
    name: 'DropOpener',

    methods: {
      dragover (event) {
        event.preventDefault()
      },

      drop (event) {
        console.log("CALL drop", event)
      }
    }
  }
</script>

<style lang='sass' scoped>
  #drop-opener
    position: fixed
    top: 0
    left: $sidebar-width
    right: 0
    bottom: 0
</style>
