import * as React from 'react'

export default ({ message }) => (
  <aside>
    {message}
    <style>{`
            aside {
                padding: 1.5em;
                font-size: 14px;
                color: white;
                background-color: red;
            }
        `}</style>
  </aside>
)
