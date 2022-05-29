import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const initialState = {
   loading: true,
   post: [],
   error:''
}
const reducer = (state, action) => {
   switch(action.type) {
      case 'FETCH_SUCCESS':
         return {
            loading: false,
            post: action.payload,
         }
      case 'FETCH_ERROR':
         return {
            ...state,
            loading: false,
            error: 'Something Wrong!'
         }
      default :
         return state
   }
}

const ItemsDetails = () => {
   const { title } = useParams()

   const[ state, dispatch ] = useReducer(reducer, initialState)
   
   useEffect(()=> {
      axios.get(`https://api.publicapis.org/entries?title=${title}`)
            .then(res =>{
               dispatch({type: 'FETCH_SUCCESS', payload: res.data.entries})
               console.log(res.data.entries)
            })
            .catch(err => {
               dispatch({type: 'FETCH_ERROR'})
            })
   },[title])

  return (
    <>
      {/* {state.loading ? 'Loading...' : state.post.title.map( (element) => {
         <p>{element}</p>
      })} */}

{state.loading && "loading"}
    {state?
     state.post? <div> {state.post[0].Description} </div>
     :<p>not found</p>  : <p>not found</p>}
      {state.error ? state.error : null}
    </>
  )
}

export default ItemsDetails