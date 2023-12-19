// Page.tsx

import React, {lazy, Suspense} from 'react';
import RootLayout from './layout';
import MainPage from './MainPage/page';
const Page: React.FC = () => {

  return (
    <RootLayout>
      
      <MainPage></MainPage>
      
    </RootLayout>
  );
}

export default Page;
