import { Modal, Button, Image } from "semantic-ui-react";
import Invite from "./Invite";
import React, { Component } from "react";
import EmailForm from "./EmailForm";
import headerImg from "./images/headerimg.jpg";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmail: false,
      modalOpen: false
    };
    this.props.trigger.addEventListener("click", () =>
      this.handleInviteClick()
    );
  }
  handleEmailClick = () => {
    this.setState({ showEmail: true });
  };
  handleEmailBackClick = () => {
    this.setState({ showEmail: false });
  };
  handleInviteClick = () => {
    this.toggleModal();
  };
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen, showEmail: false });
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
          <Modal.Header className={"modal-header"}>
            <Image src={headerImg} />
          </Modal.Header>
          <Modal.Content>
            {!showEmail && (
              <Invite onEmailClick={() => this.handleEmailClick()} />
            )}
            {showEmail && (
              <EmailForm
                onCancelClick={() => this.handleEmailBackClick()}
                onSubmit={() => this.toggleModal()}
              />
            )}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default App;
