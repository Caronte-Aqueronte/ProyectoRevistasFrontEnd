import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{CookieService} from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { LoginComponent } from './login/login.component';
import { MenuLectorComponent } from './menus/menu-lector/menu-lector.component';
import { NavBarComponent } from './nav-bars/nav-bar-menu-lector/nav-bar.component';
import { EditarPerfilFormComponent } from './editar-perfil-form/editar-perfil-form.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { NavBarVacioComponent } from './nav-bars/nav-bar-vacio/nav-bar-vacio.component';
import { MenuEditorComponent } from './menus/menu-editor/menu-editor.component';
import { NavBarMenuEditorComponent } from './nav-bars/nav-bar-menu-editor/nav-bar-menu-editor.component';
import { ContenedorTagsParaUsuarioComponent } from './componentes-para-tags/tags-usuarios/contenedor-tags-para-usuario/contenedor-tags-para-usuario.component';
import { TagExistenteParaUsuarioComponent } from './componentes-para-tags/tags-usuarios/tag-existente-para-usuario/tag-existente-para-usuario.component';
import { ContenedorTagsDelUsuarioComponent } from './componentes-para-tags/tags-usuarios/contenedor-tags-del-usuario/contenedor-tags-del-usuario.component';
import { TagDelUsuarioComponent } from './componentes-para-tags/tags-usuarios/tag-del-usuario/tag-del-usuario.component';
import { FormSubirRevistasComponent } from './form-subir-revistas/form-subir-revistas.component';
import { CardRevistaComponent } from './card-revista/card-revista.component';
import { ContenedorCardRevistaComponent } from './contenedor-card-revista/contenedor-card-revista.component';
import { ResumenRevistaComponent } from './resumen-revista/resumen-revista.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SuscripcionFormComponent } from './suscripcion-form/suscripcion-form.component';
import { AccesoARevistaComponent } from './acceso-arevista/acceso-arevista.component';
import { ComentarioComponent } from './comentario/comentario.component';


@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    LoginComponent,
    MenuLectorComponent,
    NavBarComponent,
    EditarPerfilFormComponent,
    CrearUsuarioComponent,
    NavBarVacioComponent,
    MenuEditorComponent,
    NavBarMenuEditorComponent,
    ContenedorTagsParaUsuarioComponent,
    TagExistenteParaUsuarioComponent,
    TagDelUsuarioComponent,
    ContenedorTagsDelUsuarioComponent,
    FormSubirRevistasComponent,
    CardRevistaComponent,
    ContenedorCardRevistaComponent,
    ResumenRevistaComponent,
    PerfilComponent,
    SuscripcionFormComponent,
    AccesoARevistaComponent,
    ComentarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
