declare var parseBarcode: any;
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { createBlock, getAllBlocks } from '../../actions';
import { BlockState } from '../../reducers';

@Component({
  selector: 'app-block-palet',
  templateUrl: './block-palet.component.html',
  styleUrls: ['./block-palet.component.css']
})
export class BlockPaletComponent implements OnInit {

  public sscc: FormControl;
  public blockForm: FormGroup;
  public errorBlock: any;
  public bSubmitted: boolean;

  blockState$: BlockState;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.store.select('blockApp').subscribe(block => this.blockState$ = block);
  }

  ngOnInit(): void {
    this.store.dispatch(getAllBlocks());

    this.bSubmitted = false;
    this.sscc = new FormControl('', [Validators.required]);
    this.errorBlock = '';

    this.blockForm = this.formBuilder.group({
      sscc: this.sscc,
    });
  }

  saveBlock(){

    this.bSubmitted = true;

    /* const form = this.blockForm.value;

    this.store.dispatch(createBlock({block:form})); */

    this.blockForm.reset();

  }

  interpreteBarcode(){
    "use strict";

    try{

      let answer= parseBarcode(this.codi());

      return answer.parsedCodeItems.forEach(this.basedades);

    } catch (e){
      console.log(e);
  }
    
  }

  basedades(element: any, index: any,array: any){
    const ai=element.ai;
    let data=element.data;

    if (ai=='00'){
      this.sscc.setValue=(data);
    } 
  }  

  codi(){
    if (this.sscc.value != ''){
      return this.sscc.value;
    }
  }  

}
