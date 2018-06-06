import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import VueStripeCheckout from 'vue-stripe-checkout'

const options = {
  key: 'pk_live_rNrIXxEyBd9tpTLxTw0P4iiA',
  image: 'https://vosmeeting.com/sponsor/static/img/VOSlogo-small.png',
  locale: 'auto',
  currency: 'PHP',
  billingAddress: false,
  zipCode: true,
  panelLabel: 'Pay {{amount}}'
}

// explicit installation required in module environments
Vue.use(VueFire)
Vue.use(VueStripeCheckout, options);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
