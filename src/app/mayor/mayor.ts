import { Person } from '../world/models/person';

export interface Mayor extends Person{
    idEleito: number;
    caixa: number;
    acoesAmbientais: EnvironmentalAction[];
    taxas: number[];
}

export interface EnvironmentalAction {
    id: number;
    tipo: string;
    custo: number;
    reducaoDaPoluicao: number;
}