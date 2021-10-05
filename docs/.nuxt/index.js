import Vue from 'vue'

import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_googleanalytics_b4ef2da8 from 'nuxt_plugin_googleanalytics_b4ef2da8' // Source: ./google-analytics.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render(h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  },
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true,
})

Vue.use(Meta, { keyName: 'head', attribute: 'data-n-head', ssrAttribute: 'data-n-head-ssr', tagIDKeyName: 'hid' })

const defaultTransition = {
  name: 'page',
  mode: 'out-in',
  appear: false,
  appearClass: 'appear',
  appearActiveClass: 'appear-active',
  appearToClass: 'appear-to',
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {
      title: 'JsStore - Think in SQL and do in JS',
      meta: [
        { name: 'theme-color', content: '#42a5f5' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Ujjwal Gupta' },
        { name: 'Rating', content: 'General' },
        { name: 'Revisit-After', content: '1 days' },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { property: 'og:title', content: 'JsStore - Think in SQL and do in JS' },
        { property: 'og:type', content: 'IndexedDB wrapper' },
        { property: 'og:url', content: 'http:\u002F\u002Fjsstore.net\u002F' },
        { property: 'og:site_name', content: 'JsStore' },
        {
          property: 'og:description',
          content: 'JsStore is an IndexedDB Wrapper. It makes IndexedDB super easy with its SQL like apis.',
        },
        { property: 'og:image', content: '\u002Fimg\u002FJsStore_1200_630.png' },
        { property: 'og:image', content: '\u002Fimg\u002FjsStore_500_500.png' },
        { name: 'twitter:creator', content: '@ujjwal_kr_gupta' },
        { name: 'twitter:title', content: 'JsStore - Think in SQL and do in JS' },
        {
          name: 'twitter:description',
          content: 'JsStore is an IndexedDB Wrapper. It makes IndexedDB super easy with its SQL like apis.',
        },
        { name: 'twitter:image', content: 'http:\u002F\u002Fjsstore.net\u002Fimg\u002FJsStore_1200_630.png' },
      ],
      link: [
        { rel: 'preconnect', href: 'https:\u002F\u002Ffonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Jost&display=swap' },
        {
          rel: 'stylesheet',
          href: 'https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Jost:wght@700&display=swap',
        },
        {
          rel: 'stylesheet',
          href:
            '\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fhighlight.js\u002F10.7.2\u002Fstyles\u002Fdefault.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https:\u002F\u002Fuse.fontawesome.com\u002Freleases\u002Fv5.5.0\u002Fcss\u002Fall.css',
          integrity: 'sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU',
          crossorigin: 'anonymous',
        },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '\u002Fapple-touch-icon.png' },
        { rel: 'icon', type: 'image\u002Fpng', sizes: '32x32', href: '\u002Ffavicon-32x32.png' },
        { rel: 'icon', type: 'image\u002Fpng', sizes: '16x16', href: '\u002Ffavicon-16x16.png' },
        { rel: 'manifest', href: '\u002Fmanifest.json' },
        { rel: 'mask-icon', href: '\u002Fsafari-pinned-tab.svg', color: '#5bbad5' },
        {
          href: 'https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900|Material+Icons',
          rel: 'stylesheet',
        },
      ],
      script: [
        {
          src:
            '\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fhighlight.js\u002F10.7.2\u002Fhighlight.min.js',
        },
      ],
      style: [],
    },

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions(transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map(transition => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error(err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      },
    },
    ...App,
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext,
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get() {
            return this.$root.$options[key]
          },
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function(previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (process.client && typeof nuxt_plugin_googleanalytics_b4ef2da8 === 'function') {
    await nuxt_plugin_googleanalytics_b4ef2da8(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function() {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    router.push(app.context.route.fullPath, resolve, err => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    app,
    router,
  }
}

export { createApp, NuxtError }
