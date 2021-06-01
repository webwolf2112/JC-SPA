import React, {useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from './jc-service';
import UserList from './usersTable/user-list';
import UsersHeader from './users-header';
import UserForm from './userForm/user-form';

const UsersContainer = () => {
    /**
     * Fetch the users on load. We are just using an empty array so the useEffect
     * does not load multiple times. In a production app it would be better to use different
     * criteria to check if it should fetch. Such as using a store and seeing if the data as 
     * already been fetched. 
     * 
     */
    
    useEffect( () => {
        async function fetchData() {
            const users = await getUsers();
            setUsers(users);
            setIsFetching( false );
        }

        fetchData();
    }, []);

    const [users, setUsers] = useState([]);
    const [isFetching, setIsFetching] = useState( false );
    const [ userForm, setUserForm ] = useState( false );
    const [ currentUser, setCurrentUser ] = useState( {} );
    const [ userActionType, setUserActionType ] = useState( 'new' );

    const handleDeleteUser = async ( userId ) => {
        await deleteUser( userId );
        const users = await getUsers();
        setUsers(users);
    };

    const handleUpdateUser = ( userIndex ) => {
        setCurrentUser( users[userIndex]);
        setUserForm( true );
    };

    const handleCreateUser = () => {
        setCurrentUser( {} );
        setUserForm( true );
    };

    const getUserById = (userId) => {
        console.log( 'get user by Id', userId)
    };

    const cancelUserForm = () => {
       setUserForm( false );
    };

    const handleSubmit = async (formValues ) => {
        if (!currentUser.id) {
           await createUser( formValues );
           
        } else {
           await updateUser( currentUser.id, formValues );
            console.log( 'user has been successfully updated ');
            
        }

        const users = await getUsers();
        setUsers(users);
        setUserForm( false );
    } 

    //Early return  - Loading state
    if( isFetching ) {
        return (
            <div> Initial Loading . . . </div>
        )
    }

    return(
        <>
        {
            userForm &&
                <>
                <UserForm currentUser={ currentUser } cancel={cancelUserForm} handleSubmit={handleSubmit}/>
                </>
        }       
                <>
                    <UsersHeader handleCreateUser={handleCreateUser} count={users.length} />
                    <UserList
                        users={users}
                        deleteUser={handleDeleteUser}
                        updateUser={handleUpdateUser}
                    />
                </>
    
        </>
    )
};

export default UsersContainer;