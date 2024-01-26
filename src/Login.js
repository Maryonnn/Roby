import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup, FloatingLabel, Spinner } from "react-bootstrap";
import { FaCubes } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import supabase from './SupabaseClient.js';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const navigate = useNavigate();

    const validateCustomer = async () => {
        try {
            const { data } = await supabase
                .from('Users_Acc')
                .select('*')
                .eq('email', email)
                .single();

            if (data && data.password === password) {
                console.log('Login successful');
                console.log(data);
                const user = data.user_name;
                localStorage.setItem('user_name', user);
                console.log(user);
                navigate("/userproducts");
            }
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const validateDealer = async () => {
        try {
            const { data } = await supabase
                .from('Dealer_Acc')
                .select('*')
                .eq('email', email)
                .single();

            if (data && data.password === password) {
                const dealer = data.dealer_name;
                localStorage.setItem('dealer_name', dealer);
                navigate("/dealerhome")
            }
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    };

    const handleClick = () => {
        if (userType === "customer") {
            validateCustomer(); 
        } 
        else {
           validateDealer();
        }
        setLoading(true);
    }

    return (
        <div style={{backgroundColor:'#CCB3A3', height:'97vh'}}>
        <Container className="p-5 my-3">
            <Card style={{ padding: '50px 50px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'}}>
                <Row>
                    <Col md='6'>
                        <Card.Img src='bg.jpg' className='rounded-start w-100'/>
                    </Col>
                    <Col md='6'>
                        <Card.Body className='d-flex flex-column'>
                            <div className='d-flex flex-row mt-2'>
                                <FaCubes style={{ color: '#ff6219' }} className="me-3"/>
                                <span className="h1 fw-bold mb-0">Login</span>
                            </div>
                            <h5 className="my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><FaUserAlt /></InputGroup.Text>
                                <FloatingLabel label="Username">
                                    <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" />
                                </FloatingLabel>    
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1"><RiLockPasswordFill/></InputGroup.Text>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                                </FloatingLabel>
                            </InputGroup>
                            <Row className="g-2">
                                <Col sm={4}>
                                    <FloatingLabel label="Login as :">
                                        <Form.Select value={userType} onChange={(e)=>setUserType(e.target.value)} aria-label="Floating label select example">
                                            <option value="customer">Customer</option>
                                            <option value="dealer">Dealer</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <Button onClick={handleClick} variant="dark" style={{width: '341px ', height: '57px', backgroundColor:'#A67B5B', borderColor:'white'}}>
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            Loading...
                                        </>
                                    ) : "Login"}
                                    </Button>
                                </Col>
                            </Row>
                            <p className="mb-5 mt-4">
                                Don't have an account? <a style={{cursor: 'pointer', textDecoration: 'none'}} href="/register">Register</a>
                            </p>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
        </div>
    );
};

export default Login;