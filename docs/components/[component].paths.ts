import fs from 'node:fs';

export default {
  paths() {
    return fs
      .readdirSync('src')
      .map((component) => ({ params: { component } }));
  },
};
