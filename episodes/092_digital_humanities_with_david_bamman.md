---
title: "Digital Humanities, with David Bamman"
hosts: ["Waleed"]
guests: ["Matt","David"]
number: "092"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</Turn>


<Turn speaker="Waleed" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Alan Institute for
artificial intelligence.

</Turn>


<Turn speaker="Matt" timestamp="00:12">

Okay. Today our guest is David Bamman, who is an assistant professor at the information school at UC
Berkeley. I met David when we both started at the same time at Carnegie Mellon University many years
ago, I guess not that many years ago, but it feels like it was a long time.

</Turn>


<Turn speaker="David" timestamp="00:27">

It was.

</Turn>


<Turn speaker="Matt" timestamp="00:28">

David, welcome to the program.

</Turn>


<Turn speaker="David" timestamp="00:29">

Thank you guys. Thank you for having me.

</Turn>


<Turn speaker="Matt" timestamp="00:30">

So I wanted to talk to David because there's this application area of NLP that David has done a lot
of work that I think is really interesting and not a lot of people know about. And so, David, what
we're going to talk about is digital humanities. Can you tell us what this is?

</Turn>


<Turn speaker="David" timestamp="00:49">

Yeah, sure. I'm happy to. So digital humanities, I think you can think of that as being more or less
a community of practice. That's not too dissimilar from other comunities of practice that have been
emerging over the past 30 years. So other examples of this would be computational social science,
computational journalism. Digital humanities is something that's very nebulous. It really
encompasses a lot of different kinds of activities that people undertake that is in this
intersection of digital anything with humanities anything, right? It could include things as diverse
as creating a digital edition of a text, building a public facing website for some work that you're
doing. In GIS, you know, where you're plotting locations on the map and doing something of service
to humanities inquiry with that. I tend to prefer the term computational humanities for the kind of
work that we do that really intersects with NLP in particular with these different areas and these
different disciplines of humanities like literature, art, film, music, theater, where it's not just
that we have this general desire to bring together digital things with humanities things, but really
explore what kind of affordances we have in bringing computation in particular and empirically in-
particular to the analysis of objects of inquiry like literature.

</Turn>


<Turn speaker="Matt" timestamp="02:10">

So when you say computational humanities then are you focused mostly on literature or are there
other applications that you have in mind?

</Turn>


<Turn speaker="David" timestamp="02:16">

Okay. So the kind of work that I do is very much focused on literature, but I think the other kind
of work that is in this general term would include the use of computation for arts, for film, for
music. You know, these other areas that have different disciplines within the humanities that people
have been doing a lot of work on, not at an inter-sectional NLP with the humanities, but rather at
the intersection of computer vision or of music information tree.

</Turn>


<Turn speaker="Matt" timestamp="02:43">

Okay. And literature, I know you spent some time with the Perseus project. Maybe you're the better
person to, to describe this. This is classical literature, right?

</Turn>


<Turn speaker="David" timestamp="02:52">

Well. So the Perseus project in particular is classical literature, but, classics in a very narrow
sense of, right, so not classics like The Canon, like where you'd see Charles Dickens be a part of
the classics, but rather focus very explicitly on literature and new text just in those two
languages. But yeah, my own background, I started my academic career as an undergraduate majoring in
English and then switched to classics. So my undergraduate degree is in Greek and Latin. Went from
there to a Master's program in applied linguistics and then spent five years working for the Perseus
project, which is doing you know, the kind of NLP for Greek and Latin text before going out to a PhD
program in computer science as you know.

</Turn>


<Turn speaker="Matt" timestamp="03:34">

And so then when you say literature again, just trying to make the scope of what we're talking about
here clear, you could include things like the Perseus project, Ancient Greek and Latin literature,
but also more modern novels or what?

</Turn>


<Turn speaker="David" timestamp="03:50">

Yes. I mean, I think anything that, anything that falls under the sphere of fiction would fall
within literature. And even there's some areas that are beyond that or exist as border cases.
Biographies would also be used as an example that are not quite reality, but also we've got quite
fictional items. But yeah, so the kind of work that I tend to focus on is more narrowly focused on
fictional works. And that's what I mean by literature.

</Turn>


<Turn speaker="Matt" timestamp="04:12">

And so let's say I'm some scientist in the humanities, what kinds of questions might I be asking
about literature that the computational humanities might help me answer?

