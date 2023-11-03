import { Injectable } from "@angular/core";
import { IDictionary } from "../Interfaces/IDictionary";
import { Observable, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IItem } from "../Interfaces/IItem";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private baseURL: string = "https://testminapi.azurewebsites.net/";
 // private baseURL: string = "https://localhost:7042/";
  private dictionariesURL: string = this.baseURL + "Dictionarys";
  private dictionaryURL: string = this.baseURL + "Dictionary";
  private itemsURL: string = this.baseURL + "Items";
  private itemURL: string = this.baseURL + "Item";
  constructor(private http: HttpClient) { }


  getDictionaries(): Observable<IDictionary[]> {
    return this.http.get<IDictionary[]>(this.dictionariesURL).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError));
  }

  getItem(itemID: string): Observable<IItem> {
    return this.http.get<IItem>(this.itemURL + "/" + itemID).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError));
  }

  getItems(dictionaryID: string): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.itemsURL + "/" + dictionaryID).pipe(
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError));
  }

  addDictionary(newDictionaryName: string): Observable<any> {
    const postBody = { name: newDictionaryName };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.dictionaryURL, postBody, httpOptions );
  }

  addItem(dictionaryID: string, newKey: string, newMessage: string): Observable<any> {
    const postBody = {
      Key: newKey,
      Message: newMessage,
      DictionaryID: dictionaryID
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.itemURL, postBody, httpOptions);
  }

  deleteDictionary(dictionaryID: string): Observable<any> {
    return this.http.delete(this.dictionaryURL + "/" + dictionaryID);
  }
  deleteItem(itemID: string): Observable<any> {
    return this.http.delete(this.itemURL + "/" + itemID);
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }


}
