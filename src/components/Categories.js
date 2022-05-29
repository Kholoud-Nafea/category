import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';


const initialState = {
   loading: true,
   post: {},
   error: ''
}

const reducer = (state, action) => {
   switch(action.type) {
      case 'FETCH_SUCCESS':
         return {
            loading: false,
            post: action.payload,
            error: ''
         }
      case 'FETCH_ERROR':
         return {
            loading: false,
            post: {},
            error: 'Something Wrong!'
         }
      default :
         return state
   }
}

const Categories = () => {
   const navigate = useNavigate()
   const [category, setCategory] = useState('')
   
   const handelClick = (category) => {
      setCategory(category)
      navigate(`/test/${category}`)
   
   }


   const[state, dispatch] = useReducer(reducer, initialState)
   useEffect(() => {
      axios.get('https://api.publicapis.org/categories')
            .then(res => {
               dispatch({type: 'FETCH_SUCCESS', payload: res.data})
               console.log(res.data.categories)
            })
            .catch(err => {dispatch({type: 'FETCH_ERROR'})
            })
           console.log(category)
   }, [category])
  return (
     <>
             <Row>
             {state.loading ? 'loading' : state.post.categories.map((element, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}> 
              <Link to={`/test/${element}`} onClick={()=>handelClick(element)}>{element}</Link>
              </Col>
            ))}
               {state.error ? state.error : null}

          </Row>
 </>
  )
}

export default Categories