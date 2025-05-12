import dynamic from "next/dynamic";
import IssueFormSkeleton from "./list/loading"
import React from 'react'

const IssueForm = dynamic (
    ()=>import('@/app/issues/_components/IssueForm'),
    { ssr:false,
        loading:()=> <IssueFormSkeleton/>   

    });
    
    const NewIssueForm=()=>{
        return(
            <IssueForm/>
        )
    }
    export default NewIssueForm;