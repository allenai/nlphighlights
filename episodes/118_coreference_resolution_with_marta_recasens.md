---
title: "Coreference Resolution, with Marta Recasens"
hosts: ["Matt Gardner","Pradeep Dasigi"]
guests: ["Marta Recasens"]
number: "118"
tags: []
description: "In this episode, we talked about Coreference Resolution with Marta Recasens, a Research Scientist at Google. We discussed the complexity involved in resolving references in language, the simplification of the problem that the NLP community has focused on by talking about specific datasets, and the complex coreference phenomena that are not yet captured in those datasets. We also briefly talked about how coreference is handled in languages other than English, and how some of the notions we have about modeling coreference phenomena in English do not necessarily transfer to other languages. We ended the discussion by talking about large language models, and to what extent they might be good at handling coreference."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F882599698&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello, and welcome to the NLP highlights podcast, where we talk about interesting work in natural
language processing. The hosts are Matt Gardner and Predeep Dasigi from the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:10">

All right, today, our guest is Marta Recasens, who is a research scientist at Google. Marta. Welcome
to the program.

</turn>


<turn speaker="Marta Recasens" timestamp="00:17">

Hi, thank you for having me.

</turn>


<turn speaker="Matt Gardner" timestamp="00:19">

Yeah, it's good to talk to you. Marta has done a lot of really interesting work on coreference
resolution. That's what her PhD thesis focused on, and that work has been really influential for me
for many years in how I think about coreference resolution and even several other problems too. And
so I thought Marta would be a great person to have on to talk about coreference resolution with us.
So thanks for coming on. So maybe we can start out by Marta. You just explaining what coreference
resolution is. Maybe that's a little bit big, but do your best.

</turn>


<turn speaker="Marta Recasens" timestamp="00:52">

Yes, no, I think it's quite easy to understand. I I've been asked that question a lot. So yeah,
language, we use language to talk about the world. And so there's this connection that the things we
talk about refer and connect the things in the wall. That's, what's called linguistic reference and
as we talk. We can talk about the same thing multiple times. Like now I'm talking to you and I'll
refer to you multiple times. So when I refer to something that I already referred to previously in
the disperse, we say that that's coreference, those two mentions corefer, meaning those two
expressions refer to the same thing, which is an entity. And usually it's said that two mentions
that the expressions refer, if they corefer, if they refer to the same thing in the real world, I
think of it as if they refer to the same discourse entity. And then there's the connection of how
discourse entities connect with the real world of course but yeah, that's that thing I'll get more
into the details.

</turn>


<turn speaker="Matt Gardner" timestamp="01:59">

Yeah. Do you have a difference between a discourse entity and a real world entity?

</turn>


<turn speaker="Marta Recasens" timestamp="02:05">

Yes. So when we talk, we create hypothetical entities, I can say, "Oh, I wish I was able to go to
the beach I dreamt about." And we build hypothetical things. I can even play with entities in a
playful way and that's going towards some of my work, but I can say, "Oh, when I was little, I liked
doing that. But later on, I stopped liking that" and I can say, well, "little Marta liked that, but
older Marta doesn't like that." So, you know, I very language is about flexible and allows me to
split myself into multiple selves and that's totally allowed in language, but of course the real
Marta is not being split. There's just that one entity. So I can build all those entities as
discourse entities, but then how they connect them all that then can, it's not the one-to-one
mapping.

</turn>


<turn speaker="Matt Gardner" timestamp="03:03">

Yeah. Yeah. This is interesting. So at a high level, we

</turn>


<turn speaker="Pradeep Dasigi" timestamp="03:06">

I guess another kind of an example of a morning star and evening star and how people refer to the
same planet as two different names with two different names, the same planet mercury, right I guess.
Yeah.

</turn>


<turn speaker="Marta Recasens" timestamp="03:21">

Yes. Yes. It's very similar. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="03:25">

Yeah. Interesting. So we can think of coreference resolution broadly as clustering discourse
entities, figuring out which discourse entities are the same thing in a discourse, but I guess I'm
still a little bit unclear on what exactly is a discourse entity. Is this a noun phrase? Is it like
what things are discourse entities?

</turn>


<turn speaker="Marta Recasens" timestamp="03:49">

That's a good question. So usually we think the simplest way, is to think of entities as objects.
And then objects means starting from getting a straightforward physical objects then including
people, locations, those are objects, those are things. And then we can include more abstract things
or thoughts, wishes. Usually we talk about objects as noun phrases as Matt was saying, but then it
gets farther complicated. Then when we say also events, how about events? So events can be also
nominalized and I can say, "the concert, I went to" "the thing that happened this morning", and then
you're turning an event into a thing so that you can refer to it. And yeah, there's also some work
on what's called event coreference. You can just say, Oh," I fell this morning. It hurt me." So the
falling is what hurt me, but that's been considered a separate class of coreference, event
coreference. So usually the NLP task of reference resolution is restricted to these objects that are
the non-event objects. But sometimes there's a blurry line where things get a bit messy.

