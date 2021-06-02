import React, {useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from '../services/jc-service';
import UserList from './user-list';
import UsersHeader from './users-header';
import UserFormModal from '../userForm/user-form';
import ErrorModal from './error-modal';

const UsersContainer = () => {
    const [users, setUsers] = useState( [] );
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

    /**
     * Fetch the users on load. We are just using an empty array so the useEffect
     * does not load multiple times. In a production app it would be better to use different
     * criteria to check if it should fetch. Such as using a store or a context.  This would
     * allow us to see if the data has already been fetched as well as being able to share the user
     * data across the app - thus helping performance.
     * 
     */
    useEffect( () => {
        fetchUsers( true );
    }, []);

    const handleDeleteUser = async ( userId ) => {
        setIsFetching( true );
        const { error } = await deleteUser( userId );
        /** 
         * This is not an ideal way to handle error handling. It would be better
         * to have a middleware handle the errors and passing that data to a store 
         * where the errors could be more streamline. 
         * For this simple app assignment I decided that was overkill.
         */
        if( error ){
            setErrorMessage( 'Error deleting user. Please try again later.');
        } else {
            fetchUsers( true );
        }
    };

    const handleCreateUser = async( formValues ) => {
        const { error } = await createUser( formValues );
        setIsFetching( false );
        if( error ){
         setErrorMessage( 'Error creating user. Please try again later.');
        }
    };

    const handleUpdateUser = async( formValues ) => {
        const { error } = await updateUser( currentUser.id, formValues );
        setIsFetching( false );
        if( error ){
            setErrorMessage( 'Error updating user. Please try again later.');
        }
    }
    
    const handleSubmit = async (formValues ) => {
        setIsFetching( true );
        if (!currentUser.id) {
            await handleCreateUser(formValues);
        } else {
            await handleUpdateUser(formValues);
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

    //Early return  - Initial loading state
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