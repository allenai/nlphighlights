---
title: "Sequence-to-Sequence Learning as Beam-Search Optimization, with Sam Wiseman"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Sam Wiseman"]
number: "052"
tags: []
description: "EMNLP 2016 paper by Sam Wiseman and Sasha Rush. In this episode we talk with Sam about a paper from a couple of years ago on bringing back some ideas from structured prediction into neural seq2seq models. We talk about the classic problems in structured prediction of exposure bias, label bias, and locally normalized models, how people used to solve these problems, and how we can apply those solutions to modern neural seq2seq architectures using a technique that Sam and Sasha call Beam Search Optimization. (Note: while we said in the episode that BSO with beam size of 2 is equivalent to a token-level hinge loss, that's not quite accurate; it's close, but there are some subtle differences.) https://www.semanticscholar.org/paper/Sequence-to-Sequence-Learning-as-Beam-Search-Optim-Wiseman-Rush/28703eef8fe505e8bd592ced3ce52a597097b031"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F414311523&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:13">

All right. Today our guest is Sam Weissman, who is a final year PhD student in computer science at
Harvard advised by Stuart Shieber and Sasha Rush. And today we're going to be talking about a paper
he published at EMNLP 2016 titled Sequence-to-Sequence Learning as Beam-Search Optimization. Sam,
it's great to have you with us.

</turn>


<turn speaker="Sam Wiseman" timestamp="00:29">

Yeah, thanks for having me.

</turn>


<turn speaker="Matt Gardner" timestamp="00:31">

This is a little bit of an older paper, but I've been doing a lot of thinking about sequence to
sequence models these days. And so I was curious to talk to you about this work because it's pretty
interesting. So can you tell us what the setting is for what this paper is talking about?

</turn>


<turn speaker="Sam Wiseman" timestamp="00:44">

Yeah. So I guess this paper tackles the standard, or I guess maybe what was the standard seq2seqset
up and 2016 and so I guess the way that typically worked was you would have some source information
you wanted to condition on, maybe like a sentence in French that you wanted to translate into
English. And the way you would translate that in English is you would encode your source French
sentence and then sort of translate word by word into English. And in particular, I guess the way
these models were trained was, you would train the seq2seq model to maximize probability of each
word in the target sequence, sort of conditioned on the source French sentence and all the previous
gold are true words that proceeded the current token. And so this is sort of the standard seq2seq
set up and I guess there are some perceived issues with this, which I can I guess talk about.

</turn>


<turn speaker="Matt Gardner" timestamp="01:38">

Yeah. So, this is maximizing the likelihood of your data, right? Which is like the very standard
thing to do in machine learning, obvious thing to do first. But as you say, there are some issues
with it when you have sequences that you're outputting. So what are some of those issues?

</turn>


<turn speaker="Sam Wiseman" timestamp="01:53">

The thing to keep in mind is, you know, at test time, well let's see. So training time, you know,
you're training this like a conditional language model. You know all the previous tokens. At test
time. you can't do this though because you have to produce an entire sequence, right? You have to
produce an entire translation. So it's sort of structured prediction. And so I guess the first
problem that people have noted, and this is sometimes called exposure bias, is that if you're always
training by conditioning on the true or gold history of tokens, then that's very different than test
time. And in particular the model isn't exposed to any bad predictions it might make. So training
time always sort of gets the gold, true distribution a test time gets this weird model distribution
and so there's a mismatch. So that is sort of exposure bias.

</turn>


<turn speaker="Sam Wiseman" timestamp="02:37">

I guess another training issue is that the negative log likelihood style loss that you train with is
sort of token level. Whereas at test time, people typically assume you want something that's more
sequence level. And certainly at evaluation time, for machine translation, we use BLEU which you
know, doesn't decompose over into individual tokens. So there was the sense that we weren't training
with the kind of sequence level losses that we might want to. And then I guess the last issue is
more a model issue than a training issue and that's that seq2seq models are typically locally
normalized. So the probability of a token at a time step is normalized for that time step. And that
can lead to label bias issues.

