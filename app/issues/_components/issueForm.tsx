'use client';
import { Button, TextField, Callout, Spinner } from '@radix-ui/themes';
import ErrorMessage from '@/app/components/ErrorMessage';
import dynamic from 'next/dynamic'; 
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/ValidationSchemas';
import {z} from 'zod';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueFormData =z.infer<typeof createIssueSchema>;


const IssueForm = ({issue}:{issue?:Issue}) => {
  const router = useRouter();

  const { register, control, handleSubmit ,formState:{errors}} = useForm<IssueFormData>({
    resolver:zodResolver(createIssueSchema)

  });
  const [error,setError] = useState("")
  const [isSubmitting,setSubmitting]=useState(false);
 

  const onSubmit = async (data: IssueFormData) => {
    try {
      setSubmitting(true)
      await axios.post("/api/issues", data);
      router.push("/issues");
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
     
      <Button disabled={isSubmitting}>Submit New issue {isSubmitting &&<Spinner/>}</Button>
    </form>
    </div>
  );
};

export default IssueForm;
