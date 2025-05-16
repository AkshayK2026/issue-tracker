'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import { issueSchema } from '@/app/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false } // Disable server-side rendering for this component
);

type IssueFormData =z.infer<typeof issueSchema>;


const IssueForm = ({issue}:{issue?:Issue}) => {
  const router = useRouter();

  const { register, control, handleSubmit ,formState:{errors}} = useForm<IssueFormData>({
    resolver:zodResolver(issueSchema)

  });
  const [error,setError] = useState("")
  const [isSubmitting,setSubmitting]=useState(false);
 

  const onSubmit = async (data: IssueFormData) => {
    try {
      setSubmitting(true);
      if(issue)
        await axios.patch(`/api/issues/${issue.id}`, data);

      else
      await axios.post("/api/issues", data);
      router.push("/issues/list");
    } catch (error) {
      setSubmitting(false)
      setError("the unexcepted error is happend")
    }
  };

  return (
    <div className='max-w-xl '>
    {error && (
  <Callout.Root color="red">

    <Callout.Text>{error}</Callout.Text>
  </Callout.Root>
)}
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root  defaultValue ={issue?.title} placeholder="Title" {...register("title")} >

      </TextField.Root>
      { <ErrorMessage > {errors.title?.message}</ErrorMessage>}
      <Controller
        name="description"
        defaultValue=""
        control={control}
        render={({ field }) => (<div>
          <SimpleMDE   defaultValue ={ issue?.description}placeholder="Description" {...field} />
          {<ErrorMessage> {errors.description?.message}</ErrorMessage>}
          </div>
          
        )}
      />
     
      <Button disabled={isSubmitting}>
        {issue?"Update Issue":"Submit New issue"}{''}
        
 {isSubmitting &&<Spinner/>}</Button>
    </form>
    </div>
  );
};

export default IssueForm;



