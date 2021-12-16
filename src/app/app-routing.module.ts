import { MenuLectorComponent } from './menus/menu-lector/menu-lector.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardMenuLectorGuard } from 'src/Guards/guard-menu-lector.guard';
import { EditarPerfilFormComponent } from './editar-perfil-form/editar-perfil-form.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { MenuEditorComponent } from './menus/menu-editor/menu-editor.component';
import { GuardMenuEditorGuard } from 'src/Guards/guard-menu-editor.guard';
import { FormSubirRevistasComponent } from './form-subir-revistas/form-subir-revistas.component';
import { ContenedorCardRevistaComponent } from './contenedor-card-revista/contenedor-card-revista.component';
import { ResumenRevistaComponent } from './resumen-revista/resumen-revista.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SuscripcionFormComponent } from './suscripcion-form/suscripcion-form.component';
import { AccesoARevistaComponent } from './acceso-arevista/acceso-arevista.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent

  },
  {
    path: "registrarse",
    component: CrearUsuarioComponent

  },
  {
    path: "menu-lector",
    component: MenuLectorComponent,
    canActivate: [GuardMenuLectorGuard],
    children: [{
      path: "editar-perfil",
      component: EditarPerfilFormComponent
    },
    {
      path: "revistas",
      component: ContenedorCardRevistaComponent
    },
    {
      path: "resumen",
      component: ResumenRevistaComponent
    },
    {
      path: "resumen/:nombreRevista/:usuarioCreador",
      component: ResumenRevistaComponent
    },
    {
      path: "perfilEditor/:nombreUsuario",
      component: PerfilComponent
    },
    {
      path: "suscribirse/:nombreRevista/:usuarioCreador",
      component: SuscripcionFormComponent
    },
    {
      path: "revista/:nombreRevista/:usuarioCreador",
      component: AccesoARevistaComponent
    }]
  },
  {
    path: "menu-editor",
    component: MenuEditorComponent,
    canActivate: [GuardMenuEditorGuard],
    children: [{
      path: "editar-perfil",
      component: EditarPerfilFormComponent
    },
    {
      path: "publicar-revista",
      component: FormSubirRevistasComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
