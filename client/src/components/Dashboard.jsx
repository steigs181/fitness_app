import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavMenu from '../components/NavMenu'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'




const Dashboard = () => {
    const [user, setUser] = useState({ favoriteWorkouts: [] });
    const [workouts, setWorkouts] = useState([]);
    
    useEffect( () => {
      axios.get("http://localhost:8000/api/getWorkouts")
        .then( res => {
          console.log(res.data)
          setWorkouts(res.data)
        })
        .catch (err => {
          console.log(err)
        })
    },[])

    useEffect( () => {
        axios.get("http://localhost:8000/api/getUser", {withCredentials: true})
            .then( res => {
              console.log(res.data)
              setUser(res.data)
            })
            .catch( err => {
                console.log(err);
            })
    }, [])

    const handleFavorite = (workoutId) => {
      const selectedWorkout = workouts.find(workout => workout._id === workoutId);

  if (selectedWorkout) {
    if (user && user.favoriteWorkouts) {
      if (!user.favoriteWorkouts.includes(selectedWorkout.name)) {

        const updatedFavorites = [...user.favoriteWorkouts, selectedWorkout.name];
        axios
          .patch(`http://localhost:8000/api/updateUser/${user._id}`, {
            favoriteWorkouts: updatedFavorites
          })
          .then((res) => {
            setUser(prevUser => ({
              ...prevUser,
              favoriteWorkouts: updatedFavorites
            }));
          })
          .catch((err) => {
            console.error("Error adding workout to favorites:", err);
          });
      } else {
        console.log("Workout is already in favorites.");
      }
    } else {
      console.error("User or favoriteWorkouts is undefined or not properly initialized.");
    }
  }
  }

    const handleDelete = (workoutId) => {
      axios.delete(`http://localhost:8000/api/deleteWorkout/${workoutId}`)
        .then( res => {
          console.log(res)
          const newWorkoutList = workouts.filter( (workout) => {
            return( workout._id !== workoutId)
          });
          setWorkouts(newWorkoutList)
        })
        .catch( err => {
          console.log(err)
        })
    }



  return (
    <Container fluid className='custom-container'>
      <NavMenu />
      <h1>Workouts!</h1>
      <Row className='row-1'>
        <Col className='col-1'>
          <Card style={{ height: "40rem"}} className='workout-card' >
            <Card.Title className='workout-title' style={{ color: 'black'}}>
              <h2>Post a workout you like!</h2>
              <Link to='/workout/add'><FontAwesomeIcon icon={faPlus} style={{color: "#000000",}} /></Link>
            </Card.Title>
            <Card.Body className='workout-body'>
              <ListGroup>
              {
                workouts.map( (workout, index) => {
                  return (
                        <ListGroup.Item className='workout-text' key={workout._id}>
                        <Link to={`/workout/${workout._id}`} style={{color: '#6240b8'}}>{workout.name}</Link>
                        <span>
                          <Link onClick={ () => handleFavorite(workout._id)} ><FontAwesomeIcon icon={faStar} style={{color: "#000000",}} />   </Link>
                          <Link onClick={ () => handleDelete(workout._id)}><FontAwesomeIcon icon={faTrashCan} style={{color: "#000000",}} /></Link>
                        </span>
                        </ListGroup.Item>
                  )
                })
              }
              </ListGroup>
              </Card.Body>
          </Card>
        </Col>
        <Col className='col-2'>
          <Card>
            <Card.Title style={{ color: "black" }}>Favorite</Card.Title>
            <Card.Body>
              <ListGroup>
                {
                  user.favoriteWorkouts.map( (favWorkout, idx) => {
                    return (
                      <ListGroup.Item key={favWorkout._id}>{favWorkout}</ListGroup.Item>
                    )
                  })
                }
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  
  )
}

export default Dashboard