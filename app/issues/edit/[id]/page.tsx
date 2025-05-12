import React from 'react';
import IssueForm from '../../list/IssueForm';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation'; // ✅ Import real notFound

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!issue) notFound(); // ✅ Correctly triggers a 404 page

  return (
    <IssueForm issue={issue} />  // ✅ Pass issue as prop
  );
};

export default EditIssuePage;
