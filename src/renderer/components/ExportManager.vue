<template lang='slm'>
  .view.export-manager[
    @click='back'
  ]
    | Export Manager

</template>

<script>
  import { Appearance } from '@/helpers/store_helper'

  export default {
    name: 'ExportManager',

    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang='sass' scoped>
</style>
