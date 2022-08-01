import { FC, useEffect, useState } from 'react'

import axios from 'axios'

export const Wrong: FC<{ username: string }> = ({ username }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then(({ data }) => setName(data.name))
      .catch((err) => {
        console.log('5', err)
        setError(true)
      })
  }, [username])

  return (
    <div>
      <span>
        {error ? (
          'Something went wrong.'
        ) : (
          <>
            <b>without cleanup: </b>
            {name}
          </>
        )}
      </span>
    </div>
  )
}

export default Wrong
