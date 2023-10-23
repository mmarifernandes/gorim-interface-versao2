import { EnvironmentalAction } from '../mayor/mayor';
import { Tax } from '../mayor/postForm';
import { Person } from '../world/models/person';

export interface Alderman extends Person{
    idEleito: number;
}