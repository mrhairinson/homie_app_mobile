const errorCode = {
    SUCCESS: "e000",
    INTERNAL_SERVER_ERROR: "e001",
    DUPLICATE_USER: "e002",
    EXPIRED_OTP: "e003",
    WRONG_OTP: "e004",
    NOT_REGISTED_USER: "e005",
    NOT_PERMISSION: "e006",
    NOT_VALID_TOKEN: "e007",
    DOCUMENT_NOT_FOUND: "e008",
};

const errorMessage = {
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    DUPLICATE_USER: "Duplicate user registration",
    EXPIRED_OTP: "OTP expired",
    WRONG_OTP: "You provided wrong OTP password",
    NOT_REGISTED_USER: "You are not registered",
    NOT_PERMISSION: "You are not able to access this resource",
    NOT_VALID_TOKEN: "This token is invalid",
    DOCUMENT_NOT_FOUND: "This document is not found",
};

module.exports = { errorCode, errorMessage};
