# Linked Arena Games

Monorepo para plataforma de jogos multiplayer com Node.js, React Native (Expo), Socket.io e TypeScript.

## Estrutura

- `shared/`: lógica dos jogos (OOP, TypeScript, testável)
- `backend/`: servidor Node.js/Socket.io
- `frontend/`: app React Native (Expo), navegação automática de jogos

## Rodando localmente

```bash
# Instale tudo
yarn install

# Rode os testes
yarn workspaces run test

# Rode o backend
cd backend && yarn dev

# Rode o frontend
cd frontend && yarn start
```

## Adicionando um novo jogo

1. Crie uma pasta em `frontend/games/NOME/`
2. Implemente o componente `GameScreen`
3. Registre o jogo com `GameRegistry.register({...})`
4. Importe em `App.tsx` para registro automático

## CI

- O repositório roda lint e testes em todos os pacotes automaticamente no GitHub Actions.

## Testes

- Escreva testes unitários para lógica em `shared/`
- Escreva testes de integração/endpoint para o backend
- Escreva testes de componentes com `@testing-library/react-native` no frontend