import React, { useState } from "react";
import styled from "styled-components";
import { QrReader } from "react-qr-reader";
import { ScanModal } from "../modals/ScanModal";

const QRscanner = React.forwardRef((props, ref) => {
    const [modalShow, setModalShow] = useState(false);
    const [scanResult, setScanResult] = useState({
        data: "",
        error: null,
    });

    const validateQR = async () => {
        try {
            if (scanResult.data === "") {
                console.log("No QR code scanned.");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/scan-qr/${scanResult.data}`,
                {
                    method: "POST",
                }
            );
            const data = await response.json();

            if (response.status === 200) {
                setModalShow(true);
                console.log("Scanned Successfully");
            } else if (response.status === 404) {
                console.log("User didn't register");
            } else {
                console.log("Already Scanned");
            }
        } catch (error) {
            console.error("Error validating QR code:", error);
        }
    };

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
                    onError={handleError}
                    delay={300}
                    constraints={{
                        facingMode: 'environment'
                    }}
                    style={{ width: "100%" }}
                />
            </div>
            {scanResult.error ? (
                <ScanStatus>QR Code not detected</ScanStatus>
            ) : scanResult.data ? (
                <ScanStatus>{scanResult.data}</ScanStatus>
            ) : (
                <ScanStatus>Scan a QR Code</ScanStatus>
            )}
            <div className="buttons">
                <button className="validate" onClick={validateQR}>
                    Validate QR
                </button>
            </div>
            <ScanModal show={modalShow} onHide={() => setModalShow(false)} />
        </Container>
    );
});

export default QRscanner;

const Container = styled.div`
    margin: 2rem auto;
    text-align: center;
    max-width: 300px;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5;
    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    .scanner {
        margin-bottom: 1rem;
    }
    .buttons {
        display: flex;
        justify-content: center;
        button {
            cursor: pointer;
            padding: 10px 20px;
            color: white;
            background-color: #3b71ca;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #1f4a8e;
        }
    }
`;

const ScanStatus = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;
