---
title: "Tying Word Vectors and Word Classifiers: A Loss Framework for Language Modeling"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: 031
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


<Turn speaker="Waleed Ammar" timestamp="00:12">

Today's paper is titled Tying Word Vectors and Word Classifiers: A Loss Framework for Language
Modeling. It was published at ICLR 2017 by Hakan Inan, Khashayar Khosravi at Stanford and Richard
Socger at Salesforce. So the set up of this paper it's a paper about language modeling. Language
modeling is an important part of generation problems such as machine translation and summarization.
It's often formulated as a sequence tagging problem where the input is a sequence of words and the
output at each position is a probability distribution over the possible next words in the
vocabulary.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:54">

You said it's often formulated that way. How else can you formulate this problem? So classic
formulations of language modeling is just a probability, a conditional probability distribution.
You're trying to predict a word conditional on a few previous words. And one of the things that we
currently do, like a standard way to do this now is to use a sequence2sequence model to represent
this problem where the input at every position is a word and the corresponding at the same position,
your predicting the following word. So it's like more, it's a specific formulation of this more
general condition distribution.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:37">

Right. So it's not that this is some new formulation it's just a new way to view the standard
language modeling task, right? You instead of thinking about this in terms of probability
distribution of your next word, given some context, you can think about this as a sequence tagging
problem and it's actually the same task, right?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:57">

It is. Yeah. And it's like, I wouldn't say it's a new thing. So the paper is not proposing this
formulation but is building on it. So if we're using a neural network to do this task, the output
layer at each position, is going to be a dense layer with sofmax nonlinearity. So every dimension in
this output vector corresponds to a particular word that we might want to predict. And we can think
of the weights connected to that dimension in the output layer as an embedding of the word. So I
will be referring to these weights connected to a particular word at the output layer as the output
embedding to distinguish them from the embeddings that we use to represent the input words. So in
the standard formulation of this problem this output word embeddings are completely independent of
each other and also independent of the embeddings used as input to the neural network.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:55">

And the paper is basically proposing an improvement of over the standard formulation. So the first
thing the authors proposes to is to leverage the word similarity based on the word embeddings to
improve the loss function used to train the model. So in the traditional loss functions for training
these models that you're going to define a cross entropy loss function, it only cares about the
actual word seen in the training data. So if a softmax assigns a probability 1 to the correct or to
the observed word, then the loss is going to be zero and any probability mass that you're assigned
to another word increases the loss. It doesn't matter whether this other, word that you assign some
probability for is related or very close to the word that was observed.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:47">

So intuitively this is not all the mistakes that the model makes should be penalized similarly for
example, let's say the observed word sequence is "I saw a car." but the model predicts "I saw a
vehicle." This is a much better mistake then saying "I saw an elephant." To act on this intuition
the paper basically proposes an additional term to the loss function, which computes a KL-divergence
turn between the distribution predicted by the model and the target distribution in which the words
similar to the observed word will have non zero probability.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:26">

This is really interesting. I saw a talk recently by Xinlei Chen, who is a PhD student at Carnegie
Mellon university who worked on the NEIL project. Never ending image learner, and that he had some
work where he did something very similar for image classification. Yeah. That is you want to train
the model or not penalize the model as much if it predicts an image that is actually a truck. If it
labels it as a car, that's not as big a deal as, as you say in the example you gave as if you
labeled the truck as an elephant. Right. And so he did basically exactly the same thing. And I've
seen this in I think a few different places, but this is the first time I've ever seen this tried
with like actually predicting words. Typically, I've only seen this done with predicting classes,
but because in language modeling it is essentially a categorical distribution of our words, right?
You could think of the word as a class and so it's really not that much of a stretch to go to apply
the same ideas in this setting. That's interesting.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:25">

