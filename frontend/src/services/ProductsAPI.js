import API from './API';

export default {
  getProducts(page = 1, perPage = 6) {
    return API().get(`/getProducts?page=${page}&perpage=${perPage}`);
  },
  getProductById(id) {
    return API().get(`/getProducts/${id}`);
  },
  getProductsByIds(ids) {
    return API().post('/getProductsByIds', { ids });
  },
};
