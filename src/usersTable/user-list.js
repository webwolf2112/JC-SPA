import React from 'react';
import styles from './user-list.module.css';

const UserList = ( { users, deleteUser, updateUser} ) => {

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
                        <li key={firstname}>
                                <span>{firstname}</span>
                                <span>{lastname}</span>
                                <span>{email}</span>
                                <span>
                                    <button onClick={() => deleteUser(id)} className="inverse">Delete User</button>
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