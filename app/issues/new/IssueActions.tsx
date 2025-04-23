'use client'
import { Button } from '@radix-ui/themes'
import React from 'react'
import Link  from 'next/link'

const issueActions = () => {
  return (
    <div className='mb-5'>
    <Button>
          <Link href="/issues/new">New Issues</Link>
    </Button>
  </div>
  )
}

export default issueActions