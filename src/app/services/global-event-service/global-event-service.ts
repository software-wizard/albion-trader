import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {GlobalEventData, GlobalEventType} from './global-event-types'

interface GlobalEventPayload<T extends GlobalEventType> {
  type: T;
  data: GlobalEventData[T];
}

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {
  private eventSubject = new Subject<GlobalEventPayload<any>>();

  /**
   * Emit global event with data
   */
  emit<T extends GlobalEventType>(type: T, data: GlobalEventData[T]): void {
    const payload: GlobalEventPayload<T> = {
      type,
      data,
    };

    console.log(`🌐 Global event emitted:`, payload);
    this.eventSubject.next(payload);
  }

  /**
   * Listen to specific global event type
   */
  on<T extends GlobalEventType>(type: T): Observable<GlobalEventData[T]> {
    return this.eventSubject.pipe(
      filter((payload): payload is GlobalEventPayload<T> => payload.type === type),
      map(payload => payload.data)
    );
  }

  /**
   * Listen to all global events (useful for debugging)
   */
  onAll(): Observable<GlobalEventPayload<any>> {
    return this.eventSubject.asObservable();
  }

  /**
   * Complete the event bus (cleanup)
   */
  destroy(): void {
    this.eventSubject.complete();
  }
}
