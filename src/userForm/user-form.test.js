import React from 'react';
import { shallow } from 'enzyme';
import UserForm from './user-form';

describe( 'User Form Test ', () => {
    const defaultProps = {
        handleSubmit: jest.fn(),
        currentUser: {},
        cancel: jest.fn(),
        isFetching: false,
    };

    test('Should render correct', () => {
        const wrapper = shallow(
          <UserForm {...defaultProps} />,
        );
      
        expect(wrapper).toMatchSnapshot();
        expect( wrapper.find( 'button[type="submit"]' ).props().disabled ).toBeFalsy();
      });

      test('Should render correctly when fetching', () => {
        const wrapper = shallow(
          <UserForm {...defaultProps} isFetching={true} />,
        );
    
        expect( wrapper.find( 'button[type="submit"]' ).props().disabled ).toBeTruthy();
      });

      /** Due to a busy schedule I do not have time to complete all of the tests, but these
       * are the additional test cases I would normally write. 

        1) ensure the inputs populate correctly for update user
        2) ensure that the firstname input does not show up on update user
        3) ensure handle submit does not get called when the form does not pass validation
      **/
});

