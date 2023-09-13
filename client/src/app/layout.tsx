import './globals.css';
import React, { ReactNode } from 'react';
import ThemeRegistry from './ThemeRegistry';
import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import FullLayout from '@/components/FullLayout';
import ReactQuery from '@/components/Provider';
import Recoil from '@/components/Recoil';

// app/layout.js
export default function RootLayout(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <Recoil>
          <ReactQuery>
            <ThemeRegistry options={{ key: 'mui' }}>
              <Header />
              <div className="light">
                <FullLayout>{children}</FullLayout>
              </div>
              {/* <Footer /> */}
            </ThemeRegistry>
          </ReactQuery>
        </Recoil>
      </body>
    </html>
  );
}
