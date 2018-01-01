<template lang='slm'>
  .title[ contenteditable='true'
          @click='click'
          @keydown='keydown'
          @blur='rename' ]
    slot/
</template>

<script>
  export default {
    name: 'Title',

    methods: {
      click (event) {
        event.stopPropagation()
      },

      keydown (event) {
        if ( [13, 27].includes(event.keyCode) ) {
          event.preventDefault()
          event.target.blur()
        }
      },

      rename (event) {
        let parent = event.target.parentElement.parentElement

        if (parent.dataset.fileId) {
          this.$store.commit('updateFile', {
            id: parent.dataset.fileId,
            title: event.target.innerText
          })
        } else
        if (parent.dataset.folderId) {
          this.$store.commit('updateFolder', {
            id: parent.dataset.folderId,
            title: event.target.innerText
          })
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  .title
    max-width: 80%
    padding: .25rem .3rem
    margin-left: -.3rem
    margin-right: .3rem
    overflow: hidden
    cursor: text
</style>
