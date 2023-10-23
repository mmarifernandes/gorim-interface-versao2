import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldModule } from '../world/world.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChatModule } from 'ng-chat';

import { AppComponent } from '../app.component';
import { BusinessmanComponent } from './businessman.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { BusinessmanHistoryComponent } from './businessman-history/businessman-history.component';
import { VendaComponent } from './venda/venda.component';

@NgModule({
    declarations: [
        BusinessmanComponent,
        OrderProductComponent,
        BusinessmanHistoryComponent,
        VendaComponent
    ],
    imports: [
        CommonModule,
        WorldModule,
        MatTabsModule,
        MatSelectModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        NgChatModule
    ],
    exports: [
        BusinessmanComponent
    ],
    bootstrap: [AppComponent]
})
export class BusinessmanModule { }
