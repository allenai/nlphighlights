---
title: "AllenNLP, interviewing Matt Gardner"
hosts: ["Matt Gardner","Pradeep Dasigi"]
guests: ["Carissa Schoenick"]
number: "115"
tags: []
description: "In this special episode, Carissa Schoenick, a program manager and communications director at AI2 interviewed Matt Gardner about AllenNLP. We chatted about the origins of AllenNLP, the early challenges in building it, and the design decisions behind the library. Given the release of AllenNLP 1.0 this week, we asked Matt what users can expect from the new release, what improvements the AllenNLP team is working on for the future versions."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F841990126&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Carissa Schoenick" timestamp="00:00">

Welcome to the NLP highlights podcast, where we invite researchers to talk about their work in
various areas in natural language processing, the usual hosts are Matt Gardner and Pradeep Dasigi,
but for today's episode, I'll be joining Pradeep as a guest host. My name is Carissa Schoenick, and
I'm a program manager and communications director at AI2. Today we're turning the tables and
interviewing your usual host Matt Gardner about AllenNLP and open source NLP research library
provided by AI2 this week. We're releasing version one of AllenNLP an important milestone for this
platform. So Matt, tell me about the origins of AllenNLP. Why did AI2 decide to build it and how
did it get started?

</turn>


<turn speaker="Matt Gardner" timestamp="00:38">

This feels a little bit weird being the interviewed one instead of the interviewer, but I guess this
goes back like three and a half or four years ago to an earlier version of, I guess I was learning
how to do deep learning. In my PhD thesis, I was doing knowledge base completion and focused on like
log linear kinds of methods. And when the deep learning revolution happened in NLP, I was just
focused on finishing my thesis and it kind of passed me by. And so when I got to AI2, I was
learning stuff and tried to use Keras, which is a library built at the time on top of Theano and
TensorFlow, it was, had a bunch of different backends trying to make it easy, to just give a high
level API to deep learning for a lot of different things. And I was using this to try to do NLP and
I found that it was difficult, particularly when you wanted to do complex things.

</turn>


<turn speaker="Matt Gardner" timestamp="01:30">

I was doing reading comprehension on SQuAD at the Stanford Question Answering Dataset. And there you
have a passage that you get as input and a question and an answer where the answer is required to be
a span of text in the paragraph that you get as input. And this is a complex input data type that
requires padding in two different places. If you want to batch things together, because you need as
input to these tensor libraries, you need to have fixed length paragraphs and fixed length
questions. And so you have to pad shorter questions and shorter paragraphs, and it was a mess
getting this to work, right and like when you try to compute probability distributions over masked
stuff, getting this to actually work right in Keras it was very difficult to do this right. And so I
started building a simple library to do some easy stuff in data processing and like masking and
padding kinds of utilities for Keras.

</turn>


<turn speaker="Matt Gardner" timestamp="02:26">

And Pradeep actually was an intern with me at the time. And I was thinking like, how do I make a
library that makes it easy for interns to come and make progress quickly? So anyway, this is the
beginnings of what turned into AllenNLP. So then we fast forward, like six months, eight months, and
Luke Zettlemoyer joined AI2. And he was starting a new team and wanted as part of this to release a
toolkit that was basically, can we get, his students had recently done a co-reference resolution
model that was state-of-the-art and a semantic role labeling model that was state-of-the-art. And
was like, can we package these together and like rethink NLP toolkits and build something that's
useful. And I had this library that I had been working on and I talked to Luke and we decided to
build what he wanted to build on top of what I had, except then we looked at what I had and decided
it really needed to be rewritten.

</turn>


<turn speaker="Matt Gardner" timestamp="03:23">

And so we took the good ideas from it and rewrote it from scratch on top of PyTorch. And that turned
into AllenNLP. I guess there's one other important consideration that I didn't mention Elmo was
happening at the time Matt Peters had been working. I'd seen the early papers that turned into what
became Elmo and had been talking with Matt and helping him a little bit work on this. And I wanted
the library that we were building to make it really easy for you to use Elmo or not in whatever
experiment you wanted to do. And the input representations for Elmo and what came before, which is
GloVe vectors or a number of other possible things are like very different. And so we needed the
library to have some abstraction layer that made it easy to switch, even though the underlying input
representations were like totally different, but everything on top could be the same so that you
could do like controlled experiments and like actually have an easy way to make a table in a paper
that will show your claim in a controlled way that Elmo works.

