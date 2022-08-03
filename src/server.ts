import { createServer } from 'http';

import app from './app';
import { connectionDB } from './database';

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    connectionDB();
    const server = createServer(app);

    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
