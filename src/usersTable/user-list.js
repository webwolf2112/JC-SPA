import React from 'react';
import styles from './user-list.module.css';

const UserList = ( { users, deleteUser, updateUser} ) => {

    return (
        <>
        { users.length > 0 && 
            <ul className={styles.UserList}>
                {
                    users.map( ({email, firstname, lastname, id}, index) => {
                        return (<li key={firstname}>
                            <span>{firstname}</span>
                            <span>{lastname}</span>
                            <button onClick={() => deleteUser(id)}>Delete User</button>
                            <button onClick={() => updateUser(index)}>Update User</button>
                        </li>)
                    })
                }
            </ul>
        }
        </>
    )
};

export default UserList; 