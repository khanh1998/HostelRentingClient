const myState = () => ({
  hostelTypes: {
    data: [],
    isLoading: false,
  },
  hostelGroups: {
    data: [],
    isLoading: false,
  },
});
const getters = {
  getHostelGroupById: (state) => (id) => {
    console.log('getter called');
    const result = state.hostelGroups.data.filter((group) => group.groupId === id);
    if (result.length > 0) {
      return result[0];
    }
    return null;
  },
};
const mutationTypes = {
  GET_HOSTEL_TYPES_SUCCESS: 'GET_HOSTEL_TYPES_SUCCESS',
  GET_HOSTEL_TYPES_FAILURE: 'GET_HOSTEL_TYPES_FAILURE',
  GET_HOSTEL_TYPES_REQUEST: 'GET_HOSTEL_TYPES_REQUEST',
};
const mutations = {
  GET_HOSTEL_TYPES_SUCCESS(state, inputData) {
    state.hostelTypes.data = inputData.types;
    state.hostelTypes.isLoading = false;
    state.hostelGroups.data = inputData.groups;
    state.hostelGroups.isLoading = false;
  },
  GET_HOSTEL_TYPES_FAILURE(state) {
    state.hostelTypes.isLoading = false;
    state.hostelGroups.isLoading = false;
  },
  GET_HOSTEL_TYPES_REQUEST(state) {
    state.hostelTypes.isLoading = true;
    state.hostelGroups.isLoading = true;
  },
};
const actions = {
  async getHostelTypes({ commit }) {
    commit(mutationTypes.GET_HOSTEL_TYPES_REQUEST);
    const response = await window.axios.get('/api/v1/types');
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
