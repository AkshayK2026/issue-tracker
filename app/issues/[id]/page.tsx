import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

import { Box, Flex, Grid } from '@radix-ui/themes';
import EditissueButton from './EditIssueButton';
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth/next';


interface Props {
    params:{id:string}
}
const issueDetailPage = async ({ params }: Props) => {
  const session=await getServerSession(authOptions);
  const id = parseInt(params.id); // safely extract first
  const issue = await prisma.issue.findUnique({
    where: { id},
  }); 


    if(!issue) 
        notFound();
     
    
  return (
    
    <Grid columns={{initial:'1', sm:'5'} }gap='5'> 
        <Box className=' md:col-span-4'>     
        <IssueDetails issue={issue}/>
        </Box> 
        { session &&<Box>
          <Flex direction="column" gap='4'>
            
                <EditissueButton issueId={issue.id}/>
                <DeleteIssueButton issueId={issue.id}/>
            
         </Flex>
         </Box>}
            
        
       
        
    </Grid> 
  )
}

export default issueDetailPage