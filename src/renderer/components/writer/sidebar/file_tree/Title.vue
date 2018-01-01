<template lang='slm'>
  .title[ :class='className'
          :contenteditable='contentEditable'
          @click='click'
          @keydown='keydown'
          @blur='rename' ]
    slot/
</template>

<script>
  export default {
    name: 'Title',

    props: [ 'editable' ],

    computed: {
      isEditable () {
        return this.editable !== false
      },

      className () {
        return this.isEditable
          ? ''
          : 'locked'
      },

      contentEditable () {
        return this.isEditable
      }
    },

    methods: {
      click (event) {
        if (this.isEditable)
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
    max-width: 100%
    padding: .25rem 0
    overflow: hidden
    cursor: text

    &.locked
      cursor: pointer
</style>