</turn>


<turn speaker="Matt Gardner" timestamp="05:13">

Do you know at all, why there's a distinction between these two things?

</turn>


<turn speaker="Marta Recasens" timestamp="05:17">

Oh, objects and events.

</turn>


<turn speaker="Matt Gardner" timestamp="05:19">

I like treating these as separate tasks in some sense that there's coreference, that's just objects
and then event coreference is different.

</turn>


<turn speaker="Marta Recasens" timestamp="05:27">

Yeah. It's so a very core aspect of language is this distinction of, Oh, there are objects things we
talk about. And then the things that happen to those, it's kind of the noun/verb distinction in
language. So the moment you want to more holistically include everything. You start getting into the
verb theory. And I think, NLP, you know, NLP is very hard because we try to make, we need discreet
tasks or a thing. That's not discreet that's language. So the way the production resolution task was
defined, it had to make split boundaries somewhere and make the task feasible. So I think that was a
way to creating I wouldn't say, an artificial task, but a task that we could set boundaries and
defined clearly, and we wanted to leave verbs outside of it so that they then become invisible.

</turn>


<turn speaker="Matt Gardner" timestamp="06:25">

Interesting, Ya so just feasibility. I get, I guess I think frequently when I think about this,
about, I think this is a canonical example, "Rome destroyed Carthage" and "Rome's destruction of
Carthage." At least this is an example I see in a few different places when people talk about NLP.
And then if you say like "Rome's destruction of Carthage in some year," and then later I would refer
to it. I say, "this destruction," this is now nominal coreference because it's destruction in both
cases and would fall under like the typical coreference resolution tasks that we've defined and not
event coref. But if I just changed the first mention from "Rome's destruction of Carthage" to "Rome
destroyed Carthage in some year," and then later I say "this destruction," I didn't really change
anything, but now all of a sudden it goes into this other task definition.

</turn>


<turn speaker="Marta Recasens" timestamp="07:14">

Yeah. Examples like this, imply that yeah. We're setting this artificial boundary, but if you
included all the events, then it could become a lot harder because for example, events, you know,
are, have these ongoing things for time, right? So like the distraction lasted for a while right. So
even if you say so then you can even the noun when you say "Rome's destruction," it can either refer
to the result of the action or the ongoing action, right. Are you referring to the process of Rome
being destroyed or the actual end point, and this example is still a bit straightforward, but the
moment you would include more complex events like a recurrent event and things that are happening
more often, then it will become unfeasible. So, yeah, it's true though. That then when you say, Oh,
if I say twice destruction, then I can say that corefer. Yes, it is a bit inconsistent, but the
same.

</turn>


<turn speaker="Matt Gardner" timestamp="08:21">

There's a lot of messiness that happens in this phenomenon, I think is what we're getting at here.
And what I've really liked about your work is trying to grapple with this messiness, the boundary
cases in really interesting ways. And I think we'll get to that towards the end, but or I guess
later in the discussion, but I guess for now, what people have done is say, this thing is really
messy, but I can pick some subset of it and try to make progress on that. And so the subset that
people typically picked, as you said, is let's just think about concrete objects, try not to deal
with the messiness of events. And just say, if I have entities, let's see if I can figure out if
they're the same or not. And then like, I think the first big research efforts in this direction
were like ACE and MUC. This is before my time. Do you know the history here?

</turn>


<turn speaker="Marta Recasens" timestamp="09:16">

Yes, that's correct. And yeah, I was going to say, so now we're getting into the specific past. We
said how all let's okay. Simplify objects. But then even with that, we can cover between like MUC
and ACE. There were differences. So even within that then, because we're setting, there's some
artificial boundaries, we don't have a strict alignment. Yeah. I think the very first task was MUC
in the nineties, late nineties and yeah, in MUC, they had a set of, for that task, it was motivated
by some existing tasks on I think, terrorist documents and something else. So those are the sorts of
objects that were in that task. And it was focused only on English and one distinguishing thing
there and both get there and yeah, and then a difference between MUC and ACE, which came a bit
later, it was kind of a follow up was whether you want to take singletons or not.

</turn>


<turn speaker="Marta Recasens" timestamp="10:19">

So what are singletons? Singletons are entities that are only referred to once in the discourse. But
we talked about coreference being when you refer to the same entity multiple times, but there are
all these entities that we just refer to once in a discourse. Usually you refer to entities just
once you refer to many entities just once. And it just the very few entities that will be mentioned
multiple times, you know this. So in MUC, they define they are going to take the coreference
mentioned for only mentions, that would be in a correct relationship, whereas in ACE they annotated
all the entity mentions whether singleton or coreference and that's already. Yeah, I think then the
difference, because then in one task systems are only expected to identify mentions that will refer.
And then in the other task also mentioned that there are entities that have a single mention.

</turn>


<turn speaker="Matt Gardner" timestamp="11:24">

And so here we have to like explicitly define what a discourse entity is in this context, instead of
pushing that away a little bit and saying, I only care if they corefer.

