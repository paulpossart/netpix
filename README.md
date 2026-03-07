# Netpix

Netpix is a full-stack Netflix clone that uses the PERN stack. It allows users to interact with the TMDB API through a RESTful API with secure authentication.

[Visit Site](https://netpix.netlify.app/)

## Tech Stack
- **Frontend:** React, React Context API, React Router, SCSS

- **Backend:** Node.js, Express

- **Database:** PostgreSQL

- **Authentication:** Express Session with Passport

## Features
- **TMDB:** Netpix connects to popular third-party API, The Movie Database, enabling users to search for favourite movies, and create their own watchlist. The homepage displays lists of popular, upcoming, and current movies. Video and logo endpoints are integrated for a satisfying user experience.

- **Security:** Users can change their username and password at any time, sign out of all devices, and delete their account.

- **Accessibility:** Semantic HTML, ARIA labels, colour contrast that meets or exceeds WCAG AA standards, and keyboard navigation support - all menus and modals close on Escape, and all interactive elements have a custom tab-focus mode.

- **Testing:** Auth routes are tested using Vitest and Supertest on the backend, Vitest, Mock Service Worker, Jest DOM, and React Testing Library on the frontend.

