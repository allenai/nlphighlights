---
title: "Model Distillation, with Victor Sanh and Thomas Wolf"
hosts: ["Matt Gardner","Pradeep Dasigi"]
guests: ["Speaker 3","Victor Sanh","Thomas Wolf"]
number: "104"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner, Waleed Ammar and Pradeep Dasigi. Okay. Today our guests are
Victor Sanh and Thomas Wolf who are research scientists at HuggingFace. Victor and Thomas, welcome
to the program. It's good to have you.

</Turn>


<Turn speaker="Victor Sanh" timestamp="00:16">

Hi guys. Thank you for having us. It's a real pleasure to be here.

</Turn>


<Turn speaker="Victor Sanh" timestamp="00:18">

Hi everyone.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:19">

So today we wanted to talk about model distillation in general and a specific NeurlPS workshop paper
that made us think about this topic on what you called DistilBERT. To start us off, do you want to
tell us what model distillation is?

</Turn>


<Turn speaker="Victor Sanh" timestamp="00:33">

Yeah, sure. So model distillation is the idea that you can train a smaller model from the outputs of
a bigger teacher. So usually you have like the same architecture but just like a smaller model
compared to the teacher. So you train the student from the teacher by using the output of the
teacher. And the idea is that rather than training on the gold labels, you can train by teaching the
student to mimic the behavior of the teacher. And use the output distribution of the teacher so that
the student can fit the distribution probability distribution of the teacher.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:05">

So why do I want to do this? Why should anyone care about distillation?

</Turn>


<Turn speaker="Victor Sanh" timestamp="01:10">

Yeah, that's a good question. One of the biggest reason we are doing distillation is to compress the
models and having faster models for an inference papers, especially when you think about edge
application. So having inference directly on your phone, on your like edge devices or having models
that are production friendly, that speed is definitely one of the biggest requirements. Especially
when you think about low latency constraints in servers.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:36">

Wait, wait, are you telling me that leaderboard performance isn't the only thing that matters?

</Turn>


<Turn speaker="Victor Sanh" timestamp="01:42">

Maybe in real life. Okay. It's like good to have a good performance then when you like type
something on Google search, you don't want to wait a minute before having your results. Right?

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:52">

Yeah, and just to drive this point home, I think one of the original papers that introduced model
distillation was talking specifically about ensembles like we see on leaderboards. Often ensembles
of models are at the top most of the time. So you took BERT, which is big and made BERT smaller just
as a single model. But imagine I have BERT, but I have an ensemble of like 10 BERTs. If one BERT is
hard to run, you can imagine 10 BERTs being much, much harder to run. And so we want to take these
performant models and shrink them down as much as possible. Right?

</Turn>


<Turn speaker="Victor Sanh" timestamp="02:19">

Yeah, absolutely. Yeah. Like the original paper was working with ensembles and it's obviously
driving like a lot of like the other [inaudible] race. So yeah, the teacher can be like a lot of
things. You can be an ensemble but it can also be like a, just a single model that is quite big. So
that's what we did in DistilBERT. So like taking a really big BERT and try to compress it in a
smaller version of BERT.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:43">

So why should we expect this to work? You would think if I need all of these parameters to get my
high-performance in the first place, why should I be able to get similar performance with a much
smaller model? At some level? It seems very counterintuitive that this is even possible. What's
going on here?

</Turn>


<Turn speaker="Victor Sanh" timestamp="03:01">

I think there are several aspects to cover here. One of the biggest aspect here is over
parameterization in our models. So it's very well known now that most of our models today in
language are over parameterized. You have much more parameters than you actually need to do a
certain task. So when you have something already trained you can probably, you want to somehow prune
it, you want to somehow distill it, compress it, so you just end up with what you actually need for
doing like your best perfect use case. And maybe a second aspect here is like it's related to the
first point is all these developments on like lottery ticket hypothesis. So the idea that you can
have a really strong, really big model like to catch and to find this right set that works, but at
the end do you really need all the rest? So just keep the semantic work at the end and discard the
rest.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:00">

