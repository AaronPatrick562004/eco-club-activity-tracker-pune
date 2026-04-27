import './globals.css'

export const metadata = {
  title: 'Pune Eco-Club Activity Tracker',
  description: 'Digital platform for Mission LIFE eco-club activities',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
