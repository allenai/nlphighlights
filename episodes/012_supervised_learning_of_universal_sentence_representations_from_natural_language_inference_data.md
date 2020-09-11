---
title: "Supervised Learning of Universal Sentence Representations from Natural Language Inference Data"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "012"
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


<Turn speaker="Matt Gardner" timestamp="00:11">

Today's paper is: Supervised Learning of Universal Sentence Representations from Natural Language
Inference Data. This is by Alexis Conneau, Douwe Kiela, Holger Schwenk, and Loic Barrault, and
Antoine Bordes at Facebook AI research. This paper falls into the line of research on transfer
learning or representation learning which essentially is like the main problem in natural language
processing. Statistical natural language processing is going from strings of text to feature
representations that we can then use in some kind of statistical learning model. And the key
question is how do we get those feature representations? Historically in NLP, we've hand engineered
a bunch of feature representations and use those as inputs to our models. These days we're thinking
a lot more about how can we get a neural network to do this feature representation learning for us.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:05">

And this paper is exploring this line of work, particularly on how do we represent sentences,
sequences of words as a single vector that we can use in some downstream tasks.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:18">

So there are several previous works that focus on learning representations for sentences such as the
SkipThought Vectors work. How does this paper different from previous work on this?

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:30">

So the SkipThought Vectors said, let's train a sentence encoder, something that takes us from
sequences of words to a vector and let's train it to predict the previous sentence and the next
sentence in some large corpus. So I get a whole bunch of data, like maybe just text I find from the
web and I find sentence triples where I have three sentences in order and I take an encoding of the
middle sentence and I use that encoding to predict the encodings of the previous sentence and the
next sentence, this is very similar to the SkipGram idea and the word 2Vec package that was I guess
one of the main aboriginal word vector pieces of work. And this, I guess that's where they get this
name from, SkipThought in analogy to this SkipGram where instead of taking a word and having it
predict words and its context both before and after, we're taking a sentence and having it predict
other sentences in its context. So you could think of this as a kind of unsupervised approach where
we don't need any labeling on the text that we find. We just need to find a whole bunch of texts and
we essentially get labels on our data to do this learning for free just by looking at the ordering
of sentences in the corpus.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:45">

And what this paper says is instead of using these unsupervised or weakly supervised learning
models, instead, let's learn sentence representations from some supervised signal that hopefully
will give us better transfer. So I guess the thought here is that people have put more effort into
labeling things in particular datasets and that those labels might encode richer information or
force a model to learn richer information than you have to learn just by predicting previous
sentence and next sentence. So this is an analogy to ImageNet in computer vision. ImageNet is a
collection of images that have labels associated with them. And the way that you do transfer in
computer vision is you train an image classification model to predict the label that you're given
for the image. And then you pull out the representations that this classification model learned and
you use them in some other tasks. So the thought by these authors is we should be able to do
something similar where from, for language we predict some supervised signal, pull up the
representations and use them somewhere else.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:57">

So the obvious downside to this approach is that you have smaller amounts of data to learn from if
you're only going to use label data. So how large is SNLI?

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:08">

SNLI is pretty big. It's got like 500,000 sentence pairs or so on that order of magnitude anyway,
which is pretty, pretty big. But in contrast, we have billions or even trillions of unsupervised
sentences. So yeah, it's many orders of magnitude different in the amount of data that you can use
for these things. So SNLI the Stanford Natural Language Inference dataset is the dataset that this
paper looks at. This dataset is a collection of sentence pairs, about 500,000 of them, as I said,
and the way this dataset was collected, they took an image captioning dataset, threw away the images
and had people on mechanical Turk create entailment pairs given the sentences from the image
captions. And the way they did this was they said, they showed the sentence to people on mechanical
Turk. Maybe the sentence was two people talking and they said, imagine that this is describing an
image, think of another caption that must also describe the same image.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:14">

So maybe two people moving their mouths. I don't know, moving is not a great example because this
isn't video. But anyway, you get the idea. Something else that describes two people talking and then
because of the way this was constructed, they use this as an entailment pair, which means because
they both describe things that must be true about a single image. One sentence must entail the other
sentence and then they similarly said please write down a sentence that must not be true of the
image. If this image is true of the caption and there you might get something like one person
talking to himself because the original caption said there were two people, this one is now
contradicted. And so you get a labeled pair that way.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:02">

And then they also had a way to elicit neutral or unrelated sentence pairs in a similar kind of way.
So one interesting thing to keep in mind some people think this dataset is too easy because, think
that the incentives of someone on mechanical Turk, they want to get through tasks as quickly as
possible so that they can get more money. And they get paid very, very little per instance that they
do. And so very frequently if you give them a string of texts and want them to produce another
string of related texts, they will copy and paste and do a slight modification. This clearly
happened for, I don't know how much of SNLI, but for a lot of it you get only like single word or
small phrase differences between the two sentences. And so even though this is a sentence entailment
dataset, a lot of the instances look much more like single word entailment instances.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:57">

