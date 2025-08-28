import {Injectable} from '@angular/core';
import {map, Observable, ReplaySubject} from 'rxjs';
import {GlobalEventData, GlobalEventType} from './global-event-types';

interface GlobalEventPayload<T extends GlobalEventType> {
  type: T;
  data: GlobalEventData[T];
}

@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {
  private subjects = new Map<GlobalEventType, ReplaySubject<any>>();

  private getOrCreateSubject<T extends GlobalEventType>(type: T): ReplaySubject<GlobalEventData[T]> {
    if (!this.subjects.has(type)) {
      this.subjects.set(type, new ReplaySubject<GlobalEventData[T]>(1));
    }
    return this.subjects.get(type)!;
  }

  emit<T extends GlobalEventType>(type: T, data: GlobalEventData[T]): void {
    const payload: GlobalEventPayload<T> = {type, data};
    console.log(`🌐 Global event emitted:`, payload);
    this.getOrCreateSubject(type).next(data);
  }

  on<T extends GlobalEventType>(type: T): Observable<GlobalEventData[T]> {
    return this.getOrCreateSubject(type).asObservable();
  }

  onAll(): Observable<GlobalEventPayload<any>> {
    const merged = Array.from(this.subjects.entries()).map(([type, subj]) =>
      subj.asObservable().pipe(map(data => ({type, data})))
    );
    return new Observable(observer => {
      const subs = merged.map(obs => obs.subscribe(observer));
      return () => subs.forEach(s => s.unsubscribe());
    });
  }

  destroy(): void {
    this.subjects.forEach(subj => subj.complete());
    this.subjects.clear();
  }
}
