<template>
  <div id="app">
    <div class="container">
      <!-- <div class="spacer1"></div> -->

      <div class="logo">
        <img src="./assets/VOSlogo.png">
      </div>
      <div class="info">
        <div v-if="state === 'email' || state === 'notregistered'">
        <!-- <div> -->
          <p>So, something went wrong when you tried to pay. Let's try again!</p><br/>
          <b>Please enter the email you used to register:</b><br/>
          <!-- <input v-model.trim="email"> -->
          <b-field>
            <b-input placeholder="Email"
                type="email"
                icon="email"
                v-model.trim="email">
            </b-input>
          </b-field>

          <input class="button is-light" type="button" value="Submit" v-on:click=checkRegistration>
        </div>
        <div v-if="state === 'registered'">
          <p>We've found your registration! Please verify the information below. If it looks accurate, please click on the payment link.</p><br>
          <ul>
          <li>Name: <b>{{this.registrant.name}}</b></li>
          <li>Email: <b>{{this.registrant.email}}</b></li>
          <li>Company: <b>{{this.registrant.company}}</b></li>
          <li>Registration Category: <b>{{this.registrationCategory}}</b></li>
          </ul><br>
          <button class="button is-link" @click="checkout">Pay Registration</button><br>

          <p>If there is a mistake in the information above, please email us at <a href="mailto:vetophthosurgerymeeting@gmail.com">vetophthosurgerymeeting@gmail.com</a></p>

        </div>
        <div v-if="state === 'notregistered'">
          <p>We have not found your registration using the email above. Please click <a href="https://vosmeeting.com">here</a> to get to the VOSM homepage to register (and pay) or try another email.</p>
        </div>
        <div v-if="state === 'paymentcomplete'">
          <p>Thank you for paying! Please check your email/account to ensure the payment was successfully completely. If it has not, please contact us at <a href="mailto:vetophthosurgerymeeting@gmail.com">vetophthosurgerymeeting@gmail.com</a></p>
        </div>
      </div>
    <!-- <ul>
      <li v-for="person of attendees" :key="person['.key']">{{person.email}}</li>
    </ul> -->
    <!-- <div class="spacer2"></div> -->
    <!-- <div class="footer"></div> -->
    </div>
  </div>
</template>

<script>
import { dipRegistrantNumberRef } from './firebase';
import { attendeesRef } from './firebase';
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      email: '',
      state: 'email',
      checkoutAmt: '',
      registrationCategory: '',
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
            this.state = "registered";
            this.registrationCategory = "ACVO/ECVO Diplomate";
            break;
          case 'presenter':
            this.registrationCategory = "Presenter";
            this.state = "registered";
            this.checkoutAmt = 250;
            break;
          case 'houseofficer':
            this.checkoutAmt = 250;
            this.registrationCategory = "House Officer";
            this.state = "registered";
            break;
          case 'other':
            this.checkoutAmt = 450;
            this.registrationCategory = "Non-Diplomate";
            this.state = "registered";
            break;
          default: 
            this.checkoutAmt = -1;
            this.state = "error";
            break;
        }
      } else {
        console.log("Not found!")
        this.state = "notregistered";
      }
    },
    checkout: function() {
      this.$checkout.open({
        name: 'VOSM Re-registration',
        currency: 'USD',
        amount: this.checkoutAmt*100,
        token: (token) => {
          console.log('token ->', token);
          axios.post('https://vosmeeting.com/vosm_payment/charge', {
            stripeToken: token.id,
            amount: this.checkoutAmt*100,
            email: token.email
          },
          {
            config: {headers: {'Content-Type': 'application/json'}}
          }).then(
            // console.log("Payment Complete");
            // console.log(response);
            this.state = "paymentcomplete"
          ).catch(error => {
            console.log("Error: " + error)
          })
        }
      })
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

.container {
  display: grid;
  min-height: 100%;
  justify-items: center;
  align-items: center;
  grid-template-areas: "logo" 
                       "info" 
                       "footer"
}

.info {
  grid-area: info;
  text-align: center;
  padding: 2rem;
}

.logo {
  grid-area: logo;
}

.footer {
  padding: 2.5rem;
  grid-area: footer;
  background-color: #FFF;
}

.img {
  max-width: 70%;
  height: auto;
}

@media only screen and (min-width: 1100px) {
  .container {
    display: grid;
    min-height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 100px;
    justify-items: center;
    align-items: center;
    grid-template-areas: "logo info"; 
  }

  .info {
    grid-area: info;
    text-align: left;
    padding: 2rem;
  }

  .spacer1 {
    grid-area: spacer1;
  }
  .spacer2 {
    grid-area: spacer2;
  }

  img {
    max-width: 90%;
    height: auto;
  }
}

</style>
