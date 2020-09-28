---
title: "An Overview of Question Answering, with Jordan Boyd-Graber"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Jordan Boyd-G"]
number: "072"
tags: []
description: "Our first episode in a new format: broader surveys of areas, instead of specific discussions on individual papers. In this episode, we talk with Jordan Boyd-Graber about question answering. Matt starts the discussion by giving five different axes on which question answering tasks vary: (1)how complex is the language in the question, (2)what is the genre of the question / nature of the question semantics, (3)what is the context or knowledge source used to answer the question, (4)how much \"reasoning\" is required to answer the question, and (5) what's the format of the answer? We talk about each of these in detail, giving examples from Jordan's and others' work. In the end, we conclude that \"question answering\" is a format to study a particular phenomenon, it is not a \"phenomenon\" in itself. Sometimes it's useful to pose a phenomenon you want to study as a question answering task, and sometimes it's not. During the conversation, Jordan mentioned the QANTA competition; you can find that here: http://qanta.org. We also talked about an adversarial question creation task for Quiz Bowl questions; the paper on that can be found here: https://www.semanticscholar.org/paper/Trick-Me-If-You-Can%3A-Adversarial-Writing-of-Trivia-Wallace-Boyd-Graber/11caf090fef96605d6d67c7505572b1a26796971."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F515333097&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guest is Jordan Boyd-Graber who is an associate professor at the university of
Maryland. He's done a lot of interesting work on question answering in particular a format that is
pretty unique in Quizbowl. And we'll talk about this a little bit later. Jordan welcome to the
program.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="00:26">

Thanks for having me.

</turn>


<turn speaker="Matt Gardner" timestamp="00:27">

And today we thought we'd do something just a little bit different from our typical format. Instead
of talking about a particular paper we're going to give a bit of an overview on question answering
as a task and what the different axes are that make different kinds of question answering tasks
different; where, complexity is, where different data sets focus. And Jordan has a particular take
on this that I think will give us some good insight on this general task.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="00:51">

I'll try not to push the task of Quizbowl too hard.

</turn>


<turn speaker="Matt Gardner" timestamp="00:54">

Yeah. And, he also has some, some stuff that I will talk about in particular a little bit later on
adversarial question generation which, which will be pretty interesting but we'll give it an
overview first. So as I thought about this, I thought there were a few different axes on which we
could categorize question, answering datasets and maybe what I can do is list these different axes
briefly and then we'll talk in depth about each of them and get your, thoughts on what's going on
here.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="01:21">

Sounds Good.

</turn>


<turn speaker="Matt Gardner" timestamp="01:21">

So the things I came up with were how complex is the language in the question? What's the nature of
the question semantics or genre is this factoid or common sense or math this kind of thing. What's
the context for answering the question? Are you answering questions? General questions that are
factoid where I can assume I have the whole web. Is this over images, this kind of thing? Like
what's my context? How much reasoning is there? This is a little bit more nebulous, but we can talk
about that. And then what kind of answer do you give? There are some datasets where I select a
sentence. I have a set of sentences that give the answer. I just have to select one. There's some
that are multiple choice questions, which is similar but a little different. Some that are short
answers. Some where you pick a span from the question, you could go even crazy and even crazier and
have the system write an essay. We don't really do that at this point, but you can imagine getting
there eventually. So these are the different axes that I thought of. For question answering
datasets. Does that sound reasonable? Are there any that I missed?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="02:24">

So I think that one thing that's been prominent recently, and I don't know if this falls under a
category, is whether it'd be computer absolutely has to answer. And so for example knowing whether
the system can answer the question is sort of like a meta level of question answering. That's been a
little popular recently. And so maybe that's just another flavor of answering.

</turn>


<turn speaker="Matt Gardner" timestamp="02:48">

Yeah, that, that's a good point. Yup. So maybe what we can do now is go through each of these and
talk about them in a little bit more depth. So let's start with this first one. How complex is the
in the question? So I guess when I think about this, I think the simplest kind of question answering
you can get is a procedural question. So something that was generated by a program or just like a
number, an index into like some preset canned list of questions. I wouldn't even call this question
answering myself. I'd prefer to call the slot filling. But an example of this, there's, I forget the
names, but like Wiki movies is one where the, the questions are procedurally generated, given some
templates. There is a Wikipedia info box kind of data set that's very similar where you're given a
slot in the Wikipedia info box to fill. You can think of this kind of question answering because you
could rephrase this as when was Barack Obama born for instance. But you don't have to understand the
question at all. It's given to you as just like an index into a preselected list.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="03:52">

