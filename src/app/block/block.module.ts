import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { BlockPaletComponent } from './Components/block-palet/block-palet.component';
import { ConsultaBlockComponent } from './Components/consulta-block/consulta-block.component';

@NgModule({
  declarations: [
    BlockPaletComponent,
    ConsultaBlockComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPrintModule
  ]
})
export class BlockModule { }