---
title: "Decompositional Semantics, with Aaron White"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Aaron White"]
number: "094"
tags: []
description: "In this episode, Aaron White tells us about the decompositional semantics initiative (Decomp), an attempt to re-think the prototypical approach to semantic representation and annotation. The basic idea is to decompose complex semantic classes such as ‘agent’ and ‘patient’ into simpler semantic properties such as ‘causation’ and ‘volition’, while embracing the uncertainty inherent in language by allowing annotators to choose answers such as ‘probably’ or ‘probably not’. In order to scale the collection of labeled data, each property is annotated by asking crowd workers intuitive questions about phrases in a given sentence.

Aaron White's homepage: http://aaronstevenwhite.io/

Decomp initiative page: http://decomp.io/"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F689198224&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:05">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allan Institute for
artificial intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guest is Aaron White, who is an assistant professor in the Department of
Linguistics at the University of Rochester. Aaron, welcome. It's nice to talk to you.

</turn>


<turn speaker="Aaron White" timestamp="00:19">

Yeah, thanks for having me.

</turn>


<turn speaker="Matt Gardner" timestamp="00:21">

Today, we wanted to talk about something that you have been working on that you call the
Decompositional Semantics Initiative. Do you want to give us a brief description of what this is?

</turn>


<turn speaker="Aaron White" timestamp="00:31">

Yeah, sure. So, before I actually say anything about the project itself, I do want to point out that
the decompositional semantics initiative, or we often just call it de-comp for short, is actually a
pretty large effort spread across a few different sites. So, I'm definitely not the only one working
on it, but people can check out all the different projects on the website at Decomp IO, which kind
of lists how we mix and match people on each project. But in particular, beyond myself, Ben Van
Durme, Kyle Rollins and Rachel Redinger at Johns Hopkins have been major driving forces in the
project. So, I think what I'll do is, I'll start out first with sort of the overarching goals of De-
comp and then I can say a little bit about how we kind of implement those general goals depending on
your interests.

</turn>


<turn speaker="Matt Gardner" timestamp="01:12">

Right. Sounds good.

</turn>


<turn speaker="Aaron White" timestamp="01:13">

Okay. So the big idea behind De-comp is really to rethink the prototypical approach to semantic
representation and annotation that the field has been hacking on for the last few decades.

</turn>


<turn speaker="Aaron White" timestamp="01:24">

And so, there's basically two major parts. The first is that we're interested in capturing semantic
properties of sentences or really more generally, phrases that are both really simple for one and
linguistically well motivated things you can actually expect to extract from lexical and syntactic
information that linguists think we can extract from lexical and syntactic information. So, if I say
the vase broke, the kinds of properties we're talking about are, is the vase referring to a
particular thing? Well probably yes. Is it referring to a kind of thing? Probably No. Did it change
during the breaking? Probably, yes. Was it volitional in the breaking? Probably, no. The upshot of
having a bunch of simple properties is that everyday people can answer questions about those
properties. And that means we can collect data pretty easily from many speakers. So I said there are
two components. The second major component is that we treat semantic representation as massively
multi label and continuous where the interpretation of the continuity is in terms of likelihood,
right?

</turn>


<turn speaker="Aaron White" timestamp="02:18">

So it's sort of the likelihood that particular properties actually hold. And so rather than building
some big multi-class system with a bunch of nominal categories, we have this sort of multi label
system. And so, you know, this is distinct from a traditional approach where you first defined some
big fairly broad coverage ontology that you're sort of interested in capturing. So if we were
talking about semantic roles, which was one thing that we've looked at, been a kind of traditional
approach and you might take the kind of classic categorical distinctions you get from the
theoretical literature like agent and patient, and then you'd annotate a little pilot data and
realize you need the instrument, you'd annotate a little more, you need stimulus and theme, et
Cetera, and then you'd sort of keep iterating until you are at a point where you're like, okay, I
can write an annotation manual.

</turn>


<turn speaker="Aaron White" timestamp="02:58">

