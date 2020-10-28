---
title: "Question Answering as an Annotation Format, with Luke Zettlemoyer"
hosts: ["Pradeep Dasigi","Matt Gardner","Waleed Ammar"]
guests: ["Luke Zettlemoyer"]
number: "096"
tags: []
description: "In this episode, we chat with Luke Zettlemoyer about Question Answering as a format for crowdsourcing annotations of various semantic phenomena in text. We start by talking about QA-SRL and QAMR, two datasets that use QA pairs to annotate predicate-argument relations at the sentence level. Luke describes how this annotation scheme makes it possible to obtain annotations from non-experts, and discusses the tradeoffs involved in choosing this scheme. Then we talk about the challenges involved in using QA-based annotations for more complex phenomena like coreference. Finally, we briefly discuss the value of crowd-labeled datasets given the recent developments in pretraining large language models. Luke is an associate professor at the University of Washington and a Research Scientist at Facebook AI Research."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F711922993&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="">

All right. Today I have two new people to introduce because we are adding a new co-host to the NLP
highlights podcast.  Waleed and I, for a few reasons, decided it would be good to have a third
person helping us. So we've asked Pradeep Dasigi who is also a research scientist at AI2 to join us
as a co-host. Pradeep, welcome.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

Thank you. Hello everyone. It's great to be here.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Do you want to introduce yourself very briefly?

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

Sure. I'm a research scientist AI-2. I've mostly been working on question/answering and semantic
parsing kind of problems. I've been a regular listener of this podcast and I'm really happy and
excited to be part of this now.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Great. We're glad to have you. And today our guest is Luke Zettlemoyer. Luke is a professor at the
university of Washington and the scientist at Facebook AI research in Seattle and I had the pleasure
of working with him for about a year at AI-2 when he was here. Luke, it's really great to have you
on the program.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Thank you very much, I'm super excited to chat about some stuff.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah. I guess today at the topic I wanted to talk about with you is something that I guess you
influenced my thinking on very heavily and this is how we can use question answering it as an
annotation format instead of traditional formalisms. So I guess when you think about question
answering in natural language processing, this community, I guess for a long time it was mostly
focused on open domain, factoid QA or semantic parsing, which you, Luke have a lot of experience in,
but more recently it's been used for other things including as I believe you introduced this; as an
annotation format. Do you want to explain what you did here?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Yeah. So I think that the idea is a little bit more general even than just QA, but we'll talk about
it mostly in the QA context. And the idea is that often when you label a data set, you want to, you
know, get a model to predict some linguistic structure like predicate arguments, structure,
connecting the verb to their arguments and seeing what kind of relationships they are or co-
reference resolution, where you find all the noun phrases and cluster them and kind of the standard
way of doing annotation tasks. You need to think of a really complicated annotation spec and think
about all the linguistic phenomenon and maybe design an ontology for the possible relationships
between things. Then very carefully go and label and it requires a lot of expertise and a lot of
training to do this right. And so what we were trying to think about is, you know, how could you get
labeled data, but in a way that's much easier to train people to do.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

So the general theme is that you could say what I'm going to do is take this linguistic phenomena or
this other thing that I want to try to label and I want to try to reduce it. Even if it's noisy, I
want to try to reduce it to some end task that people understand. Something that we already know how
to do very easily that I can train you in just a few minutes to understand because it's essentially
this other thing you already know how to do. And so question answering is a great example of that.
So if I ask you a question, you can just read the text and you can answer it. And the way that we
were doing it, the annotators actually have to write the questions and the answers. So it's a little
more complicated. But the idea is that with very little explanation you can get an annotation that
closely matches what you're looking for in linguistics because people know how to do these other
tasks.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

So this specific instance of this that we did was the QA SRL was the first version of it. And there
it was semantic roles. So you know who did what to whom. And so, you know, if you have some sentence
like, you know, "Luke is hoping that the interview that he is giving today is going very well, you
know, blah blah blah blah blah." Then you know, you have certain agents and patient relationships
between various phrases in that sentence. But rather than getting a whole ontology and thinking of
all the possible relationships, you could just say who's giving an interview, what is the interview
on, when is the interview happening, these kinds of things. And the answers to those questions will
directly correspond to different semantic relationships you might want to label.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah. So I guess we can think of this as using natural language to annotate instead of the
formalism, right? So when you do this, there are going to be tradeoffs. So you mentioned you don't
have to do all of the work of like coming up with the ontology and defining and carefully training
people on what the, what, what the distinctions are that you might care about between I don't know,
Arg0 and Arg1, for instance in semantic role labeling. But it feels like you lose something there
when you don't have that and you use language instead. Can you talk about these tradeoffs?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Yeah, I think it's a, it's a really great point and there's always going to be trade offs and this
case the philosophy was try to go as much as possible kind of ontology free. So we don't want to
sort of specify exactly what the possible relationships are and events. And, but that then you do
lose something, right? Because for many end tasks you do need to reason about certain relationships.
But the feeling was that maybe that's more of a end task specific thing. So if you're building an
information extraction system, you may have your own ontology that you care about. You know, in
terms of maybe famous people and the relationships they have to each other or you know, whatever
sort of product you're trying to build or whatever you're trying to do with it. And then maybe it
makes sense to sort of wait a little later to impose the ontology and that is the core NLP tool so
just give you the structure and say, look, there is some relationship, that relationships can be
described with these words. Now it's not unique, right? There could be multiple questions that all
have the same answer, but at least here are some words that can describe that relationship and then
we can give that to someone later on that can think about how to make use of that as appropriate for
what they want to do with it.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah. I guess if, let's say I really want a distinction between the temporal arguments to SRL and
maybe a causal argument, I don't know, maybe maybe this distinction is really important to me.
You're saying with this QA SRL formulation that perhaps a way to do this is get a lot of data
cheaply from people to get the basic structure and it's going to be unnormalized in some sense. And
that the relationships will be labeled with language, but my downstream system, I can train it to
make the actual distinction that I want to given the structure that I've recovered much more easily
than I could have if I had just tried to do this distinction from scratch. Is that fair?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

I hope so. Yeah. I mean, I hope that's true. I think it's still largely untested at this point, but
I think that's a good summary and this work was kind of happening, you know, in a different era of
NLP before we had, you know, pre-training and so forth, really having huge impact. And so I think
some of the original motivations are even a little different than how we might look back at it now
and think about how to use it. But you could imagine that there are structural cues that you really
need to get right, for example, for certain extraction tasks. In that, you know, just contextual
embeddings or something else will actually allow you to do similarity and kind of sidestep a lot of
the ontological issues. But again, you know, we're also punting, right?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

So, you know, FrameNet is an example of a SRL, formalism where they do just a really great job of
designing a really interesting ontology and you learn generalizations across different forms of
verbs and so forth. You know, some of them express the agent as the subject and some of them is
objects and you know, these kinds of things and you, and so, you know, conceptually, if you had that
ontology and it was perfect, you should be able to generalize better. Like you should be able to
make use of it and we're missing that opportunity. So it's interesting in general.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah, I agree. I want to come back to this pre-training point and how this whole idea fits into the
new world of ELMo and BERT, RoBERTa and all of this stuff. But before we get there, I think it'd be
interesting to talk about where else this applies, where else you've done it, where else we could
take this general idea. So we've talked about QA SRL where you try to use question answering as an
annotation format for semantic role labeling. You also have done QAMR, you would tell us about that.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

So within predicate argument structure of a sentence. So they way you think about predicate argument
structure or the way I think about it is, you know, like a little graph backbone of all the words
and their relationships to each other. And you know, most of the work on the predicate argument
structures is in semantic roles. So it's only the edges between the verbs and the arguments.
Although of course there's some notable great work on doing nouns and other things too. But the
majority of it is focused on verbs. And so when we did the QA-SRL annotation, we limited the set of
possible questions that could be asked to set up templates, which designed very specifically to
think about verbal predicate argument structure.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Now where you would like to actually get sort of a more complete semantics for the whole graph.
Think of something like an AMR or Hooker representation or something like that, but the QA-SRL has
no history about how to do that. So the QAMR effort was a effort to sort of relax and say, look,
we're not going to presuppose exactly what set of questions can be asked. We're just going to say,
look, ask any sort of simple question you could that is asking about relationships in this sentence.
And it was an effort to try and get the annotators to actually show us what kind of edges should
appear in these semantic graphs through their very free choice of what questions to ask and what
answers to give. Julian Michael was really driving this work and he did a really great job of, you
know, getting this to be crowdsourceable, being able to gather these annotations at scale.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Again, this was actually done in a different modeling era. So one of the challenges there was just
like how to model this really interesting complex data that you got out. There were issues of
completeness it was hard to know if you've got all the questions. But generally the questions we got
were very good and then figuring out how to model with some incompleteness and with models that
weren't quite as good back then. I was quite challenging. So I actually think it's probably worth
revisiting now. Our models are so much better and you know, you can sort of have a fresh look at all
of this, but that's kind of where that project was standing at the time.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

So, right. You talked about QA-SRL and QAMR a, I guess going back to the idea of how general this
formalism is are there at a high level, any limits on what kinds of linguistic phenomena? This
formalism of question/answering can focus on?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Yeah, that's a great question. I don't know the answer. I mean I think that going back to the
original inspiration, I actually like to think of it as take a semantic phenomenon and then reduce
it to any end tasks you think of. So anything that you could have people do beyond just question
answering. So by analogy, actually some of the most successful large datasets kind of have this
property already. So speech recognition, like if I play an audio signal for you, I don't have to
teach you how to write a sentence. You know how to do that task already, right? Machine translation
similarly. I mean you could argue about exactly what qualities the translation should have, but
people already know how to do that task. Actually, part of the motivation before pre-training was to
get a lot of data.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

If you want to ever get a lot of data for a task, you need to reduce it to something that people
already know how to do. Okay. And so you could take an extreme stance here, which I don't know if I
believe, but you can take an extreme stance that anything that we should aim to recover in language
should be reduceable to something that people already know how to do. That's a little bit extreme,
but I would love to kind of push that agenda and say like, you know what can't you do this way? It's
not all going to be QA. I think QA is more things where you're trying to identify a span of text.
Cause often you, you know you have a question and the answer is a span and the question is kind of
telling you the relationship between one or more spans of texts. So I would think most tasks
hopefully that were relationships between spans of texts could be done, but I don't know how to
prove that. But more generally I hope that this idea would go far beyond that to kind of anything
that's reducible to some tasks that we already know how to do.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah. I think the decompositional semantics initiative by Aaron White and Benjamin Van Durme and
others, we interviewed Aaron White on the podcast a few episodes ago. I think that it's very much
related to this idea that they're pushing on a few different areas of semantics that way.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Yeah, I love that story. And it's, and one way to think about that is that it's more about like at
least the earlier versions, I'm sure that generalized it, but it was a really nice idea of like what
should the labels be, you know, on the edges, right. Which we're sort of almost punting in the QSRL,
we're more asking which spans of text should be connected by an edge and they're thinking more about
like what is the right set of labels and how do you decompose that space. And I think it's very
complimentary. Like I was pretty excited when I saw that work for the first time.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Right. Jumping back to QAMR a little bit, just to give a concrete example of this. So semantic role
labeling is verbs largely and what nouns attach to the verbs, and as you said, QAMR tries to do more
general structures. One example of this might be Facebook scientists, Luke Zettlemoyer as part of a
larger sentence, but you would questions just about that noun phrase, right? What kinds of things
might you see?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Right? So I think you would see things like, you know, what's a Luke's job or what kind of job does
he have? So more what kind of questions? In general, you know noun, noun compounds often have very
complex implicit relationships, right? So this is one example of that. But you can also say things
like baby food, you know, it's food that babies eat, right? It's not no food made out of babies.
That is what everybody's classic example is. Whereas in other noun noun compounds that actually
express, you know, what the thing was made out of. So, you actually see that kind of stuff showing
up in the data. You say if you show somebody a noun noun compound or you say, you know, try to use
this word in the question, this other word in the answer. They'll think about what's the
relationship and they'll express it in natural language and that was one of the cool things that
popped out with that data and you see it also in all kinds of other situations, not just in noun
noun compounds where you have implicit relationships that aren't explicitly specified with the word.
So that was pretty cool.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah. I guess earlier we brought up trade offs between formalism based annotation and natural
language based annotation and one nice thing that you get from QAMR is this flexibility that the
annotator can inject, giving you information that's not there and that would be super hard to
capture in a formalism. How do you even write down a formalism that says like there's this
employment relationship? I guess you could try to characterize all possible noun compound
relationships but...

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

