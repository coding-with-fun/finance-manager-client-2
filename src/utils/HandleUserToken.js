import { TOKEN_ID } from "./constants";

export const GetUserToken = () => {
    return localStorage.getItem(TOKEN_ID);
};

export const SetUserToken = (token) => {
    localStorage.setItem(TOKEN_ID, token);
};

export const RemoveUserToken = (cb) => {
    localStorage.removeItem(TOKEN_ID);

    if (cb) cb();
};
