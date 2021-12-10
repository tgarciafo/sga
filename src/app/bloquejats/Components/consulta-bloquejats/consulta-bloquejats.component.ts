import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { consultaPalBloquejats } from '../../actions';
import { BloquejatState } from '../../reducers';
import * as XLSX from 'xlsx';
import { WebSocketService } from 'src/app/Views/webSocket/web-socket.service';
import { UserState } from 'src/app/user/reducers';

@Component({
  selector: 'app-consulta-bloquejats',
  templateUrl: './consulta-bloquejats.component.html',
  styleUrls: ['./consulta-bloquejats.component.css']
})
export class ConsultaBloquejatsComponent implements OnInit {

  bloquejatState$: BloquejatState;
  userState$: UserState;
  userType: string | undefined;

  alertMsg: string;
      
  isAlert: boolean = false;

  constructor(private store: Store<AppState>, private webSocketService: WebSocketService) {
    this.store.select('bloquejatsApp').subscribe(bloquejats => this.bloquejatState$ = bloquejats);
    this.store.select('userApp').subscribe(user => {
      this.userType = user.user?.type;
      this.userState$ = user
    });
    this.webSocketService.bloquejarEven.subscribe(res => {
      if(this.userType == 'Client'){  
        this.store.dispatch(consultaPalBloquejats({client_id: this.userState$.user?.client_id}));  
      }else{
        this.store.dispatch(consultaPalBloquejats({client_id: 0}));
      }      this.isAlert = true;
      this.alertMsg = res.alert;
    }) 
  }

  ngOnInit(): void {
    if(this.userType == 'Client'){  
      this.store.dispatch(consultaPalBloquejats({client_id: this.userState$.user?.client_id}));  
    }else{
      this.store.dispatch(consultaPalBloquejats({client_id: 0}));
    }
  }

  close(){
    this.isAlert = false;
  }

  fileName= 'consulta.xlsx';  

exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
    }

}
