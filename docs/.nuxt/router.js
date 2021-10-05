import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0b071178 = () => interopDefault(import('../src/pages/footer.vue' /* webpackChunkName: "pages/footer" */))
const _2c914548 = () => interopDefault(import('../src/pages/menu.vue' /* webpackChunkName: "pages/menu" */))
const _1f1ad166 = () =>
  interopDefault(import('../src/pages/docs/adv-sql-example.vue' /* webpackChunkName: "pages/docs/adv-sql-example" */))
const _7cabe0d8 = () =>
  interopDefault(import('../src/pages/docs/aggregate.vue' /* webpackChunkName: "pages/docs/aggregate" */))
const _404486c6 = () =>
  interopDefault(import('../src/pages/docs/between.vue' /* webpackChunkName: "pages/docs/between" */))
const _954e862a = () => interopDefault(import('../src/pages/docs/case.vue' /* webpackChunkName: "pages/docs/case" */))
const _ac3940a2 = () =>
  interopDefault(
    import('../src/pages/docs/change-table-design.vue' /* webpackChunkName: "pages/docs/change-table-design" */)
  )
const _f6c290bc = () => interopDefault(import('../src/pages/docs/clear.vue' /* webpackChunkName: "pages/docs/clear" */))
const _7ff1555e = () =>
  interopDefault(import('../src/pages/docs/column.vue' /* webpackChunkName: "pages/docs/column" */))
const _7e2bd94e = () =>
  interopDefault(import('../src/pages/docs/connection.vue' /* webpackChunkName: "pages/docs/connection" */))
const _20f12164 = () => interopDefault(import('../src/pages/docs/count.vue' /* webpackChunkName: "pages/docs/count" */))
const _7bfefe52 = () =>
  interopDefault(import('../src/pages/docs/data-type.vue' /* webpackChunkName: "pages/docs/data-type" */))
const _19faec36 = () =>
  interopDefault(import('../src/pages/docs/database.vue' /* webpackChunkName: "pages/docs/database" */))
const _3a4a6137 = () =>
  interopDefault(import('../src/pages/docs/distinct.vue' /* webpackChunkName: "pages/docs/distinct" */))
const _202892b1 = () =>
  interopDefault(import('../src/pages/docs/drop-db.vue' /* webpackChunkName: "pages/docs/drop-db" */))
const _40543b32 = () => interopDefault(import('../src/pages/docs/enums.vue' /* webpackChunkName: "pages/docs/enums" */))
const _5b82f522 = () => interopDefault(import('../src/pages/docs/event.vue' /* webpackChunkName: "pages/docs/event" */))
const _7b8f56ce = () =>
  interopDefault(import('../src/pages/docs/flatten.vue' /* webpackChunkName: "pages/docs/flatten" */))
const _d97093c2 = () =>
  interopDefault(import('../src/pages/docs/get-started.vue' /* webpackChunkName: "pages/docs/get-started" */))
const _0b389ecc = () =>
  interopDefault(import('../src/pages/docs/helpers.vue' /* webpackChunkName: "pages/docs/helpers" */))
const _154c8a12 = () =>
  interopDefault(import('../src/pages/docs/idbstudio.vue' /* webpackChunkName: "pages/docs/idbstudio" */))
const _fdf4ba40 = () =>
  interopDefault(import('../src/pages/docs/ignore-case.vue' /* webpackChunkName: "pages/docs/ignore-case" */))
const _1ce4764a = () =>
  interopDefault(import('../src/pages/docs/import-scripts.vue' /* webpackChunkName: "pages/docs/import-scripts" */))
const _c8a88dc0 = () => interopDefault(import('../src/pages/docs/in.vue' /* webpackChunkName: "pages/docs/in" */))
const _08f32b04 = () =>
  interopDefault(
    import('../src/pages/docs/initiate-database.vue' /* webpackChunkName: "pages/docs/initiate-database" */)
  )
const _771cdb34 = () =>
  interopDefault(import('../src/pages/docs/insert.vue' /* webpackChunkName: "pages/docs/insert" */))
const _64bf37f5 = () =>
  interopDefault(import('../src/pages/docs/installation.vue' /* webpackChunkName: "pages/docs/installation" */))
const _9e1c7218 = () =>
  interopDefault(import('../src/pages/docs/intersect.vue' /* webpackChunkName: "pages/docs/intersect" */))
const _6fc12d99 = () =>
  interopDefault(import('../src/pages/docs/keypath.vue' /* webpackChunkName: "pages/docs/keypath" */))
const _1463345c = () => interopDefault(import('../src/pages/docs/like.vue' /* webpackChunkName: "pages/docs/like" */))
const _4a3eb40d = () =>
  interopDefault(import('../src/pages/docs/middleware.vue' /* webpackChunkName: "pages/docs/middleware" */))
