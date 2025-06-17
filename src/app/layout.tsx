
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { PropsWithChildren } from 'react';
import './globals.css'; 

import { ReduxProvider } from './providers/ReduxProvider';
import Navbar from '@/Components/Navbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

 export default function RootLayout(props:PropsWithChildren) {
   const { children } = props;
   return (
   <html lang="en" className={poppins.variable}>
       <body>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
             <ReduxProvider>  
               <Navbar />  
              {children}
            </ReduxProvider>
        </ThemeProvider>
          </AppRouterCacheProvider>
       </body>
     </html>
   );
 }