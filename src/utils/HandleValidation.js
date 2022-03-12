import validator from "validator";

export const ValidateEmail = (emailAddress) => {
    return validator.isEmail(emailAddress);
};
