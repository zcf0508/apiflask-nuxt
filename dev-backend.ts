import { exec, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import chokidar from 'chokidar';

const execPromise = promisify(exec);

const SPEC_COMMAND = 'flask spec --quiet';
const DEV_COMMAND = 'flask run --debug';
const GEN_API_SCHEMA_COMMAND = 'openapi-typescript ./backend/openapi.json -o api-schema.d.ts';

async function spawnBackend() {
  await execPromise(SPEC_COMMAND, { cwd: './backend' });
  await execPromise(GEN_API_SCHEMA_COMMAND);
  console.log('api-schema.d.ts generated successfully');

  const backendProcess = spawn(DEV_COMMAND, [], { cwd: './backend', stdio: 'inherit', shell: true });

  backendProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Backend process closed with code ${code}`);
    }
    else {
      console.log('Backend started successfully');
    }
  });

  backendProcess.on('error', (error) => {
    console.error(`Failed to start: ${error}`);
  });

  return backendProcess;
}

let backendProcess = await spawnBackend();

chokidar.watch('./backend', {
  ignored: /(^|[/\\])\..*$/,
  persistent: true,
}).on('change', async (path) => {
  if (path.endsWith('.py')) {
    console.log(`${path} has been modified, restarting backend`);

    // Kill the current backend process
    backendProcess.kill();

    // Restart backend
    backendProcess = await spawnBackend();
  }
});
