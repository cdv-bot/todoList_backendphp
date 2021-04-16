// api/productApi.js
import axiosClient from './axiosClient';

class ProductApi {
  setAdd = (params) => {
    const url = '/todolist';
    return axiosClient.post(url, params);
  };
  getList = () => {
    const url = '/todolist';
    return axiosClient.get(url);
  };
  getListPage = () => {
    const url = '/todolist';
    return axiosClient.get(url);
  };
  getDone = (params) => {
    const url = '/todolist';
    return axiosClient.get(url, { params });
  };
  putItem = (params, id) => {
    const url = '/todolist';
    return axiosClient.put(`${url}/${id}`, params);
  }
  checkItem = (params, id) => {
    const url = '/todolist';
    return axiosClient.put(`${url}/${id}`, params);
  }
  deleteItem = (id) => {
    const url = '/todolist';
    return axiosClient.delete(`${url}/${id}`);
  }
  nextPage = (params) => {
    const url = '/todolist';
    return axiosClient.get(url, { params });
  }

}
const productApi = new ProductApi();
export default productApi;