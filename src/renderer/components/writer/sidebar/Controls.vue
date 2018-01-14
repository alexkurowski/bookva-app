<template lang='slm'>
  #sidebar-controls
    .btns
      .btn[
        :title='$t("writer.sidebar.title.projectMenu")'
        @click='openProjectMenu'
        @contextmenu='openProjectMenu'
      ]
        .icon.icon-th-menu

    .btns
      .btn[
        :title='$t("writer.sidebar.title.fileTree")'
        :class='isActive("FileTree")'
        @click='setSidebarPage("FileTree")'
      ]
        .icon.icon-th-list

      .btn[
        :title='$t("writer.sidebar.title.themeSelector")'
        :class='isActive("ThemeSelector")'
        @click='setSidebarPage("ThemeSelector")'
      ]
        .icon.icon-adjust-contrast

      .btn[
        :title='$t("writer.sidebar.title.share")'
        v-if='showShareButton'
      ]
        .icon.icon-world-outline
</template>

<script>
  import { Sidebar } from '@/helpers/store_helper'
  import { openProjectMenu } from '@/helpers/project_menu'
  import Config from '@/config/config'

  export default {
    name: 'Controls',

    computed: {
      showShareButton () {
        return Config.showShareButton
      }
    },

    methods: {
      isActive (page) {
        return Sidebar.sidebarPage == page
          ? 'active'
          : ''
      },

      setSidebarPage (page) {
        this.$store.commit('sidebarSetPage', page)
      },

      openProjectMenu (event) {
        openProjectMenu(event, this.$store.dispatch, this.$t)
      }
    }
  }
</script>

<style lang='sass' scoped>
  #sidebar-controls
    display: flex
    justify-content: space-between

  .btns
    display: flex
    flex-direction: row

  .btn
    display: flex
    align-items: center
    justify-content: center
    position: relative
    width: $sidebar-controls-width
    height: $sidebar-controls-height
    cursor: pointer
    transition: color .3s

    .icon
      font-size: 14px

    .icon-adjust-contrast
      font-size: 18px

    &.active,
    &:hover
      color: $color-action

      &:after
        opacity: 1
</style>
