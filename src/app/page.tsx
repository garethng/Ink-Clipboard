// Page.tsx

import React, {lazy, Suspense} from 'react';
import RootLayout from './layout';
import MainPage from './MainPage/page';
import Header from '@/component/header';


export default function Home() {
  return (


      <div className = "w-screen h-screen">
        <Header></Header>
        <div className="py-[15vh] sm:py-[20vh] flex flex-col items-center justify-center">

          <MainPage></MainPage>

        </div>
      </div>
      

    
      
      

  );
}
