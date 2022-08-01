import { FC, useEffect, useState } from 'react'

import axios from 'axios'

export const WithCancelToken: FC<{ username: string }> = ({ username }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    axios
      .get(`https://api.github.com/users/${username}`, {
        cancelToken: source.token,
      })
      .then(({ data }) => setName(data.name))
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios: successfully aborted with Cancel Token')
        } else {
          console.log('4', err)
          setError(true)
        }
      })
    return () => {
      source.cancel()
    }
  }, [username])

  return (
    <div>
      <span>
        {error ? (
          'Something went wrong.'
        ) : (
          <>
            <b>with CancelToken: </b>
            {name}
          </>
        )}
      </span>
    </div>
  )
}

export default WithCancelToken
