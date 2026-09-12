import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Life RPG - Gamify Your Productivity & Habit Progression',
  description: 'Transform daily routines into an epic role-playing quest system with instant XP, equipment drops, level-ups, and attribute mastery.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