Yeah, that's really interesting. I hadn't made that explicit connection before between the lottery
ticket hypothesis and model distillation, but they're definitely related, or at least this whole
pruning idea gives credence. It gives some validation to like why it should theoretically be
possible to do distillation.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="04:18">

Yeah. Beyond the paramerization, would it also be the training objective being different because the
smaller model is essentially trying to approximate the distribution of the larger model? Right, and
the distribution of the larger model is that, after actually looking at all of the trending data.
Right, so could it be that also?

</Turn>


<Turn speaker="Thomas Wolf" timestamp="04:37">

Yeah, I think there is a relation to, Oh, we actually understand what, what is an inductive bias in
NLP? Right. We think a part of it is including the architecture, but another part is learned during
the training process as I can see it. So the part that is included in the architecture, they will be
both in a student teacher. Right. But it's the part that you will learn from the data. This is
something you want to try to extract with the knowledge distillation. I'm not saying that the way we
are doing right now is the ultimate way we should do knowledge distillation just using outputs-
inputs pairing. Maybe is a bit sparse so maybe we could have more signal, but yeah, that's
definitely the ideas in my head too. Like to try to catch this inductive bias that was learned by
larger models.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:23">

Yeah, and a way of paraphrasing all of this is to say perhaps that it may be very difficult, hard to
say impossible, but maybe very difficult, to get the smaller model to learn the right internal
representations from the data. There might not be a good learning algorithm that will get us from
the data to the right parameters in the small model. It takes the larger model to actually really
capture for whatever optimization reason to capture the right decision boundary, but then once it's
there, there are different learning algorithms with different objection functions that will let us
compress it down without necessarily needing the data.

</Turn>


<Turn speaker="Thomas Wolf" timestamp="05:57">

I think there is an interesting set of experiments that could be done. For instance, if you take the
recent T5 model by Google and it takes text-to-text-transfer-transformers, they trained a large
range of sizes and the smallest model is like 60 million parameters, right? Which is very small and
there is probably interesting thing to understand if actually this small model that was trained on a
really huge amount of data, can we get the same performance? Can we get better performance by
initializing model of the same size and tracing it from distillation of the largest T5. So there is,
I think some thing we should explore this or like that will be interesting to explore. That's one
question you also investigated a little bit Victor. Is it just a question of the amount of data?
Like if we take these small models, we train them for long enough, kind of recover this inductive
bias, even though they are small enough. So, I think the idea Victor, is that the lottery ticket
would make us think we cannot.

</Turn>


<Turn speaker="Victor Sanh" timestamp="06:52">

That's an open question.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:54">

Yeah, those are good points. So we've talked about what model distillation is. We want to take a
really big model and compress it down into something that has similar performance but with many
fewer parameters or much less time. We want to do this because we don't always just care about
leaderboards and we might want to actually run stuff in real life. And for that case we want
something to be smaller. What about how exactly we do this or we've kind of skirted around this
issue a little bit in how we've talked, but like what's the actual mechanism, the learning
algorithm, whatever to get from the big model to the small model.

</Turn>


<Turn speaker="Victor Sanh" timestamp="07:26">

So the canonical way today to do distillation is to compare the outputs distribution of the student
and the teacher and to try to push the student distribution towards the teacher's distribution. So
we use like a cross entropy loss that was introduced by two papers. The first one was the Caruana
paper and then it was developed further by Hinton et all. So yeah, you basically use a cross entropy
over like the multi-nomial distribution. You push like the student to mimic the behavior on the
distribution to the teacher. Then there's a question of there is distribution, what kind of data you
want to model and you usually the most straightforward choice is to use the original training data
for the teacher. That's like a really straightforward choice and it works pretty well because you
have distribution that the teacher is pretty well trained on. You use the same distribution input
distribution for the students, so you worked pretty well.

</Turn>


<Turn speaker="Victor Sanh" timestamp="08:27">

