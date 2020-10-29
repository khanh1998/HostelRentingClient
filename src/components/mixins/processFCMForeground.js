import { mapActions } from 'vuex';
import firebase from '../../config/firebase';
import actions from '../../config/pushNotificationActions';

const { messaging } = firebase;

const processFCMForegroundMixins = {
  data: () => ({
    newMessage: null,
    messages: [],
  }),
  methods: {
    ...mapActions({
      getNewCommingBooking: 'user/getOneBooking',
      updateBookingStatusLocal: 'user/updateBookingStatusLocal',
      updateContractLocal: 'user/updateContractLocal',
    }),
    registerMessaging() {
      if (messaging) {
        messaging.onMessage(this.receiveNewMessage);
      }
    },
    receiveNewMessage(payload) {
      console.log(payload);
      this.newMessage = payload;
      this.messages.push(this.newMessage);
      switch (this.newMessage.data.action) {
        case actions.NEW_BOOKING:
          this.getNewCommingBooking(Number(this.newMessage.data.bookingId));
          break;
        case actions.SCAN_BOOKING: // vendor side
          this.updateBookingStatusLocal(Number(this.newMessage.data.bookingId));
          break;
        case actions.SCAN_CONTRACT: // vendor side
          this.updateContractLocal(Number(this.newMessage.data.contractId));
          break;
        default:
          console.log('default case on receive new notification');
          break;
      }
    },
  },
};

export default processFCMForegroundMixins;
