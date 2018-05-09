import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  validateInput(string){
    if(string == null || string == undefined || string == ''){
      return false
    }else {
      return true
    }
  }
}