</Turn>


<Turn speaker="David" timestamp="04:23">

I'm not sure if humanists would bristle at being called scientists in the humanities.

</Turn>


<Turn speaker="Matt" timestamp="04:28">

Sorry.

</Turn>


<Turn speaker="David" timestamp="04:28">

I think many of the might, but I think that the kind of people who do work at this intersection who
are in humanities departments right now give you a sample of the kinds works that people have
investigated in this space. Let's see, Angie Piper has done some work on exploring fictionality,
which is the idea that, you know, it goes back to work by John Searle and Derrida Bock in fact, who
said very famously that there's some works, there's no textual property that would identify a text
as being a work of fiction. Right. So that if you take some random story, right. So a story like
John went to the store, he bought some eggs, he paid for it at the cashier, and he walked outside.
There's nothing within the inherent text itself that gives you a signal that it's fictional or not
fiction.

</Turn>


<Turn speaker="David" timestamp="05:16">

It's either about true events or events that have been imagined, and Searle claimed that there's
nothing within this text that gives you an indicator of it being fiction or not. It's only within
the intentionality of the speaker or in the way that the reader is receiving that intentionality
that the fiction, the work fiction itself is defined. And what Piper did in this work was to try to
explore whether or not there are distinguishing properties between texts that had been marked as
fiction and those which have been, marked as not fiction. And of course finding that with over 90 or
95% reliability, you could classify work as being fiction or not. Not to say that a given piece of
text could not also be seen as the opposite class. Right, as being presented in a work of being
imagined or being true, but still gives you some sense in which you can use these kind of empirical
methods to tease apart this question of what makes a text actually fictional is actual use, right
empirically [inaudible]. Laura McGrath has done some interesting work on measuring literary novelty
in text specifically in early, modernist literature. So early modernist literature had a very strong
bias toward, toward new things, right as Ezra Pound said that you should make it new. So what you
looked at in this work was how much a text ends up repeating itself within the body of the text. How
much intro, textual similarity. There is uh, again, looking at question of how much you can see this
overall desire of an entire movement being embodied within the specific text. Again being measured
by computational devices and what counts as being similar. The work of my own that I am probably
most proud of is in collaboration with Ted Underwood and Sabrina Lee at the University of Illinois.
And what we looked at there was in trying to measure how much attention is being given to characters
in fiction as a function of the gender of the characters and the gender of the author.

</Turn>


<Turn speaker="David" timestamp="07:16">

So in that work we found that in looking at about a hundred thousand novels, English language
novels, over about 150 year period, we saw that women as authors ended up giving about equal
attention to male and female characters while men as authors ended up giving three times more
attention to male characters than the female characters. I think the ways in which you can see NLP
interacted with this space, is in providing these kind of computational and empirical methods that
really enable a kind of measurement that can be used for either for testing some hypothesis on its
own or for being some piece of evidence that's being marshaled in the service of a larger argument.

</Turn>


<Turn speaker="Matt" timestamp="07:55">

Yeah, I'm trying to imagine answering some of those questions 10 or 20 years ago before we had
really good tools, just being really laborious and how NLP could really help this.

</Turn>


<Turn speaker="David" timestamp="08:09">

Yeah. Well actually this is one of the things I think is so interesting about this entire area of
research that we think about all of these different communities of practice, like the digital
humanities and computational social science and competition in journalism as really, you know,
reaching there, not hated, but really having a great surge of energy and activity just over the past
five or 10 years. But all of these really have really long traditions of empirical work that go
back, I would think at least to the 19th century. I mean a lot of classic German philology was just
people sitting around counting things to make arguments about how groups behave. In fact, when some
of the earliest work I think in this space was that by Thomas Mendenhall back in the 1880s that
looked at ways in which they could discriminate works of Francis Bacon, Shakespeare and Christopher
Marlowe using the distributions of word link. Again evolving just these simple acts of counting, but
in a way that would be a lot more laborious than we have today.

</Turn>


<Turn speaker="Matt" timestamp="09:08">

Right. I remembering an example even earlier, wasn't there some treaty that was supposedly written
by a pope in ancient Greek that was like, you might remember this better than I do. I only took just
a few classes in the classics, but like one of the first philological studies was disproving, or
there was a document that was supposedly written way earlier than it was actually written and you
could look at word usage, knowing ancient Greek in order to show that this document was much later
than it actually was purported to have been written.

