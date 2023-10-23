export interface GameOver {
    poluicaoMundo: number;
    resumoJogadores: ResumoJogador[];
    rodada: number;
    etapa: number;
    idJogo: number;
}

export interface ResumoJogador {
    nome: string;
    saldo: number;
    cidade: string;
    papel: string;
    //poluicaoCausadaMundo: number;
}