<template lang='slm'>
  #project-manager

    .button @click='newProject'
      i.icon.icon-document
      span New project

    .button @click='loadProject'
      i.icon.icon-upload
      span Open...

    .button @click='saveProject'
      i.icon.icon-download
      span Save

    .button @click='saveAsProject'
      i.icon.icon-download
      span Save as...

    .hr

    .button @click='quitProject'
      i.icon.icon-times
      span Quit
</template>

<script>
  import { remote } from 'electron'

  export default {
    name: 'ProjectManager',

    methods: {
      newProject () {
        // TODO (Alex): Show a modal 'are you sure?' question
        this.$store.commit('projectNewProject')
      },

      loadProject () {
        // TODO (Alex): Show a modal 'are you sure?' question
        //              but only if current project is not saved
        this.$store.commit('projectLoadProject')
      },

      saveProject () {
        this.$store.commit('projectSaveProject')
      },

      saveAsProject () {
        this.$store.commit('projectSaveAsProject')
      },

      quitProject () {
        remote.app.quit()
      }
    }
  }
</script>

<style lang='sass' scoped>
  .button
    display: flex
    align-items: center
    justify-content: flex-start
    padding: 1rem
    user-select: none
    cursor: pointer

    &:hover
      background-color: $color-more-subtle

  i
    display: inline-block
    width: 2.5rem
    font-size: 1.5rem

  .button > span
    font-size: 1.1rem

  .hr
    background: $color-more-subtle
    width: 100%
    height: 1px
    margin: 2rem 0
</style>
