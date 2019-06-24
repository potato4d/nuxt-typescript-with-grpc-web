import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import user_pb from './proto/user_pb'
import user_pb_service from './proto/user_pb_service'

const PROTO_PATH = __dirname + '/proto/user.proto'
const user_proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })
)

var USERDATA = {
  username: 'potato4d',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}

function GetUser(
  call: grpc.ServerUnaryCall<user_pb.GetUserRequest.AsObject>,
  callback: grpc.sendUnaryData<user_pb.GetUserResponse.AsObject>,
) {
  return callback(null, {
    user: {
      username: USERDATA.username,
      bio: USERDATA.bio
    }
  })
}

function UpdateUser(
  call: grpc.ServerUnaryCall<user_pb.UpdateUserRequest.AsObject>,
  callback: grpc.sendUnaryData<user_pb.UpdateUserResponse.AsObject>,
) {
  USERDATA.username = call.request.username
  USERDATA.bio = call.request.bio
  callback(null, {})
}

function main() {
  const server = new grpc.Server()
  server.addService(
    user_proto.nuxtgrpc.UserService.service,
    {
      GetUser,
      UpdateUser
    }
  )
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
}
main()
