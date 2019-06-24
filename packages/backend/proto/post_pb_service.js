// package: nuxtgrpc
// file: post.proto

var post_pb = require("./post_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PostService = (function () {
  function PostService() {}
  PostService.serviceName = "nuxtgrpc.PostService";
  return PostService;
}());

PostService.GetPosts = {
  methodName: "GetPosts",
  service: PostService,
  requestStream: false,
  responseStream: false,
  requestType: post_pb.GetPostsRequest,
  responseType: post_pb.GetPostsResponse
};

PostService.CreatePost = {
  methodName: "CreatePost",
  service: PostService,
  requestStream: false,
  responseStream: false,
  requestType: post_pb.CreatePostRequest,
  responseType: post_pb.Empty
};

exports.PostService = PostService;

function PostServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PostServiceClient.prototype.getPosts = function getPosts(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PostService.GetPosts, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

PostServiceClient.prototype.createPost = function createPost(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PostService.CreatePost, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.PostServiceClient = PostServiceClient;

