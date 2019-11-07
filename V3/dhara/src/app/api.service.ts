import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Places,Location, DamageStatus } from './places';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { RequestOptions, Http } from '@angular/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers:any = new Headers();
  options:any;
  URL: string = 'http://localhost:5000';

  constructor(private httpClient: Http) { 
    this.headers.append('Access-Control-Allow-Origin' , '*');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.append('Accept','application/json');
    this.headers.append('content-type','application/json');
    this.options = new RequestOptions({ headers:this.headers});
  }


  getPlace(location):Observable<Location>{
    this.headers.append('Access-Control-Allow-Origin' , '*');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.append('Accept','application/json');
    this.headers.append('content-type','application/json');
    // return this.httpClient.post<any>(this.URL+'/get-nearest-location',JSON.stringify(location),{ headers:this.headers}).pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // )
    console.log(JSON.stringify(location)+"@@@");
    console.log(this.httpClient.post(this.URL+'/get-nearest-location/',JSON.stringify(location)));
    
    return this.httpClient.post(this.URL+'/get-nearest-location/',JSON.stringify(location),{ headers:this.headers}).pipe(map(res=>res.json()));
    
  }

  getSafeRoute(location):Observable<Location>{
    this.headers.append('Access-Control-Allow-Origin' , '*');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.append('Accept','application/json');
    this.headers.append('content-type','application/json');
    // return this.httpClient.post<any>(this.URL+'/get-nearest-location',JSON.stringify(location),{ headers:this.headers}).pipe(
    //   retry(1),
    //   catchError(this.handleError)
    // )
    return this.httpClient.post(this.URL+'/safe-route/',JSON.stringify(location),{ headers:this.headers}).pipe(map(res=>res.json()));
    
  }

  updateDamageStatus(damageStatus):Observable<DamageStatus>{
    this.headers.append('Access-Control-Allow-Origin' , '*');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.append('Accept','application/json');
    this.headers.append('content-type','application/json');
    // return this.httpClient.post<any>(this.URL+'/add-damaged-place',JSON.stringify(damageStatus),{ headers:this.headers}).pipe(
    //   retry(1),
    //   catchError(this.handleError)    
    // )
    return this.httpClient.post(this.URL+'/add-damaged-place/',JSON.stringify(damageStatus),{ headers:this.headers}).pipe(map(res=>res.json()));
  }


   // Error handling 
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }


// .catch((err)=>{

// console.error(err);

// });

//   }

//   public getPlaces(){

    
//     return this.httpClient.get<Places[]>(`${this.placesapiURL}/getPlaces`);
// }
}
