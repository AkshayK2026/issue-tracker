import { Skeleton } from '@/app/components/index'
import { Box, Card, Flex } from '@radix-ui/themes'

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