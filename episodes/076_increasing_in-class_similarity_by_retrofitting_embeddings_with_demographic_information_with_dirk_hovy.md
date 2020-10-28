---
title: "Increasing In-Class Similarity by Retrofitting Embeddings with Demographic Information, with Dirk Hovy"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Dirk Hovy"]
number: "076"
tags: []
description: "EMNLP 2018 paper by Dirk Hovy and Tommaso Fornaciari. https://www.semanticscholar.org/paper/Improving-Author-Attribute-Prediction-by-Linguistic-Hovy-Fornaciari/71aad8919c864f73108aafd8e926d44e9df51615

In this episode, Dirk Hovy talks about natural language as social phenomenon which can provide insights about those who generate it. For example, this paper uses retrofitted embeddings to improve on two tasks: predicting the gender and age group of a person based on their online reviews. In this approach, authors embeddings are first generated using Doc2Vec, then retrofitted such that authors with similar attributes are closer in the vector space. In order to estimate the retrofitted vectors for authors with unknown attributes, a linear transformation is learned which maps Doc2Vec vectors to the retrofitted vectors. Dirk also used a similar approach to encode geographic information to model regional linguistic variations, in another EMNLP 2018 paper with Christoph Purschke titled “Capturing Regional Variation with Distributed Place Representations and Geographic Retrofitting” [link: https://www.semanticscholar.org/paper/Capturing-Regional-Variation-with-Distributed-Place-Hovy-Purschke/6d9babd835d0cdaaf175f098bb4fd61fd75b1be0]."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F536274216&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language. Processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

Okay. Today our guest is Dirk Hovy. Dirk is an associate professor of neural science in the
department of marketing at Bocconi University. His research focuses on computational social
sciences. He's interested in integrating socio linguistic knowledge into NLP model. And today we are
going to talk about his new paper title Increasing In-Class Similarity by Retrofitting Embeddings
with Demographic Information. Welcome to the program.

</turn>


<turn speaker="Dirk Hovy" timestamp="00:35">

Alright, thank you for having me guys.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:37">

So this work is one step in a directions that you're passionate about. Which is all about making NLP
about people. Again, could you tell us a bit more about this?

</turn>


<turn speaker="Dirk Hovy" timestamp="00:46">

Yeah, so yeah, this is something that I'm really interested in. NLP is great and has achieved a lot
of things by modeling language as a computational problem, as an engineering problem, which can be
addressed with a variety of models. That's the thing. We sometimes forget that language is actually
spoken by people and it's a social phenomenon. It's a social construct. So it has a couple of quirks
and idiosyncrasies that make it very different from, for example, signal processing or other machine
learning tasks because it also is a moving target. Language keeps changing. Language is very
different between different people. And a lot of my work focuses on pinpointing exactly which
variation in language affects our NLP models. So things like age or gender or where you're from. And
on the other side, on the other hand, to actually incorporate some of this knowledge to make our
models both more performative and hopefully fair because they can accept the fact that, you know,
language changes over time and between people, I now work in a social science environment, so I work
a lot with people for whom language is a signal.

</turn>


<turn speaker="Dirk Hovy" timestamp="01:53">

So they want to use some data that they have to find out something about society and they sometimes
have external knowledge that they want to incorporate into that. And so this whole work on
retrofitting, there's this paper that we're currently discussing. There's another paper that uses
it. Also at EMNLP, and I have another paper where I laid the foundation and sort of outlined the
idea before this one came out a couple of months ago at a workshop, this all goes in that direction
because it turns out that retrofitting actually allows us to incorporate a lot of external non-
linguistic information in word embeddings for example. And so this paper is sort of the proof of
concept where we show that if we use retrofitting, you can actually capture a lot of information
that's not necessarily present in the text that will work.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:45">

Yeah. That's very interesting. Could you tell us a little bit more about the tasks that you're
trying to do in this paper and what do they tell looks like?

</turn>


<turn speaker="Dirk Hovy" timestamp="02:53">

So in this paper we show how the model works on two tasks, both of which are from author attribute
prediction. So we look at predicting author age and author gender from texts. The data we're using
is from another paper I wrote a couple of years ago. It's basically review data where people post
online reviews and we have information about their age and their gender. And in this case, we're
basically treating age as a discrete variable. So we're trying to predict the decade somebody is in,
are they the teens in their twenties thirties forties fifties sixties so what we're doing here in
general is we're trying to take the word embeddings that we've used on the training data and then
increase the similarity within each of the classes that we have. So for example, for age prediction,
we have 10 classes and we're trying to make people within each class, speakers within each class
more similar to each other.

</turn>


<turn speaker="Dirk Hovy" timestamp="03:51">

So the idea behind this is something called homophily, which is also sometimes translated as birds
of a feather flock together. What that basically means is you have a lot in common with people who
share the same sociodemographic attributes as, so people who are all the same gender or the same age
from the same region have the same kind of education. You are very similar in many ways, and that is
reflected in the way you speak. So when we learn word embeddings, we can capture lexical similarity,
people using similar words, similar constructions, similar linguistic features. But in this case we
also know something else about the people in our training data, namely that they do have the same
age, they're in the same age group for example. And so what we can do with retrofitting is to say,
okay, we've learned author embeddings, we've learned document embeddings with Dr. Beck based on the
words that people use.

</turn>


<turn speaker="Dirk Hovy" timestamp="04:45">

And we represent each of the people in our training data as a vector. But we can now move these
vectors around a little bit in the embedding space to make them more similar based on the class
information that we have. So now that I work a lot with social scientists, I sometimes have to
explain things a little bit more graphically than you know, with computer scientists. So what I say
with embeddings is the, imagine you have fridge magnets. All right? So each fridge magnet is one of
the people in your data and now you get to move these fridge magnets around on your imaginary fridge
so that people who talk about similar things are closer together. And you do this a hundred times a
thousand times until you're sort of satisfied with the distribution of magnets on your fridge. Only
that what we have is actually a 300 dimensional fridge. So we can actually make a lot more of these
clusters.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:36">

That's an excellent summary and a nice way to visualize it. So let's dive into the details then. So
each author is represented by however many reviews the wrote in this data set, right? And then you
use doc to vec, which is an extension of word to vec to, to embed these documents or these authors.
Right. And then you have an embedding for each author which you try to retrofit. Could you tell us a
little more about, cause I think some people may not be aware of what retrofitting really means.

</turn>


<turn speaker="Dirk Hovy" timestamp="06:06">

So the basic idea behind retrofitting is to increase the similarity between embeddings word
embeddings originally in this case document embeddings. The same principle applies based on outside
information. So in the original paper by (Manaal) Faruqui et al., They use dictionaries or what they
call dictionaries, a outside semantic information from ontologies, from from WordNet, from the PPDB
to say, alright, here is the representation of some words in our embedding space. However, I happen
to know that this set of, let's say seven, eight words actually are synonyms of each other. So I
would like the representations of them to be even closer than they already are in embedding space.
And so retrofitting is the process by which you iteratively draw the embeddings closer together in
embedding space by essentially several times multiplying the original embedding of each word with
the average, the centroid over its neighbors in the new retrofit embedding space,

</turn>


<turn speaker="Waleed Ammar" timestamp="07:12">

Right. So, and then in your case, the edges, the things that connect people is actually the label
that is given to them in the training set. But you could also use other signals that you know about
these authors. Would this help at all in the setup that you've been experimented with?

</turn>


<turn speaker="Dirk Hovy" timestamp="07:28">

Yes, absolutely. So we did a couple of changes from the original paper, there they basically used
semantic lexicons to change word embeddings to retrofit word embeddings according to that semantic
information. We sort of take the same approach but we apply it in this case to author
representations document embeddings based on some external information non-linguistic information
that we happen to have in this case the classes and yes, we basically construct for each person a
wrap and say, okay, this person is connected to all the people in our data who are in the same
class. So for all the 20 year olds, everybody who is a 20 year old is connected to all the other 20
year olds and so we're trying to draw all of the 20 year olds closer together in the bedding space,
all of the 30 year olds, all of the 40 year olds and so on and so forth.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:15">

Would it help to add also additional demographics that you're not targeting for this task? My
understanding is that you have different models or you do separate retrofitting for when you're
trying to predict the age you use the age signal and when you try to predict the gender you only use
the gender signal. Would it help to use multiple signals at the same time?

</turn>


<turn speaker="Dirk Hovy" timestamp="08:34">

That is a very good question. Yes, so theoretically this should be possible that we can actually do
both. We can, we can apply all the external information that we have. We haven't tried that yet, but
it's on our agenda and depending on the task, this might very well help and so essentially what this
would address is sort of confounding where you have joint effects of somebody belonging to two or
three different socio-demographic groups. That means both age and gender influence how you speak. In
this case we did it separately because it's a proof of concept and we kind of wanted to do things
very cleanly and separably. We've since applied the same technique to a couple of other tasks. And
this is where it gets really interesting. So this retrofitting essentially allows you to separate
out the classes in your embedding space much more cleanly. So when we go back to machine learning
101, we have all these beautiful graphs of like two clouds, one of X's and the other one on circles
and there's a lot of space in the middle. And everybody who has a ruler could just, you know, lay
that ruler in between and say, okay, this is the decision boundary. And in real life that is never
the case. Right? Things are extremely messy. And so what we're trying to do with this retrofitting
is essentially just increase the space between the classes in our embedding space.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:52">

Presumably you're optimized for, you're using a neural network, the network already has the capacity
to do this except the optimization may be harder. You're making the optimization easier by doing
this.

</turn>


<turn speaker="Dirk Hovy" timestamp="10:02">

Exactly. This is essentially a pre-processing steps. So it is separate from the process that induces
the representations. So in this case, Doc2vec or word2vec and it is separate from the classification
algorithm, right? And but it is exactly how you say we're giving a neural network or a classifier in
general a leg up by making the classes more linearly separable and thereby basically infusing some
outside inflammation into the representations. Now you could do the same thing within a network in
the class of graph convolutional networks. You're basically learning the same thing. You're
essentially learning this retrofitting matrix to the one step at a time as part of the training
process. But it takes longer, it's more costly. And in this case we sort of save the model some of
that trouble by basically preparing the embedding space beforehand and making it easier, in the end
to find a linear decision boundary.

</turn>


<turn speaker="Matt Gardner" timestamp="11:02">

So I'm trying to understand some of the details of how this actually works and whether you are
improving the nearest separability. But I think to dig into this detail, we need to talk about one
more aspect of what's in your paper that we haven't mentioned yet. And this is the transformation
that you learn from your original space to this retrofitted space. Can you tell us about that and
then I'll ask you some questions about it?

</turn>


<turn speaker="Dirk Hovy" timestamp="11:23">

Yes. So one thing that differs between what we're doing and the original work is that we essentially
are trying to learn the way how we can induce retrofitting from the training data on the training
data. We can learn a retrofitted version off the training data and then we want to be able to apply
that same transformation from the original space to the retrofitted space on unseen test data. And
so what we're doing here relatively simply is we're taking the original embedding space and then we
take the retrofitted embedding space and we're learning at least square approximation between these
two. And we find that this least square approximation, which itself is just a translation matrix,
can then be applied to unseen test data provided that the test data has been produced by the same
embedding or representation learning algorithm as the training data. So as long as we have a way to
produce representations of new unseen data, we can then apply this translation matrix to get the
class separability that we've learned on the training data.

</turn>


<turn speaker="Matt Gardner" timestamp="12:28">

Yeah, and I guess this is an issue for your work where it wasn't really for the original
retrofitting to semantic lexicons work, because the prior work just used side information that was
on the, there was not cheating, that wasn't using the class label itself whereas you're using the
class label, which means I can't do this at test time, I need some other way. So what I wonder about
is linear separability because what you're doing in the end is a linear transformation on the same
data space. How does that change linear separability it's just a linear transformation.

</turn>


<turn speaker="Dirk Hovy" timestamp="13:03">

Well, what it does is it increases the in class similarity and it should increase the separability
or improve the separability within classes. So in the limit, it should hopefully be linearly
separable. We're currently discussing with a couple of people who are in machine learning how this
could be set up in a framework where if you apply retrofitting iteratively then followed by the
translation matrix and do that over and over again. You would theoretically in the limit arrive at a
point where the classes are completely linearly separable, but this is something where we're
currently exploring, so when I say linearly separable I that that's probably a misnomer I should say
trivially separable or more easily separable. Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="13:55">

Yeah. We're looking at the math in your paper. I was wondering what exactly is going on here. You
have this parameter that changes a mixture between the Doc2vec vector, like your original
representation for each offer and your neighbor representation in this retrofitting objective. I
guess if you set that zip parameter to zero such that you ignore your original vector within the
limit, this is going to converge to basically a class label vector and then if I learn a
transformation, I'm basically just doing prediction itself, right? That T is itself a logistic
regression to the class and then your prediction is doing another logistic regression on top of
that, which should I, as you say, be trivial, right, because they're already basically trying to be
predicted to these centroids,

</turn>


<turn speaker="Dirk Hovy" timestamp="14:40">

So in the original paper there are weights attached to the original embedding space and the retrofit
space that can sort of control how aggressively we retrofit in each iteration. In the original
paper, they basically introduced the weights but left them as is. We've modified that a little bit
by basically saying we want to make these two parts compliments so you basically have a sliding
scale where you can say, all right, if I set my parameter to one, I will only use the original
space, in which case there's no retrofitting or I can set it to zero. In which case I forget about
the original space and really converged to the centroid of my neighborhood. What we've found in this
paper or what we've tried to show in this paper is that depending on the task, you want a different
value for this alpha parameter to sort of rely a little bit more on the original embedding space or
a little bit more on the information you get from the outside lexicon, from the structural
information, and depending on what your data looks like and what the task looks like, that alpha
should be tuned on a dev set.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:48">

So presumably if you tried to fit the translation matrix just for each of the labels separately,
you'll get a much better matrix, but you can't apply to the test set. Do you have a measure of how
much better your translation matrix will minimize the least squares.

</turn>


<turn speaker="Dirk Hovy" timestamp="16:03">

It's not perfect, but we've experimented a little bit with training either on the retrofitted
training data or on the original data transformed by the translation matrix, which is an
approximation of the retrofitted space. And we find that the classifier actually performs better if
it's trained on the original data transformed by the translation matrix because it's an
approximation. So it prevents the model from over-fitting too much to this retrofitted space. And so
the least square approximation itself acts a little bit like the regular riser in this case. But
what'd you say is correct. Ideally we'd want to learn a translation matrix for each of the classes,
but obviously that would be cheating. So in transductive learning, that is entirely possible and
it's probably a good idea in inductive learning where we want to apply it to a test set where we
don't know the labels yet. We can't do it for obvious reasons. I should maybe say at this point, we
also tried this on other tasks. So we've found recently that it works extremely well for
geolocation, but it actually also works, for example, on the MNIST dataset. So by using this
retrofitting with the translation and then applying that to unseen test data, we get small but
significant improvements even on something as arcane or foreign to NLP or different from NLP I
should say as the MNIST. The prediction of numbers from images.

</turn>


<turn speaker="Matt Gardner" timestamp="17:29">

Yeah. And so your prediction method in the end, at least in this paper, I'm not sure what you did on
MNIST. Is logistic regression on top of these translated vectors. And so that's literally, I have my
original vector of linear translation matrix and then a linear weight matrix and a soft max. Two
linier matrices right next to each other is a linear matrix. And so why does this help? Instead of
like why, why can't you just learn this in the original, like an in a weight matrix directly on top
of the original vector?

</turn>


<turn speaker="Dirk Hovy" timestamp="18:00">

Oh, you absolutely could. And I mean there are ways in which you could do this. This goes back to
the graph. convolutional learning in practice graph convolutional learning has a lot more parameters
because now you're trying to also learn this transformation matrix intrinsically. And so it takes
longer to converge. You need to do more tuning and you have less control over how this whole
transformation is actually working. So in this case it's sort of like a manual pre-processing that
makes things easier. I should say though that the classifier is somewhat incidental to the
retrofitting aspect of this. So absolutely we could have used a more sophisticated nonlinear model
to use on top of this. Another thing we're exploring right now is to actually, instead of using the
least square approximation for the translation matrix to learn a non linear transformation matrix or
a network essentially that does that, but this is something that that we're currently looking into.

</turn>


<turn speaker="Dirk Hovy" timestamp="18:55">

The really interesting essence here for me is that the retrofitting process allows us two things.
One is we can increase the similarity within classes, but also we can bring external knowledge to
bear. So in this case, increasing the in-class similarity that's not actually external. Well, it's
knowledge that's external to the text because realize here on the label, but we can use other
information as well. So we have another EMNLP paper where we essentially show that if we apply
geographic information to embeddings that we've learned for cities, we can reconstruct dialect areas
much more precisely than we could learn them from the raw textual data.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:36">

So on this point, it's not clear to me why is this better than adding them as additional features in
the classifier that you learn at the end. You can always add more features in addition to the
embedding.

</turn>


<turn speaker="Dirk Hovy" timestamp="19:46">

That's true. So you mean in the case of geographic information?

</turn>


<turn speaker="Waleed Ammar" timestamp="19:50">

Well, I mean in general you were saying part of the appeal of this method is that allows you to
incorporate more features that are not linguistic when you're instructing embeddings for construct.
And I'm wondering why is this, if the goal is to do classification afterwards, then you can add them
in addition. So you can calculate the embedded with other features.

</turn>


<turn speaker="Dirk Hovy" timestamp="20:07">

You could potentially also do that. In this case, you can bring relational knowledge to bear sort of
how the different instances in your data relate to each other. Right. So because it's a graph that
you're essentially constructing about the similarity between them or connectedness. If you have a
binary matrix you can just say are these two connected or not, but you can also have a floating
point number or you can have a continuous value in your connection graph. Basically expressing that
this instance is more or less similar to some of these other matrices.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:39">

It's a very powerful idea. Of course. I guess one question that popped in my mind when I read the
paper is how expensive is this to do? There's a lot of connections between all pairs of examples of
this for the theme label.

</turn>


<turn speaker="Dirk Hovy" timestamp="20:48">

That is an excellent question and that was something that I was very concerned about at first
because when I first started playing with retrofitting and the original paper makes an explicit
point that it is very fast and it is for the semantic classes where you have a neighborhood size of
five or maybe a dozen, and in this case, if I connect every instance, so we have about a hundred
thousand data points. We look at different training data sizes, but let's say we have 10,000
potentially, you know, each of my instances is connected to several thousand other instances that
are in the same class. So our neighborhoods get fairly big. So in practice of course it is slower
than, you know, if your neighborhood has size five or 10 but it actually runs in a reasonable amount
of time. So in the paper, what we did is very the training size from 1000 to 10,000 and we actually
ran 100 independent drums sampling the thousand two thousand three thousand whatever instances as
training data and then constructing the retrofitting graph, doing the retrofitting, and then
learning the translation matrix and then applying that whole thing to the held out test set, which
is the remainder of the 100,000 and what we see is that even where we do it for the 10,000 we get
relatively fast results.

</turn>


<turn speaker="Dirk Hovy" timestamp="22:05">

So the training time took between several minutes to maybe a couple of hours. So the way we
implemented it was actually through sparse matrices and both constructing and then multiplying those
things with sparse matrices turns out to be reasonably fast and memory efficient. We did run into
one problem, so now we want to to apply this to the task of geolocation for tweets and basically
saying, all right, each word is connected to all the other words that you've seen in the same place
and so if you have a vocabulary size of 100,000 then you know in the worst case you have and
neighborhood size of 400,000 so that gets really big. We've found that up to I think 100,000 it was
still feasible. It was still workable as you get larger neighborhoods. One thing we did was to
restrict things and say, alright, each word is only connected to all the other words that it has
occurred at least twice in the same city and so that brought down the size of that graph to a
manageable amount so that we could actually compute it in a reasonable amount of time.

</turn>


<turn speaker="Matt Gardner" timestamp="23:08">

I guess in this particular instance, the set of neighbors is the same for every class and you could
just compute that once up front, right?

</turn>


<turn speaker="Dirk Hovy" timestamp="23:16">

Yes. You can do all of these computations up front, sort of on the training data that you have. So
constructing the graph is like one of the first steps and you can do that at a single time.

</turn>


<turn speaker="Matt Gardner" timestamp="23:25">

Yeah. In each iteration, in part of your equation, you're competing as sum over the whole
neighborhood because that neighborhood is actually shared across every instance of every class. You
only really have to do it once and you can dramatically speed up your competition.

</turn>


<turn speaker="Dirk Hovy" timestamp="23:37">

Yeah. Because it's the, it's the same for every member of that class. Yes, absolutely. And so that
is one of the things that makes it very, very fast because you can keep reusing that average, the
mean of that neighbor. Yes, absolutely.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:48">

So how well does all of this work? Can you tell us a little more about the experiment that you did
and the results?

</turn>


<turn speaker="Dirk Hovy" timestamp="23:54">

Yes. So I mean, the fact that it was published at, at EMNLP got accepted typically means that things
work. Right. so we did look into how well does it work and, and how much better does it work. Then
the unretrofit case, we also compared it to a bag of words approach. Two days after it was accepted
and I published a draft on my website, somebody wrote to me and said, Oh, I also experimented with
like a better BERT bag of words model and you can improve the performance of the bag of words model,
but it's still not as good as the retrofited, and I thought, Ooh, okay, good. So what we find is we
have two tasks. We have a age prediction and gender prediction. And in both cases the retrofitting
does improve significantly in many cases over the un-retrofit or the bag of words model.

</turn>


<turn speaker="Dirk Hovy" timestamp="24:41">

What we see is that on age prediction where we have 10 classes, we actually see a much, much bigger
difference between the retrofitted and the original embedding space in terms of performance of the
model. And we see that from using a thousand examples as training data up to 10,000 instances as
training data. The level of statistical significance varies. What we did is we basically did
bootstrap sampling since we were running a hundred iterations with each training size. We're
sampling that say for training size of thousands. We sample 100 random samples off a thousand
classes and we do the whole retrofitting and prediction exercise and we can compare that to the
performance of the original embedding space and basically see how oftentimes is it you know, much
better than the performance on the entire data. And so we can also construct a confidence interval
and we see that four H prediction and particular using a very small alpha.

</turn>


<turn speaker="Dirk Hovy" timestamp="25:41">

So that means relying a lot more on the homophily information on the age information that we have
rather than on the linguistic information gives us about up to two, two and a half F1 points. For
gender prediction, we see slightly smaller gains, they're still significant, but you need to play
around with the alpha parameter a little bit to find an optimal case. And one thing I should also
probably say is as your training size gets larger, typically the difference gets a little bit
smaller. So if you get more and more data, the two methods tend to perform more. Similarly

</turn>


<turn speaker="Waleed Ammar" timestamp="26:17">

So, the figures I'm seeing in the paper in figure two they're very compelling. And thank you for re-
running the experiments like a hundred times to be able to measure this. The competence intervals,
but you're saying if you drew the curve farther to include the entire dataset, the two curves get
closer then.

</turn>


<turn speaker="Dirk Hovy" timestamp="26:34">

So typically what we see is that the two curves for the embeddings and the retrofit embeddings do
converge. The more training instances you have or go towards convergence in one case for using
retrofitting with a very low alpha on age prediction, it does look as if the conversions happen a
lot faster. So that means even at the largest training size setting we have with 10,000 instances,
there is still a huge gap between the retrofit embeddings as input to the model and the regular
original Doc2vec embeddings and then also the bag of word's embeddings.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:10">

Great. That's really cool. Do you have any last comments about this work before we conclude.

</turn>


<turn speaker="Dirk Hovy" timestamp="27:14">

Well. So the two or three points I would like to make is echoing the points of the original
retrofitting paper. It's very easy to implement. It's very fast to run. The things I would like to
add is that it allows you to actually improve any classification tasks that uses embeddings by
separating the classes a little bit more. And the third thing is that we can actually bring outside
information to bear, which is something that in neural networks oftentimes is a little bit difficult
and graphical models we were able to use priors or you know, to partially define distributions,
forehand. In neural networks, we learn a lot of these things always from scratch. We take the data
and you learn everything from scratch, but oftentimes it's not necessary. Oftentimes you have prior
information we have outside information that can help us to structure the input space at least and
then make it easier for the model to find a good solution. And so retrofitting is one of these ways
in which we can actually make it easier for our networks or for our nonlinear models. Find a good
starting point and to find a good solution.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:22">

Yeah. I'm really excited to learn more about the results that you have for the other one, where was
the other paper was it also at EMNLP.

</turn>


<turn speaker="Dirk Hovy" timestamp="28:30">

The other paper is also accepted at EMNLP where we're actually trying to capture dialects. So in
this case, this is not a prediction task. What we're doing is we're actually looking at anonymous
chats from places all over the German speaking area in Europe and then learn embeddings for each of
these cities. And then if we cluster these and represent them on a map, we're looking at do we find
dialect regions or you know, is there, is there no such thing as a dialect online. What we see is
that there are very, very clear distinctions between different regions and what we see is that if we
modify the document embedding for the different cities that we found by using geographic
information. So by saying, okay, look, all of these cities are close together, so it's very likely
that there are dialects or the words used there, the language there is more similar to each other.
We actually get very, very good results and actually match sociolinguistic maps, dialect maps that
have been made by social linguists over the years. Oh yeah. And maybe I should say the name. So the
paper is with Christoph Purschke and it's called Capturing Regional Variation with Distributed Place
Representations and Geographic Retrofitting.

</turn>


<turn speaker="Waleed Ammar" timestamp="29:40">

Sounds really cool and exciting. Look forward to, I think. Thank you for joining us today.

</turn>


<turn speaker="Dirk Hovy" timestamp="29:45">

Thanks so much for having me and thanks for listening.

</turn>
