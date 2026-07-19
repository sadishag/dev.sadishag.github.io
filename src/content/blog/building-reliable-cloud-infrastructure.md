---
title: "Running Kubernetes for a Big Insurer"
date: "2026-07-10"
excerpt: "What actually keeps our clusters on Azure stable, mostly by keeping people (me included) from touching them directly."
---

Most of our production runs on Kubernetes on Azure. It's for a large
insurer, so "production" means the member-facing benefits sites people use
to check a claim or find a provider. When something breaks, someone
notices, and usually that someone is on the phone with a call center by the
time we hear about it.

I've been on this platform for a few years. What still surprises me is how
little of what keeps it stable is actually clever. Most of it is just
closing off the ways a person can reach in and change something by hand.

## Nobody runs kubectl apply anymore

For a long time a deploy was whatever the last engineer typed into their
terminal. That's fine until it isn't. Someone patches a thing in staging to
get through a demo, forgets to do the same in prod, and two weeks later
we're burning an afternoon on why the two environments disagree.

Nobody deploys from a laptop now. Every service ships through the same set
of reusable CI/CD jobs. A team doesn't hand-roll its own pipeline and
quietly do something odd in it; they call the shared jobs, and those jobs
are the only thing that talks to the cluster.

The other half of it is how we version things. Every build gets a semantic
version, and a deploy always points at a specific one. No "latest," no
"whatever's on main right now."

```text
member-web 2.7.3
           │ │ └─ patch: safe bug fix, ships on its own
           │ └─── minor: backward-compatible feature
           └───── major: breaking change, coordinated release
```

That's what makes rollback dull, which is the whole idea. Going back a
version isn't a special emergency procedure, it's the same pipeline pointed
at the previous number. We've shipped our share of bad changes, and every
one got backed out by whoever was around, without anyone having to know how
the jobs work underneath.

## Terraform owns the slow-moving stuff

Anything that outlives a pod lives in Terraform: the clusters, DNS, the
identity setup, the networking. We were sloppy about this early on and it
cost us. State drifted from what was actually in Azure, someone had clicked
something in the portal months back, and untangling that after the fact is
about as fun as it sounds.

The rule we settled on is dull and we don't break it: if it's in the cloud,
it's in code. The Azure portal is for reading, not for changing things.

## Design for whoever's holding the pager

The question I care about for anything new isn't "does it work," it's "what
happens when it doesn't, and who has to deal with it." In practice that
means I want to know how we'd notice it's unhealthy without grepping logs,
how we'd roll it back fast, and how much else falls over if it fails badly.

That last one is the one people skip. It's easy to write a service that's
perfectly fine on its own and has quietly become a single point of failure
for six other things. We've been caught by that more than once, which is
mostly how it ended up on the checklist.

There's no clever trick in any of this. It's a short list of mistakes we got
tired of repeating, written down as rules we don't let ourselves break.
