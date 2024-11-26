import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.praxisinstitute.isncsci',
  appName: 'isncsci',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    ScreenOrientation: {
      ios: {
        supportedOrientations: ['portrait'],
      },
      android: {
        allowOrientationChange: false,
        orientation: 'portrait',
      },
    },
  },
};

export default config;