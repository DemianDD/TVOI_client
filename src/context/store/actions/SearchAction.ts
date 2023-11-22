export const setSearchTerm = (searchTerm: string) => ({
    type: 'SET_SEARCH_TERM',
    payload: searchTerm,
});
  
export const clearSearchTerm = () => ({
    type: 'CLEAR_SEARCH_TERM',
});