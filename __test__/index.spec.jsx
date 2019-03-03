import * as React from "react";
import { shallow } from "enzyme";
import IndexPage from "../pages/index";
import { CustomerForm } from "../pages/customer";
import { HomePage } from "../pages/home";
const data = {
  email: "john.doe@example.com",
  first_name: "John",
  last_name: "Doe",
  username: "john.doe",
  billing: {
    first_name: "John",
    last_name: "Doe",
    company: "",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US",
    email: "john.doe@example.com",
    phone: "(555) 555-5555"
  },
  shipping: {
    first_name: "John",
    last_name: "Doe",
    company: "",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US"
  }
};
const customerList = [
  {
    id: 26,
    date_created: "2017-03-21T16:11:14",
    date_created_gmt: "2017-03-21T19:11:14",
    date_modified: "2017-03-21T16:11:16",
    date_modified_gmt: "2017-03-21T19:11:16",
    email: "joao.silva@example.com",
    first_name: "João",
    last_name: "Silva",
    role: "customer",
    username: "joao.silva",
    billing: {
      first_name: "João",
      last_name: "Silva",
      company: "",
      address_1: "Av. Brasil, 432",
      address_2: "",
      city: "Rio de Janeiro",
      state: "RJ",
      postcode: "12345-000",
      country: "BR",
      email: "joao.silva@example.com",
      phone: "(55) 5555-5555"
    },
    shipping: {
      first_name: "João",
      last_name: "Silva",
      company: "",
      address_1: "Av. Brasil, 432",
      address_2: "",
      city: "Rio de Janeiro",
      state: "RJ",
      postcode: "12345-000",
      country: "BR"
    },
    is_paying_customer: false,
    avatar_url:
      "https://secure.gravatar.com/avatar/be7b5febff88a2d947c3289e90cdf017?s=96",
    meta_data: [],
    _links: {
      self: [
        {
          href: "https://example.com/wp-json/wc/v3/customers/26"
        }
      ],
      collection: [
        {
          href: "https://example.com/wp-json/wc/v3/customers"
        }
      ]
    }
  },
  {
    id: 25,
    date_created: "2017-03-21T16:09:28",
    date_created_gmt: "2017-03-21T19:09:28",
    date_modified: "2017-03-21T16:09:30",
    date_modified_gmt: "2017-03-21T19:09:30",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    role: "customer",
    username: "john.doe",
    billing: {
      first_name: "John",
      last_name: "Doe",
      company: "",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US",
      email: "john.doe@example.com",
      phone: "(555) 555-5555"
    },
    shipping: {
      first_name: "John",
      last_name: "Doe",
      company: "",
      address_1: "969 Market",
      address_2: "",
      city: "San Francisco",
      state: "CA",
      postcode: "94103",
      country: "US"
    },
    is_paying_customer: false,
    avatar_url:
      "https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96",
    meta_data: [],
    _links: {
      self: [
        {
          href: "https://example.com/wp-json/wc/v3/customers/25"
        }
      ],
      collection: [
        {
          href: "https://example.com/wp-json/wc/v3/customers"
        }
      ]
    }
  }
];
describe("Pages", () => {
  describe("Index", () => {
    it("should render without throwing an error", function() {
      const wrapper = shallow(<IndexPage />);
      expect(wrapper.debug()).toMatchSnapshot();
    });
  });

  describe("Customers", () => {
    it("should render without throwing an error", function() {
      const wrapper = shallow(<CustomerForm />);
      expect(wrapper.debug()).toMatchSnapshot();
    });

    it("should render Populated fields", function() {
      const wrapper = shallow(<CustomerForm body={data} />);
      expect(wrapper.debug()).toMatchSnapshot();
    });
  });

  describe("List Customers", () => {
    it("should render without throwing an error", function() {
      const wrapper = shallow(
        <HomePage
          customers={customerList}
          headers={{ "x-wp-totalpages": 10, "x-wp-total": 12 }}
        />
      );
      expect(wrapper.debug()).toMatchSnapshot();
    });
  });
});
