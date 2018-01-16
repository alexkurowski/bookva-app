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
      #fullscreen-toggle [
        :title='$t("writer.statusbar.title.fullscreen")'
        @click='toggleFullscreen'
      ]
        i.fa :class='fullscreenClass'
</template>

<script>
  import electron from 'electron'

  import { Project } from '@/helpers/store_helper'

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

  #fullscreen-toggle
    padding: .5rem
    cursor: pointer
    transition: opacity .3s

    &:hover
      opacity: .5
</style>
