import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
    return (
        // <ClerkProvider signInUrl="/sign-in" {...pageProps}>
        <Component {...pageProps} />
        // </ClerkProvider>
    );
}
