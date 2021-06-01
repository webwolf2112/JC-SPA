import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

 describe( ('User Form Test') => {
    it('should render correctly', () => {
        const { asFragment } = render(<App />)
        
        expect(asFragment(<UserForm />)).toMatchSnapshot()
       })
 });
