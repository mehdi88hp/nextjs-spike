// import useSWR from "swr";
import axios from "axios";
import getConfig from "next/config";
import { NextResponse, NextRequest } from 'next/server'

// https://javascript.plainenglish.io/how-to-implement-user-authentication-in-next-js-2929ea94493a

export default function useUser(payload) {
  const config = {withCredentials: true}
  // console.log('khdofez', payload)
  if (typeof window == "undefined" && payload.req) {
    // console.log(Object.keys(payload.req))
    config.headers = {
      Cookie: payload.req.headers.cookie
      // Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  }

  console.log(111, config)
  return new Promise((resolve, reject) => {
    const {data} = axios.post(getConfig().publicRuntimeConfig.authApi + '/users/profile', {}, config).then(r => {
      resolve({
          r: r,
          user: r.data,
          mutate: '',
          loggedIn: ''
        }
      )
    }).catch(e => {
      reject(e)
    });

  })


}