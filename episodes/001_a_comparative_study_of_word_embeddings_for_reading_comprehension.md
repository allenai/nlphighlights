---
title: "A Comparative Study of Word Embeddings for Reading Comprehension"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: 001
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is, Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:12">

Okay. So today's paper is A Comparative Study of Word Embeddings for Reading Comprehension by Bhuwan
Dhingra, Hanxiao Liu, Ruslan Salakhutdinov, and William Cohen, these are folks at CMU. The two
sentence pitch here of this paper is that they're studying how the initialization conditions under
which you train a particular model can in some cases matter more than the structure of the model
itself. And so if you're not really careful about how you compare models, if you don't keep all of
the initialization consistence constant, you can arrive at incorrect conclusions about which model
is superior.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:52">

So I feel like this idea that we we should care a lot about how we initialize neural networks and
the fact that we should control for every change we're going to make in the neural network is
generally considered to be good practice for a long time. Why do you think this paper is
contributing to what we already know?

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:14">

I think the interesting point here is the size of the effects in word embeddings. So they have this
figure here that shows that accuracy can change by 4% absolute just by changing the word embeddings
that you use, the way that you initialize your word embeddings and that difference is larger than
the difference in the gain that you get by switching to a better model structure.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:41">

I see. So what, aspects of the word embeddings do they account for the imagery? Because I can think
of many things that you can study about word embeddings including their size, the way you train them
in the model itself or the training data.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:56">

Yeah, they in particular looked at a couple of things. One was which method do you use to, what
algorithm do you use to create the word embeddings using GloVe or word2Vec skip gram vectors. So the
kind of vector that you get and then how large the vectors are and what corpus you train them on.
They didn't do an exhaustive comparison of all of the options there, but they varied those different
things.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:20">

So which of these did they find to be important or maybe all of them are important?

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:24">

All of them are different. Definitely important. They did make a recommendation that you should just
use off the shelf GloVe vectors that are a hundred dimensional at least for these tasks. That seems
to be true. I'm, I don't know that they would stand by that claim, that that's a general thing you
should use across all of NLP. But it's interesting that they do have a good set of experiments that
show that across all of their variations on this task of reading comprehension these vectors do do
significantly better for whatever reason.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:58">

Right. I guess before someone releases a set of embeddings, they put on a lot of effort and tuning
them and making sure they do all the tricks in the book in order to make sure these are good
embeddings before sharing them. So maybe there's a reason for this.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:15">

Yeah, that's a good point there. There was one other interesting aspect of this paper. It wasn't
just about how you initialize word embeddings. They also looked at how you treat out of vocabulary
tokens at test time. So maybe what you would say the standard things to do in NLP, at least what
I've always thought everyone did is from your training data, you estimate a vocabulary. So you take
all of the tokens that you see some number of times at training time, and you say, I have enough
data test to make good parameters for these words and I will use them in what we'll call my
vocabulary and the rest of the words, I'll map to some token that I'll call OOV out of vocabulary
and I will just lump all of them together as if they were the same token.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:59">

And then at test time, when I see a word I haven't seen before, at least I've estimated some
parameters associated with rare words so I can do something reasonable there. What this paper does
is it says, actually because we're dealing with word embeddings, this might not be the best idea.
For instance, there might be a word that you didn't see very much at training time, but is in the
set of pre-trained vectors that you have, for instance, if your training data is small, maybe you
have several thousand or tens of thousands of training examples for some particular task. A lot of
these pre-trained vectors were trained on billions or trillions of tokens and so have much more data
test to make good vectors. And so if you use this OOV token representation at test time, you're
throwing away information that was in that vector, the pre-trained vector that you could have made
use of.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="04:49">

Even though the other word embeddings for the words in the training data have drifted away from the
original estimation. This still seems to be a useful signatories thing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:59">

Yeah, there's some, I guess that's a bit of a different issue. They didn't look at that
particularly, I don't think, the question to me is how much do the word embeddings actually drift?
And is it an important problem? I think you've looked at that yourself and some other tasks, but
this is so like for part of speech tagging or other things like maybe that matters more. This is
looking particularly at reading comprehension. And so there's an interesting aspects to this task
that makes how you handle these OOV tokens. Really important. And that is that a lot of these are
entities. So say for example, you saw "bovin, dhingra" in the question that you get and in the
passage that you're looking at, you probably are not going to have an embedding for those tokens
because they're rare words, at least in English corpora. And so if you treat this as OOV the reading
comprehension task is essentially a matching task where you're trying to find what parts of the
passage contain information about the question that you're asking. And if there are several parts
that are OOV in your passage and you're trying to match an OOV token in the question you don't have
a good way to distinguish between OOV tokens in the passage. Different OOV tokens.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:17">

Yeah, that makes sense. I guess if someone tries to define features that try to capture the
similarity like the edit distance between the words that are out of vocabulary, maybe that will out
date the need for modeling different words.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:36">

Yeah, that's a good point. And how other models handle this is do like a character level
convolutional neural net encoder. So you get an addition to some pre-trained word, word embedding to
represent tokens, you also do this character level CNN and concatenate that with the word embedding.
And I think that gets largely the same kind of information. What this works did, instead of using a
character level CNN, I'm pretty confident they did not use character level encoders for this. But
so, in the setting that you're not using a character level encoder to handle this, what you should
do, they say with good evidence and good reason is assigned random vectors, random unique vectors to
each token at test time that would have otherwise gotten the same OOV representation.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:22">

So that's removing the bias but it's not informing the prediction.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:27">

Well, it definitely can because imagine you have some LSTM encoder that's encoding the question and
comparing it to the encoding of the passage. You could imagine the LSTM hidden states taking the
word representation and copying it into the state. Right. And so if you have a random vector that
you've encoded in the question and the same random vector, like you've never seen this vector
before, but it's a random vector and it's the same in the question and the passage, then the LSTM
has some means of connecting the dots.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:58">

I see so it words are already identified.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:58">

Yeah. So it feels to me like this is more of an issue when you have matching kinds of problems and
I'm not sure you would get the kinds of gains that they show on other tasks that don't have this
matching problem like for named entity recognition or part of speech tagging.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="08:14">

So yeah, it would have been interesting if they had also analyze the character embedding and whether
a character embedding basically solves the problem.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:23">

Yeah, that's a good point. Yep. So those were the high level takeaways to me. I think this is a
really good example of the reason that you need a really controlled experiments in NLP especially in
deep learning because getting the initialization correct is hard. As everyone who's tried to train a
deep modal knows and changing the initialization condition can matter more than changing your model.
And so you can make erroneous conclusions if you're not really careful in how you set up your, and
this is a really important lesson that anyone doing research in NLP right now really needs to know.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:00">

Yeah. That sounds like a great, lesson to keep in mind as we move forward. All right. Thank you Matt
for presenting this paper. Next time we'll be talking about a paper titled: Bidirectional Attention
Flow for Machine Comprehension written by Minjoon Seo and other colleagues at the University of
Washington and Allen Institute for Artificial Intelligence. Thank you.

</Turn>
