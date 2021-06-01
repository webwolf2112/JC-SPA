import React, {useState} from 'react';
import styles from './user-form.module.css';

const UserForm = ( {handleSubmit, currentUser = {} , cancel } ) => {
    const { email, firstname, lastname, username } = currentUser;
    const formType = username ? 'update' : 'new';
    const submitText = formType === 'update' ? 'Update User' : 'Create User';

    const [formValues, setFormValues ] = useState( {email, firstname, lastname, username });

    const onchange = ( e => {
        if( e.target.id && e.target.value){
            setFormValues( { ...formValues, [e.target.id]: e.target.value})
        }
    });

    const submit = (e) => {
        e.preventDefault();
        
        //Username should not be submitted in update
        const { username, ...cleanedFormValues } = currentUser;
        const correctFormValues = currentUser.userName ? cleanedFormValues : formValues;
       
        handleSubmit(correctFormValues);
    }
    
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
            <button onClick={cancel} aria-label="Close Modal" className={styles.close}>X</button>
        <form onChange={onchange} className={styles.form}>
            { formType === 'new' &&
                <>
                    <label htmlFor="username">User Name</label>
                    <input id="username" type="text" defaultValue={username} required/>
                </>
            }

            <label htmlFor="firstname">First Name</label>
            <input id="firstname" type="text" defaultValue={firstname} />

            <label htmlFor="lastname">Last Name</label>
            <input id="lastname" type="text" defaultValue={lastname} />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" defaultValue={email} required/>
        </form>
        <div className={styles.buttonContainer}>
            <button onClick={cancel} aria-label="Cancel" className="inverse">Cancel</button>
            <button type="submit" onClick={submit}>{submitText}</button>
        </div>
        </div>
        </div>
    )
};

export default UserForm;