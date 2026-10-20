import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const rawArgs = process.argv.slice(2);
const cleanArgs = ['dev'];

let port = '3000';
let hostname = '0.0.0.0';

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];

  if (arg === '--') {
    continue;
  }

  if (arg === '--host' || arg === '-H' || arg === '--hostname') {
    if (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith('-')) {
      hostname = rawArgs[i + 1];
      i++;
    }
    continue;
  }

  if (arg.startsWith('--host=')) {
    hostname = arg.slice('--host='.length);
    continue;
  }
  if (arg.startsWith('--hostname=')) {
    hostname = arg.slice('--hostname='.length);
    continue;
  }
  if (arg.startsWith('-H=')) {
    hostname = arg.slice('-H='.length);
    continue;
  }

  if (arg === '--port' || arg === '-p') {
    if (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith('-')) {
      port = rawArgs[i + 1];
      i++;
    }
    continue;
  }

  if (arg.startsWith('--port=')) {
    port = arg.slice('--port='.length);
    continue;
  }
  if (arg.startsWith('-p=')) {
    port = arg.slice('-p='.length);
    continue;
  }

  cleanArgs.push(arg);
}

// Dev server must always run on port 3000 in this container environment.
// Port 8080 is occupied by nginx reverse proxy.
if (port === '8080') {
  port = '3000';
}

cleanArgs.push('-p', String(port), '-H', String(hostname));

let nextBin = path.resolve('node_modules/next/dist/bin/next');
if (!fs.existsSync(nextBin)) {
  nextBin = path.resolve('node_modules/.bin/next');
}

const child = spawn(process.execPath, [nextBin, ...cleanArgs], {
  stdio: 'inherit',
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