And this is why models like the decomposable attention model that only look at word pair scores do
very, very well. So anyway, just a side note there on if you're creating a dataset with mechanical
Turk, you should think really carefully about what the incentives are for the people who are doing
your task and what they're going, what characteristics this will induce in the dataset that you're
creating.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="07:19">

For what it's worth the current results on the on this dataset according to the website on the
Stanford is 88.8% accuracy for the SNLI dataset that a 2017 paper by Zhiguo Wang and other people at
IBM.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:40">

Yeah. So maybe, it's nice in that it's a nice large dataset as every dataset it has some issues, but
it was a nice contribution. Okay. So that this is the dataset that this paper is looking at in order
to learn sentence representations. So they take an approach where for each sentence in this sentence
pair, we're going to encode it into a single vector. And then essentially learn some Feedforward
across the fire on top of these two vectors, maybe just a simple dot product in order to predict
entailments, contradicts or neutral. Okay.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:19">

Once you limit yourself to this general framework of models, there's still a large class of things
you can pick from. You could use some convolutional encoder, you could use an LSTM, you could use a
biLSTM, you can use biLSTMs with different kinds of operations to get single vectors. Like there's a
very wide class of models that still fit into this general framework. So they have some initial
experiments where they measure performance on the SNLI test set and on the devset of a bunch of
transfer tasks that they're trying to do, which I'll explain in a minute and they pick the model
that has the best performance across all of these. Turns out it's a biLSTM a bi-directional LSTM
with a max pooling operation across the vectors of all of the words in a sentence. And then...

</Turn>


<Turn speaker="Waleed Ammar" timestamp="09:05">

Sorry, how do you combine the sentence level representation for the pair of sentences after doing
sentence embedding?

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:16">

Yeah, what they do is kind of complicated. So they take the two vectors, you get one vector for
sentence, the premise sentence and one vector for the hypothesis sentence. They take the vectors,
they concatenate them and then they concatenate also their element wise product. And their absolute
element wise difference. So you now have a vector that's four times the length of each individual
sentence vector. And then you pass this concatenated vector into a, they say a three class
classifier consisting of multiple fully connected layers culminating in a softmax layer. So just a
Feedforward neural net. This particular section that I'm reading doesn't say how many layers they
do, but just some Feedforward net that takes as input, these four concatenated sentence vectors.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="10:02">

All right, and this featurization actually has been used in several previous papers on this dataset,
so that makes sense.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:09">

Yeah, I guess if you think of like the interactions that you can easily get out of these two
vectors, it's nice to be able to have their element wise product so you can get like a similarity
which is hard to get if you just concatenate them and pass them through a Feedforward neural net and
then also their absolute that the Ellen wise difference also is really helpful and really hard to
capture and just a Feedforward net. So, it's become kind of standard because it's actually useful if
you want to have some deep net that looks not just at like simple kinds of interactions but also
similarity kinds of interactions between these two vectors.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:47">

Okay. So after they've decided which method, which sentence encoder they should use, they then look
at a bunch of transfer learning tasks. And so the authors have set up a tool that allows easy
evaluation on 12 different transfer tasks, which seems like a really useful contribution just by
itself. So Manaal Faruqui who is my office made it CMU for a little bit set up a very similar kind
of tool called wordvectors.org. He was doing research on how do you compute general word
representations. And I thought this contribution of a simple website and script that would let you
evaluate word representations on a host of different tasks it was just really useful. I used it in
one of my papers. And this paper says let's do a very similar thing, but for sentence
representations the tool isn't public yet the paper is still under review. But they say they're
going to release this and it seems like it'd be really useful if you're studying these kinds of
sentence representations. I think that's a nice thing to do.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:54">

The tasks that they look at are different kinds of classification tasks on sentence pairs. Sorry on
individual sentences. So sentiment analysis, product reviews, subjectivity, objectivity, opinion
polarity also entailment and semantic relatedness. So very similar to the SNLI task where you have
sentence pairs and want to learn some classifier and they use the SICK dataset as well as I guess
just two different subsets of the SICK dataset. Also as Symantec textual similarity, which is pretty
similar, paraphrase detection and caption image retrieval. So there's a host of different tasks that
you can evaluate and they take these sentence pairs, sorry, these sentence representations that they
get from the supervised training on SNLI, the Stanford Natural Language Inference dataset, and they
evaluate the sentence representations on each of these different datasets.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:45">

So the transfer task specific specifically is let's learn a sentence encoding just on SNLI, take
that model on this new dataset, encode the sentence and then learn some simple classifier on top of
the representation that I got from the SNLI encoder. And they show that using the SNLI encoder
instead of SkipThought and a bunch of other baselines that you could think of trying to do, like
just a simple bag-of-words embedding from pre-trained word vectors and so on. Their SNLI trained
model does substantially better than, I guess a little bit better, maybe not substantially, looking
more carefully at this data. So they do a little bit better than SkipThought.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:32">

