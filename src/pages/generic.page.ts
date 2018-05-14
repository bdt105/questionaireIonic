import { OnInit } from '@angular/core';

import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { Toolbox } from 'bdt105toolbox/dist';
import { NavController } from 'ionic-angular';
import { LoginPage } from '@pages/login/login.page';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';

export class GenericPage implements OnInit {

    public toolbox: Toolbox = new Toolbox();

    constructor(public miscellaneousService: MiscellaneousService, public navController: NavController, public connexionTokenService: ConnexionTokenService){
    }

    ngOnInit(){
        if (!this.connexionTokenService.isConnected()){
            this.navController.push(LoginPage);
        }
    }

    translate(text: string){
        return this.miscellaneousService.translate(text);
    } 

    configuration(){
        return this.miscellaneousService.configuration();
    }   
    
    isConnected(){
        return this.connexionTokenService.isConnected();
    }
    
}