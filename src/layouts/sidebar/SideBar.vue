<template>
  <div
    class="vaw-side-bar-wrapper"
    :class="[!state.isCollapse ? 'open-status' : 'close-status']"
  >
    <transition name="logo">
      <Logo v-if="showLogo" />
    </transition>
    <ScrollerMenu>
      <template v-for="item of routes">
        <SideBarItem
          :key="item.path"
          :full-path="item.path"
          :item="item"
        />
      </template>
    </ScrollerMenu>
    <div class="mobile-shadow"></div>
  </div>
</template>

<script>
import store from '../store/index'
import NextPageInfo from '@/router/next-page/routes'
import { Layout } from '@/layouts'

export default {
  name: 'SideBar',
  props: {
    showLogo: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      state: store.state
    }
  },
  computed: {
    routes() {
      return [
        ...NextPageInfo,
        {
          path: '/redirect',
          component: Layout,
          hidden: true,
          children: [
            {
              path: '/redirect/:path(.*)',
              component: () => import('@/views/redirect/index')
            }
          ]
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/login'),
          hidden: true
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/register'),
          hidden: true
        },
        {
          path: '/forget',
          name: 'forget',
          component: () => import('@/views/forget'),
          hidden: true
        },
        {
          path: '/personal',
          name: 'personal',
          component: Layout,
          hidden: true,
          children: [
            {
              path: 'center',
              name: 'personalCenter',
              component: () => import('@/views/personal'),
              meta: {
                title: 'Personal Center'
              }
            }
          ]
        },
        {
          path: '/editor',
          name: 'editor',
          component: Layout,
          hidden: true,
          children: [
            {
              path: 'rich-text',
              name: 'richText',
              component: () => import('@/views/editor/rich-text'),
              meta: {
                title: 'Document Editing'
              }
            }
          ]
        },
        {
          path: '/editor',
          name: 'editor',
          component: Layout,
          hidden: true,
          children: [
            {
              path: 'rich-text-group',
              name: 'richTextGroup',
              component: () => import('@/views/editor/rich-text-group'),
              meta: {
                title: 'Team Document Editing'
              }
            }
          ]
        },
        {
          path: '/editor',
          name: 'editor',
          component: Layout,
          hidden: true,
          children: [
            {
              path: 'rich-text-readonly',
              name: 'richTextReadOnly',
              component: () => import('@/views/editor/rich-text-readonly'),
              meta: {
                title: 'Read-only Document'
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: Layout,
          hidden: true,
          children: [
            {
              path: 'table-template',
              name: 'tableTemplate',
              component: () => import('@/views/list/table-template'),
              meta: {
                title: 'Template Selection'
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: Layout,
          hidden: false,
          children: [
            {
              path: 'table-latest',
              name: 'tableLatest',
              component: () => import('@/views/list/table-latest'),
              meta: {
                title: 'Recently Viewed Files'
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: Layout,
          hidden: false,
          children: [
            {
              path: 'table-like',
              name: 'tableLike',
              component: () => import('@/views/list/table-like'),
              meta: {
                title: 'Recently Favorited Files'
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: Layout,
          hidden: false,
          children: [
            {
              path: 'table-created',
              name: 'tableCreated',
              component: () => import('@/views/list/table-created'),
              meta: {
                title: 'Personal Files'
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: Layout,
          hidden: false,
          children: [
            {
              path: 'table-share',
              name: 'tableShare',
              component: () => import('@/views/list/table-share'),
              meta: {
                title: 'Shared with Me'
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: Layout,
          hidden: false,
          children: [
            {
              path: 'table-group',
              name: 'tableGroup',
              component: () => import('@/views/list/table-group'),
              meta: {
                title: 'Team Space'
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: Layout,
          hidden: true,
          children: [
            {
              path: 'table-group-member',
              name: 'tableGroupMember',
              component: () => import('@/views/list/table-group-member'),
              meta: {
                title: 'Team Members'
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: Layout,
          hidden: true,
          children: [
            {
              path: 'table-group-file',
              name: 'tableGroupFile',
              component: () => import('@/views/list/table-group-file'),
              meta: {
                title: 'Team Files'
              }
            }
          ]
        },
        {
          path: '/list',
          name: 'list',
          component: Layout,
          hidden: false,
          children: [
            {
              path: 'table-recover',
              name: 'tableRecover',
              component: () => import('@/views/list/table-recover'),
              meta: {
                title: 'Recycle Bin'
              }
            }
          ]
        },
        {
          path: '/',
          name: 'root',
          redirect: '/index/main',
          hidden: true
        },
        {
          path: '/index/main',
          name: 'main',
          redirect: '/list/table-latest',
          hidden: true
        }
      ].filter((it) => !!it.name)
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.hiddenSiderbar) {
        this.hiddenSiderbar = true
      } else {
        this.hiddenSiderbar = false
      }
    }
  },
  mounted() {
    if (this.$route.meta.hiddenSiderbar) {
      this.hiddenSiderbar = true
    } else {
      this.hiddenSiderbar = false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
.open-status {
  width: $menuWidth;
  box-shadow: 2px 5px 5px rgb(47, 187, 212);
  transition: all $transitionTime;
}
.close-status {
  width: $minMenuWidth;
  box-shadow: none;
  transition: all $transitionTime;
}
.vaw-side-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
  z-index: 999;
  .vaw-menu-wrapper {
    overflow-x: hidden;
    color: white;
  }
  .scrollbar {
    height: calc(100% - #{$logoHeight}) !important;
  }
}
.is-mobile {
  .open-status {
    width: $menuWidth;
    transform: translateX(0);
    transition: transform $transitionTime;
  }
  .close-status {
    width: $menuWidth;
    transform: translateX(-$menuWidth);
    transition: transform $transitionTime;
    box-shadow: none;
  }
}
</style>
<style lang="scss">
@import "../../assets/styles/variables.scss";
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
.el-menu {
  overflow: hidden !important;
  border-right: none !important;
}
::v-deep {
  .el-menu--collapse .el-submenu__title span {
    display: none !important;
  }
  .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none !important;
  }
}
</style>
