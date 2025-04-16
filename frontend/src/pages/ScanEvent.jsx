import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import QrScanner from "qr-scanner";
import { ScanModal } from "../modals/ScanModal";

const QrReader = () => {
	const { eventId } = useParams();
	const scanner = useRef();
	const videoEl = useRef(null);
	const qrBoxEl = useRef(null);
	const [qrOn, setQrOn] = useState(true);
	const [modalShow, setModalShow] = useState(false);
	const [modalDisplay, setModalDisplay] = useState("");
	const [scannedResult, setScannedResult] = useState("");
	const [found, setFound] = useState(true);
	const [couponsLeft, setCouponsLeft] = useState("");
	const [name, setName] = useState("");
	const [modalCouponsLeft, setModalCouponsLeft] = useState("");
	const [excelRow, setExcelRow] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [eventDetails, setEventDetails] = useState(null); // Store event details
	const [isRedeeming, setIsRedeeming] = useState(false); // Track redeeming state

	async function RedeemOne() {
		if (!scannedResult) {
			alert("No QR code scanned yet!");
			return;
		}
		setIsRedeeming(true); // Set redeeming state
		setIsLoading(true);
		try {
			const token = localStorage.getItem("token"); // Include Bearer token
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/event/qr/redeem`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Add Authorization header
				},
				body: JSON.stringify({ id: scannedResult, count: "1", eventId: eventId }) // Include eventId in the body
			});
			setCouponsLeft("");
			setScannedResult("");
			const data = await response.json();
			console.log(data);
			console.log(response.status);
			if (response.status === 200) {
				setModalDisplay("1");
				setModalShow(true);
				setModalCouponsLeft(data.couponsLeft);
				console.log("redeemed successfully");
			} else if (response.status === 401) {
				setModalDisplay("2");
				setModalShow(true);
				console.log("No Coupons Left");
			} else if (response.status === 404) {
				setModalDisplay("3");
				setModalShow(true);
				console.log("User didn't register");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			setIsRedeeming(false); // Reset redeeming state
		}
	}

	async function RedeemAll() {
		if (!scannedResult) {
			alert("No QR code scanned yet!");
			return;
		}
		setIsRedeeming(true); // Set redeeming state
		setIsLoading(true);
		try {
			const token = localStorage.getItem("token"); // Include Bearer token
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/event/qr/redeem`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Add Authorization header
				},
				body: JSON.stringify({ id: scannedResult, count: couponsLeft, eventId: eventId }) // Include eventId in the body
			});
			setCouponsLeft("");
			setScannedResult("");
			setName("");
			const data = await response.json();
			if (response.status === 200) {
				setModalDisplay("1");
				setModalShow(true);
				console.log(data.couponsLeft);
				setModalCouponsLeft(data.couponsLeft);
				console.log("redeemed successfully");
			} else if (response.status === 401) {
				setModalDisplay("2");
				setModalShow(true);
				console.log("No Coupons Left");
			} else if (response.status === 404) {
				setModalDisplay("3");
				setModalShow(true);
				console.log("User didn't register");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			setIsRedeeming(false); // Reset redeeming state
		}
	}

	async function ScanQR(result) {
		if (!result) {
			console.error("Scanned QR code is empty. Skipping request.");
			return;
		}
		try {
			console.log("Scanning QR Code:", result);
			console.log("Event ID:", eventId); // Debugging log
			const token = localStorage.getItem("token"); // Include Bearer token
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/event/qr/scan`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Add Authorization header
				},
				body: JSON.stringify({ id: result, eventId: eventId }) // Include eventId in the body
			});
			const data = await response.json();
			if (response.status === 200) {
				setCouponsLeft(data.couponsLeft);
				setName(data.name);
				setExcelRow(data?.excelRow);
				console.log(data.name);
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
				overlay: qrBoxEl.current || undefined
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

	useEffect(() => {
		// Fetch event details when on the route
		const fetchEventDetails = async () => {
			const token = localStorage.getItem("token");
			useEffect(() => {
				if (!eventDetails) {
					console.log("Waiting for event details to be fetched...");
				}
			}, [eventDetails]);
			if (!eventId) {
				console.error("eventId is missing from route parameters.");
				return;
			}

			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/${eventId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || "Failed to fetch event details.");
				}

				const data = await response.json();
				console.log("Fetched event details:", data); // Debugging log
				setEventDetails(data); // Store event details
			} catch (err) {
				console.error("Error fetching event details:", err.message);
			}
		};

		fetchEventDetails();
	}, [eventId]); // Run when eventId changes

	useEffect(() => {
		if (!eventDetails) {
			console.log("Waiting for event details to be fetched...");
		}
	}, [eventDetails]);

	return (
		<div className="flex flex-col items-center gap-8 p-8">
			<h1 className="text-2xl font-bold">{eventDetails?.name || "QR Code Scanner"}</h1>
			<div className="relative max-w-full">
				<video ref={videoEl} className="rounded-lg w-full h-auto border border-gray-300"></video>
				<div className="absolute top-2 left-2 z-10 text-white bg-black px-2 py-1 rounded">
					{scannedResult && <p>{scannedResult}</p>}
					{couponsLeft && (
						<>
							<p>Name: {name}</p>
							<p>Coupons Left: {couponsLeft}</p>
							<p>Excel Row: {excelRow}</p>
						</>
					)}
					{found === false && <p>User Didn't Register</p>}
				</div>
			</div>
			<div className="flex gap-4">
				<button
					onClick={RedeemOne}
					className={`bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${isRedeeming ? "opacity-75 cursor-not-allowed" : ""}`}
					disabled={isRedeeming}
				>
					{isRedeeming ? "Redeeming One..." : "Redeem One Coupon"}
				</button>
				<button
					onClick={RedeemAll}
					className={`bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isRedeeming ? "opacity-75 cursor-not-allowed" : ""}`}
					disabled={isRedeeming}
				>
					{isRedeeming ? "Redeeming All..." : "Redeem All Coupons"}
				</button>
			</div>
			<ScanModal
				couponsleft={modalCouponsLeft}
				display={modalDisplay}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</div>
	);
};

export default QrReader;
