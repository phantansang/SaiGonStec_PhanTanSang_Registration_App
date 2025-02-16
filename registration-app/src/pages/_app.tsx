import "../styles/globals.css";

interface MyAppProps {
  Component: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;