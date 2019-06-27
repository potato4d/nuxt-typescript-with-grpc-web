import { grpc } from '@improbable-eng/grpc-web'
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

    // これでいける
    grpc.invoke(UserService.GetUser, {
      request: new GetUserRequest(),
      host: 'http://localhost:8000',
      onMessage: (message: GetUserResponse) => {
        const { user } = message.toObject()
        commit('setUser', { user })
      },
      onEnd: () => {

      }
    })

    // 古い方法はこれだけどこれは型がつかない
    // grpc.unary(UserService.GetUser, {
    //   request: new GetUserRequest(),
    //   host: 'http://localhost:8000',
    //   onEnd: response => {
    //     const { status, message } = response
    //     if (status === grpc.Code.OK && message) {
    //       const { user } = message.toObject() as { user: User.AsObject }
    //       commit('setUser', { user })
    //     }
    //   }
    // })

    // 古い方法はこれだけどこれは型がつかない
    // const client = grpc.client(UserService.GetUser, {
    //   host: 'http://localhost:8000',
    // });
    // const request = new GetUserRequest()
    // client.start()
    // client.send(request)
    // client.onMessage((message) => {
    //   const { user } = message.toObject() as { user: User.AsObject }
    //   commit('setUser', { user })
    // })
  },
  async updateUser() {
    // 一旦実装したけど検証追従が大変なので辞めた
  }
}
