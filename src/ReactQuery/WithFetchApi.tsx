import { FC, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

export const WithFetchApi: FC<{ username: string }> = ({ username }) => {
  const [name, setName] = useState('')

  const { error } = useQuery({
    queryKey: ['queryWithFetch', username],
    queryFn: async ({ signal }) => {
      const data = await fetch(`https://api.github.com/users/${username}`, { signal })
      return data.json()
    },
    onSuccess: (data) => {
      if (data?.name) {
        setName(data.name)
      }
    },
    onError: () => {
      console.log('8', error)
    },
    refetchOnWindowFocus: false,
  })

  return (
    <div>
      <span>
        {error ? (
          'Something went wrong.'
        ) : (
          <>
            <b>with Fetch and AbortSignal: </b>
            {name}
          </>
        )}
      </span>
    </div>
  )
}

export default WithFetchApi
