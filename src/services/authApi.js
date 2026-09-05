const BASE_URL = 'http://127.0.0.1:8000/api'


export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            phone_number: userData.phone,
            name: userData.name,
        })
    })

    const data = await response.json()

    if (!response.ok) {
        let errorMessage = 'Registration failed.'
        if (typeof data === 'object') {
            const messages = Object.entries(data).map(([key, val]) => {
                const field = key === 'non_field_errors' ? '' : `${key}: `;
                return `${field}${Array.isArray(val) ? val.join(' ') : val}`;
            })
            errorMessage = messages.join(' | ')
        }
        throw new Error(errorMessage)
    }
    return data
}



export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/signin/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
        })
    })
    const data = await response.json()

    if (!response.ok) {
        let errorMessage = 'Login failed.'
        if (data.detail) {
            errorMessage = data.detail
        } else if (typeof data === "object") {
            const messages = Object.entries(data).map(([key, val]) => {
                const field = key === 'non_field_errors' ? '' : `${key}: `;
                return `${field}${Array.isArray(val) ? val.join(' ') : val}`;
            })
            errorMessage = messages.join(" | ")
        }
        throw new Error(errorMessage)

    }
    return data

}
// "email: A user with that email already exists. | password: this password is too short"