There is also some effect of size, so you don't necessarily need to use as much data as the original
training. You can use like a subset, like maybe a third, maybe 50% of the original data, but
something interesting on the training data that some recent papers I've been showing is that you
don't necessarily do have real data. There's this recent paper I think it's an ICLR paper from
Google called Thieves on Sesame Street. In this paper they basically show that you can distill a
model, you can distill a teacher into a small student by just giving inputs; random text. So what I
call random text is just a sequence of random words that don't necessarily mean anything. It can be
like tablespoon bottle, whatever And just by mimicking the output distribution it's already like a
strong enough signal to train a distilled version of the teacher so the input don't even necessarily
have to mean anything like in terms of semantics, in terms of language. Distribution is already a
really strong so you know to train the distilled version.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:32">

That's a really interesting result. I guess, fundamentally what we're trying to do is recover a
decision boundary and all we need is something that will give us information about how close we are
to mimicking the original model's decision boundary such that we can do gradient descent on our
small model and try to mimic that decision boundary from whatever angle we're looking at it. Right?
That's a really nice paper that you just mentioned. Here's another anecdote. There was this paper
that came out a few months ago, maybe almost a year ago called Adversarial Examples are Features,
Not Bugs and this paper is trying to understand like what it is that makes adversarial examples
work. Eric Wallace was interning with me at AI2 at the time and we talked a lot about this paper and
Eric did some experiments that were really interesting. Our thought was that the experiments in this
Adversarial Examples are Features paper really just amount to model distillation, and I think he
showed this in a really interesting way and that he took the model's incorrect predictions,

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:30">

So, take DEV data or something where the model predicts the wrong thing on like image
classification. So, in MNIST or something, I'm taking a digit predicting what digit I'm looking at
and takes instances where the model got it wrong and then takes the model's prediction and uses that
as training data for a new model. Does this make sense? So like I see a digit that is a seven, I
think it's a three and I use that image with the label three from the original model and train a
model with that. Even though the image is a seven, I'm giving it the label three and I'm training a
model on this entirely incorrectly predicted data. Guess how well I do on the original test data
with the original labels: better than random, significantly better than random, which is really
quite strange. Like it's really counterintuitive that I can get not trivial performance.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:17">

It's not amazing performance, but it's not trivial performance when I'm training only on incorrectly
predicted data. And why? This is because that incorrectly predicted data tells me something about
the models decision boundary and the model's decision boundary gets non-trivial performance on the
original data and so it's, it's really interesting. It's very similar to what you said with from
this Google paper where I'm giving it basically nonsense input. It doesn't have to be input in the
original data distribution and it also doesn't have to have the original label. I just have to have
some signal that tells me about what the original model"s decision boundary was, such that I can
learn from that.

</Turn>


<Turn speaker="Victor Sanh" timestamp="11:51">

Yeah, absolutely. That's quite strange and I've, well I'm not sure if there were any experiments on
this paper, but what happens then, when do you just grow the size of the datasets? You imagine that
you have an unlimited data set of nonsense inputs or just incorrect labels? Can you actually recover
like a strong performance metric but having like an unlimited data set?

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:12">

Yeah. Yeah. The the key is that it can't just be any incorrect label. It has to be the incorrect
labels from the predictions of the original model. I'm just trying to recover the model. I'm not
trying to recover anything about, I was going to say I'm not trying to recover anything about the
data itself, but actually the model is essentially a compressed version of the data in some sense,
and so the models decision boundary tells me something about the data so I can probe that decision
boundary using anything that I want. Now we've talked about a few different issues here about like
how exactly you can do this. You get to dive into a little bit more detail on some of these
dimensions. One is data, one is loss functions and the trivial experiment that I was talking about,
we only use the label itself and not a distribution and we still got some distillation there.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:57">

Whereas what you suggested is that I'm using the models, the entire probability distribution as my
learning signal, getting the whole distribution instead of the argmax from the distribution is going
to be more information about the model's decision boundary and so it should be a stronger learning
signal. You could also imagine if we have a particular model or class, I could go even farther and
get like the model's hidden state, like try to mimic the model's internal hidden state at some point
as another signal for distillation. Are there others like we can talk about how each of these works
when we get more into DistilBERT, but are there other classes of things you might try to mimic?

</Turn>


<Turn speaker="Victor Sanh" timestamp="13:29">

That's pretty much the two big classes of losses. So, on the distribution or on the embeddings and
hidden states.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:35">