</turn>


<turn speaker="Matt Gardner" timestamp="03:18">

Can we explore this exposure bias a little bit? So just to be super clear, the only reason this
matters is because you're using previous outputs as part of your model for determining the next
step, is that right?

</turn>


<turn speaker="Sam Wiseman" timestamp="03:31">

Yes, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="03:31">

So like if I had an HMM or was just doing part of speech tagging and my model didn't for some reason
incorporate the previous output then the reason is exposure bias, because I have a conditional
probability distribution that's conditioned on something at test time that I've never seen before.
And so my model is just in a space that it's never explored.

</turn>


<turn speaker="Sam Wiseman" timestamp="03:51">

Yeah, that's exactly right. And I mean, and also the point is, you know, for HMM is you can sort of
do exact inference, so there's never ever going to be a problem of finding the ARG max labeling or
whatever. And so you've sort of don't have this issue at all. But yes, if you do have a prediction,
the strategy where future predictions depend on previous ones, but you haven't seen anything like
that during training, then yeah, you're going to have this mismatch.

</turn>


<turn speaker="Matt Gardner" timestamp="04:15">

And what about label bias? What exactly is that? How does that work?

</turn>


<turn speaker="Sam Wiseman" timestamp="04:19">

Right. So label bias I think happens when these substructure or intermediate predictions are locally
normalized, rather than having a score for the entire structure being normalized over all the
structures you are considering. And I guess intuitively what happens is, because you're locally
normalizing each decision, you don't get to penalize a really bad decision as much as you might want
to. So if you predict a really, really bad word, you might want to give that entire sequence just
zero or like negative infinity score or something like that. But you can't do that if each say word
prediction is locally normalized. Because once you make your super bad word prediction all the words
after that, you know their probability sums to one. And so you can't really penalize the entire
sequence as much as you want to. And so that can lead to a few issues. I think maybe the most
relevant one is it can be hard to recover from bad predictions because you don't get to penalize the
bad prediction you made as much as you want to.

</turn>


<turn speaker="Matt Gardner" timestamp="05:16">

Cool. So what are previous ways to solve these kinds of problems?

</turn>


<turn speaker="Sam Wiseman" timestamp="05:20">

Right. So I mean it's like a CRF, which was sort of globally normalized models are sort of the
famous way of addressing label bias when it comes to exposure bias. It was all sorts of work like
SEARN or DAgger where you sort of incorporate a model predictions into your training regime and LaSO
which is similar but different is also a way because LaSO, which is sort of what this work I guess
I'm talking about is based on involves training, sorry, searching during train time and because the
model sort of the loss is defined with respect to the output of search, you're considering what the
model thinks as you train as opposed to always conditioning on the gold history

</turn>


<turn speaker="Matt Gardner" timestamp="06:06">

And LaSO for people who aren't familiar with it is learning as Search Optimization. Some work by Hal
Daume III back well over 13 years ago now.

</turn>


<turn speaker="Sam Wiseman" timestamp="06:14">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="06:15">

Cool. So then what's your solution to this problem? You say this is, you introduced something called
beam-search optimization. What is that?

</turn>


<turn speaker="Sam Wiseman" timestamp="06:24">

Yeah. So I think it's fine to think of beam-search optimization as a way of slightly modifying LaSO
learning as Search Optimization or seq2seq type models, at a high level. The way this works is we
define a loss in terms of a beam-search procedure that we run at training time, and in particular
what this loss does is it penalizes the case where the gold prefix of length T let's say as you're
searching, isn't scored higher by a margin than the last prefix of length T on the beam. So that's
sort of your loss. And what's interesting here is so now we also get this sort of prefix level loss.
And so we can score, we can sort of scale the losses by things that look at prefixes rather than by
tokens. And so that's a way of getting sequence of losses in there. And then the last ingredient is
we sort of slightly modify the scores of these prefixes so that they're not locally normalized. And
so in theory, this should address all the things I mentioned. So you don't have exposure bias
because you're searching during training time. You can get prefix level losses because that's what
this loss looks at and you don't have label bias because we don't have these locally normalized
scores. Instead, they're sort of globally normalized.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:39">

