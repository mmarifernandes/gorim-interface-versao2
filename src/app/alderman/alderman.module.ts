import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { WorldModule } from '../world/world.module';
import { AldermanHistoryComponent } from './alderman-history/alderman-history.component';
import { AldermanSuggestionComponent } from './alderman-suggestion/alderman-suggestion.component';
import { AldermanComponent } from './alderman.component';
import { ResponseListComponent } from './response-list/response-list.component';

@NgModule({
    declarations: [
        AldermanComponent,
        AldermanHistoryComponent,
        AldermanSuggestionComponent,
        ResponseListComponent
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
        AldermanComponent
        // ,
        // AldermanHistoryComponent,
        // AldermanSuggestionComponent
    ]
})
export class AldermanModule {
    //
}