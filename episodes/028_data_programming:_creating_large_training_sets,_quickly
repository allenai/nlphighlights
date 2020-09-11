---
title: "Data Programming: Creating Large Training Sets, Quickly"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: 028
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:11">

Today's paper is titled Data Programming: Creating Large Training Sets, Quickly. It was published in
2016 a few months ago, written by Alexander Ratner and other colleagues at Stanford University. So
the set up of this paper is that in many cases you're trying to learn a model that makes some
prediction, but we don't have enough training data, enough hand labeled training data and it's very
expensive to find someone who is a domain expert to produce, to create these labels. And often times
also the specifications of the problem change quite often. And so even if you're willing to spend
the money to construct this training set, it may change in a few months and then it's going to be a
huge investment. So the proposal the paper is trying to make at a high level is that it proposes a
new paradigm for generating training data, it's called data programming. And the idea is to
programmatically create training sets. And the functions that he used to create these training sets
are written by a domain expert and are meant to rapidly train a machine learning system. So in data
programming, instead of manually labeling each example, you would describe the process by which the
points could be labeled by providing a set of heuristic rules which they call labeling functions.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:49">

Hold on a minute. You just said automatically generate a whole bunch of training data. And we've
talked about a whole bunch of automatically generated training sets in NLP like the BAbi dataset and
various like the CLVR dataset, other kinds of so-called question answering datasets, but are
automatically generated text. So this makes me a little bit nervous. Is this paper about
automatically generating something that is supposed to be language but isn't actually language.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:14">

No. Thanks for clarifying. No. So here I'm talking about generating the labels, the input. So
there's often like a pair that we're interested in an input which is in NLP is the gradient sentence
or a word or some natural language. And then there is the label that we're trying to predict for
this input. And here they're trying to generate the label. They're not trying to generate the input.
And there are many other proposals that are also in the same space of like using unlabeled data and
not requiring that we have a large training set. So this is what all like unsupervised and semi-
supervised learning literature is about specifically the paper mentions distance supervision as a
relevant approach in distance supervision you're assuming that some of the knowledge base relations
that you have in the, so you assume that you have a knowledge base with a bunch of relations between
entities and so you instantiate within the text relations between the mentions of these entities.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:31">

And assume that the, at least some of the instances will establish this relationship. Some of the
textual mentions will establish this relationship in the knowledge base. You can think of this paper
as a generalization of distance supervision, meaning the function that you're using to label the
training data can look up the knowledge base and ask if there is a relation between them and if yes,
then it creates a label that's consistent to this. So there's also crowdsourcing so instead of
relying on experts. How can we rely on non-expert annotators? It's kind of a, less related, but it's
also like in the same space of like avoiding expensive construction of datasets. Co-training is the
idea of construct like using multi-view learning. Like if you have multiple classifiers using
different features, you can bind their predictions basically in clever ways to a whole bunch of
unlabeled data.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:39">

So this is kind of in the same spirit, but it's a different way of doing it. Yeah. And there is like
there's a few other related work that's discussed on the people.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:52">

So can you describe exactly what this model is doing?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:56">

Right. So the paper focuses on a binary classification problem, right? So we have a logistic
regression model. We're trying to minimize the logistic loss using a linear model. And we assume
that we don't have label data. And sometimes we would, and the like the framework allows you to use
label data when you have it, which is nice and important. But what this framework allows you to do
is to specify a bunch of labeling functions. So these labeling functions takes the input.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:39">

So we'll call the input X and the output Y and the output in this case. So the input X is just going
to be something that you can featurize you can like pass it through a feature, like extract features
from it. It could be hand tuned or something like an LSTM or whatever distributed representation to
extract features from and the output Y is going to be either -1, or 1. And the labeling functions
that you are going to define as a domain expert map, you're just going to really write a function
that takes this X and generates -1 or 1 and at times where your heuristic or your labeling function
does not know has no clue about this input it will generate zero. So for example if we're trying to
predict whether a given gene has a causal effect on a disease, the input in this case will be the
pair the gene and, and disease pair and the output and maybe the context which occurs around them in
a sentence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:57">

And then the output is going to be +1. If we know that there is a relationship between them, there's
a relationship -1. If we don't, if we know that there isn't and otherwise it's going to be zero. And
so the paper gives few examples of such labeling function, one of them would be exactly what the
distance supervision is doing. So it looks up a knowledge piece and sees if this pair has a
relationship between it, if yes it returns 1 otherwise its returns 0. Another one would look at
specific words or phrases in the context that's between the two entities. And so if you see that the
words in between the string between the gene and the disease includes the string not cause, then
you'd assume that this is a negative example.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:55">

And then you can also like do clever things like you can just like create whatever you want. In the
end you're using your favorite programming language to write this.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:04">

This sounds like we're just writing feature extractors to get features for a logistic regression
classifier. What, what's different? What am I missing here?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:12">

The difference is that we're treating these the values that you're returning are not going to be fed
into the classifier the descrimitive classifier they're going to be used as labele data. So as the
class you are trying to predict, they have a very specific symmantic.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:34">

