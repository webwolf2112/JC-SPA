import * as service from './jc-service';
const axios = require('axios');

jest.mock('axios');

describe('JC Service', () => {
    describe( 'getUsers()', () => {
        it( 'should get all users, happy path', async () => {

            axios.get.mockReturnValue( { data: { results: 'mock results'}})

            const actual = await service.getUsers();

            expect( actual ).toEqual( 'mock results' );
        });

        it( 'should get all users, error path', async () => {
            axios.get.mockRejectedValue('really bad error');

            try {
                const actual = await service.getUsers();
            } catch( e ) {
                expect(e).toEqual( 'really bad error ');
            }
        });

       /** These are the additional test cases I would normally write. 

        1) happy/error path for createUser
        2) happy/error path for updateUser
        3) happy/error path for getUserById
        4) happy/error path for getUserById
        5) happy/wrror path for deleteUser
      **/
    });
});