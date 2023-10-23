import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { BeginModule } from './begin/begin.module';
import { ContinueModule } from './continue/continue.module';
import { WorldModule } from '../world/world.module';
import { JoinModule } from './join/join.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        BeginModule,
        ContinueModule,
        JoinModule,
        WorldModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule{
    //
}