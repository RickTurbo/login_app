import { User } from './../types/api/user';
import { useState } from 'react';
import { useCallback } from 'react';

type Props = {
  id: number;
  users: Array<User>
  onOpen: () => void;
}

export const useSelectUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onSelectUser = useCallback((props: Props) => {
    const { id, users, onOpen } = props;
    const targetUser = users.find((user) => user.id === id)
    setSelectedUser(targetUser!);
    onOpen()
  }, [])

  return { onSelectUser, selectedUser }
}
