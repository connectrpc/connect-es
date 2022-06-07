// Copyright 2021-2022 Buf Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/bufbuild/connect-go"
	"github.com/bufbuild/connect-web/testserver/internal/gen/connect/testing/v1/testingv1connect"
	"github.com/bufbuild/connect-web/testserver/internal/gen/go/testing/v1"
	"github.com/rs/cors"
	"google.golang.org/protobuf/types/known/anypb"
)

type TestService struct {
	testingv1connect.UnimplementedTestServiceHandler // returns errors from all methods
}

func (TestService) UnaryHappy(ctx context.Context, req *connect.Request[testingv1.UnaryHappyRequest]) (*connect.Response[testingv1.UnaryHappyResponse], error) {
	res := connect.NewResponse(&testingv1.UnaryHappyResponse{
		Value: fmt.Sprint(req.Msg.Value),
	})
	return res, nil
}

func (TestService) UnaryError(context.Context, *connect.Request[testingv1.UnaryErrorRequest]) (*connect.Response[testingv1.UnaryErrorResponse], error) {
	e := connect.NewError(connect.CodeAlreadyExists, errors.New("\t\ntest with whitespace\r\nand Unicode BMP ☺ and non-BMP 😈\t\n"))
	d, err := anypb.New(&testingv1.UnaryErrorRequest{Value: 123})
	if err != nil {
		return nil, err
	}
	e.AddDetail(d)
	e.Meta().Add("single-value", "foo")
	return nil, e
}

func (TestService) UnaryHeaders(ctx context.Context, req *connect.Request[testingv1.UnaryHeadersRequest]) (*connect.Response[testingv1.UnaryHeadersResponse], error) {
	res := connect.NewResponse(&testingv1.UnaryHeadersResponse{
		Value: fmt.Sprint(req.Msg.Value),
	})
	res.Header().Add("single-value", "foo")
	res.Header().Add("separate-values", "bar")
	res.Header().Add("separate-values", "baz")
	res.Header().Add("joined-values", "bar, baz")
	return res, nil
}

func (TestService) UnaryTrailers(ctx context.Context, req *connect.Request[testingv1.UnaryTrailersRequest]) (*connect.Response[testingv1.UnaryTrailersResponse], error) {
	res := connect.NewResponse(&testingv1.UnaryTrailersResponse{
		Value: fmt.Sprint(req.Msg.Value),
	})
	res.Trailer().Add("single-value", "foo")
	res.Trailer().Add("separate-values", "bar")
	res.Trailer().Add("separate-values", "baz")
	res.Trailer().Add("joined-values", "bar, baz")
	return res, nil
}

func (TestService) UnaryExpectHeaders(ctx context.Context, req *connect.Request[testingv1.UnaryExpectHeadersRequest]) (*connect.Response[testingv1.UnaryExpectHeadersResponse], error) {
	singleValue := req.Header().Values("single-value")
	if len(singleValue) != 1 || singleValue[0] != "foo" {
		return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("expected request header `single-value: foo`"))
	}
	separateValues := req.Header().Values("separate-values")
	separateValuesOk := len(separateValues) == 2 && separateValues[0] == "bar" && separateValues[1] == "baz"
	separateValuesAlt := len(separateValues) == 1 && separateValues[0] == "bar, baz"
	if !separateValuesOk && !separateValuesAlt {
		return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("expected request headers `separate-values: bar`, `separate-values: baz`, or `separate-values: bar, baz`"))
	}
	joinedValues := req.Header().Values("joined-values")
	if len(joinedValues) != 1 || joinedValues[0] != "bar, baz" {
		return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("expected request headers `joined-values: bar, baz`"))
	}
	res := connect.NewResponse(&testingv1.UnaryExpectHeadersResponse{
		Value: fmt.Sprint(req.Msg.Value),
	})
	return res, nil
}

func (TestService) ServerStreamingHappy(ctx context.Context, req *connect.Request[testingv1.ServerStreamingHappyRequest], res *connect.ServerStream[testingv1.ServerStreamingHappyResponse]) error {
	for i := 0; i < 5; i++ {
		err := res.Send(&testingv1.ServerStreamingHappyResponse{
			Value: fmt.Sprint(req.Msg.GetValue() + int32(i)),
		})
		if err != nil {
			return err
		}
	}
	return nil
}

func (TestService) ServerStreamingError(context.Context, *connect.Request[testingv1.ServerStreamingErrorRequest], *connect.ServerStream[testingv1.ServerStreamingErrorResponse]) error {
	return connect.NewError(connect.CodeAlreadyExists, errors.New("\t\ntest with whitespace\r\nand Unicode BMP ☺ and non-BMP 😈\t\n"))
}

func (TestService) ServerStreamingEmpty(context.Context, *connect.Request[testingv1.ServerStreamingEmptyRequest], *connect.ServerStream[testingv1.ServerStreamingEmptyResponse]) error {
	return nil
}

func (TestService) FullDuplexCall(ctx context.Context, stream *connect.BidiStream[testingv1.FullDuplexCallRequest, testingv1.FullDuplexCallResponse]) error {
	for {
		if err := ctx.Err(); err != nil {
			return err
		}
		req, err := stream.Receive()
		if errors.Is(err, io.EOF) {
			// read done.
			return nil
		} else if err != nil {
			return err
		}
		if err := stream.Send(&testingv1.FullDuplexCallResponse{
			Value: fmt.Sprint(req.GetValue()),
		}); err != nil {
			return err
		}
	}
}

func main() {
	mux := http.NewServeMux()
	// The generated constructors return a path and a plain net/http
	// handler.
	mux.Handle(testingv1connect.NewTestServiceHandler(&TestService{}))
	corsHandler := cors.New(cors.Options{
		AllowedMethods: []string{
			http.MethodHead,
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
		},
		// Mirror the `Origin` header value in the `Access-Control-Allow-Origin`
		// preflight response header.
		// This is equivalent to `Access-Control-Allow-Origin: *`, but allows
		// for requests with credentials.
		// Note that this effectively disables CORS and is not safe for use in
		// production environments.
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		// Note that rs/cors does not return `Access-Control-Allow-Headers: *`
		// in response to preflight requests with the following configuration.
		// It simply mirrors all headers listed in the `Access-Control-Request-Headers`
		// preflight request header.
		AllowedHeaders: []string{"*"},
		// We explicitly set the exposed header names instead of using the wildcard *,
		// because in requests with credentials, it is treated as the literal header
		// name "*" without special semantics.
		ExposedHeaders: []string{
			// gRPC-web
			"Grpc-Status", "Grpc-Message", "Grpc-Status-Details-Bin",
			// headers used in tests
			"Joined-Values", "Separate-Values", "Single-Value",
			"Trailer-Joined-Values", "Trailer-Separate-Values", "Trailer-Single-Value",
		},
	}).Handler(mux)
	h1Server := http.Server{
		Addr:    ":9000",
		Handler: corsHandler,
	}
	fmt.Println("serving at http://127.0.0.1:9000")
	if err := h1Server.ListenAndServe(); err != nil {
		log.Fatalln(err)
	}
}
