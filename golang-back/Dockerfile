FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY . .

RUN go mod download
RUN go build -o /app/main

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/main .
COPY --from=builder /app/videos ./videos

EXPOSE 8081

CMD ["./main"]