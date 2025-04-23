import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { data } from "react-router-dom";
import { createIssueSchema } from "../../ValidationSchemas";

export async function POST(Request:NextRequest){
const body=await Request.json();
const validation =createIssueSchema.safeParse(body);
if(!validation.success)
    return NextResponse.json(validation.error.errors,{status:400})
 const newIssue=await prisma.issue.create({
    data:{title:body.title,description:body.description}
});
return NextResponse.json(newIssue,{status:200})
}