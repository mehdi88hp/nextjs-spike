import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setUser, fetchUserByJwt } from "../store/auth/authSlice";
import Router from "next/router";
import { NextResponse, NextRequest } from 'next/server'

export const useAuthOnFront = function () {
  const dispatch = useDispatch();

  const loadedUser = useSelector(state => state.auth.user);

  useEffect(() => {

    if (!loadedUser) {
      dispatch(fetchUserByJwt()).then(r => {
        console.log('we have error', r.error)

        if (r.error && r.error.code && typeof window != 'undefined' && Router.route != '/auth/login') {
          Router.push({
            pathname: '/auth/login',
          })
        }
      }).catch(err => {
        console.log('salam', err)
      })
    } else {
      console.log(loadedUser, 'loadeduser')
    }

  }, [])

  return useSelector(selectAuthState)
}