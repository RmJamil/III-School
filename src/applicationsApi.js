export const myApplicationaPromise=(email,accessToken)=>{
    return fetch (`http://localhost:3000/application?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    })
}