</turn>


<turn speaker="Marta Recasens" timestamp="11:34">

Right, because then you get into is every noun phrase a mentioned an entity mention or a noun
phrases that are not referential.

</turn>


<turn speaker="Matt Gardner" timestamp="11:44">

Yeah. It seems really messy that I think of my first project on my thesis, which ended up being a
silly direction, that kind of a misguided idea in the first place, was trying to do something like
joint entity, linking and coreference resolution. And an example that made me realize that this was
just a bad idea, was the phrase, "his first three decisions as a starter," this is a baseball
pitcher and a decision is something about baseball that I don't really know, but he was a starting
pitcher, "his first three decisions as a starter." And that is a noun phrase. It's a set of
decisions. Is this a discourse entity? Like it's so specific, like, should it, should any reasonable
system call this a discourse entity,

</turn>


<turn speaker="Marta Recasens" timestamp="12:24">

Like "his first three decisions?" Yeah, I think that's when now. Yeah. so in NLI conversation we're
getting into decisions and entity, and now you're also bringing up the question of this entity sets
right on three decisions together. So we have four entities there, each decision individually, and
then one entity, that's the three of them as a collection and that's relevant because then later in
the disperse, you may use they right. Corefer to all the decisions. And you may even say the first
or the second, so you're splitting the set.

</turn>


<turn speaker="Matt Gardner" timestamp="13:03">

Yeah. This is hard. Do you know how, how did ACE even try to tackle this? How do you decide what's
an entity?

</turn>


<turn speaker="Marta Recasens" timestamp="13:08">

Usually those tasks, both MUC and ACE because they are, we're very focused on a specific domain.
They identified the set of entity types. They cared about especially ACE had like a geopolitical
entity location organization person. And by restricting the set of entity types, then you can
immediately leave out some of these more blurry areas. But one contentious issue has always been
nominal, predicates and oppositions. So if you say "Barack Obama is the president", you say, it's
discourse in this nominal predicate with the coupler verb is what we usually see an adjective or a
lot of times have, you know, "Obama is nice," but you can say, "Obama is the president," but is this
a construction where you have two discourse entities? And you're saying they are the same, or is the
president acting sort of as an adjective thing, a property, of Barack Obama. So some datasets have
annotated this nominal predicates as mentions of themselves that then do corefer with their subject
and others have left those out.

</turn>


<turn speaker="Matt Gardner" timestamp="14:23">

And there's a similar issue with a positives, right? So it's not Barack Obama is president versus
Barack Obama comma, the president of the U S comma, same issue.

</turn>


<turn speaker="Marta Recasens" timestamp="14:32">

Yeah.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="14:35">

Is the issue here the attribute the president would refer to different people at different times or
is it something else?

</turn>


<turn speaker="Marta Recasens" timestamp="14:40">

I mean, this is also something that can happen, but if you had a text that was like Obama blah,
blah, blah, and then like the president in that text, you are using the president yet in a different
time and a different document. The president could refer to something else. But in that one, you're
using the president refer to the entity. But yeah, in that, in as a nominal predicate the president
is used kind of as an adjective, which again, shows that it's a bit, cause it depends on the time
it's more of a property. So you could then say somebody else was that president is the president.

</turn>


<turn speaker="Matt Gardner" timestamp="15:20">

Yeah. Okay. So we've talked about MUC and ACE, which were two very early coreference datasets or
efforts to study coreference resolution. These days it seems like OntoNotes is what people think of
when they think of coref is, OntoNotes related to the prior two datasets. I'm afraid. I don't even
know.

</turn>


<turn speaker="Marta Recasens" timestamp="15:38">

No, it's not OntoNotes uses the CoNLL data, which in turn is the Penn TreeBank data. Yeah. So the
Penn TreeBank data set was this huge dataset, very influential for parsing. And then later it was
extended to include coreference anotations and yeah, that kind of replaced the previous efforts
there was a lot more data, more domains and then a few other languages. So yeah, it's true that
OntoNotes has become, especially for English and then a few other languages has become the standard
dataset for coreference. Also, especially since there was a couple of shared tasks using OntoNotes.

</turn>


<turn speaker="Matt Gardner" timestamp="16:23">

And I believe OntoNotes does not annotate singleton mentions going back to the prior discussion. And
there was one release that I believe it was EMNLP a couple of years ago called PreCo, like preschool
coreference again, still English, but here they, so they tried to do simpler language, not use wire
texts, but they did annotate singleton mentions. So again, we have this dichotomy, MUC and ACE and
how we have OntoNotes and PreCo.

</turn>


<turn speaker="Marta Recasens" timestamp="16:50">

Always, yeah, but I'm not familiar with PreCo was that using OntoNOtes data or,

</turn>


<turn speaker="Matt Gardner" timestamp="16:56">

No, a totally new dataset. The language was targeted to be earlier like child level vocabulary, but
annotated for coref.

</turn>


<turn speaker="Marta Recasens" timestamp="17:06">

