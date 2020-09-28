---
title: "Improving Hypernymy Detection with an Integrated Path-based and Distributional Method"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "024"
tags: []
description: "ACL 2016 outstanding paper, by Vered Shwartz, Yoav Goldberg and Ido Dagan. Waleed presents this paper, discussing hypernymy detection and the methods used in the paper. It's pretty similar to work in relation extraction and knowledge base completion, so we also talk a bit about connections to other methods we're familiar with. Encoding paths using an RNN like they do (and like Arvind Neelakantan did for KBC) improves recall substantially, at the cost of some precision, which makes intuitive sense. https://www.semanticscholar.org/paper/Improving-Hypernymy-Detection-with-an-Integrated-P-Shwartz-Goldberg/05d28e891fd70d123c46ceeb0cdfc0a2cb0d88db"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

So today's paper is titled Improving Hypernymy Detection with an Integrated Path-based and
Distributional Method they received the outstanding paper award at ACL16 written by Vered Shwartz
Yoav Goldberg and Ido Dagan at Bar-Ilan University. The paper focuses on identifying it's
relationships between pairs of terms, also known as hypernymy. So one way to solve this problem is
to look for sentences where the two terms appear and find patterns, which indicate the hypernymy
relation. So one example of this would be movies such as interstellar, blah, blah, blah. So if you
look at this pattern and other ones that the, these clearly indicate that there is a hypernymy
relation between these two terms another approach is to learn a function that matched the embeddings
of individual terms to to a hypernymy score between a pair of them. So since the two approaches seem
to be complimentary in principle, this paper combines them and shows large improvements and improved
results.

</turn>


<turn speaker="Matt Gardner" timestamp="01:23">

So when I think of hypernymy detection, the thing that immediately comes to mind are Hearst patterns
by Marti Hearst that I guess she wrote down a bunch of templates basically for X such as Y and a lot
of other things to just find these patterns in a large corpus and extract a whole bunch of hypernyms
is a relationships in this way. So it seems like they're, they're taking this and also combining it
with embeddings. Is that what's going on?

</turn>


<turn speaker="Waleed Ammar" timestamp="01:54">

Well, it's more general than this, right? So Marti really manually picked these patterns but many
follow up work on this direction on path-based methods for hypernymy detection tried to learn the
pattern so you get the dependency passes between a pair of terms in a sentence and try to reason
about whether this signals or identifies hypernymy relation.

</turn>


<turn speaker="Matt Gardner" timestamp="02:26">

So what's the use of having a big database of these hypernymys?

</turn>


<turn speaker="Waleed Ammar" timestamp="02:30">

So the motivation that was mentioned in the paper is that knowing something, information like Tom
cruise is an actor, which there is a hypernymy relation between Tom cruise and actor. This will help
you answer questions such as which actors are involved in Scientology. So in a sense having a
complete repository of hypernymy relations can help you answer some of these. And that was the
motivation. Of course, resources like WordNet and freebase and DBpedia do have many hypernymy
relations specified in them, but they are limited in coverage. And the role here is to complement
these resources.

</turn>


<turn speaker="Matt Gardner" timestamp="03:19">

I guess we could summarize that by saying that the use for hypernymy detection is the same as the
use for relation extraction because hypernymy detection is a subset of relation extraction.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:29">

Exactly. So exactly this, this paper focuses on one kind of relations which are of interest to the
authors to some applications. But there are many other works that try to solve a more general
problem relation extraction also using the same kind of methods that are used in this paper. So this
leads us to the model that was proposed in the paper. There are two kinds of information. we're
trying to capture the embeddings of the individual terms and the path between mentions of these two
terms in sentences. So the go find sentences where the or the pair of terms appear together and the
encode the path between them, the dependency path between these two terms using a recurring neural
network and then aggregate the states, the final state of the recurring neural network across all
the sentences to represent basically the entity pair or the term pair across all documents.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:41">

And then augment, so concatenate the embedding of the individual words with this pooling of the
sentence embeddings and pass this through one base layer and finally predict a score. Whether this
should be a hypernymy, there is a hypernym relation between this pair or not.

</turn>


<turn speaker="Matt Gardner" timestamp="05:06">

