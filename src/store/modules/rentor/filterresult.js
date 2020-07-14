const myState = {
  search: {
    value: '',
  },
  filter: {
    around: {
      selects: [],
      items: [
        'Chợ, siêu thị, cửa hàng tiện lợi',
        'Trạm xe buýt',
        'Bệnh viện, trạm y tế',
        'Ngân hàng',
      ],
    },
    facility: {
      selects: [],
      items: [
        'Máy lạnh',
        'Máy giặt',
        'Tủ lạnh',
        'Bình nóng lạnh',
        'Chỗ đậu xe',
      ],
    },
    price: {
      select: '500000 - 1000000',
      items: [
        '500000 - 1000000',
        '1000000 - 2000000',
        '2000000 - 3000000',
      ],
    },
    slider: {
      range: [1, 3],
      min: 0,
      max: 10,
      rules: [
      ],
    },
    sliderArea: {
      range: [15, 30],
      min: 0,
      max: 100,
    },
  },
  results: {
    data: {
      types: [],
      groups: [],
    },
    isLoading: false,
  },
};
const mutationTypes = {
  SET_FILTER_VALUES: 'SET_FILTER_VALUES',
  SET_SEARCH_VALUE: 'SET_SEARCH_VALUE',
  GET_FILTER_RESULT_REQUEST: 'GET_FILTER_RESULT_REQUEST',
  GET_FILTER_RESULT_SUCCESS: 'GET_FILTER_RESULT_SUCCESS',
  GET_FILTER_RESULT_FAILURE: 'GET_FILTER_RESULT_FAILURE',
};
const mutations = {
  SET_FILTER_VALUES: (state, filterValues) => {
    state.filter = filterValues;
  },
  SET_SEARCH_VALUE: (state, searchValue) => {
    state.search.value = searchValue;
  },
  GET_FILTER_RESULT_REQUEST: (state) => {
    state.results.isLoading = true;
  },
  GET_FILTER_RESULT_SUCCESS: (state, results) => {
    state.results.data = results;
    state.results.isLoading = false;
  },
  GET_FILTER_RESULT_FAILURE: (state) => {
    state.results.isLoading = false;
  },
};
const getters = {
  getHostelGroupById: (state) => (id) => {
    const result = state.results.data.groups.filter((group) => group.groupId === Number(id));
    if (result.length > 0) {
      return result[0];
    }
    return null;
  },
  getHostelTypeById: (state) => (id) => {
    const result = state.results.data.types.filter((type) => type.typeId === Number(id));
    if (result.length > 0) {
      return result[0];
    }
    return null;
  },
};
const actions = {
  setFilterValue({ commit }, filterValues) {
    commit(mutationTypes.SET_FILTER_VALUES, filterValues);
  },
  setSearchValue({ commit }, searchValue) {
    commit(mutationTypes.SET_SEARCH_VALUE, searchValue);
  },
  async getFilterResult({ commit, state }, params) {
    // params contains page, size and address
    commit(mutationTypes.GET_FILTER_RESULT_REQUEST);
    const data = {
      around: state.filter.around.selects,
      facility: state.filter.around.selects,
      price: state.filter.price.select,
      area: state.filter.sliderArea.range,
    };
    const convert = {
      minPrice: Number(data.price.split('-')[0]),
      maxPrice: Number(data.price.split('-')[1]),
      minSuperficiality: data.area[0],
      maxSuperficiality: data.area[1],
      minCapacity: 0,
      maxCapacity: 10,
      address: state.search.value,
    };
    let queryString = Object.keys(convert).map((key) => {
      if (convert[key]) {
        return `${key}=${convert[key]}&`;
      }
      return '';
    });
    queryString = `?${queryString.join('')}size=${params.size}&page=${params.page}`;
    const res = await window.axios.get(`/api/v1/types${queryString}`);
    if (res.status === 200) {
      commit(mutationTypes.GET_FILTER_RESULT_SUCCESS, res.data.data);
    } else {
      commit(mutationTypes.GET_FILTER_RESULT_FAILURE);
    }
  },
  async searchByAddress({ commit, state }) {
    commit(mutationTypes.GET_FILTER_RESULT_REQUEST);
    const url = `/api/v1/types?address=${state.search.value}`;
    const res = await window.axios.get(url);
    if (res.status === 200) {
      commit(mutationTypes.GET_FILTER_RESULT_SUCCESS, res.data.data);
    } else {
      commit(mutationTypes.GET_FILTER_RESULT_FAILURE);
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
