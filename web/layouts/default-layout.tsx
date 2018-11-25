import * as React from 'react'
import link from 'next/link'
import head from 'next/head'

interface LayoutProps {
  title: String
  children: React.ReactNode
}

const DefaultLayout: React.SFC<LayoutProps> = ({
  children,
  title = 'This is the default title',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </nav>
    </header>

    {children}

    <footer>{'I`m here to stay'}</footer>
  </div>
)
export default DefaultLayout
