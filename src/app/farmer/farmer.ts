import { Person } from '../world/models/person';
export interface Farmer extends Person {
    qtdParcelas: number;
    idParcelaInicio: number;
    produtividade: number;
    poluicao: number;
    imposto: number;
    multa: number;
    gastos: number;
}
