import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Form, Message } from "semantic-ui-react";
import withAuth from '../utils/withAuth'
import { Grid, Container, Header, Segment, Button } from "semantic-ui-react";
import { post, get, put } from "../api";
import './styles.css'
const mainSection = data => [
  ,
  {
    name: "first_name",
    label: "first name",
    required: true,
    value: data && data.first_name
  },
  {
    name: "last_Name",
    label: "last name",
    required: true,
    value: data && data.last_name
  },
  {
    name: "username",
    label: "username",
    required: true,
    value: data && data.username
  },
  {
    name: "email",
    label: "email",
    required: true,
    placeholder: "john@kariuki.com",
    value: data && data.email
  }
];

const billingSection = data => [
  {
    name: "billingFirst_name",
    label: "first name",
    value: data && data.first_name
  },
  {
    name: "billingLast_name",
    label: "last name",
    value: data && data.last_name
  },
  { name: "billingEmail", label: "email", value: data && data.email },
  { name: "billingCity", label: "city", value: data && data.city },
  { name: "billingPhone", label: "phone", value: data && data.phone },
  { name: "billingState", label: "state", value: data && data.state },
  { name: "billingCompany", label: "company", value: data && data.company },
  { name: "billingCountry", label: "country", value: data && data.country },
  { name: "billingPostcode", label: "postcode", value: data && data.postcode },
  {
    name: "billingAddress_1",
    label: "address 1",
    value: data && data.address_1
  },
  {
    name: "billingAddress_2",
    label: "address 2",
    value: data && data.address_2
  }
];

const shippingSection = data => [
  { name: "shippingCity", label: "city", value: data && data.city },
  { name: "shippingState", label: "state", value: data && data.state },
  { name: "shippingCompany", label: "company", value: data && data.company },
  { name: "shippingCountry", label: "country", value: data && data.country },
  { name: "shippingPostCode", label: "postcode", value: data && data.postcode },
  {
    name: "shippingLast_name",
    label: "last name",
    value: data && data.last_name
  },
  {
    name: "shippingAddress_1",
    label: "address 1",
    value: data && data.address_1
  },
  {
    name: "shippingAddress_2",
    label: "address 2",
    value: data && data.address_2
  },
  {
    name: "shippingFirst_name",
    label: "first name",
    value: data && data.first_name
  }
];

const Section = ({ section, onChange }) => (
  <Form.Group as={Grid.Row}>
    {section.map((field, i) => (
      <Grid.Column width={6} key={i}>
        <Form.Input
          label={field.name}
          placeholder={field.placeholder}
          {...field}
          style={{ paddingBottom: "10px" }}
          onChange={e => onChange(e)}
        />
      </Grid.Column>
    ))}
  </Form.Group>
);

export class CustomerForm extends Component {
  state = {
    body: this.props.body,
    error: "",
    visible: false
  };
  static async getInitialProps({ query }) {
    const customer_id = query.id;
    const result = await get(`customers/${customer_id}`);
    const body = JSON.parse(result.body);
    // const {id} = this.props.url.param
    return { body, customer_id };
  }

  onChange = e => {
    const { name, value } = e.target;
    const currentField = name.toLowerCase();
    if (currentField.includes("shipping") || currentField.includes("billing")) {
      const section = currentField.match(/shipping|billing/gi)[0];
      const field = currentField.replace(/shipping|billing/gi, "");
      console.log({ field, section });
      this.setState(prevState => {
        return {
          body: {
            ...prevState.body,
            [section]: {
              ...prevState.body[section],
              [field]: value
            }
          }
        };
      });
    } else {
      this.setState(prevState => {
        return {
          body: { ...prevState.body, [currentField]: value }
        };
      });
    }
  };
  handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = this.props.customer_id
        ? await put(`customers/${this.props.customer_id}`, this.state.body)
        : await post("customers", this.state.body);
      console.log({ result });
      const body = JSON.parse(result.body);
      if (result.statusCode === 201 || result.statusCode === 200) {
        this.props.url.push("/home");
      }
      else{
        this.setState({ error: body.message, visible: true });
      }

    } catch (e) {
      this.setState({ error: e.message, visible: true  });
    }
  };

  render() {
    if (this.state.error) {
      setTimeout(() => {
        this.setState({ visible: false });
      }, 5000);
    }
    const { customer_id} = this.props;
    const { body, error, visible } = this.state;
    return (
      <Grid as={Container} style={{ paddingTop: "30px" }}>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Grid>

              { visible && <Message
              className='fixedMessage'
                header={ error ? "Error" : "Info" }
                content={ error}
                color={ "red" }
              />}

            <Header as="h3" color="teal">
              Personal info:
            </Header>
            <Section section={mainSection(body)} onChange={this.onChange} />
            <Header as="h3" color="teal">
              Billing:
            </Header>
            <Section
              section={billingSection(body && body.billing)}
              onChange={this.onChange}
            />
            <Header as="h3" color="teal">
              Shipping:
            </Header>
            <Section
              section={shippingSection(body && body.shipping)}
              onChange={this.onChange}
            />
            <Grid.Row >
              <div className='submitButtons'>
            <Form.Button
            size='medium'
            content={ customer_id? "update": "submit"}
            color={ customer_id? "blue": "green"}
            type="submit" />
            </div>
            </Grid.Row>
          </Grid>
        </Form>
      </Grid>
    );
  }
}
export default withAuth(CustomerForm)