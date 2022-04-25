import axios from "axios";
import userTypes from "./userTypes";
import validator from "validator";

import {
  setfeedback,
  setToast,
  getDriverNewRidesRequests,
  resetNotifications,
} from "../index";

const URL_API = process.env.REACT_APP_URL_API;

export const registerUserRequested = () => {
  return {
    type: userTypes.REGISTER_USER_REQUESTED,
  };
};

export const registerUser = (formSignupUser) => {
  return (dispatch) => {
    dispatch(registerUserRequested());

    axios
      .post(URL_API + "/user/signup", {
        formSignupUser,
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data.message,
          })
        );

        dispatch(registerUserSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setfeedback({
            variant: "danger",
            message: message,
          })
        );

        dispatch(
          registerUserFail({
            message,
            flag: error.response.data.flag,
          })
        );
      });
  };
};

export const registerUserSuccess = (data) => {
  return {
    type: userTypes.REGISTER_USER_SUCCESS,
    payload: data,
  };
};

export const registerUserFail = (data) => {
  return {
    type: userTypes.REGISTER_USER_FAIL,
    payload: data,
  };
};

// Confirm user

export const confirmEmailRequested = () => {
  return {
    type: userTypes.CONFIRM_EMAIL_REQUEST,
  };
};

export const confirmEmail = (uuid) => {
  return (dispatch) => {
    dispatch(confirmEmailRequested());

    if (validator.isUUID(uuid)) {
      axios
        .put(URL_API + "/user/confirm", {
          uuid,
        })
        .then((response) => {
          let variant = "";

          switch (response.data.flag) {
            case "ALREADY_CONFIRMED":
              variant = "warning";
              break;

            case "CONFIRMED_SUCCESS":
              variant = "success";
              break;

            default:
              break;
          }

          dispatch(
            setfeedback({
              variant,
              message: response.data.message,
            })
          );

          dispatch(
            confirmEmailSuccess({
              message: response.data.message,
            })
          );
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch(
            setfeedback({
              variant: "danger",
              message: message,
            })
          );
          dispatch(confirmEmailFail(message));
        });
    } else {
      const message = "Please enter a valid confirmation number in the URL";

      dispatch(
        setfeedback({
          variant: "danger",
          message: message,
        })
      );

      dispatch(confirmEmailFail(message));
    }
  };
};

export const confirmEmailSuccess = (message) => {
  return {
    type: userTypes.CONFIRM_EMAIL_SUCCESS,
    payload: message,
  };
};

export const confirmEmailFail = (message) => {
  return {
    type: userTypes.CONFIRM_EMAIL_FAIL,
    payload: message,
  };
};

// Login user

export const loginRequested = () => {
  return {
    type: userTypes.LOGIN_REQUESTED,
  };
};

export const login = (formLogin) => {
  return (dispatch) => {
    dispatch(loginRequested());

    axios
      .post(URL_API + "/user/signin", {
        formLogin,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));

          dispatch({
            type: userTypes.LOGIN_SUCCESS,
            payload: { user: response.data },
          });

          dispatch(getDriverNewRidesRequests(response.data.id));
          dispatch(
            setToast({
              show: true,
              headerText: "Logged in",
              bodyText: `Welcome back ${response.data.firstName}`,
              variant: "success",
            })
          );
        } else {
          dispatch(
            setfeedback({
              variant: "danger",
              message: "There has been an error",
            })
          );
        }
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // If a flag is provided, if not default is "ERROR"
        const flag = (!!error.response && error.response.data.flag) || "ERROR";

        if (flag !== "NOT_CONFIRMED") {
          dispatch(
            setfeedback({
              variant: "danger",
              message,
            })
          );
        }

        dispatch({
          type: userTypes.LOGIN_FAIL,
          payload: {
            message,
            flag,
            userId: error.response.data.userId || null,
          },
        });
      });
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");

  dispatch({
    type: userTypes.LOGOUT,
  });

  dispatch(resetNotifications());
  dispatch(
    setToast({
      show: true,
      headerText: "Logged out",
      bodyText: "We hope to see you soon",
      variant: "warning",
    })
  );
};

// Handle sending email for a forgotten password

export const submitEmailForgotPasswordRequested = () => {
  return {
    type: userTypes.SEND_EMAIL_FORGOT_PASSWORD_REQUESTED,
  };
};

export const submitEmailForgotPassword = (formValue) => {
  return (dispatch) => {
    dispatch(submitEmailForgotPasswordRequested());

    axios
      .get(URL_API + "/user/send-email-forgot-password", {
        params: {
          email: formValue.email,
        },
      })
      .then((response) => {
        dispatch(submitEmailForgotPasswordSuccess(response.data));

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setfeedback({
            variant: "danger",
            message,
          })
        );

        dispatch(submitEmailForgotPasswordFail(error.response.data.message));
      });
  };
};

export const submitEmailForgotPasswordSuccess = (data) => {
  return {
    type: userTypes.SEND_EMAIL_FORGOT_PASSWORD_DATA,
    payload: data,
  };
};

export const submitEmailForgotPasswordFail = (error) => {
  return {
    type: userTypes.SEND_EMAIL_FORGOT_PASSWORD_ERROR,
    payload: error,
  };
};

// Handle resetting password

