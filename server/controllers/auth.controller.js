const db = require("../models");
const config = require("../config/auth.config");
const emailController = require("./email.controller");
const templates = require("./EmailTemplates/signup");
const validator = require("validator");
const User = db.User;
const Driver = db.Driver;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");

module.exports = {
  signup(req, res) {
    const { firstName, lastName, email, password, username, phoneNumber } =
      req.body.formSignupUser;

    const confirmEmailUUID = uuidv4();

    User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      username: username.toLowerCase(),
      password: bcrypt.hashSync(password, 8),
      emailConfirmed: false,
      phoneConfirmed: false,
      confirmEmailUUID,
    })
      .then((user) => {
        // console.log(user);

        emailController.sendEmailSignup(
          user,
          templates.confirmSignup(confirmEmailUUID)
        );

        return res.status(201).send({ message: "Sign up successful" });
      })
      .catch((error) => {
        // console.log(error);
        return res.status(500).send({ message: error.message });
      });
  },

  confirmEmail(req, res) {
    // Check if the UUID provided over the put call is valid
    if (validator.isUUID(req.body.confirmEmailUUID)) {
      // Check first if the email has already been confirmed
      User.findOne({
        where: {
          confirmEmailUUID: req.body.confirmEmailUUID,
        },
      })
        .then((user) => {
          if (!user) {
            // User does not exist anymore
            return res
              .status(400)
              .json({ message: "This confirmation link is deprecated" });
          }

          if (!user.emailConfirmed) {
            // Email not confirmed yet
            User.update(
              {
                emailConfirmed: true,
              },
              {
                where: {
                  confirmEmailUUID: req.body.confirmEmailUUID,
                },
              }
            )
              .then((response) => {
                // console.log(response);

                return res.status(200).json({
                  flag: "CONFIRMED_SUCCESS",
                  message: "You're email address has been confirmed",
                });
              })
              .catch((error) => {
                // console.log(error);
                return res.status(400).json({
                  flag: "FAIL_UPDATE_CONFIRM",
                  message: "We couldn't confirm your email address",
                });
              });
          } else {
            // Email has already been confirmed
            return res.status(200).json({
              flag: "ALREADY_CONFIRMED",
              message: "Your email address has already been confirmed",
            });
          }
        })
        .catch((error) => {
          // console.log(error);
          return res.status(400).json({
            flag: "FAIL_FIND_UUID",
            message: "We couldn't confirm your email address",
          });
        });
    } else {
      return res.status(401).json({
        flag: "UNAUTHORIZED",
        message: "How did you do this API call?",
      });
    }
  },

  signin(req, res) {
    User.findOne({
      where: {
        [Op.or]: {
          username: req.body.formLogin.credential,
          username: req.body.formLogin.credential.toLowerCase(),
          email: req.body.formLogin.credential,
          email: req.body.formLogin.credential.toLowerCase(),
        },
      },
      include: [
        {
          model: Driver,
          attributes: {
            exclude: ["UserId", "createdAt", "updatedAt"],
          },
        },
      ],
    })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .send({ message: "User Not found", flag: "GENERAL_ERROR" });
        }

        if (user.emailConfirmed) {
          var passwordIsValid = bcrypt.compareSync(
            req.body.formLogin.password,
            user.password
          );

          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password",
            });
          }

          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 604800, // 7 days
          });

          res.status(200).send({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            biography: user.biography,
            phoneNumber: user.phoneNumber,
            createdAt: user.createdAt,
            emailConfirmed: user.emailConfirmed,
            phoneConfirmed: user.phoneConfirmed,
            accessToken: token,
            Driver: user.Driver,
          });
        } else {
          // User hasn't confirmed the email yet
          return res.status(400).json({
            message: "Email not confirmed yet",
            flag: "NOT_CONFIRMED",
          });
        }
      })
      .catch((error) => {
        // console.log(error);
        res.status(500).send({
          message: "It looks like we can't log you in now",
          flag: "GENERAL_ERROR",
        });
      });
  },
};
