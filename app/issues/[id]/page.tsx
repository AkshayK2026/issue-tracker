import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import {Pencil2Icon} from '@radix-ui/react-icons'

import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { Card, Flex, Heading, Text,Grid, Box, Button } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface Props {
    params:{id:string}
}
const issueDetailPage = async ({params}:Props) => {
    const issue= await prisma.issue.findUnique({
        where :{id:parseInt(params.id)},
    });
    if(!issue) 
        notFound();
     
    
  return (
   
    <Grid columns={{initial:'1', md:'2'} }gap='5'> 
        <Box>     
        <Heading>{issue.title}</Heading>
         <Flex className='space-x-2'my='2'>
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createAt.toDateString()}</Text> 
        </Flex>
        <Card className='prose' mt='4'>
            <ReactMarkdown >{issue.description}</ReactMarkdown>
        </Card>
        </Box> 
        <Box>
            <Button>
                <Pencil2Icon/>
                <Link href={`/issues ${issue.id}/edit`}>
                    Edit issue
                </Link>
            </Button>
        </Box>
       
        
    </Grid> 
  )
}

export default issueDetailPage