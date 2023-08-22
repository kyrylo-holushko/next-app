export const bagForm = {

    defaultFormInput: {
        bname: "",
        bvolume: "",
        bweight: ""
    },
    defaultFormDirty: {
        bname: false,
        bvolume: false,
        bweight: false
    },
    defaultSignupErrors: {
        bname: {
            empty: false,
            maxlength: false
        },
        /* bvolume: {
            empty: false,
            notnumeric: false
        },
        bweight: {
            empty: false,
            notnumeric: false
        } */
    },
    formErrorSetter(currentForm, setErrorState){
        Object.entries(currentForm).forEach(([key,val])=>{
            switch(key){
                case 'bname':
                    if(val.length){
                        setErrorState(current=>({
                            ...current,
                            bname: {
                                ...current.bname,
                                empty: false
                            }      
                        }));
                        if(val.length>20){
                            setErrorState(current=>({
                                ...current,
                                maxlength: {
                                    ...current.bname,
                                    maxlength: true
                                }      
                            }));
                        } else {
                            setErrorState(current=>({
                                ...current,
                                maxlength: {
                                    ...current.bname,
                                    maxlength: false
                                }      
                            }));
                        }
                    } else {
                        setErrorState(current=>({
                            ...current,
                            bname: {
                                ...current.bname,
                                empty: true
                            }
                        }));
                    }   
                    break;
                case 'bvolume':
                    //Future feature
                    break;
                case 'bweight':
                    //Future feature
                    break;
            }
        });
    },
    formValidator(errorState, setValidState){
        if(Object.values(errorState.bname).every(k=>k===false))
        {
            setValidState(true);
        }
        else {
            setValidState(false);
        }
    }
};