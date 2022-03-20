import React from 'react'
import { Modal } from 'react-bootstrap'

const SendModal = ({show, handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>Withdraw</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form action="">
            <div class="mb-3">
                <label htmlFor="amount" class="form-label">Amount</label>
                <input type="number" class="form-control" id="amount" placeholder="1000" />
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary">Proceed</button>
            </div>
        </form>
    </Modal.Body>
</Modal>
  )
}

export default SendModal