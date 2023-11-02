import { Component,OnInit } from '@angular/core';
import {Authentification} from "../shareds/models/authentification";
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.less']
})
export class AuthentificationComponent {

  authentform = new FormGroup ({
    email : new FormControl("",
            [Validators.required,
             Validators.email]),

    password : new FormControl("",
              [ Validators.required, 
                Validators.minLength(5),
                Validators.maxLength(9)])
  }); 

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    
  }


  authentsubmited (){
    console.log(this.authentform.value)
  }
  
}


