import { DataSource } from 'typeorm';
import connectionOptions from './ormconfig';

export const AppDataSource = new DataSource(connectionOptions);
