import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { WorldModule } from '../world/world.module';
import { RightSideBarComponent } from './rightside-bar/rightside-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    declarations: [
        MasterComponent,
        RightSideBarComponent
    ],
    imports: [
        CommonModule,
        WorldModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        MasterComponent
    ]
})
export class MasterModule { }
