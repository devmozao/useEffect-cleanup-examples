import { FC, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Axios from '@/Axios'
import Fetch from '@/FetchApi'
import ReactQuery from '@/ReactQuery'

import './index.css'

export const App: FC = () => {
  const queryClient = new QueryClient()

  const [show, setShow] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <main>
        <div className="container">
          <div className="content">
            <div className="centralizer">
              <div>
                <h1 className="title">Request Examples</h1>
                <p>
                  with <b className="fetch">Fecth API</b>, <b className="axios">Axios</b> and{' '}
                  <b className="reactQuery">ReactQuery</b>
                </p>
              </div>

              <div>
                <button className="button" onClick={() => setShow(!show)}>
                  {show ? 'Hide Response' : 'Show Response'}
                </button>
              </div>
            </div>

            {show && (
              <div className="fetchBorder applyMargin">
                <Fetch.Correct username="foo" />
                <Fetch.Wrong username="bar" />
              </div>
            )}

            {show && (
              <div className="axiosBorder applyMargin">
                <Axios.WithAbortController username="foo" />
                <Axios.WithCancelToken username="bar" />
                <Axios.Wrong username="foobar" />
              </div>
            )}

            {show && (
              <div className="reactQueryBorder applyMargin">
                <ReactQuery.WithFetchApi username="foo" />
                <ReactQuery.WithAxios username="bar" />
              </div>
            )}
          </div>
        </div>
      </main>
    </QueryClientProvider>
  )
}

export default App
