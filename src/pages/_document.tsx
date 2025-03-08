import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <title>DND Hub</title>
            <meta name="description" content="Your all-in-one DND experience" />
            <meta name="keywords" content="DND" />
            <meta property="og:title" content="DND Hub" />
            <meta property="og:description" content="Your all-in-one DND experience" />
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
