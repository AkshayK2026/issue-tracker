import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { data } from "react-router-dom";
import { issueSchema} from "../../ValidationSchemas";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/auth/authOptions";

export async function POST(Request:NextRequest){
     const session=await getServerSession(authOptions);
     if(!session)
        return NextResponse.json({message:"Unauthorized"},{status:401})
const body=await Request.json();
const validation =issueSchema.safeParse(body);
if(!validation.success)
    return NextResponse.json(validation.error.errors,{status:400})
 const newIssue=await prisma.issue.create({
    data:{title:body.title,description:body.description}
});
return NextResponse.json(newIssue,{status:200})
}