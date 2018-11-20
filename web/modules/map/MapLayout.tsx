import * as React from 'react'

import Head from 'next/head'

interface LayoutProps {
    title: String
    children: React.ReactNode
}

const MapLayout: React.SFC<LayoutProps> = ({
    children,
    title = 'This is the default title',
}) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        {children}
    </div>
)

export default MapLayout
