# Minilink

## 🚀 Pré-requisitos
- Docker (v28+)

## 🛠 Configuração do Ambiente

1. **Clone o repositório:**
```
git clone https://github.com/jaum1234/minilink.git
cd minilink
```

2. **Crie os arquivos de ambiente:**
```
cp .env.example .env
cp .env.development.example.local
```
Edite os arquivos conforme necessário.

## 🐳 Execução com Docker
```
docker compose -f docker-compose.dev.yml up -d
```

Isso irá iniciar:
- API NestJS na porta informada no .env
- Banco de dados MySQL na porta informada no .env

## 🌐 Acessando a aplicação
```
http://localhost:3000
```

## Endpoints
[OpenAPI](openapi.yml)