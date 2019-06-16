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
        title: "topic test title-1",
        description: "topic test description-1"
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
        title: "topic test title-1",
        description: "topic test description-1"

      })
      .then((topic) => {

        //#2
        expect(topic.title).toBe("topic test title-1");
        expect(topic.description).toBe("topic test description-1");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with a missing title or description", (done) => {

                Topic.create({
                  title: "topic test title-1",
                  description: "topic test description-1"
                })
                .then((topic) => {

                  done();

                })
                .catch((err) => {

                  expect(err.message).toContain("Topic.title cannot be null");
                  expect(err.message).toContain("Topic.description cannot be null");
                  done();

                })
              });
            });

  describe("#getPosts", () =>  {

            it("should return the associated posts", (done) => {

                Topic.create({
                    title: "topic test title-1",
                    description: "topic test description-1"
                })

                Post.create({
                    title: "post test title",
                    body: "post test body",
                    topicId: this.topic.id,
                })
                .then((post) => {
                    this.topic.getPosts()
                      .then((associatedPosts) => {
                          expect(associatedPosts[0].title).toBe("post test title")
                          done();
                        })
                   });
              });
          });
    });
