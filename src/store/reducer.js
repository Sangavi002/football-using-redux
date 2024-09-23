
const initialState = {
    isLoading: false,
    isError: false,
    footballMatches: [],
  }

export const footballReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REQUEST':
        return { ...state, isLoading: true, isError: false };
      case 'SUCCESS':
        return { ...state, isLoading: false, footballMatches: action.payload };
      case 'FAILURE':
        return { ...state, isLoading: false, isError: true };
      default:
        return state;
    }
};
   