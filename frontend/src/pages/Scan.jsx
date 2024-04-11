import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import QrFrame from "./../assets/qr-frame.svg";
import styled from "styled-components";

const QrReader = () => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");

  const onScanSuccess = (result) => {
    console.log(result);
    setScannedResult(result?.data);
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
      <div className="qr-reader">
        <video ref={videoEl} className="qr-video"></video>
        {scannedResult && (
          <p className="scanned-result">
            Scanned Result: {scannedResult}
          </p>
        )}
      </div>
      <div className="buttons">
        <button onClick={() => RedeemOne()}>Redeem One Coupon</button>
        <button onClick={() => RedeemAll()}>Redeem All Coupon</button>
      </div>
    </QrReaderContainer>
  );
};

const QrReaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .qr-reader {
    position: relative;
    width: 90vw;
    height: 400px;
    max-width: 400px;
  }

  .qr-video {
    width: 100%;
    border: 1px solid #ccc;
  }

  .scanned-result {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 999;
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px;
    border-radius: 5px;
  }
`;

export default QrReader;
