// import useSWR from "swr";
import axios from "axios";
// https://javascript.plainenglish.io/how-to-implement-user-authentication-in-next-js-2929ea94493a

export default function useUser(passport_cookie = null) {
  const config = {withCredentials: true}

  passport_cookie ? config.headers = {
      Cookie: `passport_cookie=${passport_cookie};`
    }
    : null;

  return new Promise((resolve, reject) => {
    const {data} = axios.post('http://admin.last6.local/auth/me', {}, config).then(r => {
      resolve({
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