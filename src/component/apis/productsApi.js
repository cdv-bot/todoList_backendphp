// api/productApi.js
import axiosClient from './axiosClient';

class ProductApi {
  setAdd = (params) => {
    const url = '/add.php';
    return axiosClient.get(url, { params });
  };
  getList = () => {
    const url = '/show.php';
    return axiosClient.get(url);
  };
  updateList = (params) => {
    const url = '/repair.php';
    return axiosClient.get(url, { params });
  };
  delete = (params) => {
    const url = '/delete.php';
    return axiosClient.get(url, { params });
  };
  checked = (params) => {
    const url = '/checked.php';
    return axiosClient.get(url, { params });
  };
  endpoint = (params) => {
    const url = '/endpoint.php';
    return axiosClient.get(url, { params });
  }
  deleteAll = (params) => {
    const url = '/deleteAll.php';
    return axiosClient.get(url, { params });
  }

}
const productApi = new ProductApi();
export default productApi;