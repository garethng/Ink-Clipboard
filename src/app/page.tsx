// Page.tsx

import React, {lazy, Suspense} from 'react';
import RootLayout from './layout';
import DetailPage from './detail/page';
import Header from '@/component/header';


export default function Home() {
  return (


      <div className = "w-screen h-screen">
        <Header></Header>
        <div className="py-[15vh] sm:py-[20vh] flex flex-col items-center justify-center">

          <DetailPage></DetailPage>

        </div>
      </div>
      

    
      
      

  );
}
