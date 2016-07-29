describe("Core", function() {
  var jam;

  beforeEach(module('jsonapi-manager'));
  beforeEach(inject(function(_jam_) {
    jam = _jam_;
  }));


  it('should pass', function () {
    expect(true).toEqual(true);
  });

});