There is some great work for sure on a bunch of really nice papers I'm doing noun noun compounds. I
think Vered Shwartz has done some really great work in that area. I just happen to know her work.
It's not something I know that well in general. So there are some people that have thought about
that. But I do think that there's a potential to be more scalable when using natural language as the
ontology because you don't have to specify that. You can sort of explore it as you go and see what
falls out.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Right. And and language is productive. People come up with new uses for these things like Watergate
and how that turned into Pizzagate and all kinds of other gates and like there's new stuff that's
just going to be hard to fit into an ontology no matter what you do. And so that, that's really a
really nice thing about using language itself as an annotation format.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Yeah. And again, you know, ontologys are useful. So you are giving something up but then you're
getting some flexibilities. I totally agree.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

Right. So that's one advantage of using QA as a format, right. You get more information from the
annotators. Are there any other advantages in terms of how you can use that data? Does say QSRL open
up new avenues for using the data that you're getting or building models using that data that a set
of data for example, can you pretrain question answering a model on QARSL and use it for other
downstream tasks? Other advantages like that?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Yeah, I mean, that's a great question. We should investigate the pre-training avenues more. We
haven't done enough of that. That would be the sort of dream would be that you could scaffold BERT
or something a lot like you can do with MNLI where you sort of first fine tune on QASRL then fine
tune something else. We haven't shown that. Like we haven't just haven't had a chance, you know,
there's only so much time in the day. I think it would be a fun direction to explore. I'm a little
nervous that, you know, a lot of this stuff is in there already in terms of the predicate argument
structure. But another interesting angle beyond just kind of core numbers on tasks is
interpretability too. So you know, if you'd like to be able to express to users what relationships
you think exist in a text and natural language is a pretty natural way to do that.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

So if your models can predict in this space, maybe you know, maybe they can better explain why
they're sort of making predictions they're making. And we did some very small version of this last
year on the large scale QASRL parsing where we sort of showed that the model can predict what
semantic edges. You want to, the model actually predicts the questions and then you show the
question to users or crowdsource workers and have them answer. And then you know, you can sort of do
this kind of active learning are human and Luke kind of parsing because everybody's working in a
space where we all understand the relationships and so I can show you my predictions. You can
correct, conceivably you could even show me your predictions. I can learn from, you know, this whole
interesting sort of interaction that can happen. I still haven't given up on like moving the core
numbers, but I also think there's other ways of thinking about the usefulness.

</turn>


<turn speaker="Matt Gardner" timestamp="">

So I know that you also had a project, a at least briefly trying to get this same question answering
as annotation, idea working for co reference resolution. But I think you ran into a bunch of
challenges there. Do you want to tell us about this?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Yeah, that's a great question. I really like thinking about sort of how to push this in different
directions. We sort of just did some preliminary piloting. We didn't ever try to like launch a full
project. I actually think it's still pretty doable, although we could probably talk to the poor
students that had to suffer through the pilots and see what they think. One interesting thing we
found in the original QASRL and also in the QAMR is that people resolve co reference when they do
QA, they just do, right? So if you say, you know, "Luke is excited that he's having an interview",
then you know, say who's having an interview, they're not going to answer he, they're going to
answer Luke.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Right. So one of the small tweaks we had to do in the original data annotation was to train people
to answer in pronouns, not antecedents. So it turns out that you know, this just happens naturally
and I think that gives you some leverage for thinking about how to crowdsource co-ref. That's not
perfect. But if you can figure out which phrases are referential are referring back to something and
then you know, think about the local relationships and design questions I would ask about those
phrases. You'll often get antecedents as answers if you don't train them not to do it. I still think
it's a pretty exciting direction. Something that we would still like to work on in our preliminary
studies kind of showed that it does work, but you have to be a little bit careful about exactly
which questions you ask and think about how to do it scalably and so forth.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

