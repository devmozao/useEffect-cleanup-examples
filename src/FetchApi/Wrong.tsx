import { FC, useEffect, useState } from 'react'

export const Wrong: FC<{ username: string }> = ({ username }) => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((response) => {
        setName(response.name)
      })
      .catch((err) => {
        console.log('1', err)
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
