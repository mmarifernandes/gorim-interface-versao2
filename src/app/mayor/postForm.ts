export interface PostForm {
    impostos: Tax[];
    idAcoesAmbientais: number[];
}

export interface Tax {
    tipo: number;
    taxa: string;
}