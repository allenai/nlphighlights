---
title: "FastQA: A Simple and Efficient Neural Architecture for Question Answering"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "003"
tags: []
description: TODO
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


<turn speaker="Matt Gardner" timestamp="00:12">

Okay, today's paper is Making Neural QA as Simple as Possible but not Simpler by Dirk Weissenborn,
Georg Wiese, Laura Seiffe at the Language Technology Lab at DFKI in Germany. And sorry for
butchering German names, but this paper, the takeaway point is that there have been a whole lot of
models studying this reading comprehension task on the SQuAD dataset, the Stanford Question
Answering Dataset recently. And all of the models are really complex. They do a lot of crazy things
to try to improve performance on this dataset. And these folks take a step back and say, what do we
actually need in order to answer these questions and can we make these models a lot simpler and
still get the same performance? And in order to motivate this a little bit, I'm going to start by
talking to you about the SQuAD dataset itself. So this dataset is a collection of paragraphs taken
from Wikipedia, which the authors of the dataset paper presented to people in Mechanical Turk
crowdworkers and had them ask questions where the answer was constraints to be a span of text within
the passage, within the paragraph.

</turn>


<turn speaker="Matt Gardner" timestamp="01:29">

And if you think of the incentives of people on Mechanical Turk, they want to do this task very
quickly so that they can get paid and move on to the next thing. And what ended up happening a lot
of the time was that they would literally copy and paste a sentence from the paragraph into the
question, change a few words and call it good. And this is really obvious if you actually look at a
lot of the data. So we recently had a small project here trying to use SQuAD as a question
generation dataset where you use a sequence-to-sequence model with copying to go from the passage to
the question instead of from the passage plus question to the answer span. And it was interesting
looking at the output of that model, how often it would do exactly this, it would copy literally
large passages of text, or large sequences of words from the passage itself and then just add a few
question words either at the beginning or at the end. And that's what these models are trained to
do. The really surprising thing to me was how often that actually exactly matched what the actual
question was too. So this is what happened at least in I think the majority of the cases for the
questions that we see in SQuAD.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:42">

So are you saying that we can substantially improve the size of our training data by generating
questions than we already have the answers to them,

</turn>


<turn speaker="Matt Gardner" timestamp="02:51">

That's a very interesting idea and indeed it's the subject of an ACL paper that we might cover some
time. So yes, you can do this and maybe it helps. SQuAD is already pretty large, so maybe you don't
really need too much more training data in order to do this. Okay. So what this means is that really
all you need to do for at least a lot, maybe a majority of the questions in this dataset is match,
just do a literal overlap between the words in the question and the words in the passage and then
find the part of that sentence that matches the question word. That's literally all you have to do.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:26">

And that was pretty much what BiDAF model, which you described in the previous podcast does. So
that's really what you need to do in order to get pretty good performance on this task.

</turn>


<turn speaker="Matt Gardner" timestamp="03:37">

Yeah. And I guess we saw that by looking at the output, like by looking at the interactive demo of
the model and so you can arrive at the same conclusion in a few different ways. So in the previous
podcast we decided that that was what was going on by looking at what the model actually did. You
can also just look at the data and see what the data looks like. And then it's not at all surprising
that that's what the model learned to do. And so the insight of this particular paper that we're
looking at today is that because this is what the data looks like, you can dramatically simplify
these models by encoding this word match into the model itself. So if you remember from last time,
bi-directional attention flow had this complicated matrix attention thing where they encoded the
question in the passage and then found a similarity between each word in the question and each word
in the passage, and then did some complex operations and then smashed it back into the passage
representation.

</turn>


<turn speaker="Matt Gardner" timestamp="04:32">

This paper, and BiDAF also had like several deep layers in lots of different parts of the model.
This paper pulls those out and replaces them with a single feature that is, is this question in the
passage and that's it. And that goes as input to the first LSTM right at the bottom, like
concatenated with the original word embeddings you get this additional feature. And if you do that,
you get almost all of the performance of BiDAF. So you still have this word and character, word
embedding concatenated with the character level CNN with some highway layers. And then basically
then you do a bidirectional LSTM and then you output the span begin and Span end and they show that
if you do this, you get basically very similar performance just with a single binary feature that
you get with BiDAF.

</turn>


<turn speaker="Matt Gardner" timestamp="05:27">

In addition, they add back in some of the other stuff that BiDAF did. So they add back in another
feature that at first read, I thought was pre-computed but actually is pretty similar to this matrix
of attentions thing. It's just a simpler way of computing a matrix attention and it's added in at
the beginning of the model instead of where the similarities computer just on the word embeddings
instead of on the encoded passage. And so it's a simpler way of getting the same effects though in
fairness, it's actually kind of about the same level of complexity of what BiDAF does and using
this, they get very similar performance of BiDAF, which I guess isn't really all that surprising
cause they're doing basically the same thing that BiDAF does. They're just pulling out some of the
deep layers and showing that you don't need it to be so deep. And I think that that's an interesting
point.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:13">

So the model described in this paper, also in the BiDAF paper we're really addressing some
characteristics of the SQuAD dataset which allowed them to perform exceptionally well or very well
on this task. But it's not clear to me that we're actually addressing the machine comprehension
problem. Do you think we're, how much we're losing or gaining by focusing on datasets like SQuAD?

</turn>


<turn speaker="Matt Gardner" timestamp="06:41">

I don't know. I think SQuAD was a really great contribution to the research field. It pushed people
to look at question answering more broadly on a really large scale that people hadn't done before. I
guess this reading comprehension wave started with some large scale close tasks, which are less less
natural style of questions where you just pull out a word and try to recover the word that you
pulled out. This at least gives a roughly human authored question and so you get more natural kinds
of language and questions that you can answer. I think it's only now as we examine this dataset a
little bit that we're discovering some problems. I think this is true of like any dataset that you
can build. Like it leads to some good research early on and then at some point gets saturated and
you realize there are some problems with it and you move on to the next dataset.

</turn>


<turn speaker="Matt Gardner" timestamp="07:33">

I think we might be getting close to that, especially as we're realizing how much overlap there is
in the question words in the passage, I think, I don't know, just going off the cuff here, but it
seems like you might get a better dataset by explicitly filtering out from SQuAD all of the things
where it's obvious there was a copy paste.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:54">

That's a good idea.

</turn>


<turn speaker="Matt Gardner" timestamp="07:54">

Because there are certainly questions in this very large dataset that are not just copy pasted and
if you can focus on those, that's probably, my intuition is that the gap that remains between human
performance and model performance is in those cases where there's not just this copy paste
phenomenon.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:10">

Yeah. We can also, when we develop a new model, we can also do this for multiple datasets which do
not share the same characteristics. So at least check the close style problems and question
answering problem like SQuAD, which I believe the BiDAF paper actually did.

</turn>


<turn speaker="Matt Gardner" timestamp="08:27">

Yeah. And there has also been recently a whole lot of other reading comprehension datasets released
which have a larger gap between human performance and model performance. And so at least there's
hope that we can continue making good and interesting progress on modeling this complex phenomenon.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:47">

Sounds good.

</turn>


<turn speaker="Matt Gardner" timestamp="08:49">

Okay. So what paper are we going to do next time?

</turn>


<turn speaker="Waleed Ammar" timestamp="08:51">

So next time we'll be inviting Chris Dyer to talk about his paper Recurrent Neural network Grammers
and we'll see how it goes.

</turn>


<turn speaker="Matt Gardner" timestamp="08:59">

Yeah, that sounds exciting.

</turn>
