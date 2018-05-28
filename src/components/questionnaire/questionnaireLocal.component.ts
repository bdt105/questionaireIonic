import { Component } from '@angular/core';

import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { QuestionnaireComponent } from '@appSharedComponents/questionnaire.component';
import { AlertController, ToastController } from 'ionic-angular';

@Component({
    selector: 'questionnaireLocal',
    templateUrl: './questionnaireLocal.component.html',
    providers: []
})

export class QuestionnaireLocalComponent extends QuestionnaireComponent {

    constructor(public questionnaireService: QuestionnaireService, public miscellaneousService: MiscellaneousService,
        public alertCtrl: AlertController, public toastController: ToastController) {
        super(questionnaireService, miscellaneousService);
    }

    delete() {
        if (this.questionnaireService.isQuestionnaireEmpty(this.questionnaire)) {
            super.delete();
        } else {
            let confirm = this.alertCtrl.create({
                title: this.translate("Deleting a " + this.translate(this.questionnaire.type) + " ?"),
                message: this.translate("Are you sure you want to delete that" + " " + this.translate(this.questionnaire.type) + " ?"),
                buttons: [
                    {
                        text: this.translate('No'),
                        handler: () => {

                        }
                    },
                    {
                        text: this.translate('Yes'),
                        handler: () => {
                            super.delete();
                        }
                    }
                ]
            });
            confirm.present();
        }
    }

    toast(message: string, duration = 3000) {
        let toast = this.toastController.create({
            message: message,
            duration: duration
        });
        toast.present();
    }

    private callbackToast(data: any, message: string) {
        this.toast(message);
    }

    duplicate() {
        this.questionnaireService.duplicateQuestionnaire(
            (data: any) => this.callbackToast(data, this.translate("Questionnaire duplicated. Go back to list to see it.")),
            (error: any) => this.callbackToast(error, this.translate("Questionnaire not duplicated")), this.questionnaire)
    }

    pasteQuestion(question: any){
        let fake: Function = ()=>{

        }
        this.questionnaireService.pasteQuestion(fake, fake, )
    }

    // importQuestion(){
    //     this.bsModalRef = this.modalService.show(ConfirmationComponent);
    //     this.bsModalRef.content.modalRef = this.bsModalRef;
    //     this.bsModalRef.content.title = this.translate("Importing a question");
    //     this.bsModalRef.content.readOnly = false;
    //     this.bsModalRef.content.bodyMessage = this.translate("Paste json format below and import");
    //     this.bsModalRef.content.button2Label = this.translate("Cancel");
    //     this.bsModalRef.content.button1Label = this.translate("Import");
    //     this.bsModalRef.content.button1Click.subscribe(result => {
    //         let json = this.bsModalRef.content.message;
    //         this.questionnaireService.importQuestion(json, this.questionnaire, 0);
    //     })
    // }    

    // export(){
    //     this.bsModalRef = this.modalService.show(ConfirmationComponent);
    //     this.bsModalRef.content.modalRef = this.bsModalRef;
    //     this.bsModalRef.content.title = this.translate("Exporting a questionnaire");
    //     this.bsModalRef.content.readOnly = false;
    //     this.bsModalRef.content.bodyMessage = this.translate("Copy the content below");;

    //     this.bsModalRef.content.message = JSON.stringify(this.questionnaire);
    // }

}