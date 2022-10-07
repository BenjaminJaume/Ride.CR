const userTypes = {
  REGISTER_USER_REQUESTED: "REGISTER_USER_REQUESTED",
  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  REGISTER_USER_FAIL: "REGISTER_USER_FAIL",
  LOGIN_REQUESTED: "LOGIN_REQUESTED",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT: "LOGOUT",

  SET_USER_AVATAR_REQUESTED: "SET_USER_AVATAR_REQUESTED",
  SET_USER_AVATAR_DATA: "SET_USER_AVATAR_DATA",
  SET_USER_AVATAR_ERROR: "SET_USER_AVATAR_ERROR",

  SET_USER_FIRST_SETUP_REQUESTED: "SET_USER_FIRST_SETUP_REQUESTED",
  SET_USER_FIRST_SETUP_DATA: "SET_USER_FIRST_SETUP_DATA",
  SET_USER_FIRST_SETUP_ERROR: "SET_USER_FIRST_SETUP_ERROR",

  CONFIRM_EMAIL_REQUESTED: "CONFIRM_EMAIL_REQUESTED",
  CONFIRM_EMAIL_DATA: "CONFIRM_EMAIL_DATA",
  CONFIRM_EMAIL_ERROR: "CONFIRM_EMAIL_ERROR",

  SEND_EMAIL_FORGOT_PASSWORD_REQUESTED: "SEND_EMAIL_FORGOT_PASSWORD_REQUESTED",
  SEND_EMAIL_FORGOT_PASSWORD_DATA: "SEND_EMAIL_FORGOT_PASSWORD_DATA",
  SEND_EMAIL_FORGOT_PASSWORD_ERROR: "SEND_EMAIL_FORGOT_PASSWORD_ERROR",

  RESET_PASSWORD_REQUESTED: "RESET_PASSWORD_REQUESTED",
  RESET_PASSWORD_DATA: "RESET_PASSWORD_DATA",
  RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR",

  CHECK_DEPRECATED_LINK_RESET_PASSWORD_REQUESTED:
    "CHECK_DEPRECATED_LINK_RESET_PASSWORD_REQUESTED",
  CHECK_DEPRECATED_LINK_RESET_PASSWORD_DATA:
    "CHECK_DEPRECATED_LINK_RESET_PASSWORD_DATA",
  CHECK_DEPRECATED_LINK_RESET_PASSWORD_ERROR:
    "CHECK_DEPRECATED_LINK_RESET_PASSWORD_ERROR",

  RESEND_CONFIRMATION_LINK_REQUESTED: "RESEND_CONFIRMATION_LINK_REQUESTED",
  RESEND_CONFIRMATION_LINK_DATA: "RESEND_CONFIRMATION_LINK_DATA",
  RESEND_CONFIRMATION_LINK_ERROR: "RESEND_CONFIRMATION_LINK_ERROR",

  GET_SUBMISSIONS_BECOME_DRIVER_REQUESTED:
    "GET_SUBMISSIONS_BECOME_DRIVER_REQUESTED",
  GET_SUBMISSIONS_BECOME_DRIVER_DATA: "GET_SUBMISSIONS_BECOME_DRIVER_DATA",
  GET_SUBMISSIONS_BECOME_DRIVER_ERROR: "GET_SUBMISSIONS_BECOME_DRIVER_ERROR",

  GET_APPLICATION_BECOME_DRIVER_REQUESTED:
    "GET_APPLICATION_BECOME_DRIVER_REQUESTED",
  GET_APPLICATION_BECOME_DRIVER_DATA: "GET_APPLICATION_BECOME_DRIVER_DATA",
  GET_APPLICATION_BECOME_DRIVER_ERROR: "GET_APPLICATION_BECOME_DRIVER_ERROR",

  SET_FORM_BECOME_DRIVER_ID_TYPE: "SET_FORM_BECOME_DRIVER_ID_TYPE",
  SET_FORM_BECOME_DRIVER_ID_NUMBER: "SET_FORM_BECOME_DRIVER_ID_NUMBER",
  SET_FORM_BECOME_DRIVER_ID_COUNTRY: "SET_FORM_BECOME_DRIVER_ID_COUNTRY",
  SET_FORM_BECOME_DRIVER_LICENSE_NUMBER:
    "SET_FORM_BECOME_DRIVER_LICENSE_NUMBER",
  SET_FORM_BECOME_DRIVER_LICENSE_COUNTRY:
    "SET_FORM_BECOME_DRIVER_LICENSE_COUNTRY",
  SET_FORM_BECOME_DRIVER_CAR_MAKER: "SET_FORM_BECOME_DRIVER_CAR_MAKER",
  SET_FORM_BECOME_DRIVER_CAR_MODEL: "SET_FORM_BECOME_DRIVER_CAR_MODEL",
  SET_FORM_BECOME_DRIVER_NUMBER_PLATE: "SET_FORM_BECOME_DRIVER_NUMBER_PLATE",
  SET_FORM_BECOME_DRIVER_CAR_YEAR: "SET_FORM_BECOME_DRIVER_CAR_YEAR",
  SET_FORM_BECOME_DRIVER_CAR_COLOR: "SET_FORM_BECOME_DRIVER_CAR_COLOR",
  SET_FORM_BECOME_DRIVER_CAR_MARCHAMO: "SET_FORM_BECOME_DRIVER_CAR_MARCHAMO",
  SET_FORM_BECOME_DRIVER_CAR_RITEVE_MONTH:
    "SET_FORM_BECOME_DRIVER_CAR_RITEVE_MONTH",
  SET_FORM_BECOME_DRIVER_CAR_RITEVE_YEAR:
    "SET_FORM_BECOME_DRIVER_CAR_RITEVE_YEAR",
  RESET_APPLICATION_FORM_BECOME_DRIVER: "RESET_APPLICATION_FORM_BECOME_DRIVER",

  SUBMIT_FORM_BECOME_DRIVER_REQUESTED: "SUBMIT_FORM_BECOME_DRIVER_REQUESTED",
  SUBMIT_FORM_BECOME_DRIVER_SUCCESS: "SUBMIT_FORM_BECOME_DRIVER_SUCCESS",
  SUBMIT_FORM_BECOME_DRIVER_ERROR: "SUBMIT_FORM_BECOME_DRIVER_ERROR",

  UPDATE_DRIVER_STATE_REQUESTED: "UPDATE_DRIVER_STATE_REQUESTED",
  UPDATE_DRIVER_STATE_SUCCESS: "UPDATE_DRIVER_STATE_SUCCESS",
  UPDATE_DRIVER_STATE_ERROR: "UPDATE_DRIVER_STATE_ERROR",

  SUBMIT_CONTACT_FORM_REQUESTED: "SUBMIT_CONTACT_FORM_REQUESTED",
  SUBMIT_CONTACT_FORM_SUCCESS: "SUBMIT_CONTACT_FORM_SUCCESS",
  SUBMIT_CONTACT_FORM_ERROR: "SUBMIT_CONTACT_FORM_ERROR",

  UPDATE_USER_RATINGS_REQUESTED: "UPDATE_USER_RATINGS_REQUESTED",
  UPDATE_USER_RATINGS_SUCCESS: "UPDATE_USER_RATINGS_SUCCESS",
  UPDATE_USER_RATINGS_ERROR: "UPDATE_USER_RATINGS_ERROR",

  UPDATE_USER_EXPERIENCE_REQUESTED: "UPDATE_USER_EXPERIENCE_REQUESTED",
  UPDATE_USER_EXPERIENCE_SUCCESS: "UPDATE_USER_EXPERIENCE_SUCCESS",
  UPDATE_USER_EXPERIENCE_ERROR: "UPDATE_USER_EXPERIENCE_ERROR",

  SUBMIT_EDIT_BIO_REQUESTED: "SUBMIT_EDIT_BIO_REQUESTED",
  SUBMIT_EDIT_BIO_SUCCESS: "SUBMIT_EDIT_BIO_SUCCESS",
  SUBMIT_EDIT_BIO_ERROR: "SUBMIT_EDIT_BIO_ERROR",

  SUBMIT_EDIT_PASSWORD_REQUESTED: "SUBMIT_EDIT_PASSWORD_REQUESTED",
  SUBMIT_EDIT_PASSWORD_SUCCESS: "SUBMIT_EDIT_PASSWORD_SUCCESS",
  SUBMIT_EDIT_PASSWORD_ERROR: "SUBMIT_EDIT_PASSWORD_ERROR",

  SUBMIT_EDIT_DATE_OF_BIRTH_REQUESTED: "SUBMIT_EDIT_DATE_OF_BIRTH_REQUESTED",
  SUBMIT_EDIT_DATE_OF_BIRTH_SUCCESS: "SUBMIT_EDIT_DATE_OF_BIRTH_SUCCESS",
  SUBMIT_EDIT_DATE_OF_BIRTH_ERROR: "SUBMIT_EDIT_DATE_OF_BIRTH_ERROR",

  SUBMIT_REMOVE_ACCOUNT_REQUESTED: "SUBMIT_REMOVE_ACCOUNT_REQUESTED",
  SUBMIT_REMOVE_ACCOUNT_SUCCESS: "SUBMIT_REMOVE_ACCOUNT_SUCCESS",
  SUBMIT_REMOVE_ACCOUNT_ERROR: "SUBMIT_REMOVE_ACCOUNT_ERROR",

  IS_ACCOUNT_CLOSED_REQUESTED: "IS_ACCOUNT_CLOSED_REQUESTED",
  IS_ACCOUNT_CLOSED_SUCCESS: "IS_ACCOUNT_CLOSED_SUCCESS",
  IS_ACCOUNT_CLOSED_ERROR: "IS_ACCOUNT_CLOSED_ERROR",

  UPDATE_USER_REQUESTED: "UPDATE_USER_REQUESTED",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR: "UPDATE_USER_ERROR",

  GET_DRIVER_PROFILE_REQUEST: "GET_DRIVER_PROFILE_REQUEST",
  GET_DRIVER_PROFILE_SUCCESS: "GET_DRIVER_PROFILE_SUCCESS",
  GET_DRIVER_PROFILE_FAIL: "GET_DRIVER_PROFILE_FAIL",

  GET_PASSENGER_PROFILE_REQUEST: "GET_PASSENGER_PROFILE_REQUEST",
  GET_PASSENGER_PROFILE_SUCCESS: "GET_PASSENGER_PROFILE_SUCCESS",
  GET_PASSENGER_PROFILE_FAIL: "GET_PASSENGER_PROFILE_FAIL",

  GET_DRIVER_EARNINGS_REQUEST: "GET_DRIVER_EARNINGS_REQUEST",
  GET_DRIVER_EARNINGS_SUCCESS: "GET_DRIVER_EARNINGS_SUCCESS",
  GET_DRIVER_EARNINGS_FAIL: "GET_DRIVER_EARNINGS_FAIL",
};

export default userTypes;
