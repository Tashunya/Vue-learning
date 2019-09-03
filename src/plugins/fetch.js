import state from '../state'
import router from '../router'

let baseUrl

export async function $fetch(url, options) {
  // The default options tell the server we will always send JSON in the request body, and tell the browser that we will also include the authorization token necessary to authenticate the user if they are logged in.
  const finalOptions = Object.assign ({},{
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }, options)
  const response = await fetch(`${baseUrl}${url}`, finalOptions)
  if (response.ok) {
    const data = await response.json()
    return data
  } else if (response.status === 403) {
    state.user = null
    if (router.currentRoute.matched.some(r => r.meta.private)) {
      router.replace({ name: 'login', params: {
        wantedRoute: router.currentRoute.fullPath,
      }})
    }  
  } else {
    const message = await response.text()
    const error = new Error('error')
    error.response = response
    throw error
  }
}

export default {
  install(Vue, options) {
    console.log("Installed!", options)
    baseUrl = options.baseUrl

    Vue.prototype.$fetch = $fetch
  },
}
