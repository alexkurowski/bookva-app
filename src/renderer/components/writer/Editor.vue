<template lang='slm'>
  #editor
    .editor v-for='file, index in filesOpen'
      Pane :index='index' :key='file.id'
</template>

<script>
  import Pane from './editor/Pane'

  import { Writer } from '@/helpers/store_helper'

  export default {
    name: 'Editor',

    components: {
      Pane
    },

    computed: {
      filesOpen () {
        return Writer.filesOpen
      }
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
