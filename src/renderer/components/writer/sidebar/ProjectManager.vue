<template lang='slm'>
  #project-manager

    .button
      i.icon.icon-document
      span New project

    .button
      i.icon.icon-upload
      span Open...

    .button
      i.icon.icon-download
      span Save

    .button
      i.icon.icon-download
      span Save as...

    .hr

    .button @click='quit'
      i.icon.icon-times
      span Quit
</template>

<script>
  import { remote } from 'electron'

  export default {
    name: 'ProjectManager',

    methods: {
      click () {
        this.$store.commit('projectSyncProject')
      },

      quit () {
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
