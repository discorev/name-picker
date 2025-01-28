import Link from "next/link"
import './globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
    <div>
      <nav className="bg-purple-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Name Picker
          </Link>
          {/* <Link href="/settings" className="hover:underline">
            Settings
          </Link> */}
        </div>
      </nav>
      <main>{children}</main>
    </div>
    </body>
    </html>
  )
}

