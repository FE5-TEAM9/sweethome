const user = (state = {}, action: any) => {
  switch (action.type) {
    case "RETURN_USER":
      return action.payload
    default:
      return state;
  }
};

export default user;
