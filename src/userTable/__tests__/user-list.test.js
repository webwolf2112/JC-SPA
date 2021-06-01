import React from 'react';
import { shallow } from 'enzyme';
import UserList from '../user-List';

describe( 'User Form Test ', () => {
    const deleteUserMock = jest.fn();
    const openFormModalMock = jest.fn();

    const defaultProps = {
        users: [{
            id: '1234',
            firstname: 'hello',
            lastname: 'world',
            userName: 'helloWorld123'
        }],
        deleteUser: deleteUserMock,
        updateUser: openFormModalMock
    };

    beforeEach( () => {
        jest.clearAllMocks();
    });

    it('Should render correct', () => {
        const wrapper = shallow(
          <UserList {...defaultProps} />,
        );
      
        expect(wrapper).toMatchSnapshot();
      });

      it('Should handle Delete', () => {
        const wrapper = shallow(
            <UserList {...defaultProps} />,
          );

          wrapper.find( 'button').first().simulate('click');
        
          expect( deleteUserMock ).toHaveBeenCalledWith( defaultProps.users[0].id );
      });

      it('Should call the open modal with the correct user index', () => {
        const wrapper = shallow(
            <UserList {...defaultProps} />,
          );

          wrapper.find( 'button').at(1).simulate('click');
        
          expect( openFormModalMock ).toHaveBeenCalledWith( 0 );
      });
});

