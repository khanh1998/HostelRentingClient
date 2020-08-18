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
      data: [],
      isLoading: false,
    },

    price: {
      select: '1 triệu',
      items: [
        '1 triệu',
        '2 triệu',
        '3 triệu',
        '4 triệu',
        '5 triệu',
        '6 triệu',
        '7 triệu',
        '8 triệu',
        '9 triệu',
        '10 triệu',
      ],
    },
    area: {
      select: '20 m2',
      items: ['10 m2', '15 m2', '20 m2', '25 m2', '30 m2', '40 m2', '50 m2', '70 m2', '100 m2'],
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
  // facilities
  GET_FACILITIES_SUCCESS: 'GET_FACILITIES_SUCCESS',
  GET_FACILITIES_FAILURE: 'GET_FACILITIES_FAILURE',
  GET_FACILITIES_REQUEST: 'GET_FACILITIES_REQUEST',
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

  // facilities
  GET_FACILITIES_SUCCESS(state, inputData) {
    state.filter.facility.data = inputData;
    state.filter.facility.isLoading = false;
  },
  GET_FACILITIES_FAILURE(state) {
    state.filter.facility.isLoading = false;
  },
  GET_FACILITIES_REQUEST(state) {
    state.filter.facility.isLoading = true;
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
      area: state.filter.area.select,
    };
    const convert = {
      // minPrice: Number(data.price.split('-')[0]),
      maxPrice: Number(data.price.split(' ')[0]) * 1000000,
      minSuperficiality: data.area.split(' ')[0],
      // maxSuperficiality: data.area[1],
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
    if (res.status >= 200 && res.status <= 299) {
      commit(mutationTypes.GET_FILTER_RESULT_SUCCESS, res.data.data);
    } else {
      commit(mutationTypes.GET_FILTER_RESULT_FAILURE);
    }
  },
  async searchByAddress({ commit, state }) {
    commit(mutationTypes.GET_FILTER_RESULT_REQUEST);
    const url = `/api/v1/types?address=${state.search.value}`;
    const res = await window.axios.get(url);
    if (res.status >= 200 && res.status <= 299) {
      commit(mutationTypes.GET_FILTER_RESULT_SUCCESS, res.data.data);
    } else {
      commit(mutationTypes.GET_FILTER_RESULT_FAILURE);
    }
  },
  async searchByCoordinator({ commit }, params) {
    // params = {lat, long}
    try {
      commit(mutationTypes.GET_FILTER_RESULT_REQUEST);
      const url = `/api/v1/types?distance=5&latitude=${params.lat}&longitude=${params.long}&page=1&size=5`;
      const res = await window.axios.get(url);
      if (res.status >= 200 && res.status <= 299) {
        commit(mutationTypes.GET_FILTER_RESULT_SUCCESS, res.data.data);
        commit(mutationTypes.SET_SEARCH_VALUE, params.coordinator);
      }
    } catch (error) {
      commit(mutationTypes.GET_FILTER_RESULT_FAILURE);
    }
  },
  async filterSearchByCoordinatorResult({ commit }, params) {
    // params = facilityId
    try {
      let facilitiesStr = '';
      params.facilitiesIds.forEach((element) => {
        facilitiesStr += `&facilityIds=${element}`;
      });
      let coordinatorStr = '';
      if (params.coordinator !== '') {
        console.log(params.coordinator);
        coordinatorStr = `&latitude=${params.coordinator.lat}&longitude=${params.coordinator.lng}`;
      }
      let priceStr = '';
      if (params.disabledPrice) {
        priceStr = `&maxPrice=${params.rangePirce[1]}&minPrice=${params.rangePirce[0]}`;
      }
      let minSuperficialityStr = '';
      if (params.minSuperficiality !== 0) {
        const minSuperficiality = params.minSuperficiality.split(' ')[0];
        minSuperficialityStr = `&minSuperficiality=${minSuperficiality}`;
      }
      const url = `/api/v1/types?asc=false&distance=5${facilitiesStr}${coordinatorStr}${priceStr}${minSuperficialityStr}&page=1&size=5&sortBy=score`;
      const res = await window.axios.get(url);
      if (res.status >= 200 && res.status <= 299) {
        commit(mutationTypes.GET_FILTER_RESULT_SUCCESS, res.data.data);
      }
    } catch (error) {
      commit(mutationTypes.GET_FILTER_RESULT_FAILURE);
    }
  },
  async getAllFacilities({ commit }) {
    // no param
    try {
      commit(mutationTypes.GET_FACILITIES_REQUEST);
      const res = await window.axios.get('/api/v1/facilities');
      if (res.status >= 200 && res.status <= 299) {
        commit(mutationTypes.GET_FACILITIES_SUCCESS, res.data.data);
      }
    } catch (error) {
      commit(mutationTypes.GET_FACILITIES_FAILURE);
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
