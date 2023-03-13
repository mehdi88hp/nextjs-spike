import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setUser, fetchUserByJwt } from "../store/auth/authSlice";
import Router from "next/router";

export const useAuthOnFront = function () {
  const dispatch = useDispatch();

  const loadedUser = useSelector(state => state.auth.user);

  useEffect(() => {

    if (!loadedUser) {
      dispatch(fetchUserByJwt()).then(r => {
        console.log('salam1', r.error)
        if (r.error && r.error.code) {
          Router.push({
            pathname: '/auth/login',
          })
        }
      }).catch(err => {
        console.log('salam', err)
      })
    }

  }, [])

  return useSelector(selectAuthState)
}