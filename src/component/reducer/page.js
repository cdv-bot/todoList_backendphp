import * as actions from '../constants/addTask';

const initialState = {
  page: 1
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COUNT_PAGE: {
      return {
        page: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer;