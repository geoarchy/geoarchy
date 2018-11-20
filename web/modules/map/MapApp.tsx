import * as React from 'react'

export default ({ children }) => (
    <main>
        {children}
        <style>{`
      * {
        font-family: Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
          'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New',
          monospace, serif;
      }
      body {
        margin: 0;
        padding: 0;
        font-size: 1rem;
      }
    `}</style>
    </main>
)