You write your a hundred page annotation manual and you deploy your undergrads to annotate a bunch
of data. The big problem that we saw with that approach is that it often works a lot better in
theory than in practice. And so a big part of it has to do with the fact that with these big
predefined multi-class ontologies, there are agents, there are patients, instruments stimulating
whatever else is in your massive ontology. But that's it. These sorts of predefined ontologies
always have things where there's either no clear label or where you sort of want to give multiple
labels. So you might say, oh, I kind of want to give agent and stimulus to this or something like
that. Right? So what happens in practice is that a bunch of these problem cases accumulate until you
realize you're missing a class that your pilot didn't consider and then you push out b1.1 et cetera.
So our thinking with de-comp is that the only preset ontology is the set of properties we select.
And then you can always grow that ontology whenever you want without re annotating a bunch of data.
So that means that you can accumulate more and more properties and give yourself access to what
looks like from the standard multi-class ontology. Arbitrarily fine-grained classes. Right. And the
properties remain interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="04:01">

That was a good overview. Can we make it a little bit more concrete with a specific example. Let's
take semantic role labeling, which you've been talking about. Once we identify some predicate,
typically a verb, we try to find the arguments of that verb and say what role those arguments are
playing in the sentence. Maybe "Joey refused to eat his vegetables." You could maybe get a little
bit fuzzy with what predicate you're annotating, let's say that refused to eat as a predicate or
maybe some formalisms would split this into two separate ones, but let's say "refuse to eat" as a
predicate. Then we have arguments here, Joey and his vegetables, right? And so a traditional
semantic role labeling would define, as you said, a set of possible roles and then assign up
specific label to each argument in his sentence to Joey and to his vegetables. For instance, Joey
would be the subject role, or maybe agent, depending on exactly how you're defining this ontology
and his vegetables would be the object or theme or maybe there are a few other options you could
have. How would you treat this differently with this decompositional semantics?

</turn>


<turn speaker="Aaron White" timestamp="05:03">

So this is basically the first big data set that we put together under this project. So for semantic
roles, whatever ontology does, agent, patient, instrument, et Cetera. The idea was to kind of
decompose the particular classes, like agent, patient, et Cetera, into a bunch of simple but
interesting properties based on, in this case a particular theoretical perspective. That's due to
David Dowdy on what's known as the linking problem in linguistics. And so I won't go into depth on
what that is, but it's basically just trying to explain how languages, take the event descriptions,
conceptual event descriptions, along with all their participants and map them onto linguistic
expressions. So it's sort of the opposite problem of semantic role labeling. And so, Dowdy's basic
idea actually was that symantec roles aren't really discrete categories. They're really dense areas
and some underlying space, but defined by a bunch of simple properties and specifically simple
properties that humans tend to care about, like causation, intention change, et cetera.

</turn>


<turn speaker="Aaron White" timestamp="05:56">

It gets little more complex than that, but I think that's enough for our purposes. What our group
did, and this is actually work led by Deon Risinger and Rachel Rudinger, who you talked to last
year, what we did was to turn each of the properties into a bunch of simple questions that we asked
about pairs of predicates and arguments. So in the same way that in prop banking you might have
given a zero to, I don't remember who the subject of you're refusing to eat case was,

</turn>


<turn speaker="Matt Gardner" timestamp="06:20">

Joey.

</turn>


<turn speaker="Aaron White" timestamp="06:20">

Yeah, Joey's an A0 and and his peas or whatever a is an A1. In our case what we're going to do is
say, okay well we have the same sorts of predicate arguments structures, right? But what we're
trying to do is actually label articular relational properties. Things like the questions I
mentioned earlier, let's take a non negative case and we can talk about the negative cases later.

</turn>


<turn speaker="Aaron White" timestamp="06:41">

But "Joey did eat his peas" or something like that. You might ask, did the peas cause the eating,
well not really. Joey probably caused the eating right. Did the peas undergo a change during the
eating? Probably yes. Did Joey? Probably not in the same way that the peas did, right? And so this
language of probability and likelihood is actually baked into the protocol as well. So, people when
they're annotating, these sorts of things get accessed, well maybe, maybe not or like yes,
definitely. Or definitely not. Or, I don't know. Like it's not really applicable in this particular
case

