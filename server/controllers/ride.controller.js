const db = require("../models");
const Rides = db.Rides;
const RideStatus = db.RideStatus;
const User = db.User;
const Bookings = db.Bookings;
const UsersBookings = db.users_bookings;
const BookingStatus = db.BookingStatus;

const Op = db.Sequelize.Op;

module.exports = {
  getUserRides(req, res) {
    return Rides.findAll({
      where: {
        DriverId: req.query.userId,
      },
      include: [
        {
          model: RideStatus,
          attributes: {
            exclude: ["RideStatusId"],
          },
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json("A problem occured with this request");
      });
  },

  addRide(req, res) {
    return Rides.create({
      DriverId: req.body.userId,
      cityOrigin: req.body.formValues.cityOrigin,
      provinceOrigin: req.body.formValues.provinceOrigin,
      cityDestination: req.body.formValues.cityDestination,
      provinceDestination: req.body.formValues.provinceDestination,
      dateTime: req.body.formValues.dateTime,
      seatsAvailable: req.body.formValues.seatsAvailable,
      seatsLeft: req.body.formValues.seatsAvailable,
      comment: req.body.formValues.comment,
    })

      .then((response) => {
        // console.log(response);
        res.status(201).send("You ride has been successfully added");
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).send("A problem occured with this request");
      });
  },

  getAllRides(req, res) {
    Rides.findAll({
      where: {
        seatsLeft: {
          [Op.gt]: 0,
        },
        dateTime: {
          [Op.gt]: new Date(),
        },
      },
      order: [["dateTime", "ASC"]],
      include: [
        {
          model: User,
          attributes: {
            exclude: [
              "email",
              "biography",
              "password",
              "phoneNumber",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json("A problem occured with this request");
      });
  },

  bookRide(req, res) {
    return Bookings.create({
      RideId: req.body.rideId,
      seatsBooked: req.body.formValues.seatsNeeded,
    })
      .then((response) => {
        UsersBookings.create(
          {
            UserId: req.body.userId,
            BookingId: response.id,
          },
          { fields: ["UserId", "BookingId"] }
        )
          .then((response) => {
            // console.log(response);
            res
              .status(201)
              .send("You booking has been submitted to the driver");
          })
          .catch((error) => {
            // console.log(error);
            res.status(400).send("A problem occured with this request");
          });
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).send("A problem occured with this request");
      });
  },

  getUserBookingRide(req, res) {
    console.log(req.query);
    UsersBookings.findAll({
      where: {
        UserId: req.query.userId,
      },
      include: [
        {
          model: Bookings,
          where: {
            RideId: req.query.rideId,
          },
          include: [
            {
              model: BookingStatus,
            },
          ],
        },
      ],
    })
      .then((response) => {
        // console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        // console.log(error);
        res.status(400).json("A problem occured with this request");
      });
  },

  getUserNewRidesRequests(req, res) {
    return Bookings.findAll({
      where: {
        BookingStatusId: 1,
      },
      include: [
        {
          model: Rides,
          //     attributes: {
          //       exclude: [
          //         "cityDestination",
          //         "cityOrigin",
          //         "comment",
          //         "createdAt",
          //         "dateTime",
          //         "provinceDestination",
          //         "provinceOrigin",
          //         "seatsAvailable",
          //         "seatsLeft",
          //         "updatedAt",
          //         "RideStatusId",
          //       ],
          //     },
          //     include: [
          //       {
          //         model: User,
          //         attributes: {
          //           exclude: [
          //             "firstName",
          //             "lastName",
          //             "username",
          //             "email",
          //             "biography",
          //             "password",
          //             "phoneNumber",
          //             "createdAt",
          //             "updatedAt",
          //           ],
          //         },
          //       },
          //     ],
        },
      ],
    })
      .then((response) => {
        console.log(response);
        res.status(200).json(response);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json("A problem occured with this request");
      });
  },
};
