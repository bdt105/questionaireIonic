import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'

import { MyApp } from './app.component';
import { HomePage } from '@pages/home/home';
import { ListPage } from '@pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Custom components
import { QuestionnairesLocalComponent } from '@components/questionnaire/questionnairesLocal.component';
import { TesterComponent } from '@components/tester/tester.component';
import { QuestionSimpleComponent } from '@components/question/questionSimple.component';
import { QuestionGroupComponent } from '@components/question/questionGroup.component';
import { QuestionEditComponent } from '@components/question/questionEdit.component';
import { QuestionsLocalComponent } from '@components/question/questionsLocal.component';
import { QuestionCheckComponent } from '@components/question/questionCheck.component';
import { QuestionnaireLocalComponent } from '@components/questionnaire/questionnaireLocal.component';
import { SearchComponent } from '@components/search/search.component';
import { MenuPopover} from '@components/popover/menu.popover';
import { ProgressBarComponent} from '@sharedComponents/progressBar.component';

// Pages
import { GenericPage } from '@pages/generic.page';
import { LoginPage } from '@pages/login/login.page';
import { QuestionnairesPage} from '@pages/questionnaire/questionnaires.page';
import { QuestionnairePage } from '@pages/questionnaire/questionnaire.page';
import { TesterDefinitionPage } from '@pages/tester/testerDefinition.page';
import { TesterPage } from '@pages/tester/tester.page';

// Custom services
import { MenuService } from '@sharedServices/menu.service';
import { ConfigurationService } from 'bdt105angularconfigurationservice';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { AuthGuard } from '@sharedServices/auth.guard';
import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { GroupByPipe } from '@sharedServices/groupBy.pipe';
import { SafePipe } from '@sharedServices/safe.pipe';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';

export function init(configurationService: ConfigurationService) {
    return () => {
        configurationService.load("configurationQuestionnaire", "./assets/configuration.json", false);
        configurationService.load("translateQuestionnaire", "./assets/translateFR.json", false);
    }
}

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        QuestionnairePage,
        QuestionnairesLocalComponent,
        QuestionnaireLocalComponent,
        QuestionsLocalComponent,
        QuestionSimpleComponent,
        QuestionGroupComponent,
        GroupByPipe,
        SafePipe,
        QuestionEditComponent,
        LoginPage,
        QuestionnairesPage,
        MenuPopover,
        TesterDefinitionPage,
        ProgressBarComponent,
        TesterPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        QuestionnairesLocalComponent,
        QuestionnaireLocalComponent,
        LoginPage,
        QuestionnairesPage,
        MenuPopover,
        QuestionnairePage,
        TesterDefinitionPage,
        ProgressBarComponent,
        TesterPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        QuestionnaireService,
        AuthGuard, MenuService, ConfigurationService, MiscellaneousService, 
        ConnexionTokenService, 
        {
            "provide": ErrorHandler, 
            "useClass": IonicErrorHandler
        },
        {
            'provide': APP_INITIALIZER,
            'useFactory': init,
            'deps': [ ConfigurationService ],
            'multi': true
        }
    ]
})
export class AppModule {}