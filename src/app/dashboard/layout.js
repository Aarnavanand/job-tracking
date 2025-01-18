import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smart Resume Builder',
  description: 'Build your professional resume and track job applications',
};

export default function RootLayout({ children }) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">
              Please add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to your environment variables
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
              <Navbar />
              <main className="flex-grow">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