const _9be7dc1a = () =>
  interopDefault(import('../src/pages/docs/multi-entry.vue' /* webpackChunkName: "pages/docs/multi-entry" */))
const _80cb93b8 = () =>
  interopDefault(import('../src/pages/docs/operators.vue' /* webpackChunkName: "pages/docs/operators" */))
const _0470ccb0 = () =>
  interopDefault(import('../src/pages/docs/optimization.vue' /* webpackChunkName: "pages/docs/optimization" */))
const _b3bdaa44 = () => interopDefault(import('../src/pages/docs/or.vue' /* webpackChunkName: "pages/docs/or" */))
const _2674baae = () =>
  interopDefault(import('../src/pages/docs/plugin.vue' /* webpackChunkName: "pages/docs/plugin" */))
const _632536c8 = () => interopDefault(import('../src/pages/docs/regex.vue' /* webpackChunkName: "pages/docs/regex" */))
const _7f01337f = () =>
  interopDefault(import('../src/pages/docs/remove.vue' /* webpackChunkName: "pages/docs/remove" */))
const _7fdfe53a = () =>
  interopDefault(import('../src/pages/docs/select/index.vue' /* webpackChunkName: "pages/docs/select/index" */))
const _eeb8467e = () =>
  interopDefault(import('../src/pages/docs/sqlweb.vue' /* webpackChunkName: "pages/docs/sqlweb" */))
const _59d894a3 = () => interopDefault(import('../src/pages/docs/table.vue' /* webpackChunkName: "pages/docs/table" */))
const _2e9eaf36 = () =>
  interopDefault(import('../src/pages/docs/terminate.vue' /* webpackChunkName: "pages/docs/terminate" */))
const _7ea181f3 = () =>
  interopDefault(import('../src/pages/docs/transaction.vue' /* webpackChunkName: "pages/docs/transaction" */))
const _a71571b8 = () => interopDefault(import('../src/pages/docs/union.vue' /* webpackChunkName: "pages/docs/union" */))
const _2be2c944 = () =>
  interopDefault(import('../src/pages/docs/update.vue' /* webpackChunkName: "pages/docs/update" */))
const _acbacd3e = () =>
  interopDefault(
    import('../src/pages/docs/update-with-operators.vue' /* webpackChunkName: "pages/docs/update-with-operators" */)
  )
const _193ac9b9 = () =>
  interopDefault(import('../src/pages/docs/v2-to-v3.vue' /* webpackChunkName: "pages/docs/v2-to-v3" */))
const _d2843d88 = () => interopDefault(import('../src/pages/docs/where.vue' /* webpackChunkName: "pages/docs/where" */))
const _59a33dad = () =>
  interopDefault(import('../src/pages/docs/select/group-by.vue' /* webpackChunkName: "pages/docs/select/group-by" */))
const _fef8e41c = () =>
  interopDefault(import('../src/pages/docs/select/join.vue' /* webpackChunkName: "pages/docs/select/join" */))
const _17fa6ba3 = () =>
  interopDefault(import('../src/pages/docs/select/limit.vue' /* webpackChunkName: "pages/docs/select/limit" */))
const _b8f81404 = () =>
  interopDefault(import('../src/pages/docs/select/order-by.vue' /* webpackChunkName: "pages/docs/select/order-by" */))
const _53f163c7 = () =>
  interopDefault(import('../src/pages/docs/select/skip.vue' /* webpackChunkName: "pages/docs/select/skip" */))
