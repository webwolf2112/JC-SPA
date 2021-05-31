import React from 'react';

const UserList = ( { users, deleteUser, updateUser} ) => {



    return (
        <>
        { users.length > 0 && 
            <ul>
                {
                    users.map( ({email, firstname, lastname, id}, index) => {
                        return (<li key={firstname}>
                            {email} {firstname} {lastname}
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