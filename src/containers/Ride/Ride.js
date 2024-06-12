import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ChevronRightIcon,
  AlertIcon,
  XIcon,
  PencilIcon,
} from "@primer/octicons-react";

import ManageDriverBooking from "../../components/ManageDriverBooking";
import ManagePassengerBooking from "../../components/ManagePassengerBooking";
import LoadingSpinner from "../../components/LoadingSpinner";

import PassengersDetails from "../../components/PassengersDetails";
import GoBack from "../../components/GoBack";
import SendMessageButton from "../../components/SendMessageButton";
import DisplayRating from "../../components/DisplayRating";

import ShareRide from "../../components/ShareRide"

import { isDateInPast } from "../../helpers";

import {
  getRide,
  getUserBookingsRide,
  ridesToConfirm,
  displayNavBar,
  resetCancelRide,
} from "../../redux";

import car from "../../assets/images/car.png";
import RideDetails from "../../components/RideDetails";

const Ride = () => {
  const { t } = useTranslation();
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const { user: currentUser, isLoggedIn } = useSelector((state) => state.user);
  const { srcAvatar } = useSelector((state) => state.global);
  const {
    isLoadingRide,
    rideData,
    rideError,
    isloadingUserRideBookings,
    userRideBookingsData,
    cancelRideSuccess,
  } = useSelector((state) => state.ride);

  useEffect(() => {
    dispatch(getRide(rideId));
    if (isLoggedIn) {
      dispatch(ridesToConfirm(currentUser.id));
      dispatch(getUserBookingsRide(currentUser.id, rideId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If ride canceled successfully
  if (cancelRideSuccess.flag === "SUCCESS") {
    dispatch(resetCancelRide());
  }

  return (
    <div className="pb-3">
      <span onClick={() => dispatch(displayNavBar(true))}>
        <GoBack />
      </span>

      {rideData.ride &&
        !isDateInPast(new Date(rideData.ride.dateTimeOrigin), new Date()) &&
        rideData.ride.seatsLeft > 0 ? (
        isLoggedIn ? (
          currentUser.Driver &&
            currentUser.Driver.id === rideData.ride.Driver.id ? null : (
            <div className="book-button">
              <Link to={`/book/${rideData.ride.id}`}>
                <Button variant="success" size="lg">
                  {t("translation:global.bookThisRide")}
                </Button>
              </Link>
              {!isloadingUserRideBookings && userRideBookingsData.length > 0 ? (
                <p className="smaller text-center text-warning mb-0">
                  <AlertIcon size={24} className="me-2" />
                  {t("translation:global.alreadyBooking")}
                </p>
              ) : null}
            </div>
          )
        ) : null
      ) : null}

      <Container className="mb-5">
        {isLoadingRide ? (
          <Row>
            <Col className="text-center">
              <LoadingSpinner />
            </Col>
          </Row>
        ) : rideData.ride ? (
          <div data-aos="fade-in">
            <Row>
              <Col>
                <h1 className="title text-center">
                  {t("translation:ride.title")}
                </h1>
              </Col>
            </Row>

            <RideDetails ride={rideData.ride} />

            {/* Display past booking for this ride by this user */}
            {isLoggedIn &&
              currentUser.Driver &&
              rideData.ride.DriverId === currentUser.Driver.id ? (
              <>
                <Row className="mb-3 mx-1 mx-sm-0">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    xl={4}
                    className="container-box"
                  >
                    <Container className="py-3 px-2">
                      <Row>
                        <Col>
                          <p className="fw-bold">
                            {t("translation:ride.manageBookingRequests")}
                          </p>
                        </Col>
                      </Row>

                      <ManageDriverBooking rideId={rideId} />
                    </Container>
                  </Col>
                </Row>

                {!isDateInPast(
                  new Date(rideData.ride.dateTimeOrigin),
                  new Date()
                ) &&
                  rideData.ride.seatsLeft === 0 &&
                  rideData.ride.RideStatusId < 4 ? (
                  <Row className="mb-4 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      xl={4}
                      className="border border-success border-2 shadow rounded-5 mx-auto"
                    >
                      <Container fluid className="p-2">
                        <Row>
                          <Col className="text-center">
                            <h1 className="text-success fw-light mb-0">
                              {t("translation:global.congratulations")}
                            </h1>
                            <p className="fw-light mb-0">
                              {t("translation:ride.allSeatsBooked")}
                            </p>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                ) : null}

                <Row className="mb-2 mx-1 mx-sm-0">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    xl={4}
                    className="container-box"
                  >
                    <Container className="py-3 px-2">
                      <Row>
                        <Col>
                          <p className="fw-bold mb-0">
                            {t("translation:global.passengerDetails")}
                          </p>
                        </Col>
                      </Row>

                      <PassengersDetails rideId={rideId} />
                    </Container>
                  </Col>
                </Row>

                {!isDateInPast(
                  new Date(rideData.ride.dateTimeOrigin),
                  new Date()
                ) && rideData.ride.RideStatusId < 4 ? (
                  <Row className="mb-2 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      xl={4}
                      className="mx-auto"
                    >
                      <Container className="py-3 px-2">
                        <Row>
                          <Col xs={6} className="text-end ps-0">
                            <LinkContainer to={`/ride/${rideId}/edit`}>
                              <Button
                                variant="outline-primary"
                                className="w-100"
                                onClick={() => dispatch(displayNavBar(true))}
                              >
                                <PencilIcon
                                  size={18}
                                  verticalAlign="middle"
                                  className="mb-1"
                                />{" "}
                                <small>{t("translation:ride.editRide")}</small>
                              </Button>
                            </LinkContainer>
                          </Col>

                          <Col xs={6} className="text-start pe-0">
                            <LinkContainer to={`/ride/${rideId}/cancel`}>
                              <Button
                                variant="outline-danger"
                                className="w-100"
                                onClick={() => dispatch(displayNavBar(true))}
                              >
                                <XIcon
                                  size={18}
                                  verticalAlign="middle"
                                  className="mb-1"
                                />{" "}
                                <small>
                                  {t("translation:ride.cancelRide")}
                                </small>
                              </Button>
                            </LinkContainer>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                ) : null}
              </>
            ) : (
              <>
                {!isLoggedIn ? (
                  <div className="mb-4">
                    <Row>
                      <Col
                        xs={12}
                        sm={10}
                        md={8}
                        lg={6}
                        xl={4}
                        className="text-center mx-auto"
                      >
                        <p className="fw-bold">
                          {t("translation:ride.logBefore")}
                        </p>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col
                        xs={12}
                        sm={10}
                        md={8}
                        lg={6}
                        xl={4}
                        className="text-center mx-auto"
                      >
                        <LinkContainer to="/login">
                          <Button
                            variant="success"
                            size="lg"
                            className="py-2 w-100"
                            onClick={() => dispatch(displayNavBar(true))}
                          >
                            <span> {t("translation:global.logIn")}</span>
                          </Button>
                        </LinkContainer>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        xs={12}
                        sm={10}
                        md={8}
                        lg={6}
                        xl={4}
                        className="text-center mx-auto"
                      >
                        <LinkContainer to="/signup">
                          <Button
                            variant="outline-success"
                            size="lg"
                            className="py-2 w-100"
                            onClick={() => dispatch(displayNavBar(true))}
                          >
                            {t("translation:global.signUp")}
                          </Button>
                        </LinkContainer>
                      </Col>
                    </Row>
                  </div>
                ) : null}
                <Row className="mb-3 mx-1 mx-sm-0">
                  <Col
                    xs={12}
                    sm={10}
                    md={8}
                    lg={6}
                    xl={4}
                    className="container-box"
                  >
                    <Container className="py-3 px-2">
                      <LinkContainer
                        to={`/profile/${rideData.ride.Driver.User.username}`}
                        className="cursor-pointer"
                      >
                        <Row className="align-items-center">
                          <Col xs={3} md={2} className="pe-0">
                            <img
                              src={srcAvatar(rideData.ride.Driver.User)}
                              alt="Avatar"
                              className="img-fluid cursor-pointer avatar-img-sm mx-2"
                              width="50px"
                            />
                          </Col>
                          <Col xs={6} className="text-start ps-0 ps-md-2">
                            <p className="mb-0">
                              {rideData.ride.Driver.User.firstName}
                            </p>
                            <DisplayRating
                              rating={rideData.ride.Driver.User.Rating}
                              type="driver"
                            />
                          </Col>
                          <Col className="text-end">
                            <ChevronRightIcon
                              size={24}
                              verticalAlign="middle"
                            />
                          </Col>
                        </Row>
                      </LinkContainer>
                      <hr />
                      <Row>
                        <Col>
                          <SendMessageButton
                            type="link"
                            driverId={rideData.ride.DriverId}
                            user={currentUser}
                            receiverName={rideData.ride.Driver.User.firstName}
                            rideId={rideData.ride.id}
                          />
                          <hr />
                        </Col>
                      </Row>
                      <Row className="align-items-center my-0 py-0">
                        <Col xs={3} md={2} className="text-center pe-0">
                          <img src={car} alt="" height={30} />
                        </Col>
                        <Col>
                          <p className="mb-0">
                            {rideData.ride.Driver.Car.maker}{" "}
                            {rideData.ride.Driver.Car.model}
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>

                {!isloadingUserRideBookings &&
                  userRideBookingsData.length > 0 ? (
                  <Row className="mb-3 mx-1 mx-sm-0">
                    <Col
                      xs={12}
                      sm={10}
                      md={8}
                      lg={6}
                      xl={4}
                      className="container-box"
                    >
                      <Container className="py-3 px-2">
                        <Row>
                          <Col>
                            <p className="lead">
                              {t("translation:global.bookings")}
                            </p>
                          </Col>
                        </Row>

                        <ManagePassengerBooking rideId={rideId} />
                      </Container>
                    </Col>
                  </Row>
                ) : null}
                <Row>
                  <Col xs={12} sm={10} md={8} lg={6} xl={4} className="p-0 mx-auto">
                    <div className="text-center">
                    <Row>
                        <Col>
                          <p className="lead">
                            Share Ride
                          </p>
                        </Col>
                      </Row>
                      <ShareRide />
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </div>
        ) : rideError ? (
          <Redirect to="/" />
        ) : null}
      </Container>
    </div>
  );
};

export default Ride;
