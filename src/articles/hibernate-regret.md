---
layout: base.njk
title: Why I Regret Using Hibernate's EAGER Fetching
description: A production post-mortem on the "N+1 Problem" that crippled our Ride Booking engine during rush hour.
tags: post
date: 2026-01-11
---

<header class="mb-10">
    <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-4">
        {{ title }}
    </h1>
    <div class="text-gray-500 text-sm font-medium">
        Production Post-Mortem • 4 min read
    </div>
</header>

<div class="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-blue-600 max-w-none">

It was a few years ago. I was working at a **Ride-Hailing company**. We were rebuilding the "My Rides" history screen. The requirements were seemingly simple: show the user their past 50 rides, including the pickup and drop-off points.

### The Mistake

Our data model had a `Ride` entity and a list of `Waypoints`. I knew the UI *always* needed to map the route, so I thought I was being efficient by automating the fetch:

```java
@Entity
public class Ride {
    @OneToMany(fetch = FetchType.EAGER)
    private List<Waypoint> waypoints;
    // ...
}
```

On my local machine, with a seeded database of 5 rides, it was instant. I shipped it.

The Failure
Then came the evening rush hour. Thousands of users opened the app.

The database CPU spiked to 99%. Queries began queuing. The entire booking service started timing out. People couldn't book cars.

I checked the logs and saw the N+1 Nightmare. When a user with 50 past rides opened their history, Hibernate didn't run 1 query. It ran 51 queries.

Multiply that by 10,000 concurrent users. We were hitting the database with 500,000 queries per second.

The Fix
We hot-fixed it by replacing EAGER with a specific JPQL query using JOIN FETCH.

```SQL
SELECT r FROM Ride r
LEFT JOIN FETCH r.waypoints
WHERE r.userId = :userId
```

The Lesson
Convenience is the enemy of Scale. Hibernate's EAGER fetching is a landmine. If you don't know exactly how many SQL statements your code generates, you aren't engineering—you're guessing.

</div>

<div class="mt-16 pt-8 border-t border-gray-100"> <a href="https://www.google.com/url?sa=E&source=gmail&q=https://www.linkedin.com/in/pietrocascio/" target="_blank" class="font-bold text-sm hover:underline"> Discuss this on LinkedIn &rarr; </a> </div>