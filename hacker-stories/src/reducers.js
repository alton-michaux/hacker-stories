const ListReducer = (state, action) => {
  if (state.data.length === 0) { action.type = 'LIST_NO_INIT'}
  switch (action.type) {
    case 'LIST_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isEmpty: false,
      };
    case 'LIST_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isEmpty: false,
        data: action.payload,
      };
    case 'LIST_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isEmpty: false,
      };
    case 'LIST_NO_INIT':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isEmpty: true,
      };
    case 'REMOVE_LIST':
      return {
        ...state,
        data: state.data.filter(
          (entry) => action.payload.id !== entry.id),
      };
    default:
      throw new Error();
  }
}

export default ListReducer
