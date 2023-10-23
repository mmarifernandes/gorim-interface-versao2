import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-inline-alert',
    templateUrl: './inline-alert.component.html',
    styleUrls: [ './inline-alert.component.scss' ]
})
export class InLineAlertComponent {
    @Input() message: string = '';
    @Input() type: string = 'danger';

}