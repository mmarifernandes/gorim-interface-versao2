import { Person } from '../world/models/person';

export interface Supervisor extends Person{
    idEleito: number;
    pedidos: Pedido[];
}

interface Pedido {
    nomeAgr: string;
    pedido: string;
}