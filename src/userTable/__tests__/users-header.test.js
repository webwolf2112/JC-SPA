import React from 'react';
import { shallow } from 'enzyme';
import UsersHeader from '../users-header';

describe( 'Users Header ', () => {
    const defaultProps = {
        count: 5,
        handleCreateUser: jest.fn(),
    };

    beforeEach( () => {
        jest.clearAllMocks();
    });

    it('Should render correct', () => {
        const wrapper = shallow(
          <UsersHeader {...defaultProps} />,
        );
      
        expect(wrapper).toMatchSnapshot();
      });
});

