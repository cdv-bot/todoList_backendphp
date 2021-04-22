import productApi from '../apis/productsApi';
import * as actions from '../constants/addTask.js';

const showLoading = (data) => {
  return {
    type: actions.LOADING,
    payload: data,
  };
};

const handleAddList = (data) => {
  return {
    type: actions.ADD_TASK_LIST,
    payload: data,
  };
};

export const DataAddList = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(false));
      const response = await productApi.getList();
      dispatch(handleAddList(response));
      dispatch(showLoading(true));
    } catch (error) {
      dispatch(handleAddList([]));
    }
  };
};

// -----------thêm data-----------

const handleEmendList = (data) => {
  return {
    type: actions.EMEND_TASK_LIST,
    payload: data,
  };
};

export const emendList = (data) => {
  return async (dispatch) => {
    var time = new Date();
    try {
      let obj = {
        content: data,
        time,
        checks: false,
        user: 'an',
      };
      await productApi.setAdd(obj);
      const response = await productApi.getList();
      dispatch(handleAddList(response));
    } catch (error) {
      dispatch(handleEmendList([]));
    }
  };
};

// ________done__________

const handleDone = (data) => {
  return {
    type: actions.DONE_ITEM,
    payload: data,
  };
};

export const doneItem = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(false));
      let response = await productApi.getDone({
        checks: true,
        _page: 1,
        _limit: 7,
      });
      dispatch(handleDone(response));
      setTimeout(() => {
        dispatch(showLoading(true));
      }, 400);
    } catch (error) {
      dispatch(handleDone([]));
    }
  };
};

// ------------- un

const handleUnfinished = (data) => {
  return {
    type: actions.UNFINISHED,
    payload: data,
  };
};

export const unfinishedItem = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(false));
      let response = await productApi.getDone({
        checks: false,
        _page: 1,
        _limit: 7,
      });
      dispatch(handleUnfinished(response));
      setTimeout(() => {
        dispatch(showLoading(true));
      }, 400);
    } catch (error) {
      dispatch(handleDone([]));
    }
  };
};

// -----put

const handleRepair = (data, id) => {
  return {
    type: actions.REPAIR,
    payload: {
      data,
      id,
    },
  };
};

export const repairItem = (data, id) => {
  return async (dispatch) => {
    try {
      var time = new Date();
      const obj = {
        time,
        content: data,
      };
      dispatch(handleRepair(obj, id));
      productApi.putItem(obj, id);
    } catch (error) {
      alert('Lỗi server');
    }
  };
};
// ------------checker----------

const handleChecker = (data, id) => {
  return {
    type: actions.CHECKER,
    payload: {
      data,
      id,
    },
  };
};

export const checkerItem = (data, id) => {
  return async (dispatch) => {
    try {
      const obj = {
        checks: !data,
      };
      dispatch(handleChecker(data, id));
      await productApi.checkItem(obj, id);
    } catch (error) {
      alert('Lỗi server');
    }
  };
};

// --------------delete-------------
const handleDelete = (data) => {
  return {
    type: actions.DELETE,
    payload: data,
  };
};

export const deleteItems = (id, page) => {
  return async (dispatch) => {
    try {
      await productApi.deleteItem(id);
      let req = await productApi.nextPage(page);
      dispatch(handleDelete(req));
    } catch (error) {
      alert('Lỗi server');
    }
  };
};
// ------------delete all-----
const handleDeleteAll = (data) => {
  return {
    type: actions.DELETE_ALL,
    payload: data,
  };
};

export const deleteItemsAll = () => {
  return async (dispatch) => {
    try {
      dispatch(showLoading(false));
      let arr = await productApi.getDone({
        checks: true,
      });
      for (let key of arr) {
        await productApi.deleteItem(JSON.parse(key.id));
      }
      dispatch(handleDeleteAll(arr));
      dispatch(showLoading(true));
    } catch (error) {
      alert('Lỗi server');
    }
  };
};

// ---------------------
export const numberPage = (page) => {
  return {
    type: actions.COUNT_PAGE,
    payload: page,
  };
};
const handleNextPage = (data) => {
  return {
    type: actions.NEXT_PAGE,
    payload: data,
  };
};

export const nextPage = (page, action) => {
  return async (dispatch) => {
    try {
      if (action === 'ALL') {
        const response = await productApi.nextPage(page);
        dispatch(handleNextPage(response));
      }
      if (action === true) {
        let response = await productApi.getDone({
          checks: true,
          _page: page,
          _limit: 7,
        });
        dispatch(handleNextPage(response));
      }
      if (action === false) {
        let response = await productApi.getDone({
          checks: false,
          _page: page,
          _limit: 7,
        });
        dispatch(handleNextPage(response));
      }
    } catch (error) {
      alert('Lỗi server');
    }
  };
};
