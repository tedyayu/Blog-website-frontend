const API_BASE_URL = "http://localhost:5000";

export const fetchPosts=async () =>{
    const response = await fetch(`${API_BASE_URL}/api/posts`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.json();
};

export const createPost=async (formData)=>{
    const token = localStorage.getItem("authToken");
    console.log("Stored Token:",token)

    if (!token) {
        throw new Error("No authentication token found");
    }
    try {
        const response = await fetch (`${API_BASE_URL}/api/posts`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(formData)
        });
        const data = await response.json();
        console.log("Create Post Response:", data);
        return data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
    
}

export const createComment=async (postId,comment)=> {
    await fetch (`${API_BASE_URL}/api/comments`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({postId,comment})
    })
}

export const publishPost= async (postId)=>{
    const token = localStorage.getItem("authToken");
    await fetch (`${API_BASE_URL}/api/posts/publish`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({postId})
    })
}

export const unpublishPost= async (postId)=>{
    const token = localStorage.getItem("authToken");
    await fetch (`${API_BASE_URL}/api/posts/unpublish`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({postId})
    })
}


export const deletePost= async (postId)=>{
    await fetch (`${API_BASE_URL}/api/posts/${postId}/delete`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        }
    })
}

export const editPost=async (postId,formData)=>{
    await fetch (`${API_BASE_URL}/api/posts/${postId}/update`,{
        method :"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
}

export const registerUser=async (username, email, password)=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({username, email, password})
    });
    return response.json();
}

export const loginUser=async (credentials)=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
    })
    return response.json();
}