But I think that those sorts of things are still useful because it's still phrases, language and
many questions are actually posed in this way. And I think even in systems like Alexa and Siri,
these sorts of questions come up fairly often and you can't get a lot of mileage from these system.
So it's a useful place to begin and you can move onto more complicated queries where you're doing
things like SQL lookups even though it's slot filling. There's a more complicated logic behind it.

</turn>


<turn speaker="Matt Gardner" timestamp="04:20">

Yeah, that's a really good point. There've been some interesting papers by Omer Levy had one, I
think there've been a couple of others where you do a essentially zero shot relation extraction by
treating the relation extraction as a question answering task. So you basically just have to write
down a template for some new slot and then if it's natural language, you could train a system on
SQuAD for instance and transfer it to this new relation and hopefully get good performance.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="04:43">

Right. And, and then moving on from slot filling you, you can have arbitrary, single sentences that
can ask just about anything. And there you have the complexity of English, which, which can get
pretty complex.

</turn>


<turn speaker="Matt Gardner" timestamp="04:56">

Yeah. If you go like as far as possible on this scale, at least in current data sets, maybe this is
something like Wiki table questions or complex semantic parsing datasets where you have multiple
conjunctions, maybe arc maxes like this. This is talking about it in the formal language. Maybe
that's not the right thing, but you have like nested clauses asking about things like what's the
most, or maybe you have several conditions on this. You can get really complex kinds of language.
Are there any other hard complex language data question, answering data sets you can think of?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="05:28">

All right, so let me begin the first of many advertisements for Quizbowl. So one of the nice things
about Quizbowl is that you don't just have single questions, you have multiple sentences that form
one coherent question. And so in some ways you can think of this as a paragraph that's posing a
question. And sometimes these are all independent sentences. They stand on their own, each of them
could be answered independently, but other times you can have much more complex among the questions.
So for example, here's a Quizbowl question and let's see if you guys can answer it from the
beginning of the question. "At its premiere, at the libretto system, this opera portrayed a
character who asks for a glass of wine with his dying wish. That character in this opera is
instructed to ring some bells to some in his love." So this is the first two sentences of a long
question that goes on to end for 10 points named this Wolfgang Amadeus Mozart titled for an
enchanted woodwind instrument.

</turn>


<turn speaker="Matt Gardner" timestamp="06:26">

The magic flute.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="06:27">

Exactly. And so there are a couple of interesting things going on here. So you have the librettist
of this opera not mentioning the librettist by name, portrayed a character who asked for a glass of
wine with his dying. Wish again, not mentioning that character by name. Then the next sentence says,
that character in this opera is instructed to ring some bells to some in his love. So you have co-
refrences across sentences linking all of that together. And you could imagine that if you had some
IMDb of Mozart operas, you might be able to figure this out, but you would have to reason across
questions enabled in order to be able to do that. And then even at the very end of the question, and
these questions are structured so that they go from hard clues to easy clues "an enchanted, woodwind
instrument" requires some wordplay in order to figure that out. So these are the sorts of
interesting things that happen in these Quizbowl questions. And thousands of these questions are
written every year for humans who are able to figure it out and compete with each other.

</turn>


<turn speaker="Matt Gardner" timestamp="07:24">

Yeah, that's interesting. I guess I might need to take back my earlier statement about Wiki table
questions being the hardest question format because this is, this is pretty challenging. Though I
still would say it's hard on a bit of a different level, right? So Quizbowl has this complex co-ref,
but there's less like nested clause where you have like complicated semantics of a single sentence
itself.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="07:47">

Exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="07:47">

Yeah. Another, interesting on very hard dataset is Jeopardy, which is very similar to two Quizbowl
and you, you yourself has had some history with this. I've heard, do you want to tell us about that?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="07:59">

Yeah. So I have appeared as a contestant on Jeopardy if this airs after September 26th or I will
appear as a contestant on jeopardy if this podcast that post before then.

</turn>


<turn speaker="Matt Gardner" timestamp="08:11">

And how did you, how did that happen?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="08:14">

Yeah, so I have always been interested in trivia and I used to play on my high school team and at
Caltech and at Princeton, I'm the coach of the Maryland team. And the reason I got into question
answering as a research topic is I thought IBM go on Jeopardy with their Watson project. And I
suddenly realized, Oh, well you can do this for research. And it was a way of merging the things
that I was doing for work with the things I do for fun. And I am very glad that IBM Watson made that
possible.

</turn>


<turn speaker="Matt Gardner" timestamp="08:50">

That was like 2010, 2011. 2010. That was right when I was finishing my undergrad and got me, I was
also very motivated by seeing Watson. I think I inspired a particular slice of a generation of NLP
scientists it was a nice piece of work.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="09:06">

