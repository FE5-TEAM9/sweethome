const cart = (state = [], action: any) => {
  switch (action.type) {
    case "RETURN_CART":
      return action.items;
    default:
      return state;
  }
};

export default cart