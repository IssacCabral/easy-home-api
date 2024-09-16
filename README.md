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