import React from 'react';
import { shallow } from 'enzyme';
import ErrorModal from '../error-modal';

describe( 'Error Modal ', () => {
    const defaultProps = {
        errorMessage: 'test error message',
        dismissError: jest.fn(),
    };

    it('Should render correct', () => {
        const wrapper = shallow(
          <ErrorModal {...defaultProps} />,
        );
      
        expect(wrapper).toMatchSnapshot();
      });
});

