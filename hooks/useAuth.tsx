import { onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { setUserID } from '../redux/authSlice';
import { useAppDispatch } from '../redux/hooks';
export const useAuth = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserID(user.uid))
      }
    })
  }, [dispatch])
}

export default useAuth
