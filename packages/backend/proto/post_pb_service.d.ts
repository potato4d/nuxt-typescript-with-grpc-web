// package: nuxtgrpc
// file: post.proto

import * as post_pb from "./post_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PostServiceGetPosts = {
  readonly methodName: string;
  readonly service: typeof PostService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof post_pb.GetPostsRequest;
  readonly responseType: typeof post_pb.GetPostsResponse;
};

type PostServiceCreatePost = {
  readonly methodName: string;
  readonly service: typeof PostService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof post_pb.CreatePostRequest;
  readonly responseType: typeof post_pb.Empty;
};

export class PostService {
  static readonly serviceName: string;
  static readonly GetPosts: PostServiceGetPosts;
  static readonly CreatePost: PostServiceCreatePost;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class PostServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getPosts(
    requestMessage: post_pb.GetPostsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: post_pb.GetPostsResponse|null) => void
  ): UnaryResponse;
  getPosts(
    requestMessage: post_pb.GetPostsRequest,
    callback: (error: ServiceError|null, responseMessage: post_pb.GetPostsResponse|null) => void
  ): UnaryResponse;
  createPost(
    requestMessage: post_pb.CreatePostRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: post_pb.Empty|null) => void
  ): UnaryResponse;
  createPost(
    requestMessage: post_pb.CreatePostRequest,
    callback: (error: ServiceError|null, responseMessage: post_pb.Empty|null) => void
  ): UnaryResponse;
}

