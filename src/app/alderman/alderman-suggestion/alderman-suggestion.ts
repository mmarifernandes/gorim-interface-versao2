import { Tax } from '../../mayor/postForm';

export interface AldermanSuggestion {
    imposto: Tax;
    acaoAmbiental: string;
    tipoSugestao: number;
    aceito: boolean;
    idSugestao: number;
}