import AuthWrapper from "@/components/AuthWrapper";
import { SignIn } from "@clerk/nextjs";


export default function SignInPage() {
  return (
    <SignIn fallbackRedirectUrl="/" signUpUrl="/sign-up"/>
  );
}