export const resetPasswordRequested = () => {
  return {
    type: userTypes.RESET_PASSWORD_REQUESTED,
  };
};

export const resetPassword = (formValues, uuid) => {
  return (dispatch) => {
    dispatch(resetPasswordRequested());

    if (formValues.password1 === formValues.password2) {
      axios
        .put(URL_API + "/user/reset-password", {
          password: formValues.password1,
          uuid,
        })
        .then((response) => {
          dispatch(resetPasswordSuccess(response.data));

          dispatch(
            setfeedback({
              variant: "success",
              message: response.data.message,
            })
          );
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch(
            setfeedback({
              variant: "danger",
              message,
            })
          );

          dispatch(resetPasswordFail(message));
        });
    } else {
      const message = "The passwords must match";

      dispatch(
        setfeedback({
          variant: "danger",
          message,
        })
      );

      dispatch(resetPasswordFail(message));
    }
  };
};

export const resetPasswordSuccess = (data) => {
  return {
    type: userTypes.RESET_PASSWORD_DATA,
    payload: data,
  };
};

export const resetPasswordFail = (error) => {
  return {
    type: userTypes.RESET_PASSWORD_ERROR,
    payload: error,
  };
};

// Resend confirmation link

export const resendConfirmationLinkRequested = () => {
  return {
    type: userTypes.RESEND_CONFIRMATION_LINK_REQUESTED,
  };
};

export const resendConfirmationLink = (userId) => {
  return (dispatch) => {
    dispatch(resendConfirmationLinkRequested());

    axios
      .post(URL_API + "/user/resend-confirmation-link", {
        userId,
      })
      .then((response) => {
        dispatch(resendConfirmationLinkSuccess(response.data));

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setfeedback({
            variant: "danger",
            message,
          })
        );

        dispatch(resendConfirmationLinkFail(message));
      });
  };
};

export const resendConfirmationLinkSuccess = (data) => {
  return {
    type: userTypes.RESEND_CONFIRMATION_LINK_DATA,
    payload: data,
  };
};

export const resendConfirmationLinkFail = (error) => {
  return {
    type: userTypes.RESEND_CONFIRMATION_LINK_ERROR,
    payload: error,
  };
};

// Get submissions for become a driver form

export const getSubmissionsBecomeDriverRequested = () => {
  return {
    type: userTypes.GET_SUBMISSIONS_BECOME_DRIVER_REQUESTED,
  };
};

export const getSubmissionsBecomeDriver = (userId) => {
  return (dispatch) => {
    dispatch(getSubmissionsBecomeDriverRequested());

    axios
      .get(URL_API + "/user/submissions-become-driver", {
        params: {
          userId,
        },
      })
      .then((response) => {
        dispatch(getSubmissionsBecomeDriverData(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getSubmissionsBecomeDriverFail(message));
      });
  };
};

export const getSubmissionsBecomeDriverData = (data) => {
  return {
    type: userTypes.GET_SUBMISSIONS_BECOME_DRIVER_DATA,
    payload: data,
  };
};

export const getSubmissionsBecomeDriverFail = (error) => {
  return {
    type: userTypes.GET_SUBMISSIONS_BECOME_DRIVER_ERROR,
    payload: error,
  };
};

// Submit form to become a driver

export const submitFormBecomeDriverRequested = () => {
  return {
    type: userTypes.SUBMIT_FORM_BECOME_DRIVER_REQUESTED,
  };
};

export const submitFormBecomeDriver = (userId) => {
  return (dispatch) => {
    dispatch(submitFormBecomeDriverRequested());

    axios
      .post(URL_API + "/user/submit-become-driver", {
        userId,
      })
      .then((response) => {
        dispatch(submitFormBecomeDriverSuccess(response.data));
        dispatch(getSubmissionsBecomeDriver(userId));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setToast({
            show: true,
            headerText: "A problem happened",
            bodyText: message,
            variant: "warning",
          })
        );

        dispatch(submitFormBecomeDriverFail(message));
      });
  };
};

export const submitFormBecomeDriverSuccess = (driver) => {
  return {
    type: userTypes.SUBMIT_FORM_BECOME_DRIVER_SUCCESS,
    payload: driver,
  };
};

export const submitFormBecomeDriverFail = (error) => {
  return {
    type: userTypes.SUBMIT_FORM_BECOME_DRIVER_ERROR,
    payload: error,
  };
};

// Submit form to become a driver

export const updateDriverStateRequested = () => {
  return {
    type: userTypes.UPDATE_DRIVER_STATE_REQUESTED,
  };
};

export const updateDriverState = (userId) => {
  return (dispatch) => {
    dispatch(updateDriverStateRequested());

    axios
      .get(URL_API + "/user/driver-state", {
        params: {
          userId,
        },
      })
      .then((response) => {
        if (response.data === "") {
          dispatch(updateDriverStateSuccess(null));
        } else {
          dispatch(updateDriverStateSuccess(response.data));
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(updateDriverStateFail(message));
      });
  };
};

export const updateDriverStateSuccess = (driver) => {
  return {
    type: userTypes.UPDATE_DRIVER_STATE_SUCCESS,
    payload: driver,
  };
};

export const updateDriverStateFail = (error) => {
  return {
    type: userTypes.UPDATE_DRIVER_STATE_ERROR,
    payload: error,
  };
};
