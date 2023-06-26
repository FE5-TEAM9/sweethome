const account = (state = {}, action: any) => {
  switch (action.type) {
    case "GET_ACCOUNT_LIST":
      return action.accountList;
    default:
      return state;
  }
};

export default account;