And then there's also like the data, I'm not too familiar with model distillation literature. I
don't know how much you know about all of it either. You said you could use the original training
data, Google showed you can use this nonsense data. Are there any insights that people have had or
like methods to find what data is the best to distill from? I imagine that makes a difference, but I
don't know how much work there's been in that.

</Turn>


<Turn speaker="Speaker 3" timestamp="13:58">

Seen any paper on that, but even the data we use to pre-train these large models, I think there is
not enough research on that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:06">

In other words, lots of really open questions that are ripe for more research, dear listeners.

</Turn>


<Turn speaker="Victor Sanh" timestamp="14:10">

Yeah.

</Turn>


<Turn speaker="Victor Sanh" timestamp="14:11">

Yeah. Well I guess like the research community hasn't really focused on data because somehow it can
be seen as boring, like really looking into the data, but that's actually really sometimes what
actually drives the performance at the end. So yeah, that's quite important.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:26">

Yeah, definitely. I definitely think that's true.

</Turn>


<Turn speaker="Speaker 3" timestamp="14:29">

That's something we want to push and I don't know if you've seen like we've released like a very
fast tokenization library recently, which is kind of related, I think. All these input pipelines,
like people don't pay enough attention to them, don't really play enough with them. And so the tools
are very, not developed enough, like not fast enough to actually experiment a lot on this. So,
that's one of our big goal is try to push the community to do more research on this side.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:55">

Yeah. And your contributions in that area have been really good. So, thanks. Okay. I think at this
point we have a decent handle on model distillation as something you might want to do and how it
works. So maybe we can move to talking about your specific contribution here, which has a particular
distillation of BERT. Do you want to tell us about that?

</Turn>


<Turn speaker="Victor Sanh" timestamp="15:12">

Yeah, so we work on distilBERT, which is a distilled version of BERT. It's basically like the same
architecture, so just the classical BERT, but with only six layers compared to 12 layers for the
bert base. And we train it with distillation. So, we do pre-training for distillation using a linear
combination of three losses, which are the canonical masked language modeling, the cross entropy
loss, the distillation loss and a third loss, which is aligning the hidden states, the top
representations of BERT. So we are definitely using like the two kinds of classes in the losses. So
like on the distribution and in the embeddings. So this third loss's job is like just aligning the
two representations from the teacher and the students. And so we basically compress it to half of
the layers. So we have 40% less parameters. And on GLUE, a benchmark for natural language
understanding, we keep 99% of the performance of bert base on GLUE.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:12">

So, you mentioned as we talked about earlier, trying to encourage the distilled model's hidden state
to match BERT's hidden state as a distillation technique. This only works because of a particular
parameterization that you chose, right? Where you made sure that the sizes of all the hidden layers
aligned between the two models, is that right?

</Turn>


<Turn speaker="Victor Sanh" timestamp="16:33">

Yeah, so basically what we did in DistilBERT is initialized the student from the teacher. So,
basically we only kept half of the layers so they are zero, two four, seven, nine, eleven and we
take this half of the teacher's layers and to initialize the students so we can leverage the same
dimensionality of the hidden states to align them. In our experiments. We show that having these
kinds of initialization helps a lot. We have like a drop between like three or four points on GLUE
if we don't initialize from the teacher. And the rationality of initializing from the teacher is
that we have a really large model and it's pretty good at covering the space to go to good local
minima but having a smaller student, you don't have such a strong search space, so how can we help
guide the student who was a good local minima for the student? Not necessarily for the teacher, but
for the student and initializing from the teacher is already like a good boost to guiding for a good
minima.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:43">

You said there was a four point or so drop if I don't initialize the parameters in the way that you
said?

</Turn>


<Turn speaker="Victor Sanh" timestamp="17:50">

Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:50">

I'm trying to wrap my head around what that four points actually means. I think a decent way to try
to answer that question is take a model of the same size and train it from scratch. Does that make
sense? Did, did you try that? What happens?

</Turn>


<Turn speaker="Victor Sanh" timestamp="18:04">

Okay. If we take a model of the same size and train from scratch,

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:09">

Without any distillation at all,

</Turn>


<Turn speaker="Victor Sanh" timestamp="18:10">

