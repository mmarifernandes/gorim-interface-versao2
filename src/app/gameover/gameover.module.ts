import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { WorldModule } from '../world/world.module';

import { GameOverComponent } from './gameover.component';

@NgModule({
    declarations: [
        GameOverComponent
    ],
    imports: [
        CommonModule,
        WorldModule,
        MatExpansionModule
    ],
    exports: [
        GameOverComponent
    ]
})
export class GameOverModule {
    //
}