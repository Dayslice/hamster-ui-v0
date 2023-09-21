import { execSync } from 'child_process';

// Get the name from the arguments
const name = process.argv[2] || 'DefaultMigrationName';

const command = `npm run build && npm run typeorm migration:generate -- src/db/migrations/${name} --dataSource src/ormdatasource.ts`;

// Execute the command
execSync(command, { stdio: 'inherit' });
