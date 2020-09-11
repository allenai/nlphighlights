---
title: "Knowledge Base Construction, with Sebastian Riedel"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Sebastian R."]
number: "083"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at Allen Institute for Artificial
Intelligence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:11">

Okay. Today our guest is Sebastian Riedel. He is a researcher at Facebook AI research and a
professor at University College London. I guess I first met Sebastian at the first automatic
knowledge base construction workshop, AKBC. I enjoyed seeing Sebastian talk there and it's really
great to have you on the program. Welcome.

</Turn>


<Turn speaker="Sebastian R." timestamp="00:31">

Yeah, pleased to be here. Thanks for inviting me.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:32">

Today we're going to be talking about knowledge based construction as a topic. It's something that
Sebastian has worked on a lot and I dabbled in at least a little bit. My thesis was related to this.
I've not dealt with it a lot in the more recent years, but it's an important topic, so I guess
Sebastian, maybe you could start this by just giving us a brief description of what knowledge base
construction is and why people care about this.

</Turn>


<Turn speaker="Sebastian R." timestamp="00:57">

So yeah, knowledge base construction, automatic knowledge base construction. I guess it's generally
about taking text, but also more recently other kinds of modalities, and sort of representing the
texts. Say document collection, in usually some form of knowledge graph where you have edges
corresponding to relations and end notes corresponding to entities and these relations connect these
entities in terms of how the entities are related. Then that's supposedly good for all kinds of
downstream applications such as question answering such as showing the semantic panels you see on
Google today when you query for an entity you see a bit of sort of right hand side information.
That's actually information that comes from these knowledge graphs which can be automatically
extracted or produced based on texts and then that's called automatic knowledge construction or they
could be manually annotated and then like for me it's an interesting field because it sort of
combines two angles.

</Turn>


<Turn speaker="Sebastian R." timestamp="01:57">

One is that I think it's one of the few what I call like naturally occurring semantic
representations in the world where people have been building even before we thought about NLP or
even without thinking of NLP at all, after building representations of meaning of a certain domain
such that they can access it, in an effective way. And I contrast that with, I don't know, let's say
first Autologic semantic parsing where you know, there aren't necessarily naturally occurring big
databases of first order object statements that, we use for any kind of downstream tasks. That's
usually an academic endeavor, right? Where we are thinking, you know, how could we represent
language maybe using personal logic and so let's build a dataset for that. Whereas in KVC they
exist, these databases, they exist freebase back then Wikidata, they exist, the Google knowledge
graph, they exist a lot of biomedical knowledge graphs, right?

</Turn>


<Turn speaker="Sebastian R." timestamp="02:54">

That have been built even without any sort of like NLP in mind just because they seem to be
reasonable and useful data structures for downstream users. So I think that's kind of interesting
and it's, I think it has some interesting consequences in terms of the kind of work we do in that
space as an this whole idea of distance supervision, which is really big within a knowledge based
construction. I think that's something we see there a lot and we see it a lot because they exist
naturally occurring, you know, semantic representations of meaning. So I think that is really
interesting from a very applied point of view and I guess my applied, you know, heart in me is sort
of liking that. On the other hand, I think it's really interesting AI problem in the sense that we
have to build agents right, that go around and observe the world and somehow assemble what they
observe and represent it in some kind of memory in order to later on access that knowledge again.

</Turn>


<Turn speaker="Sebastian R." timestamp="03:52">

And so I think you can look at KBC or AKBC also as one hypothesis in terms of how agents can do this
right? In the traditional AKBC world you sort of build these relational graphs? And the idea is then
that agents have these relational graphs of the world, which they can use later on to answer
questions about it. And I think that's one way to go about it. I think a lot of other ways to go
about it and like in recent months and years, I think that we've seen a lot of sort of other ideas
in that space and I think could be interesting but, but still I think it's an interesting
fundamental question of how agents can go around the world, observe things represented somehow
compactly and then make inferences on top of it or share it and all of that. So, so it has these two
angles that I find really exciting.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:39">

