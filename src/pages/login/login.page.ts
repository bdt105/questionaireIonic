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

export class LoginPage extends GenericComponent  {

    loginUrl: any;
    
    public loadComplete = false;

    constructor(public connexionTokenService: ConnexionTokenService, private sanitizer: DomSanitizer, public navController: NavController,
        public questionnaireService: QuestionnaireService, public miscellaneousService: MiscellaneousService){
            super(miscellaneousService);
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

        // let toto = {
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXIiOjEsImxvZ2luIjoiYmR0MTA1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFZuL3pQQ004c1NTYVluUm1nZ1Y0Q083ZUhMaklwS05uVTB4ai8xNmljZXBaeXpxSWtWSlJpIiwiZW1haWwiOiJiZHQxMDVAZ21haWwuY29tIiwidHlwZSI6MCwiY291bnRyeSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImZpcnN0bmFtZSI6bnVsbCwicGhvbmUxIjpudWxsLCJwaG9uZTIiOm51bGwsInBob25lMyI6bnVsbCwidGFnIjpudWxsLCJhdmFpbGFiaWxpdHkiOm51bGwsImxhbmd1YWdlIjpudWxsLCJvZmZpY2UiOm51bGwsInBvc3RhbGNvZGUiOm51bGwsImNpdHkiOm51bGwsImFkZHJlc3MxIjpudWxsLCJhZGRyZXNzMiI6bnVsbCwiYXBwbGljYXRpb24iOiJxdWVzdGlvbm5haXJlIiwidmFsaWRhdGVkIjowLCJvcmdhbmlzYXRpb24iOm51bGwsImNyZWF0aW9uZGF0ZSI6IjIwMTgtMDUtMDhUMTE6NDY6NTcuMDAwWiIsInVwZGF0ZWRhdGUiOiIyMDE4LTA1LTA4VDExOjQ2OjU3LjAwMFoiLCJpYXQiOjE1MjYzOTY4MzV9.iXVrvUBRQJf3SbaTHoDE7RZccfp3ntdX0xRV9qGX6go",
        //     "status": "OK",
        //     "decoded": {
        //         "iduser": 1,
        //         "login": "bdt105@gmail.com",
        //         "password": "$2a$10$Vn/zPCM8sSSaYnRmggV4CO7eHLjIpKNnU0xj/16icepZyzqIkVJRi",
        //         "email": "bdt105@gmail.com",
        //         "type": 0,
        //         "country": null,
        //         "lastname": null,
        //         "firstname": null,
        //         "phone1": null,
        //         "phone2": null,
        //         "phone3": null,
        //         "tag": null,
        //         "availability": null,
        //         "language": null,
        //         "office": null,
        //         "postalcode": null,
        //         "city": null,
        //         "address1": null,
        //         "address2": null,
        //         "application": "questionnaire",
        //         "validated": 0,
        //         "organisation": null,
        //         "creationdate": "2018-05-08T11:46:57.000Z",
        //         "updatedate": "2018-05-08T11:46:57.000Z",
        //         "iat": 1526396835
        //     },
        //     "type": "connexion",
        //     "rememberMe": null
        // };
        // this.toolbox.writeToStorage(this.connexionStorageKey, toto, true);

        window.addEventListener('message', (event) => {
            if (event.data){
                if (event.data.type == "connexion"){
                    this.miscellaneousService.storeConnexion(event.data, event.data.rememberMe);
                    // this.navController.push(QuestionnairesPage);
                    // this.navController.setRoot(HomePage);
                    this.navController.goToRoot({});
                }
            }else{
                this.miscellaneousService.cleanConnexion();
            }
        }, false);  

    }

    ngOnInit(){
        this.init();        
    }

    isConnected(){
        return this.miscellaneousService.isConnected();
    }


}