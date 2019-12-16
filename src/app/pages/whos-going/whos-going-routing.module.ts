import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhosGoingComponent } from './whos-going.component';

const routes: Routes = [
  {
    path: '',
    component: WhosGoingComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhosGoingRoutingModule { }
