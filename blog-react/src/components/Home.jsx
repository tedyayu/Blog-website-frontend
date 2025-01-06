import React,{useEffect,useState} from "react"; 
import {fetchPosts, createComment} from "../api";

const Home=()=>{
    const [posts,setPosts] = useState([{id:1,photo:"eee",title:'ttt',description:"i love u",userName:"tedy"}]);

    useEffect(()=>{
        const getPosts=async ()=>{
            const data=await fetchPosts();
            setPosts(data)
        };
        getPosts();
    },[]);

    const handleCommentSubmit=async (postId,commentText)=>{
        await createComment(postId,{text:commentText});
        alert("comment created!");
    };

    return(
        <div className="container mt-4">
                <h1>All Blog Posts</h1>
                {posts.map((post) => (
                    <div key={post.id} className="card mb-4">
                        <img src={post.photo} className="card-img-top" alt={post.title} />
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.description}</p>
                            <p className="text-muted">By: {post.userName}</p>
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Write a comment"
                                    id={`comment-${post.id}`}
                                />
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={() =>
                                        handleCommentSubmit(
                                            post.id,
                                            document.getElementById(`comment-${post.id}`).value
                                        )
                                    }
                                >
                                    Submit Comment
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
)
}

export default Home;


