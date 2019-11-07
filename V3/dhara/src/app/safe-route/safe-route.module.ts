import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SafeRoutePage } from './safe-route.page';

const routes: Routes = [
  {
    path: '',
    component: SafeRoutePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SafeRoutePage]
})
export class SafeRoutePageModule {}
