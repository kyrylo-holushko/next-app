import * as email from 'email-validator';

export const signupForm = {

    defaultFormInput: {
        username: "",
        email: "",
        password: "",
        passwordConfirmed: ""
    },
    defaultFormDirty: {
        username: false,
        email: false,
        password: false,
        passwordConfirmed: false
    },
    defaultSignupErrors: {
        username: {
            empty: false,
            maxlength: false,
            notAlphanumeric: false
        },
        email: {
            empty: false,
            invalidEmail: false
        },
        password: {
            empty: false,
            minlength: false
        },
        passwordConfirmed: {
            empty: false,
            minlength: false
        }
    },
    formErrorSetter(currentForm, setErrorState){
        Object.entries(currentForm).forEach(([key,val])=>{
            switch(key){
                case 'username':
                    if(val.length){
                        setErrorState(current=>({
                            ...current,
                            username: {
                                ...current.username,
                                empty: false
                            }
                        }));
                        if(val.length>15){
                            setErrorState(current=>({
                                ...current,
                                username: {
                                    ...current.username,
                                    maxlength: true
                                }
                            }));
                        } else {
                            setErrorState(current=>({
                                ...current,
                                username: {
                                    ...current.username,
                                    maxlength: false
                                }
                            }));
                        }                
    
                        if(!/^[a-zA-Z0-9]+$/.test(val)){
                            setErrorState(current=>({
                                ...current,
                                username: {
                                    ...current.username,
                                    notAlphanumeric: true
                                }
                            }));
                        } else {
                            setErrorState(current=>({
                                ...current,
                                username: {
                                    ...current.username,
                                    notAlphanumeric: false
                                }
                            }));
                        }
                    } else {
                        setErrorState(current=>({
                            ...current,
                            username: {
                                empty: true,
                                maxlength: false,
                                notAlphanumeric: false
                            }
                        }));
                    }   
                    break;
                case 'email':
                    if(val.length){
                        setErrorState(current=>({
                            ...current,
                            email: {
                                ...current.email,
                                empty: false
                            }
                        }));
                        if(!email.validate(val)){
                            setErrorState(current=>({
                                ...current,
                                email: {
                                    ...current.email,
                                    invalidEmail: true
                                }
                            }));
                        } else {
                            setErrorState(current=>({
                                ...current,
                                email: {
                                    ...current.email,
                                    invalidEmail: false
                                }
                            }));
                        }
                    } else {
                        setErrorState(current=>({
                            ...current,
                            email: {
                                empty: true,
                                invalidEmail: false        
                            }
                        }));
                    } 
                    break;
                case 'password':
                    if(val.length){
                        setErrorState(current=>({
                            ...current,
                            password: {
                                ...current.password,
                                empty: false
                            }
                        }));
                        if(val.length<8) {
                            setErrorState(current=>({
                                ...current,
                                password: {
                                    ...current.password,
                                    minlength: true
                                }
                            }));
                        } else {
                            setErrorState(current=>({
                                ...current,
                                password: {
                                    ...current.password,
                                    minlength: false
                                }
                            }));
                        }   
                    } else {
                        setErrorState(current=>({
                            ...current,
                            password: {
                                empty: true,
                                minlength: false
                            }
                        }));
                    }
                    break;
                case 'passwordConfirmed':
                    if(val.length){
                        setErrorState(current=>({
                            ...current,
                            passwordConfirmed: {
                                ...current.passwordConfirmed,
                                empty: false
                            }
                        }));
                        if(val.length<8){
                            setErrorState(current=>({
                                ...current,
                                passwordConfirmed: {
                                    ...current.passwordConfirmed,
                                    minlength: true
                                }
                            }));
                        } else {
                            setErrorState(current=>({
                                ...current,
                                passwordConfirmed: {
                                    ...current.passwordConfirmed,
                                    minlength: false
                                }
                            }));
                        } 
                    } else {
                        setErrorState(current=>({
                            ...current,
                            passwordConfirmed: {
                                empty: true,
                                minlength: false
                            }
                        }));
                    }
                    break;
            }
        });

        /* if (Object.values(errorState.username).every(k=>k===false) &&
            Object.values(errorState.email).every(k=>k===false) &&
            Object.values(errorState.password).every(k=>k===false) &&
            Object.values(errorState.passwordConfirmed).every(k=>k===false))
        {
            console.log("ERRORSTATE in if", errorState);
            setValidState(true);
        }
        else {
            console.log("ERRORSTATE in else", errorState);
            setValidState(false);
        } */
    /* 
        if(errorState)
            setValidState(false);
        else
            setValidState(true); */
    },
    formValidator(errorState, setValidState){
        if (Object.values(errorState.username).every(k=>k===false) &&
            Object.values(errorState.email).every(k=>k===false) &&
            Object.values(errorState.password).every(k=>k===false) &&
            Object.values(errorState.passwordConfirmed).every(k=>k===false))
        {
            console.log("ERRORSTATE in if", errorState);
            setValidState(true);
        }
        else {
            console.log("ERRORSTATE in else", errorState);
            setValidState(false);
        }
    }
};
/* 
const defaultFormInput = {
    username: "",
    email: "",
    password: "",
    passwordConfirmed: ""
};

const defaultFormDirty = {
    username: false,
    email: false,
    password: false,
    passwordConfirmed: false
};

export const defaultSignupErrors = {
    username: {
        empty: false,
        maxlength: false,
        notAlphanumeric: false
    },
    email: {
        empty: false,
        invalidEmail: false
    },
    password: {
        empty: false,
        minlength: false
    },
    passwordConfirmed: {
        empty: false,
        minlength: false
    }
};

export function formSignupValidator(currentForm, errorState, setErrorState, setValidState){
    Object.entries(currentForm).forEach(([key,val])=>{
        switch(key){
            case 'username':
                if(val.length){
                    setErrorState(current=>({
                        ...current,
                        username: {
                            ...current.username,
                            empty: false
                        }
                    }));
                    if(val.length>15){
                        setErrorState(current=>({
                            ...current,
                            username: {
                                ...current.username,
                                maxlength: true
                            }
                        }));
                    } else {
                        setErrorState(current=>({
                            ...current,
                            username: {
                                ...current.username,
                                maxlength: false
                            }
                        }));
                    }                

                    if(!/^[a-zA-Z0-9]+$/.test(val)){
                        setErrorState(current=>({
                            ...current,
                            username: {
                                ...current.username,
                                notAlphanumeric: true
                            }
                        }));
                    } else {
                        setErrorState(current=>({
                            ...current,
                            username: {
                                ...current.username,
                                notAlphanumeric: false
                            }
                        }));
                    }
                } else {
                    setErrorState(current=>({
                        ...current,
                        username: {
                            empty: true,
                            maxlength: false,
                            notAlphanumeric: false
                        }
                    }));
                }   
                break;
            case 'email':
                if(val.length){
                    setErrorState(current=>({
                        ...current,
                        email: {
                            ...current.email,
                            empty: false
                        }
                    }));
                    if(!email.validate(val)){
                        setErrorState(current=>({
                            ...current,
                            email: {
                                ...current.email,
                                invalidEmail: true
                            }
                        }));
                    } else {
                        setErrorState(current=>({
                            ...current,
                            email: {
                                ...current.email,
                                invalidEmail: false
                            }
                        }));
                    }
                } else {
                    setErrorState(current=>({
                        ...current,
                        email: {
                            empty: true,
                            invalidEmail: false        
                        }
                    }));
                } 
                break;
            case 'password':
                if(val.length){
                    setErrorState(current=>({
                        ...current,
                        password: {
                            ...current.password,
                            empty: false
                        }
                    }));
                    if(val.length<8) {
                        setErrorState(current=>({
                            ...current,
                            password: {
                                ...current.password,
                                minlength: true
                            }
                        }));
                    } else {
                        setErrorState(current=>({
                            ...current,
                            password: {
                                ...current.password,
                                minlength: false
                            }
                        }));
                    }   
                } else {
                    setErrorState(current=>({
                        ...current,
                        password: {
                            empty: true,
                            minlength: false
                        }
                    }));
                }
                break;
            case 'passwordConfirmed':
                if(val.length){
                    setErrorState(current=>({
                        ...current,
                        passwordConfirmed: {
                            ...current.passwordConfirmed,
                            empty: false
                        }
                    }));
                    if(val.length<8){
                        setErrorState(current=>({
                            ...current,
                            passwordConfirmed: {
                                ...current.passwordConfirmed,
                                minlength: true
                            }
                        }));
                    } else {
                        setErrorState(current=>({
                            ...current,
                            passwordConfirmed: {
                                ...current.passwordConfirmed,
                                minlength: false
                            }
                        }));
                    } 
                } else {
                    setErrorState(current=>({
                        ...current,
                        passwordConfirmed: {
                            empty: true,
                            minlength: false
                        }
                    }));
                }
                break;
        }
    });

    if(errorState)
        setValidState(false);
    else
        setValidState(true);
}; */