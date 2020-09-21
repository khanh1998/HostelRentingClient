const myState = () => ({
  provinces: {
    data: [],
    isLoading: false,
    error: undefined,
    success: undefined,
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
  facilities: {
    data: [],
    isLoading: false,
    error: undefined,
    success: undefined,
  },
  services: {
    data: [],
    isLoading: false,
    error: undefined,
    success: undefined,
  },
});
const getters = {
  getCategoryId: (state) => (id) => {
    const result = state.categories.data.find((category) => category.categoryId === Number(id));
    return result;
  },
  getStreetById: (state) => (id) => {
    const res = state.streets.data.find((street) => street.streetId === Number(id));
    return res;
  },
  getWardByStreetId: (state) => (id) => {
    const res = state.wards.data.find((ward) => {
      const res1 = ward.streets.find((street) => street.streetId === Number(id));
      return res1;
    });
    return res;
  },
  getWardById: (state) => (id) => state.wards.data.find((ward) => ward.wardId === Number(id)),
  getDistrictByWardId: (state) => (id) => {
    const res = state.districts.data.find((district) => {
      const res1 = district.wards.find((ward) => ward.wardId === Number(id));
      return res1;
    });
    return res;
  },
  getProvinceByDistrictId: (state) => (id) => {
    const res = state.provinces.data.find((province) => {
      const res1 = province.districts.find((district) => district.districtId === Number(id));
      return res1;
    });
    return res;
  },
};
const mutationTypes = {
  GET_PROVINCES_REQUEST: 'GET_PROVINCES_REQUEST',
  GET_PROVINCES_SUCCESS: 'GET_PROVINCES_SUCCESS',
  GET_PROVINCES_FAILURE: 'GET_PROVINCES_FAILURE',

  GET_CATEGORIES_REQUEST: 'GET_CATEGORIES_REQUEST',
  GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORIES_FAILURE: 'GET_CATEGORIES_FAILURE',

  GET_SERVICES_REQUEST: 'GET_SERVICES_REQUEST',
  GET_SERVICES_SUCCESS: 'GET_SERVICES_SUCCESS',
  GET_SERVICES_FAILURE: 'GET_SERVICES_FAILURE',

  GET_FACILITIES_REQUEST: 'GET_FACILITIES_REQUEST',
  GET_FACILITIES_SUCCESS: 'GET_FACILITIES_SUCCESS',
  GET_FACILITIES_FAILURE: 'GET_FACILITIES_FAILURE',
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

  GET_FACILITIES_SUCCESS(state, inputData) {
    state.facilities.data = inputData;
    state.facilities.isLoading = false;
    state.facilities.success = true;
  },
  GET_FACILITIES_FAILURE(state, error) {
    state.facilities.isLoading = false;
    state.facilities.error = error;
    state.facilities.success = false;
  },
  GET_FACILITIES_REQUEST(state) {
    state.facilities.isLoading = true;
  },

  GET_SERVICES_SUCCESS(state, inputData) {
    state.services.data = inputData;
    state.services.isLoading = false;
    state.services.success = true;
  },
  GET_SERVICES_FAILURE(state, error) {
    state.services.isLoading = false;
    state.services.error = error;
    state.services.success = false;
  },
  GET_SERVICES_REQUEST(state) {
    state.services.isLoading = true;
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

  async getAllFacilities1({ commit }) {
    console.log('get all facilities');
    try {
      commit(mutationTypes.GET_FACILITIES_REQUEST);
      const res = await window.axios.get('/api/v1/facilities');
      if (res.status >= 200 && res.status <= 299) {
        commit(mutationTypes.GET_FACILITIES_SUCCESS, res.data.data);
      }
    } catch (error) {
      commit(mutationTypes.GET_FACILITIES_FAILURE, error);
    }
  },

  async getAllServices1({ commit }) {
    console.log('get all serverice');
    try {
      commit(mutationTypes.GET_SERVICES_REQUEST);
      const res = await window.axios.get('/api/v1/services');
      if (res.status >= 200 && res.status <= 299) {
        commit(mutationTypes.GET_SERVICES_SUCCESS, res.data.data);
      }
    } catch (error) {
      commit(mutationTypes.GET_SERVICES_FAILURE, error);
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
