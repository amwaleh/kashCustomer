import React from 'react';

import Head from "next/head";
import { Menu, Grid, Header, Icon} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import '../pages/styles.css'
import AuthService from '../utils/AuthService'

const auth = new AuthService ()
export default class Page extends React.Component{
    handleLogout = () =>{
      auth.logout()
      window.location='/'
    }
  render(){
  return (<div>
    <Head>
      <title>WooCom</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header />
    <Grid>
      <Grid.Row className='topNavRow' color={'teal'} >
        <Menu fluid color='purple' >
          <Menu.Item icon='power'  name="log out" position="right" onClick={this.handleLogout}/>
        </Menu>
      </Grid.Row>
      <Grid.Row className='sidebarNav'>
        <Grid.Column as={Menu} width={2} color={'teal'}>
          <div className='spacer'>
            <Header as='h2' icon >
              <Icon name='user circle'  inverted />
              Customer Dashboard
    <Header.Subheader>Manage customer Details.</Header.Subheader>
            </Header>
          </div>
          <Menu.Item icon='home' name="home" link href='/home' />
          <Menu.Item icon='add user' name="add customer" link href='/customer' />

        </Grid.Column>
        <Grid.Column width={12}> {this.props.children}</Grid.Column>
      </Grid.Row>
    </Grid>
  </div>)

  }
}