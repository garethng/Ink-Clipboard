// Page.tsx

import React, {lazy, Suspense} from 'react';
import RootLayout from './layout';
import MainPage from './MainPage/page';


const Page: React.FC = () => {

  return (
    
    <RootLayout>
     <div className="py-[15vh] sm:py-[20vh] flex flex-col items-center justify-center">
      <h1 className="font-medium text-4xl text-black mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
          Cloud Clipboard
        </h1>
      <MainPage></MainPage>
    </div>
      
      
    </RootLayout>
  );
}

export default Page;
