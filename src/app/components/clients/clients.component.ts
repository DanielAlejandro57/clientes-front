import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  /*   clients:any; */

  sharedKey:string=''
  businessId:string=''
  email:string=''
  phone:string=''
  dataAdded:string=''
  dataEnd:string=''
  searcher='';

  clientToSend:Client | undefined;


  constructor(private clientService: ClientsService,private router:Router) {
  }

  clients: any;


  ngOnInit(): void {
    this.getAllClients();




  }

  getAllClients() {
    this.searcher='';
    this.clientService.getClients().subscribe(data => {
      setTimeout(() => {
        this.clients = data;
      }, 500);




    })




  }



  sendData(){


    this.clientToSend={
      endDate:this.dataEnd,
      email:this.email,
      name:this.businessId,
      phone:this.phone,
      startDate:this.dataAdded,
      sharedKey:this.sharedKey
    }




    this.clientService.createClient(this.clientToSend).then(data=>{
      if(data='Creación de usuario exitoso'){
        alert('Creación de usuario exitoso')
        window.location.reload();
      }
      else{
        alert('Se ha producido un error')

      }
    })

  }


  setData(){
    this.sharedKey=''
    this.businessId=''
    this.email=''
    this.phone=''
    this.dataAdded=''
    this.dataEnd=''

    this.clientToSend={
      endDate:'',
      email:'',
      name:'',
      phone:'',
      sharedKey:'',
      startDate:''
    }

  }

  searchBySharedKey(){
    if(this.searcher!=''){
      this.clientService.getBySharedKey(this.searcher).subscribe(data=>{
        setTimeout(() => {
          this.clients=data;
        }, 500);

      })
    }


  }

}
