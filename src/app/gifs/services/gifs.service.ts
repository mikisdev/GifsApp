import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _gifsList: Gif[] = []
  private _tagHistory: string[] = []
  private _apikey: string = 'HRFWrj43GrFnvrlAWoYE4QHFrT5p1bTO'
  private _header: string = 'https://api.giphy.com/v1/gifs/'

  constructor(private http: HttpClient){
    try{
      this._loadLocalStorage()
    }catch(e){
    }
  }

  get tagHistory(){
    return [...this._tagHistory]
  }

  get gifsList(){
    return [...this._gifsList]
  }

  private _saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

  private _loadLocalStorage(): void{
    if(!localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!)

    if(this._tagHistory.length ===0) return;

    this.searchTag(this._tagHistory[0])
  }

  private _organizeHistory(tag: string): void{

    tag = tag.toLowerCase()

    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter(oldTag => oldTag !== tag)
    }

    this._tagHistory.unshift(tag)
    this._tagHistory = this._tagHistory.splice(0,10)
    this._saveLocalStorage()
  }

  async searchTag(tag:string): Promise<void> {

    const params = new HttpParams()
      .set('api_key', this._apikey)
      .set('q', tag)
      .set('limit', '10')

    if(tag.length == 0) return;
    this._organizeHistory(tag)

    this.http.get<SearchResponse>(`${this._header}search`,{params})
      .subscribe((resp) => {

        this._gifsList = resp.data
        console.log({gifs: this._gifsList})
      })

    // fetch('https://api.giphy.com/v1/gifs/search?api_key=HRFWrj43GrFnvrlAWoYE4QHFrT5p1bTO&q=valorant&limit=10')
    //   .then(resp => resp.json())
    //   .then(data => console.log(data))
  }

}