Yeah, that's a really good description. And I hadn't thought about this like naturally occurring
collections of facts perspective before. That's nice. IMDb is another example that you didn't
mention but, but that people have used like just collections of facts about movies. People just
naturally build these things. You're totally right and WordNet. So I guess that's a good way of
thinking about like what a knowledge base is. It's just a set of facts that someone might just write
down about something. Then you start to think about how might this be used in a practical NLP
setting. You could try to get super low level and think about, well what about finding sentence
structure, parsing sentence structure. Like "I ate spaghetti with a fork."

</Turn>


<Turn speaker="Sebastian R." timestamp="05:20">

Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:20">

If I know facts about forks, maybe that will help me know that fork should attack to the eating and
not to the spaghetti. Whereas "I ate a spaghetti with meatballs." If I know about these things that
will help me attach meatballs to spaghetti and not to eat right. But this is something that no one
actually uses the knowledge base for. Right. This is something that typically, at least these days,
something like Elmo or Bert or whatever, we'll just pick up by seeing a whole bunch of text. So
what's different about these collections of facts that people write down? Does, does this question
make sense?

</Turn>


<Turn speaker="Sebastian R." timestamp="05:53">

Yeah, I think it makes it a sense and to me it points to one of sort of maybe disappointments. I I
have with sort of AKBC in a sense that, well I think the kind of methods that we've developed and
the pipelines that we have and the existing knowledge basis that we build with these, they're kind
of possibly useful for users somewhere within NLP I have seen very little evidence that they are
useful for other things in NLP we could be doing for it. It just hasn't really happened and so we've
been sort of happily working on better distance supervision and better relation extraction with the
hope that they are sort of a lot of maybe industry usages of it. But in terms of actual further AI
uses of it that we directly see, I haven't seen much and I think generally that's a problem of
recall.

</Turn>


<Turn speaker="Sebastian R." timestamp="06:41">

Like we don't have enough coverage of all the facts you need in a way. And the reason for that is
that even if you give an AKBC system, the same knowledge or the same texts you'd give say Elmo or
Bert or the AKBC system will need to check out so much of the information in there based on the kind
of relational ontologies that uses based on the kind of pipelines and make mistakes. So you lose so
much information there that it's unlikely that for like the cases that you just mentioned about like
forks and spaghetti and whatnot, that exactly the knowledge that you need will be in the knowledge
base at enough times. And I'm generally skeptical about knowledge bases as a sort of form of
downstream enrichment of NLP tasks. Like I think, uh, we have never seen anything like the impact of
Elmo and Bert in terms of downstream performance increases in the AKBC world and I doubt that we'll
necessarily get there.

</Turn>


<Turn speaker="Sebastian R." timestamp="07:44">

I think when you, when you think about AKBC from the perspective of building these graphs of facts,
entities and relations, then to me like the main point of that is because there are users who want
exactly that. Right. And they will use that in one way, and there is interface, if you want to do
better X, Y, Zet on top of it, I don't think it's the best way. And I think other approaches are
better and I sort of interested in the middle ground between these obviously. But um, I think that's
really a summary. I'd say no, you wouldn't even use a knowledge based construction method in that
case. I think you use it if you want interpretable representations of knowledge that you can give to
the human or some kind of other agent. But the minute that's machine learning agent you trained with
some other downstream data, I think they'd be better representations for you to feed into.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:33">

Yeah, that's, yeah, that's a really good perspective. I would feel like to push it a little bit more
on the distinction between spaghetti and meatballs and forks and say Barack Obama and Michelle
Obama, a and U S presidents or former US presidents or for example, Sebastian Riedel and Facebook,
AI research like there's a relationship there that I'm, I'm quite certain that Elmo doesn't know,
but your web page knows or Wikipedia might know. I don't, I haven't checked if you have a Wikipedia
page or what, but what is it that's different about these things such that Elmo does know about
spaghetti's and forks but doesn't know about the facts that you might see in a collection of facts?

</Turn>


<Turn speaker="Sebastian R." timestamp="09:07">

That's a good question. I like to point out at this point that we actually have been testing Elmo
and Bert a little for that kind of relational knowledge. And it turns out, at least in sort of
preliminary, uh, results that we have that that is actually not too bad, even with some of this
relational knowledge. Right. It might be right for the wrong reasons. Right. And it might just be
guessing that you know, based on various cues it might not remember that I was, you know, I'm part
of Facebook AI research or something like that. But it's somehow gets it compared to an off the
shelf relation extraction system for example, not so much fewer. I don't know that this is, this is
weird English, but you know what I mean like a, it actually gets it a right relatively often in
comparison to these systems. So I kind of challenge a bit the, even the assumption that there is a
big difference between that and we actually also looked a bit in common-sense knowledge in Elmo and
Bert. Yeah. Sort of well known that it does that but it's sort of on a similar level, at least with
some amount of types of relations that we're looking at.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:13">

