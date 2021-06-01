import React, {useState, useEffect} from 'react';
import styles from './user-list.module.css';

const UserList = ( { users, deleteUser, updateUser, error } ) => {
    const [ indexLoading, setIndexLoading ] = useState(-1);

    useEffect( () => {
        if( indexLoading > -1 || error){
            setIndexLoading( -1 );
        }
    }, [users, error]);
 
    const handleDelete = ( id, index ) => {
        setIndexLoading( index );
        deleteUser(id)
    };

    return (
        <>
        { users.length > 0 && 
            <ul className={styles.UserList}>
                  <li>
                        <span>First Name</span>
                        <span>Last Name</span>
                        <span>Email</span>
                        <span></span>
                    </li>

                {
                    users.map( ({email, firstname, lastname, id}, index) => {
                        return (
                        <li key={id}>
                                <span>{firstname}</span>
                                <span>{lastname}</span>
                                <span>{email}</span>
                                <span>
                                    <button disabled={ indexLoading === index } onClick={() => handleDelete(id, index)} className="inverse">Delete User</button>
                                    <button onClick={() => updateUser(index)}>Update User</button>
                                </span>
                        </li>
                        )
                    })
                }
            </ul>
        }
        </>
    )
};

export default UserList; 