So a question, this loss structure makes sure that the correct sequence is in the beam, but it
doesn't make sure that it's at the top of the beam. So do you need to augment this loss with the
traditional loss that you can also rank the correct one higher than the other ones in the beam?

</turn>


<turn speaker="Sam Wiseman" timestamp="08:00">

Right? So it doesn't make sure that the gold prefix is the highest except at the end. So at the end,
we sort of modify, excuse me, and make sure that correct full length prefix is at the top. So the
loss sort of changes for the last time step, but certainly other losses are kind of necessary to get
this to work. And in particular, we have to do pre-training to get any of this to work. And so we
pre-trained with just the standard token level negative log likelihood.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:28">

Could you elaborate a little more on what happens in the last step in order to make sure that the
correct one is ranked higher or you penalize the model when it doesn't do that?

</turn>


<turn speaker="Sam Wiseman" timestamp="08:36">

Right? Yeah. So at the last step you have a similar margin based loss, except at this time at the
last timestamp you're saying you want the gold prefix to be scored higher than you know, the next
highest thing I mean you want it to be the first thing on the beam. Whereas at all the time stamps
proceeding the final one, you just want to make sure that the prefix of that length is, you know,
higher by margin and the final thing on the beam. So you're essentially just changing the index that
you're looking at for a violation. That makes sense.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:05">

Yup.

</turn>


<turn speaker="Matt Gardner" timestamp="09:06">

So let's say I had a beam size of one. So here I'm penalizing the model anytime that the correct
prediction is not my top prediction on the beam.

</turn>


<turn speaker="Sam Wiseman" timestamp="09:17">

So I think that I would consider that a beam size of two. So, if you want the gold prefix to be
number one, you want it to be scored higher than the second prefix on the beam. So yes, I think, I
think the lowest you kind of go is two.

</turn>


<turn speaker="Matt Gardner" timestamp="09:31">

I see.

</turn>


<turn speaker="Sam Wiseman" timestamp="09:31">

And that's why in the paper everything, bottoms out at two.

</turn>


<turn speaker="Matt Gardner" timestamp="09:34">

Okay, I missed that particular notation choice as I was reading the paper, that's good to know. So a
beam size of two then, is this really different from having a hinge loss at every time step on the
gold sequence.

</turn>


<turn speaker="Sam Wiseman" timestamp="09:48">

It's only different in that. Right. Okay. So I guess the right so if you had a hinge loss where you
didn't violate. Yeah, I think that's right. I think that is the same.

</turn>


<turn speaker="Matt Gardner" timestamp="09:58">

Okay. Interesting. That's good to know.

</turn>


<turn speaker="Sam Wiseman" timestamp="10:01">

It's actually worth noting, I don't know if this is interesting to anyone, but if you try to train a
regular seq2seq model with just a hinge loss, so like you replace your negative log likelihood type
loss with just a multi-class hinge, actually you also need to pre-trained for and it's really hard
to train that from scratch. So I think, yeah, so pre-training is actually quite crucial and I think
a lot of these other models that are doing things like this also typically need to pre-train.

</turn>


<turn speaker="Matt Gardner" timestamp="10:27">

Why do you think that is? Any, any intuitions for why we need this pre-training? Yeah, well, I mean
I think if you think about sort of the gradients of these losses, when you have kind of these true
multi-class hinge ones, the gradients are very sparse. You only get a signal for, you know, the gold
thing and for the violating thing. Whereas you know, if you do a standard negative log likelihood
thing, you get some information for each word, right? So you're not only are you pushing up the true
gold thing, you're pushing down everything else. And that's like notably not true for these margin
losses.

</turn>


<turn speaker="Sam Wiseman" timestamp="10:57">

And so I think to train these from scratch, it's just very hard. There's like a ton of words in your
vocabulary. You don't learn that much in each time step.

</turn>


