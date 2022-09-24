import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { signInWithGooglePopup, signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
}
from "../../utils/firebase/firebase.utils";
import './sign-in-form.style.scss';
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";


const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password,} = formFields;
    
    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const signInWithGoogle = async () => {
        // await signInWithGooglePopup();
        await signInWithGoogleRedirect();
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email, password
            );
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect email or password');
                    break;
                case 'auth/user-not-found':
                    alert('user not found');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type='email' 
                required
                label='Email'
                onChange={handleChange} 
                name='email'
                value={email}/>

                <FormInput type='password' 
                required
                label='Password'
                onChange={handleChange} 
                name='password'
                value={password}/>
                <div className='buttons-container'>
                <Button type='submit'>Sign In</Button>
                <Button 
                    buttonType={BUTTON_TYPE_CLASSES.google}
                    type='button' 
                    onClick={signInWithGoogle}
                >
                    Google Sign In
                </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;