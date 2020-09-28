---
title: "Relation Extraction with Matrix Factorization and Universal Schemas"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "011"
tags: []
description: "https://www.semanticscholar.org/paper/Relation-Extraction-with-Matrix-Factorization-and-Riedel-Yao/52b5eab895a2d9ae24ea72ca72782974a52f90c4"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

Okay today's paper is Relation Extraction with Matrix Factorization and Universal Schemas, it was
published in NAACL 2013, it was authored by Sebastian Riedel, Limin Yao, Andrew McCallum, Benjamin
M. Marlin. The paper focuses on modeling relations between pairs of entities. The relations can be
specified based on a predefined schema of a knowledge base, but they can also be specified using
surface form predicates. For example, the entity pair, Andrew McCallum and UMass Amherst may appear
in a database table which specifies people's affiliation. This kind of relation between pairs of
entities are often predefined by experts in a schema. They are often relations which are deemed
important for some applications, but they tend to be incomplete, the relation would only be
indicated in the knowledge base for a fraction of the entity pairs, which actually have this
relationship.

</turn>


<turn speaker="Matt Gardner" timestamp="01:08">

So what kind of data are we talking about here? What are some examples of this kind of dataset?

</turn>


<turn speaker="Waleed Ammar" timestamp="01:14">

So did datasets like Freebase is the one that was used in this paper?

</turn>


<turn speaker="Matt Gardner" timestamp="01:21">

So Freebase is what backs Google's knowledge graph, right?

</turn>


<turn speaker="Waleed Ammar" timestamp="01:24">

Oh yeah, it's now discontinued. But at some point it was a great resource for doing research. Right
now I'm using other resources from the medical domain like the Gene Ontology and MeSH basically to
provide similar information.

</turn>


<turn speaker="Matt Gardner" timestamp="01:40">

So essentially you're saying that this paper deals with any kind of data where you have entities in
some knowledge base and relationships between these entities. So facts in a knowledge base that you
could express as triples. Like you have some source entities, some relation, some target entity,
right,

</turn>


<turn speaker="Waleed Ammar" timestamp="01:56">

Right, yeah, and these are what I'm referring to as like the first type of relations or predefined
relations. Another kind of relations is more fuzzy. It's a specified in text basically. For example,
the first sentence of Andrew McCallum's page on Wikipedia reads Andrew McCallum is a professor and
researcher in the computer science department at the University of Massachusetts, Amherst. Now for
the purpose of this paper we're going to call this relation, the textural description that is
between Andrew McCallum and the University of Massachusetts to be another pattern relation between
or textural relation between the two entities Andrew McCallum and University of Massachusetts. The
main question that paper is trying to address is how do we predict missing relations between pairs
of entities in the knowledge base or some relations that may exist between pairs of entities, which
are not even in the knowledge base.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:59">

Because you know, the knowledge bases don't have all the entities, they often only contained famous
entities. So people like Brendan O'Connor who is also an assistant professor at the University of
Massachusetts does not have a Wikipedia page. And we'd like to be able to predict this relationship
between him and UMass.

</turn>


<turn speaker="Matt Gardner" timestamp="03:20">

But if all you have is the knowledge base, how can you predict stuff about entities that aren't in
the knowledge base?

</turn>


<turn speaker="Waleed Ammar" timestamp="03:26">

Right, so that for that we need to also be able to use the textual relationships. And that's where I
think this method is very exciting, it enables us to use both kinds of relations and there are many
extensions to it later which will run later. And we will hopefully we'll discuss some of them.

</turn>


<turn speaker="Matt Gardner" timestamp="03:46">

So if all you have is the facts and the knowledge base, there's a long history of work like even
going back to like Prolog kinds of things where you can prove facts based off of facts that you see
in the knowledge base, given some rules and rule mining kinds of things. This area has a rich
history. What exactly does this paper contribute and how do they get the textual relations into the
same kind of format as what you've see in the knowledge base?

</turn>


