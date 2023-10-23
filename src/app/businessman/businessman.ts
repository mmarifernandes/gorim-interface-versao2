import { Person } from '../world/models/person';
export interface Businessman extends Person {
    setor: string;
    poluicao: number;
    produtividade: number;
    imposto: number;
    multa: number;
    produtos: Array<string>;
}
