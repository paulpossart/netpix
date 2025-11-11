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
- npm install bcrypt connect-pg-simple dotenv express express-rate-limit helmet pg uuid validator
- optional installs: cookie-parser cors express-session passport passport-local 
- npm install -D vitest supertest nodemon
   "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "test": "vitest"
    }

**For modern imports:**
- add "type": "module" to package.json at the top level
- remember to add extension name to imports

**Add a .gitignore & .env**
add: .env, node_modules, and *.log to .gitignore

## Auth - need to solve sameSite issue
- csrf protection needed for sameSite: none cookies

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
- npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom

then: "scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch"
}

If you need global setup (like extending expect), create src/setupTests.ts: 

import '@testing-library/jest-dom';

This allows expect(element).toBeInTheDocument() etc.

use:
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

vite config with proxy and test:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
})
```

set up Mock Service Worker for api fetch mocking:
npm install -D msw

```js
// src/test/handlers/authHandlers.js (eg):
import { rest } from 'msw';

export const authHandlers = [
  rest.post('/api/login', (req, res, ctx) => {
    return res(ctx.json({ message: 'Login successful', user: { username: 'username' } }));
  }),
  rest.post('/api/logout', (req, res, ctx) => {
    return res(ctx.json({ message: 'Logout successful' }));
  }),
];

// src/test/server.js
import { setupServer } from 'msw/node';
import { authHandlers } from './handlers/authHandlers';

export const server = setupServer(...authHandlers);

// src/test/setup.js
import '@testing-library/jest-dom';
import { server } from './server'

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```


### Connect to GitHub





