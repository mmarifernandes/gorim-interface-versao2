import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmingModal } from './confirming-modal';
import { ConfirmingModalComponent } from './confirming-modal.component';

@Injectable({
    providedIn: 'root'
})
export class ConfirmingModalService {
    
    constructor(
        private matDialog: MatDialog
    ){ }
    
    /*
    *   @param disableClose: user can't close the dialog by clicking outside its body
    */
    openModal(
        confirmingModal: ConfirmingModal,
        id: string,
        width: string = '400px',
        height: string = '250px',
        disableClose: boolean = true
    ){
        const dialogConfig = new MatDialogConfig();

        dialogConfig.id = id;
        dialogConfig.height = height;
        dialogConfig.width = width;
        dialogConfig.disableClose = disableClose;
        dialogConfig.data = confirmingModal;

        // https://material.angular.io/components/dialog/overview
        const modalDialog = this.matDialog.open(ConfirmingModalComponent, dialogConfig);
    }
}