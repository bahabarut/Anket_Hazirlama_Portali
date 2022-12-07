import { AdminCevapComponent } from './components/admin/admin-cevap/admin-cevap.component';
import { SoruComponent } from './components/soru/soru.component';
import { AnketComponent } from './components/anket/anket.component';
import { Anket } from './models/Anket';
import { AuthGuard } from './services/AuthGuards';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminAnketComponent } from './components/admin/admin-anket/admin-anket.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminSoruComponent } from './components/admin/admin-soru/admin-soru.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["admin"],
      gerigit: "/login"
    }
  },
  {
    path: 'admin/anket',
    component: AdminAnketComponent
  },
  {
    path: 'admin/kategori',
    component: AdminKategoriComponent,
    canActivate: [AuthGuard],
    data: {
      yetkiler: ["Admin"],
      gerigit: "/login"
    }
  },
  {
    path: 'admin/uye',
    component: AdminUyeComponent
  },
  {
    path: 'admin/soru',
    component: AdminSoruComponent
  },
  {
    path: 'admin/cevap',
    component: AdminCevapComponent
  },
  {
    path: 'soru/:katId',
    component: SoruComponent
  },
  {
    path: 'admin/soru/:AnkId',
    component: AdminSoruComponent
  },
  {
    path: 'anket',
    component: AnketComponent
  },
  {
    path: 'soru',
    component: SoruComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
