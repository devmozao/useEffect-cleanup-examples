import { FC, useEffect, useState } from 'react'

import axios from 'axios'

export const WithAbortController: FC<{ username: string }> = ({ username }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    axios
      .get(`https://api.github.com/users/${username}`, {
        signal: signal,
      })
      .then(({ data }) => setName(data.name))
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios: successfully aborted with Abort Controller')
        } else {
          console.log('3', err)
          setError(true)
        }
      })
    return () => {
      controller.abort()
    }
  }, [username])

  return (
    <div>
      <span>
        {error ? (
          'Something went wrong.'
        ) : (
          <>
            <b>with AbortController: </b>
            {name}
          </>
        )}
      </span>
    </div>
  )
}

export default WithAbortController
