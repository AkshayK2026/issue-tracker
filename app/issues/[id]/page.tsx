import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

import React from 'react'
import loadingIssuePageDetails from './loadignissue';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown'

interface Props {
    params:{id:string}
}
const issueDetailPage = async ({params}:Props) => {
    const issue= await prisma.issue.findUnique({
        where :{id:parseInt(params.id)}
    });
    if(!issue)
        notFound();
    
  return (
   
    <div>
        <Heading>{issue.title}</Heading>
         <Flex className='space-x-2'my='2'>
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createAt.toDateString()}</Text> 
        </Flex>
        <Card className='prose' mt='4'>
            <ReactMarkdown >{issue.description}</ReactMarkdown>
        </Card>
       
        
    </div>
  )
}

export default issueDetailPage