</turn>


<turn speaker="Matt Gardner" timestamp="04:25">

And so this, this was another huge thing we were thinking about in like how this library developed.

</turn>


<turn speaker="Carissa Schoenick" timestamp="04:32">

That's great. It sounds like Elmo was a huge motivating factor. And I wanted to ask you about kind
of early challenges you encountered with building this library. You touched a little on doing that,
but anything else that kind of stuck out to you as a unique challenge for building something for the
wider community?

</turn>


<turn speaker="Matt Gardner" timestamp="04:48">

Yeah. So I can dig a little bit more into Elmo actually. So when you think about how do I make the
code generalizable from something like GloVe to something like Elmo. It's challenging because this
requires touching pieces of data processing and model of code at the same time, because if I'm using
GloVe vectors or say a GloVe vector concatenated with a character convolutional neural network
representation, then I'm going to need a particular representation in my input and I'm going to need
particular pieces in my model that are coupled with that input representation in order for things to
work out correctly.

</turn>


<turn speaker="Matt Gardner" timestamp="05:26">

And then if I then switch this with Elmo again, I have a very different input, character
representation and different model pieces in the model side. And so the way we designed this in the
initial library, that was the precursor to AllenNLP was to couple the data processing and the model
code so that you have one object that does both pieces, which at some level makes sense because like
these have to be coupled, there is necessarily you need the input representation to match what the
model is doing the trouble is this coupling makes it really hard to reuse pieces of the library. You
really want the data processing to be separate from the model. So you can swap it out and same with
the model, if you want to do different modeling stuff, but use the data processing code that we've
built because you like it for some reason, if things are so coupled, it makes reuse really hard.

</turn>


<turn speaker="Matt Gardner" timestamp="06:18">

And so this was one thing that we changed from the precursor to AllenNLP to our rewrite when we
actually wrote AllenNLP in PyTorch, we tried to be sure that pieces were decoupled so that like
there has to be some coordination between the data side and the model side, of course, because they
have to work together, but it's no longer a single object that does both operations. And we still
wonder sometimes because like transformers now that things have changed again, there are things that
would be a lot easier if you just had a single Python object that did both of these things at the
same time, but that makes it really hard to only pick and choose. Like, if you like our data
processing, if we have one object that does both pieces, it gets really confusing. So this is
something we've struggled with a lot.

</turn>


<turn speaker="Carissa Schoenick" timestamp="07:04">

That's good. I mean, it sounds like there's a lot going on inside the library. So, I mean, you have
several demos, you've got a bunch of pre-trained models and there are ways to retrain models or even
build your own models. So like, how are people using AllenNLP?

</turn>


<turn speaker="Matt Gardner" timestamp="07:17">

I guess it's designed to do a bunch of different things. It's got, I guess here's another thing that
was an important factor in the design of AllenNLP. We really wanted it to be really easy to put up a
demo of your model once it's built. A strong proponent of actually looking at what your model does.
I think it's far too easy to see aggregate numbers and be essentially misled by high numbers. And if
you just poke around with what your model does and like change inputs, like take an existing test
example, tweak it a little bit, I guess, not test, but dev anyway, if you play around with it with
what a model does in a demo, you get a whole lot more insight about what you should do next in
research. And so we intentionally designed APIs to make it easy for you to take your model and serve
it in a demo.

</turn>


<turn speaker="Matt Gardner" timestamp="08:06">

And this also makes it easy for us to put up a demo. And we have demos that we host of models that
at least at some point we're close to state-of-the-art they were stale for a bit. We've refreshed
most of them. So now right now they're pretty close to state-of-the-art, but that'll change. They'll
get stale again. But when I look at you asked, like, how do people use AllenNLP, I get citation
notifications for the AllenNLP paper. So I, cause I'm curious, I check and see whenever I get one of
these, how people use it. And the majority of them are like they took our demo basically and made
some predictions with our demo models and use those predictions to do something like, interestingly,
this was not a use case that we really anticipated that wasn't what we were designing for, but
people use it and that's good because apparently it's useful.

