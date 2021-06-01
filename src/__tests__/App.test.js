import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

test('Link changes the class when hovered', () => {
  const wrapper = shallow(
    <App/>,
  );

  expect(wrapper).toMatchSnapshot();
});