It's been an ongoing discussion. I know. Yeah. Some researchers have expressed and some of the
people who are involved in the OntoNotes annotation, how maybe better decisions could have been
annotating singletons. I mean the other important factor is that whether you have singletons or not,
will change the evaluation scores, which of course, then it becomes very relevant since we always at
the end of the day, like to have that number of how good the systems are, but then it's like, wait,
but yet, this data set has singletons that not, and then the scores are not comparable to one.

</turn>


<turn speaker="Matt Gardner" timestamp="17:46">

Yeah, yeah, though, we should, we should come back to this evaluation question in a minute. I think
there are a few other interesting datasets to talk about still first. You were part of releasing one
recently called GAP. You want to tell us about that one?

</turn>


<turn speaker="Marta Recasens" timestamp="17:58">

Yes. So GAP, I think is a very interesting dataset and there were two motivations actually. One was,
most of the data says, let's take OntoNotes. You just take, let's take real data. And you take a
collection of documents from real sources. But then as I was saying in a text, like most of the
entities, 80% of the entities, you just talk to them once in a text, you referred to them once. So
then, okay. You have like 80% of entities that don't participate in a coreference relationship. And
then the remaining ones you'll have ranked top line. What's the distribution of coreference
relationships. Then the remaining ones, we will have set of them that use proper names. And you can
have a talking about San Francisco multiple times just saying San Francisco, then maybe you'll have
a couple times where you may be, or at least represents, more playful and say the city, the capital
of Silicon Valley or the city in the Bay area, things like that with a nominal phrase.

</turn>


<turn speaker="Marta Recasens" timestamp="19:05">

And then there will be also few times where you use a pronoun and you say he, right. And the same
then for people. But a lot of times then you'll just have a coref mention just the same stream. So
it's like, Oh, coreference is very easy. I just need to identify these two noun phrases, say San
Francisco. So yeah, of course it's the same city. But I was saying, then there's like what I ended
up calling the tale of coreference resolution, which is maybe in all these 10% of mentions though,
that are very challenging because different reasons you are using like a nominal expression, like
the city, or even more nuanced things like, Oh, the Golden Gate Capital, things like that. So it
really is not that straightforward to identify. And then you may be using pronouns, but in a context
where there's more than one likely match for the antecedent, then maybe you say, "it is a lovely
city" but you actually mentioned San Francisco and LA, right?

</turn>


<turn speaker="Marta Recasens" timestamp="20:11">

So actually there are two in that context. So what you end up then with coreference that you have,
like maybe 10% of mentions that are very challenging, but of course, when you are about waiting on
OntoNotes or some other dataset that inputs, these whole documents, even if you do a very good job
on that tale, it's not really gonna show up in your scores maybe. Right. And I'll compare with
systems that maybe just use the same string of same head heuristic, if it's alarm system as a
feature, that's I think what most learned systems end up learning. So what we then our motivation in
GAP was, okay, let's build a dataset that just includes really challenging examples for coreference
and which again would be a subset of larger datasets. And then we use Wikipedia and we extracted
contexts where there would be a pronoun.

</turn>


<turn speaker="Marta Recasens" timestamp="21:11">

And it was a personal pronoun he and she, and that pronoun would have in their immediate context at
least two competing antecedents and by competing, I mean that the antecedents would match the gender
and number with the pronoun. And they would be also person which we are doing he and she, which are
personal pronouns. And yeah, that then becomes much harder because it's not just like, Oh, let's
find the closest antecedent, then that matches in gender number and entity type, but you do need in
general, some sort of world knowledge, common sense to know, then what's the right antecedent and
the other then in doing that, we also then realize, you know, Oh, he, and she, there's a male and
female. And actually, yeah, most of the texts have extracted texts from real sources. And of course
we see more male references than female references. So actually we have a bias problem where systems
have seen more training data for male pronouns and they are better or males than females and all the
bias in NLP problem.

</turn>


<turn speaker="Matt Gardner" timestamp="22:21">

And so this dataset tries to account for that.

</turn>


<turn speaker="Marta Recasens" timestamp="22:24">

Yeah. So then what we did was, okay, let's try, you know, even if what we'll naturally extract will
be unbiased in terms of having a lot more examples with he then she would try to balance the number
and just make sure that there would be a matching number so that you'd have to do well in both
genders. So it's quite close.

</turn>


<turn speaker="Matt Gardner" timestamp="22:47">

Do you compute any metrics for like how well you do on each one separately?

</turn>


<turn speaker="Marta Recasens" timestamp="22:51">

Yeah. We split it and then yeah, there's a ratio metric.

</turn>


<turn speaker="Matt Gardner" timestamp="22:56">

Great. Yeah. It's good to have resources like this for detecting all kinds of interesting things,
including gender bias. I, the last thing I want to talk about for like datasets is everything we've
talked about has been in English. You brought up, you mentioned this in passing once earlier in this
conversation, we should talk about it a little bit more. So what languages have annotated
coreference data?

