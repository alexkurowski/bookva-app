<template lang='slm'>
  #editor
    Pane :index='index' :key='file.id' v-for='file, index in filesOpen'
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
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
</style>
