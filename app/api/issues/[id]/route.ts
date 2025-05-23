import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";




   export  async function PATCH(
    request:NextResponse,
    {params}:{params:{id:string}}){
       const session=await getServerSession(authOptions);
     if(!session)
        return NextResponse.json({message:"Unauthorized"},{status:401})
          const body=await request.json();
          const validation=issueSchema.safeParse(body);
          if (!validation.success)
            return NextResponse.json(validation.error.format(),{status:400})
        const issue= await prisma.issue.findUnique(
          { where:{id:parseInt(params.id)}});
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
   export  async function DELETE(
    request:NextResponse,
    {params}:{params:{id:string}}){
       const session=await getServerSession(authOptions);
     if(!session)
        return NextResponse.json({message:"Unauthorized"},{status:401})
      
      const issue=await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
      });
      if(!issue)
        return NextResponse.json({error:"Invalid issue"},{status:404})
       await prisma.issue.delete({
        where:{id:issue.id}
      });
      return NextResponse.json({message:"issue is delete sucessfully"});

    }


// function delay(arg0: number) {
//   throw new Error("Function not implemented.");
// }
// // function delay(arg0: number) {
// //   throw new Error("Function not implemented.");
// // }
