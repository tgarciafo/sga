import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { getAllLocations } from '../../../../locations/actions';
import { LocationState } from '../../../../locations/reducers';
import { FormControl, FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-introduccio-palets',
  templateUrl: './introduccio-palets.component.html',
  styleUrls: ['./introduccio-palets.component.css']
})
export class IntroduccioPaletsComponent implements OnInit {

  locationState$: LocationState;


  public num_entrada: FormControl;
  public location_id: FormControl;
  public regEntradaForm: FormGroup;
  public bSubmitted: boolean;

  show: boolean=true;
  show2: boolean=false;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { 
    this.store.select('locationApp').subscribe(locations => this.locationState$ = locations);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllLocations());
    this.bSubmitted = false;
    this.location_id = new FormControl('', [Validators.required]);
    this.num_entrada = new FormControl('', [Validators.required]);

    this.regEntradaForm = this.formBuilder.group({
      num_entrada: this.num_entrada,
      location_id: this.location_id,
    });
  }

  goEntry(){
    this.show=false;
    this.show2=true;
  }

}
