import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RouteService {
 private s = new Subject<any>();
 setId(state:any){
   this.s.next(state);
 }
 getId():Observable<any>{
  return this.s.asObservable();
 }
}
