import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
import post_pb from './proto/post_pb'
import post_pb_service from './proto/post_pb_service'

const PROTO_PATH = __dirname + '/../proto/post.proto'
const post_proto = grpc.loadPackageDefinition(
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

const DATABASE_POSTS: post_pb.Post[] = []

function getPosts(
  call: grpc.ServerUnaryCall<post_pb.GetPostsRequest>,
  callback: grpc.sendUnaryData<post_pb.GetPostsResponse>,
) {
  const response = new post_pb.GetPostsResponse()
  response.setPostsList(DATABASE_POSTS)
  return callback(null, response)
}

function createPost(
  call: grpc.ServerUnaryCall<post_pb.CreatePostRequest>,
  callback: grpc.sendUnaryData<post_pb.CreatePostResponse>,
) {
  const response = new post_pb.CreatePostResponse()
  const post = new post_pb.Post()
  post.setTime(new Date().getTime())
  post.setTitle(call.request.getTitle())
  post.setDescription(call.request.getDescription())
  DATABASE_POSTS.push(post)
  callback(null, response)
}

function main() {
  const server = new grpc.Server()
  server.addService(
    post_proto.nuxtgrpc.PostService.service,
    {
      getPosts,
      createPost
    }
  )
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
  console.log('Start server')
}
main()
