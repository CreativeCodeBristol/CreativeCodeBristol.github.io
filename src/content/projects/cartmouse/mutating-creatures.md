---
title: Mutating Creatures
author: cartmouse
event: '6'
tags: [Godot]
image: '/assets/content/projects/mutating-creatures/mutating-creatures.jpg'
---

Inspired by the [Godot Wild Jam](https://godotwildjam.com/) that was going on
this week, I took the theme of "Mutation" and formed a little game idea.

The plan was to create a game where little creatures are competing to find food
and as they eat, they split an mutate. The player's job would be to help their
group of creatures to their goal by picking and choosing different mutations to
form an ultimate super-creature.

As these things tend to go, I massively over-scoped for the time we had and
ended up with a little sub-system within the same idea.

<video controls autoplay muted loop>
  <source src="/assets/content/projects/mutating-creatures/mutating-creatures.mp4" />
</video>

The output of my efforts is this little autonomous system where creatures
(represented by the bigger squares) search for food (the little squares). When
they eat they split and have a chance to gain one of two mutations: strong or scout.

Strong creatures can kill other creatures that are in their path (normally they
would just stop) and scout creatures can see food further away from themselves.

This was a good exercise in re-learning Godot's AStarGrid path-finding system
as everything takes place in a grid.

I'm pretty pleased with the little system that cam out of the session. It's
quite nice to just sit and watch it as it plays out!
