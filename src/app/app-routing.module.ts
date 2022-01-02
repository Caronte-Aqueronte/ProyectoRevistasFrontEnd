import { MenuLectorComponent } from './menus/menu-lector/menu-lector.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardMenuLectorGuard } from 'src/Guards/guard-menu-lector.guard';
import { EditarPerfilFormComponent } from './forms/editar-perfil-form/editar-perfil-form.component';
import { CrearUsuarioComponent } from './forms/crear-usuario/crear-usuario.component';
import { MenuEditorComponent } from './menus/menu-editor/menu-editor.component';
import { GuardMenuEditorGuard } from 'src/Guards/guard-menu-editor.guard';
import { FormSubirRevistasComponent } from './forms/form-subir-revistas/form-subir-revistas.component';
import { ContenedorCardRevistaComponent } from './cards/cards-para-lector/contenedor-card-revista/contenedor-card-revista.component';
import { ResumenRevistaComponent } from './resumenes-de-revistas/resumen-revista/resumen-revista.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SuscripcionFormComponent } from './forms/suscripcion-form/suscripcion-form.component';
import { ResumenRevistaParaSuscriptorComponent } from './resumenes-de-revistas/resumen-revista-para-suscriptor/resumen-revista-para-suscriptor.component';
import { MenuAdministrativoComponent } from './menus/menu-administrativo/menu-administrativo.component';
import { ContenedorCardRevistaAdministradorComponent } from './cards/cards-para-administrador/contenedor-card-revista-administrador/contenedor-card-revista-administrador.component';
import { ContenedorCardRevistaEditorComponent } from './cards/cards-usuario-editor/contenedor-card-revista-editor/contenedor-card-revista-editor.component';
import { ResumenRevistaParaAdministradorComponent } from './resumenes-de-revistas/resumen-revista-para-administrador/resumen-revista-para-administrador.component';
import { ResumenRevistaParaUsuarioEditorComponent } from './resumenes-de-revistas/resumen-revista-para-usuario-editor/resumen-revista-para-usuario-editor.component';
import { CrearAnuncianteFormComponent } from './forms/anuncios/crear-anunciante-form/crear-anunciante-form.component';
import { CrearAnuncioImagenFormComponent } from './forms/anuncios/crear-anuncio-imagen-form/crear-anuncio-imagen-form.component';
import { CrearAnuncioVideoFormComponent } from './forms/anuncios/crear-anuncio-video-form/crear-anuncio-video-form.component';
import { CrearAnuncioTextoFormComponent } from './forms/anuncios/crear-anuncio-texto-form/crear-anuncio-texto-form.component';
import { ContenedorCardAnuncioComponent } from './cards/cards-anuncios/contenedor-card-anuncio/contenedor-card-anuncio.component';
import { GuardMenuAdministradorGuard } from 'src/Guards/guard-menu-administrador.guard';
import { ReportesEditorComponent } from './reportes/reportes-editor/reportes-editor/reportes-editor.component';
import { ReportesAdministrativosComponent } from './reportes/reportes-administrativos/reportes-administrativos.component';

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
      component: ResumenRevistaParaSuscriptorComponent
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
    },
    {
      path: "revistas",
      component: ContenedorCardRevistaEditorComponent
    },
    {
      path: "configuracion/:nombreRevista/:usuarioCreador",
      component: ResumenRevistaParaUsuarioEditorComponent,
    },
    {
      path: "reportes",
      component: ReportesEditorComponent,
    }]
  },
  {
    path: "menu-administrativo",
    canActivate: [GuardMenuAdministradorGuard],
    component: MenuAdministrativoComponent,
    children: [
      {
        path: "editar-perfil",
        component: EditarPerfilFormComponent
      },
      {
        path: "costo-revistas",
        component: ContenedorCardRevistaAdministradorComponent
      },
      {
        path: "costo/:nombreRevista/:usuarioCreador",
        component: ResumenRevistaParaAdministradorComponent
      },
      {
        path: "crear-anunciante",
        component: CrearAnuncianteFormComponent,
      },
      {
        path: "crear-anuncio/imagen-texto",
        component: CrearAnuncioImagenFormComponent
      },
      {
        path: "crear-anuncio/video-texto",
        component: CrearAnuncioVideoFormComponent
      },
      {
        path: "crear-anuncio/texto",
        component: CrearAnuncioTextoFormComponent
      },
      {
        path: "anuncios",
        component: ContenedorCardAnuncioComponent
      },
      {
        path: "reportes",
        component: ReportesAdministrativosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
