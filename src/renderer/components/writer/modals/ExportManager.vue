<template lang='slm'>
  .modal
    .modal-header {{ $t('export.header.big') }}

    .modal-body
      .section
        Title/

      .section
        Chapters/

    .modal-footer
      .modal-choice.primary @click='confirm'
        i.icon.icon-tick
        | Export
      .modal-choice.secondary @click='cancel'
        i.icon.icon-cancel
        | Cancel
</template>

<script>
  import Title from './export_manager/Title'
  import Chapters from './export_manager/Chapters'

  export default {
    name: 'ExportManagerModal',

    components: {
      Title,
      Chapters
    },

    methods: {
      confirm () {
      },

      cancel () {
        this.$store.commit('modalHide')
      },
    }
  }
</script>

<style lang='sass' scoped>
  .modal
    width: 80%

  .modal-body
    flex: 1
    text-align: left
    overflow-y: auto

    .section
      margin: 2rem 0
</style>
