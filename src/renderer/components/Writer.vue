<template lang='slm'>
  #writer.view [
    :class='[ classAutohide, classFocusMode, classTypewriterMode ]'
    @mousemove='onMousemove'
  ]
    #background/
    Editor/
    Sidebar/
    DropOpener/
    StatusBar/
    SearchBar/
    ContextMenu/
    Modal/
</template>

<script>
  import Editor from './writer/Editor'
  import Sidebar from './writer/Sidebar'
  import DropOpener from './writer/DropOpener'
  import StatusBar from './writer/StatusBar'
  import SearchBar from './writer/SearchBar'
  import ContextMenu from './writer/ContextMenu'
  import Modal from './writer/Modal'

  import { Application, Project, Search, Sidebar as SidebarStore, Appearance } from '@/helpers/store_helper'
  import Config from '@/config/config'
  import { osx } from '@/helpers/platform_helper'

  export default {
    name: 'writer',

    components: {
      Editor,
      Sidebar,
      DropOpener,
      StatusBar,
      SearchBar,
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

        if (Application.focusMode)
          return ''

        return {
          'autohide-show-top':    this.autohideShowTop,
          'autohide-show-bottom': this.autohideShowBottom
        }
      },

      classFocusMode () {
        return Application.focusMode
          ? 'focus-mode'
          : ''
      },

      classTypewriterMode () {
        return Application.typewriterMode
          ? 'typewriter-mode'
          : ''
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
        const ctrlKey = osx ? event.metaKey : event.ctrlKey

        if ( keys.pop() != event.key.toLowerCase() )
          return false
        else if ( keys.includes('ctrl') != ctrlKey )
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

        else if (this.check(event, 'f8'))
          this.onF8()

        else if (this.check(event, 'f10'))
          this.onF10()

        else if (this.check(event, 'f11'))
          this.onF11()

        else if (this.check(event, 'f3'))
          this.onF3()

        else if (this.check(event, 'shift', 'f3'))
          this.onShiftF3()

        else if (this.check(event, 'ctrl', 'n'))
          this.onCtrlN()

        else if (this.check(event, 'ctrl', 'shift', 'n'))
          this.onCtrlShiftN()

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
        this.$store.commit('searchHideSearchBar')
      },

      onF3 () {
        if (Search.searchBarOpen)
          this.$store.dispatch('searchSelectNext')
      },

      onShiftF3 () {
        if (Search.searchBarOpen)
          this.$store.dispatch('searchSelectPrev')
      },

      onF8 () {
        this.$store.commit('sidebarToggle')
      },

      onF10 () {
        document.getElementById('typewriter-toggle').click()
      },

      onF11 () {
        document.getElementById('fullscreen-toggle').click()
      },

      onCtrlN () {
        // create a new file and open it
        // maybe
      },

      onCtrlShiftN () {
        this.$store.dispatch('modalShow', {
          type: 'Confirm',
          content: 'newProject',
          dispatch: 'projectNewProject'
        })
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
        if (!Application.typewriterMode)
          this.$store.commit('searchShowSearchBar')
      },

      onMousemove (event) {
        if (Application.focusMode)
          this.$store.commit('applicationExitFocusMode')

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

    &.focus-mode
      cursor: none

      *
        cursor: none !important

    &.typewriter-mode
      .medium-content
        margin-bottom: 45vh
</style>
