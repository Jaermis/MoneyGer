import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cWWhPYVJxWmFZfVpgdVdMY1RbRX9PMyBoS35RckVmWHdecHFTQmZUUUN3');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
