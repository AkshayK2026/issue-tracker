'use client';

import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { User } from '@prisma/client'; 
import {Skeleton} from '@/app/components';

// fetch function outside component
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('/api/users');
  return data;
};

const AssigneeSelect = () => {
  const { data: users = [], isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime:60*100,
    retry:3
  });

  if (isLoading) return <Skeleton/> ;
  if (isError) return <div>Failed to load users.</div>;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value={user.id.toString()}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
