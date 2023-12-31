const initialState = '';

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
        return action.payload;
    case 'CLEAR_SEARCH_TERM':
        return '';
    default:
        return state;
  }
};

export default searchReducer;