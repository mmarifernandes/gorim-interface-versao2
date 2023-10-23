import { Component, Input, OnInit } from "@angular/core";
import { PersonSimplified } from "../../models/person.simplified";
import { ChatNotification } from "../chat-notification";
import { ChatService } from "../chat.service";
import { FriendCell } from "./friend-cell";

@Component({
    selector: 'app-chat-friends-list',
    templateUrl: './friends-list.component.html',
    styleUrls: [ './friends-list.component.scss' ]
})
export class FriendsListComponent implements OnInit {
    @Input() nomePessoa: string;
    @Input() idPessoa: number;
    @Input() idJogo: number;

    friendsList: Map<string, FriendCell>;
    receivedMessages: number[];

    panelOpenState: boolean = false;

    constructor(
        private chatService: ChatService
    ){}

    ngOnInit(){
        this.friendsList = new Map<string, FriendCell>();
        this.chatService.loadFriendsList(this.idJogo, this.idPessoa).subscribe(
            (data: PersonSimplified[]) => {
                if(data != null){
                    this.friendsList.clear();
                    data.forEach(person => {
                        this.friendsList.set(person.nomeCurto, {friend: person, hasNewMessage: false} as FriendCell);
                    });
                    this.chatService.sharedChatNotifications.subscribe(
                        (notification: ChatNotification) => this.onChatNotificationReceived(notification)
                    );
                    this.chatService.sharedReadMessages.subscribe(
                        (friendName: string) => this.onReadMessages(friendName)
                    );
                }
            }
        );
    }

    getFriendsList(): Array<FriendCell>{
        return Array.from(this.friendsList.values());
    }

    onChatNotificationReceived(notification: ChatNotification){
        if(notification.senderName){
            this.friendsList.get(notification.senderName).hasNewMessage = true;
        }
    }

    onReadMessages(friendName: string){
        if(friendName != ''){
            let aux: string[] = friendName.split(' ');
            if (aux.length > 1)
                this.friendsList.get(aux[0]).hasNewMessage = false;
            else
                this.friendsList.get(friendName).hasNewMessage = false;
        }
    }

    openNewRoom(friendName: string){
        this.chatService.nextFriendName(friendName);
    }

    getNewMessageCircleColour(hasNewMessage: boolean): string {
        if(hasNewMessage) return 'green-circle';
        return 'transparent-circle';
    }

}