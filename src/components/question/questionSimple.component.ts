import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericComponent } from '@sharedComponents/generic.component';

import { Toolbox, Rest } from 'bdt105toolbox/dist';
import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { QuestionLocalComponent } from '@components/question/questionLocal.component';
import { AlertController, ToastController } from 'ionic-angular';

@Component({
    selector: 'questionSimple',
    templateUrl: './questionSimple.component.html',
    providers: []
})

export class QuestionSimpleComponent extends QuestionLocalComponent {

    constructor(public questionnaireService: QuestionnaireService, 
        public miscellaneousService: MiscellaneousService, public alertController: AlertController, 
        public toastController: ToastController){
        super(questionnaireService, miscellaneousService, alertController, toastController);
    }

    ngOnInit(){
    }
    
}