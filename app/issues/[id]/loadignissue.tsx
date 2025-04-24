import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ReactMarkdown from 'react-markdown'

const loadingIssuePageDetails = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton/>
     <Flex className='space-x-2'my='2'>
          <Skeleton width='5rem'/>
          <Skeleton width='7rem'/>
      </Flex>
    <Card className='prose' mt='4'>
           <Skeleton count={3}/>
    </Card>
   
    
</Box>
  )
}

export default loadingIssuePageDetails