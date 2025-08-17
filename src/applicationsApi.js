export const myApplicationaPromise=(email,accessToken)=>{
    return fetch (`https://iii-school-server.vercel.app/application?email=${email}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    })
}