This is really interesting, I actually haven't heard anyone talk about trying to explicitly check
for facts and stuff. We have some people starting to look into this a little bit. When open-AI GPT-2
came out. The first thing I did, I read the articles for those who have been sitting under a box and
don't know about this open AI released this super huge language model that generated to me very
surprisingly coherent long form text. Obviously not as coherent as a person, but much, much more
coherent longterm than I'd ever seen before. And so the first thing that I did after realizing how
good this looked was to look at the facts like it mentioned Cincinnati and it mentioned at like a
train robbery in Cincinnati and then mentioned Covington station. It turns out Covington station is
a train station, but it's not in Cincinnati it mentioned the U S energy secretary. It turns out
there've been like 14 or 16 of these in the history of the U S energy secretary position. And I
think the name it associated with the U S energy secretary was Tom Hicks, which is not one of those
14 people that have, that have actually held to this position. So like it has some general concept
of what kinds of facts are related, but it's not remembering at all the specifics of those facts.
Right?

</Turn>


<Turn speaker="Sebastian R." timestamp="11:20">

Yes. That's probably even similar to what we have observed in some sense. And I in the sense that
there would be example where it gets a completely wrong, right. But there are actually quite a few
examples where it gets it right. And if you look at the recall coverage of existing relation
extraction systems for these kinds of relations, they actually miss a lot of things as well. So I'm
maybe not saying like Bert or GPT-2 gets it perfectly right, but it's not that far off. Right. And
so relatively speaking, you know, that's still quite impressive.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:53">

Yeah. Yeah, that definitely, and I, my intuition here, maybe you have other evidence, but my
intuition is that the things that it can remember are things that had seen a lot because they're
like head entities, people in places that are talked about a whole lot. Whereas stuff that's more
rare which would be caught, like if it was mentioned once and your knowledge base construction
method had a reliable extraction for that mention it would remember it and be in the knowledge base
and be available for use in the model without having to have seen the thing a whole lot of times.
Right. That feels to me like the distinction here that these more learning based store facts in my
weight's kinds of approaches work for things that I see a lot and that are mentioned frequently. But
knowledge based construction is particularly useful for things that I don't see a whole lot and I
just want to remember. Does that make sense?

</Turn>


<Turn speaker="Sebastian R." timestamp="12:41">

Yeah, I think that makes sense. I think that is probably true, its good thing to further test. I
think you right that a relation extraction system. Like if the particular pattern in the text has
been trained or we had sort of training data for that pattern, it usually gets it right. It's just
that when the thing only appears once and it happens to be the wrong pattern is also completely lost
in the relation extraction system. So the output sometimes is relatively similar, but there is
definitely a tale of things that the Ari system would get that like Bert or GPT-2 wouldn't get, due
to what you said. I think that's, that's fairly true.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:17">

Okay. Yeah. Great. This was interesting. Not exactly what I was intending on starting this
discussion, but it was really interesting to talk about. Um, so I think we've gotten a good handle
on like what a knowledge base is and why someone might care about it. So, um, I think we should move
on to talking about knowledge base construction. How did this come up as a field? Like it's, it
feels to me like it grew out of some other related methods. You have a lot more perspective on this
than I do. How do people build these knowledge bases?

</Turn>


<Turn speaker="Sebastian R." timestamp="13:43">

I guess it's usually some sort of pipeline that involves a couple of steps. First step is to figure
out what are the entities and text using named entity recognition. Then you link these entities to
existing entities in a knowledge base or you cluster them in co-reference or mentions that refer to
the same entity are sort of really linking to the same entity cluster together and then you figure
out relations between these mentions and texts. So I don't know if you find a sentence, Barack Obama
was born in Hawaii. Then you figure out Barack Obama is an entity. Hawaii is an entity that Barack
Obama refers to the president, Barack Obama most likely in Hawaii first place. And then you look at
the phrase was born in and you have some model that you know knows that that means the birthplace of
that entity is the other entity.

