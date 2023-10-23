import { AfterViewInit, Component, HostListener, Input, OnInit } from "@angular/core";
import { ChatNotification } from "../chat-notification";
import { ChatService } from "../chat.service";

@Component({
    selector: 'app-chat-room-list',
    templateUrl: './chat-room-list.component.html',
    styleUrls: [ './chat-room-list.component.scss' ]
})
export class ChatRoomListComponent implements OnInit, AfterViewInit {
    @Input() nomePessoa: string;
    @Input() idPessoa: number;
    @Input() idJogo: number;

    openedRooms: string[] = [];
    chatQuantity: number = 0;

    idChatPessoa: string;

    private limiteChatRooms: number = 0;

    constructor(
        private chatService: ChatService
    ){}

    ngOnInit(){
        this.chatService.sharedfriendNames.subscribe(
            (friendName: string) => {
                if(friendName != '' && !this.isRoomOpened(friendName)){
                    if(this.chatQuantity == this.limiteChatRooms){
                        this.openedRooms.shift();
                        this.chatQuantity--;
                    }
                    this.openedRooms.push(friendName);
                    this.chatQuantity++;
                }
            }
        );
        let that = this;
        this.chatService.sharedCloseChatRooms.subscribe(
            (chatRoom : string) => {
                let closeEverySingleOne: boolean = false;
                if(chatRoom === 'FECHAR_TODAS_AS_JANELAS') closeEverySingleOne = true;
                if(chatRoom != '') this.openedRooms.forEach(
                    function(room, index, object) {
                        if (room === chatRoom || closeEverySingleOne) {
                          object.splice(index, 1);
                          that.chatQuantity--;
                        }
                    }
                );
            }
        );
    }

    ngAfterViewInit(){
        this.configuraQuantidadeChatRooms();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.configuraQuantidadeChatRooms();
    }

    configuraQuantidadeChatRooms(){
        const windowWidth = window.innerWidth;

        if(windowWidth > 1080) this.limiteChatRooms = 4;
        else if(windowWidth < 680) this.limiteChatRooms = 2;
        else if(windowWidth < 1080) this.limiteChatRooms = 3;


        if(this.chatQuantity > this.limiteChatRooms){
            this.openedRooms.shift();
            this.chatQuantity--;
        }
    }

    getChatRoomClass(index: number){
        return 'col --chat-room room-' + (index+1);
    }

    isRoomOpened(value: string): boolean {
        let isOpened: boolean = false;
        this.openedRooms.forEach(
            (room: string) => {
                if(room == value) isOpened = true;
            }
        );
        return isOpened;
    }
}