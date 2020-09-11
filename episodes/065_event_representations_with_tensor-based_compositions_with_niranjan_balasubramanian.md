---
title: "Event Representations with Tensor-based Compositions, with Niranjan Balasubramanian"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Niranjan B."]
number: "065"
tags: []
description: TODO
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar we are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:11">

All right. Today our guest is Niranjan Balasubramanian who is an assistant professor starting on the
tenure track position this fall at Stony Brook University, congrats. Niranjan has done a bunch of
work on extracting information from text and trying to reason about it. Niranjan welcome to the
program.

</turn>


<turn speaker="Niranjan B." timestamp="00:27">

Thanks Matt for having me and thanks Waleed for having me, it is exciting.

</turn>


<turn speaker="Matt Gardner" timestamp="00:32">

Yeah. Today we wanted to talk about a recent paper that you published at AAAI 2018 called Event
Representations with Tensor-based Compositions. And this work is I guess a continuation of a long
line of work that's been kind of on the outskirts of NLP but has been looked at for quite awhile on
script learning and event sequence induction kinds of stuff. So, you Niranjan can you give us a a
description of like what's going on here, what the setting is?

</turn>


<turn speaker="Niranjan B." timestamp="01:04">

Yeah, I think I like the characterization that you made that, you know, sort of on the outskirts of
NLP but I would sort of say it's a straddles NLP and generally I can sense a space of trying to
model even sequences. So there is a line of work in information extraction. People are interested in
trying to extract information about events, especially when they appear in news articles. One of the
sort of stumbling blocks we have in the space is sort of figuring out what to extract. So that's
sort of the central challenge that and then figuring out how to provide examples on what you want to
extract. So from that viewpoint you can think about this problem space as a way of providing
automatically some canonical descriptions of different types of events.

</turn>


<turn speaker="Niranjan B." timestamp="02:00">

So, one example, they often talk about that comes from Nate Chambers' original work, original work
2008. Is this thing about, you know, there is an analysis happening or an analysis scenario
happening. What are the kinds of information would you like to know about this scenario? Sort of two
key types of information perhaps, or which entities are participating in this event and what are the
specific actions or rules that they are playing in this particular event. So that sort of from an
information extraction angle on what types of information you want to extract about events. So
that's sort of, you know, one NLP angle to this problem. We brought an angle, I think coming from a,
the AI space sort of starts from the a canonical example, really starting from, you know, Schankian
scripts, where the idea is how do we build understanding of commonly occurring situations?

</turn>


<turn speaker="Niranjan B." timestamp="02:55">

What kinds of data structures do you need to pack this information and how do you acquire this
information automatically? So Schankian scripts were sort of proposed as a way to, you know, build
equip AI agents with knowledge that they would need to reason about a common situations. Rather
these situations are described in books or whether the agent is actually out in the world. The idea
is how do you say it in reason about situations? So that's sort of the AI angle that we can tell a
little bit more specific into the zip type services and product question deduction.

</turn>


<turn speaker="Matt Gardner" timestamp="03:30">

Yeah, thanks. I think another thing people might be more familiar with is FrameNet. So FrameNet here
is a resource that specifies a whole bunch of different kinds of like atomic events that could
happen, like a buying event or a selling event. And those might actually be related in some sense.
And then what, what typical participants are. And I think a good way to think of this notion of
scripts is a canonical sequence of frames. Does that fair?

</turn>


<turn speaker="Niranjan B." timestamp="04:02">

Yeah. Yeah. I think that's great. That's a, that's a fair characterization. In fact I really liked
this paper that Ben Van Durme and Francis Ferraro, I think they had a couple of years back where
they sort of propose a unification of the different frame like structures you could get out of
texts. So starting from syntactic you know, predicate arguments, structures to move pragmatic ones
to FrameNet style frames and to these narrative frames, which is what scripts in my head are. So I
think all of these things, I think these come from some sort of original categorization that Minsky
gave in the 1950s. So there's notion of Minsky frames where you sort of talks about these four
different sort of varying levels of packing information about situations that are described in
texts. So I think, yeah, that's a very good characterization. I would say like, you can think of
FrameNet frames as being sort of describing atomic events on the structure of the entities and the
roles they play and then the scripts can be thought of as sequences of these frames that hold
together in some disclosed structure describing the scenario.

