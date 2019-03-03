import * as React from "react";
import { shallow } from "enzyme";
import Layout from '../../components/layout'


  describe("Layout", () => {
    it("should render without throwing an error", function () {
      const wrapper = shallow(<Layout />);
      expect(wrapper.debug()).toMatchSnapshot();
    });
  });