</turn>


<turn speaker="Matt Gardner" timestamp="08:56">

Another way is to take our reference implementations of these models and retrain it on new data. I
see that quite a bit. It's less common, but I do see this a little bit where people actually use the
library to write their own model. The other two uses are much more common, which we, when I was
designing this and thinking about it was this third use case that I was trying to support or where
people were writing their own models. And people use that it turns out less than the other two, but
just this morning, actually I got a citation notification of someone who built a vision plus
language model using AllenNLP, which I thought was pretty interesting, especially cause that's not a
use case that we had in mind when we designed the library.

</turn>


<turn speaker="Carissa Schoenick" timestamp="09:35">

That's really cool. Is that something that you think you'll see more and more of in the coming
months?

</turn>


<turn speaker="Matt Gardner" timestamp="09:38">

Yes, I've been involved in several projects recently that did some vision plus language
experimentation. So specifically a natural language visual reasoning. We did some stuff with neural
module networks, this is a dataset called NLVR2 from Cornell Yoav Artzi, Alane Suhr and others. So
we did some neural module networks on top of this, which is this is the research area that I'm
pretty excited about. I won't, I could go off talking for a while about that, but I'll spare you.

</turn>


<turn speaker="Carissa Schoenick" timestamp="10:08">

We'll have to do a follow up podcast.

</turn>


<turn speaker="Matt Gardner" timestamp="10:08">

But, yes, generally we are thinking a lot about, because people like the reference implementations
that we have and use them a lot, we're thinking what things could we add that's missing and vision
and language is a big one, summarization and other more general sequence generation kinds of things
are things that we are actively thinking about adding right now.

</turn>


<turn speaker="Carissa Schoenick" timestamp="10:33">

That's fantastic.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="10:34">

I'd like to just add something quickly because it's an open source project we get lots of
contributions from people using AllenNLP and that's been a pretty strong point, right? I mean, Matt,
would you want to elaborate on that?

</turn>


<turn speaker="Matt Gardner" timestamp="10:47">

Yeah, definitely. Some of the major features that we've had recently have been either inspired or
directly contributed by outside folks. And yes, we really like this. For instance Automatic Mixed
Precision training AMP. This can give you dramatic speed ups by using fewer bits to represent all of
the weights in your network. This was added by someone, not at AI2, and makes the library faster.
It's something people have wanted for a long time. We haven't had the bandwidth to get to it.
Someone else outside got to it and we were really happy about it. And yes, we love having people
contribute.

</turn>


<turn speaker="Matt Gardner" timestamp="11:23">

We've wondered, like especially cause our models, the reference implementations of the models that
we have are something people use a lot. We've been wondering what's the right way to try to get
people to contribute models to the library, which hasn't happened nearly as much. I think actually
the way we were thinking about it originally is probably the wrong way to think about it because we,
really don't want to be in the position of hosting and in some sense, taking credit for other
people's models, that doesn't align incentives very well in the research community. And so what
we're trying to do now is have a better way to host like point people to third party repositories
where other people's code lives, we highlight what they did. I think a recent one, we did this with
has an AI2 connection, but the, there was a project that I worked on with Nitish Gupta at the
University of Pennsylvania.

</turn>


<turn speaker="Matt Gardner" timestamp="12:16">

And this was again neural module networks for a dataset called DROP reading comprehension dataset
that requires some numerical reasoning, Nitish wrote code in his own repository. We helped him get
it into a demo and we are now hosting what I think is a pretty fun neural module network demo that
operates on paragraphs of text. And this is a model that we're trying to encourage more where we
find interesting projects that we could highlight in our demo and basically advertise for other
people instead of this like conflicted thing where we're not sure if we want to encourage people to
submit their code back cause that if Nitish had like pushed his code into AllenNLP, then it like
hurts Nitish in some sense, from a PR perspective. Cause we want his name to be recognized. He did
the work. We don't want to take credit for what he did.

</turn>


<turn speaker="Matt Gardner" timestamp="13:09">

