# Product Catalogue Microservice with CI/CD & Kubernetes

## 🧾 Project Overview
This Node.js-based microservice serves as a versioned product catalogue API. Each version exposes different features via distinct Kubernetes deployments.

It includes:
- 🐳 Dockerized product microservice
- ☸️ Kubernetes deployment with NGINX Ingress
- 🚀 GitHub Actions for CI/CD to Docker Hub + Kubernetes

---

## 📁 Folder Structure
```
product-catalogue-microservice/
├── product/                  # Product service source code
├── kubernetes/               # Kubernetes YAMLs (v1, v1.1, v2)
├── .github/workflows/        # GitHub Actions CI/CD pipeline
└── README.md                 # This file
```

---

## ⚙️ Microservice Versions
| Version | Endpoint Path | Description                                  |
|---------|----------------|----------------------------------------------|
| v1.0.0  | `/v1/products` | Basic product list                           |
| v1.1.0  | `/v1-1/products` | Search with validation, error handling      |
| v2.0.0  | `/v2/products` | Advanced filtering and improved design       |

---

## 🐳 Docker Setup
### Build and Push
```bash
cd product
# Example: v1.1.0
# Build image
$ docker build -t <your-username>/product-service:v1.1.0 .

# Push image
$ docker push <your-username>/product-service:v1.1.0
```

📌 Use Docker Hub username used in your GitHub Secrets.

---

## ☸️ Kubernetes Deployment
### Apply Namespaced YAMLs
```bash
cd kubernetes
kubectl apply -f v1/
kubectl apply -f v1-1/
kubectl apply -f v2/
kubectl apply -f final-ingress-default.yaml
```

### Verify Pods and Services
```bash
kubectl get pods -n default
kubectl get svc -n default
kubectl describe ingress product-ingress -n default
```

### Example Output
```
$ kubectl get pods -n default
NAME                                    READY   STATUS    RESTARTS   AGE
product-service-v1-1-xxx                1/1     Running   0          10m
product-service-v1-xxx                  1/1     Running   0          10m
product-service-v2-xxx                  1/1     Running   0          10m
```

---

## 🌐 Testing the Endpoints
### cURL (WSL or terminal)
```bash
curl http://localhost/v1/products
curl http://localhost/v1-1/products
curl http://localhost/v2/products
```

### Postman
- Method: `GET`
- URL: `http://localhost/v1/products`, etc.
- Ensure Docker Desktop & Kubernetes are running

---

## 🔄 CI/CD via GitHub Actions
### File: `.github/workflows/ci-cd.yml`
This pipeline:
- Triggers on push to `main`
- Builds & pushes Docker image tagged with commit SHA
- Applies the new image to the v1 deployment via `kubectl set image`

---

## 🔐 GitHub Secrets Required
Go to: `Repo > Settings > Secrets and Variables > Actions`

| Name                | Value Description                        |
|---------------------|------------------------------------------|
| DOCKERHUB_USERNAME | Docker Hub username                       |
| DOCKERHUB_TOKEN    | Docker Hub access token                   |
| KUBE_CONFIG_DATA   | Output of `cat ~/.kube/config \| base64 -w 0`      |

📌 Use base64 encoded kubeconfig as one line.

---

## 🧪 Deployment Verification
1. Push changes to main
2. Watch the Actions tab
3. After success:
```bash
curl http://localhost/v1-1/products
```

Expected:
```json
[
  {"id":1,"name":"iPhone 15","price":999},
  {"id":2,"name":"Samsung Galaxy S24","price":899},
  {"id":3,"name":"OnePlus 12","price":799}
]
```

---

## 📚 Author Notes
This project follows a simplified DevOps deployment strategy suitable for beginner to intermediate projects.

- Built with Node.js + Express
- Containerized and deployed with Docker & Kubernetes
- Automated pipeline using GitHub Actions

Feel free to fork, modify, and extend!

---

## 📎 License
MIT License © 2025 Laxmi Magadum
