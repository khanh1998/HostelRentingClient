const myState = () => ({
  user: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
  },
  contracts: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
  },
  bookings: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
    newlyCreated: null,
  },
  deals: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
  },
});

const myGetters = {
  // get lasted deal
  findLastedDeal: (state) => (renterId, vendorId, typeId) => {
    let result = state.deals.data.filter((deal) => {
      if (deal.renter.renterId === renterId
        && deal.vendor.vendorId === vendorId
        && deal.type.typeId === typeId) {
        return true;
      }
      return false;
    });
    result = result.sort((deal1, deal2) => deal1.creationTime - deal2.creationTime);
    return result[0];
  },
  findPendingBooking: (state) => (renterId, vendorId, typeId) => {
    const result = state.bookings.data.filter((booking) => {
      if (booking.renter.renterId === renterId
        && booking.vendor.vendorId === vendorId
        && booking.type.typeId === typeId
        && booking.status.statusId === 1) { // status id == 1 means the booking is pending
        return true;
      }
      return false;
    });
    return result[0];
  },
};
const mutationTypes = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
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
    state.bookings.data.unshift(booking);
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
        commit(mutationTypes.GET_BOOKING_REQUEST);
        const res = await window.axios.get(`/api/v1/bookings/${bookingId}`);
        if (res.status === 200) {
          res.data.data.new = true;
          commit(mutationTypes.GET_BOOKING_SUCCESS, res.data.data);
        } else {
          commit(mutationTypes.GET_BOOKING_FAILURE);
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
};

export default {
  namespaced: true,
  state: myState,
  mutations,
  getters: myGetters,
  actions,
};
