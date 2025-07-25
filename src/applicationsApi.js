export const myApplicationaPromise=(email,accessToken)=>{
    return fetch (`https://edu-manage-server-chi.vercel.app/application?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    })
}