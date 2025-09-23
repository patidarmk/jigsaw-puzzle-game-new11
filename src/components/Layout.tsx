import React from 'react';
import { Header } from './Header';
import { MadeWithApplaa } from './made-with-applaa';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <MadeWithApplaa />
    </div>
  );
};