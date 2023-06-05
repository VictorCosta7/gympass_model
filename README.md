# App

Gympass style app.

## RFs (Requisitor funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuario logado;
- [ ] Deve ser possíceel obter o numero de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuario obeter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias prlo nome;
- [x] Deve ser possícel o usuário realiazr check-ins em uma academia ;
- [ ] Deve ser possível validar um check-in de um usuario;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócios)

- [x] O usuário não deve poder se cadastrar com um email duplicado;
- [x] O usuário não poderá fazer dois check-ins em academias no mesmo dia;
- [x] O ususario não pode fazer check-in se não estiver perto (100 mt) da cademia;
- [ ] O check-in só pode ser validado 20 min após criado;

- [ ] O check-in poderá ser validado apenas por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco Postgresql;
- [ ] Todas listas de dados precisam estar paginadas por 20 listas por página;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token);

# Setup Docker

```sh
docker run --name gympass_model -e POSTGRESQL_USERNAME=postgres -e POSTGRESQL_PASSWORD=postgres -e POSTGRESQL_DATABASE=gympass -p 5432:5432  bitnami/postgresql:latest
```