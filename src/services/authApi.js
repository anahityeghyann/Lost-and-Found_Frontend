// import { date } from "react-i18next/icu.macro"

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



export const fetchUserItems = async (token) => {
    const response = await fetch(`${BASE_URL}/my-items/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
    const data = await response.json()
    if (!response.ok) {
        let errorMessage = 'Failed to fetch user items.'
        if (data.detail) {
            errorMessage = data.detail
        }
        else if (typeof data === 'object') {
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
// "email: A user with that email already exists. | password: this password is too short"

export const updateUserProfile = async (token, formData) => {
    const data = new FormData()
    // email, phone, avatarFile
    if (formData.fullName) data.append('fullName', formData.fullName)
    if (formData.phone) data.append('phone_number', formData.phone)
    if (formData.avatarFile) data.append('avatar', formData.avatarFile)

    const response = await fetch(`${BASE_URL}/profile/update/`,
        {
            method: "PATCH",
            headers: {
                'Authorization': `Token ${token}`
            },
            body: data
        }
    )
    const result = await response.json()
    if (!response.ok) {
        let errorMessage = 'Failed to update profile.';
        if (typeof result === 'object') {
            const messages = Object.entries(result).map(([key, val]) => {
                return `${key}: ${Array.isArray(val) ? val.join(' ') : val}`;
            });
            errorMessage = messages.join(' | ');
        }
        throw new Error(errorMessage);
    }
    return result

}
