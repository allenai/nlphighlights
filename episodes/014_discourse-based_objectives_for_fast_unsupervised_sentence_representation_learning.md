---
title: "Discourse-Based Objectives for Fast Unsupervised Sentence Representation Learning"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "014"
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


<Turn speaker="Matt Gardner" timestamp="00:12">

All right. Today's paper is: Discourse-Based Objectives for Fast Unsupervised Sentence
Representation Learning by Yacine Jernite, Samuel Bowman and David Sontag at New York University and
MIT. This paper fits into a line of work that we've talked about in a few papers recently. They're
trying to learn sentence representations, get sentence vectors to use in some downstream tasks. So
this is representation learning, trying to do essentially feature extraction over sentences so that
you can use these features somehow in some way that you might care about. And their primary
motivation here is looking at this tradeoff between models that generate something in their context
and models that discriminate between two things in their context.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:04">

So the Skip-Thoughts Vectors paper, which was I guess one of the first, if not the first paper that
looked at trying to build sentence vectors in some unsupervised way. That paper said, let me take my
sentence and use it to generate the previous sentence and the next sentence using some kind of
encoder. And this paper says actually generating previous sentences and next sentences. It's really
hard. You have to do this softmax of the vocabulary and you have to do lots of time, lots of words
individually. Like this is a prediction problem that actually is computationally very expensive. So
can we get the same level of performance with a much simpler kind of model? Instead of taking a
sentence and predicting the previous sentence, take the sentence and the previous sentence and
predict some classification decision on top of those two sentences.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:00">

And so the interesting thing here is what classification tasks should I do? The simplest one you
could say is what's the order? Have I flipped these two sentences or not? So I could present, so I
could give my model an ordered pair of sentences and have my label be, is this the true order or
have these been swapped? And then I can automatically create a whole bunch of training data by
either taking sentence pairs in a very large corpus and either feeding them in the correct order
with a positive label or swapping them and feeding them in with a negative label. I can train a
network this way and hopefully get good sentence representations. They also look at two other
different classification kinds of tasks that are inspired by discourse coherence phenomenon.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:49">

And one of them is given a list of possible next sentences. So you're given three sentences in
order, and then you want to predict the next one. So actually this is pretty similar to the
ROCStories task, which is a question like a discourse continuation kind of dataset. That's a bit of
a tangent. It's an interesting dataset. But in this work they say, given these three sentences so
far and the list of candidate next sentences, let's try to predict which one is the actual next
sentence. And hopefully by forcing the model to capture some notion of discourse coherence, you'll
get better representations of sentences. And then the last classification task they look at is
deciding how the two sentences are related to each other. So, back to, I'm just given two sentences
in order and I want to know what discourse relation exists between them, if any.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:52">

So there might be, they have these different labels like return or strengthen or contrast. So one
example of the strengthen one is "It didn't hurt at all, it's exhilarating." Where the first
sentence is making a point about the level of pain experienced in something. And then the next one
just strengthens that point saying it didn't hurt, it was actually in fact exhilarating. So training
the model to predict these kinds of discourse relationships will enforce the model to look, will
make the model learn some notion of sentence meaning that hopefully will be useful for some
downstream task.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:32">

This is I think, a very intuitive and nice framework for learning sentence representations because
it doesn't restrict to a certain way, a certain notion of semantics. It enables the user or the
person who's training a model to determine what kind of sematic they care about. So if I am mostly
interested in, for example, one of my colleagues here is working on, given a PDF which is a paper
represents a publication you'd like to find out which phrases correspond to the title was phrases
correspond to the author names and in these cases, the kind of sentence compression you want to use
is very different than if you want to use this sentence features for a textual entailment for
example. And depending on which tasks you would you intend you to use the features for, you're going
to come up with different classifiers.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:34">

Yeah. And so I guess your point is that I could take the same idea of treating this like sentence,
binary sentence classification task and come up with some new classification tasks that I can get
automatic data for in some nice way but is more tailored to my particular needs for what I want to
use the, the representations for in the end.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:56">

Yeah, exactly. Because I mean, the whole idea of doing unsupervised learning is to use the features
for another task. The features by themselves are useless. And yeah, often it's the case that
features that are good for one task are not good for others.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:14">

Right. And I guess that brings us to the evaluation that this paper did. So they were largely
comparing with previous approaches. So the skip thought vectors and other similar unsupervised
sentence representation, learning models. And their main claim is that they're way faster with
comparable performance, which makes sense. They're not predicting other sentences at training time,
they're just predicting a discriminative label. And so it's a whole lot faster to train these things
and that's their point. And their table shows that on at least some of the metrics, so they did the
same evaluations that we saw in the last paper that we looked at on sentence representation
learning.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:59">

So this is paraphrase detection, subjectivity, evaluation and question classification. On the
paraphrase detection and on subjectivity evaluation, they get within like half a percent. They get
pretty comparable performance. They do a bit worse on the question classification, but still
reasonable, not too bad. And their runtime they say is eight hours, whereas the skip thought vectors
implementation would take over 300 hours to get a similar result. So they're an order of magnitude
or two faster with comparable performance, which is pretty nice. I guess I still have my same
questions about do we really want to represent sentence as single vectors, but that's a longer
discussion for another day, I guess.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:49">

Yeah. I mean, when you want to use this, you can use it. You can augment this with also word level
representations.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:55">

Yeah, I guess they're using a biGRU here. You could have, instead of pulling out a single sentence
vector, you could pull out the, the word level representations that the model learns and use those
somehow. Yeah, you could've done that too. Okay. And I think that's all that we have for this paper.
It was a short paper. So a short episode.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:16">

Thank you, Matt, for presenting this paper. Next time we'll talk about Attention and Augmented
Recurrent Neural Networks by Chris Olah and Shan Carter.

</Turn>
