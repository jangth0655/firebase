'use client';

import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
  };

  useEffect(() => {
    if (!user || user === null) {
      router.push('/login');
    }
  }, [router, user]);

  return (
    <>
      {user ? (
        <div className="px-10 pt-20">
          <h1 className="text-lg">Home</h1>
          <div className="mt-10 border-2 rounded-xl border-black flex justify-center items-center">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
