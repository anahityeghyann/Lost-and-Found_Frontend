// import { date } from "react-i18next/icu.macro"

const BASE_URL = 'http://127.0.0.1:8000/api'


export const registerUser = async (formData) => {
    const response = await fetch(`${BASE_URL}/register/`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',

        // },
        body: formData
        // userData JSON.stringify({
        //     email: userData.email,
        //     password: userData.password,
        //     phone_number: userData.phone,
        //     name: userData.name,
    })
    // })

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
    if (formData.email) data.append('email', formData.email)
    if (formData.phone) data.append('phone_number', formData.phone)
    if (formData.location) data.append('location', formData.location)
    if (formData.avatar) data.append('avatar', formData.avatar)

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

export const getImageUrl = (url) => {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
    }
    return `http://127.0.0.1:8000${url}`
}


export const updateItemStatus = async (hashCode, status, token) => {
    const response = await fetch(`${BASE_URL}/items/${hashCode}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
        let errorMessage = 'Failed to update item status.';
        if (data.detail) {
            errorMessage = data.detail;
        } else if (typeof data === 'object') {
            const messages = Object.entries(data).map(([key, val]) => {
                return `${key}: ${Array.isArray(val) ? val.join(' ') : val}`;
            });
            errorMessage = messages.join(' | ');
        }
        throw new Error(errorMessage);
    }

    return data;
};


export const deleteUserItems = async (hashCode, token) => {
    // 1. URL-ի վերջում ավելացրել ենք / (Django URL-ները սովորաբար ավարտվում են /-ով)
    const response = await fetch(`${BASE_URL}/items/${hashCode}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
    });

    // 2. Եթե հարցումը հաջողվել է (HTTP Status 200, 204 և այլն)
    if (response.ok) {
        // Եթե սերվերը 204 No Content է վերադարձրել (դատարկ է), տալիս ենք հաջողության հաղորդագրություն
        if (response.status === 204) {
            return { message: 'Item deleted successfully' };
        }
        // Եթե այնուամենայնիվ տվյալ է վերադարձրել, parse ենք անում
        return await response.json();
    }

    // 3. Եթե սխալ է տեղի ունեցել, նոր կարդում ենք JSON error-ը
    const data = await response.json().catch(() => ({})); // catch-ը ապահովության համար է, եթե error body-ն էլ դատարկ լինի

    let errorMessage = 'Failed to delete item.';
    if (data.detail) {
        errorMessage = data.detail;
    } else if (typeof data === 'object' && Object.keys(data).length > 0) {
        const messages = Object.entries(data).map(([key, val]) => {
            return `${key}: ${Array.isArray(val) ? val.join(' ') : val}`;
        });
        errorMessage = messages.join(' | ');
    }

    throw new Error(errorMessage);
};


export const updateUserItems = async (hashCode, updatedData, token) => {
    const response = await fetch(`${BASE_URL}/items/${hashCode}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok) {
        let errorMessage = 'Failed to update item.';
        if (data.detail) {
            errorMessage = data.detail;
        } else if (typeof data === 'object') {
            const messages = Object.entries(data).map(([key, val]) => {
                return `${key}: ${Array.isArray(val) ? val.join(' ') : val}`;
            });
            errorMessage = messages.join(' | ');
        }
        throw new Error(errorMessage);
    }

    return data;
}