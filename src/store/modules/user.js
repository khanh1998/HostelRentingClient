const myState = () => ({
  user: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
  },
  contracts: {
    data: [],
    isLoading: false,
    success: null,
    error: null,
  },
  bookings: {
    data: [],
    isLoading: false,
    success: null,
    error: null,
    newlyCreated: null,
  },
  deals: {
    data: [],
    isLoading: false,
    success: null,
    error: null,
    newlyCreated: null,
  },
});

const myGetters = {
  // get lasted deal
  findLastedDeal: (state) => (renterId, vendorId, typeId) => {
    let result = state.deals.data.filter((deal) => {
      if (deal.renter.renterId === renterId &&
        deal.vendor.vendorId === vendorId &&
        deal.type.typeId === typeId &&
        deal.status === 'CREATED') {
        return true;
      }
      return false;
    });
    result = result.sort((deal1, deal2) => deal1.creationTime - deal2.creationTime);
    console.log(`lasted deal: ${result[0]}`);
    return result[0];
  },
  findPendingBooking: (state) => (renterId, vendorId, typeId) => {
    const result = state.bookings.data.filter((booking) => {
      if (booking.renter.renterId === renterId &&
        booking.vendor.vendorId === vendorId &&
        booking.type.typeId === typeId &&
        booking.status === 'INCOMING') {
        return true;
      }
      return false;
    });
    console.log(`pending booking ${result[0]}`);
    return result[0];
  },
  findDealById: (state) => (id) => {
    const result = state.deals.data.filter((deal) => deal.dealId === id);
    return result[0];
  },
};
const mutationTypes = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',

  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',

  CLEAR_USER_DATA: 'CLEAR_USER_DATA',

  GET_CONTRACTS_REQUEST: 'GET_CONTRACTS_REQUEST',
  GET_CONTRACTS_SUCCESS: 'GET_CONTRACTS_SUCCESS',
  GET_CONTRACTS_FAILURE: 'GET_CONTRACTS_FAILURE',

  GET_BOOKINGS_REQUEST: 'GET_BOOKINGS_REQUEST',
  GET_BOOKINGS_SUCCESS: 'GET_BOOKINGS_SUCCESS',
  GET_BOOKINGS_FAILURE: 'GET_BOOKINGS_FAILURE',

  GET_BOOKING_REQUEST: 'GET_BOOKING_REQUEST',
  GET_BOOKING_SUCCESS: 'GET_BOOKING_SUCCESS',
  GET_BOOKING_FAILURE: 'GET_BOOKING_FAILURE',

  CREATE_BOOKING_REQUEST: 'CREATE_BOOKING_REQUEST',
  CREATE_BOOKING_SUCCESS: 'CREATE_BOOKING_SUCCESS',
  CREATE_BOOKING_FAILURE: 'CREATE_BOOKING_FAILURE',

  GET_DEALS_REQUEST: 'GET_DEALS_REQUEST',
  GET_DEALS_SUCCESS: 'GET_DEALS_SUCCESS',
  GET_DEALS_FAILURE: 'GET_DEALS_FAILURE',

  CREATE_DEAL_REQUEST: 'CREATE_DEAL_REQUEST',
  CREATE_DEAL_SUCCESS: 'CREATE_DEAL_SUCCESS',
  CREATE_DEAL_FAILURE: 'CREATE_DEAL_FAILURE',

  GET_DEAL_REQUEST: 'GET_DEAL_REQUEST',
  GET_DEAL_SUCCESS: 'GET_DEAL_SUCCESS',
  GET_DEAL_FAILURE: 'GET_DEAL_FAILURE',

  CANCEL_DEAL_REQUEST: 'CANCEL_DEAL_REQUEST',
  CANCEL_DEAL_SUCCESS: 'CANCEL_DEAL_SUCCESS',
  CANCEL_DEAL_FAILURE: 'CANCEL_DEAL_FAILURE',

  CANCEL_BOOKING_REQUEST: 'CANCEL_BOOKING_REQUEST',
  CANCEL_BOOKING_SUCCESS: 'CANCEL_BOOKING_SUCCESS',
  CANCEL_BOOKING_FAILURE: 'CANCEL_BOOKING_FAILURE',
};
const mutations = {
  CLEAR_USER_DATA(state) {
    state.user.data = null;
    state.user.isLoading = false;
    state.user.success = false;
  },
  GET_USER_REQUEST(state) {
    state.user.isLoading = true;
  },
  GET_USER_SUCCESS(state, user) {
    state.user.data = user;
    state.user.isLoading = false;
    state.user.success = true;
  },
  GET_USER_FAILURE(state, error) {
    state.user.isLoading = false;
    state.user.success = false;
    state.user.error = error;
  },
  GET_CONTRACTS_REQUEST(state) {
    state.contracts.isLoading = true;
  },
  GET_CONTRACTS_SUCCESS(state, contracts) {
    state.contracts.data = contracts;
    state.contracts.isLoading = false;
    state.contracts.success = true;
  },
  GET_CONTRACTS_FAILURE(state, error) {
    state.contracts.isLoading = false;
    state.contracts.success = false;
    state.contracts.error = error;
  },
  GET_BOOKINGS_REQUEST(state) {
    state.bookings.isLoading = true;
  },
  GET_BOOKINGS_SUCCESS(state, booking) {
    state.bookings.data = booking;
    state.bookings.isLoading = false;
    state.bookings.success = true;
  },
  GET_BOOKINGS_FAILURE(state, error) {
    state.bookings.isLoading = false;
    state.bookings.success = false;
    state.bookings.error = error;
  },
  GET_BOOKING_REQUEST(state) {
    state.bookings.isLoading = true;
  },
  GET_BOOKING_SUCCESS(state, booking) {
    state.bookings.data.unshift(booking);
    state.bookings.isLoading = false;
    state.bookings.success = true;
  },
  GET_BOOKING_FAILURE(state, error) {
    state.bookings.isLoading = false;
    state.bookings.success = false;
    state.bookings.error = error;
  },
  CREATE_BOOKING_REQUEST(state) {
    state.bookings.isLoading = true;
  },
  CREATE_BOOKING_SUCCESS(state, booking) {
    state.bookings.data.push(booking);
    state.bookings.newlyCreated = booking;
    state.bookings.isLoading = false;
    state.bookings.success = true;
  },
  CREATE_BOOKING_FAILURE(state, error) {
    state.bookings.isLoading = false;
    state.bookings.success = false;
    state.bookings.error = error;
  },
  GET_DEALS_REQUEST(state) {
    state.deals.isLoading = false;
  },
  GET_DEALS_SUCCESS(state, deals) {
    state.deals.data = deals;
    state.deals.isLoading = false;
    state.deals.success = true;
  },
  GET_DEALS_FAILURE(state, error) {
    state.deals.isLoading = false;
    state.deals.success = false;
    state.deals.error = error;
  },
  CREATE_DEAL_REQUEST(state) {
    state.deals.isLoading = false;
  },
  CREATE_DEAL_SUCCESS(state, deal) {
    state.deals.data.push(deal);
    state.deals.newlyCreated = deal;
    state.deals.success = true;
    state.deals.isLoading = false;
  },
  CREATE_DEAL_FAILURE(state, error) {
    state.deals.success = false;
    state.deals.error = error;
  },
  GET_DEAL_REQUEST(state) {
    state.deals.isLoading = false;
  },
  GET_DEAL_SUCCESS(state, deal) {
    state.deals.data.push(deal);
    state.deals.newlyCreated = deal;
    state.deals.success = true;
    state.deals.isLoading = false;
  },
  GET_DEAL_FAILURE(state, error) {
    state.deals.success = false;
    state.deals.error = error;
  },
  CANCEL_DEAL_REQUEST(state) {
    state.deals.isLoading = true;
  },
  CANCEL_DEAL_SUCCESS(state, dealId) {
    state.deals.isLoading = false;
    state.deals.success = true;
    const res = state.deals.data.filter((deal) => deal.dealId === dealId);
    res[0].status = 'CANCEL';
  },
  CANCEL_DEAL_FAILURE(state, error) {
    state.deals.isLoading = false;
    state.deals.error = error;
  },
  CANCEL_BOOKING_REQUEST(state) {
    state.bookings.isLoading = true;
  },
  CANCEL_BOOKING_SUCCESS(state, newBooking) {
    const { bookingId } = newBooking;
    state.bookings.isLoading = false;
    state.bookings.success = true;
    const res = state.bookings.data.filter((book) => book.bookingId === bookingId);
    res[0].status = 'CANCELLED';
  },
  CANCEL_BOOKING_FAILURE(state, error) {
    state.bookings.isLoading = false;
    state.bookings.error = error;
  },
  UPDATE_USER_REQUEST(state) {
    state.user.isLoading = true;
  },
  UPDATE_USER_SUCCESS(state, user) {
    state.user.data = user;
    state.user.success = true;
    state.user.isLoading = false;
  },
  UPDATE_USER_FAILURE(state, error) {
    state.user.error = error;
    state.user.success = false;
    state.user.isLoading = false;
  },
};

