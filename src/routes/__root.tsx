import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import Header from '@/components/Header'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Paper & Ink — Stationery & Study Blog' },
      { name: 'description', content: 'A warm corner of the internet for stationery lovers, bullet journalers, and dedicated students.' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-logo">Paper &amp; <span>Ink</span></div>
            <ul className="footer-nav">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
            <p className="footer-copy">&copy; {new Date().getFullYear()} Paper &amp; Ink. A stationery &amp; study blog.</p>
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  )
}
