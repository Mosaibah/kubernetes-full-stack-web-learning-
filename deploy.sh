docker build -t backend:v1 ./src/backend
docker build -t frontend:v1 ./src/frontend

kubectl apply -f namespace.yaml

# server/db
kubectl apply -f server/db/secrets.yaml
kubectl apply -f server/db/configmap.yaml
kubectl apply -f server/db/service.yaml
kubectl apply -f server/db/statefulset.yaml

# server/api
kubectl apply -f server/api/service.yaml
kubectl apply -f server/api/deployment.yaml

# server/frontend
kubectl apply -f server/frontend/service.yaml
kubectl apply -f server/frontend/deployment.yaml

kubectl create configmap nginx-full-stack --from-file=nginx.conf

kubectl apply -f reverse-proxy.yaml