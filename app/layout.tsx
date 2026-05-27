import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tractor Haven | Next.js + Three.js',
  description: 'Cinematic Interactive Tractor Experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
