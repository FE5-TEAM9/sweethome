const selectedCart = (state = [], action: any) => {
  switch (action.type) {
    case "CHECKED_SELECTED_CART":
      action.items.isChecked = true;
      return action.items.isChecked ? [...state, action.items] : [...state];
    case "DELETE_SELECTED_CART":
      return action.items;
    case "REFRESH":
        return []
    default:
      return state
  }
};

export default selectedCart;
