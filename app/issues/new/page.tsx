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

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueForm =z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit ,formState:{errors}} = useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)

  });
  const [error,setError] = useState("")
  const [isSubmitting,setSubmitting]=useState(false);
 

  const onSubmit = async (data: IssueForm) => {
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
      <TextField.Root placeholder="Title" {...register("title")} >

      </TextField.Root>
      { <ErrorMessage > {errors.title?.message}</ErrorMessage>}
      <Controller
        name="description"
        defaultValue=""
        control={control}
        render={({ field }) => (<div>
          <SimpleMDE placeholder="Description" {...field} />
          {<ErrorMessage> {errors.description?.message}</ErrorMessage>}
          </div>
          
        )}
      />
     
      <Button disabled={isSubmitting}>Submit New issue {isSubmitting &&<Spinner/>}</Button>
    </form>
    </div>
  );
};

export default NewIssuePage;
