export interface PostForm {
    multas: Fine[];
    selosVerde: GreenSeal[];
}

export interface Fine {
    idPessoa: number;
    tipo: number;
}

export interface GreenSeal {
    idAgr: number;
    parcelas: number[];
    atribuir: boolean;
}