// import useSWR from "swr";
import axios from "axios";
import getConfig from "next/config";

// https://javascript.plainenglish.io/how-to-implement-user-authentication-in-next-js-2929ea94493a

export default function useUser(passport_cookie = null) {
  const config = {withCredentials: true}

  config.headers = {
    // Cookie: `passport_cookie=${passport_cookie};`
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }

  // console.log(config.headers)
  // console.log(localStorage.getItem('jwt'))
  return new Promise((resolve, reject) => {
    // const {data} = axios.post('http://admin.last6.local/auth/me', {}, config).then(r => {
    const {data} = axios.post(getConfig().publicRuntimeConfig.authApi + '/users/profile', {}, config).then(r => {
      resolve({
          r: r,
          user: r.data,
          mutate: '',
          loggedIn: ''
        }
      )
      // return r
    }).catch(e => {
      reject(e)
    });

  })


}