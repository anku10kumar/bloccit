const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;


describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.flair;

    sequelize.sync({force: true}).then((res) => {

//#1
      Topic.create({
        title: "Geography",
        description: "Information about Maryland"
      })
      .then((topic) => {
        this.topic = topic;

      Post.create({
        title: "Birds of Maryland",
        body: "A list of all native birds",
        topicId: this.topic.id
      })
      .then((post) => {
        this.post = post;

        Flair.create({
          name: "BlueJay",
          color: "Blue",
          postId: this.post.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

});

  describe("GET ${base}/:topicId/posts/:postId/flairs/new", () => {

    it("should render a new flair form", (done) => {
      request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });

  });


 describe("POST ${base}/:topicId/posts/:postId/flairs/create", () => {

   it("should create a new flair and redirect", (done) => {
      const options = {
        url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/create`,
        form: {
          name: "BlueJay",
          color: "Blue"
        }
      };
      request.post(options,
        (err, res, body) => {

          Flair.findOne({where: {name: "BlueJay"}})
          .then((flair) => {
            expect(flair).not.toBeNull();
            expect(flair.name).toBe("BlueJay");
            expect(flair.color).toBe("Blue");
            expect(flair.postId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });

   });

   describe("GET ${base}/:topicId/posts/:postId/flairs/:id", () => {

     it("should render a view with the selected flair", (done) => {
       request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("BlueJay");
         done();
       });
     });

   });

   describe("POST ${base}/:topicId/posts/:postId/flairs/:id/destroy", () => {

     it("should delete the flair with the associated ID", (done) => {

//#1
       expect(this.flair.id).toBe(1);

       request.post(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/destroy`, (err, res, body) => {

//#2
         Flair.findById(1)
         .then((flair) => {
           expect(err).toBeNull();
           expect(flair).toBeNull();
           done();
         })
       });

     });

   });

   describe("GET ${base}/:topicId/posts/:postId/flairs/:id/edit", () => {

     it("should render a view with an edit flair form", (done) => {
       request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/edit`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("Edit Flair");
         //expect(body).toContain("BlueJay");
         done();
       });
     });

   });

   describe("POST ${base}/:topicId/posts/:postId/flairs/:id/update", () => {

     it("should return a status code 302", (done) => {
       request.post({
         url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/update`,
         form: {
           name: "Cardinal",
           color: "Red"
         }
       }, (err, res, body) => {
         expect(res.statusCode).toBe(302);
         done();
       });
     });

     it("should update the flair with the given values", (done) => {
         const options = {
           url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}/update`,
           form: {
             name: "Cardinal"
           }
         };
         request.post(options,
           (err, res, body) => {

           expect(err).toBeNull();

           Flair.findOne({
             where: {id: this.flair.id}
           })
           .then((flair) => {
             expect(flair.name).toBe("Cardinal");
             done();
           });
         });
     });

   });

});
