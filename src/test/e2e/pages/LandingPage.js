const {I} = inject();

module.exports = {
  fields: {
    headerName: 'h1'
  },
  async seeTheLandingPage() {
    await I.seeElement(this.fields.headerName);
  }
};
