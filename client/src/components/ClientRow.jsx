import { FaTrash } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from './mutations/clientMutations'
import { GET_CLIENTS } from './queries/clientQueries'
// import { GET_PROJECTS } from '../queries/projectQueries'

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    //update the list to show client has been removed option 1
    // refetchQueries: [{ query: GET_CLIENTS }],

    //update the list to show client has been removed option 2
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS })
      //write to cache
      cache.writeQuery({
        query: GET_CLIENTS,
        //filter out removed client
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      })
    },
  })

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}
