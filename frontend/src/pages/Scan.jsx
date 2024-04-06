import React, { useState } from "react";
import styled from "styled-components";
import { QrReader } from "react-qr-reader";
import { ScanModal } from "../modals/ScanModal";

const QRscanner = React.forwardRef((props, ref) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalDisplay, setModalDisplay] = useState("")
    const [scanResult, setScanResult] = useState({
        data: "",
        error: null,
    });

    async function validateQR() {
        try {
            if (scanResult.data === "") {
                console.log("No QR code scanned.");
                return;
            }
            setScanResult({ data: "", error: "null" })
            const response = await fetch(
                `https://event-qr.onrender.com/scan-qr/${scanResult.data}`,
                {
                    method: "POST",
                }
            );
            if (response.status === 200) {
                setModalDisplay("1");
                setModalShow(true);
                console.log("Scanned Successfully");
            } else if (response.status === 404) {
                setModalDisplay("2");
                setModalShow(true);
                console.log("User didn't register");
            } else if (response.status === 401) {
                setModalDisplay("3");
                setModalShow(true);
                console.log("Already Scanned");
            }
            setScanResult({ data: "", error: null });
        } catch (error) {
            console.error("Error validating QR code:", error);
        }
    }

    const handleScan = (data) => {
        if (data) {
            setScanResult({ data, error: null });
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <Container>
            <h1>QR Scanner</h1>
            <div className="scanner">
                <QrReader
                    ref={ref}
                    onResult={handleScan}
                    delay={300}
                    constraints={{
                        facingMode: 'environment',
                        aspectRatio: { ideal: 1 },
                    }}
                    style={{ width: "100%" }}
                />
            </div>
            {scanResult.data ? (
                <h6>{scanResult.data.text}</h6>
            ) : (
                <h6>Scan a QR Code</h6>
            )}
            <div className="buttons">
                <button className="validate" onClick={validateQR}>
                    Validate QR
                </button>
            </div>
            <ScanModal display={modalDisplay} show={modalShow} onHide={() => setModalShow(false)} />
        </Container>
    );
});

export default QRscanner;

const Container = styled.div`
    margin: 2rem 0;
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    .scanner {
        margin: 0.75rem auto;
        width: 100vw;
        max-width: 350px !important;
        border: 2px black solid;
        border-radius: 10px
    }
    h6 {
        margin: 0.75rem 0;
        font-size: 1.5rem;
    }
    .buttons {
        button {
            cursor: pointer;
            padding: 10px;
            color: white;
            background-color: #3b71ca;
            border-radius: 5px;
            border: none;
            font-size: 1.1rem;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #1f4a8e;
        }
    }
`;
