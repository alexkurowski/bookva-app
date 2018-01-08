<template lang='slm'>
  .view :class='className'
    #background/
    Editor/
    Sidebar/
    StatusBar/
    ModalContainer/
</template>

<script>
  import Editor from './writer/Editor'
  import Sidebar from './writer/Sidebar'
  import StatusBar from './writer/StatusBar'
  import ModalContainer from './writer/ModalContainer'

  import { Project, Appearance } from '@/helpers/store_helper'
  import Config from '@/config/config'

  export default {
    name: 'writer',

    components: {
      Editor,
      Sidebar,
      StatusBar,
      ModalContainer,
    },

    computed: {
      className () {
        return `scheme-${ Appearance.scheme } font-family-${ Appearance.fontFamily } font-size-${ Appearance.fontSize }`
      }
    },

    async created () {
      this.$store.commit('appearanceLoadSettings')

      const resynced =
        await this.$store.dispatch('projectResyncProject')

      if (!resynced)
        this.$store.commit('projectNewProject')

      setInterval(() => {
        this.$store.commit('projectSyncProject')
      }, Config.projectSyncInterval * 1000)
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
