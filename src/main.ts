import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceService } from './app/services/price-service';
import { firstValueFrom, filter, take, timeout, catchError, of } from 'rxjs';

// Factory function that will wait for PriceService initialization
function initializePriceService(priceService: PriceService): () => Promise<boolean> {
  return () => {
    console.log('🚀 Initializing PriceService...');
    return firstValueFrom(priceService.isInitialized().pipe(
      filter(initialized => initialized),
      take(1),
      timeout(60000),
      catchError(error => {
        console.error('❌ Failed to initialize PriceService:', error);
        return of(false);
      })
    )).then(result => {
      console.log('✅ PriceService initialization completed:', result);
      return result;
    });
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(CommonModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializePriceService,
      deps: [PriceService],
      multi: true
    }
  ]
}).catch(err => console.error(err));
