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
      #fullscreen-toggle @click='toggleFullscreen'
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

          result += this.countWords( Project.files[fileId] )
        })

        return result || '0'
      },

      wordsProject () {
        return Object
          .values(Project.files)
          .reduce((result, file) => (
            this.countWords(file) + result
          ), 0)
      },
    },

    methods: {
      toggleFullscreen () {
        this.fullscreenMode = !this.fullscreenMode
        getWindow().setFullScreen(this.fullscreenMode)
      },

      countWords (file) {
        if (!file)
          return 0

        if (!file.content)
          return 0

        return file
          .content
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .split(' ')
          .length
      }
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
    border-top: 1px solid $color-more-subtle
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
