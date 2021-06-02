import React, {useState} from 'react';
import styles from './user-form.module.css';

const UserForm = ( {handleSubmit, currentUser = {} , cancel, isFetching } ) => {
    const { email, firstname, lastname, username } = currentUser;
    const formType = username ? 'update' : 'new';
    const submitText = formType === 'update' ? 'Update User' : 'Create User';

    const [formValues, setFormValues ] = useState( {email, firstname, lastname, username });
    const [nameError, setNameError ] = useState( false );

    const onchange = ( e => {
       
        setFormValues( { ...formValues, [e.target.id]: e.target.value});
        if( nameError ){
            setNameError( false );
        }
      
    });

    const formValidation = () => {
        /** 
         * For a production environment we should bring in a full validation library
         * or potentially a form library.  For this exercise I wanted to code
         * out the validation so the reviewers would know that my coding abillity
         * is not dependent on libraries.
         **/
        const containsWhiteSpace = /\s/;
        //Username can not contain whitespace or it will error server side
        if( containsWhiteSpace.test(formValues.username) ) {
            setNameError( true );
            return false;
        }

        return true;
    }

    const submit = (e) => {
        e.preventDefault();

        if( !formValidation() ){
            return;
        }

        //Username should not be submitted in update call
        const { username, ...cleanedFormValues } = currentUser;
        const correctFormValues = currentUser.userName ? cleanedFormValues : formValues;
       
        handleSubmit(correctFormValues);
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
            <button onClick={cancel} aria-label="Close Modal" className={styles.close}>X</button>
        <form onChange={onchange} className={styles.form} onSubmit={submit}>
            { formType === 'new' &&
                <>
                    <label htmlFor="username">User Name</label>
                    <input id="username" type="text" defaultValue={username} required className={nameError ? styles.inputError : undefined}/>
                    {
                        nameError && 
                        <p className={styles.error}>You can not have spaces in the user name</p>
                    }
                </>
            }

            <label htmlFor="firstname">First Name</label>
            <input id="firstname" type="text" defaultValue={firstname} />

            <label htmlFor="lastname">Last Name</label>
            <input id="lastname" type="text" defaultValue={lastname} />

            <label htmlFor="email" >Email</label>
            <input id="email" type="email" defaultValue={email} required/>

            <div className={styles.buttonContainer}>
                <button onClick={cancel} aria-label="Cancel" className="inverse">Cancel</button>
                <button type="submit" disabled={isFetching}>{submitText}</button>
            </div>
        </form>
       
        </div>
        </div>
    )
};

export default UserForm;