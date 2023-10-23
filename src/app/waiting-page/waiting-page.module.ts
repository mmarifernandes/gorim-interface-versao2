import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WorldModule } from '../world/world.module';
import { WaitingPageComponent } from './waiting-page.component';

@NgModule({
    declarations : [
        WaitingPageComponent
    ],
    imports: [
        CommonModule,
        WorldModule
    ],
    exports: [
        WaitingPageComponent
    ]
})
export class WaitingPageModule {
    //
}