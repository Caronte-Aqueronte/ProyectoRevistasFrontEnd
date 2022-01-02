import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{CookieService} from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormLoginComponent } from './forms/form-login/form-login.component';
import { LoginComponent } from './login/login.component';
import { MenuLectorComponent } from './menus/menu-lector/menu-lector.component';
import { NavBarComponent } from './nav-bars/nav-bar-menu-lector/nav-bar.component';
import { EditarPerfilFormComponent } from './forms/editar-perfil-form/editar-perfil-form.component';
import { CrearUsuarioComponent } from './forms/crear-usuario/crear-usuario.component';
import { NavBarVacioComponent } from './nav-bars/nav-bar-vacio/nav-bar-vacio.component';
import { MenuEditorComponent } from './menus/menu-editor/menu-editor.component';
import { NavBarMenuEditorComponent } from './nav-bars/nav-bar-menu-editor/nav-bar-menu-editor.component';
import { ContenedorTagsParaUsuarioComponent } from './componentes-para-tags/tags-usuarios/contenedor-tags-para-usuario/contenedor-tags-para-usuario.component';
import { TagExistenteParaUsuarioComponent } from './componentes-para-tags/tags-usuarios/tag-existente-para-usuario/tag-existente-para-usuario.component';
import { ContenedorTagsDelUsuarioComponent } from './componentes-para-tags/tags-usuarios/contenedor-tags-del-usuario/contenedor-tags-del-usuario.component';
import { TagDelUsuarioComponent } from './componentes-para-tags/tags-usuarios/tag-del-usuario/tag-del-usuario.component';
import { FormSubirRevistasComponent } from './forms/form-subir-revistas/form-subir-revistas.component';
import { ContenedorCardRevistaComponent } from './cards/cards-para-lector/contenedor-card-revista/contenedor-card-revista.component';
import { CardRevistaComponent } from './cards/cards-para-lector/card-revista/card-revista.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SuscripcionFormComponent } from './forms/suscripcion-form/suscripcion-form.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { ContenedorCardRevistaEditorComponent } from './cards/cards-usuario-editor/contenedor-card-revista-editor/contenedor-card-revista-editor.component';
import { CardRevistaEditorComponent } from './cards/cards-usuario-editor/card-revista-editor/card-revista-editor.component';
import { ResumenRevistaParaSuscriptorComponent } from './resumenes-de-revistas/resumen-revista-para-suscriptor/resumen-revista-para-suscriptor.component';
import { FormPagarSuscripcionComponent } from './forms/form-pagar-suscripcion/form-pagar-suscripcion.component';
import { CardRevistaAdminstradorComponent } from './cards/cards-para-administrador/card-revista-adminstrador/card-revista-adminstrador.component';
import { ContenedorCardRevistaAdministradorComponent } from './cards/cards-para-administrador/contenedor-card-revista-administrador/contenedor-card-revista-administrador.component';
import { MenuAdministrativoComponent } from './menus/menu-administrativo/menu-administrativo.component';
import { NavBarAdministrativoComponent } from './nav-bars/nav-bar-administrativo/nav-bar-administrativo.component';
import { ResumenRevistaComponent } from './resumenes-de-revistas/resumen-revista/resumen-revista.component';
import { ResumenRevistaParaAdministradorComponent } from './resumenes-de-revistas/resumen-revista-para-administrador/resumen-revista-para-administrador.component';
import { ResumenRevistaParaUsuarioEditorComponent } from './resumenes-de-revistas/resumen-revista-para-usuario-editor/resumen-revista-para-usuario-editor.component';
import { AnuncioTextoComponent } from './anuncios/anuncio-texto/anuncio-texto.component';
import { AnuncioVideoComponent } from './anuncios/anuncio-video/anuncio-video.component';
import { AnuncioImagenComponent } from './anuncios/anuncio-imagen/anuncio-imagen.component';
import { CrearAnuncioImagenFormComponent } from './forms/anuncios/crear-anuncio-imagen-form/crear-anuncio-imagen-form.component';
import { CrearAnuncioTextoFormComponent } from './forms/anuncios/crear-anuncio-texto-form/crear-anuncio-texto-form.component';
import { CrearAnuncianteFormComponent } from './forms/anuncios/crear-anunciante-form/crear-anunciante-form.component';
import { CrearAnuncioVideoFormComponent } from './forms/anuncios/crear-anuncio-video-form/crear-anuncio-video-form.component';
import { CardAnuncioComponent } from './cards/cards-anuncios/card-anuncio/card-anuncio.component';
import { ContenedorCardAnuncioComponent } from './cards/cards-anuncios/contenedor-card-anuncio/contenedor-card-anuncio.component';
import { ReportesEditorComponent } from './reportes/reportes-editor/reportes-editor/reportes-editor.component';
import { ReportesAdministrativosComponent } from './reportes/reportes-administrativos/reportes-administrativos.component';

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
    ContenedorCardRevistaComponent,
    CardRevistaComponent,
    ResumenRevistaComponent,
    PerfilComponent,
    SuscripcionFormComponent,
    ComentarioComponent,
    ContenedorCardRevistaEditorComponent,
    CardRevistaEditorComponent,
    ResumenRevistaParaSuscriptorComponent,
    FormPagarSuscripcionComponent,
    CardRevistaAdminstradorComponent,
    ContenedorCardRevistaAdministradorComponent,
    MenuAdministrativoComponent,
    NavBarAdministrativoComponent,
    ResumenRevistaParaAdministradorComponent,
    ResumenRevistaParaUsuarioEditorComponent,
    AnuncioTextoComponent,
    AnuncioVideoComponent,
    AnuncioImagenComponent,
    CrearAnuncianteFormComponent,
    CrearAnuncioImagenFormComponent,
    CrearAnuncioTextoFormComponent,
    CrearAnuncioVideoFormComponent,
    CardAnuncioComponent,
    ContenedorCardAnuncioComponent,
    ReportesEditorComponent,
    ReportesAdministrativosComponent,
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