</turn>


<turn speaker="Matt Gardner" timestamp="07:13">

And, things like volition. I guess maybe that's related to cause. was this person like doing
something on purpose.

</turn>


<turn speaker="Aaron White" timestamp="07:19">

That's right.

</turn>


<turn speaker="Matt Gardner" timestamp="07:20">

What other kinds of questions do you ask about these arguments?

</turn>


<turn speaker="Aaron White" timestamp="07:24">

One big one is change. So different kinds of change. One thing that linguists have been interested
in beyond changes of state, like some light went from red to blue or something like that. Um, you
might be interested in say whether something was destroyed as a function of an event, whether it was
created as a function of an event. Often agents are neither created nor destroyed as functions of
events. So yeah, like volition is one of them. Another property that comes directly from Dowdy is
sentience. And this is actually a very particular notion of sentience; that is, sentient as an
entailment of what it means to be a participant in that event. So like "Joe broke the vase." Joe Is
sentience, but it's not really necessarily an entailment as a function of the breaking that Joe was
sentient. Right. Because rocks can break vases. Right. And we don't really want to say that rocks
are sentience. The properties themselves were drawn pretty directly from this theoretical literature
and that's actually true of a lot of the other protocols that we've worked on. So this generosity
protocol, as another case of this, that TACCL paper will be coming out on pretty soon

</turn>


<turn speaker="Matt Gardner" timestamp="08:27">

Just to come back to this example again. "Joey refused to eat his vegetables" or "Joey ate his
vegetables." This example is pretty straight forward for semantic role labeling and so maybe it's
not the best example to highlight why you might use this decompositional semantics, but you brought
up, "Joey broke the vase" versus "the rock broke the vase" and here the syntax is identical. The
semantic roles are a little bit more fuzzy because the way that Joey acted on the vase and way that
the rock acted on the vase are very different. It's in these boundary cases where splitting things
apart into these questions really helps you a lot more than the traditional case.

</turn>


<turn speaker="Aaron White" timestamp="09:04">

Right? The classic contrast. It's very clear that Joey is an agent and Joey broke the vase. But like
the rock is not. And so like you could totally imagine a verb that is exactly like break but where
the vase shows up in the subject position. So why don't we have the vase broke the rock where the
rock is being used to break the vase. And so actually this theoretical perspective does quite well
at explaining that sort of patterning because you end up saying, okay, well some of these things
tell you you're going to be better in sort of subject positions and some of these other properties
tell you you're going to be better in object position and say change of state is one of those ones
that is going to tell you, you probably want to show up an object position.

</turn>


<turn speaker="Matt Gardner" timestamp="09:42">

Just to recap for listeners, we've described this general notion of taking what was some complex
formalism and breaking it down into simpler pieces and annotating individual attributes, of some
other formalism talking particularly about this example of Semitic role labeling. And I think in
this discussion we've given good motivation or a good description of one of the two motivations for
this, which is that there are boundary cases that are fuzzy and it's actually better to annotate
this decomposed version of the semantics instead of trying to put it all into one more discreet kind
of formalism. But there was another motivation that you mentioned that we haven't hit on very much.
I wondered if you could say more about the ease of annotation.

</turn>


<turn speaker="Aaron White" timestamp="10:23">

Yeah, so the other big tenant is we want to have properties that allow us to scale these annotation
protocols and scale them in ways where people actually can agree on the answers to the properties.
And so I was kind of giving a caricature of a standard way of going about doing semantic annotation.
Like generally you need fairly highly trained annotators to do even like prop banking. Right? And in
this case, the idea is that anyone can answer, did the vase change as a function of the breaking,
right. It's like pretty straight forward in so far as we want our models to be able to interpret
language the way that humans do or to do tasks that are relevant to language in the same way that
humans can. Then we should be sort of annotating for properties that humans are able to annotate for
with high agreement.

</turn>


<turn speaker="Matt Gardner" timestamp="11:07">

