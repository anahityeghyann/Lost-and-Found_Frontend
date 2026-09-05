const BASE_URL = 'http://127.0.0.1:8000/api'

// async, await
export async function fetchItems(category = '', itemType = '', search){
    const params = new URLSearchParams()
    if (category) {
        params.append('category', category)
    }
    if (itemType) {
        params.append('item_type', itemType)
    }
    if (search) {
        params.append('search', search)
    }

    const queryString = params.toString() ? `?${params.toString()}` : ''

    const response = await fetch(`${BASE_URL}/items/${queryString}`)
    if(!response.ok){
        throw new Error('Failed to fetch items from backend.')
    }

    const data = await response.json()
    return Array.isArray(data) ? data : data.results || []
}

export async function fetchItemByHash(hash) {
    const response = await fetch(`${BASE_URL}/items/${hash}/`)
    if(!response.ok){
        throw new Error(`Failed to fetch item #${hash}`)
    }
    return await response.json()
}

export async function createItem({form, itemType, photos}){
    const formData = new FormData()
    Object.keys(form).forEach((key) => {
        if(form[key] !== null && form[key] !== undefined){
            formData.append(key, form[key])
        }
    })
    formData.append("itemType", itemType)
    photos.forEach((photoFile) => {
        formData.append("photos", photoFile)
    })

    const response = await fetch(`${BASE_URL}/items/`, {
        method: 'POST',
        body: formData
    })

    const data = await response.json()
    if(!response.ok){
        throw {status: response.status, data}
    }
    return data
}