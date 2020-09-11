const myState = () => ({
  hostelGroup: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
  },
});
const mutationTypes = {
  GET_HOSTEL_GROUP_REQUEST: 'GET_HOSTEL_GROUP_REQUEST',
  GET_HOSTEL_GROUP_SUCCESS: 'GET_HOSTEL_GROUP_SUCCESS',
  GET_HOSTEL_GROUP_FAILURE: 'GET_HOSTEL_GROUP_FAILURE',
};

const mutations = {
  GET_HOSTEL_GROUP_REQUEST(state) {
    state.hostelGroup.isLoading = true;
  },
  GET_HOSTEL_GROUP_SUCCESS(state, hostelGroup) {
    state.hostelGroup.data = hostelGroup;
    console.log(state.hostelGroup.data);
    state.hostelGroup.isLoading = false;
    state.hostelGroup.success = true;
  },
  GET_HOSTEL_GROUP_FAILURE(state, error) {
    state.hostelGroup.isLoading = false;
    state.hostelGroup.error = error;
  },
};

const actions = {
  async getHostelGroup({ commit }, groupId) {
    try {
      commit(mutationTypes.GET_HOSTEL_GROUP_REQUEST);
      const response = await window.axios.get(`/api/v1/groups/${groupId}`);
      if (response.status >= 200 && response.status <= 299) {
        commit(mutationTypes.GET_HOSTEL_GROUP_SUCCESS, response.data.data);
      } else {
        commit(mutationTypes.GET_HOSTEL_GROUP_FAILURE);
      }
    } catch (error) {
      commit(mutationTypes.GET_HOSTEL_GROUP_FAILURE, error);
    }
  },
};

export default {
  namespaced: true,
  state: myState,
  mutations,
  // getters,
  actions,
};
