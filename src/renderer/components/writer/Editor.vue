<template lang='slm'>
  #editor

    .editor [
      v-for='file, index in filesOpen'
      :style='editorStyle(index)'
    ]
      PaneResize :index='index' v-if='index > 0'
      Pane :index='index' :key='file.id'

    PaneClose/
</template>

<script>
  import Pane from './editor/Pane'
  import PaneResize from './editor/PaneResize'
  import PaneClose from './editor/PaneClose'

  import { Project, Sidebar, Appearance } from '@/helpers/store_helper'

  export default {
    name: 'Editor',

    components: {
      Pane,
      PaneResize,
      PaneClose
    },

    computed: {
      filesOpen () {
        return Project.filesOpen
      },
    },

    methods: {
      editorStyle (index) {
        if (this.filesOpen.length <= 1) {
          return { flex: 1 }
        } else {
          return { flex: Appearance.paneFlex[index] }
        }
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
    transition: left .2s ease

    .editor
      position: relative
      flex: 1
</style>
