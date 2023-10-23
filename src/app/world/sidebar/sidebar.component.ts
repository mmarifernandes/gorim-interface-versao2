import { Component } from "@angular/core";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [ './sidebar.component.scss' ]
})
export class SideBarComponent { 

    isShown = false;

    toggle() {
        this.isShown = !this.isShown;
    }
}