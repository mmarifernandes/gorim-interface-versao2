import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BeginComponent } from './begin.component';
import { BeginService } from './begin.service';
import { WorldModule } from 'src/app/world/world.module';

@NgModule({
    declarations: [
        BeginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        WorldModule
    ],
    exports: [
        BeginComponent
    ],
    providers: [
        BeginService
    ]
})
export class BeginModule{
    //
}