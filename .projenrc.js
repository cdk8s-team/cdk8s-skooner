const { cdk8s } = require('projen');
const project = new cdk8s.ConstructLibraryCdk8s({
  author: 'Juan Peredo',
  authorAddress: 'jperedo@amazon.com',
  cdk8sVersion: '1.0.0-beta.10',
  defaultReleaseBranch: 'main',
  name: 'cdk8s-skooner',
  repositoryUrl: 'https://gitlab.aws.dev/jperedo/cdk8s-skooner.git',
  npmRegistryUrl: 'https://gitlab.aws.dev/api/v4/projects/1655/packages/npm/',
  python: {
    distName: 'cdk8s-skooner',
    module: 'cdk8s_skooner',
  },

  deps: ['constructs@^3.3.168'], /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  // release: undefined,      /* Add release management to this project. */
});
project.synth();