</Turn>


<Turn speaker="Sebastian R." timestamp="14:40">

I think that in a nutshell is a, at least the traditional way of extracting or building knowledge
bases. There are different variants of that. In terms of how you define or work with the schema that
your knowledge base should have. Is it an open schema or is it like closed schema? Different ways of
dealing with different amounts of supervision.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:01">

Can I jump in here? Can you give an example of what you mean by open schema versus closed schema?

</Turn>


<Turn speaker="Sebastian R." timestamp="15:05">

The closed schema is I have maybe an existing knowledge base and I decide I want a model four types
of relations ahead of time. One being maybe born in, birth date, profession or employer and spouse,
let's say. And so you have these four relations and they are your schema and everything you are
going to do with text with fit into that schema, any information in the text, that doesn't fit into
that schema would just be discarded.

</Turn>


<Turn speaker="Sebastian R." timestamp="15:36">

And then later on you can make inferences using that knowledge base that you construct, but only in
terms of these four relations. So that's what I would call a closed schema information extraction.
And then you have the sort of idea of open information extraction where on the other extreme, the
kind of relationship you extract are essentially the phrases you see between the entities and texts.
So if in the text you have the phrase was born in as a phrase between Barack Obama and Hawaii, then
was born in becomes one of the relations of your schema and every time you see a new phrase between
new entities that will become a new relation. With this approach just means like finding out what
are the entities and then somewhat normalizing the phrase between the entities to make it a bit more
like an actual predicates. These are the two options at the far ends of the spectrum I'd say. And
then they are hybrids that combine the two of them. But I think like most importantly you have, I
guess these two ends of the scale.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="16:38">

Yeah. Another interesting distinction between open and close I think has to do with what kind of
entities you would like to represent in the knowledge base.

</Turn>


<Turn speaker="Sebastian R." timestamp="16:45">

Yeah, that's a good point.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="16:46">

Do you want to have only needed entities? Which types of entities would you be interested in? Um,
and I feel like this has a lot of applications on what relations will exist between them and also
like what, yeah, what does it, uh, what this knowledge base is going to be used for. Uh, I see
things like WordNet, we can think of as a knowledge base. It doesn't only have new entities or
things like Wikipedia tends to, I guess also Wikipedia has, has entities that are not named. I think
that knowledge based construction community focused much more so on the named entity part. You have
any thoughts on why that was the case?

</Turn>


<Turn speaker="Sebastian R." timestamp="17:21">

Yeah, I don't know why that is the case that that's definitely true. I am not 100% sure why. Maybe
maybe it's worthwhile to look a bit back into the history of it. I feel like a lot of KBC and
information extraction comes from these early conferences. You know, the message, understanding
conferences, the mock conferences, uh, that DARPA organized, I think late 80's early 90's they were
all about, I guess passing the military reports for events that it would happen. And these events
involve actors, and entities. That was mostly what they cared about. And somehow I thought maybe
that would just maybe that has just stuck with the community. There must be a better reason, but I'm
actually not. Not a hundred percent sure. It's a good question. Why is that? It seems easier maybe
and maybe that's one reason, but I also don't really know.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:17">

Yeah, that's, that's my intuition that this is because it's a whole lot easier to find named
entities and to know. It's a very well scoped, well defined problem to see a sentence like Barack
Obama is married to Michelle Obama to find the named entities run in any r-system that at least kind
of works to pull out what things are named entities and then say, Oh, there must be some
relationship between these two that I find in the sentence. Whereas if you take something like his
first three speeches as president, how do you treat that as an entity? Like language is so complex
when you get away from named entities, it's not really clear. What is a mention of something that
might go in a knowledge base? How do you detect this? What's going on? There's this whole
Wikification line of work that tries to link text to a Wikipedia page, but there you even you, you
get these problems like his first three speeches. Maybe you would link this phrase to a Wikipedia
page for speech, but that's not actually what this is referring to. Like it's complex and so it's a
lot easier and well scoped to just talk about the named entities.

</Turn>


<Turn speaker="Sebastian R." timestamp="19:17">

