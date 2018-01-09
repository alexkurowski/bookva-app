<template lang='slm'>
  .view :class='className'
    #background/
    Editor/
    Sidebar/
    StatusBar/
    ContextMenu/
    ModalContainer/
</template>

<script>
  import Editor from './writer/Editor'
  import Sidebar from './writer/Sidebar'
  import StatusBar from './writer/StatusBar'
  import ContextMenu from './writer/ContextMenu'
  import ModalContainer from './writer/ModalContainer'

  import { Project, Appearance } from '@/helpers/store_helper'
  import Config from '@/config/config'

  export default {
    name: 'writer',

    components: {
      Editor,
      Sidebar,
      StatusBar,
      ContextMenu,
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
    },

    methods: {
      onKeydown (event) {
        if (event.key == 'Escape')
          this.onEsc()

        if ( event.key == 'o' &&
             event.ctrlKey )
          this.onCtrlO()

        if ( event.key == 's' &&
             event.ctrlKey &&
             !event.shiftKey )
          this.onCtrlS()

        if ( event.key == 'S' &&
             event.ctrlKey &&
             event.shiftKey )
          this.onCtrlShiftS()
      },

      onEsc () {
        this.$store.commit('modalHide')
        this.$store.commit('contextMenuHide')
      },

      onCtrlO () {
        this.onEsc()
        this.$store.dispatch('projectLoadProject')
      },

      onCtrlS () {
        this.onEsc()
        this.$store.dispatch('projectSaveProject')
      },

      onCtrlShiftS () {
        this.onEsc()
        this.$store.dispatch('projectSaveAsProject')
      },
    },

    mounted () {
      document.addEventListener('keydown', this.onKeydown)
    },

    unmounted () {
      document.removeEventListener('keydown', this.onKeydown)
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
