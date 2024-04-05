import Modal from 'react-bootstrap/Modal';
import Success from "../assets/success.gif"

export function ScanModal(props) {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body style={{width: "100%", margin: "auto"}}>
            <img src={Success} style={{width: "350px"}} alt="" />
          </Modal.Body>
        </Modal>
      );
}