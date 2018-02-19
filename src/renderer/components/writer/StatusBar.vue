<template lang='slm'>
  #status-bar
    .left

    .middle
      .info
        .open
          span
            | {{ $t('writer.statusbar.info.words') }}:
            |  {{ wordsOpen }}
          span
            | {{ $t('writer.statusbar.info.total') }}:
            |  {{ wordsProject }}

    .right
      .modes
        #typewriter-toggle [
          :title='$t("writer.statusbar.title.typewriter")'
          :class='{ active: typewriterMode }'
          @click='toggleTypewriter'
        ]
          i.fi.flaticon-typewriter-1

        #fullscreen-toggle [
          :title='$t("writer.statusbar.title.fullscreen")'
          @click='toggleFullscreen'
        ]
          i.fa :class='fullscreenClass'
</template>

<script>
  import electron from 'electron'

  import { Application, Project } from '@/helpers/store_helper'

  const getWindow = () => (
    electron
      .remote
      .getCurrentWindow()
  )

  export default {
    name: 'StatusBar',

    data () {
      return {
        fullscreenMode: getWindow().isFullScreen()
      }
    },

    computed: {
      fullscreenClass () {
        return this.fullscreenMode
          ? 'fa-compress'
          : 'fa-expand'
      },

      typewriterMode () {
        return Application.typewriterMode
      },

      wordsOpen () {
        let result = ''

        Project.filesOpen.forEach((fileId, index) => {
          if (index > 0)
            result += ' | '

          result += String(Project.files[fileId].wordCount)
        })

        return result || '0'
      },

      wordsProject () {
        return String(
          Object
            .values(Project.files)
            .reduce((result, file) => (
              file.wordCount + result
            ), 0)
        )
      },
    },

    methods: {
      toggleTypewriter () {
        this.$store.commit('searchHideSearchBar')
        this.$store.commit('applicationSetTypewriterMode', !this.typewriterMode)
        resetSelection()
      },

      toggleFullscreen () {
        this.fullscreenMode = !this.fullscreenMode
        getWindow().setFullScreen(this.fullscreenMode)
      },
    }
  }
</script>

<style lang='sass' scoped>
  #status-bar
    display: flex
    align-items: center
    justify-content: space-between
    position: fixed
    bottom: 0
    left: 0
    right: 0
    height: $status-bar-height
    transition: background .3s, opacity .5s
    z-index: 2000
    user-select: none

  .spacer
    width: 3rem

  .info
    display: flex
    flex-direction: row
    white-space: nowrap

    span
      margin: 0 1rem

  .modes
    display: flex
    flex-direction: row

  #typewriter-toggle,
  #fullscreen-toggle
    padding: .5rem
    cursor: pointer
    transition: opacity .3s

    &:hover
      opacity: .5

  #typewriter-toggle.active
    color: $color-action
</style>
