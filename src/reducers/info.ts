const info = (state = 0, action: any) => {
  switch (action.type) {
    case "RETURN":
      return action.account;
    default:
      return state;
  }
};

export default info;
