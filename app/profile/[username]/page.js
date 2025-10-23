"use client"
import React, { use, useState,useEffect} from 'react'
import { useParams } from 'next/navigation'
import PaymentPage from '../../components/PaymentPage'
import { getuserfromusername } from '@/actions/useractions'
import NoUser from '../../components/NoUser'

const Page = () => {
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
    <div>
      {userData && <PaymentPage username={params.username} />}
      {!userData && <NoUser />}
    </div>
  )
}

export default Page
