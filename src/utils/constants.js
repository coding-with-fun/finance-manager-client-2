export const BACKEND_URL =
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_LOCAL_API_BASE_URL
        : process.env.REACT_APP_API_BASE_URL;
export const TOKEN_ID = "fi-plan-user-token";

export const TRANSACTION_SOURCES_ACCOUNT_TYPES = ["bank-account", "card"];
