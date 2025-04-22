const API_BASE_URL = 'http://localhost:3001/api';


export const getComments = async(postId) =>{
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments?sortValue=asc`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    } catch (error) {
        console.error('ERROR FETCHING COMMENTS: ',error);
        throw error
    }
};

export const deleteComment = async(postId,commentId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    } catch (error) {
        console.error('ERROR DELETING COMMENT: ',error)
        throw error;
    }
}