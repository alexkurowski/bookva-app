<template lang='slm'>
  .title[ :class='className'
          :contenteditable='contentEditable'
          @click='click'
          @keydown='keydown'
          @blur='rename' ]
    | {{ trimmedContent }}
</template>

<script>
  export default {
    name: 'Title',

    props: [ 'editable', 'content' ],

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
      },

      trimmedContent () {
        return this
          .content
          .replace(/&nbsp;/g, '')
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
          this.$store.commit('projectUpdateFile', {
            id: parent.dataset.fileId,
            title: event.target.innerText
          })
        } else
        if (parent.dataset.folderId) {
          this.$store.commit('projectUpdateFolder', {
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
    border: 1px solid transparent
    border-radius: 2px
    outline: none

    &:focus
      border-color: $color-action

    &.locked
      cursor: pointer
</style>
