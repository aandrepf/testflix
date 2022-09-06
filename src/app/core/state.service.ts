import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

export class MoviesStateService<T> {
  private mainState$: BehaviorSubject<T>;
  protected get mainState(): T {
    return this.mainState$.getValue();
  }

  constructor(initialmainState: T) {
    this.mainState$ = new BehaviorSubject<T>(initialmainState);
  }

  protected select<K>(mapFn: (mainState: T) => K): Observable<K> {
    return this.mainState$.asObservable().pipe(
      map((mainState: T) => mapFn(mainState)),
      distinctUntilChanged()
    );
  }

  protected setMainState(newmainState: Partial<T>) {
    const maiState = newmainState;
    this.mainState$.next({
      ...this.mainState,
      ...maiState,
    });
  }
}
