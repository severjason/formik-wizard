import React                                                                                 from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form } from 'reactstrap';

class TabModal extends React.Component {

  render() {
    const {opened, inputValue, handleInputChange, handleItemDelete, error, noGuests, handleCloseModalButton, handleCheck} = this.props;
    return (
      <Modal isOpen={opened} toggle={handleCloseModalButton}>
        <ModalHeader>Manage reservation</ModalHeader>
        <ModalBody>
          <Form inline>
            <FormGroup>
              <Label className="opacity-text extra-small-text">Actual guests:</Label>
              <Input
                type="number"
                min="0"
                max="12"
                value={inputValue}
                className="form-control project-input bg-white "
                disabled={noGuests}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </FormGroup>
            <FormGroup >
              <div className="input-checkbox">
                <span className="opacity-text extra-small-text">No guests:</span>
                <Input type="checkbox" id='no-guests' checked={noGuests} onChange={handleCheck}/>
                <Label htmlFor='no-guests'/>
              </div>
            </FormGroup>
          </Form>
          {error && <div className="modal-error-text">
            {error}
          </div>}
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary uppercase extra-small-text"
            disabled={inputValue === ''}
            onClick={() => {
              handleItemDelete();
              handleCloseModalButton()
            }}>Update
          </button>
          {' '}
          <a className="btn btn-secondary uppercase extra-small-text" rel="nofollow" onClick={handleCloseModalButton}>Cancel</a>
        </ModalFooter>
      </Modal>
    );
  }
}

export default TabModal;