</turn>


<turn speaker="Matt Gardner" timestamp="05:14">

And let's say we had some resource hypothetically that contained, I don't know, some like large
fraction of any possible narrative frame or event sequence. How would this actually be useful to
some kind of autonomous system or, or NLP system?

</turn>


<turn speaker="Niranjan B." timestamp="05:33">

Well, an example that they often give is trying to read between the lines when you're reading news
events. So one example can be, let's suppose you're reading a news story that says you know, Ahmed
Abdi Godane was killed in an airstrike. Yeah, let's say some al-Shabaab announced as successor you
know, some X, okay. So now I can ask you a question. Who was the former leader of al-Shabaab, right?
That's not explicitly mentioned in text, but we sort of know how to sort of real world scenarios
happen. That is the leader of a particular organization is removed for whatever reason. Then you
have the successor taking that place. And so even though the information is not explicitly said in
text, we have, we sort of bring our expectation for how these scenarios unfold and sort of fill in
the missing lines there. So you can, you can expect information extraction systems that are
augmented with these scripts to be able to provide you answers about what is not explicitly said in
the text itself. So that's one application.

</turn>


<turn speaker="Niranjan B." timestamp="06:44">

Another possible application is being able to say, can you summarize a news article? So you get a
news article about a particular event. How do you know which pieces of things to talk about an
extract. So if you again, are able to map this event to some kind of a script that you know about
then it sort of gives you an expectation for what things to talk about by appealing elements in the
script. So that's another NLP application we got.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:15">

Yeah. The first point you mentioned sounds very relevant to a lot of work on a common sense,
understanding which AI-2 is focusing a lot on but also other places. It seems to be an important
problem everyone is trying to tackle in this. This is an interesting angle to look at it. Oh, one
thing that I am wondering about is how fluid these scripts are. Do you think of them as discrete
objects or do you think of them as like a versatile, hard to like basically infinite number of
possibilities of combining events?

</turn>


<turn speaker="Niranjan B." timestamp="07:54">

Yeah, I think that's an excellent question. My thinking on this has shifted or evolved along with
the deep learning based continuous thinking a little bit. So earlier we used to, I used to think
about being able to you know produce scripts or schemas that you know, broadly are representative of
any news corpus that you have. So that should work as long as you, you're producing scripts that
characterize type world in some reasonable

</turn>


<turn speaker="Niranjan B." timestamp="08:25">

In level of coverage. I was happy with it, but then I think now sort of rather than thinking about
script knowledge is something static. Now I think about them as sort of functional knowledge pieces.
So what do I mean by this? So we have an upcoming paper hopefully in EMNLP where we are talking
about how we could have a generated model that can take any particular sequence of events that you
are saying is happening right now and make predictions about what is going to happen in the future.
And there's a lot of controllable script generation. So if you imagine if you imagine that the model
has learned various types of scripts, now we can actually extrapolate to a new situation that it
hasn't, that it hasn't necessarily seen in the training data. So I think we can think about infinite
possibilities here with this model, limited to the amount of generalization that our current models
can give us. But we definitely, now I'm thinking about them not as completely a finite list of
discrete structures, but as something that's continuous where you can that is much more fluid where
you have more ways to control what is going to happen later by sort of changing the beginning
conditions. So to speak,

</turn>


<turn speaker="Niranjan B." timestamp="09:46">

I hope that sort of makes sense. If you feel like, I can give you an example that just to concrete
things together. So one thing that we that we can do now is to say let's suppose you have a protest
that is happening, right? People are marching, they're carrying slogans, etc. Now in the real world,
this protest can unfold in multiple ways starting from that point. Right, if somebody starts
throwing rocks, it can turn into a violent protest. If they had a plan and they stuck to that plan
and there is no violence, it becomes a peaceful protest and sort of, you know, reaches the end
point. So there are sort of two possibilities for scripts here. So what we can do now is to take
models sort of starting points or, you know, previously happening. And then you can say, give me a
script, or tell me what is going to happen if this particular thing happens, which is that somebody
is throwing rocks. What is going to happen next? Right? So we're able to. at least we have a
semblance of a model that can start to account for these minor variations In the, in the expected
unfolding of the event.

</turn>


<turn speaker="Matt Gardner" timestamp="10:54">

