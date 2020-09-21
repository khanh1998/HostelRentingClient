const myState = () => ({
  stats: {
    streets: {
      data: [],
      streetIds: [],
      isLoading: false,
      error: undefined,
      success: undefined,
    },
  },
});

const getters = {
  getStatsByIds: (state) => (ids) => {
    const res = state.stats.streets.data.filter((street) => ids.includes(street.streetId));
    return res;
  },
  getAverage: (state) => (ids) => {
    const res = state.stats.streets.data.filter((street) => ids.includes(street.streetId));
    const init = {
      area: 0,
      room: 0,
      price: 0,
    };
    const summary = res.reduce((acc, curr) => {
      acc.area += curr.avgSuperficiality * curr.count;
      acc.room += curr.count;
      acc.price += curr.avgPrice * curr.count;
      return acc;
    }, init);
    return {
      price: (summary.price / summary.room).toFixed(2),
      area: (summary.area / summary.room).toFixed(2),
    };
  },
};
const mutationTypes = {
  GET_STREET_STATS_REQUEST: 'GET_STREET_STATS_REQUEST',
  GET_STREET_STATS_SUCCESS: 'GET_STREET_STATS_SUCCESS',
  GET_STREET_STATS_FAILURE: 'GET_STREET_STATS_FAILURE',
};
const mutations = {
  GET_STREET_STATS_REQUEST(state) {
    state.stats.streets.isLoading = true;
  },
  GET_STREET_STATS_SUCCESS(state, stats) {
    state.stats.streets.data = stats;
    state.stats.streets.success = true;
    state.stats.streets.isLoading = false;
  },
  GET_STREET_STATS_FAILURE(state, error) {
    state.stats.streets.error = error;
    state.stats.streets.success = false;
    state.stats.streets.isLoading = false;
  },
};
const actions = {
  async getStreetStats({ commit, state }, streetIds) {
    const currentIds = state.stats.streets.streetIds;
    const notDuplicateIds = streetIds.filter((id) => !currentIds.includes(id));
    currentIds.push(notDuplicateIds);
    try {
      commit(mutationTypes.GET_STREET_STATS_REQUEST);
      const res = await window.axios.get(
        `/api/v1/statistic?streetIds=${notDuplicateIds.join(',')}`,
      );
      commit(mutationTypes.GET_STREET_STATS_SUCCESS, res.data.data);
    } catch (error) {
      commit(mutationTypes.GET_STREET_STATS_FAILURE, error);
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