</Turn>


<Turn speaker="David" timestamp="09:37">

Oh, interesting. Yeah. No, I don't know that specific case, but yes, I'm sure there are a million
examples of things like that,

</Turn>


<Turn speaker="Matt" timestamp="09:42">

But, again, yes, that you could view NLP as a means of speeding up this kind of analysis. Not that
it hasn't been done before, but now it's accessible to a lot more people and with a lot less
overhead. Yeah. So you can answer more of these questions and answer them more quickly.

</Turn>


<Turn speaker="Waleed" timestamp="09:57">

Could you elaborate a little bit on how this could be used as a measurement device for literature.
So, you mentioned for example, I didn't find gender, what other problems you perceive NLP community
helping with? Whether it's already something that's already like we have good models for or not.

</Turn>


<Turn speaker="David" timestamp="10:14">

Yeah. Oh, for sure. The core areas that we see as being part of the NLP pipeline end up resulting in
some kind of measurable quantity, right? So parsing, taking named entity recognition, syntactic
parsing, uh co-reference. I mean all of these, you end up being translatable as formal qualities,
narratologically for a lot of questions that you could answer about literature. So an example of
this would be so the work that we did in trying to measure the amount of attention being given to
character. It's not gender there. That's the measurement. The atomic unit that we're trying to
measure is what character is and how much attention you give to a character. And to get to this
notion about what a character is, you need to be able to have methods that are good for recognizing
what the names are, first of all, that are being mentioned in a text and give you a sense of what
the character's names are. And more importantly, you also need to have some sense of co-reference of
those names, and so the co-reference of the names and co-reference of all the pronouns that are co
referring to the same thing as those things. What I say that we're doing in NLP is developing these
kinds of algorithmic measuring devices that can be used for other fields. That part is really what I
mean in this particular context, that it's NER in particular in conjunction with coreference
resolution that gave us the ability to point to a character in a text and then think about ways in
which we can decide what attention to that character needs. And for us, you know, we treated
attention as being the amount of things that that character did, right? The number of activities
that they were the agent of the things that they had done to them as being the patient. We also
looked at the amount of dialogue that they have. And that again is a structural quality. It's a
structural thing that is, it involves being able to parse the text blown up and assign different
regions of the dialogue to the person who's speaking it and then resolving that mention of the
person to the entity to which they're correct. So all these revolve around being able to get these
kinds of structural properties right in a way that can enable this atomic measurement of the
character. But even the low level things, you know, beyond this high level structure, the character,
the low level things were also important. So Matt Wilkins at Notre Dame also had some interesting
work a couple of years ago and looking at the, how much attention is being given to different cities
in the United States in, I can't remember if it was fiction or nonfiction, but before and after the
civil war.

</Turn>


<Turn speaker="David" timestamp="12:35">

So in that case you, you need to have a named entity recognition system that can recognize place
names well enough in text to then treat the place name as being this atomic unit that you want to
develop this measurement around right, to say how much attention is being given to Boston or to
Berkeley or to Seattle before and after the civil war. So all of these low level things that we work
on in NLP, in the service of some higher level system are often useful on their own. We're building
some argument around it in this space.

</Turn>


<Turn speaker="Waleed" timestamp="13:03">

I See, I imagine the accuracy of the various tools will be, will vary, depending on what year the
story was written or, maybe different dialects. What are the tools that you can use in order to
account for these differences?

</Turn>


<Turn speaker="David" timestamp="13:18">

