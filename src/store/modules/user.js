const myState = () => ({
  user: {
    data: null,
    isLoading: false,
    success: false,
  },
  contracts: {
    data: null,
    isLoading: false,
  },
  bookings: {
    data: null,
    isLoading: false,
  },
});

const myGetters = {
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
  GET_USER_FAILURE(state) {
    state.user.isLoading = false;
    state.user.success = false;
  },
  GET_CONTRACTS_REQUEST(state) {
    state.contracts.isLoading = true;
  },
  GET_CONTRACTS_SUCCESS(state, contracts) {
    state.contracts.data = contracts;
    state.contracts.isLoading = false;
  },
  GET_CONTRACTS_FAILURE(state) {
    state.contracts.isLoading = false;
  },
  GET_BOOKINGS_REQUEST(state) {
    state.bookings.isLoading = true;
  },
  GET_BOOKINGS_SUCCESS(state, booking) {
    state.bookings.data = booking;
    state.bookings.isLoading = false;
  },
  GET_BOOKINGS_FAILURE(state) {
    state.bookings.isLoading = false;
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
      commit(mutationTypes.GET_USER_FAILURE);
    }
  },
  async clearUserData({ commit }) {
    commit(mutationTypes.CLEAR_USER_DATA);
  },
  async getUser({ commit, state }) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role && state.user.data === null) {
      commit(mutationTypes.GET_USER_REQUEST);
      const res = await window.axios.get(`/api/v1/${role}/${userId}`);
      if (res.status === 200) {
        commit(mutationTypes.GET_USER_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_USER_FAILURE);
      }
    }
  },
  async getBookings({ commit }) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role) {
      commit(mutationTypes.GET_BOOKINGS_REQUEST);
      const res = await window.axios.get(`/api/v1/${role}/${userId}/bookings`);
      if (res.status === 200) {
        commit(mutationTypes.GET_BOOKINGS_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_BOOKINGS_FAILURE);
      }
    } else {
      throw new Error('You have to login before get bookings');
    }
  },
  async getContracts({ commit }) {
    const userId = window.$cookies.get('userId');
    const role = window.$cookies.get('role');
    if (userId && role) {
      commit(mutationTypes.GET_CONTRACTS_REQUEST);
      const res = await window.axios.get(`/api/v1/${role}/${userId}/contracts`);
      if (res.status === 200) {
        commit(mutationTypes.GET_CONTRACTS_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_CONTRACTS_FAILURE);
      }
    } else {
      throw new Error('You have to login before get contracts');
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
