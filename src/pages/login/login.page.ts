import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { GenericComponent } from '@sharedComponents/generic.component';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { QuestionnaireService } from '@appSharedServices/questionnaire.service';

import { ViewEncapsulation, ElementRef, PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { NavController } from 'ionic-angular';
import { GenericPage } from '@pages/generic.page';
import { QuestionnairesPage } from '@pages/questionnaire/questionnaires.page';
import { HomePage } from '@pages/home/home';

@Component({
    selector: 'login-page',
    templateUrl: './login.page.html',
    providers: []
})

export class LoginPage extends GenericComponent {
    loginUrl: any;
    
    public loadComplete = false;

    @Output() connected: EventEmitter<any> = new EventEmitter<any>();
    @Output() disconnected: EventEmitter<any> = new EventEmitter<any>();

    constructor(public connexionTokenService: ConnexionTokenService, private sanitizer: DomSanitizer, public navController: NavController,
        public questionnaireService: QuestionnaireService, public miscellaneousService: MiscellaneousService){
            super(miscellaneousService  );
    }

    init(){
        if (!this.loadComplete){
            let load = this.miscellaneousService.getConfigurationPromise().
            then(()=>{
                this.loadComplete = true;
                console.log("load is complete");
                this.loginUrl = this.miscellaneousService.configuration().common.loginUrl;                
            });
        }

        window.addEventListener('message', (event) => {
            if (event.data){
                if (event.data.type == "connexion"){
                    this.toolbox.writeToStorage("connexion", event.data, false);
                    // this.navController.push(QuestionnairesPage);
                    this.navController.setRoot(HomePage);
                    this.navController.goToRoot({});
                }
            }else{
                this.toolbox.removeFromStorage("connexion");
            }
        }, false);  

    }

    ngOnInit(){
        this.init();        
    }

    getCurrentUser(){
        return this.connexionTokenService.getUser();
    }

    getApplicationName(){
        return this.miscellaneousService.configuration().common.applicationName;
    }

    isConnected(){
        return this.connexionTokenService.isConnected();
    }


}