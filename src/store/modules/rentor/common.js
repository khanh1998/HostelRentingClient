const myState = () => ({
  provinces: {
    data: [],
    isLoading: false,
  },
  districts: {
    data: [],
  },
  wards: {
    data: [],
  },
  streets: {
    data: [],
  },
  categories: {
    data: [],
    isLoading: false,
  },
});
const getters = {
  getCategoryId: (state) => (id) => {
    const result = state.categories.data.find((category) => category.categoryId === Number(id));
    return result;
  },
  getStreetById: (state) => (id) => {
    return state.streets.data.find((street) => street.streetId === Number(id));
  },
  getWardByStreetId: (state) => (id) => {
    return state.wards.data.find((ward) => {
      return ward.streets.find((street) => street.streetId === Number(id));
    });
  },
  getWardById: (state) => (id) => {
    return state.wards.data.find((ward) => ward.wardId === Number(id));
  },
  getDistrictByWardId: (state) => (id) => {
    return state.districts.data.find((district) => {
      return district.wards.find((ward) => ward.wardId === Number(id));
    });
  },
  getProvinceByDistrictId: (state) => (id) => {
    return state.provinces.data.find((province) => {
      return province.districts.find((district) => district.districtId === Number(id));
    });
  },
};
const mutationTypes = {
  GET_PROVINCES_REQUEST: 'GET_PROVINCES_REQUEST',
  GET_PROVINCES_SUCCESS: 'GET_PROVINCES_SUCCESS',
  GET_PROVINCES_FAILURE: 'GET_PROVINCES_FAILURE',

  GET_CATEGORIES_REQUEST: 'GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE: 'GET_CATEGORIES_FAILURE',
};
const mutations = {
  GET_CATEGORIES_REQUEST(state) {
    state.categories.isLoading = true;
  },
  GET_CATEGORIES_SUCCESS(state, categories) {
    state.categories.data = categories;
    state.categories.isLoading = false;
  },
  GET_CATEGORIES_FAILURE(state) {
    state.categories.isLoading = false;
  },
  GET_PROVINCES_REQUEST(state) {
    state.provinces.isLoading = true;
  },
  GET_PROVINCES_SUCCESS(state, provinces) {
    // get all districts from provinces
    let districts = provinces.map((province) => province.districts);
    districts = districts.flat();
    // get all wards from districts
    let wards = districts.map((district) => district.wards);
    wards = wards.flat();
    // get all streets from wards
    let streets = wards.map((ward) => ward.streets);
    streets = streets.flat();
    // set data
    state.provinces.data = provinces;
    state.districts.data = districts;
    state.wards.data = wards;
    state.streets.data = streets;
    state.provinces.isLoading = false;
  },
  GET_PROVINCES_FAILURE(state) {
    state.provinces.isLoading = false;
  },
};
const actions = {
  async getCategories({ commit, state }) {
    if (state.categories.data.length === 0 && !state.categories.isLoading) {
      commit(mutationTypes.GET_CATEGORIES_REQUEST);
      const res = await window.axios.get('/api/v1/categories');
      if (res.status === 200) {
        commit(mutationTypes.GET_CATEGORIES_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_PROVINCES_FAILURE);
      }
    }
  },
  async getProvinces({ commit, state }) {
    if (state.provinces.data.length === 0 && !state.provinces.isLoading) {
      commit(mutationTypes.GET_PROVINCES_REQUEST);
      const res = await window.axios.get('/api/v1/provinces');
      if (res.status === 200) {
        commit(mutationTypes.GET_PROVINCES_SUCCESS, res.data.data);
      } else {
        commit(mutationTypes.GET_PROVINCES_FAILURE);
      }
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
