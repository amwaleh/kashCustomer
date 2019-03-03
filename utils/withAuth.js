import React, { Component } from 'react'
import AuthService from './AuthService'
import Layout from '../components/layout'
import { Loader } from "semantic-ui-react";

const WOOCOMMERCE_URL = process.env.WOOCOMERCE_URL

export default function withAuth(AuthComponent) {
  const Auth = new AuthService()

  return class Authenticated extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: true
      };
    }
    static getInitialProps(ctx) {
      return AuthComponent.getInitialProps(ctx)
    }
    componentDidMount() {
      if (!Auth.loggedIn()) {
        console.log(this.props)
        window.location='/'
      }
      this.setState({ isLoading: false })
    }

    render() {
      return (

          <Layout>
          { this.state.isLoading ? (
            <Loader size='massive'>Loading</Loader>
          ) : (
            <AuthComponent { ...this.props } auth={ Auth } />
            ) }
        </Layout>

      )
    }
  }
}