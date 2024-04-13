import Modal from "react-bootstrap/Modal";
import Success from "../assets/success.gif";
import Scanned from "../assets/already_scanned.gif";
import NotFound from "../assets/not_found.gif";

export function ScanModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body style={{ width: "100%", margin: "auto" }}>
                {props.display === "1" ? (
                    <>
                        <h3 style={{textAlign: "center"}}>CouponsLeft: {props.couponsleft}</h3>
                        <img src={Success} style={{ width: "350px" }} alt="" />
                    </>
                ) : props.display === "2" ? (
                  <>
                    <h3 style={{textAlign: "center"}}>All coupons Redeemed</h3>
                    <img src={Scanned} style={{ width: "350px" }} alt="" />
                  </>
                ) : (
                    <>
                    <h3 style={{textAlign: "center"}}>User didn't register</h3>
                    <img src={NotFound} style={{ width: "350px" }} alt="" />
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
}
