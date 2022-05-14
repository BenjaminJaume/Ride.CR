import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import GoBack from "../components/GoBack";

function ComingSoon(props) {
  return (
    <div>
      <GoBack />

      <Container>
        <Row>
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={6}
            xl={4}
            className="text-center mx-auto"
          >
            <h1 className="text-success">{props.pageName || "Coming soon"}</h1>
            <p className="lead">
              This page or feature will soon be available
              <br />
              Thank you for your understanding
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ComingSoon;
