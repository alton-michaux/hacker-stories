const ListReducer = (state, action) => {
  switch (action.type) {
    case 'LIST_FETCH_INIT':
      const savedList = JSON.parse(localStorage.getItem('list'))
      if (savedList) {
        return {
          ...state,
          isLoading: false,
          isError: false,
          isBlank: false,
          data: savedList,
        };
      } else
      return {
        ...state,
        isLoading: true,
        isError: false,
        isBlank: true,
      }
    case 'LIST_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isBlank: false,
        data: action.payload,
      };
    case 'LIST_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isBlank: false,
      };
    case 'LIST_NO_RESULTS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isBlank: true,
      }
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
