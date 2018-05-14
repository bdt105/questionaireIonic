import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericComponent } from '@sharedComponents/generic.component';

import { Toolbox, Rest } from 'bdt105toolbox/dist';
import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { QuestionLocalComponent } from '@components/question/questionLocal.component';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'questionGroup',
    templateUrl: './questionGroup.component.html',
    providers: []
})

export class QuestionGroupComponent extends QuestionLocalComponent {

    constructor(public questionnaireService: QuestionnaireService,
        public miscellaneousService: MiscellaneousService, public alertCtrl: AlertController){
        super(questionnaireService, miscellaneousService, alertCtrl);
    }

    ngOnInit(){
    }

}