import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

function Collect() {
  const router = useRouter();
  router.replace('/i/flow/login');

  return <Fragment></Fragment>;
}

export default Collect;
