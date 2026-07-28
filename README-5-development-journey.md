[🏠 Home](./README.md) &nbsp; &bullet; &nbsp;
[The Architecture](./README-2-the-architecture.md) &nbsp; &bullet; &nbsp;
[The Static Demo Pipeline](./README-3-the-static-demo-pipeline.md) &nbsp; &bullet; &nbsp;
[Following a Product Through the Pipeline](./README-4-follow-a-product.md) &nbsp; &bullet; &nbsp;
[**Development Journey**](./README-5-development-journey.md) &nbsp; &bullet; &nbsp;
[Roadmap & Author](./README-6-roadmap-and-author.md)

<br>

# Development Journey 🚀

### Table of Contents 📖

- In this file, [Development Journey](#development-journey-):
  - [From Building Pages to Designing Systems](#from-building-pages-to-designing-systems-)
  - [Embracing Refactoring](#embracing-refactoring-)
  - [Engineering Trade-offs](#engineering-trade-offs-)
  - [Challenges](#challenges-)
  - [Lessons Learned](#lessons-learned-)
  - [Product Decisions](#product-decisions-)
  - [Looking Back](#looking-back-)

<br>

When I started this project, my goal was simple:

> Learn Laravel by building a real application.

I expected to spend most of my time learning framework features such as routing, controllers, Eloquent, and resources.

Instead, the project gradually became something much larger.

As each new feature was added, I found myself asking questions that tutorials rarely answer:

- Where should this logic live?
- How do I keep components small?
- How can the frontend remain independent from the backend?
- How should API responses be structured?
- How can I avoid duplicating business logic?

Many of the architectural decisions documented throughout this README came from trying to answer those questions.

Looking back, I think the project taught me far more about software engineering than it did about any individual framework.

<br>

---

# From Building Pages to Designing Systems 🌱

When I first began building Lantern Loft, I approached development the same way I had approached many previous projects.

The focus was on getting individual pages working.

If a page looked correct and behaved correctly, I considered it finished.

As the application grew, that mindset quickly became difficult to maintain.

Features started depending on one another.

The same data was needed in multiple places.

Business logic began spreading across components.

Making changes became increasingly expensive.

That was the moment I realised I needed to stop thinking in terms of pages and start thinking in terms of systems.

Instead of asking:

> "How do I build this page?"

I began asking:

> "Where should this responsibility live?"

That single question influenced nearly every architectural decision that followed.

<br>

---

# Embracing Refactoring 🧩

One of the biggest lessons this project taught me is that the first solution is rarely the best one.

Many parts of the application were rewritten several times.

Not because they were broken—but because I discovered a cleaner, simpler, or more maintainable approach.

Some examples include:

- Introducing a service layer for making requests to the backend API.
- Moving business logic out of components.
- Creating reusable composables.
- Splitting large TypeScript types into domain models.
- Reorganising the project structure as it grew.
- Designing the static demo pipeline.

Each refactor made the project a little easier to understand than it had been before.

Rather than viewing refactoring as "rewriting code," I came to see it as an essential part of the design process.

<br>

---

# Engineering Trade-offs ⚖

Like any real project, Lantern Loft involved making trade-offs.

Not every decision was about choosing the most technically impressive solution.

Sometimes the better choice was the one that improved maintainability, readability, or long-term flexibility.

Examples include:

### Static Demo Pipeline

Generating data through scripts is considerably more complex than manually writing JSON files.

However, it makes the catalogue easier to maintain while closely mirroring how the Laravel backend behaves.

The additional complexity serves a clear architectural purpose rather than existing for its own sake.

### Type Safety

Using TypeScript requires more upfront work than plain JavaScript.

Defining interfaces and domain models can initially feel slower.

Over time, however, those types become valuable documentation and help catch many mistakes before the application even runs.

### Separation of Concerns

Moving responsibilities into services, composables, the repository and mappers often means navigating through more files.

In return, each layer remains focused on a single responsibility, making the application easier to understand as it grows and prevents components from becoming tightly coupled to other parts of the application.

For this project, that trade-off was well worth it.

<br>

---

# Challenges 🧠

Every substantial project comes with unexpected obstacles.

Some of the most interesting challenges during development weren't visual—they were architectural.

## Building a Static Backend

Perhaps the biggest challenge was finding a way to showcase the application on GitHub Pages.

Initially, this seemed like a limitation imposed by static hosting.

Eventually, it became an opportunity to explore architectural patterns that I probably wouldn't have discovered otherwise.

The static demo eventually evolved into its own subsystem, complete with generators, repositories, mappers, and reusable content pools.

Ironically, solving this deployment problem became one of the most educational parts of the entire project.

<br>

## Avoiding Tight Coupling

Another recurring challenge was deciding where different pieces of logic belonged.

It was often tempting to place data-fetching, filtering, or transformation directly inside Vue components.

Doing so would have been faster in the short term.

Instead, I chose to keep those responsibilities inside dedicated layers.

Although this required more planning, it has made the application significantly easier to extend.

<br>

## Designing for Future Features

Many parts of the project intentionally support functionality that hasn't been implemented yet.

Examples include:

- shopping cart
- checkout
- wishlist
- order history
- customer dashboard
- admin dashboard

Designing data models and folder structures with future growth in mind was an interesting balancing act.

I wanted to avoid overengineering while still leaving room for expansion.

<br>

## Managing Complexity

As the project grew, so did the number of moving parts.

Without clear boundaries, it would have become increasingly difficult to reason about the application.

Maintaining those boundaries became just as important as adding new features.

<br>

---

# Lessons Learned 📚

This project reinforced several ideas that I expect to carry into future work.

## Software Architecture Matters

A well-structured application is easier to understand than a clever one.

Good architecture often isn't about introducing more abstractions—it's about placing responsibilities where they naturally belong.

<br>

## Refactoring Is Part of Development

I used to think of refactoring as something you do after a project is finished.

Working on Lantern Loft completely changed that perspective.

Many of the project's strongest architectural decisions only emerged after revisiting earlier implementations.

<br>

## Simplicity Takes Time

One lesson that surprised me is that simple code is often the result of many iterations.

Several parts of the project look straightforward today because earlier, more complicated versions helped reveal what was actually necessary.

<br>

## Documentation Is Part of the Product

Writing comments, documenting architecture, and creating this README forced me to clarify my own thinking.

Explaining a design decision often revealed opportunities to simplify it.

Good documentation doesn't just help other developers—it also helps the original author.

<br>

## Products Are More Than Code

Building an ecommerce application isn't only about APIs and components.

It's also about:

- navigation
- content
- typography
- imagery
- accessibility
- loading states
- responsiveness
- user expectations

Thinking about the complete experience became just as rewarding as solving technical problems.

<br>

---

# Product Decisions 💡

While the architecture shaped how the application works, product decisions shaped how it feels to use.

Throughout development, I tried to make choices that balanced aesthetics, usability, and maintainability.

## A Carefully Curated Catalogue

Rather than filling the application with hundreds of randomly generated products, I chose to build a smaller catalogue of handcrafted lamps.

This made it possible to spend more time refining the presentation, descriptions, imagery, and overall shopping experience.

Quality felt more important than quantity.

<br>

## Consistency Over Complexity

Whenever possible, I preferred introducing reusable design patterns instead of creating one-off solutions.

Whether building UI components or designing data models, consistency generally won over cleverness.

<br>

## Performance as a Feature

Performance wasn't treated as something to optimise later.

From lazy-loaded images and LQIP placeholders to route-level code splitting and generated static assets, many decisions were made with perceived performance in mind from the beginning.

<br>

## Preparing for the Future

Although only part of the application has been implemented, many architectural decisions were made with future features in mind.

The goal wasn't to predict every possible requirement.

Instead, it was to build foundations that could accommodate future growth without requiring major rewrites.

<br>
<br>

---

# Looking Back 💭

When I started Lantern Loft, I hoped it would help me learn Laravel.

It certainly did.

But more importantly, it taught me to think beyond frameworks.

The project challenged me to think about architecture instead of implementation, systems instead of pages, and maintainability instead of simply getting features to work.

There are still many features left to build, and I'm sure many parts of the application will continue to evolve.

In many ways, I hope they do.

Because if there's one lesson this project has reinforced more than any other, it's that good software isn't something you finish once.

It's something you continue refining as your understanding grows.

<br>

---

<br>

[&UpArrow; Back to top](#development-journey-) &nbsp; &bullet; &nbsp;
Up Next: [Part 6: Roadmap & Author](./README-6-roadmap-and-author.md)