On all of the tasks. So it's pretty consistently a little bit better it seems like. One caveat here
is that they also compared to a purely supervised approach to on these datasets and almost all of
the time they don't actually beat the supervised baseline. So it's not totally clear to me when you
would want to use this because if the whole point was I want to learn good feature representations
that I can use in some other task. It sure seems like if I just learn a supervised model to do
feature representation learning for me on that task, I do better than trying to transfer this
feature representation. So while they do show that they do better than other means of doing this
unsupervised transfer that have been published so far, they don't really have a compelling argument
to me that I should actually use this in practice because they don't beat a supervised baseline and
I have the training data, so why not use it?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="14:26">

Right. So even though you're using unsupervised representations in the proposed method, you still
need the labeled data in order to learn how to use these features to make a prediction for this
particular task. And if you're using the labeled data anyway, then it's a strange I wonder if they
tried to combine the representations learned from SkipThought or other ways of doing completely
unsupervised learning for these features and in addition to the supervised learning.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:02">

Yeah. It's an interesting open question, how you can take representations learned in some
unsupervised fashion and modify them in or incorporate them into some downstream model.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:14">

No, I mean, it just augment like concatenate the vectors that represent every sentence from the
unsupervised from SkipThought and from the proposed method and use both of them as features.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:26">

Oh, that's even simpler. Okay. yeah, you can try that. You'd have to add some more regularization I
guess to your model because you're adding, like you're doubling the size of your feature space.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:37">

Sure.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:37">

But yeah, you could try it, they didn't. So yeah. One other interesting thing that I'll note about
this before concluding is that their notion of feature representation is that I get a single vector
for each sentence. To me, this feels too restrictive like if you think of this whole sequence to
sequence with attention line of work that that came about a few years ago and machine translation,
the motivation there was, if I have some encoder decoder kind of model for machine translation,
there's a really big bottleneck in this single vector that I'm encoding the sentence in. And the way
that they got around this bottleneck was by instead of having a single vector representing the
sentence, they just used the hidden, the final hidden state of their encoder and then computed an
attention over the whole sentence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:29">

So you could essentially scale the model capacity with the length of the sentence instead of trying
to fit arbitrary length sentences into single vectors. And so it seems to me like that's a pretty
key idea. Like most models that you see nowadays have this kind of attention because single vectors
are too limiting. So I wonder at this whole general approach do we really want to learn single
vectors for sentences at all? Like why should we do this? And is this a good way of getting feature
representations for downstream tasks?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:03">

Well, you can still do this with what they are doing right, because for example, the model that they
picked was a bi-directional RNN where or biLSTM where you can actually do an attention, a soft
attention over the words that the word representations that you learned from SNLI I think the
premise is that you wouldn't need to do this because the like what you, the model that you would
need in addition to the learned representation is going to be a simple thing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:33">

Yeah. I guess that's asking your pre-trained feature representations to do a whole lot because they
don't know very much about what you're going to use them for. And so you'd have to, I guess have a
whole lot of data and a really big final vector if you, if you're hoping that it encode everything
that you could possibly want in a downstream task.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:52">

Right. I think another question is do we want to use the feature representations or the sentence
including models as is or we can also improve, tune their parameters towards the task that we're
trying to address. Because that seems to be an obvious when, I'm not sure if they actually did this
here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:14">

Yeah. And I totally agree. I think this is a really interesting and hot area of research right now.
Like how do we get good pre-trained feature representations that we can incorporate into downstream
models? Like, and what's the best way to do this? I don't think we don't have, we don't have good
answers for this yet.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="18:30">

So in word vectors there seems to be consensus that it's better to tune the features the word level
embeddings towards the task that you care about if you have a reasonable amount of labeled data.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:43">

Actually, I'm not sure that's true on SQuAD for instance the best performing models, fix word
vectors to GloVe, and then they learn character embeddings and a character level CNN to concatenate
with the word vector. So I dunno it for some tasks, like parsing. Yeah, maybe that's true, but I
don't think that's true across the board for NLP.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:04">

But does it hurt to tune the parameters?

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:06">

It increases the parameter space of your model by a factor of like eight. And so you could imagine
that these lead to overfitting pretty easily.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:16">

Right. And in terms of the like the speed level optimization.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:20">

Yup. Okay. I think that's all that we have for this paper.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:24">

Thank you for presenting this paper. Matt. Next time we're going to talk about a paper titled:
Question Answering from Unstructured Text by Retrieval and Comprehension by Yusuke Watanabe, Bhuwan
Dhingra, and Ruslan Salakhutdinov.

</Turn>
