import { Tax } from '../../mayor/postForm';

export interface FarmerHistory {
    nome: string;
    rodadas: Turn[];
}

export interface Turn {
    rodada: number;
    etapa: number;
    produtividade: number;
    saldoAnterior: number;
    saldoAtual: number;
    imposto: number;
    poluicaoCausadaMundo: number;
    poluicaoPessoal: number;
    poluicaoMundial: number;
    multa: number;
    gastos: number;
    parcelas: Parcel[];
    transferencias: Transfers;
    acoesUtilizadas: string[];
    impostosModificados: Tax[];
}

export interface Parcel {
    semente: string;
    pulverizador: boolean;
    fertilizante: string;
    maqAgr: string;
    seloVerde: boolean;
}

export interface Transfers {
    recebidos: Transf[];
    enviados: Transf[];
}

export interface Transf {
    nome: string;
    valor: number;
}