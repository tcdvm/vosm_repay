import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import VueStripeCheckout from 'vue-stripe-checkout'
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

const options = {
  // key: 'pk_test_loAPqOiMFuxDx3my2xE3b40D',
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
Vue.use(Buefy)
Vue.use(VueStripeCheckout, options);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
