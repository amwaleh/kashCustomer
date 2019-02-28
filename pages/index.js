import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Message, Grid, Header, Button } from "semantic-ui-react";
import { createUser, loginUser } from "../utils/handler";
import AuthService from '../utils/AuthService'

import "./styles.css";

const auth = new AuthService()

export default class Page extends Component {
  state = {
    data: {},
    message: "",
    error: "",
    visible: false,
    showSignUp: false
  };
  componentDidMount() {

    if (auth.loggedIn()) {
      this.props.url.replaceTo('/home')
    }
  }
  handleChange = e => {
    const { value, name } = e.target;
    this.setState(prevState => {
      return {
        data: {
          ...prevState.data,
          [name]: value
        }
      };
    });
  };

  handleSubmit = () => {
    if (this.state.showSignUp) {
      createUser(this.state.data)
        .then(response => {
          this.setState({ message: "user created", visible: true });
        })
        .catch(e => {
          this.setState({ error: e.message, visible: true });
        });

      setTimeout(() => {
        this.setState({ visible: false });
      }, 2000);
    } else {

      auth.login(this.state.data)
    }
  };

  handleDismiss = () => {
    this.setState({ visible: false });
  };
  toggleForm = () => {
    this.setState({ showSignUp: !this.state.showSignUp });
  };
  render() {
    const { error, message, visible, showSignUp } = this.state;

    return (
      <Grid as={"container"} className="centered" padded="vertically">
      <div>
        {visible && (
          <Message
            header={error ? "Error" : "Info"}
            content={error || message}
            color={error ? "red" : "green"}
          />
        )}
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Header as="h3" color="teal">
            {showSignUp ? "Sign Up " : "Login"}
          </Header>
          <Form.Input
            name="username"
            onChange={this.handleChange}
            type="text"
            placeholder="username"
            required
          />
          <Form.Input
            name="password"
            onChange={this.handleChange}
            type="password"
            placeholder="password"
            required
          />

          <Button
            type="submit"
            content={showSignUp ? "sign up " : "Login"}
            color={ showSignUp ? "blue " : "green" }
          />

          <Form.Button
            type="button"
            basic
            content={showSignUp ? "click to login" : "click to sign Up"}
            onClick={this.toggleForm}
            className='toogleButton'

          />

        </Form>
      </Grid>
    );
  }
}
