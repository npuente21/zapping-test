export function createReducer(initialState, handlersTable) {
    return function (state = initialState, action) {
      if (handlersTable.hasOwnProperty(action.type)) {
        return handlersTable[action.type](state, action);
      } else {
        return state;
      }
    };
  }
  