Yeah, I think you're right it, and then I think what you said in the end makes a lot of sense as in
I think the core problem with that isn't maybe so much the recognition of these phrases. I mean
these are kind of noun phrases in many cases, but it could also be other kinds of phrases, but it's
the linking of those are the co-reference of those that it's just super hard. Like as you said, like
speeches, like is there a speech event that is specific that we'd want to link to or the general
notion of speeches that seems really hard. Yeah, you're right. I think that's really the hard part.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="19:45">

I think also from a utility perspective, since many of these knowledge bases were tracked or
constructed because we think people want to use them. I feel like most of the useful knowledge bases
are about name entities. Like if you think about IMDb most of the bioinformatics knowledge bases
are, they're all centered. People care much more about curating the information for the named
entities than they care about curating for just regular entities.

</Turn>


<Turn speaker="Sebastian R." timestamp="20:10">

Yeah, that's true. And it might also be that they do care about that because also that's easier to
annotate and produce. Then actual sort of other kinds of concepts or events they would have to link.
So the simplicity of that might even play in there. It's just really hard even manually to build a
coherent knowledge base of events and concepts in a way that, or compared to how you build a named
entity knowledge base. But yeah, I agree. I think knowledge bases that exist in the wild, are
usually haw entities are searched as well.

</Turn>


<Turn speaker="Matt Gardner" timestamp="20:44">

Yeah. Great. So going back to like how we construct these things, the general approach as we've been
talking about you first detect what things you want to call entities and then you, you train some
system to take the language surrounding those two entities and predict a relation. Maybe you
aggregate this across lots of documents. There's a long line of interesting work that you Sebastian
a big part of on distance supervision. And I wonder if you could give an overview of what this, what
this means. You mentioned it briefly as you were going through, but can you describe what this is
for the listeners and what happened? Like the history of this, of this kind of approach?

</Turn>


<Turn speaker="Sebastian R." timestamp="21:18">

Yes, I'm happy to. So generally again distance supervision is that, when you extract these relations
in the traditional supervised setting, somebody goes over a lot of sentences and says, yes, that's a
sentence expressing the birthplace relation. No, that's not a sentence expressing the birthplace
relation and they annotate for some number of sentences. And then that gets fed into a supervised
learning algorithm that then learns a predictor. But that's expensive. And thankfully to some extent
in the context of knowledge base population, not necessary because we have these, as I mentioned in
the beginning, naturally occurring sets of of facts that we can use to in a way holistically
annotate the sentences. And the simplest way of doing that is to say if I have a knowledge base that
contains Barack Obama and Hawaii as a the birthplace of Barack Obama and I have a sentence that
mentioned Barack Obama and Hawaii.

</Turn>


<Turn speaker="Sebastian R." timestamp="22:20">

Then I'm just going to pretend that that sentence is expressing the relation birth place because I
just assumed that when I mentioned Barack Obama and Hawaii, it must be because they are birth place
because they are in a birth place position because that's in my current knowledge base. Obviously
that can be violated. Like Barrack Obama just flew to Hawaii, that doesn't mean he was born there,
and so we get wrong labels and there has been a lot of work in trying to reduce these sort of wrong
labels and the noise that you produce by this type of weak supervision. But by and large, I think
the idea is still roughly the same. So you assume that because things are related in your knowledge
base, somehow sentences that mention these related entities are more likely to express that relation
and somehow that's a training signal for your relation extraction system. That's, I guess specific
case of relation extraction. You can generalize that notion to name entity recognition and all kinds
of other tasks. You have some sort of free signal of data that you convert and then turn it into a
direct signal and do that in one way or another.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:31">

Great. Um, there's, there's a related issue here of how much do I trust different sources of
information. I don't remember how much this actually got addressed in the literature. I know a few
people were thinking about it, but like you've mentioned Barack Obama and Hawaii. There are also a
lot of other documents on the web that, that talk about other birthplaces for Barack Obama. How do
methods deal with this problem, in general? Distance supervision, at least the methods you were
talking about, I don't think really tried to do this other than like this expressed at least once
assumption that hopefully at least one of the times that I saw Barack Obama in Hawaii, it was
actually expressing the relationship that's in my knowledge base. So I guess, yeah, this is less on
the training side because Barack Obama and Kenya won't have a relationship in my knowledge base,
it's in my actual prediction side when I'm constructing the knowledge base and I see conflicting
evidence, how do I deal with this? Are you, are you familiar with work that does this?

