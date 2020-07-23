const myState = () => ({
  user: {
    data: null,
    isLoading: false,
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
  getUserRole: (state) => {
    const user = state.user.data;
    if (user) {
      let role = 'admin';
      if (user.renterId) {
        role = 'renters';
      } else if (user.vendorId) {
        role = 'vendors';
      }
      return role;
    }
    return null;
  },
};
const mutationTypes = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
  GET_CONTRACTS_REQUEST: 'GET_CONTRACTS_REQUEST',
  GET_CONTRACTS_SUCCESS: 'GET_CONTRACTS_SUCCESS',
  GET_CONTRACTS_FAILURE: 'GET_CONTRACTS_FAILURE',
  GET_BOOKINGS_REQUEST: 'GET_BOOKINGS_REQUEST',
  GET_BOOKINGS_SUCCESS: 'GET_BOOKINGS_SUCCESS',
  GET_BOOKINGS_FAILURE: 'GET_BOOKINGS_FAILURE',
};
const mutations = {
  GET_USER_REQUEST(state) {
    state.user.loading = true;
  },
  GET_USER_SUCCESS(state, user) {
    state.user.data = user;
    state.user.loading = false;
  },
  GET_USER_FAILURE(state) {
    state.user.loading = false;
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
  async getUser({ commit }, params) {
    // params {role, id}
    commit(mutationTypes.GET_USER_REQUEST);
    const res = await window.axios.get(`/api/v1/${params.role}/${params.id}`);
    if (res.status === 200) {
      commit(mutationTypes.GET_USER_SUCCESS, res.data.data);
    } else {
      commit(mutationTypes.GET_USER_FAILURE);
    }
  },
  async getBookings({ commit, state, getters }) {
    const user = state.user.data;
    if (user != null) {
      const role = getters.getUserRole;
      commit(mutationTypes.GET_BOOKINGS_REQUEST);
      let res = null;
      if (role === 'vendors') {
        res = await window.axios.get(`/api/v1/vendors/${user.vendorId}/bookings`);
      } else if (role === 'renters') {
        res = await window.axios.get(`/api/v1/renters/${user.renterId}/bookings`);
      } else {
        throw new Error(`Cannot get booking of role ${role}`);
      }
      if (res.status === 200) {
        commit(mutationTypes.GET_BOOKINGS_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_BOOKINGS_FAILURE);
      }
    } else {
      throw new Error('You have to login before get bookings');
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
