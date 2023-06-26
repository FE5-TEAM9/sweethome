const buyItem = (state = {}, action: any) => {
  switch (action.type) {
    case "GET_BUYITEM":
      return action.payload
    default:
      return state;
  }
};

export default buyItem