Yeah, so this is a great question. This is one of the things that keeps me up at night and it really
drives a lot of the things I work on right now. That you know, one of the dirty secrets that we have
in NLP is that a lot of our systems that we have state of the art performance for, work really well,
not just on a newswire but on the 1989 Wall Street Journal, right? So if you take a model, that has
been trained on the entry bank for parsing or for any of these other data sets that have been built
on top of the entry bank for all these different layers of annotations. If you take a model that's
been trained on that and then just run it out of the box on Charles Dickens or Jane Austin, it's
going to blow up in very predictable ways. Right. So we see time and time again for a lot of
different problems we parse speech taking names and recognition, parsing the accuracy for all of
these methods that they've been trained on. Newswire tends to plummet by like 20 points in absolute
terms for across a lot of these different tasks and they're often embarrassing errors too. And one
of my favorite examples of this is just a very simple sentence. "Yes, comma" said Jane, right, where
every human would be able to say that Jane is a syntactic subject of the verb say, but because you
very rarely see the subject of this other verb showing up after the verb in news texts Jane is often
tagged by these out of the box taggers as the object of say, right there like completely ridiculous.
And assuming that there is just a nulll subject at all. So yeah, so it's a real problem. The fact
that you can't just assume that these methods that have been trained on newswires weren't to work
well for texts that are either historical, you know, that had been written a century before 1989 or
simply in a different domain. It could even be contemporary with 1989, but just in this kind of
fictional context that has much more complex sentence structure, much longer sentences, and just
this level of figurative language used that you don't see in news. The reason we can go about
accommodating this this disparity in performance or trying to rectify it. I mean, I found that, I
mean, using contextual word representations like ELMO and BERT really help, you know, go some way
for, for mitigating this error for just adapting the representations to the fact that we are in a
fictional sentence and not in a new sentence does get you some gain.

</Turn>


<Turn speaker="David" timestamp="15:41">

All the methods that we have available to us in NLP for domain adaptation, you know, are potentially
of good use here. For us, we know that we want to be able to measure how well any of these systems
are going to perform on literature overall. So in order for us to do that, we have to have data that
we had annotated where we know what the true labels are. So the work that we presented at NACCL a
couple of weeks ago and we'll also present the ACL in Florence is a new data set that we are
creating for a hundred different English language novels where we've annotated all of the entities
in them, uh nested entities. So complex structure including uh people, places, organizations of a
couple of different types and also all of the event triggers as well. Because we know that we have
this data to at least say how poorly existing models are doing.

</Turn>


<Turn speaker="David" timestamp="16:29">

We can then also build more data to train those systems natively on this domain. And what we found
here is that when we do that, when we train a system natively on literary texts, we end up
performing much better than if we were to doing it to train that system on something that, a domain
that is not used; a domain that is not literature.

</Turn>


<Turn speaker="Waleed" timestamp="16:47">

Yea, I think the first data set that addresses this problem so directly.

</Turn>


<Turn speaker="David" timestamp="16:51">

Yep. This is the object of center. We know that we want to develop a lot of this NLP to work well
for literature. And if you want to do that, we really just need to have data that's in that domain
to help make sure that these systems are good and even if they're not good, just to know exactly how
bad they are. I just, it'd be, it'd have some number to help drive or work in this space to help
shape it going forward is important.

</Turn>


<Turn speaker="Matt" timestamp="17:11">

So you've created and released a data set or two recently. Are there others that are in this general
space that you might point people to?

</Turn>


<Turn speaker="David" timestamp="17:20">

Yeah, so I know there have been a lot of other techniques that people have developed for trying to
make these different aspects of the pipeline better for literature, in particular. Juilan Brooke,
Tim Baldwin had done some work on this, looking at trying to essentially induce brown clusters and
then giving tight category cluster level labels to Brown clusters to say whether the cluster is
about all people or all locations. And that has been pretty successful in identifying a lot of these
entities for techs. There tends to be a long tail of resources. So a number of resources for
specific authors or literary texts, that tend to be relatively small in size, but really optimized
for making these methods work well in those domains. But this I think is probably the biggest
resource out there for this kind.

</Turn>


<Turn speaker="Matt" timestamp="18:06">

Coming back to an issue we touched on briefly a little bit ago, you worry about the domain shift and
accuracy if you're using NLP as a measurement tool in this particular area. And will lead us to
question about general accuracy here. I wonder particularly about bias and say gender bias or any of
these things. Like if you want to actually ask questions about gender and literature and we know
that our systems are biased, how can you be confident in using these as a measurement tool?

</Turn>


<Turn speaker="David" timestamp="18:36">

That's a great question. I think that in all these cases it's important to have some kind of
validation that that lets you quantify exactly what kind of biases are going to creep into this
work. And one of the things that we found just in creating this data set was that if you took a
model that's been trained on the H2005 data set for a method used for newswire and use that model
trained on newswire to try to identify people in literary texts that you end up having a very strong
disparity in performance as a function of the gender of the entity that you're recognizing. So that
if you look at the recall between how well you're able to identify true mentions of women versus men
that a model trained on H2005 ends up recognizing men much better than woman. Right, I mean
something on the order of like 10 absolute points of recall better for men. If you look at the H2005
news data you can see why. I mean most of the articles are about men. You simply just don't have a
lot of mentions of women in these articles at the same proportion as you do of men. So if you're
taking them all and applying it to a different data set where you have more parody in dimensions
between women, you would expect to see that kind of reports, and we do.