Yeah. And so one thing that I would like to mention about Jeopardy is that first of all it was a
master stroke on the part of IBM. One thing that makes Jeopardy interesting from a competition
perspective is that if you want to know who is better at Jeopardy, you have to not only measure how
well they can answer questions, but how well they can buzz in, how well they can signal whether they
know the answer. And IBM stipulated that they had to use standard questions in that match so they
couldn't use specially written questions, which makes sense. And so they came from the standard pool
that the jeopardy writers write for the entire season. And these questions were far below the level
of questions that Brad and Ken could answer. And so they knew most of the answers. And so Watson was
fighting with two humans who knew most of the answers and Watson got an electrical signal whenever
it could answer the question because normally in jeopardy, Alex Trebek reads the question, lights
flash on when you can ring in.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="10:11">

And if you bring in before those lights come on, you're essentially eliminated from the question
you're locked out for tens of milliseconds. And in the game of jeopardy, that's death. So Watson was
able to compete with these two humans who were playing off against each other and had superhuman
reflexes and answering the questions that it wanted to answer. So in that way, you had this guessing
and buzzing mechanics that really tilted the game a little bit in Watson's favor as someone who has
been on jeopardy, that is really, really hard. And, and you can play at home and you can get most of
the answers right. But if you can't get the buzzing down, you are completely out of luck.

</turn>


<turn speaker="Matt Gardner" timestamp="10:47">

Yeah, that's really interesting. That's something I wasn't aware of until I heard you talk about
this previously. Yeah. It's hard to get a level, a level playing field. And as you've pointed out,
Quizbowl fixes this a little bit, right?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="10:59">

Yeah. So unlike Jeopardy where you have to wait until the end of the question in Quizbowl, you can
interrupt the question as soon as you know the answer and the quizbowl structure is such that it
goes from hard clues to easy clues. And so the people who are smarter can answer the question
earlier. And trivia nerds believe that this is the superior form of question answering because it
does a better job of discriminating who knows the most and in Jeopardy's defense it would make for
bad television. So people can't play along at home if there is a really smart player because they're
answering it way before the people at home could answer it and you don't have the same randomness
that you have in Jeopardy. And if the same person always wins it's less fun. Jeopardy has upsets and
randomness and that makes for a better television show.

</turn>


<turn speaker="Matt Gardner" timestamp="11:49">

Interesting. So I think that gives a pretty good characterization. This first access the that I
brought up of how complex is the language and the question, the second one I talked about was what's
the nature of the questions? semantics this is maybe a little bit more fuzzy, but what I was trying
to get here is the, is the genre of the question more looking at factoid kinds of question
answering, is it trying to get you to leverage common sense or even like an understanding of math or
science? So there's, a dataset called simple questions for instance, that looks at basically
freebased fact look up. The question. So in freebase it's a knowledge base that was built by, I
believe, MetaMind that was bought by Google and has since been discontinued, but it's got a set of
triples. Like Barack Obama was born in Hawaii for instance. And then you might get they, they made
questions where you hold one of those things out just from a single fact. And you need to predict
the thing that was missing. Right? And so this is like, this is trying to predict factoid kinds of
stuff. Quizbowl typically is also factoid. It's got really complex questions, but in the end you're
still predicting an entity that's kind of factoid kinds of knowledge in science question answering.
It's a very different kind of kind of question, right?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="13:09">

Yeah. And then you have other things like you have the children's books, sorry. No, the children's
book test, not plural on book where you have a relatively simple in terms of the language book and
you then need to answer reading comprehension questions about that. And that's from a Facebook,

</turn>


<turn speaker="Matt Gardner" timestamp="13:27">

Right. And reading comprehension question there, I guess we should note that a lot of these axes
kind of interact a little bit. So children's book is what we call it, close tests where you hold one
word out and try to predict the missing word. So whether that's reading comprehension is up to your
interpretation. But, yeah, the, the genre here is like a children's story and I'm trying to predict
missing held out words in a children's story. So I guess Jordan, you're not aware of this, but in
our last episode we talked about a narrative QA dataset called duoRC that looks at movie summaries.
So there again the nature of the question the nature of the data set might have more discourse kinds
of of question answering a instead of a factoid kinds of stuff. So that, that's another access on
which these question answering data sets can vary. What, what's the theme or genre? And that's what,
what kinds of things might assistant need to know in order to answer the question?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="14:29">

Yeah. And this is really bleeding into context now because you could also talk about things like
visual QA where again, you're answering questions about an image or a, some of the discourse
question answering things that have come out very recently, like QuAC where you have a conversation
and you need to answer questions in an extended series of questions.

