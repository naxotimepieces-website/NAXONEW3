import './globals.css';

export const metadata = {
  title: 'Naxo Timepieces — Curating Moments, One Watch at a Time',
  description: 'Singapore-based neo-vintage watch dealer specializing in timepieces from the 1950s to 1990s. Seiko, Omega, Cartier, Longines, Universal Genève, and more.',
  icons: {
    icon: '/naxo-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
