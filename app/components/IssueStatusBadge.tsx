import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes';
import React from 'react'
interface props{
    status:Status
}
const statusMap:Record<Status,{label:string ,color:'red' |'violet' |'green'}>={
   OPEN:{label:'open',color:'red'},
   IN_PROGRESS:{label:' IN_PROGERESS',color:'violet'},
   CLOSED:{label:'closed',color:'green'} 
};


const IssueStatusBadge = ({status}:props) => {
   
  return (
<Badge color={statusMap[status].color}>
    {statusMap[status].label}
</Badge>
  )
}

export default IssueStatusBadge