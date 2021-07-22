import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Redirect, useParams } from "react-router-dom";
import FeedbackMessage from "../../components/FeedbackMessage";

import { confirmEmail } from "../../redux";
import LoadingMessage from "../../components/LoadingMessage";

const SignUpConfirm = () => {
  const { confirmEmailUUID } = useParams();

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoadingConfirmEmail, confirmEmailError } = useSelector(
    (state) => state.email
  );

  useEffect(() => {
    dispatch(confirmEmail(confirmEmailUUID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle redirection in case the user is already logged in
  if (isLoggedIn) {
    return <Redirect to="/find-ride" />;
  }

  return (
    <Container data-aos="fade-in" data-aos-delay="2000">
      <Row className="py-5 text-center">
        <Col className="text-center">
          <div>
            <h1 className="display-4">Confirm your email address</h1>
            <p>
              You can now{" "}
              <Link to="/login" className="link-success">
                login here
              </Link>
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        {isLoadingConfirmEmail ? (
          <Col className="text-center">
            <LoadingMessage />
          </Col>
        ) : confirmEmailError ? (
          <Col>
            <p className="text-danger text-center">
              A problem occured while confirming your email address{" "}
            </p>
          </Col>
        ) : null}
      </Row>
      <FeedbackMessage />
    </Container>
  );
};

export default SignUpConfirm;
