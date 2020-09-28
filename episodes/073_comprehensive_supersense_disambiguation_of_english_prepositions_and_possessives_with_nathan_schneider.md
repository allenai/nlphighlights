---
title: "Comprehensive Supersense Disambiguation of English Prepositions and Possessives, with Nathan Schneider"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Nathan S."]
number: "073"
tags: []
description: "ACL 2018 paper by Nathan Schneider, Jena D. Hwang, Vivek Srikumar, Jakob Prange, Austin Blodgett, Sarah R. Moeller, Aviram Stern, Adi Bitan, Omri Abend. In this episode, Nathan discusses how the meaning of prepositions varies, proposes a hierarchy for classifying the semantics of function words (e.g., comparison, temporal, purpose), and describes empirical results using the provided dataset for disambiguating preposition semantics. Along the way, we talk about lexicon-based semantics, multilinguality and pragmatics. https://www.semanticscholar.org/paper/Comprehensive-Supersense-Disambiguation-of-English-Schneider-Hwang/8310213af102913b9e74e7dfe6864f3aa62a5a5e"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F529407444&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner, and Waleed Ammar, we are research scientist at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:11">

Okay. Today our guest is Nathan Schneider, who is an assistant professor at Georgetown university.
He did a PhD at Carnegie Mellon university with Noah Smith and then a postdoc at Edinburgh and is
starting his third year as a professor at Georgetown. Nathan, welcome to the program.

</turn>


<turn speaker="Nathan S." timestamp="00:26">

Thanks for having me.

</turn>


<turn speaker="Matt Gardner" timestamp="00:27">

Today. We'll be talking about a paper that was published at ACL 2018 titled "Comprehensive
Supersense Disambiguation of English Prepositions and Possessives." Now this is a project you've
been working on for quite a long time. I remember talking to you about it and even helping with
initial annotation back at CMU five or so years ago. Can you tell us what's going on with this
project?

</turn>


<turn speaker="Nathan S." timestamp="00:50">

Yeah, so this is the latest iteration of this long project. We've been working on it for basically
four years. It started off as a chapter in my dissertation and then there kept being more to do. So
the idea here is that in languages such as English and in fact, most languages have similar
phenomenon. There are these words we call prepositions, which are these little function words that
typically precede a noun phrase and help us to describe something, some sort of relationship,
usually between a verb and a noun phrase or between two noun phrases. So you can say "the man in a
hat" or "the man in the room" or "the meeting in September." And these are all different uses of in
and these prepositions are highly polisames and highly frequent. So there has been a literature on
disambiguating them and we decided to sort of take a fresh look at this disintegration process. And
in fact, defining the task of what should our semantic representation be for these phenomenon.

</turn>


<turn speaker="Matt Gardner" timestamp="02:18">

So what you're trying to do is say in those examples, like "a man was in the room," you want to know
what exactly does "in" mean there? That's, that sounds hard.

</turn>


<turn speaker="Nathan S." timestamp="02:29">

Yes. It. So for "the man in the room," we can come up with a fairly straightforward category of
location or we call it locus, but essentially location. That's, the sort of most canonical use of a
preposition. But then if you say "a man in a hat," are you saying the hat is where the man is
located

</turn>


<turn speaker="Matt Gardner" timestamp="02:55">

Or "a man in a frenzy?"

</turn>


<turn speaker="Nathan S." timestamp="02:56">

In a frenzy? Right. So there are, so the way linguists often talk about this is that there are
prepositions and some languages have post positions where they follow the noun phrase. In the way
linguists talk about them is that they often start out as mainly spatial and sometimes temporal
markers. So "the man in the room" is a fairly straightforward spatial marker or you can say "I was
eating in the room" and there it modifies a verb. But then they very often get grammaticalized and
extended into all sorts of other meanings because we like to relate words together and there are
only so many syntactic devices that allow us to express relations sort of without any marking like
in English; subject and object are unmarked positions. There's no extra piece that you see, aside
from word order. And then you know, we can do things like adjective modifying noun or a noun
modifying another noun and non-noun compound. But if we want to sort of communicate effectively, it
seems that we often need these little function words to help narrow down the the kind of semantic
relation we're talking about. So, you know, the, we use words like in and at and for, and to, and
from.

