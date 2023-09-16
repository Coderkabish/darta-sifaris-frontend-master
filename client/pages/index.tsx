import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';
import { HttpRequest } from '../lib/HttpRequest';

// eslint-disable-next-line max-len
const HomePage: NextPageWithLayout = () => {
    const router = useRouter();
    //check if admin exists of not
    useEffect(() => {
        // if session is undefined then redirect it to the login page
        HttpRequest.get('api/user/check-admin').then(res => {
            if (res?.data?.message === 'Admin exists') {
                router.push('auth/login');
            } else {
                router.push('/setup');
            }
        });
    }, []);

  return (
      <>
          <Head>
              <title>Darta Chalani Sifaris</title>
              <meta name="description" content="Darta Chalani Sifaris" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
      </>
  );
};

export default HomePage;