So what I wonder at this point then FrameNet and similar resources, FrameNet is great in that it
gives it a nice detailed accounting of a particular kind of event, but it's pretty limited in that
its coverage lacks a whole lot of things that are like part of the human experience. And so there
are lots of events that you might want to describe and frame that that you just can't because
there's nothing there. Similarly if you take this up, the FrameNet approach to defining narrative
frames, you're going to have a hard time capturing the kinds of fluid non-discreet events you were
just talking about. So how then do we model this? Like what's the approach to learning the set of
possible frames? What's going on here?

</turn>


<turn speaker="Niranjan B." timestamp="11:40">

Yeah. So I think at least sort of going back to this particular paper where we show, these types of
compositions, I think we have this problem somewhat in the sense that what you're saying is to the
extent you are able to give me a word embedding level knowledge about a word, right. We can use that
to, you know, to generalize, to make predictions about what is going to happen next. Even if we
hadn't seen, even if we hadn't used that particular word during our training. So we're not
necessarily limited by the kinds of events we saw in training. So I think the generalization, the
key generalization that is, as long as you are able to give us a new word, we can extract a pencil
based representation of events involving that word, even if we haven't seen it in the training data.

</turn>


<turn speaker="Niranjan B." timestamp="12:34">

So that sort of gets at this a little bit, but there are many, the general sense of the problem that
have many events perhaps that you don't even see described in text. So that is sort of still beyond
the scope of what are looking at. One thing, I mean that gets to the bigger issue, which I'm very
interested in looking at in the future is how do you combine knowledge you can derive from grounding
outside of the experiences of the agents and real world and connect them to what you know in text.
So that is clearly some of the things that the AI-2 project to start tackling, in terms of common
sense things we can't really directly extract from text. How do we connect them with things that we
can extract from text. So I think that's a bigger gap. But yeah, so I think there's still, even
within the text scope, I think we could, if we frame our problems carefully, I think we can We can
aim to generalize beyond the sort of set of events that you've seen in training data.

</turn>


<turn speaker="Matt Gardner" timestamp="13:31">

Yeah. So I guess if I can rephrase a little bit, your general approach is let's take a big pile of
text, find event sequences in it and try to group them together somehow such that we can get a model
that seeing some initial sub event. So some initial events in a sequence can predict what's gonna
come next. Like it doesn't ever have the nowhere in this model can you like enumerate all of the,
all of the narrative frames that it's captured, unless I'm misunderstanding. But I, I'm just trying
to do some kind of like fostering some like let's group things together and get a model that can
reproduce the sequences that I saw in text and hope that that gives me some notion that something
like a narrative frame, even though it'd be hard for a human to inspect.

</turn>


<turn speaker="Niranjan B." timestamp="14:20">

Yeah. So I think the, the clustering of this grouping is implicit in the model, but you can ask the
model to generate. So one way we evaluated it in the paper, is actually to say even this starting
scene that sort of describes a scenario that starts with this particular event. Can you tell me what
is likely to happen? In this particular paper we don't have a lot of controllability about how the
script should proceed with model just gives it it's nearest neighbors, so to speak. Once you have
the event representation and then we could, you know, we do some massaging of the arguments and then
out comes, something that looks like a case of events schema, which is basically a set of
relationship goals, but some argument overlap between these papers. That you could claim, right, is
sort of one instance. If you read through all the schemas the model knows about, right? So you can
basically give various starting points and then it will give you a different schema. So there's
really no explicit clustering of scenarios or explicit processing of the answer, but it's sort of
implicit in the model, but you can expect the model to get get at this.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:34">

Could you elaborate a little bit on how the schema looks like?

</turn>


<turn speaker="Niranjan B." timestamp="15:38">

Yeah. so schema is really, in our case, a subject relation and an object circle. It consists of
these two posts. Okay. So we can do a couple of base schema. So you can start with a seed tuple
where you have a specific subject and a specific object. So meaning you can see something like
"police arrested John." So that could be a starting point for your schema. And then the model will
start producing other relation tuples that are likely to happen if somebody gets arrested as well.
You get a list of these tuples. But now the tuples can contain perhaps dissident grounded entities.
So this is something that we did not explicitly address in the paper. What we did was a basic hack
to say in the embedding space while these tend to be similar to each other and we do some course
hack to figure it out, which slides should be coded, I think for the same entity. So at the end of
this process, what we get is the schema that looks something like this X arrested Y. And then you
would say something like, Y faces charges. and then Y, denies claims, et cetera. Actually you sort
of get these generalized, list of tuples that we cut off at some point and claim that as a schema.

