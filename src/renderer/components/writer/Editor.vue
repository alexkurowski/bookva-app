<template lang='slm'>
  #editor
    .editor[ v-for='file, index in filesOpen'
             :style='{ flex: editorStyle[index] }' ]
      PaneResize :index='index' v-if='index > 0'
      Pane :index='index' :key='file.id'
</template>

<script>
  import Pane from './editor/Pane'
  import PaneResize from './editor/PaneResize'

  import { Writer } from '@/helpers/store_helper'

  export default {
    name: 'Editor',

    components: {
      Pane,
      PaneResize
    },

    computed: {
      filesOpen () {
        return Writer.filesOpen
      },

      editorStyle () {
        return Writer.paneFlex
      },
    }
  }
</script>

<style lang='sass' scoped>
  #editor
    display: flex
    align-items: stretch
    justify-content: stretch
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0

    .editor
      position: relative
      flex: 1
</style>
