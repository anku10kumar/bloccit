const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  //#1
  describe("GET /", () => {

    //#2
    it("should return status code 200", (done) => {

      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

        //#4
        done();
      });
    });

  });

  describe("GET /marco", () => {

    //#2
    it("should return status code 200", (done) => {

      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body, 'to contain' , 'polo');
        //#4
        done();
      });
    });

  });
});