</Turn>


<Turn speaker="Sebastian R." timestamp="24:26">

Um, actually, no. I think it must exist. I haven't really followed up on that, but I think it is
something that always comes up actually every time I give presentations, that's the first thing that
they ask. Like, what have you extracted from a source that is wrong. Right. How do you integrate
that with other kinds of conflicting information? I mean now and other systems had some ways of, I
guess aggregating conflicting information in one way or another. At least that's how I remember it.
So there were different signals and you sort of use that I don't think explicitly in terms of the
sources that you would take from like you wouldn't have a trust value associated with this
particular source that helps you to down-weigh that fact or off-weigh that fact. So I am not very
aware of work in that space but that doesn't mean at all that it isn't there. I mean it should be
there and maybe you know more about that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:18">

All I remember is a few papers. I think there were, there was a small team at Google on the, related
to the knowledge vault team that was trying to build a knowledge base that was thinking about this
stuff when extracting things from the web. There were some postdocs with Tom Mitchell on the NELL
project that also briefly thought about this for a little bit and Ndapa was working on this I think
at one point. So yeah, it just feels like a really hard problem. And maybe this is part of the
reason that knowledge grafts haven't seen as much practical application like constructing knowledge
basis hasn't seen as much practical application because it's just so hard to control for the noise
that you get in your input.

</Turn>


<Turn speaker="Sebastian R." timestamp="25:55">

Yeah. I mean actually so you mentioned this and I'm interested in your view on this. So you
mentioned knowledge grafts haven't seen so much practical use, which I agree with. In the case of
downstream NLP applications of it. What I'm really uncertain about is downstream users of that in
the wild and applied and sort of in I guess data science or other kinds of areas, right. Where I
think we always tell ourselves that there are people who use this downstream but I'm actually not so
aware of this. I mean other than a few of the big players who are like Google actually relying on
knowledge graphs as something to drive their algorithms. As far as I understand, I'm not so aware of
these, but I'm curious about NELL for example, cause you have been a part of that. Like, what was
the sort of downstream user of that, like where are the downstream users of that, then and how did
they look like?

</Turn>


<Turn speaker="Matt Gardner" timestamp="26:49">

Um, NELL, the reason I said about what I did is I can't really think of any knowledge-based
construction projects that had practical applications. And actually I'm looking at Waleed and
thinking yes there is a big one right there and we can talk about that in a minute. Cause yeah, that
semantic scholar is one that I totally, skipped, glossed over as I was thinking about this. But
NELL, and YAGO the KBC stuff. Maybe there are some like actual military applications of this that I,
I, that's all a black box once you submit stuff to DARPA. So I don't know what they actually ended
up doing with any of this work. Um, but I know that Google, for instance, canceled their knowledge
base construction project because there wasn't high enough precision to actually be useful in their
product. Oh, I didn't know that they use knowledge graphs, right? Like, I'm not saying that that
knowledge graphs don't have any applications, that the automatic construction of knowledge graphs
has been too noisy to actually be useful for people who are, who are building these things. Uh,
except for um, semantic scholars. So Waleed do you want to tell us about that.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:47">

Well, I think actually I would utter what you said. Uh, I'm not aware of any practical downstream
use for automatically constructed knowledge bases including semantic scholar and semantic scholar.
We have been primarily everything that you currently see on the website or knowledge that's
constructed that was important from existing databases or knowledge bases. And we currently are
predicting new relationships and there's another project which we're trying to find new entities
that were not originally in the knowledge base, but we have, we're still doing some verification
because we only want to expose them to the user after the pass a certain threshold of accuracy. I do
think that's kind of like the big question for automatic construction knowledge base community is
can we put it in a state where it's actually usable for downstream users.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="28:38">

