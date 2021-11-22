import { useMessage } from './useMesssge';
import { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useCallback } from 'react';

import { User } from './../types/api/user';

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false)

  const login = useCallback((id: string) => {
    setLoading(true);

    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id} `).then((res) => {
      if (res.data) {
        showMessage({ title: "ログインしました", status: "success" })
        history.push('/home')
      } else {
        showMessage({ title: "ユーザーが見つかりません", status: "error" })
      }
    }).catch(() => showMessage({ title: "ログインできません", status: "error" }))
    .finally(() => setLoading(false));
  }, [history, showMessage]);
  return { login, loading }
}