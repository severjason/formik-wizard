import React                                                                                 from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Form } from 'reactstrap';

class TabModal extends React.Component {

  state = {
    checked: false,
  };

  handleCheck = () => this.setState(({checked: !this.state.checked}), () => {
    if (this.state.checked) {
      this.props.handleInputChange(0);
    }
  });

  render() {
    const {opened, closeModal, inputValue, handleInputChange, handleItemDelete} = this.props;
    return (
      <Modal isOpen={opened} toggle={closeModal}>
        <ModalHeader>Manage reservation</ModalHeader>
        <ModalBody>
          <Form inline>
            <FormGroup>
              <Label>Actual guests:</Label>
              <Input
                type="number"
                min="0"
                max="12"
                value={inputValue}
                disabled={this.state.checked}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>No guests:</Label>
              <Input type="checkbox" onChange={this.handleCheck}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={inputValue < 0 && inputValue > 12}
            onClick={handleItemDelete}>Do Something
          </Button>
          {' '}
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default TabModal;