const actions = {
  async login({ commit }, params) {
    // params {phone, password}
    commit(mutationTypes.GET_USER_REQUEST);
    let res = null;
    try {
      res = await window.axios.post('/api/v1/login', params);
      if (res.status === 200) {
        commit(mutationTypes.GET_USER_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_USER_FAILURE);
      }
    } catch (error) {
      commit(mutationTypes.GET_USER_FAILURE, error);
    }
  },
  async clearUserData({ commit }) {
    commit(mutationTypes.CLEAR_USER_DATA);
  },
  async getUser({ commit }) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role) {
      try {
        commit(mutationTypes.GET_USER_REQUEST);
        const res = await window.axios.get(`/api/v1/${role}/${userId}`);
        if (res.status === 200) {
          commit(mutationTypes.GET_USER_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.GET_USER_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_USER_FAILURE, error);
      }
    } else {
      console.log('User are not logged in, cannot get user data');
    }
  },
  async updateUser({ commit, state }, newUser) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data) {
      try {
        commit(mutationTypes.UPDATE_USER_REQUEST);
        const res = await window.axios.put(`/api/v1/${role}/${userId}`, newUser);
        if (res.status === 200) {
          commit(mutationTypes.UPDATE_USER_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.UPDATE_USER_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.UPDATE_USER_FAILURE, error);
      }
    } else {
      throw new Error('userId, role or user.data null');
    }
  },
  async getBookings({ commit, state }) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data) {
      try {
        commit(mutationTypes.GET_BOOKINGS_REQUEST);
        const res = await window.axios.get(`/api/v1/${role}/${userId}/bookings`);
        if (res.status === 200) {
          commit(mutationTypes.GET_BOOKINGS_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.GET_BOOKINGS_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_BOOKINGS_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get bookings');
    }
  },
  async getContracts({ commit, state }) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data) {
      try {
        commit(mutationTypes.GET_CONTRACTS_REQUEST);
        const res = await window.axios.get(`/api/v1/${role}/${userId}/contracts`);
        if (res.status === 200) {
          commit(mutationTypes.GET_CONTRACTS_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.GET_CONTRACTS_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_CONTRACTS_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get contracts');
    }
  },
  async getOneBooking({ commit, state }, bookingId) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data) {
      try {
        const currentIds = state.bookings.data.map((booking) => booking.bookingId);
        if (!currentIds.includes(bookingId)) {
          commit(mutationTypes.GET_BOOKING_REQUEST);
          const res = await window.axios.get(`/api/v1/bookings/${bookingId}`);
          if (res.status === 200) {
            res.data.data.new = true;
            commit(mutationTypes.GET_BOOKING_SUCCESS, res.data.data);
          } else {
            commit(mutationTypes.GET_BOOKING_FAILURE);
          }
        } else {
          console.log('this booking is already in store');
        }
      } catch (error) {
        commit(mutationTypes.GET_BOOKING_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get a new booking');
    }
  },
  async createBooking({ commit, state }, booking) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data) {
      try {
        commit(mutationTypes.CREATE_BOOKING_REQUEST);
        const res = await window.axios.post('/api/v1/bookings', booking);
        if (res.status === 201) {
          commit(mutationTypes.CREATE_BOOKING_SUCCESS, res.data.data);
        }
      } catch (error) {
        commit(mutationTypes.CREATE_BOOKING_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get a new booking');
    }
  },
  async getDeals({ commit, state }) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data) {
      try {
        commit(mutationTypes.GET_DEALS_REQUEST);
        const res = await window.axios.get(`/api/v1/${role}/${userId}/deals`);
        if (res.status === 200) {
          commit(mutationTypes.GET_DEALS_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.GET_DEALS_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.GET_DEALS_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get deals');
    }
  },
  async createDeal({ commit, state }, deal) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data) {
      try {
        commit(mutationTypes.CREATE_DEAL_REQUEST);
        const res = await window.axios.post('/api/v1/deals', deal);
        if (res.status === 201) {
          commit(mutationTypes.CREATE_DEAL_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.CREATE_DEAL_FAILURE);
        }
      } catch (error) {
        commit(mutationTypes.CREATE_DEAL_FAILURE, error);
      }
    } else {
      throw new Error('You have to login before get deals');
    }
  },
  async getDeal({ commit, state }, dealIds) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    const currentIds = state.deals.data.map((deal) => deal.dealId);
    const newIds = dealIds.filter((newId) => !currentIds.includes(newId));
    if (newIds.lenght > 0) {
      if (userId && role && state.user.data) {
        try {
          commit(mutationTypes.GET_DEAL_REQUEST);
          const res = await window.axios.get(`/api/v1/deals/${newIds[0]}`);
          if (res.status === 200) {
            commit(mutationTypes.GET_DEAL_SUCCESS, res.data.data);
          } else {
            commit(mutationTypes.GET_DEAL_FAILURE);
          }
        } catch (error) {
          commit(mutationTypes.GET_DEAL_FAILURE, error);
        }
      } else {
        throw new Error('You have to login before get deals');
      }
    } else {
      console.log('not a new deal');
    }
  },
  async cancelDeal({ commit, state }, dealId) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data) {
      try {
        const deal = state.deals.data.filter((item) => item.dealId === dealId)[0];
        if (deal) {
          commit(mutationTypes.CANCEL_DEAL_REQUEST);
          const res = await window.axios.put('/api/v1/deals', {
            dealId,
            renterId: deal.renter.renterId,
            vendorId: deal.vendor.vendorId,
            typeId: deal.type.typeId,
            status: 'CANCELED',
            offeredPrice: deal.offeredPrice,
          });
          if (res.status === 200) {
            commit(mutationTypes.CANCEL_DEAL_SUCCESS, res.data.data);
          }
        } else {
          console.log('deal is null');
        }
      } catch (error) {
        commit(mutationTypes.CANCEL_DEAL_FAILURE, error);
      }
    } else {
      throw new Error('you are not loged in');
    }
  },
  async cancelBooking({ commit, state }, bookingId) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data) {
      try {
        const booking = state.bookings.data.filter((item) => item.bookingId === bookingId)[0];
        if (booking) {
          commit(mutationTypes.CANCEL_BOOKING_REQUEST);
          const res = await window.axios.put(`/api/v1/bookings/${bookingId}`, {
            bookingId,
            dealId: booking.deal ? booking.deal.dealId : null,
            typeId: booking.type.typeId,
            renterId: booking.renter.renterId,
            vendorId: booking.vendor.vendorId,
            status: 'CANCELLED',
            meetTime: booking.meetTime,
            qrCode: booking.qrCode,
          });
          if (res.status === 200) {
            commit(mutationTypes.CANCEL_BOOKING_SUCCESS, res.data.data);
          }
        } else {
          console.log(`booking ${bookingId} is not existed in store`);
        }
      } catch (error) {
        commit(mutationTypes.CREATE_BOOKING_FAILURE, error);
      }
    } else {
      throw new Error('you are not loged in');
    }
  },
};

export default {
  namespaced: true,
  state: myState,
  mutations,
  getters: myGetters,
  actions,
};
