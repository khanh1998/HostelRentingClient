const myState = () => ({
  user: {
    data: null,
    isLoading: false,
  },
});

const getters = {};
const mutationTypes = {
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
};
const mutations = {
  GET_USER_REQUEST(state) {
    state.user.loading = true;
  },
  GET_USER_SUCCESS(state, booking) {
    state.user.data = booking;
    state.user.loading = false;
  },
  GET_USER_FAILURE(state) {
    state.user.loading = false;
  },
};

const actions = {
  async getUser({ commit }, id = 1) {
    commit(mutationTypes.GET_USER_REQUEST);
    const res = window.axios.get(`/api/v1/renters/${id}`);
    if (res.status === 200) {
      commit(mutationTypes.GET_USER_SUCCESS, res.data.data);
    } else {
      commit(mutationTypes.GET_USER_FAILURE);
    }
  },
};

export default {
  namespaced: true,
  state: myState,
  mutations,
  getters,
  actions,
};
