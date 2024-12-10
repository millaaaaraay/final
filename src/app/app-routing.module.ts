import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule)
  },
  {
    path: 'remedios',
    loadChildren: () => import('./remedios/remedios/remedios.module').then(m => m.RemediosPageModule)
  },
  {
    path: 'remedios-add',
    loadChildren: () => import('./remedios/remedios-add/remedios-add.module').then(m => m.RemediosAddPageModule),
   
  },
  {
    path: 'remedios-all',
    loadChildren: () => import('./remedios/remedios-all/remedios-all.module').then(m => m.RemediosAllPageModule),
    
  },
  {
    path: 'remedios-detail',
    loadChildren: () => import('./remedios/remedios-detail/remedios-detail.module').then(m => m.RemediosDetailPageModule)
  },
  {
    path: 'remedios-edit',
    loadChildren: () => import('./remedios/remedios-edit/remedios-edit.module').then(m => m.RemediosEditPageModule)
  },
  {
    path: 'remedios-list',
    loadChildren: () => import('./remedios/remedios-list/remedios-list.module').then(m => m.RemediosListPageModule)
  },  {
    path: 'rutinas-add',
    loadChildren: () => import('./remedios/rutinas-add/rutinas-add.module').then( m => m.RutinasAddPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
