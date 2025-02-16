import "../styles/globals.css";

interface MyAppProps {
  Component: React.ElementType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;