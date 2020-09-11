---
title: "Deep contextualized word representations, with Matthew Peters"
hosts: ["Waleed","Matt Gardner","Waleed Ammar"]
guests: ["Matthew Peters"]
number: "056"
tags: []
description: TODO
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed" timestamp="00:13">

Today our guest is Matt Peters. Matt is a research scientist at the Allen Institute for Artificial
Intelligence, AI2, where he explores the applications of deep neural networks to a varity of NLP
models. Prior to joining AI2, he was a director of data science at Seattle Circle and a postdoc
investigating cloud climate feedback. He has a PhD in applied math from the University of
Washington. Welcome to the podcast, Matt.

</turn>


<turn speaker="Matthew Peters" timestamp="00:37">

Thank you. It's a pleasure to be here.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:39">

So today we're talking about your paper accepted that NAACL and previously accepted at ICLR. And the
title of the paper is Deep contextualized word representations. Some people might treat the title
and think, okay, it's another paper describing a slightly different way of embedding word types.
Could explain why the model you're proposing here is fundamentally different.

</turn>


<turn speaker="Matthew Peters" timestamp="01:01">

Yeah. So the main motivation for this work was overcome some of the traditional, some of the, the
drawbacks of traditional word representations, in particular, the one that we directly address is
that traditional word vectors represent each word with a single vector. In many cases, this
assumption may not be the most suitable on in particular for words like the English word play for
instance, where the meaning might be highly dependent on the context. They might have different,
syntactic roles depending on how the word is used, whether it's a noun or a verb. It might have
different word senses depending on context, which it's used. In order to really try and form an
accurate representation for what this means we have to look at the entire context. And so what our
paper does as you might guess from the title is that instead of representing each word with a single
vector, we represent each word with a vector that is dependent on the entire context in which it's
used a contextualized word representation.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:06">

So the immediate reaction in someone, they may respond as, well, whenever I use an LSTM or any kind
of RNN on top of my word type representations, I'm getting this benefit already from the context, in
that sentence.

</turn>


<turn speaker="Matthew Peters" timestamp="02:19">

Yes, that's absolutely the case. And in fact we see this, that all, most all state-or-the-art NLP
models nowadays use some type of contextual representation on top of the pre-trained word type.
However, for many practical NLP problems of interest. We are relatively limited by the amount of
training data that we have. And what we do in our paper is that we learn these word representations
from a very large amounts of unlabeled data similar to traditional word representations and on that
we train a very large scale bidirectional language model that it gives us the word representations
and in by doing so we can benefit both from large amounts of unlabeled data in an addition to the
more task specific conceptual representations that you would expect when you put this into your
supervise system.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:13">

Cool. So this paper is the sequel of an earlier paper at ACL that you published addressing a similar
problem. Can you start by describing the model in that paper and then explain how this paper
generalizes it?

</turn>


<turn speaker="Matthew Peters" timestamp="03:24">

Sure. So our paper that we had at ACL, actually Waleed here was one of the coauthors on this paper,
was, we looked at two sequential tasks. We looked at primarily named entity recognition, but then
also syntactic chunking. What we did in this paper is, we had the intuition that we wanted to learn
these contextualized representations from totaling the data in here. We used a bi-directional
language model when the language model was completely separate in both forward and backward
directions and then we used just the top layer representation from the model. So these are as state-
of-the-art language models are these days they are tend to be deep LSTMs, so there's several
different layers of LSTMs and then the ACL paper we just used the top layer and then we use this as
a type of contextualed representation that we then added to our supervised NLP model.

</turn>


<turn speaker="Matthew Peters" timestamp="04:29">

