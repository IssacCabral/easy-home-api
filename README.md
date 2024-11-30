# Estrutura do Projeto

- [x] Adicionar Linter
- [x] Definir Arquitetura de Projeto
- [ ] Proteger a branch main do projeto

https://imasters.com.br/front-end/node-js-v8-single-thread-e-io-nao-bloqueante
https://dev.to/ocodista/profundezas-do-nodejs-explorando-io-assincrono-mim
https://dev.to/ocodista/a-magia-do-event-loop-in1
https://blog.rocketseat.com.br/node-js-entendendo-o-event-loop/
https://www.youtube.com/watch?v=8Pywrbkoy_Q&ab_channel=MatheusTeodoro

# usuários

- locadores (landlord)
- locatários (tenant)

# imóveis (properties)

```sql
CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    landlord_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) CHECK (type IN ('Apartamento', 'Casa', 'Duplex')),
    status VARCHAR(50) CHECK (status IN ('ocupado', 'dividir', 'livre')),
    price DECIMAL(10, 2),
    bedrooms INTEGER,
    bathrooms INTEGER,
    dimensions VARCHAR(50),
    location VARCHAR(255)
    -- Adicione coordenadas, se necessário
);
```

# properties_tenants (inquilinos dos imóveis)

```sql
CREATE TABLE properties_tenants (
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    is_main_tenant BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (property_id, tenant_id)
);
```

# amenities (comodidades)

```sql
CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);
```

# properties_amenities (comodidades dos imóveis)

```sql
CREATE TABLE properties_amenities (
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    amenity_id INTEGER REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (property_id, amenity_id)
);
```

# properties_reviews (avaliação)

```sql
CREATE TABLE properties_reviews (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

# contact_requests (pedidos de contato)

```sql
CREATE TABLE contact_requests (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) CHECK (status IN ('em_contato', 'alugado', 'finalizado')) DEFAULT 'em_contato',
    finalization_reason TEXT
);
```

# share_requests (divisão de aluguel)

```sql
CREATE TABLE share_requests (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) CHECK (status IN ('em_contato', 'finalizado', 'selecionado', 'dividindo')) DEFAULT 'em_contato',
    finalization_reason TEXT
);
```

https://www.prisma.io/docs/orm/prisma-client/queries/select-fields -->

# TODOs

- ajustar build do projeto pra rodar com o javascript

## PropertyReviews

- findPropertyReviewsUseCase - ok
- findPropertyRatingUseCase - ok

## Properties

- updatePropertyUseCase
- deletePropertyUseCase

## Tenant

- findPropertiesOfInterest - mostrar imóveis que ele deseja dividir aluguel
- closeTenantContactRequest
- updateTenantUseCase
- openRentDivisionUseCase - ok
- cancelRentDivisionUseCase - ok
- completeRentDivisionUseCase - ok
- createShareRequestUseCase - ok
- finishShareRequestUseCase - ok
- selectShareRequestUseCase - ok
- stopTenantRentDivisionUseCase
- findSharedRentalTenantsUseCase

## Landlord

- updateLandlordUseCase

### Fluxo De Divisão de Aluguel

O imóvel deve estar ocupado para poder Iniciar a abertura de divisão de aluguel (OpenRentDivisionUseCase).
Quando iniciar a abertura de divisão de aluguel, o imóvel ficará com o status de dividir, e poderá receber 
requisições de compartilhamento de aluguel (CreateShareRequestUseCase), por outros inquilinos que não sejam
o mainTenant daquele imóvel. Essas requisições serão salvas na tabela `shareRequests`, com o status `IN_CONTACT`.

Agora o mainTenant daquele imóvel poderá selecionar (SelectShareRequestUseCase) os usuários com quem ele irá dividir o aluguel.
Ele poderá também encerrar (FinishShareRequestUseCase) contato com aquele usuário.

O mainTenant poderá simplesmente decidir cancelar a divisão de aluguel (CancelRentDivisionUseCase) e excluir todos os registros da tabela de `shareRequest`,
referente aquela divisão em questão. Essa ação altera novamente o status do imóvel para BUSY.

Após decidir quem vai dividir aluguel e quem não vai, o mainTenant poderá concluir a divisão de aluguel (CompleteRentDivisionUseCase).
Essa ação, pega todos os usuários que estão com status de selecionado na tabela `shareRequests` e os salva na 
tabela `TenantsOnProperties` com a flag isMainTenant como false. 
Essa ação também altera o status do imóvel para BUSY novamente.
Essa ação exclui todos os registros da tabela de `shareRequest` referente aquela divisão em questão,
já que o imóvel agora está alugado e dividindo entre outros usuários.

O mainTenant após dividir aluguel com alguns usuários, poderá listar com quem ele está dividindo (FindSharedRentalTenantsUseCase).
Essa ação lista os usuários da tabela `TenantsOnProperties`, que não são o mainTenant, mas que estão naquele
mesmo imóvel que o mainTenant.

Ele também poderá parar de dividir aluguel com esses usuários (StopTenantRentDivisionUseCase) 
Essa ação deve excluir os registros da tabela `TenantsOnProperties` que não são mainTenant e que estão
naquele mesmo imóvel do mainTenant.