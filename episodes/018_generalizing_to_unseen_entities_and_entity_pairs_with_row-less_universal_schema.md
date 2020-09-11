---
title: "Generalizing to Unseen Entities and Entity Pairs with Row-less Universal Schema"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "018"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:11">

Today's paper is titled: Generalizing to Unseen Entities and Entity Pairs with Row-less Universal
Schema . It was published at EACL 2017 and written by Patrick Verga, Arvind Neelakantan, and Andrew
McCallum at University of Massachusetts Amherst. This paper addresses one of the limitations in the
universal schema approach to relation extraction. We discussed the universal scheme approach in
episode 11 but the main idea is to construct a matrix with one row for each pair of entities. There
are two kinds of columns in this matrix. One column representing relations in a knowledge base and
second are columns that represent surface patterns observed in any of the documents or the two
entities appear. By texturizing this matrix, we get an embedding for each row and each column, which
then we can use to predict whether a particular relation holds between a pair of entities a
limitation of this approach is that it cannot make predictions for entities which have not been seen
at training time. And the paper we're discussing today proposals a solution for this problem.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:18">

So if you remember those models that we talked about in the universal schema paper, the original
one, they had this entity model which essentially got an embedding for each entity and tried to
learn relations just by doing dot products essentially between relation vectors and entity vectors.
And there was also this entity pair model that had an embedding for each entity pair and an
embedding for each relation and tried to learn which relations the entity like, you define whether
an entity pair participates in a particular relation rather you parameterize it with a dot product
between these two vectors. Right? so the entity model already solves this problem, right?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:00">

Not quite because in the entity model, you need to have an embedding for every entity. And if either
entity does not exist in the training data, what you're trying to make predictions about them, you
will not be able to use the entity model from that paper.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:16">

Right. I guess. Yeah. So, the entity model helps with entity pairs that you didn't see at training
time, but still if you see an unseen entity, you're going to have a hard time.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:29">

Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:30">

Okay. So what do they do to solve this problem?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:34">

So to address this problem, instead of pre computing a vector representation for each row, they
compute it on the fly. So you can do this at decoding time or a test time for even for new entity
pairs that you haven't seen at training time. So in order to do this, they define a few aggregation
functions to aggregate the vectors of observed columns for the row that you're trying to predict
for. So the first try using the mean and max functions to aggregate the observed columns to get the
representation of the row vector. But then they point out that this will give the same embedding
regardless of which unobservant relation you're trying to predict next. So one way to do this is to
find the embedding of an observant column, which is most similar to the relation you're trying to
predict and then use the embedding of that column to represent the row. Another way to do this,
which seems to work a little bit better, is to use full attention over the observant columns for the
current row that you're trying to predict for and computer weighted average of the embedding of
these columns. And then use it as the row embedding.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:48">

So this sounds a lot like doing feature extraction. So given an entity or an entity pair and the
graph or a knowledge based tensor I find all of the features that I can about that entity and entity
pair. It says it's an unseen entity, but if you have something that's observed, right, you have some
features that you can extract for that entity. Maybe you didn't actually get a training example that
had that entity involved in it. And so you don't have a specific vector learned for that entity, but
in the tensor there is a triple that you could have used for training if you'd wanted to or if you
had done things a little bit differently. And so there are features there that you could extract.
There's information there that, for instance, the path ranking algorithm, which I worked on would
leverage. Like there's information there. Otherwise you're just hosed, right? If there's nothing in
the tensor and either like the knowledge base, the formal component or the surface form component,
if there's nothing, you just can't predict anything.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:47">

Absolutely. Yeah, that's right. I think the focus here is on the word by unseen they mean that this
entity pair has not been seen as an example in training data. But at the same time, they're
expecting that the patterns that you observe between the entities would be actually available in the
training data. Otherwise, like you said, we wouldn't be able to predict anything. An alternative to
this noise is to combine. So instead of having an embedding for every surface pattern, you could
also compose a representation using the components of the surface pattern, which is discussed a
little bit later in this paper. And also there is previous work that does this. So instead of having
a pre-computed embedding for every column or having parameters associated with every surface
pattern, you construct it again on the fly. So using LSTMs for example.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:46">

So, if your model now says instead of learning an embedding for an entity, I'm going to extract some
features for an entity, maybe using some embedding technique. What I wonder is how is this different
from other models that people have done? So the path ranking algorithm will take an entity pair,
find paths in the graph that connect to the entity pair, use those as features. And then given those
features, predict what relationship exists between them.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:14">

Arvind Neelakantan, who's an author on this paper also had a composition, had a paper called:
Compositional Vector Space Models for Knowledge Base Completion. I don't remember if that's the
exact, if that's the exact title, but it was along those lines and he took the paths that were
extracted by the path ranking algorithm and did what you said like learned a compositional vector
for these, it's like a feature embedding you could think of it in a nice recurrent or I don't
remember if his network was recursive or recurrent, but whatever, some kind of RNN that composed
vector representations given the edges in this graph. And then got a final vector for each feature
and then composed those in another way. I think he took the max, like the most similar vector to the
vector for the relation he was trying to predict. And that now sounds very, very similar to what
we're talking about here with row-less universal schema.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:10">

Right. actually this is one of my disappointments after reading the paper is that they didn't
compare to any previous work, which those something related to predicting for unseen entity pairs
because there has been previous work and it's discussed in the paper. But there's no direct
comparison. Sometimes these experiments are hard to conduct because they're like, you have to do
certain pre-processing for the training set to. So it may be hard, but I still find it. Yeah,
basically I miss the chance to actually quantify the contribution. So the main results highlighted
in the paper are when the entity pairs are observed, the queries specific aggregation functions give
the same results as models with an explicit entity, peer representation for the universal schema. So
that's the baseline that they're comparing to. This is not terribly exciting, but, it tells us that
this alternative way of computing or predicting whether a relation exists is working well or working
as well as the previous, as the baseline.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:21">

But the really interesting thing is what happens when the entity pairs are missing from the training
set and that's basically where this method is going to be useful. And of course, the baseline model,
which pre-computes embeddings for every entity pair at training time completely fails to do this
task because it doesn't have an embedding, right? So it predicts relations at random, but the
proposed method performance a little bit worse than when the entity pairs are observed, but of
course much, much better than the baseline. They also experiment with replacing the column vectors
with an LSTM so that we can compute and embedding for new columns that have not been seen at
training time. Their results show improvements when doing this on top of pre-computed row
embeddings. So that's the baseline model for universal schema, but not when computing the row
embeddings on the fly using these segregation functions we talked about.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:20">

So it seems like we've talked about a bunch of work on entity linking knowledge base completion,
some knowledge base kinds of things. You've been presented in a bunch of papers on this topic. What
high level takeaways do you have? Like what, has this informed your research direction? What are you
going to do?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:41">

I feel like I'm still learning about this area. I'm relatively new to this space, so I feel like
there's still a few other direction that I need to learn about, including work written by you.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:55">

I don't know My work was some of the early work in this area and has been since since been
superseded. So I don't know how relevant it is anymore.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:03">

Right, but the point is I don't think I'm ready to make a summary of the space just yet. Maybe in
the next few episodes.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:11">

Okay, cool.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:14">

Okay. Thanks Waleed for telling us about that paper. Next time we will have our second interview,
we'll be talking with im Rocktäschel at the University of Oxford about his recent paper titled: End-
to-end Differentiable Proving.

</Turn>
