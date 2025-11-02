# CRUD Setup
## Github
Create a Github repo with licence. Copy url. From the Projects folder: git clone <url>

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
- npm install bcrypt connect-pg-simple cookie-parser cors dotenv express express-session express-rate-limit helmet passport passport-local pg uuid validator
- npm install -D ts-node-dev typescript jest supertest
    - npx tsc --init
    - "scripts": {
        "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
        "build": "tsc",
        "start": "node dist/index.js",
        "test": "jest"
    }
    - use npm run dev
    - run a second terminal with npx tsc --watch for compile errors, although VS code should catch these. 

**For modern imports:**
- add "type": "module" to package.json at the top level
- remember to add extension name to imports

**Add a .gitignore & .env**
add: .env, node_modules, and *.log to .gitignore

## Auth - need to solve sameSite issue
- npm install csurf
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

- Vitest/jest
- npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

then: "scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch"
}

vite.config:
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
    server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
  }
})

If you need global setup (like extending expect), create src/setupTests.ts: 

import '@testing-library/jest-dom';

This allows expect(element).toBeInTheDocument() etc.

use:
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

at the top of the file

also need a src/vite-env.d.ts, with:
/// <reference types="vite/client" />

# Jest
## backend
npm i -D jest supertest ts-jest @types/jest
npx ts-jest config:init //initialise jest config.

"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
}

tsconfig, add:
"compilerOptions": {
  ...
  "types": ["node", "jest"]
}







### Connect to GitHub





