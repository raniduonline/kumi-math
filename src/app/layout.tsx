import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Fredoka } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fredoka = Fredoka({ 
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '1st Grade Math Gap Finder',
  description: 'Help your 1st grader master essential math skills by identifying and addressing learning gaps.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fredoka.variable}`}>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
} 