Just to nail down the point, this also lets you get say people on Mechanical Turk, right instead of
trained linguists or whatever, it dramatically decreases the cost of annotation and the complexity.
It's very nice in that regard. Yeah, it's very related to QA SRL. Have you heard of this and QAMR?
It's a question answering representation for semantic role labeling and QAMT is Question Answer
Meaning Representation. These were by Luke Zettlemoyer and students that take a very similar
approach for very similar reasons, but for larger sentence level structures where I think your
decompositional semantics fits more lexical kinds of semantics. Is that fair?

</turn>


<turn speaker="Aaron White" timestamp="11:44">

I actually think I'll push back a little on that. While there aren't some superficial similarities
between the QAStar work and de-comp when you kind of dig in a little deeper, I think the goals of
the two projects really pull apart. UAStar is focused more on the predicate argument structure, like
the kinds of stuff that you would see in prop bank, like questions of who did what to whom, when,
where and how. Right. Whereas in the de-comp setting, we're more interested in the abstract semantic
properties that aren't necessarily apparent from the structure of the sentence itself without some
sort of further knowledge about what the words in the sentence mean and how those meanings compose
up. So like if I asked about whether Joe caused something to happen in that running, J"oe broke the
vase", you'd probably say yes because you know what break means and how it gets together with its
arguments.

</turn>


<turn speaker="Aaron White" timestamp="12:30">

But I also think that sort of example shows why de-comp isn't really more about lexical knowledge
than sentential knowledge, as you noted for the case of QAStar. So something I know about break that
tells me about the fact that Joe caused something, but it's not really just about break, right? It's
about break when it occurs in sentences of that particular structure and probably with some
particular lexical items in that structure. So I definitely don't make the same inference about the
subject in the sentence "the vase broke" the vase didn't cause anything there. So I need to know
about the aspects of the sentence as a whole to answer questions about particular items in the
sentence. I actually think that this is maybe even more convincing in the case of some of the
generosity stuff that we've been interested in.

</turn>


<turn speaker="Matt Gardner" timestamp="13:13">

I really liked your answer to that question and just to make it even more clear, the rock broke the
vase and Joe broke the vase in QASRL. You would ask the question, "did Joe break something" and "did
the rock break something" or similar? That's probably not exactly how QASRL works, but that's the
basic idea. And in both cases the answer is yes, but in De-comp, the kinds of annotations that you
would get on those two is very different. This is a very good distinction. I would still say that
they share the goals of reducing annotation costs and using natural language questions as a more
general, or I guess you're breaking things down and QASRL like breaking things down as much, but it
is, They're both using simpler questions that average people on the street could answer about
language to try to get different kinds of annotations.

</turn>


<turn speaker="Aaron White" timestamp="13:57">

That's right. I do think the distinction between having a span based output and a scalar output is
one of the important distinctions between them, so obviously the fact that we're kind of looking for
deeper Symantec properties is one, but the other is that it is quite a different task if you are
trying to build a model to do it. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="14:16">

Okay, great. I think we've got a good handle on decompositional semantics as it applies to semantic
role labeling. You've mentioned a few other areas in which you've applied this general idea. Do you
want to tell us about them?

</turn>


<turn speaker="Aaron White" timestamp="14:25">

Yeah, sure. So, and I actually think this is relevant to that distinction so I can get back to
trying to convince you that they are different. Even if you're, even if you're already convinced,
I'll try to convince the listeners. Okay, so one of the datasets that we just recently put out, it's
gonna TACCL paper will be out, imminently on this probably by the time the podcast comes out,
looking at linguistic expressions of generalization. This was done by my student Venkata
Govindarajan. We often talk about expressions, generalization as sort of a clause level phenomenon.
So I'll give you some examples. So if I say "Bo ran yesterday," that's probably about a particular
event of running. Like it's kind of, it's space you temporarily bounded, right? Like I can point to
this time in the past where this event started and stopped. Well, if I say "Bo runs every day,"
that's some sort of generalization over events that Bo participates in.

</turn>


<turn speaker="Aaron White" timestamp="15:13">

