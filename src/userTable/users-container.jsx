import React, {useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../services/jc-service';
import UserList from './user-list';
import UsersHeader from './users-header';
import UserFormModal from '../userForm/user-form';
import ErrorModal from './error-modal';

const UsersContainer = () => {
    /**
     * Fetch the users on load. We are just using an empty array so the useEffect
     * does not load multiple times. In a production app it would be better to use different
     * criteria to check if it should fetch. Such as using a store and seeing if the data as 
     * already been fetched. 
     * 
     */

    const [users, setUsers] = useState([]);
    const [isInitialLoad, setIsInitialLoad] = useState( true );
    const [isFetching, setIsFetching] = useState( false );
    const [ userFormModal, setUserFormModal ] = useState( false );
    const [ currentUser, setCurrentUser ] = useState( {} );
    const [ errorMessage, setErrorMessage ] = useState();

    const fetchUsers = async ( isInitialLoad ) => {
        const users = await getUsers();

        setUsers(users);
        setIsFetching( false );

        if( isInitialLoad ) {
            setIsInitialLoad( false );
        }

        if( users.error) {
            setErrorMessage( 'Error Fetching Users. Please try again later');
        }
    };

    useEffect( () => {
        fetchUsers( true );
    }, []);

    const handleDeleteUser = async ( userId ) => {
        setIsFetching( true );
        const { error } = await deleteUser( userId );
        if( error ){
            setErrorMessage( 'Error Deleting User');
        } else {
            fetchUsers( true );
        }
    };
    
    const handleSubmit = async (formValues ) => {
        setIsFetching( true );
        if (!currentUser.id) {
           const { error } = await createUser( formValues );
           setIsFetching( false );
           if( error ){
            setErrorMessage( 'Error Creating User');
           }
           
        } else {
           const { error } = await updateUser( currentUser.id, formValues );
            setIsFetching( false );
            if( error ){
                setErrorMessage( 'Error Updating User');
            }
        }

        fetchUsers( true );
        setUserFormModal( false );
    } 

    const triggetUpdateUserModal = ( userIndex ) => {
        setCurrentUser( users[userIndex] );
        setUserFormModal( true );
        setIsFetching( false );
    };

    const triggerNewUserModal = () => {
        setCurrentUser( {} );
        setUserFormModal( true );
    };

    const dismissUserFormModal = () => {
       setUserFormModal( false );
    };

    const dismissError = () => {
        setErrorMessage();
        setIsFetching( false );
    }

    //Early return  - Loading state
    if( isInitialLoad ) {
        return (
            <div className="loading"> Loading . . . </div>
        )
    }

    return(
        <>
        {
            userFormModal &&
                <>
                <UserFormModal currentUser={ currentUser } cancel={dismissUserFormModal} handleSubmit={handleSubmit} isFetching={isFetching}/>
                </>
        }       
                <>
                    <UsersHeader handleCreateUser={triggerNewUserModal} count={users.length} />
                    <UserList
                        users={users}
                        deleteUser={handleDeleteUser}
                        updateUser={triggetUpdateUserModal}
                        error={errorMessage}
                    />
                </>
    
       
        {
            errorMessage && 
            <>
                <ErrorModal errorMessage={errorMessage} dismissError={dismissError}/>
            </>
        }
        </>
    )
};

export default UsersContainer;