</turn>


<turn speaker="Matt Gardner" timestamp="17:07">

So if I can summarize the discussion so far, I think we, we've done a good job motivating why you
might want to care about frames or narrative frames, what line of work this falls in. And then
moving to like the specific contribution of your paper, your setting is, I'm going to take a bunch
of texts, I'm going to extract events, what we'll call events, which we're really just representing
as subject verb, object, triples. Quick side note, what if there's no objects, do you also count
intransitive verbs subject verb, null?

</turn>


<turn speaker="Niranjan B." timestamp="17:38">

So yeah, so we go with them at this point.

</turn>


<turn speaker="Matt Gardner" timestamp="17:41">

So we have a bunch of subject verb, object, triples, and then I'm going to take these events and try
in sequence in a large corpus and try to learn a representation of these events such that I can
easily extract out narrative chains from them. Is that, is that a fair characterization? Yeah. Okay.
So can you tell us about how you learned the representation of the events?

</turn>


<turn speaker="Niranjan B." timestamp="18:03">

Yeah. So, all right. So the idea being we want to the producer and embedding representation of an
event, which is as you said, is the triple now, right? It's 2018 our starting points are word
embeddings right? So for each of these elements we have word embeddings and we just need to figure
out a function that combines the user code embedding to give us the event. There have been a couple
of ways that this function has been explored. One is using a regular feed forward network because
you just have these three fixed elements in our embedding. So you can just have a couple of feed
forward events producing some sort of basic thing to imply that some related work as look at this.
There's also looking at this like, and as a sequence of events. So you sort of mark each entry. You
say you have your subject the followed by the predicate followed by the object, and then you get
another event and its subject it's predicated and it's object and so on. So you can think of this as
a sequence of events, which naturally can be encoded using some kind of RNN, a usually using some
kind of a LSTM. So there be sort of these two approaches to do this before.

</turn>


<turn speaker="Niranjan B." timestamp="19:22">

The sort of primary motivation for the specific idea we had, which is using sensors to produce this
composition is that we noticed that these, at the core screen, even though these models are
infinitely powerful, they largely seem to be just doing some kind of additive compositions. Meaning
they produce a transformation of the subject into some space. They produce a transformation of
predicate and then the sort of these are added together like with some gaining and what not. But at
the end of the day, it's still an narrative composition. And the issue that comes up is that they
don't, they fail to sort of distinguish between usages of predicates in different contexts. So our
idea was to say, let's use tense compositions, which give us a way to account for the interactions
between all three elements in the triple. So meaning if the subject or the object slightly changes,
then that should actually result in a big change in the final event embedding. Maybe I sort of went
into why we chose the specific idea as well, but that's sort of the starting point for me why we
should have looked at the tense-based composition.

</turn>


<turn speaker="Matt Gardner" timestamp="20:35">

Yeah. And that's great. You had a, you had a great example in your paper where she threw a football
evokes a very different kind of event than she threw a bomb, which only differs in the object. And
so subject predicate are the same if you're taking some kind of additive or averaging kind of model,
you might think that she threw a football is similar in some sense to she threw a bomb, but they're
very, very different kinds of things.

</turn>


<turn speaker="Niranjan B." timestamp="21:02">

Yeah. Yeah. So there are examples like this that I actually even looked at when we were producing
the, this sort of discreet concrete models early on. So one of the other examples we were thinking
is where you might have, you know, fire spreading to a neighborhood and fire spreding to a forest.
These are these are still very similar events in the sense that there's fire happening, right? But
they're really distinct contexts because fire spreading in a forest is very different implications
then fire spreading in a neighborhood, right? So you might talk about buildings getting damaged and
maybe victim whereas in the forest. Maybe you just talk about the size of the area that gets
damaged. And you know, the control mechanisms can be different and so on. So this this sort of code
issue of disambiguation the same predicates can be used in different contexts. This gets at the word
sense type issue by for course, script level problems.

</turn>


<turn speaker="Matt Gardner" timestamp="22:02">

