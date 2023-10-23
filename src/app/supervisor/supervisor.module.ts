import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { WorldModule } from '../world/world.module';
import { FineComponent } from './fine/fine.component';
import { GreenSealComponent } from './green-seal/green-seal.component';
import { SupervisorHistoryComponent } from './supervisor-history/supervisor-history.component';
import { SupervisorComponent } from './supervisor.component';

@NgModule({
    declarations: [
        SupervisorComponent,
        SupervisorHistoryComponent,
        FineComponent,
        GreenSealComponent
    ],
    imports: [
        CommonModule,
        MatExpansionModule,
        MatTabsModule,
        WorldModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatCheckboxModule
    ],
    exports: [
        SupervisorComponent
    ]
})
export class SupervisorModule {
    //
}