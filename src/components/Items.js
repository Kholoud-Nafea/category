import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { Link, useParams, useNavigate } from 'react-router-dom'



const initialState = {
   loading: true,
   post: [],
   error: ''
}

const reducer = (state, action) => {
   switch(action.type) {
      case 'FETCHING_SUCCESS':
         return {
            loading: false,
            post: action.payload,
         }
      case 'FETCHING_ERROR' :
         return {
            ...state,
            loading: false,
            error: 'Somthing wrong!'
         }
      default :
         return state
   }
}

const Items = () => {
   const { category } = useParams()

   const [item, setItem] = useState('')
   const [state, dispatch] = useReducer(reducer, initialState)

   const navigate = useNavigate()

   const handelClick = (item) => {
      setItem(item)
      navigate(`/${item}`)
   }

   useEffect(() => {
      axios.get(`https://api.publicapis.org/entries?category=${category}`)
            ?.then(res => {
               dispatch({type: 'FETCHING_SUCCESS', payload: res.data.entries})
               console.log(res.data.entries) 
            })
            .catch(err => {
               dispatch({type: 'FETCHING_ERROR'})
            })
      console.log(category)
      console.log(item)
   }, [ category, item])

  return (
    <>
    {/* {console.log(state?.post?.entries)}
      {state.loading ? 'Loading...' : (state?.post ) ?
      state?.post.map((element, index) => {
         console.log(element.API);
         //  <Link key={index} to={`/${element}`} onClick={() =>handelClick(element)}>{element}</Link>
         <p>{element.API}</p>
           }) : <p>Not Found </p>}
         {state.error ? state.error : null} */}
    {/* { state.post.entries.map(e => {<div>{e}</div>}) } */}

    {state.loading && "loading"}
    {state?
     state.post? state.post.map((post, index)=><div key={index}> <Link  to={`/details/${post.API}`} onClick={() =>handelClick(post)}>{post.API}</Link> </div>)
     :<p>not found</p>  : <p>not found</p>}
    {state.error ? state.error : null}
    </>
  )
}

export default Items