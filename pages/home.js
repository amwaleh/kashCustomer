import React, { Component } from "react";
// import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import Head from "next/head";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import withAuth from "../utils/withAuth";
import { get } from "../api";
import {
  Header,
  Container,
  Grid,
  Segment,
  Modal,
  Card,
  Icon,
  Image,
  Pagination,
  Label
} from "semantic-ui-react";

const mapObj = obj => {
  return Object.keys(obj).map((key, i) => (
    <Segment className='customerDetails' key={ i }><b>{key} </b>: {`${obj[key]}`}</Segment>
  ));
};

const CustomerCard = ({ details, onClick }) => (
  <Grid.Column className="customerCard">
    <Card>
      <Card.Content>
        <Card.Content>
          <Image
            size="medium"
            floated="right"
            src={`https://source.unsplash.com/300x300/?smiles ${Math.random()}`}
            className="profileImage"
          />
        </Card.Content>
        <Card.Content>
          <Card.Header>
            {details.first_name} {details.last_name}
          </Card.Header>
          <Card.Meta>
            <span className="date">{details.username}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Segment.Group horizontal color="teal" className="profileActions">
            <Modal
              trigger={
                <Segment>
                  <Link>
                    <a>
                      <Icon
                        name="eye"
                        onClick={onClick}
                      />
                      view
                    </a>
                  </Link>
                </Segment>
              }
            >
              <Modal.Header>Customer Details</Modal.Header>
              <Modal.Content image>
                <Image wrapped size="medium" src={details.avatar_url} />
                <Modal.Description>
                  <Label as={Header} color="teal" ribbon>
                    Personal Info
                  </Label>
                  {mapObj(details)}
                  <Label as={Header} color="teal" ribbon>
                    Billing Details
                  </Label>
                  {mapObj(details.billing)}
                  <Label as={Header} color="teal" ribbon>
                    shipping Details
                  </Label>
                  {mapObj(details.shipping)}
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions />
            </Modal>
            <Segment>
              <Link href={{ pathname: "customer", query: { id: details.id } }}>
                <a>
                  <Icon name="edit" />
                  edit
                </a>
              </Link>
            </Segment>
          </Segment.Group>
        </Card.Content>
      </Card.Content>
    </Card>
  </Grid.Column>
);

export class HomePage extends Component {
  state = {
    customers: this.props.customers,
    currentCustomerIndex: null
  };

  handlePageChange = async (e, { activePage }) => {
    const res = await get(`customers?page=${activePage}`);
    const customers = JSON.parse(res.body);
    this.setState({ customers });
  };
  showdetails = index => {
    this.setState({ currentCustomerIndex: this.state.customers[index] });
  };
  render() {
    const { customers } = this.state;
    const totalPages = this.props.headers["x-wp-totalpages"];
    const totalItems = this.props.headers["x-wp-total"];
    return (
      <Grid as={Container}>
        <Grid.Row columns={3}>
          {customers.map((customer, i) => (
            <CustomerCard
              key={i}
              details={customer}
              onClick={() => this.showdetails(i)}
            />
          ))}
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10} floated="right">
            {totalItems > 9 && (
              <Pagination
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={totalPages}
                onPageChange={this.handlePageChange}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

HomePage.getInitialProps = async ({ req }) => {
  const res = await get("customers?per_page=9");
  const data = JSON.parse(res.body);
  console.log(res.headers);
  return { customers: data, headers: res.headers };
};

export default withAuth(HomePage);
