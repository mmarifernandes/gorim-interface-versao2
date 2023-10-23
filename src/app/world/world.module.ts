import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { HeaderComponent } from './header/header.component';
import { TransferComponent } from './transfer/transfer.component';
import { TableProductValuesComponent } from './table-product-values/table-product-values.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { ConfirmingModalComponent } from './confirming-modal/confirming-modal.component';
import { AlertComponent } from './alert/alert.component';
import { InLineAlertComponent } from './inline-alert/inline-alert.component';
import { VotingComponent } from './voting/voting.component';
import { MatRadioModule } from '@angular/material/radio';
import { TableValuesComponent } from './table-values/table-values.component';
import { ChatComponent } from './chat/chat.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChatRoomComponent } from './chat/chat-room-list/chat-room/chat-room.component';
import { ChatRoomListComponent } from './chat/chat-room-list/chat-room-list.component';
import { FriendsListComponent } from './chat/friends-list/friends-list.component';

@NgModule({
    declarations: [
        HeaderComponent,
        TransferComponent,
        TableProductValuesComponent,
        TableValuesComponent,
        SideBarComponent,
        ConfirmingModalComponent,
        AlertComponent,
        InLineAlertComponent,
        VotingComponent,
        ChatComponent,
        ChatRoomComponent,
        ChatRoomListComponent,
        FriendsListComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatRadioModule,
        FormsModule,
        MatCardModule,
        MatExpansionModule
    ], 
    exports: [
        HeaderComponent,
        TransferComponent,
        TableProductValuesComponent,
        TableValuesComponent,
        SideBarComponent,
        ConfirmingModalComponent,
        AlertComponent,
        InLineAlertComponent,
        VotingComponent,
        ChatComponent
    ],
    entryComponents: [
        ConfirmingModalComponent
    ]
})
export class WorldModule { }