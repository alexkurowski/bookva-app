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

  import { Project } from '@/helpers/store_helper'

  export default {
    name: 'ProjectManager',

    methods: {
      newProject () {
        if (Project.lastSave != Project.lastUpdate) {
          this.$store.dispatch('modalShow', {
            type: 'Confirm',
            content: 'newProject',
            callback: 'projectNewProject'
          })
        } else {
          this.$store.commit('projectNewProject')
        }
      },

      loadProject () {
        if (Project.lastSave != Project.lastUpdate) {
          this.$store.dispatch('modalShow', {
            type: 'Confirm',
            content: 'loadProject',
            callback: 'projectLoadProject'
          })
        } else {
          this.$store.dispatch('projectLoadProject')
        }
      },

      saveProject () {
        this.$store.dispatch('projectSaveProject')
      },

      saveAsProject () {
        this.$store.dispatch('projectSaveAsProject')
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
