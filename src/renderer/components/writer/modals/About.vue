<template lang='slm'>
  .modal
    .modal-header {{ $t('modal.about.header') }}
    .modal-body {{ $t('modal.about.body') }}
    .modal-footer
      .empty
      .modal-choice.secondary @click='hide'
        | {{ $t('modal.about.ok') }}
      .empty
</template>

<script>
  export default {
    name: 'AboutModal',

    methods: {
      hide () {
        this.$store.dispatch('modalHide')
      }
    }
  }
</script>

<style lang='sass' scoped>
  .modal-header
    margin-bottom: 1rem
    font-family: Raleway
    font-size: 3rem
    text-align: center
</style>
