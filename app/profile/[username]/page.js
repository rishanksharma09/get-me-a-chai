"use client"
import React, { use, useState,useEffect} from 'react'
import { useParams } from 'next/navigation'
import PaymentPage from '../../components/PaymentPage'
import { getuserfromusername } from '@/actions/useractions'
import NoUser from '../../components/NoUser'
import NoLogin from '../../components/NoLogin'
import { useSession } from 'next-auth/react'

const Page = () => {
  const { data: session } = useSession();
  
  const params = useParams()
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getuserfromusername(params.username)
      setUserData(data)
    }
    fetchUserData()
  }, [params.username])
  return (
    <>
    {!session && <NoLogin />}
      {session && (
        <div>
          {userData && <PaymentPage username={params.username} />}
          {!userData && <NoUser />}
        </div>
      )}
    </>
  )
}

export default Page
