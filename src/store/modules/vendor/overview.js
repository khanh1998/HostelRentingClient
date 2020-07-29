const myState = () => ({
  usersChatList: {
    data: [],
    isLoading: false,
    error: null,
    success: null,
  },
});

const myGetters = {
  getUserById: (state) => (id) => {
    const result = state.usersChatList.filter((user) => user.userId === Number(id));
    if (result.length > 0) {
      return result[0];
    }
    return null;
  },
};
const mutationTypes = {
  GET_USERSCHATLIST_REQUEST: 'GET_USERSCHATLIST_REQUEST',
  GET_USERSCHATLIST_SUCCESS: 'GET_USERSCHATLIST_SUCCESS',
  GET_USERSCHATLIST_FAILURE: 'GET_USERSCHATLIST_FAILURE',
};
const mutations = {
  GET_USERSCHATLIST_REQUEST(state) {
    state.usersChatList.isLoading = true;
  },
  GET_USERSCHATLIST_SUCCESS(state, users) {
    state.usersChatList.data = users;
    state.usersChatList.isLoading = false;
    state.usersChatList.success = true;
  },
  GET_USERSCHATLIST_FAILURE(state, error) {
    state.usersChatList.isLoading = false;
    state.usersChatList.success = false;
    state.usersChatList.error = error;
  },
};

const actions = {
  getUserByIds({ commit }, ids) {
    // ids is a list of user id
    try {
      commit(mutationTypes.GET_USERSCHATLIST_REQUEST);
      const res = window.axios.get(`/api/v1/renters?id=${ids}`);
      if (res.status === 200) {
        commit(mutationTypes.GET_USERSCHATLIST_SUCCESS, res.data.data);
      } else {
        throw Error('response is not successed');
      }
    } catch (error) {
      commit(mutationTypes.GET_USERSCHATLIST_FAILURE, error);
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
