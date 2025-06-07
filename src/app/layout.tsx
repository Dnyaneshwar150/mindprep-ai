 import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { PropsWithChildren } from 'react';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

 export default function RootLayout(props:PropsWithChildren) {
   const { children } = props;
   return (
   <html lang="en" className={roboto.variable}>
       <body>
<AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
              {children}
        </ThemeProvider>
          </AppRouterCacheProvider>
       </body>
     </html>
   );
 }