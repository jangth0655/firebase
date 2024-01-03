'use client';

import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function FirebaseProvider({ children }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    // firebase init
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, [router]);

  return <div>{isLoading ? <div>loading</div> : <main>{children}</main>}</div>;
}