</turn>


<turn speaker="Matt Gardner" timestamp="04:44">

And so the end goal essentially then is trying to decide what the relationship is between the main
content words of the sentence. Right. And there are a lot of different approaches to try to get at
this. So for instance, semantic role labeling says I have a verb and I want to figure out what the
what the verb has some, some number of arguments. And I want to know what particular relationship it
holds between the arguments of the verb and the verb itself. And this, this seems very related to
what you're talking about here. Can you tell us about the difference between these?

</turn>


<turn speaker="Nathan S." timestamp="05:17">

Absolutely. So yeah, so I would say the, the simplest difference is that semantic role labeling
approaches usually assume that there is some sort of lexicon of predicates or frame evoking of
words. And then from that lexicon, you, decide what the predicates are. And then for each predicate
you decide what it's possible roles are. So in prop bank there are lexical items, mostly verbs not
just verbs, but mostly verbs. And each verb has a set of senses and each verb senses has a, set of
numbered roles that are considered core arguments. And some of them are syntactically can be
syntactically realized as subject or object. And some of them can be realized as propositional
phrases. So that is sort of a lexicon based approach for describing meaning, representing meaning in
terms of the structure and relations of items within a sentence. The sort of direction. I pursued in
my dissertation and then in this work on prepositions along with Vivek Srikumar and Jena Hwang and
many collaborators over the years has been to try to come up with an open sort of inventory that
does not require a lexicon to first define for particular items, what the set of roles should be. So
the idea is this is where we get a comprehensive in the title.

</turn>


<turn speaker="Nathan S." timestamp="07:07">

So the idea is we're defining semantic classes rather than lexical sentence descriptions. And so we
have an inventory. Currently we have 50 classes which sounds like a lot, but it, we actually had a
lot more in the previous iteration. So we've, narrowed it down a little bit. And these classes are,
many of them are very much inspired by the semantic role literature and in particular verb, net
style semantic roles. And also some of the higher level frame net frames, although frameNet some of
the frames get very specific. So we have actually three portions of our hierarchy and two of them
are sort of more typical of what you would see in semantic roles of a verb. But then another portion
of the hierarchy that we spend a long time developing is for semantic relations between nominals.
And there's also a whole literature on semantic relations between nominals, including noun noun
compounds or noun with a prepositional phrase modifier, like "the man in a hat." And possessives
like "the man's hat." And so we see this as just a sort of a, another iteration of the semantic
class approach to complex nominals, but then integrating it with the semantic role style classes
noting that there's some overlap. So you can say "the man in the room" or "the man ate in the room"
the in there is essentially has the same meaning. So we want to have the same form.

</turn>


<turn speaker="Matt Gardner" timestamp="09:04">

So just to clarify some things. So you, you mentioned or you distinguished your approach to this
kind of tagging with SRL prop bank style annotations by saying that you're using a semantic, class-
based approach versus like a lexicon based approach. If I took a semantic class based approach to
semantic role labeling the difference then becomes a lot smaller. Right? And so you'd be a lot
closer to something that includes nominal predicates, like non-bank. So because you're, you're
dealing with prepositions that attach not just to verbs but also to nouns.

</turn>


<turn speaker="Nathan S." timestamp="09:38">

Yeah. So I, so I see this as a similar, you can, you can view this as a class-based approach to
semantic role labeling. If you take semantic roles to include a broad set of relations, including
some things that might be represented, in non-bank including things that are adjuncts or non-core
arguments as well as core arguments and so forth.

</turn>


<turn speaker="Matt Gardner" timestamp="10:03">

So why would we want to do this? What, what benefit do we gain from doing this annotation task?

</turn>


<turn speaker="Nathan S." timestamp="10:08">

The overarching questions is whether we can define a set of roles and relations that can
characterize the wide range of meanings that are out there and can be defined well enough to train
annotators to do this task reliability So the space of semantic relations is quite open-ended. And
this is by no means, you know, capturing all aspects of the meanings of these prepositions. But we
think that to a large extent, we can sort of say some of these are spatial relations, some of these
are temporal relations. And then within those we can distinguish, you know, location and source and
goal and time start time, end time, frequency, etc. And then we can broadly identify some non
spatial relations and non temporal relations. Like if you have a comparison between two things, "I'm
taller than him."

