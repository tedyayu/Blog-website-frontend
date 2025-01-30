import React,{useEffect,useState} from "react"; 
import {fetchPosts, createComment} from "../api";

const Home=()=>{
    const [posts,setPosts] = useState([]);
    const [commentTexts, setCommentTexts] = useState({});

    useEffect(()=>{
        const getPosts=async ()=>{
            try {
                const data=await fetchPosts();
                setPosts(data)
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
            
        };
        getPosts();
    },[]);

    const handleCommentChange = (postId, value) => {
        setCommentTexts((prev) => ({ ...prev, [postId]: value }));
    };

    const handleCommentSubmit=async (postId)=>{
        const commentText = commentTexts[postId] || "";
        if (!commentText.trim()) return;

        await createComment(postId, commentText);
        alert("Comment created!");

        setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
    };

    return(
        <div className="container mt-4">
                <h1>All Blog Posts</h1>
                {posts.map((post) => (
                    <div key={post.id} className="card mb-4">
                        <img src={post.photo || "/default-image.jpg"} className="card-img-top" alt={post.title} />
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.content}</p>
                            <p className="text-muted">Created By: {post.author?.username || "Unknown Author"}</p>
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Write a comment"
                                    id={`comment-${post.id}`}
                                    value={commentTexts[post.id] || ""}
                                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                />
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={() =>
                                        handleCommentSubmit(post.id)
                                    }
                                >
                                    Submit 
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
)
}

export default Home;


