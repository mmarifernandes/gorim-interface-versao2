export interface WSMessage {
    t: string;
    c: any;
}

export interface GameNotification {
    code: number;
    message: any;
}

export interface ECGameStatusMessage {
    status: number;
    rodada: number;
    etapa: number;
}

export interface ECPessoaComecouJogadaInterface {
    idPessoa: number;
    nomePessoa: string;
    etapa: number;
}

export interface ECPessoaFinalizouJogadaInterface {
    idPessoa: number;
    nomePessoa: string;
    etapa: number;
}