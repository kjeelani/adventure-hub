import AuthWrapper from '@/components/AuthWrapper';
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from "next/font/google";

export default function Home() {
  return (
    <AuthWrapper>
      <h1>Loading...</h1>
    </AuthWrapper>
  );
}
