# 🎮 Arcade Manager - Frontend

Frontend mobile do projeto **Arcade Manager**, responsável pela interação do usuário com a plataforma de gerenciamento de biblioteca de jogos.

---

## 📱 Sobre o projeto

O Arcade Manager permite que usuários:

- 🔐 Criem conta e façam login
- 🎮 Gerenciem sua biblioteca de jogos
- 🔍 Busquem novos jogos (integração futura com API externa - RAWG)
- 📊 Atualizem o status dos jogos (jogando, finalizado, backlog, etc.)

---

## 🚀 Tecnologias

Este projeto será desenvolvido utilizando:

- ⚛️ React Native (Expo)
- 🔄 Axios
- 🧭 React Navigation
- 🧠 Context API (gerenciamento de estado)
- 💾 SecureStore (persistência de sessão)

---

## 🏗️ Estrutura do projeto (planejada)

```bash
src/
 ├── screens/        # Telas do app
 ├── components/     # Componentes reutilizáveis
 ├── services/       # Comunicação com API (Axios)
 ├── context/        # Contextos globais (Auth)
 ├── hooks/          # Hooks customizados
 ├── navigation/     # Configuração de rotas
 └── types/          # Tipagens
```

---

## 🔗 Integração com Backend

O frontend consome a API do projeto:

👉 https://github.com/wagnerdf/arcade-manager-api

---

## ⚠️ Status do projeto

🚧 Em desenvolvimento

---

## 📌 Próximos passos

- [ ] Setup inicial com Expo
- [ ] Implementar AuthContext
- [ ] Criar telas de Login e Register
- [ ] Integração com backend (JWT)
- [ ] Tela de biblioteca com paginação
- [ ] Funcionalidade de adicionar jogos

---

## 👨‍💻 Autor

WagnerDf 😄
