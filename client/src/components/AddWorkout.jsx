import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import NavMenu from '../components/NavMenu'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

const NewWorkout = () => {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [equipment, setEquipment] = useState('');
    const [exercise_type, setExercise_type] = useState('');
    const [force_type, setForce_type] = useState('');
    const [mechanics, setMechanics] = useState('');
    const [primary_muscles, setPrimary_muscles] = useState('');
    const [secondary_muscles, setSecondary_muscles] = useState('');
    const [comments, setComments] = useState('');
    const navigate = useNavigate();

        
        const handleSubmit = (e) => {
            e.preventDefault()
            const workout = {
                name,
                equipment,
                exercise_type,
                force_type,
                mechanics,
                primary_muscles,
                secondary_muscles,
                comments
            }
            axios.post(`http://localhost:8000/api/createWorkout`, workout)
            .then( (res) => {
                console.log(res)
                navigate("/dashboard")
            })
            .catch( err => {
                console.log(err.res.data.err.errors)
                setError(err.res.data.err.errors)
            })
    }

  return (
    <Container fluid className='custom-container'>
        <NavMenu />
        <Row className='view-row'>
            <Col className='view-col-1'>
                <Card className='view-card' >
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            
                            <Form.Group>
                                <Form.Label>Name: </Form.Label>
                                <Form.Control
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Equipment: </Form.Label>
                                <Form.Control
                                type="text"
                                onChange={(e) => setEquipment(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Exercise Type: </Form.Label>
                                <Form.Control
                                type="text"
                                onChange={(e) => setExercise_type(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Force Type: </Form.Label>
                                <Form.Control
                                type="text"
                                onChange={(e) => setForce_type(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>mechanics: </Form.Label>
                                <Form.Control
                                type="text"
                                onChange={(e) => setMechanics(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Primary Muscles: </Form.Label>
                                <Form.Control
                                type="text"
                                onChange={(e) => setPrimary_muscles(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Secondary Muscles: </Form.Label>
                                <Form.Control
                                type="text"
                                onChange={(e) => setSecondary_muscles(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Comments: </Form.Label>
                                <Form.Control
                                as="textarea"
                                onChange={(e)=> setComments(e.target.value)}
                                style={{height: '100px'}}
                                />
                            </Form.Group>
                            <Button className="mt-2" type="submit">Save</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default NewWorkout