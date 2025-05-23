import { IssueStatusBadge } from '@/app/components'

import { Heading, Flex, Card ,Text} from '@radix-ui/themes'
import { Issue } from '@prisma/client';

import React from 'react'
import ReactMarkdown from 'react-markdown'

const issueDetails = ({issue}:{issue:Issue}) => {
  return (
    <>
    <Heading>{issue.title}</Heading>
         <Flex className='space-x-2'my='2'>
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text> 
        </Flex>
        <Card className='prose max-w-full' mt='4'>
            <ReactMarkdown >{issue.description}</ReactMarkdown>
        </Card>
    </>
  )
}

export default issueDetails