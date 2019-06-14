const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;
const Topic = require("../../src/db/models").Topic;

describe("Topic", () => {

  beforeEach((done) => {
    //#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      //#2
      Topic.create({
        title: "test title-1",
        description: "test description-1"
      })
      .then((topic) => {
        this.topic = topic;
        //#3
        Post.create({
          title: "post test title",
          body: "post test body",
          //#4
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

    it("should create a topic with a title and a description", (done) => {
      //#1
      Topic.create({
        title: "Test title",
        description: "Test description"

      })
      .then((topic) => {

        //#2
        expect(topic.title).toBe("Test title");
        expect(topic.description).toBe("Test description");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#getPosts()", () => {
        it("should return the associated posts", (done) => {
            this.topic.getPosts()
            .then(associatedPosts) => {
                expect(associatedPosts[0].title).toBe("post test title");
                done();
            });
        });
    });
});
