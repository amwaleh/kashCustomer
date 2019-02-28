import Head from "next/head";
import Link from 'next/link'
import "semantic-ui-css/semantic.min.css";
import withAuth from '../utils/withAuth'
import { get } from "../api";
import { Container,Grid, Card, Icon, Image } from 'semantic-ui-react'

const CustomerCard = ({details}) => (
  <Grid.Column style={{marginBottom: '20px'}}>
  <Card>
    <Image src={details.avatar_url} />
    <Card.Content>
      <Card.Header >
        {details.first_name} {details.last_name}
      </Card.Header>
      <Card.Meta>
        <span className="date">{details.username}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <Link href={{ pathname: 'create_customer', query: { id: details.id } } }>
      <a>
        <Icon name="edit" />
        edit
      </a>
      </Link>
    </Card.Content>
  </Card>
  </Grid.Column >
);

const HomePage = ({ customers }) => {
  return (
    <Grid as={Container} padded='vertically' centered>
    <Grid.Row columns={3} padded>
      {customers.map((customer, i) => (
        <CustomerCard key={i} details={customer} />
      ))}
      </Grid.Row>
    </Grid>
  );
};


HomePage.getInitialProps = async ({ req }) => {
  const res = await get("customers");
  const data = JSON.parse(res.body)
  return { customers: data };
};

export default withAuth(HomePage);