</turn>


<turn speaker="Marta Recasens" timestamp="23:18">

Yeah, there's been a lot of work on coreference. And as I said, since the MUC data said was first
created in the late nineties, a lot of groups and for different languages have been creating
datasets reference myself. I started at the University of Barcelona and we had the dataset one for
English, sorry, one for Spanish and one for Catalan. And yeah, my, how I got started on this work
was by adding coreference annotations for Spanish and Catalan. And then yeah, there have been other
universities. Massimo Poesio has done a lot of work for Italian than we have in Germany, a group
that the German annotations coreference for the to the TuBA dataset. And then there, yeah. Indian
languages groups in India that did for India there's been work done for past. So there are quite a
lot of languages, but of course each language doesn't have, non-English languages don't have the
same resources. So usually those datasets are smaller. And yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="24:27">

Do you know if there's a central place for someone looking, could find all of these just in one
place or do you kind of have to search the whole literature?

</turn>


<turn speaker="Marta Recasens" timestamp="24:34">

That's yeah, that's a great point. There's no nice yet that they know of any nice ya central
repository linking all those datasets. I think there are some surveys and publications that will
mentioned several of them, but yeah, each one is locally maintained.

</turn>


<turn speaker="Matt Gardner" timestamp="24:53">

Okay. So you've studied coref in a few different languages. Would you say the phenomena that you
have to handle are the same across languages or are they different?

</turn>


<turn speaker="Marta Recasens" timestamp="25:02">

Oh, as usual in language. There are some universal things and some more specific things like
coreference is a universal phenomena as we were saying, like each language of course can refer to
the same thing multiple times, but yeah, the way how you refer back to something and even referring
expressions by themselves to have some language specific features and each languages, each language
will do it slightly differently to take a very trivial case that I think many listeners will
understand is pro drop languages, right. In pro drop languages like Spanish, Italian, if the default
subject, that's clear in the context, you don't use an explicit pronoun for the sentence subject
position. So instead of saying, Oh, "he said so." You just say "said so," and it's, you know, that
you understand that the context is there, that subject is there just implicit, but of course, like
for an NLP system, there is no explicit token. So there's nothing there.

</turn>


<turn speaker="Matt Gardner" timestamp="26:12">

Yeah. This, this is making me like think, well, wait a minute, what's a singleton mention if I have
a pro drop, if I mentioned an entity once, and then it shows up as a, that that entity shows up as a
dropped subject, is this a singleton mention like, uhoh,

</turn>


<turn speaker="Marta Recasens" timestamp="26:26">

It's not, it's not, yeah. It's not a singleton entity, but yeah. Unless there's been work to either
add in the anotations or have a system that identifies those implicit mentions in practice, it will
be treated mistakenly as a singleton.

</turn>


<turn speaker="Matt Gardner" timestamp="26:44">

Yeah. And like even the annotation, like, the output of a system, I'm thinking of jumping ahead a
little bit, but the models that we use take spans and say are these two spans referring to the same
thing, but if I have a pro drop language, there's no span there. And so even like the fundamental
modeling assumptions that we do are like just built on English and don't work for other things,
which is, which is a problem.

</turn>


<turn speaker="Marta Recasens" timestamp="27:06">

Yeah. And then a lot of the work that has targeted that also for Japanese it's usually there is a
pre processing component that tries to identify those implicit mentions first. So add something
there, like a noun marker then do coreference on those.

</turn>


<turn speaker="Matt Gardner" timestamp="27:25">

Interesting. Yeah.

</turn>


<turn speaker="Marta Recasens" timestamp="27:26">

Oh, and another difference does not relate it to pronouns even yeah. Then noun phrases themselves,
for example, English, or I would say English and German Anglo-Saxon languages have a tendency to
repeat more naturally proper names. Whereas if you take Spanish and Catalan stylistically, you try
to avoid repeating. So there is more nominal variations of, Oh, I already said "the newspapers" so
now I should use the synonym of something else. But then of course, for the systems, that's a lot
harder.

</turn>


<turn speaker="Matt Gardner" timestamp="28:00">

Yeah. I think we get that in like English Newswire too. So I did a small project at Google actually
a few years ago on coreference resolution. And we were looking at like, can I use the knowledge
graph to improve coreference resolution results? And so I was looking at like news articles from
what was it, the 2004 presidential election. And so we would get things like Barack Obama and John
McCain and then the Illinois Senator and the Arizona Senator, and like Newswire uses these different
phrases, both to give some variety and to inject information and

</turn>


<turn speaker="Marta Recasens" timestamp="28:33">

Yeah. Yeah. Different domains will have yet different styles. Exactly. And yeah. If you think about
your document scientific texts where you don't want to leave room for ambiguity, then you avoid
right. As much as possible, I think confusion. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="28:49">

