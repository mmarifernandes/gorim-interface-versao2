import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmingModal } from './confirming-modal';
import { ResponseModalService } from './response-modal.service';

@Component({
    selector: 'app-confirming-modal',
    templateUrl: './confirming-modal.component.html',
    styleUrls: [ './confirming-modal.component.html' ]
})
export class ConfirmingModalComponent implements OnInit{
    
    constructor(
        private dialogRef: MatDialogRef<ConfirmingModalComponent>,
        private responseModalService: ResponseModalService,
        @Inject(MAT_DIALOG_DATA) public content: ConfirmingModal
    ){ }

    ngOnInit(){
        //
    }

    action(response: boolean) {
        this.responseModalService.nextResponse(response);
        this.closeModal();
    }

    closeModal() {
        this.dialogRef.close();
    }
}