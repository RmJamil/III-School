import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase.init';
export const AuthContext =createContext();
import { IoIosStar } from 'react-icons/io';

const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);   
const [ratings,setRating]=useState(null);
const[rateColor,setColor]=useState(null);
const[loading,setLoading]=useState(true);


const createUser=(email,password)=>{
    setLoading(false);
   return createUserWithEmailAndPassword(auth, email, password)
}


useEffect(()=>{
    const unSubscribe=onAuthStateChanged(
        auth,(currentUser)=>{
            setUser(currentUser);
             setLoading(false);
             console.log(currentUser);
        }
    );
    return ()=>{
        unSubscribe();
    }
},[]);

const logout=()=>{
     setLoading(true);
    return signOut(auth);
}
const googleSignIn=(provider)=>{
     setLoading(false);
    return signInWithPopup(auth,provider);
}

const signIn=(email,password)=>{

    return signInWithEmailAndPassword(auth, email, password);
}

const updateUser=(updateData)=>{
    return updateProfile(auth.currentUser, updateData);
}






const Rate = () => {
   
    
    return (
        <div className='flex'>
            {[...Array(5)].map((star,index)=>{
                const currentRate=index+1;
                return(
                    <>
                    <label>
                        <input type='radio'className='hidden'  name="rate" value={currentRate} onClick={()=>setRating(currentRate)}/> 
                        <IoIosStar className='mr-4' size={50} color={currentRate <=(rateColor || ratings)? "red":"gray"}  />
                        
                    </label>
                    </>
                )
            })}
        </div>
    );
};
// console.log(ratings)





const authData={
    user,setUser,createUser,logout,signIn,googleSignIn,updateUser,ratings,loading
}


    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;