Yeah. Well, I'm looking at the outline that we came up with and thinking we've had a really
interesting discussion so far, and there's too much left to talk about. I, and I want to talk about
your, your really interesting work on the boundaries of coreference resolution. And so I think maybe
we should just skip over the modeling stuff, which is interesting, but basically just like classify
whether two spans are coreference after like running it through a transformer these days it's not
groundbreaking and probably more interesting to talk to.

</turn>


<turn speaker="Marta Recasens" timestamp="29:21">

Yeah. Usually the two approaches are either, yeah, you do the mention pair classification problem
are these two mentions coreference or not, and then you'd need them to resolve the pair wise
decisions to build the whole entity or more of a class three entity based approach to all of these
mentions. But yeah, we can skip it.

</turn>


<turn speaker="Matt Gardner" timestamp="29:43">

Yeah. Yeah. There was a lot of interesting history of like modeling developments in these two
different paths. And I think everything is basically converged to this basic transformer that does
this based on a model architecture by Kenton Lee, which is pretty good. But yeah, let's talk about
the boundaries of coreference resolution. I think the first work of yours that I was aware of was on
Near-Identity Coreference Relationships. You want to tell us what that is?

</turn>


<turn speaker="Marta Recasens" timestamp="30:11">

Yeah. So yeah, that brings us back a bit to the beginning, right? Like how we concentrate and set
boundaries for coreference, but then we have these challenges of things that I'm like, well, how do
I more narrowly define this? So yeah, near-identity as I was saying in NLP, when it will make things
discreet, but then as you annotate a real text and Google usually start with noun phrase, noun
phased by noun phrase and you decide whither it is differential or not, you get into a lot of tricky
cases that are like, you know, when do we say Barack Obama did blah, blah, blah. And he blah, blah,
blah. It's like very trivial. Okay. Those who mentioned corefer. But yeah, in real text, you get
into a lot of mentions that it's not that trivial. So near-identity try to capture these sort of
boundary cases where it's not that straightforward.

</turn>


<turn speaker="Marta Recasens" timestamp="31:09">

For example, one is metonymy so metonymy is usually you use something else that's related with the
thing corefer to that. So a very common one is the part whole relationship. So you can say, Oh, "the
pretty hat just arrived," you mean the person wearing the hat, right? Although of course, literally
you just refer to the hat, right? So that's, there are some metonymy references that become
conventionalized not part of language, like the White House, the White House said, blah, blah, blah.
And of course it's because the government is located in the White House, but then in some contexts,
it's not always clear whether it's truly a metonymy or not. And then when an annotator or when a
system is forced to make a decision, well, there's room to say, yeah, those are truly referring to
the same or not there is this extra layer.

</turn>


<turn speaker="Marta Recasens" timestamp="32:11">

So, but then of course our annotators and our systems are forced to say, well, do they corefer yes
or no? Right. And we know also that's true. Now there's been a lot of work also and other tasks
about these agreements, right. Even in part of speech tagging, apparently not every part of speech
it is not clear that reward has this one part of speech. Right. So in coreference, we started seeing
that because then we had certain categories of words where we did see confusion about annotators and
then we identified certain types, like the metonymic references of those ones I was talking about
earlier, when you say Marta, and then the little Marta, the older Marta are those the same or not.
We also covered sets. Sets are complicated. If I say, Oh, 10,000 people died yesterday, because of
the virus.

</turn>


<turn speaker="Marta Recasens" timestamp="33:07">

And then you say, Of the people that died. Sometimes you will refer to kind of a subset of that big
set. And it's not clear that it's exactly the same set. So yeah. So we identified all different
reasons why some mentions are particularly challenging for classified as either yes or not
coreference. And we then run an annotation study with parallel annotations on those and yeah, it's
aligned well, that's where people had the most disagreements fell into those classes. Interestingly
though, if you explicitly asked, annotators: identify these mentions that are more ambiguous in
terms of reference, that was a very hard task and they were not able to do it, but then you have to
get that signal indirectly. So you just ask people, but then you do get the disagreements for all
those classes.

</turn>


<turn speaker="Matt Gardner" timestamp="34:01">

That's interesting. So were these like expert trained linguists that were annotating this or random,
or average people?

</turn>


<turn speaker="Marta Recasens" timestamp="34:09">

We tried with average people, I mean, not average average, I guess, in between an expert linguist
and an average NLP researcher, but yeah, it was hard an expert linguist would have been better, but
still I think getting the single imperially, is better.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="34:26">

Do we have an estimate of how much noise was introduced into the annidations because of such
ambiguities?

</turn>


<turn speaker="Marta Recasens" timestamp="34:35">

That's a good question. Yeah, not, I don't have an explicit number. Yeah. I'm not sure.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="34:43">

Yeah. I guess, I guess it's a, it's a trade off between actually getting some annotations and
defining some concrete annotation guidelines and making them as accurate as possible. Right. I mean,
how do we, how do we decide where to draw the line? I guess is a general question.

</turn>


<turn speaker="Marta Recasens" timestamp="34:59">

