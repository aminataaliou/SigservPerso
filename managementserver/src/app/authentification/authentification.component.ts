import { Component,OnInit } from '@angular/core';
import {Authentification} from "../shareds/models/authentification";
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import {AuthentificationService} from "../shareds/services/authentification.service";
import {Router} from "@angular/router";

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
             ])
  });

  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthentificationService,
    private  router: Router
  ){}

  ngOnInit(): void {

  }


  authentsubmited (){
    console.log("**** SUBMITTED ****");
    const  auth = new Authentification();
    auth.username = this.authentform.get("email")?.value;
    auth.password = this.authentform.get("password")?.value;
    this.authentificationService.authenticateAndGetToken(auth).subscribe({
      next: (response)=>{
        const jwt = response.body ?? null;
        console.log("jwt");
        console.log(jwt['token']);
        localStorage.setItem('authenticationToken',jwt['token']);
        this.router.navigateByUrl("/admin");
      },

    })
  }

}


