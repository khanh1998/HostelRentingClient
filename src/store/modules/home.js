const myState = () => ({
  hostelTypes: {
    data: [],
    isLoading: false,
  },
});
const getters = {};
const mutationTypes = {
  GET_HOSTEL_TYPES_SUCCESS: 'GET_HOSTEL_TYPES_SUCCESS',
  GET_HOSTEL_TYPES_FAILURE: 'GET_HOSTEL_TYPES_FAILURE',
  GET_HOSTEL_TYPES_REQUEST: 'GET_HOSTEL_TYPES_REQUEST',
};
const mutations = {
  GET_HOSTEL_TYPES_SUCCESS(state, inputHostelTypes) {
    state.hostelTypes.data = inputHostelTypes;
    state.hostelTypes.isLoading = false;
  },
  GET_HOSTEL_TYPES_FAILURE(state) {
    state.hostelTypes.isLoading = false;
  },
  GET_HOSTEL_TYPES_REQUEST(state) {
    console.log(state);
    state.hostelTypes.isLoading = true;
  },
};
const actions = {
  async getHostelTypes({ commit }) {
    commit(mutationTypes.GET_HOSTEL_TYPES_REQUEST);
    const response = await window.axios.get('/api/v1/groups/1/types');
    if (response.status === 200) {
      commit(mutationTypes.GET_HOSTEL_TYPES_SUCCESS, response.data.data);
    } else {
      commit(mutationTypes.GET_HOSTEL_TYPES_FAILURE);
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
