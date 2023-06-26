const cart = (state = [], action: any) => {
  switch (action.type) {
    case "RETURN_CART":
      return action.items;
    case "DELETE_ITEM":
      let num = state.findIndex((obj:any)=>{
        return obj.id === action.items
      })
      return state.splice(num,1)
    default:
      return state;
  }
};

export default cart;