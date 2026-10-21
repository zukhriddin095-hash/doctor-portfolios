import uz from '@/messages/uz.json';
import ru from '@/messages/ru.json';
import type { Locale } from './config';

/** Every key in uz.json must exist in ru.json: TypeScript fails the build otherwise. */
export type Dict = typeof uz;
const dictionaries: Record<Locale, Dict> = { uz, ru };
export const getDictionary = (locale: Locale): Dict => dictionaries[locale];
export type DictKey = keyof Dict;
