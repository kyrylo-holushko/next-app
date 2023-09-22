import { useRouter } from "next/router"
import { Form } from "react-bootstrap";
import { passwordForm } from "../../lib/form/uservalidators";
import { resetPassword } from "../../lib/ajax/user";

export default function PasswordReset() {

    const router = useRouter();
    const { token } = router.query;
    //const { id } = router.query;

    const [form, setForm] = useState(passwordForm.defaultFormInput);
    const [dirty, setDirty] = useState(passwordForm.defaultFormDirty);
    const [errors, setErrors] = useState(passwordForm.defaultSignupErrors);

    const [valid, setValid] = useState(false);

    const [responded, setResponded] = useState(false);
    const [resMsg, setResMsg] = useState("");

    useEffect(()=>{
        if(Object.values(dirty).some(k=>k===true)) {
            passwordForm.formErrorSetter(form, setErrors);
        }
    }, [form]);

    useEffect(()=>{
        passwordForm.formValidator(errors, setValid);
    }, [errors]);

    useEffect(()=>{
        if(resMsg.length)
            setResponded(true);
    }, [resMsg]);

    useEffect(()=>{
        setValid(false);
    },[]);

    /* const handleClose = () => {
        setShow(false);
        setForm(signupForm.defaultFormInput);
        setErrors(signupForm.defaultSignupErrors);
        setDirty(signupForm.defaultFormDirty);
        setResponded(false);
        setResMsg("");
    } */

    async function submitForm(e) {
        if(valid){
            resetPassword(form, token).then(res=>{
                setResMsg(`${res.message}: ${res.data.username}`);
            }).catch(e=>{setResMsg(e.message)});
        }      
    }

    if (token && id) {
        return (
            <>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>                                                                                    
                        <Form.Control 
                            type="password"                                                                 
                            onChange={e=>{
                                if(!dirty.password){
                                    setDirty(current=>({
                                    ...current,
                                    password: true
                                    }));
                                } 
                                setForm(current=>({ 
                                ...current,
                                password: e.target.value
                            }))}} 
                            value={form.password}
                            isInvalid={dirty.password && (errors.password.empty || errors.password.minlength)}                                                     
                        /> 
                        <Form.Text className="error">
                            {dirty.password && errors.password.empty && "Required Field"}
                            {dirty.password && errors.password.minlength && "Minimum 8 characters"}
                        </Form.Text>                                                                         
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>                                                                                   
                        <Form.Control 
                            type="password"                                                                   
                            onChange={e=>{
                                if(!dirty.passwordConfirmed){
                                    setDirty(current=>({
                                    ...current,
                                    passwordConfirmed: true
                                    }));
                                } 
                                setForm(current=>({ 
                                ...current,
                                passwordConfirmed: e.target.value
                            }))}} 
                            value={form.passwordConfirmed} 
                            isInvalid={dirty.passwordConfirmed && (errors.passwordConfirmed.empty || errors.passwordConfirmed.minlength || errors.passwordConfirmed.notMatching)}                                                      
                        />
                        <Form.Text className="error">
                            {dirty.passwordConfirmed && errors.passwordConfirmed.empty && "Required Field"}
                            {dirty.passwordConfirmed && errors.passwordConfirmed.minlength && "Minimum 8 characters"}
                            {dirty.passwordConfirmed && errors.passwordConfirmed.minlength && errors.passwordConfirmed.notMatching && <br/>}
                            {dirty.passwordConfirmed && errors.passwordConfirmed.notMatching && "Passwords entered do not match"}
                        </Form.Text>                                                       
                    </Form.Group>
                </Form>
                <Button variant="primary" type="button" onClick={submitForm} disabled={!valid}>
                    Reset Password
                </Button>
            </>
        )
    } else {
        return <h3>Reset token and/or User Id Parameters Missing</h3>
    }
};