The deep contextualized paper that we had generalizes this in a couple of ways. The most important
one is that we, found that by using all layers of the pre-trained bidirectional model that we got
performance improvements in the downstream tasks. We had some results in the paper that try and
explain why this is, but the high level intuition is that in these deep systems, the different
layers of a model learn different types of contextual information where the lower layers in the
model for instance, learns smaller level information, better things like for instance, can do part
of speech tagging better than a more upper layer. Whereas the upper layer can learn to do higher
level sort of LSTM tasks, things like word sense, they sense this ambiguation better and depending
on the downstream task that you actually care about, your task model may meet different types of
information.

</turn>


<turn speaker="Matthew Peters" timestamp="05:30">

It may, if you're say doing, I don't know, maybe a named entity recognition or something like this
that might be super dependent on the syntax, then it might rely more on a lower layer, but if we're
doing the higher level tasks, then maybe it might rely more on the higher level and so exposing all
of the internal layers of the bi-directional language model, the downstream model improves the
overall performance. We also did some other things. One of the main results that we got is that we
tried this approach on a wide variety of different NLP tasks and we should that across the board it
improves performance very significantly. Oh, we also had some differences in terms of how we train
the language model, but there are certain, I think that's secondary to the sort of the main idea
that we can use all of the different layers.

</turn>


<turn speaker="Matt Gardner" timestamp="06:19">

So just to make this clear, for people who haven't read this paper, I guess as Waleed said earlier,
it's pretty typical in NLP these days to have, say if your input to your model is a sentence or a
paragraph, you'll represent each word in this text with a word vector and then pass that through a
biLSTM to contextualize the word vector. So you have word representations that depend on other words
in the sentence. How is what you're doing different from just adding a few layers of biLSTM
underneath, right? You were saying, let's get a a base word representation. You use a character a
level convolutional neural network instead of just a single word vector, but then you pass that
through some biLSTMs and then that goes into the input of whatever model you had previously. You are
replacing what was like a glove vector with the output, these biLSTMs. So, so what's different from
in what you were doing from just adding a few more layers of LSTMs.

</turn>


<turn speaker="Matthew Peters" timestamp="07:14">

I think one of the key differences is that these layers are, pre-trained on lots of unlabeled data.
So the typical size of an NLP tasks, you might have maybe a few hundred thousand maybe for a large
dataset, like SNLI and SQuAD, maybe have a few million tokens, but a relatively small number and the
models that we are using the state-of-the-art models, you can't increase the performance by just
simply adding more layers or adding more parameters. The amount of information you have from this
provides signal just doesn't allow you to do that. In our system, we pre-trained bidirectional
language model on lots of unlabeled data. So in our case, we trained it on a corpus of close to a
billion tokens and you could try it on a larger data set if you wanted. And so as a result, you can
train a very large, very high capacity model. The LSTMs that we use in our case have a hidden state
of about 4,000 and as a result, we can learn these very rich, very general corpus representations
that you can't get from just using your supervised data.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:24">

So to contrast, what are the sizes of your hidden units in the model which actually does this
downstream task?

</turn>


<turn speaker="Matthew Peters" timestamp="08:33">

Yeah. Typical size for a hidden given downstream task might be a few hundred, two or 300 or
something like that. Depends on the task.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:42">

So can we go in the details of the bi-directional language model? And how do you train it? Get some
more details on this.

</turn>


<turn speaker="Matthew Peters" timestamp="08:49">

Sure. So I guess first let me explain what we mean by bidirectional language models since this an
idea that maybe unfamiliar to many of the listeners? So a traditional language model is what I'd
call four direction language model where the objective function that it's trained is to take some
partial context and then try and predict what the next word is going to be. We can train an
analogous backward direction language model that operates the exact same way except it, will, take
the subsequent context of a word and try and predict with the previous word is, it is the exact same
objective function and it's analogous to the backward direction of an LSTM and a bi-directional
LSTM.

</turn>


<turn speaker="Matthew Peters" timestamp="09:35">

