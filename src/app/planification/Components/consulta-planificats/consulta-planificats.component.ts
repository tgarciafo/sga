import { Component, OnInit } from '@angular/core';
import { PlanificationState } from '../../reducers';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { consultaPlanifications, deleteEntirePlanification } from '../../actions';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';

@Component({
  selector: 'app-consulta-planificats',
  templateUrl: './consulta-planificats.component.html',
  styleUrls: ['./consulta-planificats.component.css']
})
export class ConsultaPlanificatsComponent implements OnInit {

  faTrashAlt = faTrashAlt;

  planificationState$: PlanificationState;

  alertMsg: string;
      
  isAlert: boolean = false;

  constructor(private store: Store<AppState>, private webSocketService: WebSocketService) { 
    this.store.select('planificationApp').subscribe(planifications => this.planificationState$ = planifications);
    this.webSocketService.planificarEven.subscribe(res => {
      this.store.dispatch(consultaPlanifications());
      this.isAlert = true;
      this.alertMsg = res.alert;
    }) 
  }

  ngOnInit(): void {
    this.store.dispatch(consultaPlanifications());
  }

  close(){
    this.isAlert = false;
  }

  eliminar(albara_sortida: string){

    if(confirm("Segur que vols eliminar el registre?")){

    this.store.dispatch(deleteEntirePlanification({albara_sortida: albara_sortida}))

    const alert = 'Palets eliminats a la planificació';

    this.webSocketService.planificarEvent({alert: alert, albara: albara_sortida});

    }
  }

}
