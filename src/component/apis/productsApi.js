// api/productApi.js
import axiosClient from './axiosClient';

class ProductApi {
  setAdd = (params) => {
    const url = '/todolist';
    return axiosClient.post(url, params);
  };
  getList = () => {
    const url = '/todolist';
    return axiosClient.get(url, {
      params: {
        _sort: 'time',
        _order: 'desc',
        _page: 1,
        _limit: 7
      }
    });
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
    return axiosClient.patch(`${url}/${id}`, params);
  }
  checkItem = (params, id) => {
    const url = '/todolist';
    return axiosClient.patch(`${url}/${id}`, params);
  }
  deleteItem = (id) => {
    const url = '/todolist';
    return axiosClient.delete(`${url}/${id}`);
  }
  nextPage = (page, action) => {
    const url = '/todolist';
    return axiosClient.get(url, {
      params: {
        _sort: 'id',
        _order: 'desc',
        _page: page,
        _limit: 7
      }
    });
  }

  checkAccount = (params) => {
    const url = '/account';
    return axiosClient.get(url, { params });
  };
  checkId = (hash) => {
    const url = '/account';
    return axiosClient.get(url, {
      params: {
        hash
      }
    });
  };
  fixHash = (id, hash) => {
    const url = '/account';
    return axiosClient.patch(`${url}/${id}`, {
      hash
    });
  };
  checkuser = (user) => {
    const url = '/account';
    return axiosClient.get(url, {
      params: {
        user
      }
    });
  };

  addUser = (params) => {
    const url = '/account';
    return axiosClient.post(url, params);
  };
}
const productApi = new ProductApi();
export default productApi;