Interesting. So this model, at least the path component of it seems really similar to Arvind
Neelakantan's Compositional Vector Space Model for a Knowledge Base Completion. There, the paths
that he was encoding were not dependency tree paths, but paths in the knowledge graph, which
conceptually they're the same thing. It's the graph and you have paths in this graph and you encode
sequences of edge types in this graph using some LSTM.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:38">

I mean there are also more similar to many previous papers on relation extraction where they do
exactly this, but the main difference is that they are looking at most of them work at the sentence
level instead of the term level, so they're trying to identify within a particular sentence does
this sentence indicate this relationship between a pair of entities or not?

</turn>


<turn speaker="Matt Gardner" timestamp="06:03">

So, are you thinking of like Hoffman's Distance Supervision paper and all like Sebastian Riedel, all
of these design work, but all of those had a one-hot encoding of each path, right. There wasn't some
like compositional representation of the things in the path [inaudible] it wasn't quite one-hot.
Like you do some feature extraction over the path that dependency path between the two words.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:27">

There was also other works related, like followup work which did include the dependency path but as
sequence.

</turn>


<turn speaker="Matt Gardner" timestamp="06:38">

Interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:38">

And some of them also captured like an embedding for the trees because these are essentially trees.
And there was several papers that explore this to different lengths.

</turn>


<turn speaker="Matt Gardner" timestamp="06:51">

Do you know when those papers were published? I stopped following this particular line of work
around like 2012 or something.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:58">

I remember a paper in 2015 and another in 2016. So the 2016 one is probably, it was actually
published also in ACL 16. So in the same conference as this one.

</turn>


<turn speaker="Matt Gardner" timestamp="07:08">

Yeah, and Arvind's work on this compositional vector space stuff was also 2015, I believe. So yeah.
All of this was going on around the same time. I guess it makes sense cause this is, this is a
pretty intuitive thing to do. Once you have some sequence, some path between things in a graph, it
makes a whole lot of sense to try to encode, to get a network to do your feature extraction for you.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:29">

Right, and yeah, showing that aggregating, so the way the aggregate, the embeddings of multiple
sentences here or multiple paths here is just by taking an average of the of the final hidden states
and this seems to work well. So this finding I find useful I'm probably gonna make use of it in my
work.

</turn>


<turn speaker="Matt Gardner" timestamp="07:50">

Yeah. So we also recently talked about this roadless universal schema thing and that again is a
really similar idea and they did a more explicit comparison of what operations should you do where
this paper doesn't average pooling. Right. They tried maxpooling, they tried to relation specific
thing. I guess there it was a little bit different because they had several relations they were
trying to predict. And here, we're just trying to predict one, but you could imagine trying to be a
little bit smarter there and introducing some parameters into this pooling operation somehow. And
maybe you could do a little better, I don't know.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:25">

Right? Yeah, I remember in this paper the attention method didn't work much better than the other
one which only like take's the relation that is closest to the embedding.

</turn>


<turn speaker="Matt Gardner" timestamp="08:39">

Yeah, so there was some kind of max right. And this is just an average over all of the features that
you extract from each path. And so maybe if you parameterize this somehow we don't have a relation
vector that we're trying to get. But you can like essentially learn "A" is a vector, which is just a
set of parameters that you pass into this thing and maybe you could do a little better than just
taking an average. That's all right.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:06">

So moving to experiments, the constructing a dataset a larger one that is larger than the previous
datasets used for hypernymy for this task. And they did this by manually picking the relations that
indicate hypernymy in several lexical resources such as WordNet and DBpedia and then use the term
pairs labeled with these relations as positive examples and then sampled pairs that are labeled with
other relations in these resources as negative examples. And then you go find sentences in a text
corpus, which contained both terms whether it's a negative example or a positive example and only
included terms which have fewer than which have two or more matching sentences in the corpus, which
kind of biases the results in favor of this method but I think that's that's an okay thing to do as
a focused evaluation of this method.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:14">