Without distillation, it's even worse.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:12">

Do you know how much?

</Turn>


<Turn speaker="Victor Sanh" timestamp="18:14">

I don't have like the figures in mind, but you can probably, I think you lose like one or two
points. One or two points, like below the four points or...

</Turn>


<Turn speaker="Victor Sanh" timestamp="18:24">

Yeah, in addition to like the three or four points if you don't initialize from the teacher.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:29">

If I can rephrase to see if I'm understanding what you're saying, right? There's essentially a gap
between what I would get without any distillation at all using this model architecture and what I
get if I do distillation in the best way. And you're saying, if I don't do this initialization, I
lose about three fourths or two thirds of the improvement that I get from distillation. So I get
very little gain from distillation in some sense over just training the model from scratch unless
for this particular model, I initialize it in this particular way. Is that true?

</Turn>


<Turn speaker="Victor Sanh" timestamp="18:58">

Yeah, I think that's correct.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:00">

That's really interesting to me.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="19:03">

So that means that proper initialization is more important than distillation, correct?

</Turn>


<Turn speaker="Victor Sanh" timestamp="19:07">

The impact of the initialization is bigger than the impact of the distillation loss.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="19:12">

Okay.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:14">

Yeah. That's another interesting question. If I just do the initialization and then train without
the distillation objective, just train on the original task objectives, what happens? Did you try
that?

</Turn>


<Turn speaker="Victor Sanh" timestamp="19:24">

So, just initializing and training with a mass language modeling loss, right? That's what you're
saying?

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:30">

Yeah. So do the initialization that you did.

</Turn>


<Turn speaker="Victor Sanh" timestamp="19:32">

Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:32">

And then use whatever objectives I want on the GLUE tasks except for the distillation objective.
This is another way to just to try to get at this question of like what is the distillation actually
giving you and can we tease apart the distillation from the initialization?

</Turn>


<Turn speaker="Victor Sanh" timestamp="19:43">

I'm not sure we tried this experiment.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:46">

It's fine. This work is good cause it makes me think and it raises a lot of questions and you
produced a nice artifact in DistilBERT and you got me thinking about some really interesting
scientific questions that as far as I know don't have answers. Anyway, interesting things to think
about. So, related to the loss functions that we talked about earlier in your paper, you note that
you had temperature in the soft max loss when you're doing distillation, so basically instead of
trying to fit exactly the softmax distribution or the probability distribution that BERT creates
over its vocabulary at any particular point, I'm going to smooth that distribution out quite a bit
potentially, and only match the smooth diversion instead of the original one. Can you comment on why
this matters?

</Turn>


<Turn speaker="Victor Sanh" timestamp="20:33">

Yeah, we were discussing that earlier because I think it's very interesting as well. In general, I
think it's like a general theme in NLP that we want to enhance the small signal. And this reminds me
of other things like one unpublished work we are currently submitting, so I can't really talk in
detail about that. But, another work is like very general thing. Like if you take the old word2vec,
right, one of the very nice trick was to actually emphasize the rare words and like the smaller
signal and downplayed the frequent words and the very frequent signal. In a lot of place we have
this something that I think is closer to class imbalance in which we have a too strong signal on
some part of the inputs are part of the output space. And we want to overemphasize the smaller
signal. And you see that in many places, actually. Multi-Linguality when you train multi-lingual
model, you also want to like overemphasize the rare words.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:27">

So smoothing the softmax you're saying this overemphasizes the rare words,

</Turn>


<Turn speaker="Speaker 3" timestamp="21:33">

It overemphasizes the small signal more like it's not really the rare words, it's like the words we
are very confident about in our case for MLM.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:43">

Oh, okay. So if I have a distribution that has a long tail, it's got a clear mode, maybe a few words
that it's got pretty high probability on it and a bunch that has got low but non-zero probability,
the temperature is going to push the low ones down farther to zero and the mode up higher and so we
are reducing as you say the effect of lower probability predictions.

</Turn>


<Turn speaker="Victor Sanh" timestamp="22:09">

I think long tailed is probably the right underlying statistical concept here that we want to fight
or like be better suited.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:17">

