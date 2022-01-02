import { Component, Input, OnInit } from '@angular/core';
import { Anuncio } from 'src/Modelos/anuncio';
import { BackendServiceConsultaAdministrativaService } from 'src/Servicios/backend-service-consulta-administrativa.service';

@Component({
  selector: 'app-card-anuncio',
  templateUrl: './card-anuncio.component.html',
  styleUrls: ['./card-anuncio.component.css']
})
export class CardAnuncioComponent implements OnInit {

  @Input() datosCard!: Anuncio;

  constructor(private backendService:BackendServiceConsultaAdministrativaService) { }

  ngOnInit(): void {
  }

  public cambiarEstado() {
    //mandamos el anuncio asignado en esta card para que el backend cambie el estado
    this.backendService.cambiarEstadoAnuncio(this.datosCard).subscribe
    ((nuevoestado:string) =>{
      this.datosCard.estado = nuevoestado;//esperamos la respuesta e igualamos el nuevo 
    });
  }
}
