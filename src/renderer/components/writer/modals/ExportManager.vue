<template lang='slm'>
  .modal
    .modal-header {{ $t('export.header.big') }}

    .modal-body
      .section
        Info/

      .section
        Chapters/

    .modal-footer
      .modal-choice.primary @click='confirm'
        i.icon.icon-tick
        | {{ $t('modal.exportManager.confirm') }}
      .modal-choice.secondary @click='cancel'
        i.icon.icon-cancel
        | {{ $t('modal.exportManager.cancel') }}
</template>

<script>
  import Info from './export_manager/Info'
  import Chapters from './export_manager/Chapters'

  export default {
    name: 'ExportManagerModal',

    components: {
      Info,
      Chapters
    },

    methods: {
      confirm () {
        const title =
          document.getElementById('export-title').value

        const author =
          document.getElementById('export-author').value

        const files =
          [ ...document.getElementById('export-chapters').children ]
            .map(node => node.dataset.fileId)

        if ( title && files.length ) {
          this.$store.dispatch('projectExportFiles', {
            title, author, files
          })
        } else {
          console.log("Gotta set title and choose files")
        }
      },

      cancel () {
        this.$store.dispatch('modalHide')
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