</turn>


<turn speaker="Nathan S." timestamp="11:16">

We have a label for that. And relations between individuals and organizations are quite frequent in
the domain we looked at. So if you work with somebody on a project or if you are, you know, kinship
relations and so forth. So there's a vast range of these things and we're trying to characterize the
sort of fundamental most basic kinds of relations that tend to get grammaticalised. So we're
talking, we're talking about relations that are important enough and general enough that they can
really be expressed by function words in a language rather than requiring a verb or a noun to add a
lot of conversation.

</turn>


<turn speaker="Matt Gardner" timestamp="12:12">

And so your motivation here in doing this, do you care more about describing language or like from a
linguistics perspective, do you want to understand how these function words are used? Or are you
coming at this from an applications perspective? Like, I think if I can do this tagging task, I can
do better as at building some NLP system or I want to understand how computers can, like how well
computers can capture this phenomenon. Like, what, what's your take, why, why are you interested in
doing this?

</turn>


<turn speaker="Nathan S." timestamp="12:44">

Yeah, so one of the big so, so I am both identify as both a linguist and a computer scientist. And
so I care about both sides of the coin here. The motivation from an NLP perspective involves better
understanding things like variation within and across languages so that we can build maybe better,
I'd be interested in working on things like paraphrasing and things like second language
acquisition. So if you've ever studied a second language you have probably had some difficulty
learning the prepositions. I don't know what, languages use studied.

</turn>


<turn speaker="Matt Gardner" timestamp="13:33">

Yeah. Yes. I've, I've definitely had that experience with a couple of different languages. Yes.

</turn>


<turn speaker="Nathan S." timestamp="13:37">

And this is because every language has a pretty idiosyncratic way of carving up meanings into its
grammatical items such as prepositions. So we know that second language learners have trouble coming
up with using prepositions in a native like way. So this seems like a fairly direct application. If
we could teach second language learners what sorts of semantic classes are, what the range of
listening is for certain items in English. We could help them to use these better in English. We
could maybe also use this kind of information and grammatical error correction kinds of tasks. The
broader picture of NLP is I think in general that meaning representations are important. And this is
by no means the only meaning representation that is important. But I think it's, important try to
understand how we can characterize compositionality in language because this is what helps us to
constantly produce and interpret utterances that we'd never heard before.

</turn>


<turn speaker="Nathan S." timestamp="15:06">

And we will not always be able to have an end task with a lot of training data that we can, we can
train an end to end system and ignore all the structure that might be that might be going on. So I
think in terms of building generalizable systems, and interpretable systems. I'm interested in
trying to have some explicit aspects of meaning. Now, of course, I'm not saying we should throw out
a word embeddings or for any of the rest. Maybe these sorts of analyses can help us to better
understand what our systems are doing right now.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:46">

So the first point I'm curious to know if you had any chance to look at the distribution of these
super senses in other languages and have you noticed any missing super senses, not in English, but
there exist in other languages?

</turn>


<turn speaker="Nathan S." timestamp="15:59">

Yeah, so this is, this is the most exciting direction that we're going now. We have for maybe a
year, but more intensively now. We started looking at a few other languages and trying to apply
these same labels. So we've looked, we've, I, my collaborator Jena Hwang has been looking at Korean.
I now have some graduate students I'm working with at Georgetown who are doing additional languages.
And we really want to see, first of all, are these semantic categories sufficient for those
languages. And what we've found is some, some really interesting cases where the space of what is,
well, so the, challenge often is defining what we consider to be a preposition or post position in
those languages. And do we require it to act syntactically in a certain way or semantically in a
certain way to even include it in this annotation at all. We have found, for example, in Korean,
there are a certain pragmatic uses of post positions that seem to be beyond these sorts of semantic
relations that we have here. But by and large, the early results are that, that the range of
preposition behavior in English semantically is so vast that they're the kinds of labels we've had
to come up with to Comprehensively annotate all the types of tokens of the, of prepositions in
English have more or less than transferring to other languages. So we are building a parallel Corpus
right now that will allow us to evaluate these these claims in a more quantitative way and see, you
know, are the same if we independently annotate both sides of the parallel Corpus and it seems like
literal translation are the annotators getting the same semantic label.

</turn>


<turn speaker="Matt Gardner" timestamp="18:23">

I'm curious to know if you have an example of that pragmatic that was indicated by one of the post
processors in the other languages.

</turn>


<turn speaker="Nathan S." timestamp="18:30">

As an example, I have here in Korean with the caveat that I don't speak Korean and this is from my
collaborators Jena Hwang and Na-Rae Han. There is a Korean post position nun, which seems to work as
a sort of a pragmatic focus vertical. So you can say "John gave an X box to Mary." You can attach
this nun post position on the Xbox and that sort of emphasizes it. So it's, it's "John gave an X box
to Mary" as opposed to something else. So we would I think this is similar to how we would do
contrasted focus in English by emphasizing it, by using parsing. This is an actual grammatical
marker that has a similar function. And so we don't, right now our scheme is purely semantic
relations. But one direction we've, we think we may need to push to account for prepositions and
post positions in other languages is to have some pragmatic labels as well.

</turn>


<turn speaker="Matt Gardner" timestamp="19:51">

Can you explain the distinction that you mean there a little bit, I think someone who's not trained
in linguistics might not really understand the difference between a semantic relation and putting
more emphasis on something. What, like why, why isn't this a semantic relation?

</turn>


<turn speaker="Nathan S." timestamp="20:06">

So pragmatics has to do with the structure of the conversation and the speech act. So the the, what
you're trying to, the, the act of communication as opposed to the state of affairs. You are, that
it's your, the content of your communication. So the pragmatics of this here seems to be that there
is so placing emphasis on something is a way of showing that , You are drawing the S the listener's
attention to something in order to, so that they may make some kind of inferences about about the
facts that you're trying to communicate.

</turn>


<turn speaker="Matt Gardner" timestamp="21:03">

As opposed to the semantic relations that are actually what the facts are that you're trying to
communicate.

</turn>


<turn speaker="Nathan S." timestamp="21:08">

Yeah, I should, I should say that I'm, I'm really not an expert in pragmatics so I'm, I'm hesitant
to to even try to define it. But the pragmatics is generally about the process of communication and
ways that language and grammar can make reference to the the process of communication and things
that may be shared between the speaker and the hearer but are not in terms of common ground and so
forth. These can be highlighted with a linguistic material.

</turn>


<turn speaker="Matt Gardner" timestamp="21:43">

Yeah. And we do this in English. Like if I want to say that John read a book, but I want to focus on
the fact that it was John. I can say it was John that read the book. But, but we're not using
prepositions to do this. And that's why this hasn't shown up in your, your super sense.

</turn>


<turn speaker="Nathan S." timestamp="21:56">

Right. So in English we might use a cleft construction to saying it was John who so changing from
the canonical order of John did X, it was John who did X. This is another way that that English uses
to maybe communicate a similar meaning to what would be expressed with a post positional marker in
another.

</turn>


<turn speaker="Matt Gardner" timestamp="22:23">

Okay. So I think we've got a decent idea of what you're trying to do and why. We want to categorize
what the meaning is when we see a preposition in particular. How does the preposition express what,
what role the object of the preposition is playing in the meaning of the sentence. So can you tell
us a little bit more about the I, we've talked about this a little bit, but I think we could use a
little bit more detail on the particular hierarchy that you came up with. Like these, you had three
broad categories. Can you tell us about this?

</turn>


<turn speaker="Nathan S." timestamp="22:56">

Sure. So we have three categories. Circumstance is for the semantics that most people think of when
they think of prepositions, at least in English. These are for spatial and temporal relations as
well as means and manner and purpose and things like that. So these are typically things that
applied to the modified verbs and are typically non-core or adjuncts or optional kinds of relations.
But I say typically because there are many examples of prepositions describing the location of a
noun phrase or and there even some uses of these that are core for some verbs. So the circumstance
part of the hierarchy is about generally elaborating on these sort of extra properties of events.
And then we also have a participant portion of the hierarchy, which is similar to the core, a
thematic roles or semantic roles and a semantic role labeling.

</turn>


<turn speaker="Nathan S." timestamp="24:27">

So things like agent and theme and recipients and stimulus and so forth. If you're familiar with
that literature. And then the third portion is what we call configuration. And these are mainly for
stated relations between entities that are not space or time. So if you say "the man with the hat"
there's a wearing relation, essentially we subsume that under a more general label called
characteristic. So the hat is considered a characteristic of the man because he's wearing it. We
have things like comparison RAF, which is for you know, taller than the man though the, the use of
the word than. And some other propositions that have similar meanings, like "I prefer swimming to
biking." So to, there also marks the second item in a comparison. We have labels for quantities and
rates and relations between individuals like employment and, and kinship and so, so forth. And we
call these social rail and orgrail to be fairly proud.

</turn>


<turn speaker="Matt Gardner" timestamp="25:56">

So this sounds like you, you listed a bunch of different categories. Turns out there are 50
altogether. This seems like a lot, like how do you decide to how many there are. You also talk like
there was a huge variety in, in what you described and I, it makes me wonder how discreet these
categories are and if this is really all of them. Are there more that you didn't cover that you just
didn't see in your small, in the Corpus that you annotated? Like prepositions are closed class words
right there on there's a small set of them that were ever actually going to see, but you're trying
to describe semantic roles in Symantec. Seems open-ended. Like we can see new situations all the
time. How can you hope to, to capture all of these possible relations in a single set of 50
categories?

</turn>


<turn speaker="Nathan S." timestamp="26:46">

Our approach was to try to define the categories to be general enough that you can imagine almost
any situation being an instance of one of these situations that we capture. So agent in theme to
take a canonical example from sematic go labeling agent and theme or agent and patient are used for
acts that involves some sort of causality from one person onto a thing or another person and a whole
lot of verbs and scenarios that we talk about can be can be slotted into this very generic scene of
agent acting on theme. So part of the answer is that we are, the reason we can hope to be
comprehensive is that we're very course rate and we're not distinguishing, you know, eating events
from from removal events or from you know, or you know, walking versus running and all these kinds
of things.

</turn>


<turn speaker="Matt Gardner" timestamp="28:09">

Yeah. Something like frame net that tries to list specific types of events with specific roles to
fill in that event is going to be a whole lot harder to scale to broad coverage and claim some
notion of comprehensiveness. Right. Where because you are doing something that's much more broad,
maybe you'll be able to capture new stuff better.

</turn>


<turn speaker="Nathan S." timestamp="28:30">

And part of the reason is because we think that because these are grammatical, these are function
words they are more likely to express things to be to have very sort of general and therefore useful
meaning's useful with high-frequency. I should mention some of the, the pioneering work on
prepositions, semantics lexicography and disintegration, which was the the preposition project.
It's, it's called, it's and there have been successive iterations of it, but it's, it's a lexicon
and database Corpus database of prepositions, senses that was built by Ken Litkowski and Orin
Hargraves mainly. And this takes a word sense integration approach to English prepositions. So it
says, okay, we have the word "in," we're going to look in a big Corpus and try to find out what the
different possible meanings of "in" are including things like wearing clothing and give those
different sense numbers. And then you could use those for annotation and disintegration. But what we
were trying to do here is that is to see if we can get away from the reliance on somebody deciding
what the fine grain senses are and exactly how they are carved up and try to come up with more
general principles for these these general purpose categories, which we call super senses. There's
also a tradition of super sense tagging of nouns and verbs based on WordNet the WordNet super
senses. And we are trying to extend this to propositions in synthesis.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:33">

Okay. can I push on this a little bit, I would like to understand better, for example one decision
that you must have made is in other configuration, there are multiple categories which are not very
frequent, like rates unit instead of, and you could have decided to merge them with a parent
category, which is configuration. So how do you make this decision?

</turn>


<turn speaker="Nathan S." timestamp="30:57">

For configuration we decided we didn't want to apply the label configuration directly. So we wanted
to have some sort of more specific label for everything under it. The,two you named are indeed the
most infrequent labels in our Corpus. And frankly we couldn't find anywhere else to put them. So
rate unit is mainly for "per" like 10 miles per gallon and "instead of" is mostly for, you know, the
expression instead of, or, and some other, there may be other things that have a similar function.
Which reminds me, I forgot to mention that a lot of the things that we've annotated are actually
multi-word expressions. So we have and this means the number of tokens we have to annotate. Well
this means that the task involves both deciding what the multi-word expressions are and then
assigning a semantic category to them. So essentially, yeah, if we found a use of a preposition that
we think we thought really didn't fit in any of the other categories, we tried to either create a
new category or figure out how to generalize one of the other ones to make it fit.

