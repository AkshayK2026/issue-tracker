import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'


const loadingNewissuePage = () => {
  return (
    <Box>
      <Skeleton/>
      <Skeleton height='8rem'/>
      
    </Box>
  )
}

export default loadingNewissuePage