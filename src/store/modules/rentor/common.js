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
  facilities: {
    data: [],
    isLoading: false,
  },
  services: {
    data: [],
    isLoading: false,
  },
});
const getters = {
  getWardById: (state) => (id) => state.wards.data.find((ward) => ward.wardId === Number(id)),
  // eslint-disable-next-line arrow-body-style
  getDistrictByWardId: (state) => (id) => {
    // eslint-disable-next-line arrow-body-style
    return state.districts.data.find((district) => {
      return district.wards.find((ward) => ward.wardId === Number(id));
    });
  },
  // eslint-disable-next-line arrow-body-style
  getProvinceByDistrictId: (state) => (id) => {
    // eslint-disable-next-line arrow-body-style
    return state.provinces.data.find((province) => {
      return province.districts.find((district) => district.districtId === Number(id));
    });
  },
};
const mutationTypes = {
  GET_PROVINCES_REQUEST: 'GET_PROVINCES_REQUEST',
  GET_PROVINCES_SUCCESS: 'GET_PROVINCES_SUCCESS',
  GET_PROVINCES_FAILURE: 'GET_PROVINCES_FAILURE',
};
const mutations = {
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
    // set data
    state.provinces.data = provinces;
    state.districts.data = districts;
    state.wards.data = wards;
    state.provinces.isLoading = false;
  },
  GET_PROVINCES_FAILURE(state) {
    state.provinces.isLoading = false;
  },
};
const actions = {
  async getProvinces({ commit, state }) {
    if (state.provinces.data.length === 0) {
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
