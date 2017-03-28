var expect = chai.expect;

describe("HomeController", function() {
    let sinonMod,
        homeController;

    describe("constructor", function() {
        it("should be created with three properties: requester, template, and utils", function() {
            var requester = sinon.stub().returns(new Requester()),
                template = sinon.stub().returns(new HandlebarsTemplate()),
                utils = sinon.stub().returns(new Utils(requester));

            var hc = new HomeController(requester, template, utils);

            expect(hc).to.have.property('requester');
            expect(hc).to.have.property('template');
            expect(hc).to.have.property('utils');
        });
    });

    describe("sendContactMail", function() {
        const result = {
            result: []
        };

        beforeEach(function() {
            sinon.stub(requester, 'post')
                .returns(new Promise((resolve, reject) => {
                    resolve(result);
                }));
        });
        afterEach(function() {
            requester.post.restore();
        });
        
    });
});