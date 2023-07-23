import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import ExportIcon from '@/public/assets/images/export.svg';
import ProfileIcon from '@/public/assets/images/profile.svg';
// import william from '@/public/assets/images/william.jpg';
// import { useSelector } from 'react-redux';
import { useAppSelector } from '@/redux/hooks';



const Header = () => {
  const router = useRouter();

  const {data:session, status} = useSession();
  const user = useAppSelector((state) => state.userReducer)
  console.log("Hello" + user.name)

  if(status === 'loading') return <h1>loading...</h1>
  return (
    <header className="shadow-md bg-white flex flex-col xs:flex-row justify-between items-center w-full border-b sm:px-10 px-2 border-gray-500 gap-2">
      <Link href="https://www.improvementai.com" className="flex space-x-2">
        <img
          alt="header text"
          src="/assets/images/image01.jpg"
          className="lg:w-80 lg:h-28 md:w-72 md:h-24 sm:w-64 sm:h-20 w-48 h-16"
          // width={auto}
          // height={24}
        />
      </Link>
      { status !== "authenticated"  && (
        <div
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-600 text-white px-2 py-2 text-sm shadow-md hover:bg-blue-500 bg-blue-600 font-medium transition"
          onClick={
            // ()=>router.push('/signin')
            ()=>signIn('google')
          }// "https://github.com/Nutlope/roomGPT"
          rel="noopener noreferrer"
        >
          <img width="24" height="24" src="https://img.icons8.com/wired/64/FFFFFF/login-rounded-right.png" alt="login-rounded-right"/>
          <p className="sm:block hidden">Sign in</p>
        </div>
      )}
      {status == 'authenticated' && ( 
        <div className='cursor-pointer flex flex-row text-black align-items-center sm:my-auto my-3'>
            {/* <div className='flex space-x-3 flex-nowrap flex-row my-auto mx-3'>
              <b className='mr-5'>You accessed by this email</b>
              <p className='flex text-nowrap'>{user && user.email}</p>
            </div> */}
          <h1 className='flex space-x-3 flex-nowrap flex-row my-auto mx-3'>
            <b>Hi</b>!
            {/* <p className='flex text-nowrap'>William Ding</p> */}
            <p className='flex text-nowrap'>{user && user.name}</p>
          </h1>
          <div
            className="dropdown dropdown-hover dropdown-bottom dropdown-end mr-5 sm:mr-3 flex items-center justify-center rounded-full"
            rel="noopener noreferrer"
          >
            <div className="avatar">
              <div className="w-8 sm:w-12 md:w-16 drop-shadow-md hover:drop-shadow-[0_5px_10px_rgba(0,0,0,0.6)]">
                {/* <Image width={96} height={96} className='mask mask-squircle' src={william} alt=''/>  */}
                <Image width={96} height={96} className='mask mask-squircle' src={(user && user.image)? (user && user.image) : ProfileIcon} alt=''/> 
              </div>
            </div>
            <ul tabIndex={0} className="ease-in dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li 
                onClick={() => 
                  router.push('/')
                }
              >
                <a>
                  <Image src={ProfileIcon} alt="My SVG" width={30} height={30} color='white'/>
                  View Profile
                </a>
              </li>
              <li onClick={() => signOut()}><a>
                <Image src={ExportIcon} alt="My SVG" width={30} height={30} color='white'/>
                Sign out
              </a></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header