import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as sha256 from 'sha256';
import { ChatReq, ChatRes } from 'models/chat';

// http://128.199.159.89:5005/webhooks/rest/webhook

const backendEndpoint: string = 'http://localhost:4200/api';

@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  sessionID: string = '';

  constructor(private http: HttpClient) {
    new Promise<any>((resolve, reject) => {
      var dateTime = new Date();
      this.sessionID = sha256(dateTime.valueOf().toString());
      resolve(true);
    });
  }

  message(messageString: string): Observable<ChatRes> {
    var body: ChatReq = {
      sender: this.sessionID,
      message: messageString,
    };
    return this.http.post<ChatRes>('/api', body);
  }
}
