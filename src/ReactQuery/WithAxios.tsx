import { FC, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const WithFetchApi: FC<{ username: string }> = ({ username }) => {
  const [name, setName] = useState('')

  const { error } = useQuery({
    queryKey: ['queryWithFetch', username],
    queryFn: async ({ signal }) => {
      const result = await axios.get(`https://api.github.com/users/${username}`, { signal })
      return result.data
    },
    onSuccess: (data) => {
      if (data?.name) {
        setName(data.name)
      }
    },
    onError: () => {
      console.log('7', error)
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
            <b>with Axios and AbortSignal: </b>
            {name}
          </>
        )}
      </span>
    </div>
  )
}

export default WithFetchApi
