export const getRandomImages = async() => {
    try{
        const res = await fetch('https://picsum.photos/v2/list?page=3&limit=6',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if(res.status === 200){
            return {status: 200, data}
        }

        return {status: res.status, data}
    }catch(err){
        console.log(err)
        return {status: 500, data: "Internal Server Error"}
    }
}


export const getUserProjects = async(token) => {

    try{
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/projects`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            }
        
        });
        const data = await res.json();
        if(res.status === 200){
            return {status: 200, data: data.projects}
        }
        return {status: res.status, data}
    }catch(err){
        return {status: 500, data: "Internal Server Error"}
    }
}

export const addProjectData = async(token,project) => {
    try{
        const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/projects`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(project)
        });
        const data = await res.json();
        if(res.status === 201){
            return {status: 201, data}
        }
        return {status: res.status, data}
    }catch(err){
        return {status: 500, data: "Internal Server Error"}
    }
}