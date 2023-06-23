const logout = (state = true, action: any) => {
  switch (action.type) {
    case "LOGOUT":
      return action.state;
    default:
      return state;
  }
};

export default logout;
