'use client';

import './globals.css';
import React, { ReactNode } from 'react';
import ThemeRegistry from './ThemeRegistry';
import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import FullLayout from '@/components/FullLayout';
import { RecoilRoot } from 'recoil';
import Providers from '@/components/Provider';

// app/layout.js
export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <Providers>
          <RecoilRoot>
            <ThemeRegistry options={{ key: 'mui' }}>
              <Header />
              <div className="light">
                <FullLayout>{children}</FullLayout>
              </div>
              {/* <Footer /> */}
            </ThemeRegistry>
          </RecoilRoot>
        </Providers>
      </body>
    </html>
  );
}
