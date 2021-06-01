import React, {useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from './jc-service';
import UserList from './userList/user-list';
import UsersHeader from './users-header';
import UserFormModal from './userForm/user-form';

const UsersContainer = () => {
    /**
     * Fetch the users on load. We are just using an empty array so the useEffect
     * does not load multiple times. In a production app it would be better to use different
     * criteria to check if it should fetch. Such as using a store and seeing if the data as 
     * already been fetched. 
     * 
     */

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState( true );
    const [isFetching, setIsFetching] = useState( false );
    const [ userFormModal, setUserFormModal ] = useState( false );
    const [ currentUser, setCurrentUser ] = useState( {} );
    const [ serviceError, setServiceError ] = useState();

    const fetchUsers = async ( isInitialLoad ) => {
        const users = await getUsers();

        setUsers(users);
        setIsFetching( false );

        if( isInitialLoad ) {
            setIsLoading( false );
        }
    };

    useEffect( () => {
        fetchUsers( true );
    }, []);

    const handleDeleteUser = async ( userId ) => {
        setIsFetching( true );
        const { error } = await deleteUser( userId );
        if( error ){
            setServiceError( 'Error Updating User');
        } else {
            fetchUsers( true );
        }
    };

    const handleUpdateUserModal = ( userIndex ) => {
        setCurrentUser( users[userIndex] );
        setUserFormModal( true );
        setIsFetching( false );
    };

    const handleCreateUserModal = () => {
        setCurrentUser( {} );
        setUserFormModal( true );
    };

    const cancelUserFormModal = () => {
       setUserFormModal( false );
    };

    const handleSubmit = async (formValues ) => {
        setIsFetching( true );
        if (!currentUser.id) {
           const { error } = await createUser( formValues );
           setIsFetching( false );
           if( error ){
            setServiceError( 'Error Creating User');
           }
           
        } else {
           const { error } = await updateUser( currentUser.id, formValues );
            setIsFetching( false );
            if( error ){
                setServiceError( 'Error Updating User');
            }
        }

        fetchUsers( true );
        setUserFormModal( false );
    } 

    //Early return  - Loading state
    if( isLoading ) {
        return (
            <div className="loading"> Loading . . . </div>
        )
    }

    return(
        <>
        {
            userFormModal &&
                <>
                <UserFormModal currentUser={ currentUser } cancel={cancelUserFormModal} handleSubmit={handleSubmit} isFetching={isFetching}/>
                </>
        }       
                <>
                    <UsersHeader handleCreateUser={handleCreateUserModal} count={users.length} />
                    <UserList
                        users={users}
                        deleteUser={handleDeleteUser}
                        updateUser={handleUpdateUserModal}
                    />
                </>
    
        </>
    )
};

export default UsersContainer;