import React from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import {
    Facebook,
    Whatsapp,
} from "react-bootstrap-icons";


function ShareRide() {
    const {
        rideData,
    } = useSelector((state) => state.ride);

    // URL encoding function
    function urlEncodeString(str) {
        return encodeURIComponent(str);
    }

    const encodedTitle = urlEncodeString(`Tucana Ride from ${rideData.ride.origin.placeName} to ${rideData.ride.destination.placeName}`);
    const encodedUrl = urlEncodeString(`https://tucana.app/ride/${rideData.ride.id}`);

    return (
        <>
            {rideData.ride ? (
                <Row>
                    <Col>
                        <a
                            href={`whatsapp://send?text=https://tucana.app/ride/${rideData.ride.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hvr-grow text-dark me-3"
                        >
                            <Whatsapp className="mb-1" size="24" />
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?text=${encodedTitle}&u=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hvr-grow text-dark me-3"
                        >
                            <Facebook className="mb-1" size="24" />
                        </a>
                    </Col>
                </Row>
            ) : null}
        </>
    )
}

export default ShareRide;