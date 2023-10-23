import { Tax } from '../../mayor/postForm';

export interface AldermanHistory {
    nome: string;
    rodadas: Turn[];
}

export interface Turn {
    rodada: number;
    nome: string;
    etapas: Stage[];
}

export interface Stage {
    etapa: number;
    saldoAnterior: number;
    saldoAtual: number;
    poluicaoMundial: number;
    acoesAmbientais: string[];
    impostosModificados: Tax[];
    transferencias: Transfers;
}

export interface Transfers {
    recebidos: Transf[];
    enviados: Transf[];
}

export interface Transf {
    nome: string;
    valor: number;
}