<turn speaker="Matt Gardner" timestamp="11:03">

Yeah, that's a really good point. There was one point in your paper where you say you contrast
between the LaSO updates and early updates where basically as I understand the difference, LaSO says
if I have a search violation, which means that I've got a particular time stamp, I predict
something, sorry, my gold label falls off the beam, this set of things that I'm currently
considering. Then I add something to my loss and then I reset the search to the gold sequence and
keep going from there. Whereas early updates says just stop and go to the next training example. So
why is the first one better than the second one?

</turn>


<turn speaker="Sam Wiseman" timestamp="11:44">

So I think two reasons. Well okay one is just empirical. I think I couldn't get early update to
train very well. I'm not actually sure why. The second answer is, I think you mentioned this earlier
that it's faster, right? So once you encode the source, that's sort of fixed and then you kind of
can keep searching on the target side. Whereas if you did early update, you'd have to sort of re
encode the source for each new thing. So it should be faster, but it also seems to just kind of work
in empirically better.

</turn>


<turn speaker="Matt Gardner" timestamp="12:12">

I expected the computational efficiency, I'm a little bit surprised by the statistical efficiency
also.

</turn>


<turn speaker="Sam Wiseman" timestamp="12:18">

Yeah, I mean, so, you know, I tried with pre-training and all these things to get it to work and I
couldn't, but I don't have a strong, I'm not actually sure why.

</turn>


<turn speaker="Matt Gardner" timestamp="12:25">

Interesting. My last question on this method, you give some discussion in the paper about the
complexity of competing gradients. Maybe I'm spoiled, but these days it feels like we never have to
think about that anymore. But you go to a bit of length to describe why the way that you do this as
computationally efficient. Is that just because it was a few years ago and, and things like PyTorch
weren't around or does this still matter if you write this in PyTorch?

</turn>


<turn speaker="Sam Wiseman" timestamp="12:50">

The main reason I was thinking about it was because PyTorch was not yet around. I think it is true
that you can basically just implement the forward search in PyTorch and it will be correct. I think
people have done this. I think one thing though that we mentioned in the paper is that you can get
your backward pass to sort of be independent of K that is independent of the size of the beam. And
so my guess is if you implemented the standard search, the sort of standard forward search
procedure, it wouldn't do that because you're probably like matching all your beam search or
whatever. And I don't think it knows that only two sub sequences at each time are participating in
the loss. So I think it would be a little bit slower, but it's probably, honestly it's probably fine
and I think people are doing that.

</turn>


<turn speaker="Matt Gardner" timestamp="13:36">

I said at the beginning I'm working on some structured prediction problems and I've implemented a
step-by-step decoder that you can train with different algorithms including this one if you want. If
you have a batch and you just select a few rows from that batch. My torch will be efficient enough
in the backward pass that it will actually, I'm actually not sure that's right. So I was going to
say PyTorch should be efficient enough in the backward pass to only include the things in the
gradient that mattered. Except actually it probably just keeps the index and still has the whole
array. And so maybe I'm wrong. And so my implementation of PyTorch gets batched would still be
computationally efficient. That's interesting. But probably a little off topic.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:18">

As far as competing, the gradient is concern isn't it? The case that we, regardless of the size of K
only after the search has been finished and we know what the K does, that's we're interested in, we
take one of them and that one is the only one that contributes to the loss function.

</turn>


<turn speaker="Sam Wiseman" timestamp="14:36">

Well, so there isn't just one because you I guess cause you reset the beam but there are only sort
of ever two for any subsequence. So one thing you could do is you could sort of just do beam search
the entire time until you get some bi-liner sequence and then your update could just be, you know,
score the gold thing high and score the thing I found with beam search low and that sort of neither
LaSO nor is it early-update. It's sort of just like approximate the argmax with beam search. And I
think the reason people don't like to do that is because you sort of feel like, well, if I'm going
to be searching I might as well kind of learn to search better. And so let me get updates each time
I make a mistake rather than just straight up approximately Argmax with the beam search I'm not sort
of correcting as I go. But yeah, if you did that then I think that would be, that would also be
relatively fast. Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:23">

