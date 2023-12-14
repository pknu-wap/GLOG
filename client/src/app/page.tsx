import { useRouter } from 'next/navigation';

function Collect() {
  const router = useRouter();
  router.replace('/i/flow/login');

  return null;
}

export default Collect;
