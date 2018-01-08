<template lang='slm'>
  .modal
    .modal-header Are you sure?
    .modal-body {{ modalBody }}
    .modal-footer
      .modal-choice YES
      .modal-choice NO
</template>

<script>
  import { Modal } from '@/helpers/store_helper'

  export default {
    name: 'ConfirmModal',

    computed: {
      modalBody () {
        return Modal.modalBody
      }
    }
  }
</script>

<style lang='sass' scoped>
</style>
