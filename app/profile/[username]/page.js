  "use client"
  import React, { use, useState,useEffect} from 'react'
  import { useParams } from 'next/navigation'
  import PaymentPage from '../../components/PaymentPage'
  import { getuserfromusername } from '@/actions/useractions'
  import NoUser from '../../components/NoUser'
  import NoLogin from '../../components/NoLogin'
  import { useSession } from 'next-auth/react'
  import Loading from '../../components/Loading'

  const Page = () => {
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    
    const params = useParams()
    const [userData, setUserData] = useState(null)
    useEffect(() => {
      
      const fetchUserData = async () => {
        setLoading(true);
        
        const data = await getuserfromusername(params.username)
        setLoading(false);
        if (!data || Object.keys(data).length === 0) {
          setUserData(null);
        } else {
          setUserData(data);
        }
      }
      fetchUserData()
      
    }, [params.username])
    return (
      <>
      {!session && <NoLogin />}
        {session && (
          <div>
            {loading?<Loading />:userData?<PaymentPage username={params.username} />:<NoUser />}
            
          </div>
        )}
      </>
    )
  }

  export default Page