<turn speaker="Waleed Ammar" timestamp="04:10">

Right, so they do have a very clever way of representing both kinds of relations. So you construct
this matrix where every row represents a pair of entities and every column represents a relation.
And the relation again, could be a predefined relation in knowledge base or a textual relation. We
extract from text. And then we fill in this matrix with ones, whenever we observe this pair of
entity to have this relation. And now most of the, most of the cells will be zeros and oftentimes
there'll be zeros where the relation actually holds. And our job is to predict, basically fill in
the gaps in this matrix, which is basically a continuation or an instantiation of along the line of
work on collaborative filtering.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:05">

So you can think of every entity pair as a customer and every relation as a product. And we're
trying to guess what other products the user or the customer is going to order or would be
interested in based on his previous behavior.

</turn>


<turn speaker="Matt Gardner" timestamp="05:22">

So that's interesting. They're taking a collaborative filtering factorization kind of approach. And
I think that makes sense in this setting cause if you think about what happens when you add a bunch
of textual relations to a formal curated knowledge base, just think of the number of relations that
you have in the knowledge base in Freebase you have on the order of maybe a thousand relations,
maybe 10,000. If you get really big and rule mining kinds of approaches, like typical knowledge base
inference approaches that don't use textual resources scale often on like some exponent where the
thing in the exponent is the number of relations that you have.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:04">

Oh, okay.

</turn>


<turn speaker="Matt Gardner" timestamp="06:04">

And so if now I say, Oh, I'm going to take all of these relations that I see in text and there might
be, I don't know, hundreds of thousands or a million different relations that I see in text the
performance of my algorithm is just going to explode. Like you can't handle this. And so there's
also another issue, which is a lot of these textual relations might have similar meanings. They
might be at least close paraphrases of each other. And so you really want evidence from one of these
relations to be shared with evidence with another evidence from another textual relations. So, you
put them into some kind of similar space. So this kind of factorization or embedding kind of
approach makes a whole lot of sense when you start looking at knowledge base inference as this
universal schema style problem.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:49">

Right, concretely, the paper, discuss the three models for predicting whether a particular relation
holds between a pair of entities. The first one is referred to as the latent feature model computes
a dot product between an embedding of the entity pair and an embedding of the relation in question.
The second model is referred to as the neighborhood model. Here we learn an association weight
between a pair of relations to infer whether a particular relation is true given another relation.
So to score the relation in question for a pair of entities, we sum up the association scores for
all the other relations observed for this entity pair. And the third model it's referred to as the
entity model. Here we estimate an embedding for every entity and an embedding for every slot in a
relation. So if we're talking about a relation called professorX , there will be an embedding for
the professor argument of this relation and another embedding for the institution argument of this
relation. And then we use dot product to compute basically how compatible the embedding of the
entity and the embedding of that argument in the relation.

</turn>


<turn speaker="Matt Gardner" timestamp="08:12">

So let's think about the trade offs in these different models. What decisions might lead you to pick
one over the other or what their characteristics would be? So this latent feature model says I'm
going to have an embedding for an entity pair and an embedding for a relation. I'm going to predict
something just based on these dot products. What this means is that at test time I have to have seen
the entity pair at training time, right. Otherwise I won't have an embedding for it and I can't make
a prediction. And so this is nice in that if I have seen that entity pair before enough times, I can
get a good sense of what this means and it will let me compute similarity across relations pretty
well and across entity pairs. But it relies on this sparse data and so you very likely for most
entity pairs won't have seen them at test time sorry, won't have seen test entity pairs that
training time and so you're going to have a hard time using just this model.

</turn>


<turn speaker="Matt Gardner" timestamp="09:07">

In contrast, this entity model says, I'm going to learn an embedding for each entity and for each
relation and I'm going to use just this dot product to figure out which entity pairs participate in
which relation. And the issue here is that if you think of something like married to or spouse of
relation, this is a sparse matrix it's essentially a permutation matrix in this knowledge tensor,
which means essentially like people could be married more than one time. But for the most part, you
will have at most one non zero entry in each row of this matrix, which means it's a permutation
matrix. The problem with permutation matrices is that they have full rank.

