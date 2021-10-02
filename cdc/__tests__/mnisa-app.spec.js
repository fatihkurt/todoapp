/* eslint-disable jest/valid-expect-in-promise */

// This is the Pact test for the mnisa app

const { pactWith } = require("jest-pact");
const { Matchers } = require("@pact-foundation/pact");
const { like, eachLike, regex } = Matchers;

// Load the consumer client code which we will call in our test
const { addTask, listTasks } = require("../mnisa-app.js");

const sampleTask = {
  id: 1,
  user_id: 1,
  name: "A Task",
};

pactWith(
  { consumer: "mnisa app", provider: "mnisa api", port: 1234, timeout: 50000 },
  (provider) => {
    // This is the body we expect to get back from the provider
    // const EXPECTED_BODY = {
    //   id: 1,
    //   user_id: like(sampleTask.user_id),
    //   name: regex({
    //     matcher: "^[A-Za-z0-9& ,.!_]+$",
    //     generate: sampleTask.name,
    //   }),
    // };
    const EXPECTED_BODY = {
      id: 1,
      user_id: 1,
      name: 'A Task',
    };

    describe("get task", () => {
      beforeEach(() => {
        // First we setup the expected interactions that should occur during the test
        const interaction = {
          state: "i have a list of tasks",
          uponReceiving: "a request for all tasks by user id",
          withRequest: {
            method: "GET",
            path: "/api/task",
            query: "userId=1",
            headers: {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          },
          willRespondWith: {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: eachLike(EXPECTED_BODY),
          },
        };

        return provider.addInteraction(interaction);
      });

      it("returns the correct response", () => {
        // We call our consumer code, and that will make requests to the mock server
        listTasks(provider.mockService.baseUrl).then((response) => {
          expect(response.data).toEqual([EXPECTED_BODY]);
          // expect(Array.isArray(response.data)).toBe(true);
          // expect(response.data[0].id).toBe(1);
        });
      });
    });

    // describe("add task", () => {
    //   const EXPECTED_BODY = {
    //     message: {
    //       id: 1,
    //       user_id: 1,
    //       name: "New Task",
    //     },
    //   };
    //   beforeEach(() => {
    //     // First we setup the expected interactions that should occur during the test
    //     const interaction = {
    //       state: "i have a task to add",
    //       uponReceiving: "a request for adding task",
    //       withRequest: {
    //         method: "POST",
    //         path: "/api/task",
    //         body: {
    //           userId: 1,
    //           name: "New Task",
    //         },
    //         headers: {
    //           Accept: "application/json",
    //           "Access-Control-Allow-Origin": "*",
    //         },
    //       },
    //       willRespondWith: {
    //         status: 200,
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: EXPECTED_BODY,
    //       },
    //     };

    //     return provider.addInteraction(interaction);
    //   });

    //   it("add task and return created task", () => {
    //     // We call our consumer code, and that will make requests to the mock server
    //     addTask(provider.mockService.baseUrl).then((response) => {
    //       return expect(response.data).toEqual(EXPECTED_BODY);
    //     });
    //   });
    // });
  }
);
