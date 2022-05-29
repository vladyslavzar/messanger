import React, { FC, useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuidV4} from 'uuid';

interface LoginProps {
    onIdSubmit(id: string): void
}

const Login: FC<LoginProps> = ({onIdSubmit}) => {
    const idRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: React.FormEvent): void => {
        e.preventDefault();

        const inptVal = idRef.current!.value;

        onIdSubmit(inptVal);
    }

    const createNewId = (): void => {
        onIdSubmit(uuidV4());
    }

    return (
        
            <Container className="align-items-center d-flex" style={{ height: '100vh'}}>
                <Form className="w-100" onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Enter Your ID</Form.Label>
                        <Form.Control type="text" ref={idRef} required/>
                    </Form.Group>
                    <Button type="submit" style={{
                        marginRight: '10px',
                        marginTop: '10px',
                        }}>Login</Button>
                    <Button
                        variant="secondary"
                        onClick={createNewId}
                        style={{
                            marginTop: '10px'
                        }}>Create A New ID</Button>
                </Form>
            </Container>
        
    )
}

export default Login;