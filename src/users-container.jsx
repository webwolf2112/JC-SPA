import React, {useEffect, useState } from 'react';
import { getUsers } from './jc-service';
import UserList from './user-list';
import UserActionsRow from './user-actions-row';
import UserForm from './user-form';

const UsersContainer = () => {
    /**
     * Fetch the users on load. We are just using an empty array so the useEffect
     * does not load multiple times. In a production app it would be better to use different
     * criteria to check if it should fetch. Such as using a store and seeing if the data as 
     * already been fetched. 
     * 
     */
    useEffect( async () => {
            const users = await getUsers();
            setUsers(users);
            setIsFetching( false );
    }, []);

    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState( true );
    const [ userForm, setUserForm ] = useState( false );
    const [ currentUser, setCurrentUser ] = useState( {} );

    const deleteUser = ( userId ) => {
        console.log( 'deleteUser', userId )
    };

    const updateUser = ( userIndex ) => {
        setCurrentUser( users[userIndex]);
        setUserForm( true );
    };

    const createUser = () => {
        setUserForm( true );
    };

    const getUserById = (userId) => {
        console.log( 'get user by Id', userId)
    };

    const cancelUserForm = () => {
       setUserForm( false );
    };

    //Early return  - Loading state
    if( isFetching ) {
        return (
            <div> Loading . . . </div>
        )
    }

    return(
        <>
        {
            userForm ? 
                <>
                <UserForm currentUser={ currentUser } cancel={cancelUserForm}/>
                </>
            :
                <>
                <h1>Total Users: {users.length}</h1>
                <UserActionsRow createUser={createUser}/>
                <UserList
                    users={users}
                    deleteUser={deleteUser}
                    updateUser={updateUser}
                />
                </>
        }
        </>
    )
};

export default UsersContainer;