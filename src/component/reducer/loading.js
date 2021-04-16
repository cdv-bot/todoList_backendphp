import * as actions from '../constants/addTask';

const initialState = {
  loading: true
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer;