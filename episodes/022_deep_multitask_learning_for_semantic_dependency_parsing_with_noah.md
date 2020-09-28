---
title: "Deep Multitask Learning for Semantic Dependency Parsing, with Noah"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Noah Smith"]
number: "022"
tags: []
description: "An interview with Noah Smith. Noah tells us about his work with his students Hao Peng and Sam Thomson. We talk about what semantic dependency parsing is, the model that they used to approach the problem, how multi-task learning fits into this with a graph-based parser, and end with a little discussion about representation learning. https://www.semanticscholar.org/paper/Deep-Multitask-Learning-for-Semantic-Dependency-Pa-Peng-Thomson/406fd41b360bb02c0aaabff54055193fb5d9d7f1"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:11">

So today our guest is Noah Smith. Noah Smith is an associate professor of computer science and
engineering at the University of Washington. Previously he was an associate professor of language
technologies and machine learning in the school of computer science at Carnegie Mellon University.
He received his PhD in computer science from Johns Hopkins University in 2006 and his bachelor in
computer science and bachelor in linguistics from the University of Maryland in 2001. His research
interests include statistical natural language processing, especially unsupervised methods, machine
learning and applications of natural language processing. It's a great pleasure having you in the
room Noah.

</turn>


<turn speaker="Noah Smith" timestamp="00:51">

Thanks. Thanks for having me.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:54">

So we are very interested in the paper that you published at the ACL 2017. It's title is: Deep
Multitask Learning for Semantic Dependency Parsing. Could you tell us more about semantic dependency
parsing?

</turn>


<turn speaker="Noah Smith" timestamp="01:06">

Sure. so semantic parsing in general is basically the problem of mapping natural language sentences
into structured representations of their meaning. And in the most sort of classic form, semantic
parsing mapped into a logical structures, like first sort of logic expressions. And then more
recently people have explored a lot of alternative representations to semantics. One of the most
widespread that was being studied about 10 years ago was called semantic role labeling, where you
find the spans corresponding to predicates and their arguments. And so you'd run a semantic role
labeler and you'd get back a bundle of these, basically tupoles of a predicate and one of its
arguments in which role that argument was filling. Relatively flat, sometimes called a shallow
representation. So semantic dependencies are kind of a newer variant of semantic representation that
has some of the nice properties of both of these.

</turn>


<turn speaker="Noah Smith" timestamp="02:03">

I guess when you look at a semantic dependency parse on paper, it looks like it's a graph where the
words are vertices and then you've got labeled edges. Linking usually predicates to arguments,
although there's usually a pretty broad set of relations that are labeled this way. And in the
formalisms that we're looking at in this paper each and there are three of them. Each one is sort of
derived through a different protocol involving different formalisms and different assumptions and
different labels sets. But the general idea is that you represent the meaning of the sentence by
linking together the words and labeling those links. And in each of these cases, the graph has
certain properties. They're usually graphs, not trees. So that's one of the things that
differentiates semantic dependency parsing from syntactic dependency parsing. And typically these
structures do not, I believe it's a constraint in these datasets that the structures don't have
directed cycles. So you're basically dealing with directed acyclic graphs.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:09">

Yeah. I thought that was an interesting choice that wanted to exclude any acyclic graphs. Why is
that case?

</turn>


<turn speaker="Noah Smith" timestamp="03:17">

So I guess the theoretical answer might be that the theories say you don't need directed cycles. But
one of the things that I remember about the construction of this dataset was that sometimes they got
them anyway, whether as a result of the parsers that were run in the protocol for creating the data
or human annotators thought that there really were cycles and those were excluded, which I think was
an interesting choice. Maybe not the way I would've done it. But I defer to the dataset constructors
who are experts in their own right. And and don't ask too many questions, although I think it's
definitely, it's always worth asking, you know, what's going on with the formalisms that was one of
the things we tried to poke out a little bit with our model later in the paper. You know, what's
similar and different across these three formalisms.

</turn>


<turn speaker="Matt Gardner" timestamp="04:04">

Do you have a simple example of the difference between syntactic dependencies and semantic
dependencies?

</turn>


<turn speaker="Noah Smith" timestamp="04:09">

Yeah. So one kind of structure would be if you have a control, so you have like, "The boy wants to
go to New York." No, "The boy wants to go to Seattle." So in that sentence I mean it's beautiful
outside, so, you've got two verbs you've got "wanting" and "going" and in the semantic parse "boy"
would probably be the agent of both of them. Right. And so you have two edges linking from those
verbs into boy. But in a traditional syntactical parse, you don't get that kind of acyclic structure
and boy only gets to be the subject of one thing.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:50">

So what do you think is attractive about doing it as a dependency relationship instead of just
predicate arguing structure, like OntoNotes style SRL.

</turn>


<turn speaker="Noah Smith" timestamp="05:00">

Yes. So I think the you know like many problems in NLP, there's always more than one way to look at
the core of the problem. And just like in syntax, you have phrase structure syntax like in the
PennTree Bank and you have dependency syntax. And you can kind of talk about the advantages of both.
They're capturing, they're both kind of capturing very similar things a lot of the time, but not
always. And I think one of the things that people liked about dependency syntax was that
algorithmically you could use graph based algorithms that were, that had really low grammar
constants. So, basically, everything always depends on the length of the sentence in some polynomial
way. But there wasn't like this big explosion based on the size of the grammar.

</turn>


<turn speaker="Noah Smith" timestamp="05:43">

So there was a big move, you know, 10 years ago from more phrase structure oriented approaches to
syntax to dependencies and people started kind of putting that over to semantics. So there was a
version of the prop bank semantic role labeling task done with dependencies at CoNLL a couple of a
couple of years. That was one of the shared tasks, this shared task that we addressed in this paper.
It was originally at SemEval 2014 and 15. And I think it's sort of a natural way to go if you want
to be able to apply algorithms that are sort of spanning graphs spanning tree type algorithms. I
think also there's some inspiration coming from recent direct annotation project. So people may be
familiar with the abstract meaning representation, AMR which is a semantic representation. you could
call it, I would call it a semantic dependency formalism. it's not the one, not one of the ones we
looked at in this paper, but what's interesting about AMR is that they've actually got people
sitting down and annotating this directly. And so I think a lot of people believe that it maybe
isn't a proven thing, but a lot of people tend to believe that dependencies may be easier for people
to annotate. They may be a more natural way to get data, not labeled data.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:03">

Right. I was also working on relation extraction these days. And it seems to me that semantic
dependency parsing maybe a more of a natural fit for helping relation extraction then doing
predicted argument structure. It fits the fits the problem more.

</turn>


<turn speaker="Noah Smith" timestamp="07:22">

Yeah, that's good to hear. I think, I actually don't think that it's radically different from more
span based representations. I think actually that while when you formally define the problem, you're
looking at, you know, edges between things versus labels of spans. They capture a lot of the same
information. And so it may end up being often, you know, we find that we kind of go back and forth
between a few different versions before we eventually find the thing that just sort of
computationally works with the data we have. But yeah, I think one of the reasons that people in my
group were drawn to this is that we've always been fans of dependency syntax as you well know, this
was in your thesis. And so being able to port ideas from dependency syntax over into semantics is
kind of exciting. And it's one of the things we did in this paper.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:13">

So what is the base model that's used in the paper?

</turn>


<turn speaker="Noah Smith" timestamp="08:16">

Yeah, so the base model is you have to kind of think of it at two levels. At the lower level you're
going to represent every word by a vector. Okay. And the vector you're going to represent the word
by is obtained by running a bi-directional LSTM over the sentence. And so you have base word vectors
that come in part from pre-training like GloVe. I think we use GloVe in this paper concatenated with
a learned vector or concatenated with a learn vector for the part of speech tag. And then you pass
the biLSTM across. And all that really does is it contextualizes each of these word vectors. So now
you have a new word vector that tells you, here's the word that I'm looking at right here in
position four in the sentence.

</turn>


<turn speaker="Noah Smith" timestamp="09:00">

And this is how we're going to represent it, given everything that's happening to its left into its
right. Okay. That's the first part. The second part of the model takes pairs of those vectors
potentially. So one potential parent, one potential child and then another outside vector for the
label and pushes that through a multilayer perceptron to give you a score for a potential labeled
edge that you might put into the graph. Okay. And then at the very top you have inference to decide
which subset of edges you're going to put together to form the graph. And for that we use an
approximate decoder called AD^3, which is basically you can think of it as a really nice approximate
inference method for dealing with very general factor graph problems that you can express as an
integer linear program.

</turn>


<turn speaker="Matt Gardner" timestamp="09:52">

We've talked a bit in this podcast and resent episodes about transition based parsers could you do
this with transition based parsing? What would be challenging about this problem?

</turn>


<turn speaker="Noah Smith" timestamp="10:03">

So you could, and in fact we had a paper last year, Swabha Swayamdipta my PhD student and some other
collaborators had a paper at CoNLL last year where we looked at a semantic dependency parsing
problem using a transition based parsing and, the idea was that you were doing syntactic and
semantic parsing at the same time, both independency formalisms and the thing you have to do to get
the semantic side working is you've got to be able to handle non-projectivities. Okay. And the
people who do dependency parsing with transition based models like Joakim Nivre and many
collaborators have developed ways to do that. You add this extra swap operation so that you can, you
can get some edges that cross over each other.

</turn>


<turn speaker="Noah Smith" timestamp="10:44">

And that was what we did in Swabha's work and for that data set for that task. Again, it's a
different data set. Then this one says not really directly comparable. That worked pretty well and
people have found that to work pretty well. I am not 100% sure that these datasets have been tackled
with transition based methods or how far you would have to go. My understanding is swap operations
don't give you all the non-projectivities. They might give you most of what you need. But I think
when you start getting to the point where you want directed graphs instead of just forests even if
you' have non-projectivity it might start to become less clear and you might have to really
carefully design the transitions set. So yeah, I guess there's in my opinion, there's sort of two
flavors of parsing right now.

</turn>


<turn speaker="Noah Smith" timestamp="11:30">

There's the transition base, let's make it fast as fast as can be linear time, greedy processing.
And you know, we've done work in that area, some of Waleed's thesis work, use those techniques. And
it's a fantastic way to go if you care about speed and you're not trying to interpret the elements
of the model in their own right as mathematical objects of interest. I think when we go the graph
based route, like we're going here where we're using a global solver that reasons about the whole
structure and tries to find the max scoring structure with less regard for runtime. It feels to me
more like a computational linguistics project where we're making claims about the formalism and
about what you can represent. And we're interested in the constraint set and I think, I think
there's room in the world for both of the kinds of approaches, but it would be interesting to try
doing something similar with a stack based approach I think.

</turn>


<turn speaker="Matt Gardner" timestamp="12:22">

Okay. Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:22">

So the paper is about multitask learning for all three formalisms at the same time. How do you do
this?

</turn>


<turn speaker="Noah Smith" timestamp="12:28">

Right. So we have a couple of different ways to do it. And the first one is, is the easiest to
understand because it's an idea that's about 10 years old now. So people may be familiar with Hal
Daume's frustratingly easy domain adaptation method. And we basically treat the three. So the three
formalisms are three tasks, or you could say there are three output domains. And so the idea is that
you could, in the first part of the paper, we just train up a separate model for each of the three
and that actually works better than things that have been published before. So that's kind of our
first resolve. And then we said, okay, can we share, what can we share across these three different
datasets so that we get better performance on some or all of them.

</turn>


<turn speaker="Noah Smith" timestamp="13:11">

And the idea is that in the Hal Daume work, you had, you basically took every feature. This is back
in the days where you had hand engineered features. But you could do the same thing for neural
features that are discovered. You basically have a copy of each feature in each domain and then you
have a copy of each feature that's general across all the domains and shared. So when you score each
potential part of a semantic dependency graph in formalism, number one, you're going to have a score
that comes from the formalism number one, copy of the biLSTM. And then you're going to have another
score that comes from the general biLSTM that's shared across all the formalisms. So every part gets
scored both by the domain general and the domain specific feature learner. And then you train end-
to-end.

</turn>


<turn speaker="Noah Smith" timestamp="14:00">

The whole thing goes into the same inference engine. You predict each of the each of the different
parses in each of the three formalisms on its own. And then when you back prop you back prop both
into your domain specific biLSTM and your general biLSTM encoder. And so that works pretty nicely.
We did it. We also tested in the paper. You can see we bladed the domain specific ones. So we
actually had one model that where the whole encoder was shared. The there was only one encoder that
was used for all three formalisms and you're basically learning features that are supposed to do all
three jobs and then the multi-layer perceptrons are separate for each of the tasks. So that was sort
of the first version, the frustratingly easy.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:46">

Right. So in the paper there are like you score every edge, with three components. One that only
looks at the pair of words and another that looks at the predicates, the predict word another that
looks at also the label.

</turn>


<turn speaker="Noah Smith" timestamp="15:05">

Right. I think technically there was one that looked just as the parent, one that looked at the
parent and child and one looked at the parent, child, and label together.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:12">

Right. So I'm a little surprised that you didn't share the parameters for the MLPs for the multi-
layer perceptrons that score they predicate only and the predicate and child across the different
formalisms.

</turn>


<turn speaker="Noah Smith" timestamp="15:26">

Yeah, we could have done that. I don't remember why we didn't.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:31">

Right. So what is the second method that he used to to do multitask learning?

</turn>


<turn speaker="Noah Smith" timestamp="15:35">

Right. So the second method is where we really start to exploit this sort of factor graph view of
the parsing problem. So remember we said earlier that we're scoring basically we're scoring each
potential labeled edge between two words that we could put into our parse. And this is called a
first-order model or an arc factored model because we're scoring each individual arc by itself and
modulo the constraints that we have on the graph and those are discussed in the paper probably not,
worth talking about now. We could make a decision about every edge, basically independently modulo,
those constraints. One of the things that happened over the past 15 years in syntactic parsing was
people started building parsers that looked at higher and higher order factors. You look at two
edges that are adjacent to each other or that have the same parent or the chain together to form, to
link a grandparent, parent and child.

</turn>


<turn speaker="Noah Smith" timestamp="16:31">

And some people have also done this in semantic dependency parsing. I believe this was how Andre
Martins won the challenge in 2014 on these datasets. By having a second order parser, maybe third, I
think it was second. So what we were thinking, well, it's certainly interesting to try a second
order model for any of the formalisms here with our new neural encoder at the bottom. We didn't do
that. What we did do was we started creating higher level factors that looked at that looked at
edges in two different tasks. So now imagine that instead of predicting each of the semantic graphs
by itself for each of the three formalisms, you've got a sentence and you're going to predict all
three graphs at the same time. And when you score an edge between two words, you're actually
considering not just that edge, but other edges between those two words in the other formalisms. And
so we had second and third order factors that looked at pairs and triples of edges between the same
pair of words. That's really important. There are other ways you could conceive of doing it. That
was the first most obvious thing to try. So if you're considering linking two words, you're also
going to consider whether another one of your sister formalisms is going to link those two words.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:43">

So could you talk in more detail about how you do the scoring?

</turn>


<turn speaker="Noah Smith" timestamp="17:48">

Yeah. So that's one of the parts of the paper that we revise it quite heavily after after the
reviewers give us feedback cause it was, on the surface it's a little complicated. So the basic idea
is that you've basically got a vector that embeds each of the two words in each of the three
formalisms. And what you're going to do is you're going to consider basically multiplying out all
the possible combinations across the three tasks. So I'm sorry, I'm scanning the paper to make sure
I don't say anything too terribly wrong. No, it's fine. So you're basically taking an outer product
of vectors and you're gonna do this six times out because you've got a labeled arc in each of the
three tasks.

</turn>


<turn speaker="Noah Smith" timestamp="18:43">

And each of those labeled arcs has a parent and a child. So you can imagine this six dimensional or
six mode tensor where you've got a massive number of parameters because you're multiplying these six
vectors together by this big tensor. Okay. so that's sort of the an unreasonable way to do this that
we didn't want to try because it would have too many parameters. But fortunately we borrowed from
some work by Lei et all. 2014 where we say, look, this huge tensor is going to be limited in rank.
So we're actually going to represent it as a product of some smaller smaller tensors smaller
matrices that get multiplied out.

</turn>


<turn speaker="Noah Smith" timestamp="19:30">

And so those are actually going to be the parameters. And so we basically, there's a nice little
equation in the paper that shows how you can get this outer product by rearranging terms. And you've
basically now got matrices that you multiply by each of the embedded parts and and you're basically
training something kind of like, you can think of it kind of like a bilinear model except bi
whatever in tensor role instead of linear role. So this was kind of a nice trick. We never actually
have to instantiate that tensor it's only mentioned once or twice in the paper. The real perimeters
are still matrices. But this is a way of getting, this is essentially a way of scoring groups of RX
together across the formalisms between a fixed pair of words.

</turn>


<turn speaker="Matt Gardner" timestamp="20:22">

So going back a bit to this third order semantic dependency parse where you're considering three
edges at a time, would it help, do you think if you had syntax of just two, like syntactic
dependencies and did like a multifast with semantic and syntactic. I guess you kind of talked about
that with Swabha's work.

</turn>


<turn speaker="Noah Smith" timestamp="20:38">

I think it's a really cool idea and we certainly talked about it. And it's potentially something we
would try. One of the reasons we didn't prioritize it for this paper was that when we did the simple
single task semantic dependency parser first without using any syntax at all, we were beating the
state-of-the-art. And so I think that doesn't, you know, some people will take that to me.oh, you
don't need, syntax. I don't know if that's true.

</turn>


<turn speaker="Noah Smith" timestamp="21:04">

I'm not, I'm not willing to go there yet. But I certainly think it's interesting, you know, a very
natural way to treat syntax in this model would be, it's just another task. You do it alongside
everything else. I suspect that we or someone else could get better performance by rethinking
exactly which cross task factors we should have here. My suspicion is that limiting only the cross
task factors that look at all the links between a pair of words, you might want to be more creative
than that when you incorporate syntax. I also think it might work better. You know, you never know
whether joint difference over everything versus pipelining is going to work better. Syntactic
parsing has gotten really good it might make sense to just run a good syntactic parser and then, you
know, use that to give you more features instead of a biLSTM run some other network that, that
embeds a word in it's syntactic context and just feed into this. Just a preview of some work that's
making its way through , the review system.

</turn>


<turn speaker="Noah Smith" timestamp="22:06">

One thing we've tried on another semantic parsing task is something we call scaffolding, where you
don't have a syntactic parser, you don't have explicit syntactic features, but you introduce another
task to your framework that involves some syntax related prediction. So, for example here it could
be you're going to throw in some data that is syntactically annotated and you're going to predict
which spans of texts are constituents or which pairs of words are syntactically linked. And you just
learn that additional task. You kick it away after you've done training. You don't actually care how
well it performs. You're not using it as a parser, but it guides your representation learning to
know a little bit about syntax and we found that that works really nicely in another setting we'll
discuss it maybe in a future podcast episode.

</turn>


<turn speaker="Matt Gardner" timestamp="22:52">

This brings me to another question that I had. So it seems like the whole point of this multitask
learning stuff is essentially to do better representation learning. There's been a lot of people
thinking about representation learning with these deep neural nets these days. Like, do you have any
high level thoughts on these directions? Like is multitask the way to go?

</turn>


<turn speaker="Noah Smith" timestamp="23:11">

I think it's a cool way to go because you know, I guess one, coming back to the formalism thing, I
love all of these different formalisms but none of them quite completely captures everything there
is to capture about semantics and more practically. You're never going to get all the wonderful
semantic annotation people to agree on, you know, there's never going to be one semantic annotation
that rules them all. Nobody's ever going to kind of decide this is what we all need and we all
believe in it. Instead you're going to have lots of different iterations of projects over the years
that focus on different things and try to incorporate more phenomena and you know gradually creep
away from things like the Wall Street Journal and start looking at other kinds of texts and texts in
other languages and all of them at different times are going to capture different pieces of the
puzzle.

</turn>


<turn speaker="Noah Smith" timestamp="23:56">

And so I think the multitask is nice because, especially in the neural setting, because it automates
the discovery of what's shared and what's not. You don't to know. You don't have to have a cross
theory theory. Each theory can kind of do its own thing. And to the extent that it's learnable, what
you can share and leverage you do. And if the tasks were not helpful to each other, then we wouldn't
have gotten a gain. And that I think kind of would have been interesting as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:25">

Do you think there's any general representation, learning for language that will be useful across
all of NLP?

</turn>


<turn speaker="Noah Smith" timestamp="24:31">

I go back and forth believing that those things exist are discoverable. I mean I do think that there
is in, you know, for most of us there is kind of a language processing capability that we use when
we do things like translate or read or write or talk or whatever. But it's really hard to believe
that the things that are going to work really well in machine translation are going to be the same
as the ones that work really well in other applications today. But I think, I don't think anybody in
NLP working on problems like semantic dependency parsing can say with a straight face that they
don't think there's something shared. Right. This is a problem that's really at the core of the
field and we're thinking long term about what it might be useful for. I don't, I don't think it's
gonna necessarily help tomorrow's question answering or information extraction or MT systems, but
maybe in 10 years, maybe in 20 years we'll start seeing some more unification maybe.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:29">

Okay. So this sounds great. What are the main highlights and the results that you found in the
experiments?

</turn>


<turn speaker="Noah Smith" timestamp="25:35">

Yeah, so basically we talked about two different ways of of doing the multitask learning and you can
do either one by itself or you can do them both together. And we found doing them both together
works best. And we got gains on all three tasks over previously published systems and our basic
system. I think, one of the key highlights that's easy to miss is that there's an evaluation on out
of domain data, which I believe is Brown Corpus. And the numbers, the gains there were larger. So I
find that kind of exciting that, you know, maybe maybe we're moving towards something more like
broad coverage semantics. So yeah, so I there's a lot of little details in there, but I think those
are the big take aways.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:22">

It was interesting to see a very honest statement here in the paper saying by looking at undirected
overlap between unlabeled arcs, we discovered that modeling only arcs in the same direction may have
been a design mistake. I thought that was very interesting. Do you have any comments on this?

</turn>


<turn speaker="Noah Smith" timestamp="26:38">

Yeah, so if we, you know, if you always have to, at some point you have to just decide, okay, we've
got our 8 pages, let's submit this to a conference and then, you know, we can write more papers
later. But if we'd had more time, I think one of the natural things to try would have been to
consider cross task factors that go in both directions. It turns out that, you know, as people who
are familiar with the many conventions available for syntactic dependency annotation, the same thing
holds in semantics. That there are different ways to choose what you're going to label what the
labels are going to be in with the direction of the arcs is going to be. And so one of the three
formalisms the one, the one called PSD, it's based on the Prague dependency formalism reverse the
direction of some of the arcs.

</turn>


<turn speaker="Noah Smith" timestamp="27:28">

And so we, I think we missed out a little bit by not having a cross task factor that allowed a
reverse arc in the Prague data to be scored together with an arc in the other direction on the other
datasets. This is the kind of thing that, you know, there are a lot of ways you could fix that
problem. You could have the direction of the arc, the, you know, another thing in the model for
sources. There's a lot of different ways to fix it. The most obvious I think is is just have more
cross task factors or maybe replace some of the ones we used with some more carefully chosen ones.

</turn>


<turn speaker="Waleed Ammar" timestamp="28:04">

So exciting this means the potential for this method is really above the results that you've shown.

</turn>


<turn speaker="Noah Smith" timestamp="28:11">

Yeah, I think there's, I think there's still a lot more things to try.

</turn>


<turn speaker="Matt Gardner" timestamp="28:15">

All right. So one more question. I've been doing a lot of work on question answering kinds of things
and information extraction recently. And it looks like models there are moving towards just end-to-
end removing pipelines as much as possible. So you don't run syntax analysis anymore. You don't run
SRL, you just have a biLSTM, learn all the semantics that you need and then ouput the question. So,
I don't know what do you think we should use? Do you think this is the way to go? Do you think
semantic dependencies are helpful for some downstream actual task?

</turn>


<turn speaker="Noah Smith" timestamp="28:44">

So I guess it's going to depend on a number of factors. So I think when you have very large amounts
of data this kind of structure may be less important. But I think that when you are, when you're
faced with a smaller data domain and you don't have you know, your biLSTM has to do a lot of work
with a lot less data. Then using the linguistic bias that's afforded you by a semantic
representation might, might be helpful. I also think that you know, there is really no such thing as
general purpose open domain question answering. Like these things are always about something in
particular and there's always, you know, extra questions like what are the databases or corpora that
are kind of available to help answer your question.

</turn>


<turn speaker="Noah Smith" timestamp="29:40">

My suspicion that if like tomorrow you were tasked with building a new question answering system for
a very specific domain for which you didn't have much to go on. And you were trying to learn sort of
all the possible patterns that people use when they ask questions about, I dunno, whatever it is,
let's say it's a database about genetic diseases or skin or something like that. Being able to, you
know, let your model focus more on picking up the obvious patterns in a semantic argument kind of
space rather than a surface order string kind of space. I think you'd be able to learn faster with
less data. But you know, it's always an empirical question. I think like I said before, I think
these are the, this kind of work is a longer term bet. I don't know that it will pay off in the
current evaluations for things like IE and QA. But I think in the long run if we want general
purpose tools for dealing with language, then we should pay a lot of attention, a lot more attention
to abstract representations that linguistics has already discovered.

</turn>


<turn speaker="Matt Gardner" timestamp="30:44">

Yeah, I guess I could summarize that as if you want to use machine learning in order to do some
task, you need features somewhere. And if you don't have enough data to do representation learning,
you do the representation learning yourself by hand and maybe these formalisms that linguists have
come up with is a good way to do that.

</turn>


<turn speaker="Noah Smith" timestamp="31:01">

It might be a shortcut. Right.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:04">

All right. Thank you very much for making the time for recording this. Noah, it's always good to
find an excuse to talk to you.

</turn>


<turn speaker="Noah Smith" timestamp="31:11">

Thanks for coming by and I'll I'll close by acknowledging my coauthors Hao Peng and Sam Thompson
whose work this is, and I hope people will come see the work presented at ACL in Vancouver next
month.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:22">

Thank you.

</turn>
