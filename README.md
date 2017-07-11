# loopback-multi-tenant
Implementação teste para multi-tenant em postgresql

## Objetivo
Implementar o uso de multi-tenant utilizando  os schemas do postgresql através da replicação dos datasources e models.



## Progresso
* Automigrate

Foi possível efetuar o migrate para os schemas no postgresql, utilizando da criação dos datasources e models em runtime alterando o schema vinculado ao model.

* API Explorer

Ainda não implementado, é possivel utilizar a api criando uma custom route, como pode ser visto no arquivo server/boot/routes.js e alterando o schema do model e relations com o parâmetro da query. Uma melhor implementação seria pegar o model referente ao tenant.


