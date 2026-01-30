import { Book, Sport } from './types.js'
import { v7 as uuidv7 } from 'uuid'

export function stringToSport (input: string): Sport | undefined {
    return Object.values(Sport).includes(input as Sport) ? input as Sport : undefined;
};

export function stringToBook (input: string): Book | undefined {
    return Object.values(Book).includes(input as Book) ? input as Book: undefined;
};

export function generateId (): string {
    return uuidv7();
} 
