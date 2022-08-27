import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { tabDataI } from "../Model/tabData";

@Injectable()

export class TabService {
    constructor(private http: HttpClient) { }

    public localUrl = 'assets/data/tabs.json';

    getTabs(): Observable<tabDataI[]> {
        return this.http.get<tabDataI[]>(this.localUrl);
    }
}