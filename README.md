# MAS
Gestionnaire d'associassions sportive OpenSource


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