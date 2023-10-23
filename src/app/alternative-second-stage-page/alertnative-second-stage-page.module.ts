import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WorldModule } from '../world/world.module';

import { AlternativeSecondStagePageComponent } from './alertnative-second-stage-page.component';

@NgModule({
    declarations: [
        AlternativeSecondStagePageComponent
    ],
    imports: [
        CommonModule,
        WorldModule
    ],
    exports: [
        AlternativeSecondStagePageComponent
    ]
})
export class AletrnativeSecondStagePageModule {
    //
}