And so this is how we think about like third-party contributions. Like definitely we love
contributions to the model of components helping the library get better, but for models themselves,
it's probably better for everyone if we just highlight other people's repositories that use the
library and interesting ways.

</turn>


<turn speaker="Carissa Schoenick" timestamp="13:27">

Great. Okay. So this week we're actually releasing AllenNLP version one. This is the first major
versioning of this library and it's a major milestone for us. So tell us a little bit about what
users can expect with this release.

</turn>


<turn speaker="Matt Gardner" timestamp="13:42">

Yeah, I think some of the feedback that we've gotten for a long time is that there's a steep
learning curve to AllenNLP. You kind of have to buy into a bunch of things in order to even get
started because we had kind of bundled together an experimentation framework with the library
components and to me, the major feature, the major thing that we did for 1.0, is try to explicitly
separate the experimentation framework that we have from the library components themselves. So the
library in some sense really has three main pieces. There are APIs for data processing. There are
APIs for building models and there are APIs for training models and some other bells and whistles
like other things for demos and for interpretations and stuff. But the main pieces are like the
data, the model and the training. And these were previously very hard to use outside of an
additional experimentation framework that let you do configuration file driven experiments, but
we've kind of torn those apart so that if you want to use just our data processing code and
different model code and a different trainer, you can do that. It's fine.

</turn>


<turn speaker="Matt Gardner" timestamp="14:54">

If you want to use our data processing and our model, but a different trainer like PyTorch
Lightning, you can do that. It works and it's relatively easy to use. And if you want to write your
own experiment framework, you want to just write simple Python scripts to train your models and run
your experiments and not use the configuration files stuff that we had. That's easy and doable. And
we have new tutorial material to show you how to do that. So the goal here was to simplify a lot of
parts and make the learning curve, the barrier to entry much lower that's one major bit, another
major bit is updated models. The transformer revolution of the last couple of years, in some sense,
kind of passed us by. We had been distracted on other things. Luke left AI2, I moved to Southern
California and started co-advising PhD students and focusing a lot more of my time on mentoring
research projects.

</turn>


<turn speaker="Matt Gardner" timestamp="15:51">

And so the library kind of flat lined a little bit in some sense for awhile, we're trying to change
that. And so we've refreshed all of our reference implementations. I think all of maybe most, all of
our reference implementations, like our co-reference resolution model is now basically at state-of-
the-art. It was not nearly close before. Basically all of the models in our demo now are backed by
Roberta instead of Elmo or earlier, we've made it a lot easier to use the new, like updated up-to-
date transformers from huggingface's Transformers library. So that's another big piece, just
refreshing everything, making it easier to use with 2020 NLP instead of 2018 NLP. Another major
piece is brand new introductory material in the form of what we're calling an AllenNLP guide. This
is based off of some stuff from the SpaCy folks, they introduced this framework for building
interactive courses and we took that made a bunch of tweaks to it and released this guide that has
chapters for a quick start that shows you how to use the library, either using our configuration
files, if you want to use our experiment framework, or if you want to use it, just writing your own
Python code shows you how to do both of those in a quick start kind of introductory thing.

</turn>


<turn speaker="Matt Gardner" timestamp="17:09">

And then there's a whole section of this guide that talks about in more detail, what's going on with
all of the APIs and obstructions that we provide, why they're there, why they're designed the way
they are and how to use them. So this part is more focused on like you've been using the library a
little bit, but you want to understand it better and get more out of it. Maybe break outside of the
box that you might have thought existed from the quick start and use pieces that we have a little
bit better. This, section of the guide aims to explain how all of that works better.

</turn>


<turn speaker="Matt Gardner" timestamp="17:40">

And then there's a third section that is still in progress. We're not very far here yet, but the
intent is to have a series of chapters showing how to do various with NLP, with Alleln NLP. Targeted
in kind of like say you're teaching a course at a university and you give your lecture on like the
math and the theory behind say semantic, parsing or co-reference resolution. And you want to point
somewhere that has like, how do you actually write code for this? You maybe don't want to talk about
this in your lecture. But our intent is to have as part of this guide, these chapters that talk
about, say, you want to write a code for co-reference resolution here's how you would do it.