This is definitely true in just learning in general when I have huge output spaces. I wonder if or
how this interacts with distillation, in particular. If I want to fit a model's decision boundary,
is it more or less important that I smooth out these quirks of the model's boundary for instance?
It's an interesting question that I don't know.

</Turn>


<Turn speaker="Victor Sanh" timestamp="22:38">

I think in the case of language, so what we are doing with the really large vocabulary, it's quite
important in most of our language models, the distribution over the vocabulary can be extremely
spiked. So we have like three, four words where all the mass of the distribution is, but if I give
you a sentence in English, okay, let's say "Today I walk my dog in the..." and you can complete with
"park", you can complete with "street" whatever. So you have like really large choices of possible
outputs and you want to be able to capture this kind of uncertainty in language. So, having a less
spiked or smoother distribution is quite important for language. If you really want to cover all the
possibilities in your vocabulary.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:26">

Yeah, definitely.

</Turn>


<Turn speaker="Victor Sanh" timestamp="23:26">

We could probably even take out the arg max in distillation it would work, right? A bit like you did
for the like vessel example, right? You take out the main arg max and you just distill on the other
one. Oh, it's almost the same. Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:38">

Do you mean you tried it and you get similar results or you think it would be similar?

</Turn>


<Turn speaker="Victor Sanh" timestamp="23:43">

We tried to remove in the free losses we just removed the real math language model. The modeling
loss and impact was like less than a point, if I remember correctly.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:53">

Say, also, I guess as the temperature goes to one extreme you're going to recover an ARG max.
Exactly. Right. Yeah. There are questions here around what is the optimal temperature. Do you have
any insight there for this particular task? Random search. Okay, and from that random search, did
you find anything? Were there trends as you went up and down temperature? Do you know?

</Turn>


<Turn speaker="Victor Sanh" timestamp="24:13">

I don't really have really strong experiments on that. We found like a really reasonable
hyperparameter here and it worked for our experiments, so, but that's like a good question like how
spike how smooth do you want your distribution to be?

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:27">

Right. Cool. Another thing that this paper really got me thinking about was how model distillation
interacts with all of the "BERTology", the analysis stuff that people have been doing. I know lots
of papers have tried to analyze what goes on inside BERT's layers. Like there was a paper on, does
BERT recover the classical NLP pipeline. There was a paper on layer wise analysis of model
transferability. A lot of these papers that try to understand what's going on and you did something
really interesting which was drop every other layer and try to compress that way, which in some
sense says I want one, one layer to do the job of two, which means now I don't need as much depth
but I can recover very similar performance. This strikes me as something that's really interesting
as a vehicle for analysis to further understand what's going on in BERT. Like I could try
distillation and then compare what I see in the distilled model versus the original model and do
some interesting stuff that way. What do you think?

</Turn>


<Turn speaker="Victor Sanh" timestamp="25:27">

Yeah, that's an extremely interesting question. So if look at like the attention patterns in
DistilBERT and DistilBERTA and like the children of DistilBERT I would say, and somehow we found
like pretty similar attention patterns. So you know you have like a couple of papers showing that
okay this the first head focuses on attention, the previous word, this head, focuses on tension on
the pronoun and we had like really similar patterns in terms of attention. We didn't really like go
further than that. But one point here is I'm not sure that distillation, when I said distillation,
so mimicking the output of the teacher, it doesn't necessarily mean that you have to mimic every
single internal behavior of the teacher, right? You want to let the student make his own sauce and
like build his own stuff rather than really mimicking later every single step of how the teacher
computes a representation. Right. So having a probing task at a really high level, so on top of like
or maybe like at every single layers is, I think an approach that makes more sense than trying to
compare like the embeddings or like where the embeddings are in the space.

</Turn>


<Turn speaker="Matt Gardner" timestamp="26:42">

Yeah. I guess I was thinking what features of all of this analysis that's been done on BERT are
preserved across distillation and if there are some, then maybe that tells us something interesting
because you're right, the distilled model isn't going to have as much capacity. It's going to have,
well in your case it has fewer layers. You can imagine other distillations that have fewer heads or
like fewer attention heads or whatever. And then the question is what parts are preserved? And if I
distill it too far in some sense, can I detect what was lost and use that to get some kind of
causal, might be too strong a word, but like some kind of insight into what actually was driving
BERT's original performance. It's interesting to think about what you could do here.

