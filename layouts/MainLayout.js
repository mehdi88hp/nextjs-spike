import Head from 'next/head';
import Navbar from '../pages/Navbar';

const MainLayout = (props) => (
  <div>
    <Head>
      <title>My Admin Panel</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
    </Head>
    <Navbar/>
    <div className="container mt-4">
      {props.children}
    </div>
  </div>
);

export default MainLayout;