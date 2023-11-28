'use client';

import './globals.css';
import React, { ReactNode } from 'react';
// import Footer from '@/components/Footer';
import Recoil from '@/components/Recoil/Recoil';
import ThemeRegistry from '@/components/ReactQuery/ThemeRegistry';
import ReactQuery from '@/components/ReactQuery/Provider';
import Header from '@/components/Layout/Header';
import FullLayout from '@/components/Layout/FullLayout';
import { usePathname } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';

export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;
  const pathname = usePathname();

  return (
    <html lang="en">
      <Head>
        <title>GLOG</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="블로그를 작성해보세요!" />
      </Head>
      <body>
        <Recoil>
          <SnackbarProvider>
            <ReactQuery>
              <ThemeRegistry options={{ key: 'mui' }}>
                {!pathname.startsWith('/login') && <Header />}
                <div className="light">
                  <FullLayout>{children}</FullLayout>
                </div>
                {/* <Footer /> */}
              </ThemeRegistry>
            </ReactQuery>
          </SnackbarProvider>
        </Recoil>
      </body>
    </html>
  );
}
