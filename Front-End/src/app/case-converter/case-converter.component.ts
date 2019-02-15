import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-converter',
  templateUrl: './case-converter.component.html',
  styleUrls: ['./case-converter.component.css']
})
export class CaseConverterComponent implements OnInit {

  userInputField = '';
  userOutputField = '';
  constructor() { }

  ngOnInit() {
  }

  upperCase() {
    this.userOutputField = this.userInputField.toUpperCase();
  }

  lowerCase() {
    this.userOutputField = this.userInputField.toLowerCase();
  }

  camelCaseLower() {
    this.userOutputField = this.snakeCaseToCamelCaseLower(this.userInputField);
  }

  camelCaseUpper() {
    // tslint:disable-next-line:max-line-length
    this.userOutputField = this.snakeCaseToCamelCaseUpper(this.userInputField);
  }

  snakeCase() {
    this.userOutputField = this.camelToSnakeCase(this.userInputField.substring(0, 1).toLowerCase() + this.userInputField.substring(1));
  }
  /* snake case to camel case */
  // tslint:disable-next-line:max-line-length
  snakeCaseToCamelCaseLower = input => input.split('_').reduce((res, word, i) => i === 0 ? word.toLowerCase() : `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`, '');

  /* snake case to camel case */
  // tslint:disable-next-line:max-line-length
  snakeCaseToCamelCaseUpper = input => input.split('_').reduce((res, word, i) => i === 0 ? word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase() : `${res}${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`, '');


  /* camel Case to snake case */
  camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

  /* To copy Text from Textbox */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
