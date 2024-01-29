import { useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup, FloatingLabel, Spinner } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import supabase from './SupabaseClient.js';
import { useNavigate } from 'react-router-dom';
import "./app.css";

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
        <div className="login-container"> 
            <Container className="p-5 my-3">
                <Card className="card-container"> 
                    <Row>
                        <Col md='6'><Card.Img src='login.jpg' className='card-img'/></Col>
                        <Col md='6'>
                            <Card.Body className='card-body'>
                                <span className="card-title">Roby Regal Rides</span>
                                <h5 className="my-4 pb-3 card-subtitle">"Examine new and used automobile prices offered by authorized dealers in the Philippines"</h5>
                                <h5 className="my-4 pb-3">Sign in to your account</h5>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><FaUserAlt className="input-group-icon" /></InputGroup.Text>
                                    <FloatingLabel label="Username">
                                        <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com" />
                                    </FloatingLabel>    
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><RiLockPasswordFill className="input-group-icon" /></InputGroup.Text>
                                    <FloatingLabel label="Password">
                                        <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                                    </FloatingLabel>
                                </InputGroup>
                                <Row className="g-2">
                                    <Col sm={4}>
                                        <FloatingLabel label="Login as :">
                                            <Form.Select value={userType} onChange={(e)=>setUserType(e.target.value)} aria-label="Floating label select example" className="form-select">
                                                <option value="customer">Customer</option>
                                                <option value="dealer">Dealer</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <Button onClick={handleClick} variant="dark" className="login-button">
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
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
}

export default Login;
