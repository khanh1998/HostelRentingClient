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
  suggestedTypes: {
    data: {
      types: null,
      groups: null,
      totalType: Number,
      totalGroup: Number,
    },
    page: 1,
    isLoading: false,
    success: null,
    error: null,
  },
});

const getters = {
  getHostelGroupById: (state) => (id) => {
    let result = null;
    if (state.suggestedTypes.data.groups) {
      result = state.suggestedTypes.data.groups.find((group) => group.groupId === Number(id));
    }
    return result;
  },
  // eslint-disable-next-line
  isLoading: (state) =>
    // eslint-disable-next-line
    state.hostelGroup.isLoading || state.hostelType.isLoading || state.schedules.isLoading,
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

  GET_SUGGESTED_TYPE_REQUEST: 'GET_SUGGESTED_TYPE_REQUEST',
  GET_SUGGESTED_TYPE_SUCCESS: 'GET_SUGGESTED_TYPE_SUCCESS',
  GET_SUGGESTED_TYPE_FAILURE: 'GET_SUGGESTED_TYPE_FAILURE',
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

  GET_SUGGESTED_TYPE_REQUEST(state) {
    state.suggestedTypes.isLoading = true;
  },
  GET_SUGGESTED_TYPE_SUCCESS(state, data) {
    state.suggestedTypes.data = data;
    state.suggestedTypes.isLoading = false;
    state.suggestedTypes.success = true;
    state.suggestedTypes.error = null;
  },
  GET_SUGGESTED_TYPE_FAILURE(state, error) {
    state.suggestedTypes.error = error;
    state.suggestedTypes.data = null;
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
        commit(mutationTypes.GET_HOSTEL_GROUP_SUCCESS, response.data.data.group);
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
  async getSuggestedTypes({ commit }, params) {
    try {
      commit(mutationTypes.GET_SUGGESTED_TYPE_REQUEST);
      let paramStr = '';
      if (params.universityId) {
        paramStr += `&schoolId=${params.universityId}`;
      }
      if (params.provinceId) {
        paramStr += `&provinceId=${params.provinceId}`;
      }
      const response = await window.axios.get(
        `/api/v1/types?asc=false${paramStr}&size=${params.size}`,
      );
      if (response.status >= 200 && response.status <= 299) {
        commit(mutationTypes.GET_SUGGESTED_TYPE_SUCCESS, response.data.data);
      } else {
        commit(mutationTypes.GET_SUGGESTED_TYPE_FAILURE, response.status);
      }
    } catch (error) {
      commit(mutationTypes.GET_SCHEDULES_FAILURE, 500);
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
