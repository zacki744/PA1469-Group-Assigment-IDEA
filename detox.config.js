module.exports = {
  testRunner: {
    $0: 'jest',
    args: {
      config: 'test/e2e/jest.config.js',
      _: ['e2e'],
    },
    devices: {
      simulator: {
        type: 'ios.simulator',
        device: {
          type: 'iPhone 14',
        },
      },
      emulator: {
        type: 'android.emulator',
        device: {
          avdName: 'pixel_4',
        },
      },
    },
  },
  };
  