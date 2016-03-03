DROP SCHEMA public cascade; 
CREATE SCHEMA public;  

CREATE TABLE IF NOT EXISTS "userRoles" (
  "userRoleID" SERIAL NOT NULL PRIMARY KEY,
  "userRoleName" VARCHAR(255),
  "userRoleDescription" VARCHAR
);

INSERT INTO "userRoles" ("userRoleName", "userRoleDescription") VALUES ('Anonymous', 'Default anonymous user role for all nonregistered users.'),('Registered', 'Registered users registered and logged in to site.'),('Admin', 'Administrative users managing shelters and real-time bed counts.') RETURNING "userRoleID";

CREATE TABLE IF NOT EXISTS "persons" (
  "personID" SERIAL NOT NULL PRIMARY KEY,
  "personFirstName" VARCHAR(255) NOT NULL,
  "personLastName" VARCHAR(255) NOT NULL,
  "personDOB" DATE NOT NULL,
  "fk_userRole" integer NOT NULL REFERENCES "userRoles" ("userRoleID")
);


CREATE TABLE IF NOT EXISTS "shelterManagers" (
  "managerID" SERIAL NOT NULL PRIMARY KEY,
  "fk_shelterID" integer NOT NULL REFERENCES "shelters" ("shelterID"),
  "fk_personID" integer NOT NULL REFERENCES "persons" ("personID")
);



CREATE TABLE  IF NOT EXISTS "organizations" (
  "organizationID" SERIAL NOT NULL PRIMARY KEY,
  "organizationName" VARCHAR(255) NOT NULL
);



CREATE TABLE  IF NOT EXISTS "shelters" (
  "shelterID" SERIAL NOT NULL PRIMARY KEY,
  "fk_organizationID" integer NOT NULL REFERENCES "organizations" ("organizationID"),
  "shelterName" VARCHAR(255) NOT NULL,
  "shelterLocation" TEXT NOT NULL
);



CREATE TABLE IF NOT EXISTS "shelterUnits" (
  "shelterUnitID" SERIAL NOT NULL PRIMARY KEY,
  "fk_shelterID" integer NOT NULL REFERENCES "shelters" ("shelterID"),
  "unitSize" VARCHAR(255) NOT NULL DEFAULT '1BD'
);



CREATE TABLE IF NOT EXISTS "shelterOccupancy" (
  "occupancyID" SERIAL NOT NULL PRIMARY KEY,
  "fk_shelterUnitID" integer NOT NULL REFERENCES "shelterUnits" ("shelterUnitID"),
  "fk_personID" integer NOT NULL REFERENCES "persons" ("personID")
);

