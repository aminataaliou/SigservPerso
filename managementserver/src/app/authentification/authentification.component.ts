import { Component,OnInit } from '@angular/core';
import {Authentification} from "../shareds/models/authentification";
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import {AuthentificationService} from "../shareds/services/authentification.service";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.less']
})
export class AuthentificationComponent {

  authentform = new FormGroup ({
    email : new FormControl("",
            [Validators.required]),

    password : new FormControl("",
              [ Validators.required,
                Validators.minLength(5),
                Validators.maxLength(9)])
  });

  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthentificationService,
  ){}

  ngOnInit(): void {

  }


  authentsubmited (){
    const  auth = new Authentification();
    auth.username = this.authentform.get("email")?.value;
    auth.password = this.authentform.get("password")?.value;
    this.authentificationService.authenticateAndGetToken(auth).subscribe(
      (res) => {
        console.log("authentification",res.body);
      },
      (err)=>{}
        )
  }

}


