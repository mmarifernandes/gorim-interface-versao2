import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { JoinComponent } from './join.component';

@NgModule({
    declarations: [
        JoinComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        RouterModule,
        HttpClientModule
    ],
    exports: [
        JoinComponent
    ]
})
export class JoinModule { }