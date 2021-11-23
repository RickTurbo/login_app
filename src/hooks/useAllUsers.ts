import { User } from './../types/api/user';
import axios from 'axios';
import { useCallback } from 'react';
import { useState } from 'react';
import { useMessage } from "./useMesssge";


export const useAllUsers = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<Array<User>>([])

  const getUsers = useCallback(() => {
    setLoading(true)
    axios
      .get<Array<User>>('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data))
      .catch(() => {
        showMessage({ title: "ユーザーの取得に失敗しました", status: "error" })
      }).finally(() => {
        setLoading(false)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { getUsers, loading, users }
}