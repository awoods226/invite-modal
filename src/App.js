import "../node_modules/semantic-ui-css/components/modal.min.css";
import "../node_modules/semantic-ui-css/components/dimmer.min.css";
import "../node_modules/semantic-ui-css/components/image.min.css";
import "../node_modules/semantic-ui-css/components/icon.min.css";
import { Modal, Image, Icon } from "semantic-ui-react";
import Invite from "./Invite";
import React, { Component } from "react";
import EmailForm from "./EmailForm";
const headerImg = require("./headerimg.jpg");
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmail: false,
      modalOpen: false,
      showEmailSent: false
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
  handleSubmit = () => {
    this.setState({ showEmailSent: true, showEmail: false });
    setTimeout(this.toggleModal, 1750);
  };
  handlePortalClose = () => {
    this.setState({ showEmailSent: false });
  };
  render() {
    const { showEmail, modalOpen, showEmailSent } = this.state;
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
            {!showEmail && !showEmailSent && (
              <Invite onEmailClick={() => this.handleEmailClick()} />
            )}
            {showEmail && (
              <EmailForm
                onCancelClick={() => this.handleEmailBackClick()}
                onSubmit={() => this.handleSubmit()}
              />
            )}
            {showEmailSent && (
              <div className={"email-confirm"}>
                <h2>Email Sent!</h2>
                <Icon
                  color={"green"}
                  name="check circle outline"
                  size="massive"
                />
              </div>
            )}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default App;
