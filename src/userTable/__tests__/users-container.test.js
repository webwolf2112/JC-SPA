import React from 'react';
import { shallow, mount } from 'enzyme';
import UsersContainer from '../users-container';
import { getUsers } from '../../services/jc-service';
import { act } from 'react-dom/test-utils'

jest.mock( '../../services/jc-service');

describe( 'Users Container', () => {

    beforeEach( () => {
        jest.clearAllMocks();
    });

    it('Should render correct', () => {
        const wrapper = shallow(
          <UsersContainer />,
        );
      
        expect(wrapper).toMatchSnapshot();
    });

    it('Should render correct', async () => {
        getUsers.mockReturnValue( Promise.resolve( [] ));
            let wrapper; 
            await act(async () => {
                wrapper = mount(
                    <UsersContainer />,
                    );
            });
            expect( getUsers ).toHaveBeenCalled();
    });


    /** These are the additional test cases I would normally write. 
        1) test each method, update, delete, and create for the error message to show
        2) test each method, update, delete, and create called the correct endpoints
        3) test that the loading screen shows before the initial getUsers call
      **/
});