And how about the loss, that Delta mistake-specific cost-function. Could you elaborate a little bit
on how to design this for the various problems?

</turn>


<turn speaker="Sam Wiseman" timestamp="15:32">

Yeah, I mean, right. So it's far from obvious to me that I found a super good one. I mean I think
for things like machine translation, it's natural to think that, you know, if you're violating
hypothesis has like a really, really bad BLEU, then you should penalize that more. And so in the
paper we use like one minus some smooth sentence level BLEU to kind of scale that. So that is to say
if it has a very, very low BLEU, then you kind of get a higher scaling of that loss. And if it
doesn't then you don't. Yeah, I think it's very problem specific. And I think also because this is
sort of a margin based method where you're literally just scaling the loss, you have to worry and
kind of make sure that you're not, you don't make it huge or anything like that. So the other is a
bit of tuning that you need to do to kind of get any of this to work. I think.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:19">

One more question about, so you mentioned pre-training several times before as a necessary
procedure, right? How do you do that pre-training? You use the, algorithm as your loss function?

</turn>


<turn speaker="Sam Wiseman" timestamp="16:33">

Yeah, absolutely. It's just so just standard seq2seq token level negative log likelihood. Yeah,

</turn>


<turn speaker="Matt Gardner" timestamp="16:38">

Train until convergence and then restart with this.

</turn>


<turn speaker="Sam Wiseman" timestamp="16:41">

I think that's basically. Right. I think I remember like I think people have asked me like, Oh,
maybe you don't want to train it too much cause then it, I mean that's actually not true. I think
you kind of want to train it pretty much until it converges. Yeah. I mean it's, I don't have like a
number of epics or whatever to give you. I think you do. I and I and certainly doing the
experiments, I did try a few of them, a little geographics before convergence and after. And I think
you do kind of have to mess with this. I think the general rule of thumb is pretty much still
convergence.

</turn>


<turn speaker="Matt Gardner" timestamp="17:08">

I like a lot of things in deep learning these days. Your hesitation there on what exactly to do
scares me. Just these things are so fiddly.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:20">

With respect to the size of K how does that affect the performance, I guess I'm curious to know the
answer both with the proposed method that we saw method end without.

</turn>


<turn speaker="Sam Wiseman" timestamp="17:31">

Yeah. So I guess in the paper, there were a couple of comparisons and particularly we compare I
guess sort of training with different beam sizes and then testing with them. So one of the, I guess
problems we consider on the paper is this word ordering task where you try to map from a shuffled
sentence to the correctly ordered sentence. And so there are, we sort of have a grid where you train
with different beam sizes and then test with different beam sizes. I think it's like two, six 11 by
two six 11 which correspond to know one five and 10 I think for those tasks that you typically see
is, you know, you do the best when you evaluate with a beam that is the same as you trained with. I
have a notable pattern in the paper is if you train with a relatively large beam and then you
evaluate greedily typically do pretty badly. And so this, so this was true anyway for word ordering
and dependency parsing, sort of less true for machine translation. So I guess there the intuition is
if you train with a big beam, then your model doesn't have to be super confident early on. But then
if a test time you use like a very small beam, you're basically greedy, then you end up throwing
things out kind of too early.

</turn>


<turn speaker="Waleed Ammar" timestamp="18:37">

And in terms of their on time performance,

</turn>


<turn speaker="Sam Wiseman" timestamp="18:39">

There's some numbers in the paper with I guess a very old GPU. I think we decided that it was
roughly three times slower to do these forward and backward passes. And then after that it's sort of
scales sub linearly with the beam. I mean, so, so the beam search happens sort of happens all in
batch and so it's not quite as bad as K times worse, but you know, theory it's going to be K times
worse to train this way.

</turn>


<turn speaker="Matt Gardner" timestamp="19:03">

And any other highlights you want to mention from the results in the paper?

</turn>