And then in our paper we have both a four direction, backwards direction language model, and they're
trained jointly. The weights are not shared for the forward and backward direction for the LSTMs but
they are shared for the word representations, the context independent word representations, and then
also the softmax player. So the architecture that we use, we use a fully character-based input, we
don't have any explicit word embeddings and we have a large number of character n-gram filters about
2000 of these different widths. And then this produces a fully character-based input, and then we
send these through a couple of highway layers and then project this down to, in our case 512
dimensions. And then this context independent representation is then sent through two layers of
bidirectional LSTMs and then the train with the final softmax layer at the top that just used to
give us the probability of the next burner of the previous word. The entire thing is trained jointly
on a very large unlabeled data across. Actually, a GP is used for, to mark the time.,

</turn>


<turn speaker="Waleed Ammar" timestamp="10:54">

So there's a couple of things that I find surprising about this architecture, that you don't use any
a word level embeddings or parameters at the input even though we don't, we can't always as humans
guess the meaning of a word by looking at like the n-grams of characters that's contained in it.
Oftentimes we find words that are very similar orthographically similar but they have very different
meanings for maybe the word pair and fair or, I don't know there are many examples like this. Do you
have any insights on why it doesn't work it's not worth it adding oxford word embeddings?

</turn>


<turn speaker="Matthew Peters" timestamp="11:39">

Yeah, I think I made the explicit choice to not use word embeddings for a couple of reasons. First,
I wanted the model to be as general as possible. In particular, I wanted to be able to deal
seamlessly with unseen tokens that are in the training data or ones that are going to appear in the
training data and this is partly due to practical considerations. It's sort of, there's always this
question when you're using things like law vectors, there's always tokens in my training data that
aren't in a vocabulary, the law vocabulary and so what do I do in this case? You don't have to worry
about it. In this case, and I think also because we have these bi-directional LSTMs that the lower
layers, the character representation, the context independent representation captures mostly
morphology and it doesn't really capture much of a particular semantics. I think that those are
mainly captured in the LSTM layers because we have these, then it's not going to be necessary to,
you don't have to push all this information down into the context independent word representation.
It will put it in other parts of the model.

</turn>


<turn speaker="Matt Gardner" timestamp="12:48">

How big is your biggest n-gram filter?

</turn>


<turn speaker="Matthew Peters" timestamp="12:51">

We have up to seven characters I think.

</turn>


<turn speaker="Matt Gardner" timestamp="12:55">

So if you think of like what's the largest number of characters in a morpheme in English, it's
really not that big. So you can probably get most morphemes with these n-grams that you're talking
about and then compose them. And so like pair and fair, your example, you can capture those with the
filter except that they could each have their own filter for instance. And you'd, you'd still be
just fine if you, I don't know enough linguistics to know how big lengths or other languages get in
terms of morpheme size, but seven characters seems quite large for any morpheme in any language.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:27">

Do you see that the performance like I guess you chose seven because it gives you better results.

</turn>


<turn speaker="Matthew Peters" timestamp="13:33">

Actually to be honest, I didn't spend that very much. Training these models. It takes a long time,
probably want to GPU hours. And so I didn't have access to an entire data center of GPU. So I, I
pick something and it worked reasonably well enough. I think the language model that we trained its
a decent language model if I compare it to the ones that have previously been published with similar
architectures that are state-of-the-art, then the language model that I trained is not as good, the
perplexities is a little bit higher. I think in the end for the quality of the representations you
get and it doesn't matter very much, it's pretty much a second order effect.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:13">

So the other point that I wanted to ask about is sharing the parameters of the output layer of the
language model, I think by sharing the parameters of the softmax layers I think this means the
parameters is to multiply the final, the final hidden states from the forward and from the backward
directions and they seem to carry different kinds of information. So why would we want to combine
them and treat them as if they're coming from the same vector space?

</turn>


<turn speaker="Matthew Peters" timestamp="14:46">

I'm uncertain. Why would you say you think that they should carry different context information in
the forward and backward direction.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:52">

That's just the fact that forward language models summarizes or provides more information about the
context that happens before word K and the backward gives you that information from everything that
happens after word K? I guess including word K Well, no. excluding word K.