</turn>


<turn speaker="Matt Gardner" timestamp="14:51">

Yeah. That, that is a good transition to this next access. So you mentioned a few different
contexts. I think it's interesting to think about like what's the set of all of the context that
people have used. So there's knowledge bases like freebase and this has been used in a few different
ways. You could even say that Quizbowl for instance the context that you're answering over is the
set of all entities that have been used in previous Quizbowl questions. That doesn't necessarily
need to be the case, but from my knowledge of this work, you collect beforehand a set of possible
Quizbowl answers and you're just selecting from those. So that's essentially the context that you're
using to answer these questions.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="15:35">

Yeah. And, and so to be pedantic, you could ask a question about anything, but it's a pretty good
bet that if you have all of the possible answers that have been asked before as your answers, that,
then that's a pretty good baseline and you can answer in a given year about 90% of the questions
that way.

</turn>


<turn speaker="Matt Gardner" timestamp="15:53">

Okay. Alright. So more kinds of contexts for science questions. I know some data sets that have a
specific scientific reasoning theory. So there's a domain theory where to answer the question, you
need to parse the question into a statement to this theory that then gets answered by a reasoning
system to actually return an answer. There was a food chain data set by some colleagues at AI-2 that
did this. The, I guess a very prominent question answering data set these days is SQuAD where the
context is a single paragraph. And presumably all you need to answer the question is in that
paragraph, is this similar to the children's book task where you're giving us a set? We're hopefully
the only thing you need is, is the 10 or so sentences prior to the sentence where a word was held
out.

</turn>


<turn speaker="Matt Gardner" timestamp="16:39">

You could conceivably have a dataset where your input is the whole web. Trivia QA is kind of like
this where you're given a trivia question and you do a web search, well, they did the web search for
you. But in principle you could do your own web search and try to get the answer that way. You
mentioned images, there's visual question answering so your context could be an image. Things like
the Cornell Natural Language Visual Reasoning dataset has this where there's also another variant
where your context is a structured representation of the content of the image, which is very similar
to other kinds of question answering over structured context that could be a knowledge base or it
could be a table from Wikipedia or like the Wiki table questions, data set. Seems like this is the
access where there's the most variation, right? I don't think, like I've, I've mentioned a whole
bunch and I feel like there's still a whole lot more.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="17:24">

Yeah. I think that there are papers on recipes and you have to a reason about could you substitute X
for Y and things like that. And, and so I'm blanking on what paper actually did that, but I remember
seeing that somewhere.

</turn>


<turn speaker="Matt Gardner" timestamp="17:38">

Yeah, Yejin Choi's group I believe has done a lot of work there. Do you have any notion for what
contexts make for the most interesting research?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="17:46">

Oh, that's really interesting. And I think the interaction between modalities is really promising.
And I think that we haven't done enough to fully exploit that. And while we have some datasets like
visual QA that tried to move from one context to another, many of the questions have artifacts that
prevent trained models from learning to transfer sufficiently or allow models that don't transfer to
do relatively well. And so I think that we need to do a better job of building those data sets to
really test how well people can transfer information across these contexts. So that's a way of
avoiding answering your question by saying yes all contacts are interesting and they're even more
interesting if you mix them together.

</turn>


<turn speaker="Matt Gardner" timestamp="18:35">

Yeah, that's a good point. I think the choice of context for a question answering dataset really
drives the nature of the research. So for instance, on SQuAD, the context is a single paragraph.
And, and by construction the data set has questions that are largely easy to locate within that
passage and are located in a small, like single sentence. So basically the, the task becomes one of
paraphrase. Can I, can I tell what the paraphrases of this question in this paragraph and find the
entity type that best matches the question word. And so I think what we've found, like what I've
taken away from most research on SQuAD is some really nice models for detecting paraphrase this,
this like attention matrix kind of stuff and iterating on how we get better attention matrices to do
this kind of localization is nice. You could argue that maybe we should just have a paraphrase
dataset to detect to do that in the first place. Like why do this as question answering. And then
that's an interesting thing to think about.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="19:37">

Yeah. And similarly for things like trivia QA, you basically turned a question answering task into
an information retrieval task. And you could say the same thing about some forms of Quizbowl
questions that you're basically just trying to find the relevant paragraph out there. And once you
find that paragraph, you can answer the question without really understanding the text. And so many
times a context drives the models that you'll eventually use. And obviously the same thing goes for
things like images.

</turn>


<turn speaker="Matt Gardner" timestamp="20:04">

