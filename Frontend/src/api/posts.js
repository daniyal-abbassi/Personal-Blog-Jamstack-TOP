const API_BASE_URL = 'http://localhost:3001/api'


//GET POSTS API
export const getPosts = async(queries = '') => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts?${queries}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error('ERROR TO FETCH POSTS',response.status)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ERROR FETCH POSTS',error);
        throw error;
    }
}
//CREATE POST API
export const createPost = async(postData)=>{
    try {
        const response = await fetch(`${API_BASE_URL}/posts/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
            credentials: 'include'
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error('ERROR FETCH CREATING POST',response.status,errorData?.message)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ERROR CREATE POST',error);
        throw error;
    }
}
//DELETE POST API
export const deletePost = async(postId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/delete/${postId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error('ERROR FETCH DELETE POST',response.status,errorData?.message)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ERROR DELETE POST',error);
        throw error;
    }
}
//EDIT POST API

export const editPost = async(post_id,postData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/edit/${post_id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
            credentials: 'include'
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('ERROR FETCH EDITING POST', response.status, errorData?.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ERROR EDIT POST', error);
        throw error;
    }
}