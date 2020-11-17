import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

const modules = [AccordionModule, ButtonModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class PrimeNgModule {}
