<template lang='slm'>
  .modal
    .modal-header {{ modalHeader }}
    .modal-body {{ modalBody }}
    .modal-footer
      .modal-choice.secondary @click='cancel'
        | Cancel
      .modal-choice.primary @click='confirm'
        | Confirm
</template>

<script>
  import { Modal } from '@/helpers/store_helper'

  export default {
    name: 'ConfirmModal',

    computed: {
      modalHeader () {
        return this.$t(`modal.${ Modal.modalContentKey }.header`)
      },

      modalBody () {
        return this.$t(`modal.${ Modal.modalContentKey }.body`)
      },
    },

    methods: {
      confirm () {
        this.$store.commit(
          Modal.modalStoreCallback,
          Modal.modalStoreCallbackArgs
        )

        this.$store.commit('modalHide')
      },

      cancel () {
        this.$store.commit('modalHide')
      }
    }
  }
</script>

<style lang='sass' scoped>
</style>
