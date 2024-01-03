'use client';

import { auth } from '@/firebase';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateAccount() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'pw') {
      setPw(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    if (name === '' || email === '' || pw === '') {
      setError('이메일, 이름, 패스워드를 입력해주세요.');
      return;
    }
    try {
      setIsLoading(true);
      const credential = await createUserWithEmailAndPassword(auth, email, pw);
      console.log(credential.user);
      await updateProfile(credential.user, {
        displayName: name,
      });
      router.replace('/');
    } catch (e) {
      // error
      if (e instanceof FirebaseError) {
        console.log('error code ', e.code);
        console.log('error message ', e.message);
        setError(e.message);
        return;
      } else {
        setError('서버에 장애가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center w-[420px] py-{50px} m-auto pt-20">
      <h1 className="text-5xl">Join</h1>
      <form onSubmit={onSubmit} className="mt-[50px] flex flex-col gap-[10px] w-full">
        <input
          className="py-[10px] px-[20px] rounded-2xl w-full text-base border-2 border-teal-300"
          name="name"
          onChange={onChange}
          value={name}
          type="text"
          placeholder="Name"
        />
        <input
          className="py-[10px] px-[20px] rounded-2xl w-full text-base border-2 border-teal-300"
          name="email"
          onChange={onChange}
          value={email}
          type="email"
          placeholder="Email"
        />
        <input
          className="py-[10px] px-[20px] rounded-2xl w-full text-base border-2 border-teal-300"
          name="pw"
          onChange={onChange}
          value={pw}
          type="password"
          placeholder="password"
        />

        <button className="cursor-pointer hover:opacity-80 border-2 border-black rounded-xl mt-4 py-2 w-1/2 m-auto">
          {isLoading ? 'Loading..' : '로그인'}
        </button>
      </form>
      {error && error !== '' && <span className="text-red-500 font-semibold mt-6">{error}</span>}
      <div>
        <Link href={'/login'}> Aleady have an account?</Link>
      </div>
    </div>
  );
}
