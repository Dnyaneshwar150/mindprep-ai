
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { PropsWithChildren } from 'react';
import { Analytics } from "@vercel/analytics/next"
import './globals.css';

import { ReduxProvider } from './providers/ReduxProvider';
import Navbar from '@/Components/Navbar';
import DocsBanner from '@/Components/DocsBanner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <ReduxProvider>
              <Navbar />
              <DocsBanner />
              {children}
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <Analytics />
      </body>
    </html>
  );
}