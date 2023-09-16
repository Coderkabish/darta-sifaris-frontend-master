import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from './Loading';

const Redirect = ({ to } : { to: string }) => {
  const Router = useRouter();
  useEffect(() => {
    Router.push(to).then();
  }, [to]);
  return <Loading />;
};

export default Redirect;