And so then your main contribution here is a new way of parameterizing this model such that you're
handling these interactions in a, in a smarter way. Can you tell us about exactly how you do that
without getting into too much low level math?

</turn>


<turn speaker="Niranjan B." timestamp="22:16">

Sure. so the, I think the way to the starting going to see, let's go back to that example. She threw
a football and she threw a bomb. What you want is some kind of a conjunctive symantic, meaning every
element should contribute to the final representation that we should have this attitude effect. So
one way to do this, this like really go in with a multiplicative interaction between all the
elements in your in your triple.

</turn>


<turn speaker="Niranjan B." timestamp="22:46">

The sort of composition is a mediated way of producing this, you know, some parameterized way of
producing this representation as you mentioned. So one way to think about a pencil based composition
is that you have, once you have a tensor, let's say that represents a particular predicate, right?
You can feed it two vectors, which is going to be your subject and object. And this tensor that is
some operation that attends a base compression operation, which produces another embedding, which
now represents the semantics of the entire event. So it represents the semantics of the predicate
subject and the object together. If you inspect that contraction operation, you will see that every
element, you know, embeddings or sort of multiplied together with some entries in the predicate. So
you have this multiplicative interaction that we want it. Now, the challenge though is how do you
get these predicate tensors right? So the tensors the way at least we've set this up is they're
basically,

</turn>


<turn speaker="Niranjan B." timestamp="23:48">

Going to be a proportional to the size of your input dimensions. So you're going to have, a huge set
of parameters that you need to learn, but every predicate, which means you need to have seen many,
many examples to get predicate specific tensors. So there's been some work on this before and there
have been some approximations to this, but I think our key in psych or something that made us think,
okay, this is perhaps doable, is sort of observing that, look, we already have some knowledge about
these predicates in terms of wording embedding, why not start from there. So we have some
information about the predicates ant the embeddings and we can be turned that into you know, a
predicate tensor. So that's really where the sort of central idea comes, comes up. So Noah Weber my
students you came up with.

</turn>


<turn speaker="Niranjan B." timestamp="24:34">

So we were discussing the say, okay, how do we infuse this? And sort of he came up with the first
way we can think of in terms of accomplishing the scope. Like we will just infuse information in the
predicate to the and turn it into a tensor. So we ended up having what he calls it, a base tensor
and the scaling tensor. The base tensor sort of can be thought of as a canonical tensor that you
know, that just describes what a predicate does in general. So you can initialize this you know,
predicate the base tensor. And then you have a scaling tensor, which is I think what takes our
predicate tensor and takes that information in the predicate embedding and infuses it into the base
tensor. So without getting into the math. And so I think basically those are the two functions that
these tensos and the at the end, what you get is the information that's packed into the predicate is
now turned into a tensor. And then once you have these tensors, now we can produce embeddings, but
the whole whole process is now you know, we don't have to learn, predicate specific answers. So we
be reduced to problem to just learning two parameters for two tensors. I hope that made sense.

</turn>


<turn speaker="Matt Gardner" timestamp="25:48">

Yeah, I think that was about as clear as you can get in audio. If listeners want more detail, you
can go look at the paper. So can you tell us about how you train all of the parameters of this
model? What's your learning objective?

</turn>


<turn speaker="Niranjan B." timestamp="26:02">

Yeah, so our goal, the tensors that we learn are supposed to produce good event representations. And
for this purpose, right, as soon as you want to train then you need to define what they could event
representation is we sort of starting from the objective for producing scripts so long, you know,
that's our big goal is to produce a scripts. So given that one objective that we can define is are
these event representations able to predict what other events are going to happen in the future? And
so that becomes a national predict event objective that we can come up with. Another one could be,
you know, given this event that you extracted from a sentence, can you predict other words a
meaning, other important information that sort of complete this event can predict that. The sort of
more like a language modeling type of an objective. So we use those two types of objectives to train
these tense of base models.

</turn>


<turn speaker="Matt Gardner" timestamp="27:05">

And how well does it work?

</turn>


<turn speaker="Niranjan B." timestamp="27:07">

Well, it seems to work better than those couple of baseline models. We've evaluated the
representations using some existing event related process as well as for testing whether they are
able to produce some reasonable schemas. So we evaluated on this task called transitive sentence
similarity, which is basically you can think of this as having a couple of events or simple
sentences and you're trying to measure if the sentences are semantically similar in some sense.

