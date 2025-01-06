const API_BASE_URL = "http://localhost:5000";

export const fetchPosts=async () =>{
    const response = await fetch(`${API_BASE_URL}/posts`);
    return response.json();
};

export const createComment=async (postId,comment)=> {
    await fetch (`${API_BASE_URL}/posts/${postId}/comments`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(comment),
    })
}

export const registerUser=async (userData)=>{
    const response= await fetch(`${API_BASE_URL}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(userData)
    });
    return response.json();
}

export const loginUser=async (credentials)=>{
    const response=await fetch(`${API_BASE_URL}/login`,{
        method:"POST",
        headers:{
            "ContentType":"application/json"
        },
        body:JSON.stringify(credentials)
    })
    return response.json();
}