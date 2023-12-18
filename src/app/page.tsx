// Page.tsx

import React, {lazy, Suspense} from 'react';
import RootLayout from './layout';
import MainPage from '@/component/MainPage';
const Page: React.FC = () => {

  return (
    <RootLayout>
      
      <MainPage></MainPage>
      
    </RootLayout>
  );
}

export default Page;