</turn>


<turn speaker="Matthew Peters" timestamp="15:09">

Yeah, I guess I haven't thought about this too much, so I can't really get an articulate answer to
this. My intuition is that the softmax word representations should be words that you could expect to
appear in a similar context. So the word representation for computer, might be similar to the word
representation for a laptop or something because it's something that is your training language model
you might say, well, I'm not really sure if the next word should be computer or laptop. but they are
probably interchangeable in many cases.

</turn>


<turn speaker="Matthew Peters" timestamp="15:49">

It seems to me as though this probably also be the case, whether I'm looking at this sub context or
the core context, I guess I don't think that I necessarily agree with your statement that they
should capture different information.

</turn>


<turn speaker="Matt Gardner" timestamp="16:00">

And if you look at typical ways of training word vectors, you look at contexts on both sides, right
you look at a window of like five words on either side of the word that you're looking at and you
try to predict the words that are in the context on either side of you,

</turn>


<turn speaker="Waleed Ammar" timestamp="16:14">

Right. And you also like ignore the order. But that has more to do with kind of like reducing the
complexity of the model, right, because I do remember a paper by Wang Ling where he tried actually
making different, having different parameters for like the words that have come after and come
before shows improvements of course. Yeah. The number of parameters increases. How do you like
practically how do you combine the forward and backward at the final layers?

</turn>


<turn speaker="Matthew Peters" timestamp="16:42">

Yeah. They're not combined in any way they're independent. So the for direction, the final hidden
state is also, I should say that, well, the hidden state for our language model is 4,000 dimensions.
There's also a projection layer inside the LSTM that projects down to 512 dimensions. The final
output dimension of the final for direction is 512 dimensions. And that's the same size as the
softmax embedding. So they're computed, well, the weights are sharing, but a loss function is
essentially the sum of the loss for the forward and the backward direction.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:20">

So basically you're forcing both directions to have a hidden states that belong to the same vector
space despite training them this way, right?

</turn>


<turn speaker="Matthew Peters" timestamp="17:28">

Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:29">

Right. So can we move forward to how you compute the vectors that represent this token, in this
downstream task, so you call this ELMo vectors in the paper and it's defined as a linear combination
of the intermediate layer representations in the bidirectional language model and you learn the
weights for the different layers by by fitting on the label data for downstream tasks. So would it
make sense to extend this so that the weights are dynamically computed depending on the context? My
understanding is that in your paper, the weights are gonna be the same regardless of where you are.
As long as you're going language direction, you think it's worthwhile to try also learning different
ways depending on the context.

</turn>


<turn speaker="Matthew Peters" timestamp="18:19">

Yeah, that is a good question. That is actually something that we tried and we couldn't get it to
work. Maybe I'll provide a little bit more of an answer for that. So in the paper that we have, the
way in which we combined, so we have these, you know, in our case, the model that we use has three
layers that we use in that final downstream task we have the context independent representation. And
then we have the two LSTM layers and these are all combined with just a simple learned scaler
weighting. So the downstream model, like the NER model, we introduce three parameters that are
learned as part of the downstream tasks that allowed the model to weight these different layers and
different questions. And we tried a number of different other weighting functions. One of the ones
that we did try would be something like a true attention function where these weights might be
dependent on the context. The word that we're trying, the word that in which we're preparing a
presentation for. We tried a couple of different variations of this and we couldn't get it to work.
I would say in general, whatever we did to this weighting function to make it more complicated than
a scaler just decreased performance or didn't improve it, so we, in the end, went with the simplest
one.

</turn>


<turn speaker="Matt Gardner" timestamp="19:45">

So you're adding a thousand dimensions to all of my tasks, specific LSTMs, right, so I'm taking
these word vectors, your ELMo vectors, give me a thousand dimensional vector times three I get three
of them, I'm going to do a weight on each them. But this means that it basically blows up the size
of my LSTMs and my task specific model. And it was already the case as you said, that we can't make
these bigger without decreasing performance because it's just over parameterizing things. So why is
it that the task specific model can handle this extra capacity?

