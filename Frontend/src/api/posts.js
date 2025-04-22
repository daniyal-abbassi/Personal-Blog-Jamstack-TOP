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
export const deletePost = async(postData) => {
    try {
        const response = await 
    } catch (error) {
        console.error('ERROR DELETE POST',error);
        throw error;
    }
}
//EDIT POST API