And if I say "greyhounds run fast," that's a generalization about a kind of thing, namely the kind
of thing, greyhound, you can definitely talk about each of these examples in a multi-class way. This
sort of misses the fact that there's a tendency for each of those classes to be built up for a
particular semantic components. We often talk about that Bo ran yesterday sentences and episodic.
It's like about a particular episode that involves a particular participant in a particular event is
similarly "Bo runs every day." We say that involves particular participant but kind of a
generalization over a kind of event, right? Namely running and "greyhounds run fast" is sort of a
kind of participant in a kind of event. Roughly in this data set we actually go about trying to
decompose these what are often thought of as clause level classes into properties of the
participants on the one hand on the, in the events on the other. And so in that sense we are looking
at lower level phenomena than sentences. But in another sense we are representing the sentence as
sort of a concatenation of all the features, right? So of all the features of the predicate and of
all the features of all of its argument, I think it's a nicely fine grained way to look at
generisity.

</turn>


<turn speaker="Matt Gardner" timestamp="16:21">

So can I push on this a little bit to be sure I understand?

</turn>


<turn speaker="Aaron White" timestamp="16:25">

Yep.

</turn>


<turn speaker="Matt Gardner" timestamp="16:25">

In your examples, it sounded like the distinctions you were making are largely tense, that this is
already grammaticalised in English and other languages. In terms of tense. I'm sure there are
examples that make this break and I don't know what they are. Like "someone ran" past tense is
typically episodic and we have other tenses to describe periodic things in the past. So what's
different about what you're describing from grammaticalised tense?

</turn>


<turn speaker="Aaron White" timestamp="16:52">

Tense is a good indicator when you know about particular properties of the kind of event you're
talking about. It's definitely not a perfect indicator cause I can actually just change the "Bo runs
every day" sentence to "Bo ran every day before he died." Right. And in that case, I know that it's
a very similar kind of generalization, it's just that I'm talking about a past generalization as
opposed to a current generalization.

</turn>


<turn speaker="Matt Gardner" timestamp="17:16">

Yeah. And that's a really good example again of something where the meaning of the particular word
depends on the rest of the context. This isn't a word level thing. It's the meaning of this word in
the context of the sentence in which it appears.

</turn>


<turn speaker="Aaron White" timestamp="17:28">

Yeah, and actually one thing we do in this paper is a bunch of ablations with like, okay, well what
if you wanted to engineer a bunch of NLP features including tense and plurality and all this stuff.
So plurality is another thing that probably matters. And compare that to a pre-trained language
model, the pre-trained language model of course is going to do better. It actually doesn't do a
whole lot better, which kind of surprised us. We are trying to like get the numbers up like we tried
a lot and could not, so this was with Elmo, so this was actually stuff done before Bert and other
systems came out. But yeah, you can actually do surprisingly well with just these hand engineered
features.

</turn>


<turn speaker="Matt Gardner" timestamp="18:06">

Yeah. I want to come back to that point in a minute, but I don't think we should dive too much
deeper into generisity. But maybe give a brief overview of what other kinds of things that there's
factuality we talked with Rachel about this in a previous episode where you want to know did some
described event in text actually happen or not? So like in our earlier example, "Joey refused to eat
his vegetables." Did the eating happen, this kind of thing is factuality. Are there any other
aspects of de-comp? Any other things you're decomposing?

</turn>


<turn speaker="Aaron White" timestamp="18:32">

Yes, I will say actually factuality is the tip of an iceberg that we will be pushing out a new data
set on soon. Uh, and so with a quite a few more features and I won't say any more than that. We've
just scratched the surface with temporal relations, looking at trying to annotate pairs of events
for continuous relations on the slider scales that have the boundaries of the event, um, are sort of
represented as well as looking at event duration. And right now we're looking at decomposing other
aspects of the kind of temporal structure of events, um, and that will hopefully be becoming soon.
One of the early annotations was this multi label annotation of word sense, which actually on the
surface seems like it's not particularly decompositional. It's kind of a standard word sense
annotation. Just deployed on a crowd sourcing platform where you have all the senses that are
available on wordnet.

</turn>


<turn speaker="Aaron White" timestamp="19:27">

