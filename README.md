# MAS
Gestionnaire d'associassions sportive OpenSource
L'objectif est de fournir a toutes assoS et a tout les Membres une plateforme pour leur vie d'assoS.
Principaux point de fonction : 
- Un membre pourrait voir les assoS et s'inscrire via la plateforme
- Les assoS pourrait se servire de la plateforme pour gérer leur membre, leur visibilité et autres.


## Use cases
___

### 1. Dev case

This repository have 2 server files.
The first for admin interface and the second for client interfaces.
Each one have a port dedicated.

The two need mongodb.
you need to comment the parts "node server dev" and "node server prod" on the docker-compose.yml

Open a CMD prompt and execute : 

```
    cd ~/meatb2b/back-meatb2b
    docker compose up
```

In another prompt execute these commands to launch client or admin server : 


```
    cd ~/meatb2b/back-meatb2b  
    npm run admin:dev
```
or 

```
    cd ~/meatb2b/back-meatb2b
    npm run client:dev
```