</Turn>


<Turn speaker="Matt" timestamp="19:50">

That's really interesting and problematic. We need to do better.

</Turn>


<Turn speaker="Waleed" timestamp="19:53">

That reminds me of a talk that ABC by Claudia Wagner, she was talking about how the users that read
the content is being used in a lot of ways to kind of like as a replacement of standard more
traditional ways of surveying people's opinions or understanding people in general. Then the same
problem happens there where the kind of content that's available online where people contribute is
biased in various ways or choose basically advocating that we should be using the same methodology
that's been traditionally used in survey research in order to account for the various kinds of
errors we were making this measurements.

</Turn>


<Turn speaker="David" timestamp="20:31">

Yeah, absolutely.

</Turn>


<Turn speaker="Matt" timestamp="20:31">

So I think we've talked a little bit about how NLP helps in answering questions in the humanities.
Do you think the contribution can go the other way in some cases where this, this kind of humanity
or literature helps NLP in general?

</Turn>


<Turn speaker="David" timestamp="20:49">

Oh yeah. I mean absolutely. I mean the one hand literary analysis on its own is really challenging
domain. Alright. So making sure that the tools that we're developing within NLP work well, not just
for news, for Twitter, for product reviews on Yelp. I mean having another example of a, of a
challenging domain that's very difficult. Those I think is, is useful for us just in terms of making
our tools more robust to make sure that even if you're not talking about optimizing the literature,
you can see it as being an example of a domain that is like the others and be an example of
something that you know you want to do well on overall, right broadly across them all. I think that
a lot of the work where in metaphor in particular and figurative language I think has a lot to bring
in, from this entire area of literature that is steeped in this kind of theory. So I think we've
seen even a lot of work and metaphor recognition, metaphor identification that's drawn on a lot of
this theoretical work from in philosophy and English. And I think a lot of these questions about
fairness and bias I think really also are informed by fundamentally humanistic lines of inquiry.

</Turn>


<Turn speaker="Matt" timestamp="21:53">

So are there particular tools that you wish you had better access to or that you wish performed
better? I guess to state this a little better, you think NLP in literature analysis is helpful as a
measurement tool. What kind of measurement tools do you wish you had that NLP doesn't give you?

</Turn>


<Turn speaker="David" timestamp="22:10">

That's a great question. So I think that's generally a lot of the low level components of the NLP
pipeline could be better for literature. I think that the hard cases come in the fact that novels in
particular are really long, right? So the average length of a novel or something like 150,000 words
and the kind of methods that we have developed for application areas like co-reference resolution
just don't scale well to, to documents that are that long. Or we can end up having co-reference work
well in a really local context, right? It's, it's a lot easier to link a pronoun with its nearest
antecedent than it is to state that you know a given car in a book that you see at the very
beginning of it is the same car that you see the very end, Right. That's almost an impossible
problem that I think we just need to have a lot more different sort of scope in how we think about
this problem to really think about that we wouldn't necessarily see from just working primarily on
news documents.

</Turn>


<Turn speaker="David" timestamp="23:10">

But beyond this question about what specific kinds of tools you think would be useful in this space
of NLP for as literature in particular. I think that one of the real advantages in this space, one
of the real, what were the real space and opportunity is in literature is in thinking of what these
new problems are in the first place for literature I think this space of innovation here really is
pretty tremendous. So, if I was to encourage somebody who wants to get into this space, if they
should choose to work on making some particular tool better or in using what they understand about
the state of the art for NLP Right now in 2019 I would encourage them actually to really think about
what these new problems would look like in the space of literature. That we could apply all of these
different methodologies and tools and methods that we have been developing for the past 30 years to
explore what a new question looks like in this space.

</Turn>


<Turn speaker="David" timestamp="24:08">

