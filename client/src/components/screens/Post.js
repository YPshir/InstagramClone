import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Post = ()=>{
    const [posti,setPosti] = useState(null)
    const [data,setData]=useState([])
    const {state,dispatch} = useContext(UserContext)
     const {postid} = useParams()
    // const [showFollow,setShowFollow]=useState(state? !state.following.includes(userid):true)
    useEffect(()=>{
        fetch(`/post/${postid}`)
        .then(res=>res.json())
        .then(result=>{
            setPosti(result)
        })
    },[])
    // const likePost = (id)=>{
    //     fetch('/like',{
    //         method:"put",
    //         headers:{
    //            "Content-Type":"application/json",
    //            "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         },
    //         body:JSON.stringify({
    //             postId:id
    //         })
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         console.log(result)
    //         const newData = data.map(item=>{
    //             if (item._id==result._id){
    //                 return result
    //             }else{
    //                 return item
    //             }
    //         })
    //         setData(newData)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }

    // const unlikePost = (id)=>{
    //     fetch('/unlike',{
    //         method:"put",
    //         headers:{
    //            "Content-Type":"application/json",
    //            "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         },
    //         body:JSON.stringify({
    //             postId:id
    //         })
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         console.log(result)
    //         const newData = data.map(item=>{
    //             if (item._id==result._id){
    //                 return result
    //             }else{
    //                 return item
    //             }
    //         })
    //         setData(newData)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }
    
    // const makeComment = (text,postId)=>{
    //     fetch('/comment',{
    //         method:"put",
    //         headers:{
    //             "Content-Type":"application/json",
    //             "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         },
    //         body:JSON.stringify({
    //             postId,
    //             text
    //         })
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         console.log(result)
    //         const newData = data.map(item=>{
    //             if (item._id==result._id){
    //                 return result
    //             }else{
    //                 return item
    //             }
    //         })
    //         setData(newData)
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }

    // const deletePost = (postid)=>{
    //     fetch(`/deletepost/${postid}`,{
    //         method:"delete",
    //         headers:{
    //             "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         }
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         console.log(result)
    //         const newData=data.filter(item=>{
    //             return item._id!==result._id
    //         })
    //         setData(newData)
    //     })
    // }

    return(
        <>

        {/* <h1>{posti.post.title}</h1> */}
        {/* {post? 
             <div className="card home-card" key={postid}> 
             <div className="card-image">
                 <img src={post.photo} />
             </div>
             <div className="card-content">
                 <i className="material-icons" style={{color:"red"}}>favorite</i>
                 {post.likes.includes(post._id)
                 ?
                     <i className="material-icons"
                         onClick={() => { unlikePost(post._id) }}
                     >
                      thumb_down
                     </i>    
                 :
                     <i className="material-icons"
                         onClick={()=>{likePost(post._id)}}
                     >thumb_up</i>
                 }


                 <h6>{post.likes.length} likes</h6>
                 <h6>{post.title}</h6>
                 <p>{post.body}</p>
                 {
                     post.comments.map(record=>{
                         return(
                         <h6 key={record._id}><span style={{fontWeight:"500"}}>@{record.postedBy.name}</span> {record.text}</h6>
                         )
                     })
                 }
                 <form onSubmit={(e)=>{
                     e.preventDefault()
                     makeComment(e.target[0].value,post._id)
                 }}>
                     <input type="text" placeholder="add a comment" />
                 </form>
             </div>
         </div>
        : <h2>LOADING...</h2>} */}

        </>
    )
}

export default Post