const _d9d3108e = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [
    {
      path: '/footer',
      component: _0b071178,
      name: 'footer',
    },
    {
      path: '/menu',
      component: _2c914548,
      name: 'menu',
    },
    {
      path: '/docs/adv-sql-example',
      component: _1f1ad166,
      name: 'docs-adv-sql-example',
    },
    {
      path: '/docs/aggregate',
      component: _7cabe0d8,
      name: 'docs-aggregate',
    },
    {
      path: '/docs/between',
      component: _404486c6,
      name: 'docs-between',
    },
    {
      path: '/docs/case',
      component: _954e862a,
      name: 'docs-case',
    },
    {
      path: '/docs/change-table-design',
      component: _ac3940a2,
      name: 'docs-change-table-design',
    },
    {
      path: '/docs/clear',
      component: _f6c290bc,
      name: 'docs-clear',
    },
    {
      path: '/docs/column',
      component: _7ff1555e,
      name: 'docs-column',
    },
    {
      path: '/docs/connection',
      component: _7e2bd94e,
      name: 'docs-connection',
    },
    {
      path: '/docs/count',
      component: _20f12164,
      name: 'docs-count',
    },
    {
      path: '/docs/data-type',
      component: _7bfefe52,
      name: 'docs-data-type',
    },
    {
      path: '/docs/database',
      component: _19faec36,
      name: 'docs-database',
    },
    {
      path: '/docs/distinct',
      component: _3a4a6137,
      name: 'docs-distinct',
    },
    {
      path: '/docs/drop-db',
      component: _202892b1,
      name: 'docs-drop-db',
    },
    {
      path: '/docs/enums',
      component: _40543b32,
      name: 'docs-enums',
    },
    {
      path: '/docs/event',
      component: _5b82f522,
      name: 'docs-event',
    },
    {
      path: '/docs/flatten',
      component: _7b8f56ce,
      name: 'docs-flatten',
    },
    {
      path: '/docs/get-started',
      component: _d97093c2,
      name: 'docs-get-started',
    },
    {
      path: '/docs/helpers',
      component: _0b389ecc,
      name: 'docs-helpers',
    },
    {
      path: '/docs/idbstudio',
      component: _154c8a12,
      name: 'docs-idbstudio',
    },
    {
      path: '/docs/ignore-case',
      component: _fdf4ba40,
      name: 'docs-ignore-case',
    },
    {
      path: '/docs/import-scripts',
      component: _1ce4764a,
      name: 'docs-import-scripts',
    },
    {
      path: '/docs/in',
      component: _c8a88dc0,
      name: 'docs-in',
    },
    {
      path: '/docs/initiate-database',
      component: _08f32b04,
      name: 'docs-initiate-database',
    },
    {
      path: '/docs/insert',
      component: _771cdb34,
      name: 'docs-insert',
    },
    {
      path: '/docs/installation',
      component: _64bf37f5,
      name: 'docs-installation',
    },
    {
      path: '/docs/intersect',
      component: _9e1c7218,
      name: 'docs-intersect',
    },
    {
      path: '/docs/keypath',
      component: _6fc12d99,
      name: 'docs-keypath',
    },
    {
      path: '/docs/like',
      component: _1463345c,
      name: 'docs-like',
    },
    {
      path: '/docs/middleware',
      component: _4a3eb40d,
      name: 'docs-middleware',
    },
    {
      path: '/docs/multi-entry',
      component: _9be7dc1a,
      name: 'docs-multi-entry',
    },
    {
      path: '/docs/operators',
      component: _80cb93b8,
      name: 'docs-operators',
    },
    {
      path: '/docs/optimization',
      component: _0470ccb0,
      name: 'docs-optimization',
    },
    {
      path: '/docs/or',
      component: _b3bdaa44,
      name: 'docs-or',
    },
    {
      path: '/docs/plugin',
      component: _2674baae,
      name: 'docs-plugin',
    },
    {
      path: '/docs/regex',
      component: _632536c8,
      name: 'docs-regex',
    },
    {
      path: '/docs/remove',
      component: _7f01337f,
      name: 'docs-remove',
    },
    {
      path: '/docs/select',
      component: _7fdfe53a,
      name: 'docs-select',
    },
    {
      path: '/docs/sqlweb',
      component: _eeb8467e,
      name: 'docs-sqlweb',
    },
    {
      path: '/docs/table',
      component: _59d894a3,
      name: 'docs-table',
    },
    {
      path: '/docs/terminate',
      component: _2e9eaf36,
      name: 'docs-terminate',
    },
    {
      path: '/docs/transaction',
      component: _7ea181f3,
      name: 'docs-transaction',
    },
    {
      path: '/docs/union',
      component: _a71571b8,
      name: 'docs-union',
    },
    {
      path: '/docs/update',
      component: _2be2c944,
      name: 'docs-update',
    },
    {
      path: '/docs/update-with-operators',
      component: _acbacd3e,
      name: 'docs-update-with-operators',
    },
    {
      path: '/docs/v2-to-v3',
      component: _193ac9b9,
      name: 'docs-v2-to-v3',
    },
    {
      path: '/docs/where',
      component: _d2843d88,
      name: 'docs-where',
    },
    {
      path: '/docs/select/group-by',
      component: _59a33dad,
      name: 'docs-select-group-by',
    },
    {
      path: '/docs/select/join',
      component: _fef8e41c,
      name: 'docs-select-join',
    },
    {
      path: '/docs/select/limit',
      component: _17fa6ba3,
      name: 'docs-select-limit',
    },
    {
      path: '/docs/select/order-by',
      component: _b8f81404,
      name: 'docs-select-order-by',
    },
    {
      path: '/docs/select/skip',
      component: _53f163c7,
      name: 'docs-select-skip',
    },
    {
      path: '/',
      component: _d9d3108e,
      name: 'index',
    },
  ],

  fallback: false,
}

export function createRouter(ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push(location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
