<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div v-if="checkout">
      <b>Enter the email you used to register:</b>
      <input v-model.trim="email">
      <input type="button" value="Submit" v-on:click=checkRegistration>
    </div>
    <b>Number of Dips: {{dipnumber['.value']}}</b>
    <ul>
      <li v-for="person of attendees" :key="person['.key']">{{person.email}}</li>
    </ul>
  </div>
</template>

<script>
import { dipRegistrantNumberRef } from './firebase';
import { attendeesRef } from './firebase';

export default {
  name: 'app',
  data() {
    return {
      email: 'scbelldvm@gmail.com',
      checkout: 'false',
      checkoutAmt: '',
      registrant: {}
    }
  },
  methods: {
    checkRegistration: function() {
      this.registrant = this.attendees.find(regUser => regUser.email.toLowerCase() === this.email.toLowerCase());
      // console.log("Already registered: " + found);
      if(this.registrant) {
        console.log("Found: " + this.registrant.name)
        console.log("Found: " + this.registrant.category)

        switch (this.registrant.category) {
          case 'aecvodip':
            this.checkoutAmt = 350;
            this.checkout = true;
            break;
          case 'presenter':
          case 'houseofficer':
            this.checkoutAmt = 250;
            this.checkout = true;
            break;
          case 'other':
            this.checkoutAmt = 450;
            this.checkout = true;
            break;
          default: 
            this.checkoutAmt = -1;
            this.checkout = false;
            break;
        }
      } else {
        console.log("Not found!")
      }
    }
  },
  components: {
  }, 
  firebase: {
    attendees: attendeesRef,
    dipnumber: {
      source: dipRegistrantNumberRef,
      asObject: true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
