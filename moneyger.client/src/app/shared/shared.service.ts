import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private refreshProfileSubject = new Subject<void>();
  refreshProfile$ = this.refreshProfileSubject.asObservable();

  triggerRefreshProfile() {
    this.refreshProfileSubject.next();
  }
}
