import { Injectable } from "@angular/core";
import { Client, IPublishParams, StompSubscription } from '@stomp/stompjs';

import { environment } from "src/environments/environment";
import { Message } from "../chat/message";
import { ChatService } from "../chat/chat.service";
import { GameNotification, WSMessage } from "../models/game-notification";
import { BehaviorSubject } from "rxjs";
import { WSMT_CHAT, WSMT_GAME } from "../constants/constants";
import { ChatNotification } from "../chat/chat-notification";

const WebSocketURL = environment.WebSocketURL;

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private stompClient: Client = new Client();
    private idChatPessoa: string = '';

    private isItFirsTime: boolean = true;
    private subscription: StompSubscription = null;

    private newGameNotification = new BehaviorSubject<GameNotification>(null);
    sharedNewGameNotification = this.newGameNotification.asObservable();

    constructor(
        private chatService: ChatService
    ){ }

    isMessageEmpty(message: Message): boolean {
        if(
            message.chatId === '' &&
            message.content === '' &&
            message.recipientId === '' &&
            message.recipientName === '' &&
            message.senderId === '' &&
            message.senderName === '' &&
            message.status === null &&
            message.timestamp === null
        ){
            return true;
        }
        else return false;
    }
    
    config(idChatPessoa: string, password: string){
        this.idChatPessoa = idChatPessoa.toLowerCase();
        var that = this;
        this.stompClient.configure({
            brokerURL: WebSocketURL,
            connectHeaders: {
                username: this.idChatPessoa,
                password: password
            },
            debug: (str) => {
              console.log(str);
            },
            reconnectDelay: 500,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            logRawCommunication: false,
            onStompError: (frame) => {
              console.log("Stomp Error", frame);
            },
            onConnect: (frame) => {
              console.log(">>>>>> CONNECTED", frame);
              if (this.stompClient.connected) {
                this.subscription = this.stompClient.subscribe(
                    '/user/' + this.idChatPessoa + '/queue/messages',
                    (notification) => {
                        var notificationParsed = JSON.parse(notification.body) as WSMessage;
                        console.log(notification);
                        if(that.isChatNotification(notificationParsed)){
                            let chatNotification: ChatNotification = notificationParsed.c as ChatNotification;
                            console.log(chatNotification);
                            that.chatService.nextChatNotification(chatNotification);
                        }
                        else if(that.isGameNotification(notificationParsed)){
                            let gameNotification: GameNotification = notificationParsed.c as GameNotification;
                            console.log(gameNotification);
                            that.nextGameNotification(gameNotification);
                        }
                    }
                );
              }
            },
            onDisconnect: (frame) => {
              console.log(">>>> DISCONNECTED", frame);
            },
            onWebSocketClose: (frame) => {
              console.log(">>>>> CLOSED", frame);
            },
            onWebSocketError: (frame) => {
              console.log(">>>>> WS ERROR", frame);
            },
        });
        if(this.isItFirsTime){
            this.chatService.sharedSentMessages.subscribe(
                (message: Message) => {
                    if(!this.isMessageEmpty(message))
                        this.sendMessage(message)
                }
            );
            this.isItFirsTime = false;
        }
    }

    private nextGameNotification(newGameNotification){
        if (newGameNotification != null) this.newGameNotification.next(newGameNotification);
    }

    connect(){
        this.stompClient.activate();
    }

    disconnect(){
        this.stompClient.deactivate();
    }

    changeConnection(idChatPessoa: string, password: string){
        if((this.subscription != null) && (this.idChatPessoa != idChatPessoa)){
            this.chatService.nextCloseChatRoom('FECHAR_TODAS_AS_JANELAS');
    
            this.idChatPessoa = idChatPessoa.toLowerCase();
            this.subscription.unsubscribe();
    
            let that = this;
            this.subscription = this.stompClient.subscribe(
                '/user/' + this.idChatPessoa + '/queue/messages',
                (notification) => {
                    var notificationParsed = JSON.parse(notification.body) as WSMessage;
                    console.log(notification);
                    if(that.isChatNotification(notificationParsed)){
                        let chatNotification: ChatNotification = notificationParsed.c as ChatNotification;
                        console.log(chatNotification);
                        that.chatService.nextChatNotification(chatNotification);
                    }
                    else if(that.isGameNotification(notificationParsed)){
                        let gameNotification: GameNotification = notificationParsed.c as GameNotification;
                        console.log(gameNotification);
                        that.nextGameNotification(gameNotification);
                    }
                }
            );
        }
        else if((this.subscription == null) && (this.idChatPessoa != idChatPessoa)){
            this.config(idChatPessoa, password);
            this.connect();
        }
    }

    isChatNotification(msg: WSMessage): boolean {
        if(msg.t === WSMT_CHAT) return true;
        else return false
    }

    isGameNotification(msg): boolean {
        if(msg.t === WSMT_GAME) return true;
        else return false
    }

    sendMessage(message: Message){
        this.stompClient.publish(
            {
                destination: '/app/chat',
                body: JSON.stringify(message)
            } as IPublishParams
        );
    }

    isConnected(){
        return this.stompClient.connected;
    }
}