</Turn>


<Turn speaker="Victor Sanh" timestamp="26:44">

We haven't really analyzed really specifically what's happening to the syntax and to the semantics
inside the layers.

</Turn>


<Turn speaker="Victor Sanh" timestamp="27:31">

However, what we did, we've tried DistilBERT on the multilingual version of BERT, so the
multilingual BERT basically, and there is definitely a question of capacity. I think it's especially
true for multilingual models are trying to recover a lot of different languages and the biggest drop
were on like low resources languages, so on Tai, on Vietnamese and languages where you don't have
that, that much data compared to English. So yeah, there's definitely a question of capacity. Does
it mean that you can't recover some syntax and semantics? That's an open question here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="28:07">

My last big question for you, you kind of already addressed in that answer, which is like what do
you lose when you do this model distillation or compression? And it sounds like, I could rephrase
what you just said as the things that you miss when you distill are the things in the long tail.
Maybe it's multi word expressions, maybe it's, I don't, I dunno. Just this long tail phenomena in
language, rare words that you might miss out on in your lexicon, other kinds of stuff that just
isn't as frequent that maybe BERT had originally in its model that you don't have in your distilled
model. Do you think that's fair?

</Turn>


<Turn speaker="Victor Sanh" timestamp="28:40">

I think that's a fair assessment. Yeah. I don't know how like a good intuition on the what other
things, what other aspects you could lose. That's pretty much what I had in mind so far.

</Turn>


<Turn speaker="Matt Gardner" timestamp="28:50">

Okay, cool.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="28:50">

Did you try with different ablations for sizes of the smaller model, would that give us some
intuitions into what you might use?

</Turn>


<Turn speaker="Victor Sanh" timestamp="28:57">

Yeah, we've actually tried to compress BERT even further by only taking a third, maybe a fourth of
the layers. So going down to two or three layers by having the same initiation method. So taking the
teacher, removing some layers and it didn't really work. So we had like a really strong drop in
performance on GLUE and that's actually one thing that's also discussed in the Albert paper from
Google. So when experiments they did is to fix the number of players and then double the size of the
hidden states. So they take the 12 layers and instead of having a 68 hidden size, they take the
double of 68 and they have a really, really strong drop in performance, which means that there is
kind of a sweet balance between the number of layers and the hidden size and if you go up a certain
threshold between this really sweet ratio that your transformer is not stable anymore. Which is kind
of like surprising.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:59">

Yeah. That's really interesting.

</Turn>


<Turn speaker="Pradeep Dasigi" timestamp="30:00">

You also had some experiments of distillation before and after fine tuning, right? I mean
essentially after pre-training and after fine tuning, were there any interesting trends there?

</Turn>


<Turn speaker="Victor Sanh" timestamp="30:10">

What we observe is that if you have a really big data set, for instance on GLUE, MNLI is a quite big
dataset, Quora question pair's a quite big dataset, on the other side, RTE textual entailment is
quite small. If you have big datasets, having a second step of distillation doesn't help that much,
but it will definitely boost the performance on smaller data sets, fine-tuning data sets.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:36">

Great. Thanks. This has been a really interesting conversation. Are there any things that you wanted
to talk about that we didn't cover or any last thoughts before we finish up? Maybe one last thing I
think is the relation between how much memorization we have in models. Right? And how much
generalization. So, this is currently very interesting topic in general in deep learning. And there
is an interplay with distillation where maybe distillation could be one way to probe, tease apart,
these two things.

</Turn>


<Turn speaker="Matt Gardner" timestamp="31:01">

Do you get more or better generalization on some out of distribution data from a distilled model
than from the original model? That is indeed a very interesting question. Yes. Great. Thanks. It was
nice talking to you. This is fun.

</Turn>


<Turn speaker="Victor Sanh" timestamp="31:14">

Thanks for hosting us and thanks for doing the podcast. It's really an amazing one, I think. Thank
you. That's nice to hear. Thank you.

</Turn>