</turn>


<turn speaker="Matt Gardner" timestamp="32:23">

And then this makes me again worried about you mentioned two categories that were for particular
words that were special cases, how many more of these would you see if you were to annotate a much
larger Corpus? And is this like discrete notion of categories really the way to go?

</turn>


<turn speaker="Nathan S." timestamp="32:43">

So there is a question of , you can answer this on a theoretical dimension or I on a practical
dimension in both cases I would say we, coming up with a comprehensive annotation scheme requires
some compromises. So we are not claiming to perfectly capture all of the semantic distinctions that
a user might be interested in. We, do try to come up with categories that will generalize across
multiple prepositions. So if there is a really idiosyncratic use of the word "with" or something we
try to come up with a more general semantics that, that fits into. We're working on a database that
will be an online database of the prepositions that we've annotated and our annotation guidelines w
and so I just looked up rate unit and so it's not just per, it's also by, so you can say pizza is
sold by the slice. And so most of these functions at least are a little bit more general than a
single word.

</turn>


<turn speaker="Matt Gardner" timestamp="34:13">

Interesting. Thanks. Related to that, there's been a recent push by I guess mostly Luke Zettlemoyer
and his group that are thinking about using non specialist annotators to annotate semantic phenomena
just with language. Yeah. So this is things like question, answer, semantic role labeling, where
instead of for a particular, a particular relationship between a verb in its argument, giving it
like a formal art zero or art one that has some specific meaning that's dependent on the verb. Just
describe that relationship with a question using just some string of language. What, what do you
think of this approach to annotation instead of; Like what are the tradeoffs between using this more
open kind of description versus the more formal ategories that you've constructed?

</turn>


<turn speaker="Nathan S." timestamp="35:16">

I think these crowd sourcing directions of semantic annotations are really cool. And I would like to
actually explore to what extent can we could we convert at least part of our annotation task team to
a more crowdsourcing oriented way to go about it. I think the most frequent uses of prepositions are
spatial and temporal in a way that ordinary people could probably identify without having to learn
these 50 categories. And, and things like paraphrasing and question answering and all of that are
are interesting ways to elicit this data. I think I would also mention a Benjamin Van Durme means
group has worked on what they call semantic proto-roles, which are sort of decomposing properties of
arguments. Rather than assigning a single label like agent or, or patient decomposing them into
properties that people can identify, like animacy or whether something has moved in the course of
any events. And I'm also really interested to see how those kinds of things can relate to our
categorization. As, maybe this is just my bias from a linguistic background, but I think it is nice
if we can have some explicit labels that linguists can understand or maybe the developer of a system
can understand if they want to see why a system is making some inference from based on Symantec
analysis.

</turn>


<turn speaker="Matt Gardner" timestamp="37:09">

Yeah, I can see that. This seems very much like a, let's try to understand what's going on with
language more so than let's try to, maybe that's not the right way to think of it, but taking a step
back, it seems like people use language all the time without really explicitly thinking about these
formal categories. And so clearly that the capacity for producing and understanding language doesn't
depend on a formal understanding of the categories you've described. But on the other hand, for like
really understanding, meaning if we want to try to build systems that understand stuff, maybe maybe
this categorization would help us to build better systems.

</turn>


<turn speaker="Nathan S." timestamp="37:50">

Yeah. I mean, this is the age old question of, you know should we try to think of computers as
learning in an implicit way? Maybe like, we implicitly learn a native language without any, without
any explicit knowledge of how grammar works and how compositionalality works and what senses there
are words and so forth. Or should we look at linguistic analyses linguistic theories that try to
explain this sort of compositionalality and, and meaning and so forth and try and, and grammar and
try to take advantage of those in building artificial systems that will do useful things with
natural language. And I think at the very least, we if we're going to be good engineers, we have to
try to understand why our systems are doing what they're doing. So we need some techniques from
linguistics to poke around in the systems.

</turn>


<turn speaker="Matt Gardner" timestamp="39:01">

Yeah. And I guess this, so this is some results that you, I don't think I've heard about before.
These are new from some experiments that I've been running with an intern over the summer. But we've
found that we can train a language model Elmo on a bunch of texts and using just a multilayer
perceptron on top of the representation we get for each word independently get within inter
annotator agreement on your dataset. So what this means basically is that just by training a
language model, we can capture the phenomenon, the, the categories that you've described, I guess
you can look at, at this result in a couple of different ways. One is to say, well, if the language
model has some notion of this such that it can produce the categories once it's told about them
almost perfectly do we need this annotation at all that, that's one, one way to look at, look at it.
Another way to look at it is, Hey, maybe I actually captured something meaningful with this
annotation because it's something that you can actually get a machine to do consistently. What are
your reactions to this result?

</turn>


<turn speaker="Nathan S." timestamp="40:10">

Well, that's, that's really exciting. We thought this was a hard task because the train set is
relatively small. But we had not; in the ACL paper, we had not gone beyond sort of standard
supervised classification pipelines and we had not tried to Elmo at that point. So that's really
exciting to hear that that the accuracy is so high. I think this can be interpreted in a couple of
ways. One could be that, well, now we can try actually using these for downstream tasks and see if
they help these labels help for downstream tasks that were maybe we want something lower dimensional
than a language model. Another way of thinking about it is that maybe these are going, maybe if
there's some correlation between what language models are doing and how humans want to label these
function words. Then somehow we can start peeking into the language models to understand they're
capturing this meeting. So yeah, there's lots of exciting stuff to be done.

</turn>


<turn speaker="Waleed Ammar" timestamp="41:39">

Interesting. So going back to the paper, you make a distinction between the senior role and the
function of a preposition. Could you tell us a little more about those?

</turn>


<turn speaker="Nathan S." timestamp="41:49">

Yeah, so this is part of the, this is going to get a little sound, a little wonky in linguistically.
What I have said already has not already sounded wonky. The, but in going about this task, we
realize that there were cases where it was hard to choose one label for a token. And that was for
various constructions where the prep, there seems to be a mismatch between the lexical contribution
of the preposition and the the role that the propositional phrase is marking in an argument
structure in a an event. So an example is with the verb "put," you can put something on the couch or
under the couch or in the cushions of the couch. And the preposition you're choosing, there is just
a plain old locket of preposition.

</turn>


<turn speaker="Nathan S." timestamp="43:10">

So you can say the pillows are on the couch or you can put the pillows on the couch. However, in our
annotation scheme, we distinguished between locations and goals. So if you put something somewhere
that means it is moving to a destination or a goal. And therefore we were having all this trouble
getting annotators to agree on if they saw the phrase, "put it on the couch." Does that mean on is
marketing a goal or is it marking a location because on the couch by itself is sort of a location,
but put it on the couch. The putting tells you that there's a goal. So what we, and there were
various other kinds of situations in which this tension cropped up. And so we just, we decided was
that, well maybe even though we're gonna use the same set of roles or super senses maybe the ones
that are signaled by the preposition are not always the same as the roles in a scene or at a current
event. That the prepositional phrase is an argument of. So what we now allow our annotators to say
is that put on the couch that on the couch as a whole represents the goal. But the the on part is
really signaling locket of relationship between the pillow and the couch.

</turn>


<turn speaker="Waleed Ammar" timestamp="44:49">

And do you allow any of the super senses to fit in the role and in the function or are there a
subset, like a strict subset that is only valid for one or the other?

</turn>


<turn speaker="Nathan S." timestamp="45:03">

Good question. So the theory that we're developing essentially of these super senses is that these
are, the function is motivated by the lexical contribution of the preposition. But there are some
roles in relations for which there does not seem to be any preposition that is really fundamentally
signaling it and rather the prepositions that are being borrowed from other semantic domains in
order to signal it. So we have several roles that can only be treated as scene roles and not as
functions. For example, a stimulus and experiencer. So these are for events of perception or emotion
or cognition. And so you can say "I was frightened by the bear." Or "I was frightened of the bear."
Or "The bear frightened me." And there doesn't seem to be anything about by that is really
particularly associated with experience or I'm sorry, it stimulus.

</turn>


<turn speaker="Nathan S." timestamp="46:32">

Or, and there doesn't seem to be anything in particular associated with, of those associated with
the stimulus. Rather, what we think is going on is that there are different mappings of stimulus and
experience are onto other kinds of abstract scenes such as causality. So "I was scared by the bear"
or "frightened by the bear." Seems to portray this event as the bear is causing a change in your
mental state. Right. By the bear is like a passing by phrase. So the bear in that case we consider
to be a causer of your change in mental state in terms of its function. Whereas I was frightened of
the bear seems to be more of a portrayal of this relationship in terms of a topic or something that
you're thinking about sort of a purposefully so you're considering you could imagine you consider
the bear and decide that you're frightened of him. So the, this is an example where we give them the
same role in terms of the scene of being, of having an emotional reaction. The bear is the stimulus
of the reaction in both cases, but the prepositions that are used seem to be drawn from different
corners of the of the semantic space, if you will.

</turn>


<turn speaker="Matt Gardner" timestamp="48:15">

So we've already gone quite long on this and we haven't even talked about the particular Corpus or
the experiments that you run in your paper. I, I think we should just direct those listeners to the
paper to get more detail on that. But I had one last question that I wanted to ask you about before
we finish. And this was, so you've now worked on this project for about four years. You said this is
version four of your, the Corpus that you're releasing. It seems like most of our corporate don't go
through this kind of re annotation, fixing kinds kind of process. Do you have any thoughts on what
we should be doing differently in data annotation or like how projects evolve over time?

</turn>


<turn speaker="Nathan S." timestamp="48:57">

Sure. So well, so the the Corpus is in version four but it's actually only the second release of the
Corpus that has preposition and possessive super senses. So the, that Corpus the streusel Corpus has
been, has gone through several different releases because we keep adding more annotations, more
kinds of annotations to it. But in terms of the question of revising a and approach, I think it's
actually not that uncommon to, if you're developing a new meaning representation you're not going to
get a completely right on the first try. And even if you have lots of collaborators and you have
lots of discussions and you need to actually be looking at data and essentially debugging your
representation over a period of time. And I think it's fairly common that once people completely
annotate s Corpus, they realize all the things they wish they had done differently. So the, you
know, the Penn Treebank there was a big change from version one to version two and then there have
been, as far as I know, very minor changes after version two. So I think it's not uncommon for
people who really care about getting a linguistic representation right. To annotate data and then go
back and try to revise the scheme does that answer your question?

</turn>


<turn speaker="Matt Gardner" timestamp="50:40">

Yeah, yeah, it does. Thanks. And I think we should probably conclude there. Thanks Nathan. This has
been like a super interesting conversation for me. I've been thinking a lot about where we go next.
Like we've gone from just like NLP systems in general. We've gone from word embeddings as like the
basic input to our models to now these like linear language models. We've seen some models that use
span based representation, like span representations as one of their base inputs like for core
reference resolution or semantic role labeling. And it sure seems to me like predicate argument
structures are like the next thing to try to figure out and this work that, that you're, you've done
is, isn't nice contribution to thinking about what are the kinds of predicative relationships, how
do we find them and annotate them. It's a nice piece of piece of work.

</turn>


<turn speaker="Nathan S." timestamp="51:27">

Yeah, and I would, I would add to that, that I think I call myself pantheistic with regard to
meaning representations. I think there are many different meaning representations that have been
developed with different design principles and different pros and cons to them. And I think the
maybe the advantages of this representation are that it's core screened, so you don't need a lexicon
and it can be sort of applied comprehensively to all of the tokens in a Corpus of, of prepositions
and possesses and the, it has a metal language that is abstract enough to work across other
languages at least to a large extent. But that's not to say that we don't also want to take
advantage of more language specific resources like frame net and prop bank and so forth. That give
us a little finer grained window into particular times of events and, their predicate argument
instructions. So, and we've done a little bit of work and I think we need to do more work and
figuring out what are sort of the cost benefit analysis of these different schemes. And in terms of
how much does it cost to annotate, what kind of background the annotators need and then how, to what
extent do they correspond.

</turn>


<turn speaker="Matt Gardner" timestamp="52:56">

Yeah. Great. Thanks for coming on. It was nice talking to you.

</turn>


<turn speaker="Nathan S." timestamp="52:59">

Okay. Thanks so much for having me.

</turn>
