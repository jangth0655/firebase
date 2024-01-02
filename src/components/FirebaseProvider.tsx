'use client';

import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function FirebaseProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    // firebase init
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return <div>{isLoading ? <div>loading</div> : <main>{children}</main>}</div>;
}
