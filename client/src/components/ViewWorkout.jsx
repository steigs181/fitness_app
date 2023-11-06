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

const ViewWorkout = () => {
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

    useEffect( () => {
        axios.get(`http://localhost:8000/api/getOneWorkout/${id}`)
            .then( res => {
                console.log(res.data)
                setName(res.data.workout.name)
                setEquipment(res.data.workout.equipment)
                setExercise_type(res.data.workout.exercise_type)
                setForce_type(res.data.workout.force_type)
                setMechanics(res.data.workout.mechanics)
                setPrimary_muscles(res.data.workout.primary_muscles)
                setSecondary_muscles(res.data.workout.secondary_muscles)
                setComments(res.data.workout.comments)

            })
            .catch (err => {
                console.log(err)
            })
        }, [])
        
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
            axios.patch(`http://localhost:8000/api/updateWorkout/${id}`, workout)
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
                    <Card.Title style={{color: "#444554", height: '20px', margin: '10px'}}>{name}</Card.Title>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Equipment: </Form.Label>
                                <Form.Control
                                type="text"
                                value={equipment}
                                onChange={(e) => setEquipment(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Exercise Type: </Form.Label>
                                <Form.Control
                                type="text"
                                value={exercise_type}
                                onChange={(e) => setExercise_type(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Force Type: </Form.Label>
                                <Form.Control
                                type="text"
                                value={force_type}
                                onChange={(e) => setForce_type(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>mechanics: </Form.Label>
                                <Form.Control
                                type="text"
                                value={mechanics}
                                onChange={(e) => setMechanics(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Primary Muscles: </Form.Label>
                                <Form.Control
                                type="text"
                                value={primary_muscles}
                                onChange={(e) => setPrimary_muscles(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Secondary Muscles: </Form.Label>
                                <Form.Control
                                type="text"
                                value={secondary_muscles}
                                onChange={(e) => setSecondary_muscles(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Comments: </Form.Label>
                                <Form.Control
                                as="textarea"
                                value={comments}
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

export default ViewWorkout