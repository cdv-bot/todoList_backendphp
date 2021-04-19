import * as actions from '../constants/addTask';

const initialState = {
  data: [],
  pagination: null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TASK_LIST: {
      return action.payload;
    }
    case actions.EMEND_TASK_LIST: {
      const { payload } = action;
      const arr = [...state.data, payload];
      const list = {
        data: arr,
        ...state
      }
      console.log(list)
      return list;
    }
    case actions.DONE_ITEM: {
      const { payload } = action;
      return payload;
    }
    case actions.UNFINISHED: {
      const { payload } = action;
      return payload;
    }
    case actions.REPAIR: {
      const { data, id } = action.payload;
      let arr = [...state.data];
      const index = arr.findIndex(x => {
        return id === x.id;
      });
      arr[index] = {
        ...arr[index],
        ...data
      };

      let obj = {
        ...state,
        data: arr
      };
      return obj;
    }
    case actions.CHECKER: {
      const { data, id } = action.payload;

      let arr = [...state.data];
      const index = arr.findIndex(x => {
        return id === x.id;
      });

      arr[index] = {
        ...arr[index],
        checks: !data
      };
      let obj = {
        ...state,
        data: arr
      }
      return obj;
    }

    case actions.DELETE: {
      const id = action.payload;
      const index = state.data.findIndex(x => {
        return id === x.id;
      });
      let arr = [...state.data];
      arr.splice(index, 1);
      let obj = {
        ...state,
        data: arr
      }
      return obj;
    }
    case actions.DELETE_ALL: {
      const data = action.payload;
      const listIndex = data.map(x => x.id);
      const arr = [...state.data];
      for (let key of listIndex) {
        let index = arr.findIndex(x => x.id === key);
        arr.splice(index, 1);
      }
      let obj = {
        data: arr,
        pagination: {
          ...state.pagination,
          _totalRows: state.pagination._totalRows - listIndex.length
        }
      }

      return obj;
    }
    case actions.NEXT_PAGE: {
      const data = action.payload;
      return data;
    }
    default: {
      return state;
    }
  }

};

export default reducer;