</turn>


<turn speaker="Matt Gardner" timestamp="18:21">

And then I guess the last thing that we've been thinking about some of which is already in AllenNLP,
and some is already in version 1.0 and some of which might come in version 1.1, we're taking a look
at a lot of performance issues. And so the mixed precision training that I talked about previously
goes into this and we're trying to fix. So distributed training works better now we're trying to cut
down data processing overhead time, just make everything dramatically faster. Our goal for the year
actually is to have the training time for a large portion of our models. So like 50% speed up. And
we're pretty close in some configurations we're like 47% in some like multi GPU kinds of
applications, some other settings aren't quite so fast yet, but we're working on it.

</turn>


<turn speaker="Matt Gardner" timestamp="19:11">

Awesome. Something else I wanted to ask you kind of about just using library generally is when would
you recommend using AllenNLP over alternatives like SpaCy or Stanza or any of the other NLP
libraries that are available today?

</turn>


<turn speaker="Matt Gardner" timestamp="19:24">

Yeah. So I guess there are a lot of options these days, which is a good place for the field to be
in. Why would you pick AllenNLP? One thing that I've heard, some people like is, I guess I've heard
this a few times, like when I want to understand how a model works, I go and read the Allen NLP,
reference implementation because it's clean it's well-documented and I can understand what's going
on in that code. And so that's one reason you might choose to use AllenNLP because we have a good
reference implementation for something that you want to work on. Another reason that you might
choose AllenNLP is if you have complex data processing, a lot of tasks these days are you just
concatenate everything and pass it into a transformer. And maybe you don't need complex stuff in
that case. But if you have, I don't know, semantic parsing where you need to take as input like a
grammar and, or like available production rules in a grammar, or maybe you're doing some kind of
retrieval, there are a lot of cases where you have complex data processing requirements.

</turn>


<turn speaker="Matt Gardner" timestamp="20:32">

And I think AllenNLP has a pretty nicely designed data API to solve a lot of problems for you in
complex data processing things, particularly around like batching things together, padding things
correctly, the efficiently padding thing, or batching things together. Just as a quick example of
this, say, I have paragraphs, I'm doing a SQuAD again, reading comprehension. So here you can have
paragraphs of texts and questions and you want to batch these paragraphs and questions together in a
way that minimizes padding computation, right? You have to get all of them to a fixed length in
order to pass them into tensor operations. But if I batch together a very long paragraph with a very
short paragraph, then I'll be spending a lot of time on padding computation. So again, I guess maybe
that's more applicable to RNNs than it is to transformers, but even still, you can get gains if I
batch, in a transformer, if I have fewer things that like, if I batch together, all of my short
things, I will take less computation than if I put the short things with the long things, even in a
transformer.

</turn>


<turn speaker="Matt Gardner" timestamp="21:40">

And this kind of smart batching just happens for you automatically in AllenNLP. You don't really
have to think about it at all. It just, you just get it. And there are other places, other things
like this where complex data processing is just nicer. I would say in AllenNLP, another thing that I
pushed for, I don't know what people think about this, but I think it's really helpful to think
about your model in higher level terms than the low level tensor operations. So for instance, in
say, let's take BiDAF. This is a bi-directional attention flow model, which is on SQuAD a few years
old, but that's okay it can still demonstrate the point here, basically what we're doing is we're
encoding our inputs and then we're aligning the inputs. Then maybe contextualizing them a little bit
more and then predicting something, predicting a span, and that there are options for how to do each
of those low-level operations. But thinking about it at that higher level helps you understand
what's going on better and can help you write easier code, I think. And especially if you want to
experiment with, well, how should I contextualize this? Or how should I align the sequences? So
AllenNLP is designed such that these higher level operations are abstracted and you write your, or
at least you can write your model code using high level abstractions that let you think at a higher
level about what your model is doing and experiment easily with what's going on inside those
particular operations.

</turn>


<turn speaker="Matt Gardner" timestamp="23:09">

