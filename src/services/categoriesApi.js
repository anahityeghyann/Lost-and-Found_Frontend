const BASE_URL = 'http://127.0.0.1:8000/api'

export async function fetchCategories(){
    try{
        const response = await fetch(`${BASE_URL}/categories/`)
        if (!response.ok) {
            throw new Error(`HTTP error! status ${response.status}`);
            
        }
        const data = await response.json()
        return data
    }
    catch (error){
        console.error('Failed to fetch categories:', error)
        throw error
    }
}