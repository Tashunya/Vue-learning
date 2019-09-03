import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import Login from './components/Login.vue'
import TicketsLayout from './components/TicketsLayout.vue'
import Tickets from './components/Tickets.vue'
import NewTicket from './components/NewTicket.vue'
import state from './state'


Vue.use(VueRouter);

const routes = [
  // routes
  // A route is an object containing a path, a name, and a component to render
  //  The route name is optional, but I strongly recommend using it. It allows you to specify the names of the routes instead of the path, so that you can move and change your routes around without ending up with broken links.
  { path: '/', name: 'home', component: Home },
  { path: '/faq', name: 'faq', component: FAQ },
  { path: '/login', name: 'login', component: Login,
  meta: { guest: true } },
  { path: '/tickets', component: TicketsLayout, meta: { private: true }, children: [
    { path: '', name: 'tickets', component: Tickets },
    { path: 'new', name: 'new-ticket', component: NewTicket },
  ] },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) =>{
  console.log("to", to.name)
  if (to.matched.some(r => r.meta.private) && !state.user) {
    // Redirect to login
    next({
      name: "login",
      params: {
        wantedRoute: to.fullPath,
      },
    })
    return
  }
  if (to.matched.some(r => r.meta.guest) && state.user) {
    next({ name: 'home'})
    return
  }
  next()
})

export default router
