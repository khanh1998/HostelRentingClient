const myState = {
  search: {
    value: '',
  },
  filter: {
    distance: {
      select: '5km',
      items: ['3km', '5km', '7km', '10km'],
    },
    around: {
      selects: [],
      items: [
        'Chợ, siêu thị, cửa hàng tiện lợi',
        'Trạm xe buýt',
        'Bệnh viện, trạm y tế',
        'Ngân hàng',
      ],
    },
    categories: {
      data: [],
      select: '',
      isLoading: false,
    },
    facility: {
      selects: [],
      data: [],
      isLoading: false,
    },
    price: {
      min: 0,
      max: 15,
      range: [0, 2.5],
      disable: false,
    },
    minArea: {
      select: '',
      items: ['10 m2', '15 m2', '20 m2', '25 m2', '30 m2', '40 m2', '50 m2', '70 m2', '100 m2'],
    },
    schools: {
      select: '',
      items: [
        'Trường Đại học Bách khoa, Đại học Quốc gia Thành phố Hồ Chí Minh',
        'Trường Đại học Khoa học Tự nhiên, Đại học Quốc gia Thành phố Hồ Chí Minh',
        'Trường Đại học Sư phạm Kỹ thuật Thành phố Hồ Chí Minh',
        'Trường Đại học Quốc tế, Đại học Quốc gia Thành phố Hồ Chí Minh',
        'Trường Đại học Công nghệ Thông tin, Đại học Quốc gia Thành phố Hồ Chí Minh',
        'Trường Đại học Trần Đại Nghĩa',
        'Trường Đại học Thông tin Liên lạc',
        'Trường Đại học Tôn Đức Thắng',
        'Trường Đại học Công nghiệp Thành phố Hồ Chí Minh',
        'Trường Đại học Công nghiệp Thực phẩm Thành phố Hồ Chí Minh',
        'Trường Đại học Giao thông vận tải Thành phố Hồ Chí Minh',
        'Trường Đại học Nông Lâm Thành phố Hồ Chí Minh',
        'Trường Đại học Sài Gòn',
        'Trường Đại học Sư phạm Thành phố Hồ Chí Minh',
        'Trường Đại học Mở Thành phố Hồ Chí Minh',
        'Trường Đại học Công nghệ Sài Gòn',
        'Trường Đại học Quốc tế Hồng Bàng',
        'Trường Đại học Hùng Vương',
        'Trường Đại học Kỹ thuật - Công nghệ Thành phố Hồ Chí Minh',
        'Trường Đại học Ngoại ngữ - Tin học Thành phố Hồ Chí Minh',
        'Trường Đại học Văn Hiến',
        'Trường Đại học Văn Lang',
        'Trường Đại học Kinh tế - Tài chính Thành phố Hồ Chí Minh',
        'Trường Đại học Hoa Sen',
        'Trường Đại học Công nghệ thông tin Gia Định',
        'Trường Đại học Quốc tế Sài Gòn',
        'Trường Cao đẳng BC Công nghệ và Quản trị doanh nghiệp',
        'Trường Cao đẳng Công nghệ Thủ Đức',
        'Trường Cao đẳng Kinh tế - Kỹ thuật Vinatex TP.HCM',
        'Trường Đại học FPT',
      ],
    },
    hometown: {
      select: '',
      items: [
        'An Giang',
        'Bà rịa – Vũng tàu',
        'Bắc Giang',
        'Bắc Kạn',
        'Bạc Liêu',
        'Bắc Ninh',
        'Bến Tre',
        'Bình Định',
        'Bình Dương',
        'Bình Phước',
        'Bình Thuận',
        'Cà Mau',
        'Cần Thơ',
        'Cao Bằng',
        'Đà Nẵng',
        'Đắk Lắk',
        'Đắk Nông',
        'Điện Biên',
        'Đồng Nai',
        'Đồng Tháp',
        'Gia Lai',
        'Hà Giang',
        'Hà Nam',
        'Hà Nội',
        'Hà Tĩnh',
        'Hải Dương',
        'Hải Phòng',
        'Hậu Giang',
        'Hòa Bình',
        'Hưng Yên',
        'Khánh Hòa',
        'Kiên Giang',
        'Kon Tum',
        'Lai Châu',
        'Lâm Đồng',
        'Lạng Sơn',
        'Lào Cai',
        'Long An',
        'Nam Định',
        'Nghệ An',
        'Ninh Bình',
        'Ninh Thuận',
        'Phú Thọ',
        'Phú Yên',
        'Quảng Bình',
        'Quảng Nam',
        'Quảng Ngãi',
        'Quảng Ninh',
        'Quảng Trị',
        'Sóc Trăng',
        'Sơn La',
        'Tây Ninh',
        'Thái Bình',
        'Thái Nguyên',
        'Thanh Hóa',
        'Thừa Thiên Huế',
        'Tiền Giang',
        'Thành phố Hồ Chí Minh',
        'Trà Vinh',
        'Tuyên Quang',
        'Vĩnh Long',
        'Vĩnh Phúc',
        'Yên Bái',
      ],
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
  // categories
  GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE: 'GET_CATEGORIES_FAILURE',
  GET_CATEGORIES_REQUEST: 'GET_CATEGORIES_REQUEST',
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
  // categories
  GET_CATEGORIES_SUCCESS(state, inputData) {
    state.filter.categories.data = inputData;
    state.filter.isLoading = false;
  },
  GET_CATEGORIES_FAILURE(state) {
    state.filter.categories.isLoading = false;
  },
  GET_CATEGORIES_REQUEST(state) {
    state.filter.categories.isLoading = true;
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
      const url = `/api/v1/types?asc=false&distance=5&latitude=${params.coordinator.lat}&longitude=${params.coordinator.lng}&page=1&size=5&sortBy=score`;
      const res = await window.axios.get(url);
      if (res.status >= 200 && res.status <= 299) {
        commit(mutationTypes.GET_FILTER_RESULT_SUCCESS, res.data.data);
      }
    } catch (error) {
      commit(mutationTypes.GET_FILTER_RESULT_FAILURE);
    }
  },
  async filterSearchByCoordinatorResult({ commit }, params) {
    // params = {lat, long, filterProperties}
    try {
      // coordinator
      let coordinatorStr = '';
      if (params.coordinator !== '') {
        coordinatorStr = `&latitude=${params.coordinator.lat}&longitude=${params.coordinator.lng}`;
      }
      // distance
      let distanceStr = '';
      const distance = params.filterProperties.distance.select.split('km')[0];
      distanceStr = `&distance=${distance}`;
      let facilitiesStr = '';
      params.filterProperties.facility.selects.forEach((element) => {
        facilitiesStr += `&facilityIds=${element}`;
      });
      // price
      let priceStr = '';
      if (params.filterProperties.price.disable) {
        priceStr = `&maxPrice=${params.filterProperties.price.range[1]}&minPrice=${params.filterProperties.price.range[0]}`;
      }
      // min area
      let minSuperficialityStr = '';
      if (params.filterProperties.minArea.select !== '') {
        const minSuperficiality = params.filterProperties.minArea.select.split(' ')[0];
        minSuperficialityStr = `&minSuperficiality=${minSuperficiality}`;
      }
      const url = `/api/v1/types?asc=false&${coordinatorStr}${distanceStr}${facilitiesStr}${priceStr}${minSuperficialityStr}&page=1&size=5&sortBy=score`;
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
  async getAllCategories({ commit }) {
    // no param
    try {
      commit(mutationTypes.GET_CATEGORIES_REQUEST);
      const response = await window.axios.get('/api/v1/categories');
      if (response.status >= 200 && response.status <= 299) {
        commit(mutationTypes.GET_CATEGORIES_SUCCESS, response.data.data);
      }
    } catch (error) {
      commit(mutationTypes.GET_CATEGORIES_FAILURE);
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