And there's another caveat, which is that co-reference is a very complex phenomenon and the types of
co-reference that are on ontonotes, I mean ontonotes has done a great job. That's our reference data
set in this area has done a great job, but you know, it's done that by, by carving off a well
circumscribed set of co-reference phenomenon and there's all kinds of weak co-reference, bridging
co-reference and other things that happen that would, you know, potentially just fall into the QA
formulation. That'd be great. But it would be maybe harder to map it back to what we already know,
which is, you know, pluses and minuses to that.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah, definitely. I remember reading a paper a long time ago by a Marta Recasens and Ed Hovy and
maybe others about near identity coreference relationships and how it's really hard to define even
like some of these relationships and again, thinking about trade-offs. This is another place where
it really seems like it'd be useful to use natural language as an annotation format so you don't
have to box yourself in too much with the formalism that might not capture what's actually going on
in the language.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Yeah, I think it's super exciting. I mean you could argue that as it field in general, we should be
trying to push more of the boundaries of the task definitions. You know, in many ways the tasks
we're solving are just overly simplistic because we didn't even know how to dream about doing harder
tasks a few years ago and you can argue that now we're ready for that. You know, a lot of tasks are
quote "human level performance" and it's time to start thinking about sort of newer, harder things,
which won't be too difficult, I don't think, to find, although it's always hard to get annotations.
So you know I have a lot of respect for people to make data sets, but I just mean that phenomenon
there's lots of them.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Talking about this co-ref and new datasets, harder problems. I think it's a good time to talk about
some work that Pradeep did that I think is very related. You want to tell us briefly about co-ref
and how this fits in.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

Right. We built this new reading combination data set called Quoref. That's whit a Q, so it's a
question answering dataset that uses co-reference resolution. So the ideas as Matt mentioned, it's
quite similar to ideas that Luke was talking about in terms of a building question answering for co-
reference resolution. Although what we did was not necessarily to get questions that talk about all
possible co-reference resolutions in a given context but instead we wanted to build a hard reading
comprehension dataset that condensed questions that require co-reference resolution. The dataset
itself is a span selection question answering dataset very much tech SQuAD except that before you
get to the answer for most of the questions you are required to resolve co-reference in the given
context to get to the answers.

</turn>


<turn speaker="Matt Gardner" timestamp="">

As you were talking about your co-reference project, I think it's very similar to what we did here.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

The hope would be to try to get a more dense annotation would be one of our goals, but I really like
what you did there balancing sort of the co-ref that you actually need to do QA, and that seems very
clever to me. This is going to be a really nice piece to bite off and I should say actually one of
my PhD students is looking at the data and we are pretty impressed. It's pretty high quality. So
maybe we'll do some modeling there. We have also done a lot of work on just like models for co-ref
and models for QA. And I think a big challenge right now in the field is, you know, how do you get
more reasoning into these big deep learning models.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

And I hope that coref will be one of the cases where you can get something a little more explicit in
some models or you know, if it's not some sort of interesting discrete reasoning, at least show that
the models are somehow doing that implicitly in all those mini perimeters in as many layers as they
feed forward. Just trying to understand that relationship, how to do it. So that's the reason why we
sort of found your data pretty interesting. And something that I'll look at. You know there's a few
datasets now that have done various trying to encourage more reasoning, but I think there could be a
lot, lot more.

</turn>


<turn speaker="Matt Gardner" timestamp="">

So this is something I've been thinking a whole lot about recently and I'm curious to know your
thoughts Luke, I've been trying to figure out what it means to get a machine to actually read a
paragraph and understand it. I don't think we have any formalisms that touch on this really at all.
We have like predicate arguments structure, but that's like very local kinds of stuff. There's
discourse parsing, but that's not really the same thing. Like what, what does it mean to understand
and how do we define this? And it seems like the only thing I can come up with is this idea that you
have of question answering as annotation for various kinds of of Symantec phenomenon.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

