import { Modal, Button } from "semantic-ui-react";
import Invite from "./Invite";
import React, { Component } from "react";
import EmailForm from "./EmailForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmail: false,
      modalOpen: false
    };
    console.log("inside app constructor");
    console.log(this.props.trigger);
    this.props.trigger.addEventListener("click", () =>
      this.handleInviteClick()
    );
  }
  handleEmailClick = () => {
    this.setState({ showEmail: true });
  };
  handleInviteClick = () => {
    //this.setState({ modalOpen: true });
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  render() {
    const { showEmail, modalOpen } = this.state;
    return (
      <div className="App">
        <Modal
          open={modalOpen}
          onClose={() => this.toggleModal()}
          closeOnDimmerClick={false}
          size={"tiny"}
          closeIcon
        >
          <Modal.Header>Invite a Friend</Modal.Header>
          <Modal.Content>
            {!showEmail && (
              <Invite onEmailClick={() => this.handleEmailClick()} />
            )}
            {showEmail && <EmailForm />}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default App;
