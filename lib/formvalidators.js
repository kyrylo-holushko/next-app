import * as email from 'email-validator';

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

export function formSignupValidator(currentForm, setErrorState, setValidState){
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
                            ...current.username,
                            empty: true
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
                            ...current.email,
                            empty: true
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
                            ...current.password,
                            empty: true
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
                            ...current.passwordConfirmed,
                            empty: true
                        }
                    }));
                }
                break;
        }
    });

    if(errors)
        setValidState(false);
    else
        setValidState(true);
};