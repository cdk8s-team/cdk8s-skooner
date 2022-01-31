import { Chart, Testing } from 'cdk8s';
import { AccessType, LoginType, Skooner } from '../src';

test('Basic chart', () => {

  //  GIVEN
  const app = Testing.app();
  const chart = new Chart(app, 'test');

  //  WHEN
  new Skooner(chart, 'test');

  //  THEN
  expect(Testing.synth(chart)).toMatchSnapshot();
});

test('Chart with Ingress and OIDC', () => {

  //  GIVEN
  const app = Testing.app();
  const chart = new Chart(app, 'test');

  //  WHEN
  new Skooner(chart, 'test', {
    accessType: AccessType.INGRESS,
    accessHost: 'test.test.com',
    loginType: LoginType.OIDC,
    secretNameOIDC: 'testSecret',
  });

  //  THEN
  expect(Testing.synth(chart)).toMatchSnapshot();
});

test('Chart with Port, OIDC and labels', () => {

  //  GIVEN
  const app = Testing.app();
  const chart = new Chart(app, 'test');

  //  WHEN
  new Skooner(chart, 'test', {
    accessType: AccessType.NODE_PORT,
    port: 8080,
    loginType: LoginType.OIDC,
    labels: { testKey: 'testValue', testKey2: 'testValue2' },
  });

  //  THEN
  expect(Testing.synth(chart)).toMatchSnapshot();
});

test('Chart with service account', () => {

  //  GIVEN
  const app = Testing.app();
  const chart = new Chart(app, 'test');

  //  WHEN
  new Skooner(chart, 'test', {
    loginType: LoginType.SERVICE_ACCOUNT,
  });

  //  THEN
  expect(Testing.synth(chart)).toMatchSnapshot();
});