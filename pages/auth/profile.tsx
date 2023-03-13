import { wrapper } from '../../store';
import { useAuthOnFront } from "../../lib/useAuthOnFront";

const Profile = () => {

  const userState = useAuthOnFront()

  return (
    <h1>asdasd{JSON.stringify(userState)}</h1>
  )
}

Profile.getInitialProps = wrapper.getInitialAppProps(store => async (context): Promise<any> => {
  // if (typeof window !== 'undefined') {
  //   console.log(22123, context)
  //   return store.dispatch(fetchUserByJwt())
  // }
  // console.log(context.req)
})

export default Profile