Yeah. I think at the same idea can be applied anywhere where we're trying to predict from a large
number of classes and this seems like a fine application. So this is basically the first part of the
paper and then the paper shows that if we only use this KL-divergence term the additional term and
under some additional constraints, the loss will be equivalent to tying the parameters of the input
and output word embeddings. So although the theoretical results rarely applies in practice, it's
suggest interesting hypothesis, which is that you should be tying the input and output word
embeddings to reduce the parameter space without reducing the expressiveness of the model. And
therefore you're going to improve the efficiency of training the language models.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:12">

When was this paper published?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:13">

It's an ICLR 2017 paper.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:16">

I feel like that particular idea tying input and output embeddings is a very old idea. Is this paper
really claiming that its new?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:23">

So the paper does quote several previous work that has similar ideas. So I'm going to quote the
paper here. "We have recently come across a concurrent preprint for Press and Wolf, 2016 where the
authors reuse the word embedding matrix in the output projection to improve language modeling.
However, their work is purely empirical, and they do not provide any theoretical justification for
their approach. Finally, we would like to note that idea of using the same representation for input
and output words has been explored in the past, and there exists language models which could be
interpreted as simple neural networks with shardinput and output embeddings, citing Bengio et al.,
2001 2001 and Mnih and Hinton, 2007. However, shared input and output representations were
implicitly built into these models, rather than proposed as a supplement to a baseline.
Consequently, possibility of improvement was not particularly pursued by sharing input and output
representations. End of quote.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:32">

Interesting. Okay. I know I've talked to lots of people about this idea just in conversations. I
guess I can't think of particular papers to point to with that have explored this because this isn't
my area.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:47">

Right. I mean yeah, I feel like it's it's a very natural thing to do. It's nice to have some
stereotypical justification for it and clean experimentation to show it's effect. I think that's the
value of this paper is bringing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:00">

Okay.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:03">

So let's look at the experimental results because that's basically, these are basically the two
ideas in the paper. So there is a figure two on table one report, the perplexity of four different
language models in various settings. The four models are a baseline model, which is a two layer LSTM
with variational dropout. The second model is a same baseline adding the augmented loss. The third
model is a baseline plus reusing sharing of the embeddings between the input and output words. And
finally the baseline plus both the augmented loss improvement and the sharing of embeddings. So both
contributions, the augmented loss and reused embeddings consistently give a decent improvement in
perplexity with a slightly better results when they are combined. So in larger networks you get most
of the improvement just by reusing or sharing the embeddings and therefore that's basically the
recommended set up because it's much easier to do the sharing then to implement the KL-divergent
loss function. And the paper claims a new state-of-the-art results on the PTB on the Penn Treebank
dataset by modifying the previous state-of-the-art model of Zilly et al. 2016, to share the input
and output embeddings in their model.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:27">

So this modification resulted in a 25% reduction in the number of parameters and 2.5 points
improvement in perplexity.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:35">

So was there anything that you particularly liked about this paper? Like would you use this in
practice?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:42">

Yeah. I mean it seems like a fairly reasonable thing to do. Especially if you don't have a ton of
data to learn from. Because being more efficient in learning is more relevant when you have a
limited amount of label data or data. In language more you don't need labeled data you just need
text. So that brings us to one of my concerns about this paper is that it only evaluated on a
relatively small corpora so the biggest corpus they used, I think it has 2 million words, which is
about a thousand times less than the most recent papers on language modeling basically the 1 billion
word corpus.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:34">

The other thing that I would improve about this paper is maybe I'd like to see more of an extrinsic
evaluation. So perplexity does not always correspond to an improvement in the actual tasks that we
care about. Almost always when we're using language modeling, we don't care about the perplexity, we
care about how this fits in the bigger problem we're trying to solve, so in machine translation. You
could measure a BLEU score on summarization. You could measure a ROUGE and people have done that
before. But in general, let's say it's a well written paper, it proposes a practical solution with a
reasonable justification. So yeah, I would use it.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:17">

Great. Thanks for presenting the paper.

</Turn>
