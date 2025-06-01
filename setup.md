# CRUD Setup
## Backend
### Database
**Create a user:** 
- CREATE ROLE user WITH LOGIN PASSWORD 'password';
- ALTER ROLE user CREATEDB;
- \q
- psql -d postgres -U user

**Create database:** 
- CREATE DATABASE db_name;
- \c db_name
- *optional:* CREATE SCHEMA schema_name;
- CREATE TABLE schema_name.table_name (col_name DATATYPE, //etc);

***Handy psql commands:***
- \q *Exit psql connection*
- \c *Connect to a new database*
- \dt *List all tables*
- \dt schema_name.* *for use with schema*
- \du *List all roles*
- \list *List databases*
- \dn *lists schemas*
- \d table_name *Quick summary of table details*

### Server

*Remember to make endpoints plural nouns for adherence to RESTful principles*

**Create backend folder**
- npm init -y
- npm install express pg cors dotenv helmet
- npm install -D nodemon
    - "scripts": {"dev": "nodemon index.js"}
    - use npm run dev

**For modern imports:**
- add "type": "module" to package.json at the top level
- remember to add extension name to imports

**Add a .gitignore & .env**
- .env
- node_modules
- *.log

**For static code analysis:**
- npm install eslint --save-dev
- npx eslint --init
- npx eslint . --ext .js
    - OR: add "scripts": {"lint": "eslint . --ext .js"}
    - and run with: npm run lint
    - npm run lint -- --fix

## Auth
- npm install bcrypt jsonwebtoken cookie-parser uuid
- npm install csurf validator dompurify
- csurf needed for sameSite: none cookies

- simple regex: /^[^<>{};\\]*$/ (check the actual .md file, not the Preview)

## Frontend 
**Create frontend folder**

**React:**
- npm create vite@latest folder-name // ie. frontend
- npm install
    - use npm run dev

**Optional installs:**
- npm install react-router-dom
- npm install @reduxjs/toolkit react-redux
- npm install -D sass

***.env if required***

### Connect to GitHub

### for animating lists:
- npm install framer-motion
