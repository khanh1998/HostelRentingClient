import { mapActions } from 'vuex';
import firebase from '../../config/firebase';
import actions from '../../config/pushNotificationActions';

const { messaging } = firebase;

const processFCMForegroundMixins = {
  data: () => ({
    newMessage: null,
  }),
  methods: {
    ...mapActions({
      getNewCommingBooking: 'user/getOneBooking',
      updateBookingStatusLocal: 'user/updateBookingStatusLocal',
      updateContractLocal: 'user/updateContractLocal',
      addNotificationLocal: 'user/addNotificationLocal',
    }),
    registerMessaging() {
      if (messaging) {
        messaging.onMessage(this.receiveNewMessage);
      }
    },
    receiveNewMessage(payload) {
      console.log(payload);
      this.newMessage = payload;
      this.addNotificationLocal(payload);
      switch (this.newMessage.data.action) {
        case actions.NEW_BOOKING:
          this.getNewCommingBooking(Number(this.newMessage.data.id));
          break;
        case actions.SCAN_BOOKING: // vendor side
          this.updateBookingStatusLocal(Number(this.newMessage.data.id));
          break;
        case actions.SCAN_CONTRACT: // vendor side
          this.updateContractLocal(Number(this.newMessage.data.contractId));
          break;
        case actions.NEW_MESSAGE:
          break;
        default:
          console.log('default case on receive new notification');
          break;
      }
    },
  },
  created() {},
};

export default processFCMForegroundMixins;
