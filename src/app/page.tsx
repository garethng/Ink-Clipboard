// Page.tsx

import React, {lazy, Suspense} from 'react';
import RootLayout from './layout';
import App from '@/component/mainframe';
import type { NextPage } from 'next';

import axios, { isCancel, AxiosError } from 'axios';
import { CircularProgress } from "@nextui-org/react";


axios.defaults.baseURL = 'https://c3951w0dl3.execute-api.us-east-1.amazonaws.com/demo';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

async function fetchClipboardItems() {
    return axios.get('/get_clipboard?userid=123&method=query').then((response) => {
        console.log(response);
        return response.data;
    });
}

const Page: React.FC = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    // const OtherComponent = React.lazy(() => import('./component/mainframe'));
  return (
    <RootLayout>
      <App />
      
    </RootLayout>
  );
}

export default Page;
