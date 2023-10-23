import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { AppComponent } from '../app.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

//Components of farmers 
import { FarmerComponent } from './farmer.component';
import { ParcelComponent } from './parcel/parcel.component';
import { WorldModule } from '../world/world.module';
import { FarmerHistoryComponent } from './farmer-history/farmer-history.component';
import { VendaComponent } from './venda/venda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from './produto.service';
import { FarmerService } from './farmer.service';

@NgModule({
    declarations: [
        FarmerComponent,
        ParcelComponent,
        FarmerHistoryComponent,
        VendaComponent
    ],
    exports: [
        FarmerComponent,
    ],
    imports: [
        CommonModule,
        WorldModule,
        MatTabsModule, 
        MatSelectModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatCheckboxModule
    ],
    providers: [
        ProdutoService,
        FarmerService
    ],
    bootstrap: [ AppComponent ]
})
export class FarmerModule{}