You have a highlighted noun, you click a check box for the senses that actually apply and then what
we go back and do is ask OK for all the senses that do actually apply. What kind of super sense does
that sense have? So the super senses are also called lexicographer classes. They're these somewhat
coarse rained entity types and so that actually gives us a way of doing multi label entity typing.
That's what we currently have in terms of annotation. So we also have systems that actually go about
predicting these annotations as well. But that's what we have in terms of the actual annotations.

</turn>


<turn speaker="Matt Gardner" timestamp="19:58">

Interesting. Yeah, those are some really interesting projects. I'll be interested to see more when
they, when it comes out. Thanks. I think we've got a good handle on what the decompositional
semantics is now at this point. What you're trying to do with all of this. What I wonder is what's
your goal here? Or maybe how do you think this will be used? There are a bunch of questions here. So
is this trying to answer questions about language for linguists? Is this trying to produce things
that you hope will be used downstream by other NLP models or tasks? What do you see as the best case
outcome of this research?

</turn>


<turn speaker="Aaron White" timestamp="20:32">

Yeah, so I think the answer to that is we would like to stuff to be useful to both the NLP and the
computation linguistics slash theoretical linguistics community. So from the NLP perspective, I
think that at the very least you can think of de-comp annotations, sort of providing a suite of
probes for whatever kind of the fanciest new embedding representations are. Right. You know, so if
everyday people can answer questions about the properties we annotate with high agreement, if you
want a system that can do what ordinary people do, it should be able to annotate those properties
correctly as well. Right.

</turn>


<turn speaker="Matt Gardner" timestamp="21:05">

And even to take out the language of the probe. But these are things that are in language. We want
our language systems to be able to do this.

</turn>


<turn speaker="Aaron White" timestamp="21:11">

Yep, that's right. The hope is that there are actually further uses. Probing uses aren't the only
ones that are going to be useful for practitioners. So another way you can imagine these things
being useful is in secondary pre-training regimes. You know, you have your pre-trained language
model and then you say, okay, well I want the language model that focus on actually getting this
thing right and maybe that allows you to save some parameters down the line. I already know how to
do this? So like I can focus on other aspects of getting this task right? Or maybe you know, in
controlling various kinds of generation models by say enforcing that entailment should hold in the
generated text. So I think beyond just the kind of probing aspect, I think there is a lot of, I hope
there's a lot of stuff that people will find this useful for.

</turn>


<turn speaker="Matt Gardner" timestamp="21:55">

Right? This is related to something you brought up earlier when I said I wanted to come back to, and
maybe this is more of a speculative question, so feel free to speculate. How much do you think all
of this knowledge of semantics falls out to the language modeling objective? Do you think it's
feasible that we can just learn this from Roberta or the next big pre-trained model? We'll just know
all of this already.

</turn>


<turn speaker="Aaron White" timestamp="22:15">

So I won't speculate in particular on whether that will happen. So I will say actually that as a
linguist, not even as someone interested in NLP, but as a linguist, I'd actually be very happy if
you can find that the kinds of properties that we in particular are annotating for are learnable on
the basis of distributional properties of the input, which is, you know, what the language model has
access to. This is actually something I personally have a standing interest in since a lot of my
linguistically oriented work from my dissertation onward has focused on what kinds of semantic
information you can pick up distributional properties.

</turn>


<turn speaker="Aaron White" timestamp="22:46">

So for instance, this is actually one of the driving forces behind the sister project of de-comp and
MegaAttitude project, which is more focused on kind of type level, lexical and structural
information annotation. If it did turn out that the properties we annotate for have a homomorphic
pre image in some embedding space, right, like and get it from contextual embeddings or whatever
we'd still have at the very least the datasets could be used to probe which of those contextual
representations actually do have such a pre-image right and we've actually did some early probing
work back in 2017 we presented at IJCNLP looking at how well various pre-training regimes do in
helping capture these properties within an NLI setting. Beyond use as sort of a probe though, I
think there are legitimate reasons you could want to predict or at least pre train on the, on those
sorts of properties for the purposes of downstream tasks.

</turn>


<turn speaker="Aaron White" timestamp="23:37">

