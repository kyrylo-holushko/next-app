import { Button, Modal, Form } from "react-bootstrap";
import { useContext, useState } from 'react';
import { SetShowSignupContext } from "./Navigation";
//import { useForm, Controller } from "react-hook-form";

export default function Signup(props){

    const setShow = useContext(SetShowSignupContext);

    const defaultForm = {
        username: "",
        email: "",
        password: "",
        passwordConfirmed: ""
    };

    const handleClose = () => {
        setForm(defaultForm);
        setShow(false);
    }

    const [form, setForm] = useState(defaultForm);

    //const { register, handleSubmit, control, getValues } = useForm();

    /* const { setError, handleSubmit, control, reset, formState: {errors}, setValue, getValues } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirmed: ""
        },
    }); */


    async function submitForm(e) {
        console.log("The form's data", form);
    }

    /* const handleSubmit = async (e) => {
        console.log('Hi');
        e.preventDefault();
        console.log(e.target);
    } */

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e=>submitForm(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>                                                                                     
                        <Form.Control 
                            type="text"
                            onChange={e=>setForm(current=>({ 
                                ...current,
                                username: e.target.value
                            }))} 
                            value={form.username}                 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>                                                                                                             
                        <Form.Control 
                            type="email" 
                            onChange={e=>setForm(current=>({ 
                                ...current,
                                email: e.target.value
                            }))} 
                            value={form.email}                                                            
                        />                                                                                  
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>                                                                                    
                        <Form.Control 
                            type="password"                                                                       
                            onChange={e=>setForm(current=>({ 
                                ...current,
                                password: e.target.value
                            }))} 
                            value={form.password}                                                        
                        />                                                                            
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>                                                                                   
                        <Form.Control 
                            type="password"                                                                       
                            onChange={e=>setForm(current=>({ 
                                ...current,
                                passwordConfirmed: e.target.value
                            }))} 
                            value={form.passwordConfirmed}                                                        
                        />                                                          
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" type="button" onClick={submitForm}>
                Sign Up
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
{/* <Form.Label>User Name</Form.Label>
<Form.Control type="text"/> 

<Form.Label>Email</Form.Label>
<Form.Control type="email" placeholder="name@example.com" />

<Form.Label>Password</Form.Label>
<Form.Control type="text"/>


<Form.Label>Confirm Password</Form.Label>
<Form.Control type="text"/>

<Form.Text className="text-muted">Don't forget it!!</Form.Text> 
*/}


{/* <Form onSubmit={handleSubmit(submitForm)}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>User Name</Form.Label>                                                         
                        <Controller control={control} name="username"                                            
                            defaultValue=""                                                                        
                            render={({ field: { onChange, value, ref } }) => (                             
                                <Form.Control 
                                    type="text"
                                    onChange={setValue('username', value)} 
                                    value={value} 
                                    ref={ref}                            
                                    isInvalid={errors.username}
                            />)} />                                                                         
                        <Form.Control.Feedback type="invalid">                                                     
                            {errors.username?.message}                                                               
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>                                                             
                            <Controller control={control} name="email"                                               
                            defaultValue=""                                                                        
                            render={({field: {onChange, value, ref}}) => (                                 
                                <Form.Control 
                                    type="email" 
                                    onChange={setValue('email', value)} 
                                    value={value} 
                                    ref={ref}                
                                    isInvalid={errors.email}                                                             
                                />)} />                                                                                  
                        <Form.Control.Feedback type="invalid">                                                     
                            {errors.email?.message}                                                                  
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>                                                          
                        <Controller control={control} name="password"                                            
                        defaultValue=""                                                                        
                        render={({ field: { onChange, value, ref } }) => (                             
                            <Form.Control 
                                type="password"                                                                       
                                onChange={setValue('password', value)} 
                                value={value}
                                ref={ref}                           
                                isInvalid={errors.password}                                                          
                            />                                                      
                        )} />                                                                                  
                                                   
                        <Form.Control.Feedback type="invalid">                                                     
                            {errors.password?.message}                                                               
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordConfirmed">
                    <Form.Label>Confirm Password</Form.Label>                                                          
                        <Controller control={control} name="passwordConfirmed"                                           
                        defaultValue=""                                                                        
                        render={({ field: { onChange, value, ref } }) => (                             
                            <Form.Control 
                                type="password"                                                                       
                                onChange={setValue('passwordConfirmed', value)} 
                                value={value} 
                                ref={ref}                           
                                isInvalid={errors.password}                                                          
                            />                                                      
                        )} />     

                        <Form.Control.Feedback type="invalid">                                                     
                            {errors.password?.message}                                                               
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form> */}