Yeah. Right. That's, what's sometimes very hard with some NLP tasks. We need to draw the line
somewhere and then in certain areas. We do need to make an arbitrary decision or a more pragmatic
one, because language is just very fuzzy. So yeah. The other area that I should mention is bridging
resolution. So bridging resolution is that if I'm talking about San Francisco, and then I say the
bridge, right. Just because we were already talking about San Francisco, if I say the bridge, most
people will be like, Oh, the bridge off San Francisco. Right. And that's the golden gate. So the
bridge in itself is not coreference, it wasn't mentioned before, but resolving the reference dose
meet that previous reference to San Francisco. Right? So that's the bridging actually. I used the
bridge to exemplify the bridging that was not intended. But

</turn>


<turn speaker="Matt Gardner" timestamp="36:02">

When you were describing metonymy, I felt like, someone might be confused on the difference between
metonymy and bridging. Do you have any example that clarifies this because for instance, like the
golden gate bridge, maybe in one context that could be a bridging kind of reference, is, it possible
to have like the same basic construction either metonymic or bridging?

</turn>


<turn speaker="Marta Recasens" timestamp="36:26">

I mean, usually a metonymy you are referring to the same thing. It just that you are using for like
the, for the specific part. And there are others, the part whole you'll use a part, or you can use
yet something that's connected to that. But like you could say, I could of course use the golden
gate or the bridge itself as a reference also in a metonymic way. Like, I really enjoy living in the
golden gate, but it would be a bit forced, but somebody could understand it as meaning you enjoyed
living in San Francisco, but then in bridging that is different, because then bridging you'll truly
refer to something else. It's a different entity. But in order to understand what you're referring
to, I need these there's these dependency on another entity in that discourse, but they are not
correfrence in that case.

</turn>


<turn speaker="Matt Gardner" timestamp="37:20">

So, let me see if I can give an example to see if I'm understanding this, right. So you mentioned
the White House before. So I could say like the White House made a statement today about protests in
Chicago, the Press Secretary in the press conference said something, something the White House is.
So what's the relationship between white house and Press Secretary.

</turn>


<turn speaker="Marta Recasens" timestamp="37:41">

Well, now you're starting to get into the other fuzzy near ones. So yeah, the Press Secretary
you'll, it's a bridging one, it's the Press Secretary of the White House. Right. But you'll probably
want to say that. Yeah. Who made the statement was just that Press Secretary person. Right. Whereas
the White House was standing for the whole government, but we are getting into the near-identity
case because then you're like, well, but truly the Press Secretary was also kind of just speaking
for the whole government. Right. So we could almost consider that you could have, as well said, the
white secretary at the White House made a statement, right? Maybe it doesn't matter that much, that
it's a specific person making the state members is the White House as a whole. So those are the
areas where technically there is no coreference, but pragmatically, it's almost like, and there's
interesting work in the psycholinguistic literature that in the past I read and it's, you know, they
say a lot of times actually in real language speakers, we may not even be doing really full
coreference resolution.

</turn>


<turn speaker="Marta Recasens" timestamp="38:52">

We can have, what's considered a good enough interpretation, just, Oh yeah, the White House, the
Press Secretary, you kind of have them related, but you don't really think is it really the same
entity or not. You know why that annotators we are forcing our systems to decide, is this really the
same or not? So like, I think there is room to really define a richer task, which tries to represent
all the entities that's come into play to understand, interpret of text, but have a richer
representation of how they relate connect with each other. And that can then help us understand end
of references without just, okay, does this refer to the same or not. So simply,

</turn>


<turn speaker="Matt Gardner" timestamp="39:40">

Yeah, this is getting to the point that for me, your work has been really influential. I've taken it
to me in a particular thing. And you, you can tell me if, what you think of my interpretation. I see
this as pretty strong evidence for using natural language as an annotation format, because there are
lots of bad, and I mean that you can realize that in a bunch of different ways, but because there
are these cases that are like too fuzzy to like categorize just like letting people use language to
describe what's going on here, either as the label or maybe some kind of question answering kind of
format to get at the nuances in a particular case. So I have from your work gotten like a strong
push towards thinking, let's just use natural language annotation where it makes sense to, to
annotate these tricky cases. What do you think of this?

</turn>


<turn speaker="Marta Recasens" timestamp="40:31">

Yeah, that's a, that would be a good way, at least when we are annotating to capture in a richer
way, of course what's going on. But sometimes I think that's what the may also was getting to is
that if then we bucket those more, those cases that are harder with the, with the rest, then we are
adding noise to everything. Right. But then yeah. What do you do then with those annotations? Like
for the system we still need to decide then what will the system though, right.

</turn>


<turn speaker="Matt Gardner" timestamp="41:06">

Evaluation and like end use become a lot more challenging to think about. Definitely

</turn>


<turn speaker="Marta Recasens" timestamp="41:11">

Do we just filter those out or do we then yeah have a targeted task for those. Yep. Yep. But yeah,
but I think though at least for coreference annotation tasks being able offer these chance. That's
not just a binary. Yes, no. Would be helpful.

</turn>


<turn speaker="Matt Gardner" timestamp="41:28">

