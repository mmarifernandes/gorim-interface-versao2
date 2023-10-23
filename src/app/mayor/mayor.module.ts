import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { WorldModule } from '../world/world.module';
import { EnvironmentalActionComponent } from './environmental-action/environmental-action.component';
import { MayorHistoryComponent } from './mayor-history/mayor-history.component';
import { MayorComponent } from './mayor.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { TaxesComponent } from './taxes/taxes.component';

@NgModule({
    declarations: [
        MayorComponent,
        MayorHistoryComponent,
        EnvironmentalActionComponent,
        TaxesComponent,
        SuggestionListComponent
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
        MayorComponent
    ]
})
export class MayorModule {
    //
}