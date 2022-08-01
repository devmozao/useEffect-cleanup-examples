import { FC, useEffect, useState } from 'react'

export const Correct: FC<{ username: string }> = ({ username }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    fetch(`https://api.github.com/users/${username}`, {
      signal: signal,
    })
      .then((response) => response.json())
      .then((response) => {
        setName(response.name)
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch: successfully aborted')
        } else {
          console.log('2', err)
          setError(true)
        }
      })

    return () => {
      // cancel the request before component unmounts
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

export default Correct