Another example of this is span representations. So this is probably a less appreciated modeling
technique, but I think it's pretty useful. Our co-reference resolution model and our semantic role
labeling model. Again, the underlying modeling ideas here are due to Kenton Lee and others Luheng He
and others of Luke's students, but the abstractions in the code we make it very easy for you to get
representations of spans of text from any encoded inputs. And so the semantic role labeler just gets
a representation of all spans and then scores them and potentially labels them. The co-reference
resolution model just gets representations of spans gets pairs, and then finds possible antecedents
gets pairs with them, gives a pairwise score, but the base like things become very easy. When you
have APIs that just give you span representations and AllenNLP has code that does that. So there,
when things get complex, I guess is my point either on the data side or on the modeling side,
AllenNLP tries to provide abstractions and APIs that help you to do these things easily.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="24:20">

I guess one thing to add here is I really like this example that you gave Matt I guess this also
allows us to use these abstractions across models, right? I mean, if you thought of span
representations for co-reference resolution and you're building some sort of reading comprehension
model later, and you believe that this same span representation can be used, you could reuse a lot
of that code in your reading comprehension model as well, right. I think that's a greater advantage
here.

</turn>


<turn speaker="Matt Gardner" timestamp="24:46">

Yeah. Yeah. And it's related to something that was an initial motivation for AllenNLP though I
haven't seen it done quite as much. Say you're someone who's developing a new way of representing
spans. Your research contribution is a new, I guess, backing up Kenton Lee had a particular way of
getting a representation for each span, given the encoded inputs that like did a self attention
essentially trying to find the head of the span and then doing a weighted sum of the span, the
individual tokens in the span given this head, this distribution over which word I think is the head
and that's your span representation. So anyway, if you have some new idea of how to do this, if I
have a collection of reference implementations for models, for a bunch of different tasks that all
use the same API, then all I have to do is implement a new implementation of the span representation
encoder or whatever, it's called. And then I can just retrain all of the reference implementation
models that just use this API with my new idea and I get my experiments really easily. And it just
makes it much, much easier to do general cross cutting NLP experiments in a way that I think is
really hard without something like this. I haven't seen this done that much, but like Elmo for
instance, the Elmo experiments were run before AllenNLP was actually done. But that paper would have
been much easier given the APIs and the reference implementations that we have now.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="26:13">

I guess, pushing this a little further, I wonder if it makes it easier to think about new research
ideas given these abstractions.

</turn>


<turn speaker="Matt Gardner" timestamp="26:20">

Possibly, I guess, definitely like if you're thinking at a high level on what are the basic
operations that a model does. And I think like what are different ways that I could do these basic
operations then sure. Yes. It helps you come up with different ideas. The reason I say possibly is
that there's also the case where the abstractions kind of box you in to a particular way of thinking
about and might keep you from thinking about other kinds of research ideas that might be very
useful, but the library is not designed to make easy. And so they just don't get done. And on that
note, that's why it's important that the library should be easy to break out of if you need to break
out of it and do something that it wasn't originally designed for and AllenNLP at any point that you
want, you can use your own trainer if you want to do different kinds of training things. The model
implementation is really just plain PyTorch. You could do whatever you want and PyT torch. You can
forget about the model abstractions that we have if you want. And so everything's still works if you
need to break out of the abstractions.

</turn>


<turn speaker="Matt Gardner" timestamp="27:25">

I guess one final thing that I will note with, like why you might choose AllenNLP is something that
we talked about earlier, like serving demos. We try to make this really easy similarly because we
use these common abstractions. It's actually pretty easy to write general techniques for getting
model interpretations, for instance, it's a little bit questionable how useful or accurate the
interpretations are. That's still in an area of active research, but if you want to experiment with
these things, because we have reference implementations of a lot of models that use a common API, we
can write common abstractions for getting a model interpretations that just work across any of the
models that you might want to do. And so if you want to do these kinds of things, then again,
AllenNLP might be a good choice.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="28:13">

Another thing I would add is that as a user of AllenNLP one thing that I really like is the testing
framework. I really like writing tests for my research code, which is something that I started only
after I started using AllenNLP instead of other frameworks. AllenNLP does provide some basic tests
that you could you could run as soon as you write it on model. Right. And I find that pretty useful.

</turn>


<turn speaker="Matt Gardner" timestamp="28:40">

