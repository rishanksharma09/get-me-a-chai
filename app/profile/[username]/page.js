"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import PaymentPage from '../../components/PaymentPage'

const page = () => {
  const params = useParams()
  return (
    <div>
      <PaymentPage username={params.username} />
    </div>
  )
}

export default page
