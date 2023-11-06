import React, { useState } from 'react'
import NavMenu from './NavMenu'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
          firstName,
          lastName,
          email,
          password,
          confirmPassword
        }
        axios.post("http://localhost:8000/api/register", user, {withCredentials: true})
            .then(res => {
              console.log(res.data)
            })
            .catch((err) => {
              console.log(err)
              const errResponse = err.response.data.errors;
              const errorArr = []
              for (const key of Object.keys(errResponse)) {
                errorArr.push(errResponse[key].message);
              }
              setErrors(errorArr);
            })
    }
  return (
    <Container className='custom-container' fluid>
      <NavMenu />
      <Row > 
        <Col>
          <Card 
            style={{width: '40rem'}}
            bg='dark'
            id='card-main'
            >
              <Card.Title className='text-decoration-underline fw-bold'>Register!</Card.Title>
              <Card.Body className='m-3'>
                {errors.map((err, index) => (
                  <p className='error-text' key={index}>{err}</p>
                ))}
                <Form onSubmit={handleSubmit}>
                  <Form.Floating className='m-4'>
                    <Form.Control
                      
                      id='floatingInputCustom'
                      type='text'
                      placeholder='John'
                      onChange={ e => setFirstName(e.target.value) }
                    />
                    <label htmlFor="floatingInputCustom">First Name</label>
                  </Form.Floating>
                  <Form.Floating className='m-4'>
                    <Form.Control
                      
                      id='floatingInputCustom'
                      type='text'
                      placeholder='Doe'
                      onChange={ e => setLastName(e.target.value) }
                    />
                    <label htmlFor="floatingInputCustom">Last Name</label>
                  </Form.Floating>
                  <Form.Floating className='m-4'>
                    <Form.Control
                      
                      id='floatingInputCustom'
                      type='text'
                      placeholder='johndoe@email.com'
                      onChange={ e => setEmail(e.target.value) }
                    />
                    <label htmlFor="floatingInputCustom">Email</label>
                  </Form.Floating>
                  <Form.Floating className='m-4'>
                    <Form.Control
                      
                      id='floatingInputCustom'
                      type='password'
                      onChange={ e => setPassword(e.target.value) }
                    />
                    <label htmlFor="floatingInputPassword">Password</label>
                  </Form.Floating>
                  <Form.Floating className='m-4'>
                    <Form.Control
                      
                      id='floatingInputCustom'
                      type='password'
                      onChange={ e => setConfirmPassword(e.target.value) }
                      />
                    <label htmlFor="floatingInputPassword">Confirm Password</label>
                  </Form.Floating>
                  
                  <Button className='m-4 btn-lg ' variant="primary" type="submit">
                    Create Account</Button>
                </Form>
              </Card.Body>
            </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register