Yeah. And so my question then is when should we look at data; if we're interested in studying a
particular phenomenon like paraphrase for instance, or image understanding when, when should it be a
question answering task versus some other more specific tasks?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="20:18">

I think one of the reasons that people are interested in phrasing them as question answering tasks
is that it allows for competition and comparison more easily. Part of this is that we enjoy
competition. We want to say my system is better than yours. And one of the things that have come out
of decades of humans playing trivia games and things like that is that we have well-defined systems
for competition. So we have the game of Jeopardy, we have the game of Quizbowl and we know how to
evaluate who is smarter and who is better at that. And we can shift those same competitive and
measurement frameworks to our computer algorithms. And part of that is just that we want to compete.
Part of it is that it's fun and it lets us do fun things like put Watson on Jeopardy. But there
there's also a scientific component that I think is valuable that we are now able to draw on the
vast history and lessons learned of human question answering about how to design questions that
fairly compare people, how to create frameworks that allow you to have maximum discrimination among
people or systems.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="21:33">

And that makes it useful to the phrasing in the question answering format. But as you say, if you
really care about paraphrase, sometimes it may be better to have a simple paraphrase dataset. But
one of the things that we've tried to leverage in our own research is that there are a lot of people
who care about question answering and you can get them to create good data for you because they care
about question answering on their own. And often these people are more reliable, more inventive,
more creative, more knowledgeable than say, arbitrary crowdworkers on the web.

</turn>


<turn speaker="Matt Gardner" timestamp="22:05">

Yeah, that's a really good point. Another, another motivation for it that I've thought about a lot.
I did my PhD working on the Nell project, Never-ending Language Learning. And this was trying to
build a knowledge base in some formal representation that tried to capture knowledge that was on the
web. And what I wondered about a lot is how do you evaluate this thing and what's the usefulness of
this particular formal representation that I've picked? And it seems a little arbitrary to me to
evaluate the representation itself. And it seems a lot more useful to evaluate it in some kind of
language in, language out kind of task because then systems can compete on equal terms and they
aren't locked into a particular representation that may or may not actually be any good. And I don't
actually get to evaluate the usefulness of that representation.

</turn>


<turn speaker="Matt Gardner" timestamp="22:52">

So for instance, let's take something like AMR, some kind of predicate argument, structure,
representation of the meaning of a sentence. How useful is it? Like we can write parsers to parse
into AMR or Parson to some semantic dependency, formalism or whatever we want. But I think what
ultimately, as someone who cares about building systems that work with language, the formalism
shouldn't be our end goal. What we want is a system we can interact with that, that uses the
language. And so if we can pose a task that that is well I would say the question answering is a
useful way to pose a task that hopefully requires some kind of predicate argument structure. So if
you really want to evaluate something like AMR or semantic dependencies I would say that the right
way to do it the right way to say, can I really understand pretty good arguments, structure to
construct a question answering task that at least we think requires understanding the predicate
argument structure of some passage of text. And then if AMR or your favorite Semitic dependency
formalism is the right thing, then you should be able to show that using it as an intermediate step
in my system actually helps performance does this, does this make sense?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="24:04">

Yeah. And I totally agree and I'm glad that you brought up working with humans. We're working
together. I think that's another reason that people like question answering and sort of this gameish
format because there you have things like teams working together to say answer a question. And one
way to evaluate things like these abstract representations is that if you're using these abstract
representations in answering the question, you can create a human computer hybrid team. So like a
centaur chess kind of set up where you have humans and computers working together and you can
evaluate the utility of those representations by showing them to the humans and this explains what
the computer is thinking and you could measure how well the human computer team performs as a result
with and without these representations.

</turn>


<turn speaker="Matt Gardner" timestamp="24:53">

Yeah. okay. So I think that's enough to talking about that third axes about what kind of context we
have. The next one I brought up was how much reasoning is there? This is, this seems a little more
nebulous to me. I was thinking things like if I have, at AI-2 we talk about science question
answering quite a bit. So think of a question like I roll a ball on the floor on the green carpet.
It goes faster than on the red carpet. That means that either the green carpet has more friction or
the red carpet has more friction. You have to pick which one. Right? so this seems like it required,
well, this definitely requires some kind of abstract reasoning, right? It's hard to quantify what
exactly like where the reasoning happens. Is this in the question answering, is this in the question
understanding components or do you have a separate reasoning engine? Similarly you can think about
math problems. There was a project for an AI-2 for a while trying to answer math SAT questions. So
things like if F of X equals X plus one, what does F of three and there you have to understand what
the question, the question semantics and then execute something against some math engine. And so
there's some reasoning involved there. But also I'm thinking of things like how much co references
there in the question. How hard is it to get from the question itself? To the answer, does this,
does this even make sense as an axis?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="26:20">

