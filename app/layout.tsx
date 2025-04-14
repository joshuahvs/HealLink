
import './globals.css';

export const metadata = {
  title: 'HealLink',
  description: 'Aplikasi pemerataan kesehatan di Indonesia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
