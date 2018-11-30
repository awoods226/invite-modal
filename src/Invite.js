import { Icon, Grid } from "semantic-ui-react";
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
        columns={2}
        padded="vertically"
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Icon
              onClick={() => this.onFbClick()}
              name="facebook official"
              size="massive"
            />
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Icon
              onClick={() => this.onEmailClick()}
              name="mail"
              size="massive"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Invite;
