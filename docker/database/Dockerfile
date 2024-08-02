FROM postgres:latest

# Instale o PostGIS e dependências
RUN apt-get update && \
    apt-get install -y postgis postgresql-13-postgis-3

# Exponha a porta padrão do PostgreSQL
EXPOSE 5432

# Comando padrão para iniciar o PostgreSQL
CMD ["postgres"]
