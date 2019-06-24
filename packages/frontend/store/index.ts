import { grpc } from 'grpc-web-client'
import { GetUserRequest, GetUserResponse, UpdateUserRequest } from '../proto/user_pb'
import { UserServiceClient, UserService } from '../proto/user_pb_service'
const HOST = 'http://localhost:8000'

export const state = () => ({
  user: []
})

export const getters = {
  user: state => state.user
}

export const mutations = {
  setUsers(state, { user }) {
    state.user = [...user]
  }
}

export const actions = {
  async getUser() {
    const client = new UserServiceClient(HOST)
    const request = new GetUserRequest()
    console.log(client)
    // client.getUser(request, (err: any, response: any) => {
    //   console.log(
    //     err,
    //     response.getMessage
    //   )
    // })
  },
  async updateUser() {
    // const client = new UserServiceClient(HOST)
    // const request = new UpdateUserRequest()
    // request.setTitle('Example User')
    // request.setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
    // client.updateUser(request, (err: any, response: any) => {
    //   console.log(
    //     response
    //   )
    // })
  }
}
