---
title: "Building Reliable Cloud Infrastructure at Scale"
date: "2026-07-10"
excerpt: "Lessons from running Kubernetes workloads on Azure for one of Canada's largest insurers."
---

*Draft — edit me before publishing.*

After several years running Kubernetes workloads on Azure for a Fortune 500
insurer, I've learned that reliability is less about heroic engineering and
more about boring, repeatable process. Here are three things that made the
biggest difference for our team.

## Make deployments boring with GitOps

The single best decision we made was adopting GitOps with Flux. Every change
to a cluster goes through a pull request. The cluster state is the repo state
— no `kubectl apply` from laptops, no snowflake environments, no "who changed
this?" archaeology.

```yaml
apiVersion: helmrelease.toolkit.fluxcd.io/v2
kind: HelmRelease
metadata:
  name: member-web
spec:
  interval: 5m
  chart:
    spec:
      chart: member-web
      sourceRef:
        kind: HelmRepository
        name: platform-charts
  values:
    replicaCount: 3
```

When a deployment is a merge, rollback is a revert. That one property has
saved us more incidents than any amount of monitoring.

## Terraform the things that outlive pods

Clusters, DNS, identity, networking — anything with a longer lifecycle than
an application release lives in Terraform. The discipline that matters is
keeping state honest: if it exists in the cloud, it exists in code.

## Design for the 3 a.m. page

Every service we run has to answer three questions before it ships: how do we
know it's healthy, how do we roll it back, and what's the blast radius when
it fails? If the answers aren't obvious to someone woken up at 3 a.m., the
design isn't done.

None of this is glamorous. That's the point — reliable infrastructure is the
kind nobody has to think about.
