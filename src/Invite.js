import { Icon, Grid, Header, Label, GridColumn } from "semantic-ui-react";
import React, { Component } from "react";

/*global FB*/
class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmail: false
    };
  }
  onFbClick = () => {
    FB.ui(
      {
        method: "share",
        href: window.location.href
      },
      function(response) {}
    );
  };
  onEmailClick = () => {
    this.props.onEmailClick();
  };
  render() {
    return (
      <Grid
        textAlign="center"
        container
        centered
        columns={1}
        padded="vertically"
      >
        <Grid.Row>
          <Grid.Column textAlign={"center"}>
            <Header size="medium">Invite a friend</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className={"fb-label"} onClick={() => this.onFbClick()}>
              <Icon name="facebook f" size="large" />
              Invite on Facebook
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div className={"email-label"} onClick={() => this.onEmailClick()}>
              <Icon name="mail" size="large" />
              Invite via Email
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Invite;