Yeah. Our philosophy there is that your data processing code should have concrete tests to make sure
that, the outputs that you get are actually what you expect given the inputs, which is really
important, just so you don't have any data processing bugs. And then once you have that simple data
test, it's really easy to write. We have built in a test for models that just make sure that the
model can run. We take the data that you gave us. Hopefully it's like a data file that has like five
examples or something, just something very small. So it runs very quickly. We load that data, make
sure it loads, make sure it gets passed to the model correctly, make sure the model can actually run
on that data, that it returns a loss that we can compute gradients for. And that all of the
parameters that you've specified in your model have non-zero gradients. And so, yeah, we can, this
is built in, you get that for free with like three lines of writing a test class for this. And so,
yeah, you're right. That's another feature if you, this kind of test driven development, which I
would encourage for those that don't have a software engineering background, this is definitely
something that helps you a lot as you're writing code.

</turn>


<turn speaker="Carissa Schoenick" timestamp="29:52">

Great. So this library has come such a long way over the last couple of years. And with, you know,
the release of this new version, there there's so much utility for so many aspects of NLP from
learning it and exploring it to actually experimenting with it. And I'm wondering, you know, what's
next? Like what's coming up for AllenNLP.

</turn>


<turn speaker="Matt Gardner" timestamp="30:11">

Yeah. I think we've hit on most of the things throughout this conversation about what's coming next.
So a big one that we're focusing on right now, which is only partially going to be in the 1.0
release, but will be in the next release is performance. We're trying to make things a whole lot
faster by, as I said, reducing boiler plate and overhead in data processing mostly so that you, I
guess a little bit of detail on that. If you have your main process loading data that stops the GPU
from running. And so you get low GPU utilization, if you're using a single main process to do all of
your data loading. And so one thing we did to fix this was switch, we had written our own custom
data processing code. We switched to using native PyTorch data loaders, where they already have some
multiprocessing built in.

</turn>


<turn speaker="Matt Gardner" timestamp="31:00">

And this as a side effect also makes it very easy to fit into the rest of the PyTtorch ecosystem.
Like PyTorch lightning assumes you have a data loader, a PyTorch data loader. And now because we've
switched to using native PyTorch stuff, it's a lot easier to mix and match whatever you want with
AllenNLP and other libraries. So this also is driving some of the performance gains that we have
seen so far and are still working on. As I also said earlier, we're thinking about what other
reference implementations can we build. Vision and language, vision plus language kinds of things is
something we're thinking about a lot. Bart, So better sequence to sequence support in terms of Bart
and other maybe even T5. I don't know, we'll see what we get to, but like a reference implementation
of a summarization model for instance, is something that you should expect to see pretty soon in
AllenNLP.

</turn>


<turn speaker="Matt Gardner" timestamp="31:50">

And in general, thinking more about what kinds of reference implementations for other models might
people want and use, and can we build them? And also how can we do better at highlighting what other
people have implemented and pointing to it. Instead of having to build all of the reference
implementations ourselves. I mentioned that we built this AllenNLP guide it's live now, but it's
only partially complete. So more stuff, more content is coming to the guide in terms of, in both of
the sections that I talked about befor like what abstractions are there in AllenNLP, how do you use
them better? And what tasks can you do? Some examples of how to do different tasks with AllenNLP and
something that isn't concrete yet. But I'd like to see more of is better use of our demo. We
currently only show for a demo, the output of a model on a single instance. I think there's a lot
that we could do. If we take as input a dataset, we'd have to, precompute a bunch of stuff, but you
could imagine demos that show a model and like its output on a whole dataset, summarizing things and
interesting things there that we can do, that's farther away. Definitely. But it's something that I
would like to see.

</turn>


<turn speaker="Carissa Schoenick" timestamp="33:03">

Great. All right. Well, thank you so much, Matt, for giving us some great insight into what's new
and what's coming up for the AllenNLP platform. Listeners can check it out at Allennlp.org. You can
follow along with AI2's research and our new releases at Allen_AI on Twitter, or visit us on the
web@allenAI.org.

</turn>


<turn speaker="Matt Gardner" timestamp="33:23">

Thanks

</turn>