I mean, just to give you a couple of examples of things that my group is taking about are literary
scene code records, right? It's something that doesn't really exist for news texts. A literally
scene co-reference would be the problem of trying to identify which events are taking place in the
same physical location in a novel. So where you know, which actions in which scenes are taking place
in the same room or in the same palace or in the same village or whatever. Going beyond that, trying
to think of ways that we can use all of these different fundamental tools to create a map of a
literary geography. I think that's a really fascinating question that doesn't really show up in any
other texts that is grounded in the real world, right? So this is another way in which literature is
very different from news.

</Turn>


<Turn speaker="David" timestamp="24:51">

News has descriptions of places that are anchored in reality, right? They were, every place has at
least some latitude, longitude or some boundary box that tells you where on earth it is. With books
sometimes this is true, right? Sometimes you have mentions of London or Seattle that you know you
can anchor on the earth, but other books you don't. The Lord of the Rings is a great example of this
where it's an entire imagined universe. And try to think about ways in which we could decide where,
what location fits with respect to another. It's something that we have the capacity to do. We have
the capacity to think about how we could apply these methods in NLP to figure out this problem, but
it's one that really doesn't exist anywhere outside of this entire universe of imagined realities.
Lots of examples of these kind of problems like that where we focus not specifically on making
specific tools better, but about thinking about what these new problems are. That literature really
opens up for us. Now, we could approach with these methods in NLP. I think that is where there's
this real opportunity is.

</Turn>


<Turn speaker="Matt" timestamp="25:56">

Yeah, that's really interesting. I've been talking recently with a bunch of folks about what it
means to read and understand a passage of text and one of the things we've been toying around with
is can you reconstruct a scene from like a paragraph description of, say a room, and this gets very
similar to this [idea of] recovering a map from the geographic descriptions in a novel though at
this particular case it wouldn't necessarily be restricted to just fiction. It's an analogous
problem. If you think a little bit broader, it's in a lot of places. Yeah. It's interesting.

</Turn>


<Turn speaker="David" timestamp="26:30">

Absolutely. I think that's a good example of a thing that you see definitely existing in this
universe of literature that could then also be expanded to other domains as well. But you brought up
this question about how readers react to a new piece of text, I think that is also a huge
opportunity here. We're thinking about how people react to literature as they're actually in the
course of reading it. Because a lot of this work in this space really assumes that you, I mean
computationally, you have access to all of the texts in a book instantaneously, right? So if you're
trying to, you know, to tackle authorship attribution, right? To figure out who the author is of a
given text or genre connection, right? To figure out if a book is a drama or a crime novel or a
science fiction novel. A lot of those methods assume that you can see the entirety of the texts from
the very first word to the very last word and use all the information in making your judgments about
what class you know is appropriate here.

</Turn>


<Turn speaker="David" timestamp="27:27">

But there's an entirely different area of research that you can imagine here that asks, what does
the reader know at the moment of each word in the novel? Right? So if you're starting from the very
beginning of the book and read to the very end, what is the state of your understanding of that
fictional world on page 10. How does that change from page 11? How is it changed from page 100? It's
interesting because when you take this approach of how you model what a reader knows about what they
have read a lot of really interesting questions open up like foreshadowing, like what's the
relationship between the world that's being built up for the reader, you know, by page 10 and what
is predicted to happen, you know, a hundred pages later. Who ends up being the bad guy at the very
end of the book. Can you predict that; at what point are you able to predict that from the reader's
point of view? So I think the more ways that we can think about treating this text as being not just
a static entity but rather a thing that a real person is reading and has impressions of in the
course of their reading; these temporal dynamics. I think there's a whole range of interesting
questions that could be asked there as well.

</Turn>


<Turn speaker="Matt" timestamp="28:35">

Yeah, that's really interesting. Maybe I'll spring a question on you that I've asked a whole bunch
of other people. I've been trying to categorize reading comprehension; what it means to read and you
can imagine at a very basic level, this is like understanding the the linguistic structure of every
sentence in the text. Typical. You might judge that with syntactic analysis if you really want to or
whatever. Then discourse analysis, there's discourse parsers that try to get at this. There's co-
reference entity, event, co-reference, this kind of stuff. Then implications of the paragraph that
you see. Like if I see that Bill loves Mary and that Mary was diagnosed with cancer, what does that
tell me about how Bill must be feeling right now? That's one level of understanding. The
implications of what I read and then being able to recover a world model, being able to understand
the communicative intent of the author who wrote this and how well they succeeded in their intent.
I'm curious what your perspective is from literary analysis. Like what other things should I add to
this categorization of what it means to read?

