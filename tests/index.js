import test from "ava";
import { Polymath } from "../main.js";

test("Polymath requires an OpenAI API Key", (t) => {
  try {
    let client = new Polymath({
      apiKey: "sk-fake-api-key",
      libraryFiles: ["./libraries/knowledge-string.json"]
    });

    t.pass();
  } catch (e) {
    t.fail();
  }
});

test("Polymath errors without an OpenAI API Key", (t) => {
  try {
    new Polymath();
    t.fail();
  } catch (e) {
    t.pass();
  }
});

test("Polymath can get embeddings", async (t) => {
  let client = new Polymath({
    apiKey: process.env.OPENAI_API_KEY,
    libraryFiles: ["./libraries/knowledge-string.json"]
  });

  let embedding = await client.generateEmbedding("ePiano");

  if (embedding.length == 1536) {
    t.pass();
  } else {
    t.fail();
  }
});

test("Polymath gets results", async (t) => {
  try {
    let client = new Polymath({
      apiKey: process.env.OPENAI_API_KEY,
      libraryFiles: ["./libraries/knowledge-string.json"],
	  debug: true
    });

    let r = await client.ask("How long is a piece of string?");

    if (r.context()) {
      t.pass();
    }
  } catch (e) {
    t.fail();
  }
});

test("Polymath gets server results", async (t) => {
  try {
    let client = new Polymath({
      apiKey: process.env.OPENAI_API_KEY,
      servers: ["https://polymath.almaer.com/"]
    });

    let r = await client.ask(
      "What is the best side effect of using an AI assistant?"
    );

    if (r.context()) {
      t.pass();
    }
  } catch (e) {
    console.log("ERROR:", e);
    t.fail();
  }
});

test("Polymath gets local completions", async (t) => {
  try {
    let client = new Polymath({
      apiKey: process.env.OPENAI_API_KEY,
      libraryFiles: ["./libraries/knowledge-string.json"]
    });

    let r = await client.completion("How long is a piece of string?");

    if (r.completion) {
      t.pass();
    }
  } catch (e) {
    t.fail();
  }
});

test("Polymath gets server completions", async (t) => {
  try {
    let client = new Polymath({
      apiKey: process.env.OPENAI_API_KEY,
      servers: ["https://polymath.almaer.com/"]
    });

    let r = await client.completion(
      "What is the best side effect of using an AI assistant?"
    );

    if (r.completion) {
      t.pass();
    }
  } catch (e) {
    // console.log("ERROR:", e);
    t.fail();
  }
});

test("Polymath gets multiple server completions", async (t) => {
  try {
    let client = new Polymath({
      apiKey: process.env.OPENAI_API_KEY,
      servers: [
        "https://remix.polymath.chat/",
        "https://preact.polymath.chat/"
      ]
    });

    let r = await client.completion("Can you use Remix with Preact?");

    if (r.completion) {
      t.pass();
    }
  } catch (e) {
    // console.log("ERROR MULTI:", e);
    t.fail();
  }
});
