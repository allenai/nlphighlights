---
title: "Entity linking with CNNs"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "007"
tags: []
description: "https://www.semanticscholar.org/paper/Capturing-Semantic-Similarity-for-Entity-Linking-w-Francis-Landau-Durrett/1c9aca60f7ac5edcceb73d612806704a7d662643"
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

So today's paper is Capturing Semantic Similarity for Entity Linking with Convolutional Neural
Networks. It's a paper published in ACL 2016 written by Matthew Francis-Landau, Greg Durrett, and
Dan Klein at Berkeley.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:27">

Following our discussion on entity linking in the previous episode. This paper also addresses this
task by using a convolutional neural network to encode each of the mentioned N-entity that we're
trying to score at different levels of granularity and populates a metrics of co-sign similarities,
which is then used as inputs for a logistic regression layer.

</turn>


<turn speaker="Matt Gardner" timestamp="00:51">

So you have in this task, instead of mentions, which are noun phrases that you see in text and
instead of entities in the knowledge base. And so what exactly is this doing? How is it encoding
things? And what's this similarity matrix that it's computing,

</turn>


<turn speaker="Waleed Ammar" timestamp="01:03">

Right. So let's take one mentioned at a time and consider each of the possible or the candidate
entities we are trying to evaluate. And the goal of this model is to give it a score or a
probability. And then the features that you use in a logistic regression model to compute this
probability is going to be induced using a convolutional neural network. In particular, they tried
to include each of the mention an entity into a fixed length embedding, which and, both of them will
live in the same space and they measure the cosine similarity and that would be our features. But
instead of only taking an encoding of the mentioned text, like the phrase "convolutional neural
network models" or, that's a terrible example.

</turn>


<turn speaker="Matt Gardner" timestamp="02:02">

Not for your application you're doing entity linking on academic papers so that indeed is a good
mention for you.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:07">

Right, but let's say "President Barack Obama", right, that's a reasonable mention, and there are
many entities that potentially mention this mention. So one thing you can do is just encode the text
of the mention in the title of the entity and see the computational size between these two. And they
do that but they also encode bigger contexts for dimension a different granularity? So just the few
words around the mentioned and also the entire document and two granularities for the entity. So
they encode just the title and also the description of the entity from the knowledge base and each
of these pairwise comparisons for each granularity from the mention and each granularity for the
entity is using cosine similarity. And then these are used as features for the logistic regression
model.

</turn>


<turn speaker="Matt Gardner" timestamp="03:04">

So this sounds pretty similar to a lot of entity linking papers that I've seen before where
essentially you're competing a similarity between mentions and entities using some kind of score
that sounds in the end pretty similar to what you just described. So what's novel to this particular
paper?

</turn>


<turn speaker="Waleed Ammar" timestamp="03:19">

I think the point of the paper is tring to get rid of handwritten features and use a convolutional
network instead. Which hasn't been done with much success in the past. And in this paper actually,
they don't show that it's sufficient. So they find one of the results or I think the main result in
the paper is that you actually need to, you still need to add the sparse features that people have
engineered in the past, in order to get a competitive performance.

</turn>


<turn speaker="Matt Gardner" timestamp="03:52">

Do you have some examples of what these sparse features are?

</turn>


<turn speaker="Waleed Ammar" timestamp="03:55">

An important sparse feature that has been used in the past and they use in this paper is the number
of times the mention has been used in a hyperlink to that Wikipedia entity. So this only works for
Wikipedia of course, but that's what most of the datasets use anyway. Another cool thing that they
do in this paper is that they introduce a latent variable to capture different sub sequences in the
mention and marginalize them before computing the probability for a given pair of entity and a
mention. So this is useful because sometimes the mentioned identification when you do the mention
extraction, we may include a word that is not very important or relevant to the mention or for the
linking at least. Or we may include some punctuation or an article and sometimes it's useful to
remove this. And this has been done before, by the same authors in a previous paper in 2014. So they
do the same thing here.

</turn>


<turn speaker="Matt Gardner" timestamp="05:06">

So essentially what you're saying is we have some noun phrase that we want to link to some entity,
but we may, whatever we use to do mention detection to decide what noun phrases should be linked
might have messed up. And so if we consider only, like we could look at all possible sub spans
within this noun phrase and compute the sum of the probabilities of the match with that sub span and
the entity that we're trying to find. Is that essentially what's going on here?

</turn>


<turn speaker="Waleed Ammar" timestamp="05:35">

Yeah, exactly, and you do this before you compute, that's how you compute the marginal probability
for a given entity mention pair.

</turn>


<turn speaker="Matt Gardner" timestamp="05:44">

Okay. So what was interesting about the results?

</turn>


<turn speaker="Waleed Ammar" timestamp="05:48">

So one thing that is an interesting result is that the paper shows that using different
granularities is actually important. So if you use only the smallest granularities just the entity
mentioned itself and the title or the entity, you get around 80% on one of the datasets. And if you
use the biggest context, the entire document from the mention and the entire document from the
entity, you get a performance of around 77% on the same dataset. But if you use all the different
granularities you get 84.8. So it's a much better than using either of them.

</turn>


<turn speaker="Matt Gardner" timestamp="06:31">

And so what this means by using different granularities, you run a CNN encoder on the mentioned text
itself and on the entity text itself.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:41">

That's true.

</turn>


<turn speaker="Matt Gardner" timestamp="06:42">

And then you in addition to that, run a CNN encoder on the entire document and on the entire entity
description is this what you're saying?

</turn>


<turn speaker="Waleed Ammar" timestamp="06:50">

Correct. And all of them are using the same parameters because we want them to be in the same space.