</turn>


<turn speaker="Niranjan B." timestamp="27:45">

So if you're producing a reasonable event representation, then you should be able to distinguish and
do well in task. But this task necessarily isn't that hard a or it doesn't really evaluate one of
the core capabilities of our task. So we created this subset, which we call as hard similarity with
the express purpose of testing, whether the model can distinguish these predicate usage differences
in different contexts. So we give a, so let me give an example. Maybe it's easy. So you can come up
with event you can come up with event pairs.

</turn>


<turn speaker="Niranjan B." timestamp="28:26">

One example is. Well let's, let's take the she threw the bomb again okay, you have "she threw bomb."
And "she, threw football," you can see that these two even triples, have two elements in common.
It's just the object that's different, right? So these two event pairs or on the surface level
highly similar, but semantically they come from a different sort of scenario space. So this is a
hard example. Another version of the hard example is when you have a two event pairs, let's say, you
know she threw a football or, and something like that. Jane made a pass, right? So both of us are
probably semantically similar in that they probably don't think the same event. Plus they are also
both in the sporting context. So the lexicon very dissimilar all of the elements of different. But
they are similar. So we created event pairs like this and then we tested our model and some of the
existing ways of doing this. And on this model, on this particular task the tensors actually do a
much better and sort of, I think shows that the tensors are able to capture these deference in
predicate users.

</turn>


<turn speaker="Matt Gardner" timestamp="29:45">

But this, this kind of evaluation just looks at single events in isolation. Right. And what you, I
think what you really care about are these narrative chains.

</turn>


<turn speaker="Niranjan B." timestamp="29:54">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="29:54">

So how do you evaluate that kind of work?

</turn>


<turn speaker="Niranjan B." timestamp="29:57">

So one thing we did is a also evaluate in terms of the narrative close tasks. so there many variants
of this? So by the way Nate Chambers who's also a part of this project in sort of with whom we've
been collaborating with over the last two years on this work, he has an extreme dislike for how the
narrative close task has veered away from original goal. But it's an automatic evaluation that you
basically have a set of events that have been extracted from text and you hide one of the events and
you ask it model if it's able to predict this event. Right. So that gets at some automatic way of
evaluating this ability to produce event sequences.

</turn>


<turn speaker="Matt Gardner" timestamp="30:41">

Sorry, one sec. Is this essentially the same as like you can imagine a notion of event perplexity so
just like we have word level perplexity for language models, you're essentially saying, what's my
perplexity on predicting subsequent events? Is that what's going on?

</turn>


<turn speaker="Niranjan B." timestamp="30:56">

Yeah. So, yeah, so I think are equal and interested in measuring the measures you said differently,
not necessarily perplexity, but the idea is still the same. Yeah. So on this task again the the
predicate this tensor approach works better than by that two models. We did some cleanup of the
narrative close task to try again. So one of the things that played this automatic narrative close
is that it's usually dominated by frequent words like "said," "tell" and so on, which is not very
informative. So we do some filtering to remove those. We also did some manual inspection of the sets
that we evaluate on and remove noises and extraction editors stuff like this. So we have a cleaned
up portion of that task where we evaluate an, it's sort of a multiple choice evaluation there.

</turn>


<turn speaker="Niranjan B." timestamp="31:53">

We also evaluated the model for the ability to produce event schemas. So we have a very simple
method for producing event, schemas, even, in event representations. So if you'd give us a starting
point for your schema or a script, we then, you know, produce a representation of it. And in the
embedded space we collected its nearest neighbors and then we rank them. And then we, as I said
earlier, you can sort of massage the entities so that you produce something that looks like a
narritive script and we manually validated the scripts that we can create this way as against as
opposed to scripts that you can create with other forms of producing event representation. So the
script representation procedure stays the same, but the event representations we use are different
and we compare the models with manual evaluation there and we see some gains there. I think there's
definitely more to be done in that space. I can talk about that more.

</turn>


<turn speaker="Waleed Ammar" timestamp="32:52">

And how do you do the inference for the close task? So you have a few events before and after and
you'd like to predict what's in the middle. So how do you do the actual inference here?

</turn>


<turn speaker="Niranjan B." timestamp="33:03">

