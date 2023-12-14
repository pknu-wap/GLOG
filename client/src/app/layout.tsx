import './globals.css';
import React, { ReactNode } from 'react';
import Recoil from '@/components/Recoil/Recoil';
import ThemeRegistry from '@/components/ReactQuery/ThemeRegistry';
import ReactQuery from '@/components/ReactQuery/Provider';
import Header from '@/components/Layout/Header';
import FullLayout from '@/components/Layout/FullLayout';

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
            </ThemeRegistry>
          </ReactQuery>
        </Recoil>
      </body>
    </html>
  );
}
