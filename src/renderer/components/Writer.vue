<template lang='slm'>
  .view :class='className'
    #background

    Editor/

    Sidebar/
</template>

<script>
  import Editor from './writer/Editor'
  import Sidebar from './writer/Sidebar'

  import { Writer, Project } from '@/helpers/store_helper'

  export default {
    name: 'writer',

    components: {
      Editor,
      Sidebar
    },

    computed: {
      className () {
        return `scheme-${ Writer.scheme } font-family-${ Writer.fontFamily } font-size-${ Writer.fontSize }`
      }
    },

    created () {
      this.$store.dispatch('writerLoadSettings')

      // TODO (Alex): fetch project data from a file

      this.$store.commit('projectNewProject')
      this.$store.commit('writerNewProject', Project.files)
    }
  }
</script>

<style lang='sass' scoped>
  #background
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: -1000
    transition: background .3s
    pointer-events: none
</style>
