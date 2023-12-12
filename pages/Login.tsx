import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { SignInToAccount, auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import TextInput from '../components/userInput/TextInput';
import MainButton from '../components/Buttons/MainButton';

const Login: NextPage<{}> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        router.push('/');
      }
    });
    return unsubscribe;
  }, [router]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - Form fields */}
      <div className="flex flex-col justify-center w-1/2 p-12 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Title */}
          <h1 className="text-4xl font-bold text-blue-600 mb-8">Employee Login</h1>

          <TextInput
            placeHolder="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            widthPercentage="w-full"
            type="email"
            value={email}
          />
          <TextInput
            placeHolder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            widthPercentage="w-full"
            type="password"
            value={password}
          />
          <p
            onClick={() => router.push('/ForgotPassword')}
            className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm mb-6"
          >
            Forgot Password?
          </p>
          <MainButton
            buttonText="Sign In"
            onClick={() => SignInToAccount({ email, password })}
            buttonWidth="w-full mb-4"
          />
          <MainButton
            buttonText="Patient Login"
            onClick={() => router.push('/PatientLogin')}
            buttonWidth="w-full"
          />
        </div>
      </div>

      {/* Right side - Logo and Gradient */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-300 relative">
        <Image
          alt="AMA"
          src="/American Medical Associates.png"
          width={400} // Adjusted size
          height={200} // Adjusted size
          priority // Load the image immediately
        />
      </div>
    </div>
  );
};

export default Login;
