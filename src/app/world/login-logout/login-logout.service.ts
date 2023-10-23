import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { WebStorageService } from "../web-storage/webstorage.service";
import { LoginBodyRequest } from "./loginBodyRequest";
import { LoginBodyResponse } from "./loginBodyResponse";

const API = environment.ApiUrl + '/request/api';
const LOG_ROUTE = '/authenticate';

@Injectable({
    providedIn: 'root'
})
export class LoginLogoutService {
    
    constructor(
        private httpClient: HttpClient,
        private webStorageService: WebStorageService
    ){ }

    login(
        idJogo: number,
        idPessoa: number,
        nomePessoa: string
    ){
        let body: LoginBodyRequest = {
            username: nomePessoa + idJogo,
            password: nomePessoa + idPessoa
        };

        return this.httpClient.post<LoginBodyResponse>(
            API + LOG_ROUTE,
            body
        );
    }

    logout(){
        this.webStorageService.removeData(['authToken']);
    }
}