So I think then the difference is instead of writing a bunch of feature extractors that give me
binary one hot features to say this feature is present or it's not, I'm making some assumptions
about each individual feature and whether it correlates with the class label or not. Sorry, whether
it positively indicates the class label or whether it doesn't. So like the functions that you
described are feature functions that we would have written, right? Like there appears this sub
string in between these two words in a sentence I would have expected that as a feature for some
relation extraction model. But now what you're saying is instead of that say, I think that this
feature actually means like if I ever see this feature, it's very likely that the label should be
positive. And if I see this other feature, it's very likely that the label should be negative. And I
write down a bunch of these assumptions and those are my labeling functions and I'm going to use
them in some smart way.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:38">

Yeah, that's exactly what they're proposing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:40">

Okay.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:40">

And of course there are many other features that you can define. And are likely to be useful, but
you cannot confidently say most of the time this feature would indicate that the label is negative
or the label is 1. So this does not obviate the need to write these features. Actually the one that
use, because of the model, they use at the end, those use hand features in addition to this. But I
agree. Yeah. These labeling functions are typically things that we would include in the feature
space.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:19">

And so now this is sounding really similar to me to co-training where I have a, I guess co-training
is you have different feature sets and you would train weights for the feature sets independently or
sorry, you train them jointly. And if it's true that the classifiers make independent errors and are
better than random, then you can make progress. So like you have to have some assumptions on like
the labeling functions that whoever the expert is writing here are better than random, otherwise
you're going to be hosed. But if I just have each of my independent feature sets in the co-training
setup as a single feature, that then gets away for downstream of this logistic regression classifier
that [inaudible]

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:07">

You could have used the same intuition to train two separate models. Yes. This is different in
several ways. Like one clear way in which it's different. You don't need label data in order to
train the individual classifiers. But yeah, I guess I didn't say yet how they're using the label
data.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:30">

Okay, so let me let you continue.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:33">

Okay. So once you define these labeling functions, the next step is to define a generative model for
generating the labeling functions and the class labels. So you're not just, this was confusing to me
when I read the paper. The Generative model is not trying to generate the input to the classifier,
it's not trying to generate the natural language. It's only trying to estimate the labeling function
and the class labels which is not typically the way we use the generative model.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:06">

Yeah, that sounds pretty, pretty different,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:08">

Right but anyway, so the, there are like two versions of the generative model, one of them assume
that the labeling functions are independent and the other one assumes that there are some
dependencies between them. So it would make sense for example, to apply one labeling function and
only if the result is true. Then you use the other one. So sort of like the heuristics, we would
draw it if we want to solve a prediction problem without training as to the skill model trying to
learn these dependencies in a vector graph. And so I don't think the like the specifics of this
generative model are very important. But at the end what you get is you get a confidence score. I
would, yeah, I'd call it a confidence score in each labeling function.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="13:08">

And also a measure of how often this labeling function actually produces a label because every
labeling function has an option to upward zero, meaning I don't know how to label this thing. And so
that's what the generative model is optimized. So once the generative model is optimized, you can
use it to to get this confidence score and likelihood for whether the labeling function will
actually generate a label or not. So in order to optimize the parameters of the generative model, we
sum over all the unlabeled examples in the training set. And we use the generative model to get a
probability for each of these examples. Each of these labeled examples given by the labeling
function. And then we marginalize over the possible values for the correct label Y in order to get
the overall probability for annotating, for just labeling this example. So what's weird here is that
we don't have any signal to teach us or like train the parameters of this generative model which
labeling functions to trust more. But one of the, some of the parameters basically every labeling
function has one parameter that like signifies its accuracy, the degree to which it correctly labels
instances. So is something that I didn't completely understand in the papers. That was all very
clear,

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:54">

It sounds really similar to me to work on. How do you do confidence estimate like accuracy
estimation of people, crowdworkers on mechanical Turk. So there are a number of crowdsourcing papers
by Dan Weld and other people who have looked at given a bunch of annotations from people on some
crowdsourcing platform and no labels at all to begin with. You need to both decide what are the
actual labels and which people should I trust and how much and it seems like a very, very similar
problem to what's going on here so.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:28">

That would be, that would be the maybe if but it requires that you're very careful with the labeling
functions. You're assuming that if there is a lot of disagreement between the labeling function,
then they're like, they're not, they're not good.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:43">

Yeah. You're, relying on being able to figure out through consensus, the correct labels for at least
some of your data points. And if like it's totally gameable if you have some adversarial workers.
But under some reasonable assumptions you can do all right. And I guess if you're in the, in this
paper you're doing this data programming and you're assuming that the person who's writing these
labeling functions is not out to get the learning algorithm. Yeah. So it's probably, okay.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="16:15">

Yeah. So that's also suggested maybe, and like an extension of this would be try and learn the
parameters of listener to model using a small amount of, a small amount of label data. There's a
later paper that was written by some of the same people which we may have a chance to discuss in a
future episode that's very relevant to this. But once you have the generative model that scores the
labeling functions and their predictions, sorry, and a label, then you can use these probabilities
to give different weights to different training examples. So that's basically the end of the story.
You train any kind of discriminate model that you like, but give a different weight to each of the
training examples or automatic generation depending on using this generative model.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:16">

