import { Injectable } from '@angular/core';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { HomePage } from '@pages/home/home';
import { LoginPage } from '@pages/login/login.page';
import { TesterDefinitionPage } from '@pages/tester/testerDefinition.page';
import { QuestionnairesPage } from '@pages/questionnaire/questionnaires.page';
import { SearchPage } from '@pages/search/search.page';

@Injectable()
export class MenuLocalService {

    constructor(private miscellaneousService: MiscellaneousService){
        
    }

    public pages = [
        { title: this.miscellaneousService.translate('Home'), component: HomePage, icon: "home" },
        { title: this.miscellaneousService.translate('Login'), component: LoginPage, icon: "person" },
        { title: this.miscellaneousService.translate('Test'), component: TesterDefinitionPage, icon: "checkmark-circle" },
        { title: this.miscellaneousService.translate('Questionnaires & tests'), component: QuestionnairesPage, icon: "help" },
        { title: this.miscellaneousService.translate('Search'), component: SearchPage, icon: "search" }
    ];
}