import { BASE_URL } from '@/config';
import { getAllUsers } from '@/config/redux/action/authAction';
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'

import { useRouter } from 'next/router';
export default function Discover() {
  const authState=useSelector((state)=>state.auth);
  const dispatch=useDispatch()
  useEffect(()=>{
  
    if(!authState.all_profiles_fetched){
            dispatch(getAllUsers())
    }
  },[])
  const router=useRouter()
  return (
    <UserLayout>
      <DashboardLayout>
        <h1>Discover</h1>
        <div className={styles.userProfilePicture}>
              {authState.all_profiles_fetched && authState.all_users.map((user)=>{
                       return(
                        <div onClick={()=>{
                           router.push(`/view_profile/${user.userId.username}`)
                        }} key={user.id} className={styles.UserCard}>
                          <img  className={styles.usercard_image} src={`${BASE_URL}/${user.userId.profilePicture}`} alt="profile picture"/>
                          <div>
                        <h2>{user.userId.name}</h2>
                        <p>@{user.userId.username}</p>
                            </div>

                        </div>
                       )
              })
            
              }
        </div>
      </DashboardLayout>
    </UserLayout>
  )
}
