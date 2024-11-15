import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.praxisinstitute.isncsci',
  appName: 'isncsci',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;