I'm sure there's a lot of semantics you can't reduce to QA, just think about like sentiment types of
things and sort of you know, complex sort of pragmatic implications and so forth. But it would
certainly be a great first step and beyond predicate argument structure. You also have
quantification and sets anednumbers. You guys have a great data set on reasoning with numbers and
texts. I think actually Tom Dietterich kind of pretty cool posts pretty recently where he sort of
talked about these issues of like, well you know, even if we can't, you know, sorta just talk about
levels of understanding, not understanding one discrete unit that resonated with me. It's not
something I had thought about before that, but you know, I think we should, the goal shouldn't be
necessarily defined what understanding is, but sort of what the next level is and how can we jump
five levels or how could we jump 10 levels, whatever that means.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

And I think one really nice way of doing that is, is designing ever more complex questions that seem
to require more reasoning now, I think there's a trade off here, for example, they become arguably
less natural, like especially referencing the natural question dataset of Google, they did a really
good job of arguing that, you know, you should try to focus on questions people actually ask. And
I'm sympathetic to that and that's really wonderful that they could release those questions. But you
know, I think we should also spend some time trying to figure out how to answer unnatural questions
because people can do it and it stresses the systems in different ways. And now how do you know
exactly what percentage and how to trade that off? I don't have good answer, so I think you know,
it's, it's still quite interesting either way.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

Can you say more about the distinction between those natural questions and unnatural questions,

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Maybe I can make an analogy to semantic parsing. If you look at all the semantic parsing datasets
like that, especially the real old ones like geo query and stuff, you know, the questions would be
like what States border States that border States that border Texas or something. Right. And this is
a beautiful sentence with lots of quantification in it, but you just can't imagine someone ever
actually asking that. But you know if I asked you too seriously and you had a map in front of you,
know you could do the counting and you could draw the circles on the map or whatever and you can
answer my question for me. Even if the questions are somewhat artificial and not things that people
would normally ask, I'm still having systems be able to answer them. There's value in that.

</turn>


<turn speaker="Matt Gardner" timestamp="">

I guess the way I think about this and shameless plug, I put a paper on archive and I have another
one coming that are very related to this. There are different reasons you might want to use question
answering. One of them is to fill human information needs where like you, you really do want to
target natural question distributions. You have something like a search box that people naturally
type questions into. You want to answer these questions, this is great. But you might also use
question answering to probe a systems understanding of something which is very much related to your
QA SRL idea. And here it makes a less sense to talk about natural question distributions. I would
say like there isn't a natural distribution of reading comprehension questions. Why? Because if I
have a paragraph in front of me, I just read it, I'm not gonna ask a question about it. That doesn't
really make any sense. People aren't going to ask these questions naturally, but I can still ask
arbitrary questions about that paragraph to probe either another person's or a machine's
understanding of that paragraph. And these can be arbitrarily complex if I want to really probe,
understanding.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

I think that's a really nicely stated. And that you can understand more about what the models can do
by doing that in a probing sense. Another thing I would also highlight, just to add a little bit to
that is that, you know, you can think of them also as an interface to end tasks. So like Omar Levy
had a nice paper a few years back about doing relation extraction as question answering. And the
idea is, you know, rather than making an expert that wants to extract certain relationships, right,
regular expressions over dependency trees or whatever the state of the art might be, they can just,
you know, say, Oh I want to know the manager at AI2 relation. So thing X that works for AI2 that has
the property manager that's, you know, but I only want Seattle so I'll say you know, X lives in
Seattle or something. Right. So whether it's a little open IE tuples or whether it's actually a
formal questions, I don't think it matters too much. But you sort of in English specify what
structured is you're looking for. And that hopefully is a friendlier interface than having to kind
of understand the linguistics of what's going on.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah, definitely. Great. This has been really interesting. As a last topic, I think it'd be nice to
come back to this contextualization idea in pre-training. How do you think the notion of getting
data at scale with natural language annotations changes or fits into this idea of like we have these
huge pre-trained language models and it still help?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

I have to be honest and say when we were doing this, you know, this sort of notion of pre-training
wasn't even in my mind, but the deep learning was having a huge impact. Not as much in NLP as it is
now, but you know everywhere else. And so literally I had in mind like, well if we could do QASRL
maybe we can make an ImageNet, right? So imageNet is labeled, right? So my mindset at the time was
that you're going to have to get a huge label data set to get these big models to train in NLP. That
was the mindset. And so it turns out that was, you know, wrong. It's not a necessary condition. I
mean sort of sometimes over lunch we'll sit with my vision friends and then ask them like, well what
would the ImageNet of NLP be like? These all the self supervised training enough or like what if we
actually had a large label dataset?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

