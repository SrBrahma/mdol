import { typePrefix } from './consts';

export type Dict = Record<string, any>;
export type TagType = keyof typeof typePrefix;
export type TagStyle = 'open' | 'close' | 'selfClose';
