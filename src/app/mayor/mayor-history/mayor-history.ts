import { Tax } from '../postForm';

export interface MayorHistory {
    nome: string;
    rodadas: Turn[];
}

export interface Turn {
    rodada: number;
    nome: string;
    etapas: Stage[];
}

export interface Stage {
    multas: number;
    etapa: number;
    saldoAnterior: number;
    saldoAtual: number;
    poluicaoMundial: number;
    acoesAmbientais: string[];
    impostosModificados: Tax[];
    transferencias: Transfers;
    empresarios: Businessman[];
    agricultores: Farmer[];
}

export interface Transfers {
    recebidos: Transf[];
    enviados: Transf[];
}

export interface Transf {
    nome: string;
    valor: number;
}

export interface Businessman {
    imposto: number;
    produtividade: number;
    poluicao: number;
    nome: string;
    multa: number; //somente segunda etapa
}

export interface Farmer {
    imposto: number;
    poluicaoMedia: number;
    nome: string;
    multa: number; //somente segunda etapa
    produtividade: number;
    parcelas: Parcel[];
}

export interface Parcel {
    semente: string;
    pulverizador: boolean;
    fertilizante: string;
    maqAgr: string;
    seloVerde: boolean;
}