</turn>


<turn speaker="Matthew Peters" timestamp="20:18">

Yeah, this is something that we could have looked more carefully at. In some cases it may be
possible to actually use data dimension in the task specific model. In our case, we wanted to make
the claim and it doesn't matter. You can just put these number vectors into your model and really
not doing any other hyper parameter tuning and just works. It just improves performance and, and
pretty much all the cases we tried that was, that was the case. The, we do have a fair amount of
dropout to the ELMo vectors in the task model. So we found that this helps another fitting. I don't
have a good answer for that. We wanted, one of the upshots of this is that it does increase the
number of parameters task LSTM needed.

</turn>


<turn speaker="Matt Gardner" timestamp="21:01">

So I guess I can think of a whole lot of other papers around this same time. Like a lot of people
were thinking of very similar things. We have the CoVe Vectors from the Salesforce folks. We have
the Unsupervised Sentiment Neuron from Open AI I believe that was, we have Skipthought Vectors. We
have Sentence Representation learning. From a lot of people looking at SNLI and other kinds of
things. Why do you think this was successful and more successful than these other approaches? Like
what's, what's different about what you're doing?

</turn>


<turn speaker="Matthew Peters" timestamp="21:32">

I think that there's probably a couple of answers. I think that it depends on the other prior works
that we're comparing to. I think in the case of a sentence representations the model was
fundamentally different we are not learning sentence representations we're learning word
representations or word in context representations and as a result we can use them for much more
wide variety of tasks that you couldn't use for particular if you just had a sentence
representation. I think the difference between the results that we had and the results from CoVe, I
think our, not on clearance or on this but on my intuition is that it's due to the objective
function that we use. The CoVe vectors are learn using machine translation system and in our case
we're using a bi-directional language modeling. And I think that the, these objective functions are
very different and they force the encoder in the machine translation system. And the bi-directional
language model to learn very different things. And we actually see this that the quality the
representations that we get are much better than the ones that you get from from CoVe. For instance,
if we, in the paper, we have some analysis towards the end of the paper where we look at just trying
to analyze what the types of intrinsic properties that you get from the language model versus CoVe
for instance.

</turn>


<turn speaker="Waleed" timestamp="23:02">

And if you look at just part of speech tagging accuracies are word sentence integration, which are
the two that we considered is the overall absolute performance you get from the bi-directional
language model approaches a significantly better then that of a machine translation approach.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:18">

So you experimented with quite number of tasks in this paper, would you like to give more details
about core results that you had?

</turn>


<turn speaker="Matthew Peters" timestamp="23:26">

Sure. So I would say that the key empirical results that we have in the paper is that we evaluated
this approach on six different very different NLP tasks. And we tried to choose a wide variety of
ones that were representative of the types of tasks that people were working on today. And so the
tasks that we considered were question answering. We use the SQuAD data set for that, textual
entailment. We use the SNLI dataset for this, semantic role labeling and co-reference resolution
both of these we used OntoNotes, named entitiy extraction recognition we used CoNLL 2003 dataset.
And then sentiment classification, which used that Stanford Sentiment Treebank. And in all cases we
took a strong baseline model. In some cases it was the previous state-of-the-art model and other
cases it was a model that was a strong baseline model but maybe a step behind the state-of-the-art
model. And we more or less just added ELMo to it without doing anything else. And in all cases it
significantly improved the overall performance. And in all cases it gave us a new state that the
result for all of these different tasks and this I think is a very strong and credible result
because it says that the representations you get from these ELMo vectors are very generally useful
across very broad scope of NLP tasks.

</turn>


<turn speaker="Matt Gardner" timestamp="24:52">

