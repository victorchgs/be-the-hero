# Be The Hero

Este repositório contém o estudo de uma aplicação completa para conectar ONGs e pessoas dispostas a ajudar casos de necessidade. O projeto foi construído na Semana OmniStack 11 criada pela Rocketseat e é dividido em três partes:

- **Back-end:** API RESTful em Node.js/Express
- **Front-end:** Interface web em React
- **Mobile:** Aplicativo mobile em React Native (Expo)

---

## Sumário

- [Back-end](#back-end)
- [Front-end](#front-end)
- [Mobile](#mobile)
- [Como rodar o projeto](#como-rodar-o-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Licença](#licença)

---

## Back-end

O back-end é uma API REST construída com **Node.js** e **Express**. Ele gerencia o cadastro de ONGs, casos, autenticação e fornece os dados para o front-end e mobile.

### Principais funcionalidades

- Cadastro e login de ONGs
- Cadastro, listagem e remoção de casos
- Validação de dados com Celebrate
- Suporte a CORS para integração com front-end e mobile

### Como rodar

```bash
cd back-end
npm install
npm start
```

O servidor será iniciado em `http://localhost:3333`.

---

## Front-end

O front-end é uma aplicação web feita em **React**. Permite que ONGs se cadastrem, façam login, registrem casos e visualizem casos cadastrados.

### Como rodar

```bash
cd front-end
npm install
npm start
```

Acesse em `http://localhost:3000`.

---

## Mobile

O mobile é um app desenvolvido com **React Native** usando **Expo**. Permite que usuários encontrem casos e entrem em contato com ONGs.

### Como rodar

```bash
cd mobile
npm install
npx expo start
```

Siga as instruções do Expo para rodar no emulador ou dispositivo físico.

---

## Como rodar o projeto

1. Inicie o back-end:
   ```bash
   cd back-end
   npm install
   npm start
   ```
2. Inicie o front-end:
   ```bash
   cd front-end
   npm install
   npm start
   ```
3. Inicie o mobile:
   ```bash
   cd mobile
   npm install
   npx expo start
   ```

---

## Tecnologias utilizadas

- **Back-end:** Node.js, Express, SQLite, Celebrate, CORS
- **Front-end:** React, Axios, React Router DOM
- **Mobile:** React Native, Expo, Axios

---

## Licença

Este projeto está sob a licença MIT.

---

Sinta-se à vontade para adaptar conforme as particularidades do seu projeto!
