const selectedCart = (state = [], action: any) => {
  switch (action.type) {
    case "CHECKED_SELECTED_CART":
      console.log(action.items.isChecked);
      action.items.isChecked = true;
      return action.items.isChecked ? [...state, action.items] : [...state];
    case "DELETE_SELECTED_CART":
      return action.items;
    default:
      return state;
  }
};

export default selectedCart;
