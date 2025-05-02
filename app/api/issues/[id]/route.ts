import { issueSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";
import { NextResponse } from "next/server";
import { string } from "zod";

   export  async function PATCH(
    request:NextResponse,
    {params}:{params:{id:string}}){
          const body=await request.json();
          const validation=issueSchema.safeParse(body);
          if (!validation.success)
            return NextResponse.json(validation.error.format(),{status:400})
        const issue= await prisma.issue.findUnique(
          {where:{id:parseInt(params.id)}});
        if(!issue) 
            return NextResponse.json({error:'Invalid issue'}, {status:200})
        const updatedIssue=await prisma.issue.update({
          where:{ id:issue.id},
          data:{
            title:body.title,
            description:body.description
          }
        });
        return NextResponse.json(updatedIssue)
   }