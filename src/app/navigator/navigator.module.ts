import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from './pages/navigator.component';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './services/api.service';

const routes: Routes = [
  {
    path: '',
    component: NavigatorComponent,
  },
];

@NgModule({
  declarations: [NavigatorComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [ApiService],
})
export class NavigatorModule {}
