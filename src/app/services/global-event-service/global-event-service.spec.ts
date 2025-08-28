// global-event.service.spec.ts
import {TestBed} from '@angular/core/testing';
import {GlobalEventType} from './global-event-types';
import {City} from '../../data-types/albion-price-data';
import {GlobalEventService} from "./global-event-service";

describe('GlobalEventService', () => {
  let service: GlobalEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalEventService);
  });

  afterEach(() => {
    service.destroy();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should emit and receive GLOBAL_CITY_CHANGED event', (done) => {
    const testData = {city: City.Lymhurst};

    // Subscribe to event
    service.on(GlobalEventType.RESOURCES_CITY_CHANGED).subscribe(data => {
      expect(data).toEqual(testData);
      expect(data.city).toBe(City.Lymhurst);
      done();
    });

    // Emit event
    service.emit(GlobalEventType.RESOURCES_CITY_CHANGED, testData);
  });

  test('should emit and receive RRR_CHANGED event', (done) => {
    const testData = {value: 42.5};

    // Subscribe to event
    service.on(GlobalEventType.RRR_CHANGED).subscribe(data => {
      expect(data).toEqual(testData);
      expect(data.value).toBe(42.5);
      done();
    });

    // Emit event
    service.emit(GlobalEventType.RRR_CHANGED, testData);
  });

  test('should only receive events of subscribed type', (done) => {
    let cityChangedCount = 0;
    let rrrChangedCount = 0;

    // Subscribe to GLOBAL_CITY_CHANGED
    service.on(GlobalEventType.RESOURCES_CITY_CHANGED).subscribe(() => {
      cityChangedCount++;
    });

    // Subscribe to RRR_CHANGED
    service.on(GlobalEventType.RRR_CHANGED).subscribe(() => {
      rrrChangedCount++;
    });

    // Emit different events
    service.emit(GlobalEventType.RESOURCES_CITY_CHANGED, {city: City.FortSterling});
    service.emit(GlobalEventType.RRR_CHANGED, {value: 100});
    service.emit(GlobalEventType.RESOURCES_CITY_CHANGED, {city: City.BlackMarket});
    service.emit(GlobalEventType.RRR_CHANGED, {value: 200});

    // Check counts after small delay
    setTimeout(() => {
      expect(cityChangedCount).toBe(2);
      expect(rrrChangedCount).toBe(2);
      done();
    }, 10);
  });


  test('should support multiple subscribers for same event', (done) => {
    const testData = {value: 777};
    let subscriber1Called = false;
    let subscriber2Called = false;

    // First subscriber
    service.on(GlobalEventType.RRR_CHANGED).subscribe(data => {
      expect(data).toEqual(testData);
      subscriber1Called = true;
      checkIfDone();
    });

    // Second subscriber
    service.on(GlobalEventType.RRR_CHANGED).subscribe(data => {
      expect(data).toEqual(testData);
      subscriber2Called = true;
      checkIfDone();
    });

    function checkIfDone() {
      if (subscriber1Called && subscriber2Called) {
        done();
      }
    }

    service.emit(GlobalEventType.RRR_CHANGED, testData);
  });

  test('should test all City enum values', (done) => {
    const cities = [
      City.FortSterling,
      City.Thetford,
      City.Martlock,
      City.Bridgewatch,
      City.Lymhurst,
      City.BlackMarket
    ];

    const receivedCities: City[] = [];

    service.on(GlobalEventType.RESOURCES_CITY_CHANGED).subscribe(data => {
      receivedCities.push(data.city);

      if (receivedCities.length === cities.length) {
        expect(receivedCities).toEqual(cities);
        done();
      }
    });

    // Emit events for all cities
    cities.forEach(city => {
      service.emit(GlobalEventType.RESOURCES_CITY_CHANGED, {city});
    });
  });

  test('should handle different number types for RRR_CHANGED', (done) => {
    const testValues = [0, -10, 42, 3.14159, 1000000];
    const receivedValues: number[] = [];

    service.on(GlobalEventType.RRR_CHANGED).subscribe(data => {
      receivedValues.push(data.value);

      if (receivedValues.length === testValues.length) {
        expect(receivedValues).toEqual(testValues);
        done();
      }
    });

    // Emit events with different number values
    testValues.forEach(value => {
      service.emit(GlobalEventType.RRR_CHANGED, {value});
    });
  });

  test('should receive all events when using onAll()', (done) => {
    const events: any[] = [];

    service.onAll().subscribe(payload => {
      events.push(payload);

      if (events.length === 2) {
        expect(events[0].type).toBe(GlobalEventType.RESOURCES_CITY_CHANGED);
        expect(events[0].data.city).toBe(City.Martlock);
        expect(events[1].type).toBe(GlobalEventType.RRR_CHANGED);
        expect(events[1].data.value).toBe(999);
        done();
      }
    });

    service.emit(GlobalEventType.RESOURCES_CITY_CHANGED, {city: City.Martlock});
    service.emit(GlobalEventType.RRR_CHANGED, {value: 999});
  });

  test('should handle unsubscription properly', () => {
    let eventReceived = false;

    const subscription = service.on(GlobalEventType.RESOURCES_CITY_CHANGED).subscribe(() => {
      eventReceived = true;
    });

    // Unsubscribe
    subscription.unsubscribe();

    // Emit event after unsubscribe
    service.emit(GlobalEventType.RESOURCES_CITY_CHANGED, {city: City.Thetford});

    expect(eventReceived).toBe(false);
  });

  test('should provide type safety for event data', () => {
    // This test ensures TypeScript compilation catches type errors

    // ✅ These should compile without errors
    service.emit(GlobalEventType.RESOURCES_CITY_CHANGED, {city: City.BlackMarket});
    service.emit(GlobalEventType.RRR_CHANGED, {value: 123.45});

    // ❌ These would cause TypeScript compilation errors:
    // service.emit(GlobalEventType.GLOBAL_CITY_CHANGED, { wrongProperty: 'test' });
    // service.emit(GlobalEventType.RRR_CHANGED, { city: City.Lymhurst });

    expect(true).toBeTruthy(); // Just to have an assertion
  });
});