</Turn>


<Turn speaker="David" timestamp="29:37">

Let's see. I mean, I don't know if I would add anything to the perspective of literary analysis. I
think if anything, trying to analyze what the author's intent is I think is a very controversial
thing in the space of literary analysis where you know, there's a whole set of theorizing about how
it's the reader who's the one who makes the meaning of the text by the act of reading and whatever
intent the author had baked into the text is not what the reader is going to end up pulling out.
It's the readers who construct the meeting from the words that they see given on the page. But I
think generally that's an interesting question about how you go about trying to learn what these
implications might be. One of the things I've always wanted to work on was to, to, to take pairs of
people who are talking to each other and infer together what their own shared common knowledge must
be for that conversation to make sense. What things is personal A presuming person B knows by saying
a certain thing. It's very much into this framework of rational speech, but for perspective of
reading comprehension, I think you're thinking the same thing, right? That if you can infer what a
plausible state of mind would've been of a person who's authoring the question or authoring the
paragraph that I think would get at what some true component of reading comprehension must be in the
end. But it's a hard one.

</Turn>


<Turn speaker="Matt" timestamp="30:52">

Okay. To wrap up, my last question is about what do you think are the most interesting open research
questions? You mentioned one of them about like just trying to think about what are the interesting
problems. Is there anything else you would, you would give as an interesting open research problem
for digital humanities?

</Turn>


<Turn speaker="David" timestamp="31:08">

Yeah, I mean, absolutely. There are a whole slew of these open research questions and people are
going to find them interesting to different degrees. For me in particular, I think that the ways of
having an operational definition of plot is really, really interesting and really something that we,
there's a lot of theoretical work on and even some computational work, but for the most part that
work has been really focused on trying to represent plots or narratological structure as really
being just the distribution of sentence over the temporal domain of it all. Right, to say how happy
or sad is the tone at a given moment in time. It goes back to a very famous video that Kurt Vonnegut
did essentially defining what typical story arcs look like from their perspective of the sentiment.
We know that plot has to be something more complex or we know that plot has to involve people, it
has to involve places, it has to involve times that actions are occurring.

</Turn>


<Turn speaker="David" timestamp="32:00">

In many cases the main theories also involves important objects. And we have a way of at least
focusing our attention on getting all of those individual components right from the perspective of
NLP or be able to recognize people, places, you know, some at least early work in ordering those
events and along some timeline. But how that goes about combining together to create some
operational definition of plot or, or a storyline I think is an open question that is almost within
our grasp. We have the building blocks to get there, but we're, we're not quite at that state of
being able to put them together. So I think there is really amazing work to be done in doing just
that. And I think even in this larger question of how we use these kinds of NLP methods to get at
different narratological primitives, I think is really compelling.

</Turn>


<Turn speaker="Matt" timestamp="32:55">

It's interesting. That's not the direction I thought you were going to go when you brought up plot.
I was expecting something about like prototypical narrative like The Hero's Journey. Like, can you
classify different novels into these categories?

</Turn>


<Turn speaker="David" timestamp="33:07">

Oh, no. So I mean, I think there is work that's been done on an aspect of that. A lot of that dates
back to Russian formalism back in the 1920s. I don't know. I don't particularly, I think there's a
lot of other interesting questions that could be asked about how individual works are, that don't
fall into this notion of an archetype or a stereotype is really what I think what they ended up
being reduced to. That these works of literature I think are, are often much more complex than being
able to be reduced down to these classical stories. Okay. I would disagree.

</Turn>


<Turn speaker="Matt" timestamp="33:39">

Yeah, that's fine.

</Turn>


<Turn speaker="David" timestamp="33:41">

Cool.

</Turn>


<Turn speaker="Matt" timestamp="33:41">

This was a really interesting conversation. Is there anything that we missed that you want to talk
about or any final thoughts before we conclude?

</Turn>


<Turn speaker="David" timestamp="33:47">

I don't think so. I think we covered a lot of important stuff.

</Turn>


<Turn speaker="Matt" timestamp="33:50">

Great. Thanks for talking with us. I'm looking forward to seeing more work on literary analysis in
digital humanities.

</Turn>


<Turn speaker="David" timestamp="33:55">

Okay. Thanks for having me.

</Turn>
