import { Component, Input, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: [ './alert.component.scss' ]
})
export class AlertComponent implements OnInit{
    
    @Input() timeOut = 3000;
    alerts: Alert[] = [];

    constructor(
        private alertService: AlertService
    ){ }

    ngOnInit(){
        this.alertService.getAlert()
            .subscribe(
                alert => {
                    if(alert){
                        this.alerts.push(alert);
                        setTimeout(
                            () => this.removeAlert(alert), this.timeOut
                        );
                    }
                }
            );
    }

    removeAlert(alertToRemove: Alert){
        this.alerts = this.alerts.filter(
            alert => alert != alertToRemove
        );
    }

    getAlertType(alert: Alert){
        if(!alert) return '';
        switch(alert.alertType){

            case AlertType.DANGER:
                return 'alert alert-danger';
            case AlertType.INFO:
                return 'alert alert-info';
            case AlertType.WARNING:
                return 'alert alert-warning';
            case AlertType.SUCCESS:
                return 'alert alert-success';
            
        }
    }
}