I've sort of already mentioned them, but for example, if you wanted to make different decisions for
generic, habitual and episodic statements in how used in knowledge base construction or completion
or something like that. Generalizations and particular episodes are very different things in terms
of knowledge representation but plausibly at least. Um, and it's sort of an empirical question
whether you can bypass the interpretable properties themselves or whether it's useful to have that
information condensed into a single value. And then fed downstream. And like I said, I don't
actually want to speculate on whether you can or cannot do this in an end to end system. Like maybe
you can, but at least it would be, it's useful data to understand whether you can or not. Right. And
of course this is like all assuming that the language model pre-training will be enough for all the
properties of interest.

</turn>


<turn speaker="Aaron White" timestamp="24:21">

I'm not actually totally convinced about it. So for instance, we spent a lot of time in the
genericity project really trying to get Elmo to predict some of the actually event level of
genericity stuff reasonably well. And the numbers were reasonable. But like even when we threw Bert
at it, when Bert came out, when we've thrown anything else at it, we have not been able to get those
numbers really past Elmo. So, I mean, I would love if someone could find a way to actually predict
those sorts of properties well because I think it would actually be super useful for a linguist to
have such a labeling model. One thing coming up that I'm pretty excited about is that sometime
toward the end of September we'll be releasing a dataset that unifies all the existing annotations I
just mentioned. So proto roles, factuality genericity, time and word sense within a unified graph,
structured format based on our predicate argument extraction tool, Pred Pat, and that will be
bundled with a toolkit that supports arbitrary sparkle queries on top of those graph structures. So
that's something to look out for in September.

</turn>


<turn speaker="Matt Gardner" timestamp="25:27">

Yeah, this is really great. I definitely agree with this. At some level because you're making this
annotation cheap. Presumably like you could go crazy, someone like Google or Facebook or maybe AI2,
can just spend a bunch of money getting a whole lot of annotations and have a new way of pre-
training or an additional pre-training objective. A lot of people are rightly skeptical that you can
really get as far as we want to get just with a language modeling objective that we need to inject
some additional source of outside knowledge. This whole meaning versus form discussion from
linguistics. If we can get very cheap, useful annotations like you're doing with this
decompositional semantics initiative, then we could presumably just have better models in the end
that know more about language. Right?

</turn>


<turn speaker="Aaron White" timestamp="26:09">

Yeah, that would be great. Our emails are on the website, so let us know if you guys are interested.
And really this project is meant to be a big tent. It kind of grew out of a lot of work that was
going on at Hopkins right before and while I was a postdoc. And then, you know, in my first few
years at Rochester, it is meant to be something that other people can contribute to and you know,
present other phenomena within a de-comp aligned framework. So we're very open to it being a big
tent.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:39">

I also wondering to what extent the attributes that you defined are tied to English? Have you looked
at other languages and what attributes would look like?

</turn>


<turn speaker="Aaron White" timestamp="26:48">

Actually one of the original impetuses for this project was that we could actually extend a lot of
these attributes beyond English. De-comp in general was driven by a Lorelei program, but, one thing
that is difficult is obviously crowd sourcing non-english data. So it's not something that we have
done at a large scale. We have done internal pilots on different languages, but we haven't really
gotten annotations at a large scale. So that's a place that we would love to expand into.

</turn>


<turn speaker="Matt Gardner" timestamp="27:16">

Just a very quick note, the LORELEI project was a DARPA project that was focused on low resource,
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:23">

That funded my PhD, so I'm very grateful. Yeah. It'll be interesting to see, maybe there are some
attributes with higher entropy in certain languages and lower entropy in others.

</turn>


<turn speaker="Aaron White" timestamp="27:35">

Yes. Yeah, I think that would be really interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="27:38">

That was all of this stuff that I wanted to talk about. Was there anything that you wanted to cover
that we missed or any closing thoughts?

</turn>


<turn speaker="Aaron White" timestamp="27:44">

No, I, I think that about covers it.

</turn>


<turn speaker="Matt Gardner" timestamp="27:46">

Great. Thank you. It was nice talking to you. This was an interesting discussion.

</turn>


<turn speaker="Aaron White" timestamp="27:48">

Yeah, it was nice talking to you too. Thanks.

</turn>
