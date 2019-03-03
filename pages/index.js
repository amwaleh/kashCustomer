import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Message, Grid, Header, Button, Container } from "semantic-ui-react";
import { createUser} from "../utils/handler";
import AuthService from "../utils/AuthService";

import "./styles.css";

const auth = new AuthService("http://localhost:3000");

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
      console.log(this.props.url);
      window.location = "/home";
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
        .then(async response => {
          if (response.status != 201) {
            const result = await response.json();
            console.log(result);
            this.setState({ error: JSON.stringify(result), visible: true });
          } else {
            this.setState({ message: "user created", visible: true });
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      auth
        .login(this.state.data)
        .then(data => {
          window.location = "/home";
        })
        .catch(e => {
          this.setState({ error: JSON.stringify(e), visible: true });
        });
    }
    setTimeout(() => {
      this.setState({ visible: false });
    }, 5000);
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
      <Grid as={Container} className="centered loginBg" padded="vertically">
        <div className="ErrotMsg">
          {visible && (
            <Message
              header={error ? "Error" : "Info"}
              content={error || message}
              color={error ? "red" : "green"}
            />
          )}
        </div>
        <Form onSubmit={this.handleSubmit} className="formLogin">
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
            color={showSignUp ? "blue " : "green"}
          />

          <a onClick={this.toggleForm} className="toggleButton" href="#">
            {showSignUp ? "click to login" : "click to sign Up"}
          </a>
        </Form>
      </Grid>
    );
  }
}