I think part of the problem is going to be the general accuracy and then part of it we'll have to do
with how can we differentiate between things that are factual or things like where the author is
hedging or there's a negation and we're extracting the relationship as if it's, if it's correct,
it's also there are also a long, like a long tail of situations where the fact is this relationship
is true under certain circumstances. So if you do this prerequisite, then this relationship holds,
should we add it to the knowledge base or not? I feel like these are questions that are nuanced and
it has not been addressed and yeah, it's kind of like disheartening that with all this work in
knowledge base construction, we still have intrigued the benefits. But another related efforts which
is also I think worth mentioning here is how can we put together multiple knowledge bases and there
I think people have actually made use of multiple knowledge bases, because like when you a
downstream application that's relevant to multiple knowledge bases. Some of them may be automatic
constructed but mostly no, we want to consolidate them somehow and there are many efforts mostly in
the data mining community that tried to do this. But yeah, I think this is also very, very
important.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:58">

Yeah. I'll jump in just to say here quickly that a lot of Sebastian talked about open information
extraction earlier in this conversation and a lot of the more recent open information extraction
stuff does try to handle this scoping of facts that are extracted. So there, there is some work on
trying to do this. You would think that like the closed information extraction stuff just trains a
model to extract the fact and hopefully it would pick up on this kind of thing, but that's not
necessarily super accurate. But also I'll call out a previous episode we did with Rachel Rudinger on
Factuality, which is also very much related. So can you detect, given some event or a verb and its
arguments that are expressed in text, can you detect whether the speaker was actually implying the
truth of this statement or not? And that's definitely a preconditioned to like accurate extraction
here. Right. So yeah, this is, this is a hard problem with a lot of moving parts to it.

</Turn>


<Turn speaker="Sebastian R." timestamp="30:51">

Yes. This is a really challenging, I'm also not a hundred percent sure whether the way to get this
to build is very precise graphs that capture all of these conditions precisely and explicitly in a
symbolic way or whether we can somehow improve our language models to sort of get more clever in
terms of representing these things as well. Maybe that's like too far in the future, but in my ideal
world I'd rather see a better Elmo sort of taking care of that directly. Then us spending a lot of
detailed work on labeling this correctly on a couple of instances and then getting that bit of
precision or a bit of recall out of our supervised methods. So like a guess the jury's still out on
on that.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="31:39">

Yeah. I think the challenge here has to do with the scale. Like you mentioned before, in order to
specify this information in a knowledge graph, you have to make the schema rich enough to represent
it and the more complex your schema as you know, you need more training data for it and it becomes
hard to manage.

</Turn>


<Turn speaker="Sebastian R." timestamp="31:55">

Yes, And it becomes harder and harder to annotate even right. Like a, the more complex this kind of
schema and conditioning is, the harder it is to explain that to people in the right way and the more
noisy your annotation gets. So I think, uh, sometimes feels like an uphill battle.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="32:11">

Yeah. But one of the things that I'm actually very excited about in Semantic Scholar has to do with
extracting. So as you know, like people, researchers introduced new terms all the time in their
papers and it's really hard to keep up with the new terminologies that are being generated every
day. Right. Some of it like make it to everyone, like Bert and Elmo did a great job with this.
Right? But many other names that are less popular don't end up being well known. And one the things
that we're currently trying to do is learn from the terms. That's I think if terms you already have
seen and we see in papers, learn how people re introduce these new concepts and then we can
construct, um, like it's a much more targeted kind of extraction, for creating those knowledge bases
or at least the entities in the knowledge bases and then the relations that relationships can come
at a later time.

</Turn>


<Turn speaker="Sebastian R." timestamp="33:03">

That sounds really good. Yeah. Maybe I just to sort of, not end but get to a more positive note
because it sounded a bit like AKBC is just not working at all. I disagree with that, right? Like, I
think it's, it's sort of working and I think it will progress. It is true that we haven't seen as
much downstream usage of it yet. On the same time though, and like this is where I want to talk
about the AKBC conference a bit. There is a lot of particularly like industry interest in this, so
there must be a lot of like use for that because we just see much inbound interest in that probably
see much more inbound interest from industry then from researchers themselves, like researchers
right now they're all on Elmo and Bert, right? Or all the other sort of exciting things out there.

</Turn>


<Turn speaker="Sebastian R." timestamp="33:47">