So in this case, we sort of let me make sure I'm saying the right thing here. So there two ways to
do this, so one is to without objective the objective function. Basically says that can be learned
tensors that actually a predictor of neighboring or neighboring words. But you also get in a
representation, so you can either use the full model to produce the to produce the next event. Or
you can take the representation you get and then you can look for the neighbors and see which
neighborhood has the highest cosign similarity with this representation you have. So in this case,
we use the ranking that is induced by the similar event representations.

</turn>


<turn speaker="Waleed Ammar" timestamp="33:56">

And the missing piece for me is the combination. How do you compose the multiple events that are
surrounding the one that you're predicting?

</turn>


<turn speaker="Niranjan B." timestamp="34:05">

I think if I remember right, we just do the simple averaging that we don't have the model that we
don't have a sequence model that composes these event representations into a final representation?

</turn>


<turn speaker="Matt Gardner" timestamp="34:18">

Yeah, that's, that's what I would've guessed to from reading your paper because you, the way you
generate the change is by finding nearest neighbors. So it seems reasonable to like do an average
and find the nearest neighbor.

</turn>


<turn speaker="Niranjan B." timestamp="34:28">

Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="34:30">

So how do you see the line of work on a script generation and also like identifying scripts as like
a, a thread of events. And how's this related to this course analysis? There's a rich literature on
trying to understand the discourse in the document.

</turn>


<turn speaker="Niranjan B." timestamp="34:48">

Yeah. So I think definitely the starting point, I think for both types of problems is really the
texts that you have. So in some sense, while we are learning scripts from texts, the discourse
organization of events is not necessarily the sort of the order or the sort of a way in which you
would want scripts to look. So I'm trying to make a distinction that discourse relations are great
and they faithfully model how the discourse is present in the text, but it's not clear. In fact,
there are many competent examples you can use for why discourse level arguing or what gets presented
in discourse is not necessarily what is useful from a script perspective. So the sort of biggest the
clearest example I can give is news articles right, so news articles. The way information is
presented is presented in a way to connect with the news reader in certain ways. You want to
establish the context there is a specific structure in which the news article is presented. But if
you were to sort of do some reverse engineering from that structure to figure out what is the order
in which the events happen and what are the most important things to know about within this event
context, it's, there's not a one to one alignment necessarily.

</turn>


<turn speaker="Niranjan B." timestamp="36:15">

So I think while they are connected in the sense that they're using both the same starting points,
type this for scripts. I think we need to do a much more to figured out what to extract and what
becomes important. And I think from discourse, this is not to say that this this is not to say that
discourse is not relevant prescription. It's much more relevant because once you understand the
discourse relations, I think it's going to inform a script generation and very important. This is
something that we are completely ignoring so far, but I think one of the things that Nate and I have
been funded for an NSF project on this idea is to actually use discourse situations to improve
script modeling. So one thing we don't do now is, you know, simple things that I shouldn't say
simple, but things like co-reference event co-reference you know, discourse relations like one is an
explanation on the background, these kinds of information.

</turn>


<turn speaker="Niranjan B." timestamp="37:16">

So we've been interested in models that can incorporate, all these kinds of information. But at this
point we're sort of taking baby steps. So you're saying, okay, given a specific event, how can we
model this? It will be great to think about models that incorporate discourse relations either as
additional supervision signal, or as structures that we can use as part of the input going into
these models.

</turn>


<turn speaker="Matt Gardner" timestamp="37:39">

Great. That sounds like a really interesting line of future work. I guess I see this whole line of
scripts generation narrative frame induction as super interesting, but not quite ready to be used
practically yet. Would you agree with that?

</turn>


<turn speaker="Niranjan B." timestamp="37:59">

So I think it's time that we can start tinkering with these things. So I sort of maybe I'm one of
these newly minded optimists in the deep learning way, but I feel like because you can embed and
push things in the same space, we can start sort of extracting ability or the piece representations
for specific applications. I think we should, my intention is that we should try and I think you
will be suppressed.

</turn>


<turn speaker="Matt Gardner" timestamp="38:29">

Great. Cool. Thanks for the really interesting conversation. It was nice talking to you.

</turn>


<turn speaker="Niranjan B." timestamp="38:32">

Thank you so much for having me. This is exciting. I have some things to think about as I go back.

</turn>
