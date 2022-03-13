import { ValidateNumber } from "../../../utils/HandleValidation";

const ValidateAccountDetails = ({ accountDetails, setErrors }) => {
    const { name, balance, type } = accountDetails;
    const errors = {};

    if (!`${name}`.trim()) {
        errors["name"] = "Account name is required.";
    }

    if (!`${type}`.trim()) {
        errors["type"] = "Account type is required.";
    }

    if (!`${balance}`.trim()) {
        errors["balance"] = "Account balance is required.";
    } else if (!ValidateNumber(balance)) {
        errors["balance"] = "Account balance should be a number.";
    }

    setErrors(errors);

    return errors;
};

export default ValidateAccountDetails;