But when it comes to talking to companies in their needs, the first thing they talk to me about is,
often just, Oh, it will be great to have these knowledge bases automatically extracted from it. I
also like maybe, and that's just hypothetically, I feel that some of the uses we'll see of YAGO or
Wikidata, right? I mean, I don't know. Wikidata is also not automatic extractors as I know is
relatively hand build I suppose. But let's say JAGO I think it might be people out there who use
that data, but they're not gonna write papers about it and we're not going to see citations coming
in. But we see companies that are using either that knowledge base or they used the ways that or the
methods that are proposed in his papers that built the knowledge bases. So right. Maybe now hasn't
necessarily seen a lot of downstream use of it's facts that it extracted, but the kind of findings
that we made there, you find them being used in big biomedical companies that extract these kinds of
protein protein interaction networks from text. Right. So I feel very positive about that, but I
don't feel very positive about I guess academic reuse of knowledge bases.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:54">

Yeah. Great. Thank you for clarifying that. I totally agree with you. Yes. That made me think I
should rephrase what I said previously. It's more that we haven't figured out how to make knowledge
graphs useful in lower level NLP. As you said, there are a whole lot of naturally occurring
knowledge bases, right? Yeah. People like these collection of facts. And so this is actually an end
in itself. So yes, automatic knowledge base construction is totally useful. Yeah. If what you want
is a knowledge base out and what you can get about facts about real people from the web might not be
high precision enough for someone like Google. But it's still useful enough for a lot of people in a
lot of different specific domains. And there's been a lot of great research helping this and that.
That's totally, it's just we don't see as much downstream uses of it in NLP because we don't really
know how to consume a knowledge base in language understanding models. And that's, that's an active
area of research.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="35:47">

Yeah. I'm wondering also if we need to spend more time thinking about how can we help the curators
of knowledge bases. So we know that some knowledge bases that are actively being maintained receive
a lot of annotation and curation. So I think the interplay between AI and manual curation for these
knowledge bases, I think maybe the easiest path to increase the adoption of the knowledge based
construction methods, but it's of course that requires actual product and that's kind of part of the
reason why we are doing it semantic scholar because there are actually users who can give us
feedback on whether the things that we're extracting are correct or not. Right. I, yeah, I hope
there are other efforts somewhere that are also copying this.

</Turn>


<Turn speaker="Sebastian R." timestamp="36:26">

Oh yeah, that sounds great. I'm looking forward to your talk at the AKBC, a conference on, on that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="36:33">

Yeah. I guess there were a bunch of things that I had listed that we could have talked about, but we
are running out of time. Is there anything that we missed that you particularly wanted to talk about
or want to highlight before we finish?

</Turn>


<Turn speaker="Sebastian R." timestamp="36:45">

I'm not from the top of my head right now. I think we covered quite a bit of ground.

</Turn>


<Turn speaker="Matt Gardner" timestamp="36:49">

One thing, we can conclude with this point, you mentioned before that there's this knowledge
construction conference. Now that I've mentioned at the beginning that I met you at the first
automatic knowledge base construction workshop and now it's a conference.

</Turn>


<Turn speaker="Sebastian R." timestamp="37:02">

Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="37:03">

Do you have anything to say about that whole process of like is this, is this the coming of age of
the fields? Like what, what is this?

</Turn>


<Turn speaker="Sebastian R." timestamp="37:09">

Yeah, I think that it's part of that there is generally a steady and increasing interest in this
which we have seen over the past, but maybe even more so. I mean you mentioned sort of the KBC
community and and all that, there isn't a natural place for them in a way that there is a place for
NLP researchers or vision researchers, right? Like so if you work in link prediction for example,
which doesn't necessarily need to talk about language, right? Like where do you submit your paper to
like where do you go and talk to other people in this field? It could be like AAAI or IJCAI, maybe
the machine learning conferences where you just don't have the same type of domain specific
conference like you'd have for NLP. And so one goal of this conference and this conference series is
to become that place and get people from these different areas together and to give them a venue
where they can publish their work and discuss it with like minded people. So that's, I think, one of
the main motivations behind it.

</Turn>


<Turn speaker="Matt Gardner" timestamp="38:10">

Yeah. Sounds great to me. Thanks for coming on. This has been a really interesting conversation.
It's been good to talk to you.

</Turn>


<Turn speaker="Sebastian R." timestamp="38:15">

Yeah, yeah. Really enjoyable. Thanks so much for, for running this. I think that's much appreciated.
Generally.

</Turn>
