# Módulo 2 – Servicio de Redirección (GET /{code})

Este servicio recibe un código acortado y redirige (HTTP 302) hacia la URL original almacenada en DynamoDB. sd

## Tecnologías
- AWS Lambda
- API Gateway (GET /{code})
- DynamoDB
- Terraform
- GitHub Actions (CI/CD)

## Función Lambda
GET /{code}

- Busca el código en DynamoDB
- Si existe → redirige con 302
- Si no → responde 404

## CI/CD
Cada push a main:
- Instala dependencias
- Crea ZIP del Lambda
- Ejecuta Terraform (init + apply)
- Publica la URL del API Gateway automáticamente

## Variables necesarias en GitHub Secrets
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- DYNAMO_TABLE_NAME