</turn>


<turn speaker="Matt Gardner" timestamp="06:54">

And then at the end we concatenate the vectors that we get out from both CNNs and use that as our
feature set for the final layer. Is that what's going on?

</turn>


<turn speaker="Waleed Ammar" timestamp="07:03">

We actually just use a cosine similarity scores.

</turn>


<turn speaker="Matt Gardner" timestamp="07:08">

And you so, okay, so that's essentially a feature vector of length one which is the cosine
similarity. And you still use both of those as features in your final model, right?

</turn>


<turn speaker="Waleed Ammar" timestamp="07:16">

So every pair of granularities so the entity mentioned, I'm sorry, the entity title and the mention
text, will give you one cosine similarity score and then the document level the context compared to
the entity title will give you a different cosine similarity score and each of them will be one of
the features used in the logistic regression layer.

</turn>


<turn speaker="Matt Gardner" timestamp="07:46">

Okay.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:47">

In addition to the sparse feature, so the manually defined features, which turned out to be
important just to quantify how important it is to add these parts features, we get a boost of 5%
score from 84.5 to 89.9 on one of the datasets and most datasets have a similar behavior. So it's
fairly important to still use the sparse features. This is different than previous work on different
tasks in NLP, which to the most part we're able to completely get rid of handwritten features.

</turn>


<turn speaker="Matt Gardner" timestamp="08:29">

I think it's actually pretty similar to work on with other knowledge bases. So knowledge base
completion. I spent most of my thesis thinking about knowledge base completion and there sparse
features are really pretty important. Cause if you think about it the facts that you see in a
knowledge base are of necessity sparse. Or full, like if you think about, think of this in terms of
rank of the underlying KB tensor, the tensor is going to have very high rank because if you look at
a relation like married to this is essentially a permutation matrix between entities in the
knowledge base, right? Because typically one person is married to one other person or at most a few
other people over the course of their life, right? And so because this information is very sparse
it's just not possible to capture it in some low dimensional low rank representation, just that's
linear algebra. And so in these situations, having access to a sparse knowledge source at prediction
time is incredibly helpful.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:33">

I think what you're saying is we don't have enough training data to learn this much information for
each specific entity. Is that right? Because it seems to me that also there is a huge variation in
linguistic in semantics and in syntax which tense vectors were able to learn, but maybe because we
have much more data there.

</turn>


<turn speaker="Matt Gardner" timestamp="09:58">

I think it's just a notion of how, how big is your representation? You, you cannot encode a matrix
of rank a hundred by a dot product of two vectors of rank five. It's just not possible. This is just
math. And so it's more a nature of how sparse is the information that you're trying to encode and
what is the size of the representation you're trying to use to encode it.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:28">

Why do you think this is different than the BiDAF problem? There you also have a pair, a question
and a context and there is a huge variability and the meaning is fairly sparse. As far as I can
tell.

</turn>


<turn speaker="Matt Gardner" timestamp="10:46">

Models like BiDAF that work on SQuAD are trying to do with some kind of course similarity matching
between the words that it sees in the question and words that it sees in a passage of text. And this
is pretty easy to do and very well suited to the low dimensional dense representations that we learn
in biLSTMs and word vectors and all of this. But in SQuAD. You don't have to do inference over
sparse facts and I don't know, something that's closer to like a memory network kind of
representation that lets you do multi-hop reasoning over some kind of encoding of facts might be
more suited to this. Memory networks have their own issues, but you just, you can't reason over you
can't encode sparse information inside the weights of the neural net it's just not going to happen.
If you want to be able to reason over these sparse facts, you need to have access to them at
runtime.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:39">

Yeah, I mean the sparse features, they use a case in this paper don't really exploit the fine
grained facts that are impossible to encode. I'm not sure if that's the reason the CNN the pure CNN
features are not sufficient.

</turn>


<turn speaker="Matt Gardner" timestamp="12:01">

Okay. That was interesting. So moving back to the paper, do you have any other high level takeaways
from what you read in this paper?

</turn>


<turn speaker="Waleed Ammar" timestamp="12:08">

Well, there was one point which was discussed in a previous episode that the choice of word vectors
is important, right. So they compared to different corpora for evaluate for computing for estimating
the word embeddings. And they fix the word embedding representation training of the model, it turns
out the embeddings learned from Wikipedia text even though the size of the corpus was much smaller
than the Google News Corpus, it was much better. It was maybe not much like 1% better. But that's a
result that we've seen before in other papers. One thing that I was a little bit disappointed about
is that the paper didn't compare to many previous results in entity linking. They do have two points
of comparison, they could have made many more because some of the datasets they used have been
extensively used in previous publications. So, for example, the paper we discussed last week, even
though the approach is fairly simple and yeah, they don't really train any models they use off the
shelf models to the most part. It performs fairly close to the best model presented in this paper on
one of the datasets which is comparable.

</turn>


<turn speaker="Matt Gardner" timestamp="13:40">

I guess in fairness to them this is a short paper and they were trying to make a pretty focused
point, I imagine. Do you think they establish the point that we're trying to make?

</turn>


<turn speaker="Waleed Ammar" timestamp="13:48">

Yeah, I mean this is one of the very few papers I could find that apply neural networks on the
entity linking problem. I imagine many other people have tried and failed. So the fact that they got
it to work with a competitive result is worth noting and the comparison they make, the detailed
comparison between different granularities is worth publishing.

</turn>


<turn speaker="Matt Gardner" timestamp="14:16">

Okay, great. Thanks Waleed for that discussion. Next time we'll move away from entity linking but to
a similar kind of problem with the paper called: Finding News Citations for Wikipedia.

</turn>
