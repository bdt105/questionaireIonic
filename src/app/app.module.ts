import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Custom components
import { QuestionnairesLocalComponent } from '../components/questionnaire/questionnairesLocal.component';
import { TesterComponent } from '../components/test/tester.component';
import { QuestionSimpleComponent } from '../components/question/questionSimple.component';
import { QuestionGroupComponent } from '../components/question/questionGroup.component';
import { QuestionEditComponent } from '../components/question/questionEdit.component';
import { QuestionsLocalComponent } from '../components/question/questionsLocal.component';
import { QuestionCheckComponent } from '../components/question/questionCheck.component';
import { QuestionnaireLocalComponent } from '../components/questionnaire/questionnaireLocal.component';
import { QuestionnaireOneComponent } from '../components/questionnaire/questionnaireOne.component';
// import { ConfirmationComponent } from '../components/standard/confirmation.component';
import { SearchComponent } from '../components/search/search.component';

// Custom services
import { MenuService } from '@sharedServices/menu.service';
import { ConfigurationService } from 'bdt105angularconfigurationservice';
import { ConnexionTokenService } from 'bdt105angularconnexionservice';
import { AuthGuard } from '@sharedServices/auth.guard';
import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { GroupByPipe } from '@sharedServices/groupBy.pipe';
import { SafePipe } from '@sharedServices/safe.pipe';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    QuestionnairesLocalComponent,
    QuestionnaireLocalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    QuestionnairesLocalComponent,
    QuestionnaireLocalComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QuestionnaireService,
    AuthGuard, MenuService, ConfigurationService, MiscellaneousService, 
        ConnexionTokenService, QuestionnaireService,
    {
      "provide": ErrorHandler, 
      "useClass": IonicErrorHandler
    }
  ]
})
export class AppModule {}
