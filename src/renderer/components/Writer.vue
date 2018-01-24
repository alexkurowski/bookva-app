<template lang='slm'>
  #writer.view [
    :class='classAutohide'
    @mousemove='onMousemove'
  ]
    #background/
    Editor/
    Sidebar/
    StatusBar/
    FindBar/
    ContextMenu/
    Modal/
</template>

<script>
  import Editor from './writer/Editor'
  import Sidebar from './writer/Sidebar'
  import StatusBar from './writer/StatusBar'
  import FindBar from './writer/FindBar'
  import ContextMenu from './writer/ContextMenu'
  import Modal from './writer/Modal'

  import { Project, Sidebar as SidebarStore, Appearance } from '@/helpers/store_helper'
  import Config from '@/config/config'

  export default {
    name: 'writer',

    components: {
      Editor,
      Sidebar,
      StatusBar,
      FindBar,
      ContextMenu,
      Modal,
    },

    data () {
      return {
        autohideInitialShow: true,
        autohideShowTop: false,
        autohideShowBottom: false,
      }
    },

    computed: {
      classAutohide () {
        if (this.autohideInitialShow)
          return 'autohide-show-top autohide-show-bottom'

        if (SidebarStore.sidebarOpen)
          return 'autohide-show-top autohide-show-bottom'

        return {
          'autohide-show-top':    this.autohideShowTop,
          'autohide-show-bottom': this.autohideShowBottom
        }
      },
    },

    async created () {
      this.$store.commit('appearanceLoadSettings')

      const resynced =
        await this.$store.dispatch('projectResyncProject')

      if (!resynced)
        this.$store.commit('projectNewProject')

      setInterval(() => {
        this.$store.dispatch('projectSyncProject')
      }, Config.projectSyncInterval * 1000)
    },

    methods: {
      check (event, ...keys) {
        if ( keys.pop() != event.key )
          return false
        else if ( keys.includes('ctrl') != event.ctrlKey )
          return false
        else if ( keys.includes('shift') != event.shiftKey )
          return false
        else if ( keys.includes('alt') != event.altKey )
          return false
        else
          return true
      },

      onKeydown (event) {
        if (event.key == 'Escape')
          this.onEsc()

        else if (this.check(event, 'ctrl', 'o'))
          this.onCtrlO()

        else if (this.check(event, 'ctrl', 's'))
          this.onCtrlS()

        else if (this.check(event, 'ctrl', 'shift', 's'))
          this.onCtrlShiftS()

        else if (this.check(event, 'ctrl', 'f'))
          this.onCtrlF()
      },

      onEsc () {
        this.$store.dispatch('modalHide')
        this.$store.commit('contextMenuHide')
        this.$store.commit('applicationHideFindBar')
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

      onCtrlF () {
        this.$store.commit('applicationShowFindBar')
      },

      onMousemove (event) {
        this.autohideShowTop =
          event.y < Config.autohideThreshold

        this.autohideShowBottom =
          event.y > window.innerHeight - Config.autohideThreshold
      },

      onLinkOpen (event) {
        if (event.target instanceof HTMLAnchorElement) {
          this.$store.dispatch('applicationOpenLink', event.target.href)
          event.preventDefault()
        }
      }
    },

    mounted () {
      document.addEventListener('keydown', this.onKeydown)
      document.addEventListener('click', this.onLinkOpen)

      setTimeout(() => {
        this.autohideInitialShow = false
      }, Config.autohideInitialDelay * 1000)
    },

    unmounted () {
      document.removeEventListener('keydown', this.onKeydown)
      document.removeEventListener('click', this.onLinkOpen)
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

<style lang='sass'>
  .view
    #toggle,
    .pane-close
      opacity: 0

    #status-bar
      opacity: 0
      pointer-events: none

    &.autohide-show-top
      #toggle,
      .pane-close
        opacity: 1

    &.autohide-show-bottom
      #status-bar
        opacity: 1
        pointer-events: auto
</style>
