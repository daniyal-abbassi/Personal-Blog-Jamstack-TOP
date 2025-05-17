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

//GET A SINGLE POST
export const getPost = async(postId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/post/${postId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error('ERROR TO FETCH POST',response.status)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('ERROR FETCH POSTS',error);
        throw error;
    }
}