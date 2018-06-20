import { Component, OnInit} from '@angular/core';
import { QuestionnaireService } from '../services/questionnaire.service';
import { Question , Result} from '../models';
import { ChartComponent } from '../chart/chart.component';
import * as _ from 'lodash';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuestionnaireService]
})

export class QuizComponent implements OnInit {
	name: string = '';
	description: string = '';
	questions: Question[] = [];
	result: Result[] = [];
  showChart: boolean = false;
  isSubmitted: boolean = false;
 
  constructor(private _quesService: QuestionnaireService) { }

  ngOnInit() {
    this.getQuestionnaire('data/questionnaire.json');
  }

  getQuestionnaire(questionnairePath: string): void {
  	this._quesService.getQuestionnaire(questionnairePath).subscribe(res => {
  		this.name = _.get(res,'name', '');
  		this.description = _.get(res,'description', '');
  		this.questions = _.get(res,'questions', []);
  		this.result = _.get(res,'result', []);
  	});
    this.showChart = false;
    this.isSubmitted = false;
  }

  onChange (optionId, questionId) {
    this.showChart = false;
    this.questions = this.questions.map(question => {
      if(question.id === questionId) {
        question.answered = true;
        let opt = _.find(question.options, ['id', Number(optionId)]);
        if(opt !== undefined && opt.isAnswer) {
          // remove from in-correct
          this.result = this.result.map(item => {
            if(item.id === 'incorrect' && item.resultIds.includes(questionId)) {
              item.resultIds = item.resultIds.filter(ele => ele !== questionId);
              item.value = item.resultIds.length || 0;
            }
            return item;
          });

          // update correct answer
          this.result = this.result.map(item => {
            if(item.id === 'correct' && !item.resultIds.includes(questionId)) {
              item.resultIds = [...item.resultIds, questionId];
              item.value = item.resultIds.length || 0;
            }
            return item;
          });
        } else {
          // remove from correct
          this.result = this.result.map(item => {
            if(item.id === 'correct' && item.resultIds.includes(questionId)) {
              item.resultIds = item.resultIds.filter(ele => ele !== questionId);
              item.value = item.resultIds.length || 0;
            }
            return item;
          });
          // update uncorrect answer
          this.result = this.result.map(item => {
            if(item.id === 'incorrect' && !item.resultIds.includes(questionId)) {
              item.resultIds = [...item.resultIds, questionId];
              item.value = item.resultIds.length || 0;
            }
            return item;
          });
        }
      }
      return question;
    });
  }
  onSubmit () {
    this.isSubmitted = true;
    if(this.isAnswred() && this.showChart === false) {
      this.showChart = !this.showChart;
    }
  }
  isAnswred () {
    return !this.questions.some(ques => ques.answered === false);
  }

  reset () {
    this.getQuestionnaire('data/questionnaire.json');
  }
}
