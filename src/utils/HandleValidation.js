import validator from "validator";

export const ValidateEmail = (emailAddress) => {
    return validator.isEmail(emailAddress);
};

export const ValidateNumber = (number) => {
    return validator.isNumeric(number);
};
