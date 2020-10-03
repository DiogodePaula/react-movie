const defaultState = null;

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'login':
      return action.data;
    case 'logout':
      return defaultState;
    default:
      return state;
  }
}