And then they considered two ways to split the training versus evaluation sets. So one of them is
just a random split of the pairs and the other one makes a clean separation between all the lexical
items used in the training set and all the lexical items used in the test set. And there's a good
reason for this because sometimes if you have a lot of positive examples that say red is a color,
green is a color, you'll just learn that color tends to be the hypernym of a bunch of things. So
whenever you see a pair of things and the second one is color, you tend to choose the hypernymy
relation and oftentimes it will be correct.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:01">

So to avoid this problem, they made two different splits and the results show that this actually
makes a big difference. And in the results they compare there method to basically to two kinds of
baselines. One is an implementation of a previous paper that looks at the entire dependency path as
a monolithic thing and it has one feature that is associated with it and uses just a progression
model to make the prediction. And then there are two other variants of path-based methods. One of
them is their own model but excluding the embeddings of the individual terms. So the baseline the
pathways baseline, which uses individual features for the entire dependency path for each unique
dependency path used gets you about 55% F1 score.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:09">

And if you try to generate to learn how to generate these patterns using their method, you get a 10%
improvement. And F1 score and then the distribution methods where you ignore the path completely and
you only look at the embedding of the pair of words the best result you show or you concatenate the
embedding of the two terms you get a preference of 63%. F1. So that's a slightly worse, 2.5 F1
points less than their path-based implementation, but then when you combine the two, you get a
performance of 70% F1 score. And that's on the lexical split. All the numbers I mentioned using the
test set where all the entries, all the terms have not been seen in training at all.

</turn>


<turn speaker="Matt Gardner" timestamp="13:06">

So I think it's really interesting to look at the details of this results a little bit more. So
instead of just looking at F1, you can look at the contributors to F1 in precision and recall,
right? So the strict path-based method that has a one-hot encoding of each path and does logistic
regression, they call the snow, this is identical to the path-linking algorithm, I think at least
sounds very similar. This gets precision of a 0.76, whereas the precision of this neural net model
that generalizes over these path types and has the embedding gets a precision of 80.9. if you just
do the path based neural net, you get a precision of 69.1.

</turn>


<turn speaker="Matt Gardner" timestamp="13:58">

So what this means is that by going from this one-hot encoding of paths to an LSTM encoding of
paths, precision goes down. It's only by including the entity embedding as well that precision gets
a little bit higher than just this logistic regression one-hot symbolic baseline where you really
gain is in recall. So the recall of the baseline is 43.8, whereas the recall of the path-based
generalization, the neural net that encodes the paths gets 63.2, you get a huge boost in recall with
a small drop in precision. And that's where these things really help this makes total sense, right?
Because there are a lot of ways to express the same thing in text and you get very minor variations
in a dependency paths between two words, but the logistic regression model has no way to know that
these features are actually very similar.

</turn>


<turn speaker="Matt Gardner" timestamp="14:54">

And the whole point of all of these deep neural nets for NLP is that we can learn similarities
between all of these features so that we can generalize better to things that we haven't seen
before. And this, shows it, it's like right there in the table.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:09">

Right. I totally agree. I wonder if adding the full path as additional features may also help
improve the precision a little bit more.

</turn>


<turn speaker="Matt Gardner" timestamp="15:18">

Yeah. See if you can not, like get the boost in recall without losing as much precision.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:23">

Right.

</turn>


<turn speaker="Matt Gardner" timestamp="15:24">

And the drop isn't very much, it's like a 7%.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:27">

Yeah, that's kinda big.

</turn>


<turn speaker="Matt Gardner" timestamp="15:30">

Okay. Okay. Relative to the gain in recall, it's quite small, which is why F1 goes up.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:36">

Right. And then yeah, so the other thing I wanted to mention is when you randomly split the the
trained on test, you get 90% compared to a 70% with the lexical split so showing the importance, it
shows the importance of spiting the corpus in the way they did. Yeah. And the paper also has
extensive analysis for the results they presented in the different variations of the model. So it
was a good read. The methods are kind of are not used right now because many other papers have also
the same thing since then. But I think the analysis and the results are still relevant and good to
know.

</turn>


<turn speaker="Matt Gardner" timestamp="16:25">

Yeah. Thanks, Waleed for presenting this paper. Next time we'll talk about a paper titled: Neural
Semantic Parsing Over Multiple Knowledge Bases.

</turn>
