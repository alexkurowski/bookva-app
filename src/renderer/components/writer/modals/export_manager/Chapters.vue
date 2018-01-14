<template lang='slm'>
  .chapters
    .export-file-tree
      .entry.root-entry [
        v-for='entry in root'
      ]
        | {{ entry.title }}
</template>

<script>
  import Draggable from 'vuedraggable'

  import { Project } from '@/helpers/store_helper'

  const orderSort = (a, b) => (a.order - b.order)

  export default {
    name: 'Chapters',

    components: {
      Draggable
    },

    computed: {
      files () {
        return Object
          .values(Project.files)
          .sort(orderSort)
      },

      folders () {
        return Object
          .values(Project.folders)
          .sort(orderSort)
      },

      root () {
        console.log(
        [
          ...this.folders,
          ...this.filesInFolder(null)
        ].sort(orderSort)
        )
        return [
          ...this.folders,
          ...this.filesInFolder(null)
        ].sort(orderSort)
      }
    },

    methods: {
      filesInFolder (folder) {
        return this
          .files
          .filter(file => file.folder === folder)
      },
    }
  }
</script>

<style lang='sass' scoped>
</style>
