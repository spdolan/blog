---
title: "Postgres Fun: Using File Import"
date: 2020-09-05T11:00:00.000Z
modified: 2020-09-05T11:00:00.000Z
description: "First in PostgreSQL Series, using files to manage DB."
tags: [postgresql, fresh-dev]
---

At The Climate Service (TCS), our relational database (DB) of choice is (PostgreSQL)[https://www.postgresql.org/] (pg). Before joining TCS, my experience had only been with NoSQL DBs, namely (MongoDB)[https://www.mongodb.com/]. It has been a journey so far to delve into everything that pg offers, I'll be sharing some of what I've found to be useful over the course of several entries.

### TLDR

We are able to import DB data from files (assumes you have (Docker)[https://docs.docker.com/get-docker/]/(psql)[https://www.postgresql.org/download/] installed):

- Clone and cd into this repo: `git clone XYZ && cd XYZ`
- Start a local (pg instance with Docker)[https://hub.docker.com/_/postgres]: `docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres`
- Connect using psql: `psql -h localhost -p 5432 -U postgres -W`
- Create a schema and tables using file import: `\i db/schema.ddl`
- "Seed" tables using file import: `\i db/seed.sql`

## Schema Management

If, like us at TCS, you employ methods like Agile/SCRUM, then your team is looking to build out feature sets through iteration. For us, as part of building "Generation 2.0" of our product, much of that also occurred within our DB schema, as our researchers continue to grow their own knowledge base surrounding the relationships between climate science and risk.

For the first few months, as we built out our DB schema, and tested how we modeled the relationships behind our data, we would pack everything in two files - gracefully named `schema.dll` and `seed.sql`. We had these under source control, so we could at least look back at changes to our git repository and understand the journey to now. This was due to our team's decision to not use an object-relational mapping library (such as (Sequelize)[https://sequelize.org/] or (TypeORM)[https://typeorm.io/] in relational-DB land, or an object data modeling (ODM) such as (Mongoose)[https://mongoosejs.com/] for the NoSQL-inclined) to start, to give us better flexibility while in this learning-by-doing period.

In practice this meant that any pull request (PR) with schema changes would lead to something like the following for each developer, first within one's local pg instance, subsequently as part of our build pipeline:

```console
> docker start local-postgres     #restart pg container, if process had been shut down.
> psql local-postgres      #connect to docker pg instance using `psql` utility
> \i path/to/schema.dll     #import latest/greatest DB schema from file
> \i path/to/seed.sql       #import latest/greatest DB seed data from file
```

When I first started using this method, it blew my mind! Some of our more senior engineers were starting to discuss, and implement, infrastructure-as-code (IaC), but I had originally thought without the use of an ORM we'd receive DB updates through Slack and ad hoc document/update ourselves organically. Thankfully livelier minds were driving our project.

## Next Steps, An Invitation to Migration

As you may have surmised, while this was great as we were ramping up, it quickly became a hinderance to have our DB - even a local Docker instance - doing its best phoenix impression whenever we added even a simple field to a table. Thankfully, our team now uses (Flyway)[https://flywaydb.org/getstarted/why] - so whenever Alice heads out on vacation, and Bob finishes his design for a time-saving DB trigger, Alice can quickly and safely update. All it takes is a `git pull` on our trunk branch, and a `flyway migrate` thereafter.

More on that to come! Does your team struggle with or have a great method for relational DB management?

## That's it! Happy coding!
