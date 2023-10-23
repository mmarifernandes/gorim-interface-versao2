import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChatNotification } from "../../chat-notification";

import { ChatService } from "../../chat.service";
import { Message } from "../../message";

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: [ './chat-room.component.scss' ]
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
    @Input() friendName: string;
    @Input() personName: string;
    @Input() idJogo: number;
    
    idChatPessoa: string;
    idChatAmigo: string;
    chatRoomId: string;

    @ViewChild('scrollMe') private scrollMe: ElementRef;

    messages: Message[] = [];
    hasNewMessages: boolean;

    chatForm: FormGroup;

    panelOpenState: boolean;
    private isFirstLoad: boolean;

    constructor(
        private chatService: ChatService,
        private formBuilder: FormBuilder
    ){ }

    ngOnInit(){
        this.idChatPessoa = this.personName.toLowerCase() + this.idJogo;

        let aux: string[] = this.friendName.split(' ');
        this.idChatAmigo = (aux.length > 1) ? (aux[0].toLowerCase() + this.idJogo) : (this.friendName.toLowerCase() + this.idJogo);
        this.chatRoomId = this.idChatPessoa + '_' + this.idChatAmigo;
        this.panelOpenState = false;
        this.isFirstLoad = true;

        this.chatService.loadMessages(this.idChatPessoa, this.idChatAmigo).subscribe(
            (data: Message[]) => {
                if(data != null) this.messages = data
            },
            (err) => console.log(err)
        );
        this.inicializaForm();
        
                    
        this.chatService.sharedChatNotifications.subscribe(
            (notification: ChatNotification) => {
                this.onChatMessageReceived(notification);
            },
            (err) => console.log(err)
        );
    }

    fecharChatRoom(){
        this.chatService.nextCloseChatRoom(this.friendName);
    }

    ngAfterViewChecked(){
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        try {
            if(this.panelOpenState === true)
            this.scrollMe.nativeElement.scrollTop = this.scrollMe.nativeElement.scrollHeight;
        } catch(err){
            console.log(err);
        }
    }

    inicializaForm(){
        this.chatForm = this.formBuilder.group({
            message: ['', [Validators.required]]
        });
    }

    isMine(sender: string){
        if(sender.includes(this.friendName)) return 'receivedMessage';
        return 'sentMessage';
    }

    getHour(timestamp: number){
        var newDate: Date = new Date(timestamp);
        var strMinutes = newDate.getMinutes().toString();
        if (newDate.getMinutes() < 10) strMinutes = '0' + strMinutes;
        
        return newDate.getHours().toString() + ':' + strMinutes;
    }

    enterPressed(event: KeyboardEvent){
        if(!event.shiftKey) this.sendMessage();
    }

    sendMessage(){
        this.isFirstLoad = false;
        let message: string = this.chatForm.get('message').value.replace(new RegExp('\n', 'g'), "<br />");
        while(message.endsWith('<br />')) message = message.substring(0, message.length-6);
        if(message.trim() === '') return;
        let newChatMessage: Message = {
            content: message,
            status: null,
            chatId: this.chatRoomId,
            senderId: this.idChatPessoa,
            timestamp: new Date,
            senderName: this.personName,
            recipientId: this.idChatAmigo,
            recipientName: this.friendName
        };
        this.messages.push(newChatMessage);
        this.scrollToBottom();
        this.inicializaForm();
        this.chatService.nextSentMessages(newChatMessage);
    }

    onChatMessageReceived(notification: ChatNotification): boolean | void {
        if(notification.senderName === this.friendName){
            this.hasNewMessages = true;
            if (!this.isFirstLoad){
                this.chatService.getNewMessage(notification.id).subscribe(
                    (data: Message) => this.messages.push(data),
                    (err) => console.log(err)
                );
            }
            else this.isFirstLoad = false;
            this.scrollToBottom();
            this.inicializaForm();
        }
    }

    seenNewMessages(){
        this.hasNewMessages = false;
        this.chatService.nextReadMessages(this.friendName);
    }

    getNewMessageCircleColour(): string {
        if(this.hasNewMessages) return 'green-circle';
        return 'transparent-circle';
    }
}