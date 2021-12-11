import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from './pages/navigator.component';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from './services/api.service';
import { FullNamePipe } from './pipes/full-name.pipe';

const routes: Routes = [
  {
    path: '',
    component: NavigatorComponent,
  },
];

@NgModule({
  declarations: [NavigatorComponent, FullNamePipe],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [ApiService],
})
export class NavigatorModule {}
