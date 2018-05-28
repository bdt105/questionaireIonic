import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GenericComponent } from '@sharedComponents/generic.component';

import { QuestionnaireService } from '@appSharedServices/questionnaire.service';
import { MiscellaneousService } from '@sharedServices/miscellaneous.service';
import { QuestionComponent } from '@appSharedComponents/question.component';
import { AlertController, ToastController } from 'ionic-angular';

export class QuestionLocalComponent extends QuestionComponent {

    constructor(public questionnaireService: QuestionnaireService, 
        public miscellaneousService: MiscellaneousService, 
        public alertCtrl: AlertController,
        public toastController: ToastController) {
        super(questionnaireService, miscellaneousService);
    }

    ngOnInit() {
    }

    delete() {
        if (this.questionnaireService.isQuestionEmpty(this.question)) {
            super.delete();
        } else {
            let confirm = this.alertCtrl.create({
                title: this.translate("Deleting a question ?"),
                message: this.translate("Are you sure you want to delete that question ?"),
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


    deleteAnswer(answer: any) {
        if (this.questionnaireService.isAnswerEmpty(answer)) {
            super.deleteAnswer(answer)
        } else {
            let confirm = this.alertCtrl.create({
                title: this.translate("Deleting an answer ?"),
                message: this.translate("Are you sure you want to delete that answer ?"),
                buttons: [
                    {
                        text: this.translate('No'),
                        handler: () => {

                        }
                    },
                    {
                        text: this.translate('Yes'),
                        handler: () => {
                            super.deleteAnswer(answer);
                        }
                    }
                ]
            });
            confirm.present();
        }
    }

    newQuestionAfterQuestion(question: any) {
        if (this.questionnaire.showGroup) {
            let alert = this.alertCtrl.create({
                title: this.translate('New question'),
                subTitle: this.translate('Please un group your questionnaire first'),
                buttons: [this.translate('OK')]
            });
            alert.present();
        } else {
            super.newQuestionAfterQuestion(question);
        }
    }    

    copy(){
        this.questionnaireService.copyQuestion(this.question);
        this.toastController.create({message: this.translate("Question copied"), duration: 3000}).present();
    }

    paste(){
        let fake: Function = ()=>{
            this.toastController.create({message: this.translate("Question pasted"), duration: 3000}).present();
        }
        this.questionnaireService.pasteQuestion(fake, fake, this.questionnaire, this.question);
    }

    
    // deleteWithConfirmationQuestion(question: any) {
    //     if (this.questionnaireService.isQuestionEmpty(question)){
    //         this.deleteQuestion(this.questionnaire, question);
    //     }else{
    //         this.bsModalRef = this.modalService.show(ConfirmationComponent);
    //         this.bsModalRef.content.modalRef = this.bsModalRef;
    //         this.bsModalRef.content.title = this.translate("Deleting a questionnaire");
    //         this.bsModalRef.content.message = this.translate("Are you sure you want to delete question '" + question.question + "'");
    //         this.bsModalRef.content.button1Label = this.translate("Yes");
    //         this.bsModalRef.content.button2Label = this.translate("No");        
    //         this.bsModalRef.content.button1Click.subscribe(result => {
    //             this.deleteQuestion(this.questionnaire, question);
    //         })
    //     }
    // }    

    // deleteWithConfirmationAnswer(answer: any) {
    //     this.bsModalRef = this.modalService.show(ConfirmationComponent);
    //     this.bsModalRef.content.modalRef = this.bsModalRef;
    //     this.bsModalRef.content.title = this.translate("Deleting a answer");
    //     this.bsModalRef.content.message = this.translate("Are you sure you want to delete answer '" + answer.answer + "'");
    //     this.bsModalRef.content.button1Label = this.translate("Yes");
    //     this.bsModalRef.content.button2Label = this.translate("No");
    //     this.bsModalRef.content.button1Click.subscribe(result => {
    //         this.deleteAnswer(this.question, answer);
    //     })
    // }    

    // export(){
    //     this.bsModalRef = this.modalService.show(ConfirmationComponent);
    //     this.bsModalRef.content.modalRef = this.bsModalRef;
    //     this.bsModalRef.content.title = this.translate("Exporting a questionnaire");
    //     this.bsModalRef.content.readOnly = false;
    //     this.bsModalRef.content.bodyMessage = this.translate("Copy the content below");;

    //     this.bsModalRef.content.message = JSON.stringify(this.question);
    // }


}