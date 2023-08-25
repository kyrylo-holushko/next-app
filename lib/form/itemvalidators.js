export const itemForm = {

    defaultFormInput: {
        iname: "",
        idesc: "",
        image: "",
        ivolume: "",
        iweight: "",
        priority: "",
        bid: ""
    },
    defaultFormDirty: {
        iname: false,
        idesc: false,
        image: false,
        ivolume: false,
        iweight: false,
        priority: false
    },
    defaultSignupErrors: {
        iname: {
            empty: false,
            maxlength: false
        },
        idesc: {
            maxlength: false
        },
        priority: {
            notNumericAndWhole: false,
            minMax: false,
        }
    },
    formErrorSetter(currentForm, setErrorState){
        Object.entries(currentForm).forEach(([key,val])=>{
            switch(key){
                case 'iname':
                    if(val.length){
                        setErrorState(current=>({
                            ...current,
                            iname: {
                                ...current.iname,
                                empty: false
                            }      
                        }));
                        if(val.length>50){
                            setErrorState(current=>({
                                ...current,
                                iname: {
                                    ...current.iname,
                                    maxlength: true
                                }      
                            }));
                        } else {
                            setErrorState(current=>({
                                ...current,
                                iname: {
                                    ...current.iname,
                                    maxlength: false
                                }      
                            }));
                        }
                    } else {
                        setErrorState(current=>({
                            ...current,
                            iname: {
                                ...current.iname,
                                empty: true
                            }      
                        }));
                    }   
                    break;
                case 'idesc':
                    if(val.length>=500){
                        setErrorState(current=>({
                            ...current,
                            idesc: {
                                maxlength: true
                            }      
                        }));
                    } else {
                        setErrorState(current=>({
                            ...current,
                            idesc: {
                                maxlength: false
                            }      
                        }));
                    }
                    break;
                case 'priority':
                    if(val.length){
                        console.log('The current priority val before IF/ELSE', val);
                        if(Number.isInteger(+val)){
                            console.log('The current priority val in IF', val);
                            setErrorState(current=>({
                                ...current,
                                priority: {
                                    ...current.priority,
                                    notNumericAndWhole: false
                                }      
                            }));
                            if(val<1||val>10) {
                                setErrorState(current=>({
                                    ...current,
                                    priority: {
                                        ...current.priority,
                                        minMax: true
                                    } 
                                }));
                            } else {
                                setErrorState(current=>({
                                    ...current,
                                    priority: {
                                        ...current.priority,
                                        minMax: false
                                    } 
                                }));
                            }
                        } else {
                            console.log('The current priority val in ELSE', val);
                            setErrorState(current=>({
                                ...current,
                                priority: {
                                    notNumericAndWhole: true,
                                    minMax: false
                                }      
                            })); 
                        }
                    } else {
                        setErrorState(current=>({
                            ...current,
                            priority: {
                                notNumericAndWhole: false,
                                minMax: false
                            }      
                        }));
                    }
                    break;
            }
        });
    },
    formValidator(errorState, setValidState){
        if(Object.values(errorState.iname).every(k=>k===false) &&
           Object.values(errorState.idesc).every(k=>k===false) &&
           Object.values(errorState.priority).every(k=>k===false))
        {
            setValidState(true);
        }
        else {
            setValidState(false);
        }
    }
};