I think so. And one very simplistic way that we've been trying recently to get at this kind of
question is many datasets like trivia, QA or our Quizbowl data set are written by humans for a
human. And they often have shortcuts that the computer can take that don't require reasoning. And
for example, you ever see the strain phosphonium ylide, You don't have to understand anything about
the question. Just answer physics reaction and you're set. And that basically removes all reasoning
from the question. And one thing that we've been doing recently is if we show the trivia experts who
write questions on a daily basis for human trivia competition, how computers react to the questions
that they write, they can avoid these shortcuts and write questions that better challenge computers
but are still fit for human consumption as it were. And so this is a way of trying to do like
gradient ascent on the amount of reasoning implicit in many of these question sets. And one of the
interesting things that we found is that humans actually liked the question better. They find them
easier after they've gone through this process. And so the questions are less formulaic, they're
less repetitive and it still does a good job of discriminating who is the smarter human, but the
humans are able to answer them just as well.

</turn>


<turn speaker="Matt Gardner" timestamp="27:50">

Yeah, that's interesting. I have seen an uptick a little bit in building adversarially created
datasets. There was a one on a common sense inference recently that said EMNLP this year where you
specifically look for question, I guess this was; you look for instances that are hard for a system
to solve. We're thinking of building a QA data set that also uses an adversarial component. I think
I agree with you that this is a nice way to make our datasets harder. I guess the risk though is
that they're too tied to particular systems and so maybe it's hard for one system, but it still has
its own biases.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="28:30">

Ah Ha. So we, we actually looked at this and so we had the human question writers interact with a
very simple IR question, answering system not complicated at all about a hundred lines of Python
code. And we then shipped it off to another group who had nothing to do with this process and asked
them to run their fancy pants neural system on it. And it was still very challenging. And so maybe
there are aspects that could stump an IR system that a neural system can't handle, but we're not
quite there yet. And so even the things, that stump an IR system at the moment, are something the
neural systems as well or these two very specific systems.

</turn>


<turn speaker="Matt Gardner" timestamp="29:22">

Yeah. And I guess another, a challenge, another potential problem with an adversarially constructed
data set is that it's totally unnatural. Like why, the output might be something that a person never
really cares about because you're making it artificially hard to the, to the, to the extent that
people don't really, it's not natural distribution. Why should, why should we even study this
problem?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="29:44">

I think that's a good point. One of the ways that we tried to control against that is that we told
the writers that these questions were still meant for humans. And so they still had the norms that
they were typically using when they were writing questions for humans. They would still apply them
to these adversarially written questions. And when we had a game against humans and computers, the
humans really didn't notice any big differences in the questions. There were two or three questions
that felt a little funny, but they didn't view them as completely unnatural. And maybe if we iterate
this process many times we will get to the point where they are unnatural, but we're not quite there
yet. And at the moment I think we're exposing some of the things that are difficult for computers.

</turn>


<turn speaker="Matt Gardner" timestamp="30:33">

Yeah. Interesting. That's great. Definitely something to consider if you're thinking of doing this
stuff on some other tasks. Right,

</turn>


<turn speaker="Jordan Boyd-G" timestamp="30:39">

Exactly. And this is where it might be a problem if you are, say, using crowdworkers who don't have
a strict code of ethics and norms that they follow in creating these examples. And one of the things
that we'll be doing is we're doing another round of this experiment. You can watch the first round
on YouTube. And so presumably we can have a link that people can look at on the podcast information
and we'll be doing another round of competition on December 15th. And so if people want to enter
their question answering systems that can perform well on these adversarial examples, or if they're
trivia writers who want to stump question answering system, they can generate their own questions or
if they're a trivia team, they can come to College Park, Maryland and face off against computers on
these adversarially written questions.

</turn>


<turn speaker="Matt Gardner" timestamp="31:29">

Yeah. Great. We're getting a little low on time. I think we should wrap up with a discussion of this
last axes, which is what, what's the nature of the answer that the system has to produce. So we've
seen a little bit of variety here, so there are multiple choice questions there are science
question, answering data sets out of AI-2 that do a lot of this. There was a MC test by Microsoft
research that was reading comprehension. You get a short passage of text, and a bunch of multiple
choice answer question, a bunch of questions with multiple choice answers. There question answer
question, answering data sets that require generating a short phrase. I'm actually not aware of very
many of these. I know there are some on Aristo. So the science questions I'm not familiar with many.
So MS Marco is one where you have to generate a piece of text, but this is hard because it's not
really clear how to evaluate it. So I think we don't see this very often.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="32:34">

So in 2017 there was a Trek task called complex answer retrieval where you have a very short prompt
and then for example, what are the issues with the iPhone seven? And you have to generate a long
essay about that. And it's basically generating long, long answers for very short, not quite
questions, but more like issues or debates.

</turn>


<turn speaker="Matt Gardner" timestamp="32:59">

And how, how was that evaluated by human judges?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="33:03">

So there, are some automatic metrics, but yeah, the gold standard is a human evaluation.

</turn>


<turn speaker="Matt Gardner" timestamp="33:09">

Yeah. I'm really skeptical of things like BLUE for evaluating these, kinds of things. And so it
feels like that problem has to be solved a lot more satisfactorily before I'm really ready to do
research on this kind of more complex question answering.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="33:24">

Exactly. And so they tried to make it a little more reasonable by having topics that must be
mentioned should be mentioned or can be mentioned or things that are completely out of scope, but
that's not a complete way of evaluating it.

</turn>


<turn speaker="Matt Gardner" timestamp="33:37">

Yeah, and another format for answering questions that's pretty popular these days because of SQuAD,
which we've talked about a couple of times. I thought, I don't think we actually said the name. This
is the Stanford Question Answering Dataset; you're given a passage of text and you need to point to
a span in that text that contains the answer. I like this a lot actually. I think it's a nice format
for question answering because it allows a complex answers, but it's, it's bounded and it's easy to
evaluate. So there's like N squared and possibilities you have to pick from, which isn't, it's not a
tiny set. It's not four in a multiple choice question. But it's not infinite and it's clear how to
evaluate this. So I like that one a lot.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="34:18">

Yeah. Another format that I like is where you're supposed to generate a very specific entity and
then this is the format that say Quizbowl uses. You have a very large but mostly bounded set of
entities that you could answer. And this gets rid of some of the problems that you might see in span
answers where if you answer USA for United States of America, is that right or wrong?

</turn>


<turn speaker="Matt Gardner" timestamp="34:42">

Yeah. So you're right, there are some challenges with span based evaluations. The one challenge with
this select pick from an entity list is what if my answer wasn't in that list or the answer I'm
looking for? Right. So you're your by construction limiting the scope of your question answering
though you could argue that span based question answering does that too because you're, you're
restricting yourself to whatever you can see in a particular paragraph.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="35:05">

Yeah. And for things like trivia, QA and Quizbowl, these are datasets that are human generated
without thinking about what the answer set is. And 80 to 90% of the answers do lie in say all of the
Wikipedia page titles.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:19">

So as an outsider, I didn't really work on a question answering systems before and I wonder with so
many data sets, specifically a dataset coming out for question answering every week and I don't know
really where to start or like obviously different models work better for different types questions,
A question answering tasks do you have any advice for someone who's still like trying to learn about
this area or practiced art.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="35:45">

I think pragmatically, if you're a true beginner, I would probably suggest starting on something
like SQuAD, it's a relatively constrained problem as Matt said. And there are a lot of good
resources out there. You can download code to get you started and you can quickly iterate on it. I
think that one of the things that we as a community need to do better is to not just define tasks,
but also to provide framework so that people can explore problems like question answering in a more
consistent way so that we're not just having a proliferation of datasets each with its own method
for answering the questions in that dataset, but being able to have general purpose question
answering. And in some ways this is a little like the AI versus AGI debate and maybe we need to
focus more on general question answering.

</turn>


<turn speaker="Matt Gardner" timestamp="36:39">

Yeah. And I am having a hard time thinking of how to answer that, how to answer Waleed's questions
because I just talked about these five different axes. That question answering tasks can fall under
and there's such variety as you said and what you should focus on I think really depends on what
you're interested in. What kind of underlying phenomenon do you really want to study? Do you want to
study reasoning systems? If so, you probably want to do something like semantic parsing, something
that requires some kind of underlying like logical formalism that will permit discreet reasoning and
counting and set up operations. There are probably some people that would argue with me about the
need for like a discreet logical formalism, but the datasets, that are designed for this, like what
do you table questions or Cornell natural language, visual reasoning these, these kinds of datasets
permit more like formal logic, discrete kinds of reasoning.

</turn>


<turn speaker="Matt Gardner" timestamp="37:36">

