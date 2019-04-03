export const getFilteredVientos = (vientos, { contentHTML, sortBy, startYear, endYear }) => dispatch => {
    return vientos.filter(viento => {
        const contentHTMLMatch = viento.title.toLowerCase().includes(contentHTML.toLowerCase()) || viento.description.toLowerCase().includes(contentHTML.toLowerCase());
        const startYearMatch = typeof startYear !== 'number' || startYear <= viento.createdAt;
        const endYearMatch = typeof endYear !== 'number' || viento.createdAt <= endYear;
        return contentHTMLMatch && startYearMatch && endYearMatch;
    }).sort((viento1, viento2) => {
        if (sortBy === 'title') {
            return viento1.title.localeCompare(viento2.title);
        } else if (sortBy === 'published') {
            return viento1.createdAt < viento2.createdAt ? -1 : 1;
        }
    });
  }
  
  const filtersReducerDefaultState = {
    contentHTML: '',
    sortBy: '',
    startYear: undefined,
    endYear: undefined
  };
  
  export const clear = () => dispatch => ({
    type: 'CLEAR',
    defaultFilter: filtersReducerDefaultState
  });
  
  export const filterText = (text = '') => dispatch => ({
    type: 'FILTER_TEXT',
    text
  });
  
  export const startYear = (startYear) => dispatch => ({
    type: 'START_YEAR',
    startYear
  });
  
  export const endYear = (endYear) => dispatch => ({
    type: 'END_YEAR',
    endYear
  });
  
  export const sortBy = (sortType) => dispatch => ({
    type: 'SORT_BY',
    sortType
  });