import { useLoginUser } from '../hooks/useLoginUser';
import { useMessage } from './useMesssge';
import { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useCallback } from 'react';

import { User } from './../types/api/user';

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false)

  const login = useCallback((id: string) => {
    setLoading(true);

    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id} `).then((res) => {
      if (res.data) {
        const isAdmin = res.data.id === 10 ? true : false;
        setLoginUser({ ...res.data, isAdmin });
        showMessage({ title: "ログインしました", status: "success" })
        history.push('/home')
      } else {
        showMessage({ title: "ユーザーが見つかりません", status: "error" })
        setLoading(false);
      }
    })
      .catch(() => {
        showMessage({ title: "ログインできません", status: "error" });
        setLoading(false);
      });
  }, [history, setLoginUser, showMessage]);
  return { login, loading }
}