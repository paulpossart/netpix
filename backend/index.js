import 'dotenv/config';

import express from 'express';


import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const allowedOrigin = process.env.ALLOWED_URL;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: allowedOrigin, credentials: true}));
app.use(helmet());
app.use(cookieParser());

app.get('/', (req, res) => res.json({ backend: 'running' }));

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