Well, my last question for you we're running short on time is somewhat speculative. We've seen the
emergence of these huge pre-trained language models and, and we've had this long discussion about
how interesting and complex the phenomenon coreference is. Do you think these large pre-trained
language models have any sense at all of coref and will they ever,

</turn>


<turn speaker="Marta Recasens" timestamp="41:48">

I wish I had the answer. I want that answer. I mean, I think it's, you know, there's a lot of debate
on that. It also takes us to these recent paper by Emily Bender right. On form and meaning. So there
are, yeah, we didn't talk a lot about what information do we use and systems use to resolve
coreference. Right. Part of coreference relies on syntactic information, just, you know, as I was
referring are we are like things like number agreement, right. As this panel has the same number
with it's antecedent, and the same entity type, some of the signals, I think a very are available
cause they are form signals. So think some of this neural network and then learn that and the
medical learn that. But then as we're expecting them to get into the world knowledge that sometimes
it's required.

</turn>


<turn speaker="Marta Recasens" timestamp="42:44">

Oh yeah. I haven't mentioned when you asked me about the GAP. One, one of the examples that has
always been very cool in my research group, which is there was this example that mentioned Barack
Obama and then mentioned Barack Obama, hearing the news about Steve Jobs dying. So the example was
like when Barack Obama heard of, so the text is like "37 years after starting Apple in his parents'
garage, Steve Jobs left behind him oe of the Globe's most powerful brands when he died, Barack Obama
called him one of the greatest innovators of all time." Obviously as a human, when you hear "when he
died Barack Obama, blah, blah, blah." You know, it's Steve Jobs. But if the followup had been when
he heard the news, Barack Obama called him one of the greatest innovators of all time.

</turn>


<turn speaker="Marta Recasens" timestamp="43:43">

Yes. A human you're like, Oh, now it's a Brack Obama. Right. When he heard the news, the other one
is dead. Are these the same construction. Right. So yeah, some of these, we ourselves run
transformers and then there's been a neural nets using the dataset and they are getting even some of
these trickier cases of common sense. Right. And I'm sure they are learning some sort of common
sense pools from things that are in the document maybe and others that by the word that they, and
that learning some representation that captures that meaning, but at what point, they are really
like, again, like what does it mean that a NLP system understand language, right? What does it mean?
Can they do the task, or do they really have similar representations that we do? I don't think they
are building quite the common sense or world knowledge that we're using for a lot of these
relations. But the same time as we are saying coreference resolution is a bit fuzzy in some cases.
And I do think that this more continuous representations that neural nets are using can be
especially useful for that. They can represent meanings in a more continuous way, fuzzier way. That
may be better than the old days when we were using WordNet to decide, what's the category of this
one word in the sentence.

</turn>


<turn speaker="Matt Gardner" timestamp="45:06">

Yeah. Interesting. Thanks for your thoughts. I guess when I think about all of this form and meaning
stuff, it turned like coref resolution, actually it seems like one of the more salient cases to me,
because it seems totally plausible to me that just by doing language modeling, knowing that these
two noun phrases just assume the simple coref case, like let's, let's forget about the complex
boundary cases, whatever, knowing that this pronoun refers to this antecedent is really important
from a language modeling perspective. And so it seems totally plausible that a model could induce
some latent knowledge of simple coref. And that it's interesting to think about.

</turn>


<turn speaker="Marta Recasens" timestamp="45:46">

Oh, definitely. Yeah. And I've been very interested in always better understanding what might be
behind, what the knowledge the neural net is learning. One thing though, to note is, I think those,
and I haven't followed the work very closely, but I think most of the work is showing that they can
get some of the shorter distance coreference relationship. But let's say sometimes in very, in
longer documents, you may mention some entities at the beginning and then the pronoun comes three,
four sentences later or even longer. So those longer distance dependencies though, I think would be
harder to get for the systems, because then it requires more. So the shorter ones right now are
showing some promise, but yeah, the longer distance ones are harder.

</turn>


<turn speaker="Matt Gardner" timestamp="46:37">

Yeah. And that like, if that's the way that you pose it, then you say, okay, let's just make a
bigger model, like GPT three or GPT four, and then it's long enough it can do it. And what is it?
Yeah. It's interesting. Well, great. This was, this was a really fun discussion. We are basically
out of time, but is there anything quick that you wanted to cover before we end or any last
thoughts?

</turn>


<turn speaker="Marta Recasens" timestamp="46:58">

No, I worked on coreference resolution, you know, in the past that these days I'm not as directly
working on it, although I think any NLP problem at some point touches on coreference because
referring to language is understanding it. Sorry I'm referring to the world. Yeah. He's
understanding it yeah. I think everyone at some point will come across it and it's a very
interesting problem. Very challenging, but I think that's why it's interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="47:27">

Yeah. Great.

</turn>


<turn speaker="Marta Recasens" timestamp="47:27">

Thank you for having me.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="47:28">

Thanks a lot

</turn>