</turn>


<turn speaker="Matt Gardner" timestamp="09:57">

And so if you tried to decompose a full rank matrix into some low rank representation, you're just
going to have a hard time. This is linear algebra, you can't do this. And so what this means is that
just the entity model by itself is going to have a really hard time recovering it's sparse
relationships that exist between your data. You're not going to be able to predict who's married to
who, just with this entity model. And so if you can combine, I guess that these are some of the
tradeoffs that you get with these three different models. And so being able to combine them in
different ways is, I guess we'll see in the results, but this should do better if you can use
signals from all of these different kinds of models.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:36">

All right, they simply add up the scores that you get from each of the different models and they
show that some of the combinations give you improved results to evaluate these models. They did two
kinds of evaluation. The first is splitting the facts obtained from the Freebase knowledge base into
a bunch of training facts and test facts. And you also split the tuples the entity pairs into train
and test pairs. And then in table one, they show the results for a set of relations in the test set
and the results, they compared to several previous methods including distance supervision, which is
a popular approach for also using fixer relations in order to infer. So it's a way of also using
this relation to infer a knowledge based relations where you go out and see in the text all the
pairs, all the entity pairs which correspond to a fact in the knowledge base and manually assume
that this is likely to be correct and train a model in order to predict based on the textual
patterns whether this knowledge base relation exists or not.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:09">

And as Matt expected, the combination of different models give you improved results over using the
entity model only, you get 0.45 mean average precision. And using the entity pair model only, you
get 61% mean average precision, but combining the two together, you get 66%. Surprisingly when you
add the third model you get 63%, so you get a degraded performance according to this this evaluation
metric. But another evolution metric they use is the weighted mean average precision where you
actually give a different weight for every relation depending on how many facts there are in the
test set.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:03">

The other evaluation they do here is predicting surface patterns. So here they hold out some of the
textual patterns that they observe and try to predict whither they occur not is on other relations
in the matrix. And because this is something that previous models don't really do or it's hard to
compare to other models do this like OpenIE they only compared to like the three, the four variants
of their model. And again they show that certain combinations give better results but not always. So
in particular the F model, the one where you embed pairs of entities seem to give the best
performance according to the weighted map. And according to the other metric, the map metric, both
the entity pair model and the combination gives the same performance.

</turn>


<turn speaker="Matt Gardner" timestamp="14:14">

And I guess looking at the results, the story is for me a little bit mixed. It doesn't look like
adding the entity model really buys you much at all. Maybe it gives you a slight boost in
performance, but the majority of the signal here we're dealing with sparse facts. And so the
majority of the signal that you get is by this entity pair embedding model that has the capacity,
like if I saw a sparse fact at training time, I can make some inference based on that sparse fact at
test time. And that's what this model is getting. And you get a slight, slight boost in some cases
by also trying to model the entities themselves to say like, what relations should this entity
generally participate in. But almost all of the performance here is coming just from a model that
finds similarity between training relations and test relations.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:07">

Yeah. And it seems like because they use the textual relations that is definitely less sparse. If
you have enough text in order to find this. So it would have been interesting to also see how the
model performs using only knowledge base relations are only textual relations.

</turn>


<turn speaker="Matt Gardner" timestamp="15:28">

I guess a lot of people have since explored that. That's essentially the transi like there are a
whole lot of knowledge base embedding methods these days that explore exactly that question.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:38">

Right. So we'll look at these, some of these papers later.

</turn>


<turn speaker="Matt Gardner" timestamp="15:42">

Okay. Thanks for lead for presenting this paper to us. Next time we'll talk about a paper called:
Supervised Learning of Universal Sentence Representations from Natural Language Inference Data and
this is by folks at Facebook AI research.

</turn>
