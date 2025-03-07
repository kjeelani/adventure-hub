import AuthWrapper from "@/components/AuthWrapper";
import { SignUp } from "@clerk/nextjs";


export default function SignInPage() {
  return (
    <SignUp fallbackRedirectUrl="/" signInUrl="/sign-in"/>
  );
}