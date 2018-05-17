import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericComponent } from '@sharedComponents/generic.component';

import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { SearchComponent } from '@appSharedComponents/search.component';
import { NavController } from 'ionic-angular';
import { QuestionnairePage } from '@pages/questionnaire/questionnaire.page';

@Component({
    selector: 'searchLocal',
    templateUrl: './searchLocal.component.html',
    providers: []
})

export class SearchLocalComponent extends SearchComponent{
   
    constructor( public miscellaneousService: MiscellaneousService, public questionnaireService: QuestionnaireService, private navController: NavController){
        super(miscellaneousService, questionnaireService);
    }

    goToQuestionnaire(id: string){
        this.navController.push(QuestionnairePage, {"id": id});
    }

}