So it's a pretty flexible framework. I'd say. I wasn't very clear on the guarantees. It makes
because there is like various assumptions that are made throughout the paper. So, I'm not sure to
the extent to which these assumptions are going to hold. One thing that stood out, for example is
that they are assuming that the like the, the classes that in this binary classification problem are
going to be balanced. So most of the time, it's like about 50% of the cases the correct prediction
is one which is very rarely the case. And in the experiments, they compare this to a baseline, their
own baseline where they defined some heuristics on how to apply the same labeling functions. So we
have a bunch of labeling functions written.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="18:10">

You can either ask a domain expert to write a bigger function like another function that calls these
labeling functions to deterministically predict the correct label or use the unit programming
approach to do this. And they showed us the experiments in two setups were one of them uses hand
tuned feature extraction and the other uses an LSTM to extract features. The task here is slot
filling. So it's similar to like distance supervision the distance supervision methods, but they
don't compare to distance supervision or like any other well established a baseline in this area. So
that was a little disappointing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:03">

I guess. For those who aren't familiar, slot filling is the task of given an incomplete knowledge
base. This is really popular in like DARPA grants. And so it's often about like terrorist attacks or
whatever. You're given some schema. Like we're looking for incidents of terrorist attacks and there
will be like, for instance, a bombing who did it, how many injuries there were, where it happened.
And each of these is a slot that you need to fill by looking at some collection of documents. And so
it's relation extraction, essentially inaggregate over a corpus of documents.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:44">

Right. And since we're doing binary classification here, we're only like looking at one of these
slots at a time and trying to unfold it. So they also show that you get consistent improvements when
you go from like this deterministic organization of which labeling functions to do first and then
what, to the data program model, sometimes the differences are I think the biggest, the biggest
improvement I've seen was five F1 points from 37 to 42. That's isn't that's a form of genomics
domain. l yeah, like across the board we were seeing consistent improvements pretty much. And
there's another table that shows the coverage, their labeling functions had for various applications
or various domains. So like the coverage that they had ranges from 7% to 53%. So in the unlabeled
dataset, they were able to generate the labeling functions were able to generate a label for like
53% of them. And sometimes there will be a conflict of the conflicts is actually very low, which I
find a little surprising given that sometimes we have quite a number, quite a large number of,
labeling functions in one of the domains or the application they had 146 labeling functions. I can
only imagine how long it takes to write these. But uyeah, the conflict seemed to be very low like
the maximum conflict reported is 2% of the cases, which were labeled.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:45">

So did this seem like a method that you would want to use in your work?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="21:49">

I think it's interesting. It's a very practical method. I would wait and see if other people also
managed to get good results with it. But I potentially, yeah, if I had the ability that I could try
many different things at the same time. That would be one of the things I want to try for sure. I
guess

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:18">

Seeing the pitch in the paper and the way that you pitched it, it seems to me more like if you don't
know much of what you're doing with machine learning or fancy algorithms, here's a simpler way for
the lay person to get involved in doing machine learning. Is that a bad characterization of what's
going on or is that fair?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:39">

No, I don't think it's fair because just being good at machine learning doesn't obviate the need for
training data and like all this unsupervised learning methods are not good enough, basically. When
you don't have labeled data, you don't just hire someone who's good at machine learning. You also
hire someone who can annotate data for you or can compile a CLVR data set for you. That's important.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:11">

Yeah. Okay. I can see that. So this, so this is more a method to quickly get or get without too much
work, a bunch of labels for a bunch of unsupervised data that you have unlabeled data. Right.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="23:25">

And use them in a conservative way. Without trusting them too much. That's the thing that I think is
important.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:35">

Okay. So the thing that made me think about this differently was that in addition to just getting
some kind of labels, you're also making assumptions about the model that is going to come out on the
other end. So that means it's like a more limited kind of thing you can do. It's not just, hey,
here's a new way to get me more data, more labels quickly. It's if I'm willing to constrain myself
to use a particular class of models, here's a way to do it in a reasonable way.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="24:02">

Yeah. Well the constraint is not actually very restrictive. If you ask me like you typically have,
it's very easy to give a different weight to every tuning example. And that's really the constraint
that you'd have for the discriminantive classifier at the end, which a lot of times we do this when
we have like imbalance of classes we would give different weights different labels. I think my
biggest concern about this paper is that I don't think their results are compelling enough to make
me want to like to like leave everything I'm doing and use it. So I think that's why I need to see
more empirical evidence that it works. So to be honest, like the very good results from here are
comparing heuristic method that the authors wrote, which I trust they did a good job, their due
diligence to do this in a careful way. But it's not, it's not as compelling a result as if you had
an existing method that is comparable.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:13">

Yeah. Okay. Thanks Waleed for telling us about this paper and for the interesting discussion. Next
time we will talk with Graham Neubig about some of his recent work.

</Turn>
