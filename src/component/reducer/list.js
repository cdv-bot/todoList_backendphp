import * as actions from '../constants/addTask';

const initialState = [];
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TASK_LIST: {
      return action.payload;
    }
    case actions.EMEND_TASK_LIST: {
      const { payload } = action;
      const arr = [...state, payload];
      return arr;
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
      let arr = [...state];
      const index = arr.findIndex(x => {
        return id === x.id;
      });
      arr[index] = {
        ...arr[index],
        ...data
      };
      return arr;
    }
    case actions.CHECKER: {
      const { data, id } = action.payload;
      let arr = [...state];
      const index = arr.findIndex(x => {
        return id === x.id;
      });
      arr[index] = {
        ...arr[index],
        checks: !data
      };
      return arr;
    }
    case actions.DELETE: {
      const id = action.payload;
      const index = state.findIndex(x => {
        return id === x.id;
      });
      let arr = [...state];
      arr.splice(index, 1);
      return arr;
    }
    case actions.DELETE_ALL: {
      const data = action.payload;
      const listIndex = data.map(x => x.id);
      const arr = [...state];
      for (let key of listIndex) {
        let index = arr.findIndex(x => x.id === key);
        arr.splice(index, 1);
      }
      return arr;
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
