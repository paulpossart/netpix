import 'dotenv/config';

import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => res.json({ backend: 'running' }));

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
