export const GetUserToken = () => {
    return localStorage.getItem("fi-plan-user-token");
};

export const SetUserToken = (token) => {
    localStorage.setItem("fi-plan-user-token", token);
};

export const RemoveUserToken = () => {
    localStorage.removeItem("fi-plan-user-token");
};
