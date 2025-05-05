'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeleteIssueButton = ({issueId}:{issueId:number}) => {
  const router=useRouter();
  const[error,setError]= useState(false);

  return (
    <>
    <AlertDialog.Root>
		<AlertDialog.Trigger>
    <Button color='red'>Delete Issue</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
    <AlertDialog.Description> Are you Sure to  Delete ? This Action can't be Undone</AlertDialog.Description>
    <Flex mt='4' gap='3'>
    <AlertDialog.Cancel><Button variant='soft' color='gray' >Cancel</Button></AlertDialog.Cancel>
    <AlertDialog.Action><Button color='red' onClick={async()=>{
      try {
        await axios.delete('/api/issues/' + issueId) ;
       router.push('/issues');
       router.refresh();
        
      } catch (error) {
        setError(true);
        
      }
      }}>
      Delete issue</Button></AlertDialog.Action>
     

    </Flex>
    </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>This  issue error could be deleted</AlertDialog.Description>
    
      </AlertDialog.Content>
    </AlertDialog.Root>
    </>
   
  )
}

export default DeleteIssueButton

// function useState(arg0: boolean): [any, any] {
//   throw new Error('Function not implemented.')
// }