If that's what you want to study, that's where you should focus. If what you care about is more like
connecting multiple facts together than something like Quizbowl or even Jeopardy. I don't think
they're very standard datasets or valuations for that just yet. Watson kinda did their own thing but
Quizbowl or trivia QA maybe, but there's not as much connecting and stuff there. There's Wiki hop,
some like multi-step kinds of datasets, complex web questions. So there, there are a number of
things to study there. So I guess to answer your question, what I would, what I would think first
question answering is a format, right? It's not, it's not a problem. It's not a, it's not a
phenomenon to study. It's a way to study a phenomenon. And so what you should think about is what do
I want to study, what do I care about and then figure out if question answering is the right way to
study that phenomenon. And if so, what data set should I use.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="38:29">

Thats a great way of thinking of it. And one pragmatic consideration. I would also add that you
mentioned for like long answer question answering is that is there a good evaluation? And if you're
going to work on question answering, one of the benefits of working on question answering is that
it's often easy to evaluate or straightforward to evaluate. It's not easy and you should make sure
that your question answering framework allows for a consistent reproducible evaluation.

</turn>


<turn speaker="Waleed Ammar" timestamp="38:58">

Yeah, that makes a lot of sense. I mean for a sort of sound, I'm interested in semantic parsing and
I could like build by semetic parser I don't know, maybe train my semantic parser and then on this
frame that data set. And then as a downstream task, I would consider a lot of the datasets that
would actually require some form of reasoning and use the representations are predicting. But I
wonder if the current state of the art systems for some of these question answering system actually
require this form of linguistic analysis or most of them just have one model that's fitting for the
answers directly trying to answer that, the format that basically that we're trying to address.

</turn>


<turn speaker="Matt Gardner" timestamp="39:43">

Yeah, we should be a little bit careful there because you said frameNet frame semantic parsing.
That's a little bit different from what I was talking about with semantic parsing. A frameNet is as
like a lot more like semantic role labeling or finding predicate arguments, structures that that's
not what I meant when I said semantic parsing. Terminology's a little bit confusing here.
Unfortunately. What I meant was parsing to a logical formalism that like, like first order logic.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:09">

I think it is the same thing.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="40:09">

Well it's actually not because on Wiki table questions you have to like add to sets, you have to be
able to sort things and you can't do that with predicate argument structures, right? It's a, it's a
different kind of operation.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:22">

I meant there's already like an existing data set that you can use to, to do both types of problems.
And then so you can use the intrinsic data set for assessing how your, how would your doing, you
were doing analysis and then use the question answer to see how would it those in, in a more
practical scenario.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="40:43">

Although that being said, one very frustrating thing that I think comes up a lot is that people have
this great idea. I'm going to use AMR for question answering. And they try to apply to question
answering and maybe it helps 0.002% or something. Many of the things in question answering, at least
with our current data sets can be solved really stupidly. And as I mentioned before, there are these
shortcuts that computers can take. And until we can eliminate those shortcuts, we're not going to be
able to see the gains from using AMR or a logical forms until those shortcuts are cut out of the
picture.

</turn>


<turn speaker="Waleed Ammar" timestamp="41:21">

So the underlying, so what you're saying is these question answering platforms are not necessarily a
good way of assessing how well we're doing to analyze language. Which kind of defeats one of the
main reasons were trying to answer them.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="41:35">

I think that we're trying to do science and sciences in many ways, iterative and we're doing the
simple stuff first and hopefully we can improve the datasets so that the data sets will capture the
kind of phenomenon that we want computers to understand. And maybe a side effect is that we will
have another N squared data sets to deal with that. We'll try to suss out these different
combinations of problems and data.

</turn>


<turn speaker="Matt Gardner" timestamp="42:03">

Great. I think we've done a good job talking about all of these different axes. I, like question
answering a lot. I'm pretty motivated by this. This is where I spend my time doing my research. It
seems like you agree. Jordan, any last thoughts? Anything you wanted to talk about that we missed?

</turn>


<turn speaker="Jordan Boyd-G" timestamp="42:18">

So I guess I'll end with a plug again for our December 15th human computer question answering
competition, you can find more details at quanta.org question answering is not a trivial activity
and you can figure out how to enter systems enter human teams or write questions for the event. This
is a good opportunity not just to advance the state of the art and research, but also to engage
communities like high schoolers, college students who aren't say computer scientists and help them
understand what is possible in question answering machine learning, natural language processing. You
can learn a lot by the hilarious, wrong answers that these computer systems produce and more people
are going to know about it based on funny YouTube videos or seeing it live in person than reading
any of those papers.

</turn>


<turn speaker="Matt Gardner" timestamp="43:07">

We'll definitely have some links in our podcast description. Great. Thanks for coming on. It was
really nice talking to you.

</turn>


<turn speaker="Jordan Boyd-G" timestamp="43:13">

Likewise. Thanks for having me.

</turn>
