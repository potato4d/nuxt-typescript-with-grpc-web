import { grpc } from 'grpc-web-client'
import { GetUserRequest, GetUserResponse, UpdateUserRequest, User } from '../proto/user_pb'
import { UserServiceClient, UserService } from '../proto/user_pb_service'
const HOST = 'http://localhost:8000'

export const state = () => ({
  user: null
})

export const getters = {
  user: state => state.user
}

export const mutations = {
  setUser(state, { user }) {
    state.user = user
  }
}

export const actions = {
  async getUser({ commit }) {
    const client = grpc.client(UserService.GetUser, {
      host: 'http://localhost:8000',
    });
    const request = new GetUserRequest()
    client.start()
    client.send(request)
    client.onMessage((message) => {
      const { user } = message.toObject() as { user: User.AsObject }
      commit('setUser', { user })
    });
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