I really like these result. It's kind of hard to not really like this result. Your relative error
reduction is like in the 20s for some of these tasks it's kind of amazing when I think about this I
think about a conversation I had with Dan Roth like a year and a half ago and then we talked about
this but what we talked about this when Dan was on the podcast with us. It's how do you expect your
model to learn English from this auxiliary task, like from some end stream task objective, it's a
whole lot better if you can get a model that knows English in some sense and then just have to learn
the specifics of your task. And I think we're, this certainly isn't all the way there but it's
getting kind of close where we're trying to predict the next word, get a model of language of
English and then use that, use the feature representations that we learned from this just very
general, let's learn English task to do better at a downstream applications and this is a really
nice demonstration that this idea works so great job.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:53">

So there are many ways in which you can use the ELMo vectors that's you learn like by linearly
combining the different layers of the bi-directional language model and the downstream model, do you
have any recommendations for people who would like to use this on how to pick, where to plug them
in?

</turn>


<turn speaker="Matthew Peters" timestamp="26:11">

Yeah. So we give some some general rules of thumb in the paper and then also, I should also mention
that we have the pre-trained models available. We had code available on both PI torch integrated
into the Allen NLP tool kit that we're developing here, AI2. And then also we have TensorFlow code
available on GitHub. And also you can check, it could have repositories for all systems rules of
thumb. But as a general rule of thumb, what you can do is take the ELMo vectors and you'll learn a
linear combination of the different layers and apply some dropout. You probably want to add a fair
amount of drop off depending on the task. And then essentially included them in the model where
you're using, law vectors or word-to-vec vectors or other pre-trained vectors right now. And this
will almost certainly improve your task performance in some cases, depending on the size of the
dataset or the particular architecture. We also found that you can get some smaller additional gains
by including the representations at other layers of the model. And in particular you're task model
if it has a bi-directional LSTM or other types of contextual representation in the bow. Then you can
also include another ELMo layer at the output of your task RNN. And this also may improve
performance too and some times it doesn't always improve performance, depends on the task, and on
the architecture. We have some ablation results in that in the paper that showed this for a couple
of the tasks.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:49">

Alright. So I guess my last question, do you expect any improvements on top of what you've shown, if
you are able to in a multitask learning set up, train both the language model and like the model
where you integrated this, that simultaneously instead of pretraining the language and then using
it, while fixing its predators for the downstream task?

</turn>


<turn speaker="Matthew Peters" timestamp="28:16">

It's possible. I don't want to say conclusively whether that's the case or not because I think that
that's still very much an open question. I tried, although not very hard, but I did try a little bit
to try and fine tune the ELMo bi-directional weights as part of the task supervision and I couldn't
get it to work, but again, I didn't try very hard. And it's possible that there's you may be able to
get this to work if you try and do some type of joint training or multitask training or fine tuning
or something like this.

</turn>


<turn speaker="Matt Gardner" timestamp="28:52">

So what do you think is the most exciting next direction for this line of work? You don't need to
give away your secret next research project, but the scene. It feels like it opens up a whole lot of
avenues for new research. Like how do you push this idea forward? Like what do you, what do you
think comes after this?

</turn>


<turn speaker="Matthew Peters" timestamp="29:12">

I think that there is a couple of directions. I think one of the things I think that is really
interesting to me about this is that one of the other results we showed in the paper is that the
amount of training data that you need can decrease rather significantly. So we have some, yeah, we
have some results in the paper that show that if, for instance, you have a very small training data
set for that and you have ELMo, that you can get performance that is on par with the dataset that is
many times larger. And so I think it's very interesting to me in that for particular, small NLP data
sets or ones where you're otherwise limited by lack of annotated data that this could give you
further gains that we couldn't get ordinarily, maybe it might make neural models competitive or even
state-of-the-art in some cases.

</turn>


<turn speaker="Matt Gardner" timestamp="30:02">

All right, great. This was really interesting conversation. Thanks for coming on the podcast.

</turn>


<turn speaker="Matthew Peters" timestamp="30:06">

Thank you.

</turn>
