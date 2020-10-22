import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificateComponent } from './certificate/certificate.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    pathMatch: 'full'

  },
  {
    path:'certificate/:cert/:attf/:attl',
    component: CertificateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
