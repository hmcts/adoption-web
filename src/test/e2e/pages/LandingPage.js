const {I} = inject();

module.exports = {
  fields: {
    headerName: 'h1'
  },
  async seeTheLandingPage() {
  console.log('I am here');
   await I.seeElement(this.fields.headerName);
  }
};
