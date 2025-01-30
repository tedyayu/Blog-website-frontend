import React, { useState, useEffect } from "react";
import { fetchPosts, createPost, publishPost, unpublishPost, deletePost, editPost } from "../api";

const CreatePost = () => {
    const [formData, setFormData] = useState({ title: "", content: "", published: false });
    const [posts, setPosts] = useState([]);
    const [editMode, setEditMode] = useState({ status: false, postId: null });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(Array.isArray(data) ? data : []);
                setPosts(data);
            } catch (err) {
                setError("Failed to load posts.");
                setPosts([]);
            }
        };
        loadPosts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            const newPost = await createPost(formData);
            setPosts([...posts, newPost]);
            setFormData({ title: "", content: "", published: false });
            setSuccess("Post created successfully!");
        } catch (err) {
            setError("Failed to create post.");
        }
    };

    const handlePublish = async (postId) => {
        try {
            await publishPost(postId);
            setPosts(posts.map((post) => (post.id === postId ? { ...post, published: true } : post)));
        } catch (err) {
            setError("Failed to publish post.");
        }
    };

    const handleUnpublish = async (postId) => {
        try {
            await unpublishPost(postId);
            setPosts(posts.map((post) => (post.id === postId ? { ...post, published: false } : post)));
        } catch (err) {
            setError("Failed to unpublish post.");
        }
    };

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (err) {
            setError("Failed to delete post.");
        }
    };

    const handleEdit = (postId) => {
        console.log("Editing post with ID:", postId, posts);
        
        const post = posts.find((p) => p.id === postId);
        setFormData({ title: post.title, content: post.content, published: post.published });
        setEditMode({ status: true, postId });
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        try {
            const updatedPost = await editPost(editMode.postId, formData);
            setPosts(posts.map((post) => (post.id === editMode.postId ? updatedPost : post)));
            setEditMode({ status: false, postId: null });
            setFormData({ title: "", content: "", published: false });
            setSuccess("Post updated successfully!");
        } catch (err) {
            setError("Failed to update post.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>{editMode.status ? "Edit Post" : "Create Post"}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            
            <form onSubmit={editMode.status ? handleUpdatePost : handleCreatePost}>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        className="form-control" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea 
                        name="content" 
                        className="form-control" 
                        value={formData.content} 
                        onChange={handleChange} 
                        required 
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Published?</label>
                    <input 
                        type="checkbox" 
                        className="ml-2" 
                        checked={!!formData.published} 
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })} 
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editMode.status ? "Update Post" : "Create Post"}
                </button>
            </form>

            <h2 className="mt-5">All Posts</h2>
            {
            posts?.length > 0 ? (
                posts.map((post) => (
                <div key={post.id} className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.content}</p>
                        <p className="text-muted">Published: {post.published ? "Yes" : "No"}</p>
                        <div className="d-flex">
                            {!post.published ? (
                                <button className="btn btn-success mr-2" onClick={() => handlePublish(post.id)}>
                                    Publish
                                </button>
                            ) : (
                                <button className="btn btn-warning mr-2" onClick={() => handleUnpublish(post.id)}>
                                    Unpublish
                                </button>
                            )}
                            <button className="btn btn-secondary mr-2" onClick={() => handleEdit(post.id)}>
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>
                                Delete
                            </button>
                        </div>
                        <h6 className="mt-3">Comments</h6>
                        <ul>
                            {post.comments && post.comments.length>0 ?(
                                post.comments.map((comment) => (
                                <li key={comment.id}>{comment.content}</li>
                            ))
                        ):(
                            <li>No comments yet</li>
                        )}
                        </ul>
                    </div>
                </div>
            ))) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default CreatePost;
