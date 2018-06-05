import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import VueStripeCheckout from 'vue-stripe-checkout'

const options = {
  key: 'pk_test_loAPqOiMFuxDx3my2xE3b40D',
  image: 'https://cdn.meme.am/images/100x100/15882140.jpg',
  locale: 'auto',
  currency: 'PHP',
  billingAddress: true,
  panelLabel: 'Pay {{amount}}'
}

// explicit installation required in module environments
Vue.use(VueFire)
Vue.use(VueStripeCheckout, options);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
