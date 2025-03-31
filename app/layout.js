// app/layout.js
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SEO Optimized Blog</title>
      </head>
      <body>
        <Header />  {/* Using the Header component */}
        
        <main>
          {/* This is where the main content from each page will be injected */}
          {children}
        </main>

        <Footer />  {/* Using the Footer component */}
      </body>
    </html>
  );
}
