<template>
  <div>
    <h2>SignUp</h2>+84
    <input type="number" v-model="phNo" placeholder="Phone Number" />
    <button id="sign-in-button" @click="sendOtp">Get OTP</button>
    <div id="recaptcha-container"></div>
    <br />
    <input type="number" v-model="otp" placeholder="OTP" />
    <button @click="verifyOtp">Verify</button>
    <br />
    <button @click="sendOtp()">Resend OTP</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      phNo: '',
      appVerifier: '',
      otp: '',
    };
  },
  methods: {
    sendOtp() {
      if (this.phNo.length < 4) {
        alert('Invalid Phone Number Format !');
      } else {
        //
        const countryCode = '+84'; // india
        const phoneNumber = countryCode + this.phNo;
        //
        const { appVerifier } = this;
        //
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            //
            alert('SMS sent');
          })
          .catch((error) => {
            // Error; SMS not sent
            // ...
            console.log(error);
            alert('Error ! SMS not sent');
          });
      }
    },
    //
    verifyOtp() {
      if (this.phNo.length < 3 || this.otp.length < 3) {
        alert('Invalid Phone Number/OTP Format !');
      } else {
        //
        const vm = this;
        const code = this.otp;
        //
        window.confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const { user } = result;
            console.log(user);
            // ...
            // route to set password !
            vm.$router.push({ path: '/setPassword' });
          })
          .catch((error) => {
            console.log(error);
            // User couldn't sign in (bad verification code?)
            // ...
          });
      }
    },
    initReCaptcha() {
      setTimeout(() => {
        const vm = this;
        console.log(vm);
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          size: 'invisible',
          callback(response) {
            console.log(response);
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          'expired-callback': function () {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        });
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
  },
  created() {
    this.initReCaptcha();
  },
};
</script>
