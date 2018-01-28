<template lang='slm'>
  .modal
    .modal-header {{ $t('modal.about.header') }}
    .modal-body
      .about-line
        span {{ $t('modal.about.body.author') }}

      .about-line
        span {{ version }}

      .about-line
        span.update-checker [
          v-if='updateCheckerState == "standby"'
          @click='checkUpdate'
        ] {{ $t('modal.about.body.update') }}

        span [
          v-else-if='updateCheckerState == "working"'
        ]
          i.update-checker-working.fa.fa-refresh.fa-spin

        span [
          v-else-if='updateCheckerState == "no-update"'
        ] {{ $t('modal.about.body.noUpdate') }}

        a [
          :href='updateUrl'
          v-else-if='updateCheckerState == "yes-update"'
        ] {{ $t('modal.about.body.yesUpdate') }}

      .about-line
        a [
          :href='websiteUrl'
        ] {{ $t('modal.about.body.website') }}

        span.separator •

        a [
          :href='feedbackUrl'
        ] {{ $t('modal.about.body.feedback') }}


    .modal-footer
      .empty
      .modal-choice.secondary @click='hide'
        | {{ $t('modal.about.ok') }}
      .empty
</template>

<script>
  import Config from '@/config/config'
  import serverFetch from '@/helpers/server_fetch'

  export default {
    name: 'AboutModal',

    data () {
      return {
        updateCheckerState: 'standby', // working, no-update
      }
    },

    computed: {
      version () {
        return `${ this.$t('modal.about.body.version') } ${ Config.appVersion }`
      },

      updateUrl () {
        return Config.serverUrl + '/#download-section'
      },

      websiteUrl () {
        return Config.serverUrl
      },

      feedbackUrl () {
        return Config.serverUrl + '/#contact-section'
      },
    },

    methods: {
      checkUpdate () {
        this.updateCheckerState = 'working'
        serverFetch('app_version')
          .then(response =>
            response.text()
          ).then(response => {
            if ( response == Config.appVersion )
              this.updateCheckerState = 'no-update'
            else
              this.updateCheckerState = 'yes-update'
          }).catch(error => {
            console.log("ERROR server fetch error", error)
          })
      },

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

  .modal-body
    margin: 1rem 0
    line-height: 2rem

  .about-line
    font-weight: bold
    text-align: center

    .separator
      margin: 0 .5rem

  .update-checker
    position: relative
    text-decoration: underline
    cursor: pointer

    &:hover
      text-decoration: none
</style>
