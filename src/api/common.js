import constant from '../config/constant';

async function get(relativeUrl) {
  const url = `${constant.VUE_APP_API_URL}/api/v1/${relativeUrl}`;
  const response = null;
  try {
    response = await this.$axios.get(url);
    return response;
  } catch (error) {
    return null;
  }
}

async function post(url, payload) {
  return null;
}

async function put(url, payload) {
  return null;
}

async function delele(url) {
  return null;
}

export const {
  get,
  put,
  post,
  delele,
}