What's the analogy to where it works other places I would dream, you know in my wildest dreams QARSL
could be a part of that. I don't know if this is true, but I think it's a fun thought exercise. You
know, what is it that we don't get from, you know, mass language modeling or the new generalizations
of it in those things would be candidates for trying to label at scale or think of another proxy
task. Maybe you're lucky then you don't have to label it. Maybe you can find data already. I think
the field is already doing this a little bit with probing and so forth, but I think there could be a
lot more of like really looking for tasks where things fail and trying to think about how to get
that supervision as these models.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah, that's a good point. On the note of like what can and can't you learn from language modeling
or masks, language modeling. I've had a few Twitter conversations with Emily Bender and others about
the linguistic theory of learning, meaning from form. And I guess linguists would tell you that if
all I have is language modeling, there's probably a lot that I'm missing. And maybe there's room for
getting more actual meaning by means of these additional annotations at scale.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

I have to believe that's true. Of course you could argue then you should go for, you know, cross
modal and cross lingual. What we're actually doing in our research is saying, you know, go bigger
scale, go more cross lingual. We're not doing multimodal personally, but I really am enjoying
watching what other people are getting out of that. But at some point we're going to hit a, you
know, hit the ceiling of all that. And then I think, you know, hopefully with somebody who's been
thinking about, you know, what's missing and what else we should be annotating. And you know, again,
there's all the interpretability angles and so forth too. It'd be really interesting to see how it
goes. I'm still so hopeful that there's some more leverage to be had here.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Have you been thinking about what's missing? What else we could get?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

No, I mean I don't, I don't have a good answer. I don't think we understand. I'm actually been
mostly trying to think about how to design experiments to figure out what's missing rather than
actually having any insight into what's missing yet. I just think sadly everything is so new that
that's kind of where we are.

</turn>


<turn speaker="Matt Gardner" timestamp="">

I agree,

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

But I hope that over the next few years we'll make some real progress on that. I have a little
worried that the underlying pre-training is changing so quickly that we might need to take a pause
and see what, just kind of like probing the models now may not be relevant to the models that are
going to be out in nine months or 12 months. I'm not sure and maybe may not be. It makes me a little
nervous.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Going back to you mentioned Tom Dietterich's post. A lot of people have thought about this for a
long time. I guess what we really need is a set of unit tests in some sense for different
capabilities. I think what we're doing now with these probes and building datasets is, is trying to
build unit tests. In some sense those tests will still be relevant no matter what the underlying
models are.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Yeah, I totally agree. I've actually even encouraged very students to think about, you know, pick
your favorite linguistic phenomenon, get your friends together, label a few hundred examples,
whatever you can do an afternoon and you know, figure out like is it in there or not? And you know,
if it is, then that's kind of cool and that's a finding and if it's not, that's kind of cool. It's
actually an opportunity to try to improve it and suddenly you're doing science and not just
engineering, like no matter the outcome. It's kind of interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="">

I agree.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

I think that would be a worthy goal. And you could imagine there's a lot of those kinds of projects
to be done.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yup. It's a great time to be an LP. Yeah. Cool. This has been a really interesting conversation. Was
there anything that you wanted to cover that we missed or any final thoughts?

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

No, I'm just, you know, super excited I think it would be really interesting to see in the future,
you know, how it all plays out with, you know, I'm sure there are plenty of people that believe that
you shouldn't be labeling lots of data anymore. I guess one thing I would say is, even if that's
true, you know, it's still valuable to be able to label a little data real quickly in a new domain
or in a new setting. So, you know, we've been mostly focusing on the big data setting here, but the
small data setting is also quite interesting and arguably we should not forget that, but even there,
you know, you'd like to be able to do it quickly, you'd like to be able to do with little training.
So, so I think that in a sort of lots of avenues where you can take this whole direction.

</turn>


<turn speaker="Matt Gardner" timestamp="">

Yeah. Great. Thanks Luke. This has been fun.

</turn>


<turn speaker="Luke Zettlemoyer" timestamp="">

Thank you.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="">

Thanks Luke.

</turn>