<turn speaker="Sam Wiseman" timestamp="19:07">

I mean, so the thing that I think is really exciting is just sort of constrained training aspect of
the work. So, you know, standard seq2seq, you sort of always assume the gold is the history. And
then I guess you could imagine things where you search but there are no real constraints on your
search. But I don't think you can do is you can sort of have this middle ground where you're
training in this constrained way where you know, maybe I'm only considering sequences that represent
valid dependency parses or valid permutations of my input sequence if I'm doing word ordering it's
not sort of a fun thing and if you look at the results, that typically tends to help. So that's sort
of like a cool thing that you can kind of do here.

</turn>


<turn speaker="Matt Gardner" timestamp="19:49">

Yeah, that's really related to stuff that I'm working on. In fact, it's exactly that problem.
There've been a number of people recently that have published papers showing that this is really
helpful for semantic parsing where you're output is a logical form. So it's part of a formal
language that have framework constraints on what can show up where even more so than dependency
parsing. And it's pretty clear at this point that you really want some kind of constraints decoding
so that you're only considering valid actions or valid outputs at any particular time step. So I
guess related to that this work is now a couple of years old. What's come since like what have you
been working on? Is there any interesting follow on to this work that you want to point out?

</turn>


<turn speaker="Sam Wiseman" timestamp="20:33">

So I actually, I've moved mostly to generation and I actually think that, I mean, so I think what a
lot of the results in this area have shown is that for standard generation problems like machine
translation and summarization with tons and of data and some tricks, you don't really need to do
fancy things like this. I think. And also there has been some other work, I think maybe you are
going to have these guys on your show. I think Sergey Edunov and Myle Ott have done some really
awesome recent work showing basically that there are a bunch of ways to kind of get the benefits of
structured learning, but it's not clear that's super necessary if you have tons of data. So yeah, so
I think that for, for actual generation, it's not obvious to me this is like the correct thing to
do. I think if you have less data, so if you're doing maybe low resource machine translation or
something like this and maybe exposure bias really is an issue, this would make sense. But my guess
is that, you know, this is sorta going to be useful for tasks where maybe there are constraints
where maybe there's some common tutorial structure and so search really helps you. I'm not sure I
know exactly what those are. Maybe some sort of structured information extraction or something like
that. But yeah, I would say for MT, I think it's clear that you can do super, super well by not
worrying about most of this.

</turn>


<turn speaker="Matt Gardner" timestamp="21:45">

Yeah, it's, it's amazing to me that low resource in MT is like what a hundred thousand examples and
the problems that I work on have like several thousand examples, maybe 10,000 if you're lucky.

</turn>


<turn speaker="Sam Wiseman" timestamp="21:56">

I think Low resource is a little bit smaller than that. But yeah, I mean, the rule of thumb I've
heard is you need at least like 20,000 examples to kind of get an MT to kind of work at all.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:05">

Lead generation is harder than predicting to analyze it. I think there's an argument to be made
about how many examples you need for training as a function of the possible choices.

</turn>


<turn speaker="Matt Gardner" timestamp="22:18">

Yeah. The size of the output space. And that's fair, semantic parsing, typical data sets have on the
order of a thousand. I don't really know of any that have more than like 10,000 or on the order of
10,000. And the output is a sequence. It's like, it's, it's a form, it's language generation. It's
just a very constrained language. And so having the constraints on that language really helps. So
you can get by with a whole lot less data. So, yeah you're right. It definitely does. Like you can
prove that the amount of data that you need scales with the size of the output space. Right. Cool.
Any last thoughts before we conclude?

</turn>


<turn speaker="Sam Wiseman" timestamp="22:52">

Not any interesting ones, but thank you for having me.

</turn>


<turn speaker="Matt Gardner" timestamp="22:56">

Yeah, it was talking to you, it was an interesting discussion.

</turn>


<turn speaker="Sam Wiseman" timestamp="22:59">

You too. Thanks a lot.

</turn>


<turn speaker="Matt Gardner" timestamp="23:00">

Thank you.

</turn>
