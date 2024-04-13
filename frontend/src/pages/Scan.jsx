import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import styled from "styled-components";
import { ScanModal } from "../modals/ScanModal";

const QrReader = () => {
    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalDisplay, setModalDisplay] = useState("")
    const [scannedResult, setScannedResult] = useState("");
    const [found, setFound] = useState(true);
    const [couponsLeft, setCouponsLeft] = useState("");
    const [modalCouponsLeft, setModalCouponsLeft] = useState("");

    async function RedeemOne() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_KEY}/redeem-qr`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: scannedResult, count: "1"})
            })
            setCouponsLeft("");
            setScannedResult("");
            const data = await response.json();
            console.log(data);
            console.log(response.status);
            if(response.status === 200) {
                setModalDisplay("1");
                setModalShow(true);
                setModalCouponsLeft(data.couponsLeft);
                console.log("redeemed sucessfully");
            } else if(response.status === 401) {
                setModalDisplay("2");
                setModalShow(true);
                console.log("No Coupons Left");
            } else if(response.status === 404) {
                setModalDisplay("3");
                setModalShow(true);
                console.log("User didn't register");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function RedeemAll() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_KEY}/redeem-qr`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: scannedResult, count: couponsLeft})
            })
            setCouponsLeft("");
            setScannedResult("");
            const data = await response.json();
            if(response.status === 200) {
                setModalDisplay("1");
                setModalShow(true);
                console.log(data.couponsLeft)
                setModalCouponsLeft(data.couponsLeft);
                console.log("redeemed sucessfully");
            } else if(response.status === 401) {
                setModalDisplay("2");
                setModalShow(true);
                console.log("No Coupons Left");
            } else if(response.status === 404) {
                setModalDisplay("3");
                setModalShow(true);
                console.log("User didn't register");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function ScanQR(result) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_KEY}/scan-qr`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: result})
            })
            const data = await response.json();
            if(response.status === 200) {
                setCouponsLeft(data.couponsLeft);
            } else {
                setFound(false);
                console.log(data.msg);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const onScanSuccess = (result) => {
        setScannedResult((prevState) => {
            if (prevState !== result.data) {
                console.log(result.data);
                setFound(true);
                setCouponsLeft("");
                ScanQR(result.data);
                return result.data;
            } else {
                return prevState;
            }
        });
    };

    const onScanFail = (err) => {
        // console.log(err);
    };

    useEffect(() => {
        if (videoEl.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                maxScansPerSecond: 2,
                overlay: qrBoxEl.current || undefined,
            });

            scanner.current
                .start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        return () => {
            if (!videoEl.current) {
                scanner.current.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (!qrOn)
            alert(
                "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
            );
    }, [qrOn]);

    return (
        <QrReaderContainer>
            <h1>QR Code Scanner</h1>
            <div className="qr-reader">
                <video ref={videoEl} className="qr-video"></video>
                <div className="scanned-result">
                    {scannedResult && (
                        <p>{scannedResult}</p>
                    )}
                    {couponsLeft && (
                        <p>Coupons Left: {couponsLeft}</p>
                    )}
                    {found === false && (
                        <p>User Didn't Register</p>
                    )}
                </div>

            </div>
            <div className="buttons">
                <button className="one" onClick={() => RedeemOne()}>
                    Redeem One Coupon
                </button>
                <button className="all" onClick={() => RedeemAll()}>
                    Redeem All Coupon
                </button>
            </div>
            <ScanModal couponsleft={modalCouponsLeft} display={modalDisplay} show={modalShow} onHide={() => setModalShow(false)} />
        </QrReaderContainer>
    );
};

const QrReaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin: 2rem;
    .qr-reader {
        position: relative;
        max-width: 90vw;
    }

    .qr-video {
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
    }

    .scanned-result {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 999;
        color: white;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 0 5px;
        border-radius: 5px;
    }
    .buttons {
        display: flex;
        gap: 1rem;
        button {
            padding: 5px;
            border: none;
            color: white;
            border-radius: 5px;
        }
        .one {
            background-color: #198754;
        }
        .all {
            background-color: #0d6efd;
        }
    }
`;

export default QrReader;
