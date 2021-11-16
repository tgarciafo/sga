import { Component, OnInit } from '@angular/core';
import { PlanificationState } from '../../reducers';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { consultaPlanifications, deleteEntirePlanification } from '../../actions';

@Component({
  selector: 'app-consulta-planificats',
  templateUrl: './consulta-planificats.component.html',
  styleUrls: ['./consulta-planificats.component.css']
})
export class ConsultaPlanificatsComponent implements OnInit {

  faTrashAlt = faTrashAlt;

  planificationState$: PlanificationState;

  constructor(private store: Store<AppState>) { 
    this.store.select('planificationApp').subscribe(planifications => this.planificationState$ = planifications);
  }

  ngOnInit(): void {
    this.store.dispatch(consultaPlanifications());
  }

  eliminar(albara_sortida: string){
    this.store.dispatch(deleteEntirePlanification({albara_sortida: albara_sortida}))
  }

}
