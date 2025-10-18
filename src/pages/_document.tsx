import { Html, Head, Main, NextScript } from "next/document";



export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Favicon e ícones */}
        <link rel="icon" href="/favicon.png" type="image/png"  />
        <link rel="apple-touch-icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png"  />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
