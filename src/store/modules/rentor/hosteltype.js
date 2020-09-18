const myState = () => ({
  hostelType: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
  },
  hostelGroup: {
    data: null,
    isLoading: false,
    success: null,
    error: null,
  },
  schedules: {
    data: [],
    isLoading: false,
    success: null,
    error: null,
  },
});

const getters = {
  // eslint-disable-next-line
  isLoading: (state) => state.hostelGroup.isLoading || state.hostelType.isLoading || state.schedules.isLoading,
};

const mutationTypes = {
  GET_HOSTEL_TYPE_REQUEST: 'GET_HOSTEL_TYPE_REQUEST',
  GET_HOSTEL_TYPE_SUCCESS: 'GET_HOSTEL_TYPE_SUCCESS',
  GET_HOSTEL_TYPE_FAILURE: 'GET_HOSTEL_TYPE_FAILURE',

  GET_HOSTEL_GROUP_REQUEST: 'GET_HOSTEL_GROUP_REQUEST',
  GET_HOSTEL_GROUP_SUCCESS: 'GET_HOSTEL_GROUP_SUCCESS',
  GET_HOSTEL_GROUP_FAILURE: 'GET_HOSTEL_GROUP_FAILURE',

  GET_SCHEDULES_REQUEST: 'GET_SCHEDULES_REQUEST',
  GET_SCHEDULES_SUCCESS: 'GET_SCHEDULES_SUCCESS',
  GET_SCHEDULES_FAILURE: 'GET_SCHEDULES_FAILURE',
};

const mutations = {
  GET_HOSTEL_TYPE_REQUEST(state) {
    state.hostelType.isLoading = true;
  },
  GET_HOSTEL_GROUP_REQUEST(state) {
    state.hostelGroup.isLoading = true;
  },
  GET_HOSTEL_TYPE_SUCCESS(state, hostelType) {
    state.hostelType.data = hostelType;
    state.hostelType.isLoading = false;
    state.hostelType.success = true;
  },
  GET_HOSTEL_GROUP_SUCCESS(state, hostelGroup) {
    state.hostelGroup.data = hostelGroup;
    state.hostelGroup.isLoading = false;
    state.hostelGroup.success = true;
  },
  GET_HOSTEL_TYPE_FAILURE(state, error) {
    state.hostelType.isLoading = false;
    state.hostelType.error = error;
  },
  GET_HOSTEL_GROUP_FAILURE(state, error) {
    state.hostelGroup.isLoading = false;
    state.hostelGroup.error = error;
  },
  GET_SCHEDULES_REQUEST(state) {
    state.schedules.isLoading = true;
  },
  GET_SCHEDULES_SUCCESS(state, schedules) {
    state.schedules.data = schedules;
    state.schedules.isLoading = false;
    state.schedules.success = true;
  },
  GET_SCHEDULES_FAILURE(state, error) {
    state.schedules.isLoading = false;
    state.schedules.error = error;
  },
};

const actions = {
  async getTypeAndGroup({ commit }, typeId) {
    try {
      commit(mutationTypes.GET_HOSTEL_TYPE_REQUEST);
      commit(mutationTypes.GET_HOSTEL_GROUP_REQUEST);
      const response = await window.axios.get(`/api/v1/types?typeId=${typeId}`);
      if (response.status >= 200 && response.status <= 299) {
        commit(mutationTypes.GET_HOSTEL_TYPE_SUCCESS, response.data.data.type);
        commit(mutationTypes.GET_HOSTEL_GROUP_SUCCESS, response.data.data.groupDTOFull);
      } else {
        commit(mutationTypes.GET_HOSTEL_TYPE_FAILURE);
        commit(mutationTypes.GET_HOSTEL_GROUP_FAILURE);
      }
    } catch (error) {
      commit(mutationTypes.GET_HOSTEL_TYPE_FAILURE, error);
      commit(mutationTypes.GET_HOSTEL_GROUP_FAILURE, error);
    }
  },
  async getSchedules({ commit }, groupId) {
    try {
      commit(mutationTypes.GET_SCHEDULES_REQUEST);
      const response = await window.axios.get(`/api/v1/groups/${groupId}/schedules`);
      if (response.status >= 200 && response.status <= 299) {
        commit(mutationTypes.GET_SCHEDULES_SUCCESS, response.data.data);
      } else {
        commit(mutationTypes.GET_SCHEDULES_FAILURE);
      }
    } catch (error) {
      commit(mutationTypes.GET_SCHEDULES_FAILURE, error);
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
