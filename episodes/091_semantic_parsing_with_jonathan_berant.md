---
title: "Semantic Parsing, with Jonathan Berant"
hosts: ["Waleed"]
guests: ["Matt","Jonathan"]
number: "091"
tags: ["semantic parsing"]
description: "In this episode, we invite Jonathan Berant to talk about executable semantic parsing. We discuss what executable semantic parsing is and how it differs from related tasks such as semantic dependency parsing and abstract meaning representation (AMR) parsing. We talk about the main components of a semantic parser, how the formal language affects design choices in the parser, and end with a discussion of some exciting open problems in this space. Jonathan Berant's homepage: http://www.cs.tau.ac.il/~joberant/"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F642419019&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed" timestamp="00:06">

This is Matt Gardner and Walleed Ammar. We are research scientists at the Allan Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt" timestamp="00:12">

Okay. Today our guest is Jonathan Berant who is an assistant professor at Tel Aviv University and
the scientist with the Allen Institute for Artificial Intelligence Israel office. He is going to
talk to us today about semantic parsing, which he has done a lot of work on at Stanford and other
places. Jonathan, welcome. It's good to talk to you.

</turn>


<turn speaker="Jonathan" timestamp="00:29">

Thanks. Thanks for inviting me. It's great to be here.

</turn>


<turn speaker="Matt" timestamp="00:32">

So I guess to start off this topic, could you give us a brief overview of what semantic parsing is?
That's probably broad.

</turn>


<turn speaker="Jonathan" timestamp="00:39">

Yeah, sure. So semantic parsing is traditionally defined as task where you get as inputs, natural
language utterance a question or maybe a command. And your goal is to map or translate it to meaning
representation that is executable. That's the key property. It's something that you can execute in a
particular context, like database knowledge graph, some environment, robotic environment or
something like that. So translation from language to, a data base.

</turn>


<turn speaker="Matt" timestamp="01:13">

So I hear some semantic parsing used in a few other ways. In the NLP community, for instance,
semantic dependency parsing or people call parsing to abstract meaning representation or AMR. They
call this semantic parsing. What's the difference between what you just described and these other
tasks?

</turn>


<turn speaker="Jonathan" timestamp="01:31">

Yeah, so I guess semantic parsing is ambiguous. I gave him a class on ESLEE a few years ago where I
called it executable semantic parsing, just to be more precise. Both of these fields are about
taking a language and mapping it to a meaning representation, but AMR, as many dependencies and
things like that are more about broad coverage parsing. So you take any sentence and your goal is to
have some meaning representation of it that is not just maybe pedagogical structure, maybe captured
some semantic phenomenon. What do you do with it later? You can decide, but it's not executable,
immediately executable, so it's broad coverage, but you can't really do something with it directly.
Executable semantic parsing is more in the context of getting a meaning representation that has a
very precise algorithm later that does something with it in a particular context. So you get a full
meaning representation, which you know maybe QA SRL doesn't have a full meaningful representation,
but you get like the full meaningful representation in a particular context in the context that you
have this program, you can execute it and get precise results or de-notation.

</turn>


<turn speaker="Matt" timestamp="02:39">

So as you were talking I was thinking that maybe AMR and semantic dependencies are much more
linguistic or tied to like the words in the utterance that you get. They're more lexical. There's an
almost a one to one mapping. You could go backwards. I Guess AMR, it's not exactly trivial to go
backwards, but in a lot of cases it's much more tied between this meaning representation and the
language. But then I remember it actually semantic parsing has its roots in CCG commendatory
categorical grammar and other things, which actually were a lot more tied. And also you mentioned
directly executable CCG had like Lambda Calculus. Is this directly executable enough?

</turn>


<turn speaker="Jonathan" timestamp="03:19">

I mean it has, I mean meaningful representation, the form Lambda calculus, but there was no context
in which you can execute it to see and verify whether what you got is correct. And about your
previous remark, I guess like as you said, like in many of these semantic parsing tasks, you build a
representation over the input. So you have a tree where the leaves are actually, whereas in the
sentence, but as you said later, it's not always true in AMR it's not like that, but there is some
usually roughly one to one alignment between the inputs and the output. In semantic parsing up until
a sequence to sequence models entered the field. It was also a little bit like that. So you had CKY
style parsing algorithms where you would build a tree over the input and you had somehow to make up
for the fact that not always there's a one to one mapping, so I'm not sure it's a fundamental
difference, but it is true that once you have an application at the end, then sometimes you have to
be more faithful to the actual application. You have some executer that has its own language and you
cannot stay very faithful to the linguistic structure that you get with the natural language. Does
that make sense?

</turn>


<turn speaker="Matt" timestamp="04:28">

Yeah. Great. Thanks. I guess I was pushing on this a little bit just to get the scope for what it is
that we're talking about. There are a lot of things that in some sense try to map language to some
more abstract or formal meaning representation. There are a lot of different ways to do this. We are
talking today about a specific one where you could think of it as a program in some programming
language or lambda calculus, something that we want to actually execute in some context as you say.

</turn>


<turn speaker="Jonathan" timestamp="04:57">

Yeah, so I guess as I said, like in AMR, you know maybe some things are under-specified by the
formalism. I don't think it encompasses all of formal semantics, right? But in semantic parsing in
the particular context that you're at, it's a full meaning representation in the sense that you can
execute,

</turn>


<turn speaker="Matt" timestamp="05:12">

right? So in, in what circumstances might you want to actually do this?

</turn>


<turn speaker="Jonathan" timestamp="05:16">

So the classical ones are things like a question answering. So let's say you have a large knowledge
base and you want to ask which Hollywood actor had the most co-actors how do you say co-actor and I
guess that's not a word, but you get what I mean. So you have a knowledge graph and you can
translate this into a query over that. A knowledge graph and it's a nontrivial query. So this is a
question answering over large knowledge basis. Very popular nowadays. Application is virtual
assistance. So we have mobile phones, they have a lot of applications and you would like to operate
those using the most natural way that we can, which is natural language. So maybe I want to say
something like please, set a timer for 15 minutes before I have to leave to watch the, whenever,
what was it?

</turn>


<turn speaker="Jonathan" timestamp="06:03">

The Warriors Raptors game. So this, you know, it's quite complex. You need to have some meaning
representation that will kind of interact with how much time it takes to get to a certain place.
Finding when that game starts, setting it with reminder application. So this is a very contemporary
example of virtual assistant application. So these are, I would say like these are the main two,
answering questions and executing some kind of commands like booking a flight ticket or something
like that, but you can view it more broadly. So now there's also a lot of work on the text to code
where you can use semantic parsing as an assistant for developers. Maybe they want to retrieve some
code or maybe you write automatically some code. That's another natural application. And people have
extended this even further. Right? So Ice Pasupat had interesting work on how you can use semantic
parsing to answer questions over semi-structured tables. How can you can use semantic parsing style
algorithms to kind of like automatically fill forms or click on a bunch of buttons in a webpage in
order to accomplish some tasks and so on.

</turn>


<turn speaker="Waleed" timestamp="07:07">

So what kind of quality do we expect for some of these applications? Is it practical to expect them
to be functional in the real world or is it still in the research phase?

</turn>


<turn speaker="Jonathan" timestamp="07:18">

I mean I think, uh, if you have a specific domain and you want to build an assistant for that
particular domain, nowadays it's possible to collect data and train supervised parsers such that
it's useful and it's actually done in places like Google and other places. You know, if you want to
cross application understanding and complex co-reference and very conversational things, then things
might break down. You know, also in companies things are also not fully learned. Sometimes you can
write grammars and do various things in order to make your learning problem easier. So I do think
it's actually out there in our phones, but it is limited in scope to a particular application that
you're interested in and you build a semantic parsing for that application.

</turn>


<turn speaker="Matt" timestamp="08:05">

So you've talked about question answering and instruction following virtual assistant kinds of
stuff. One thing you did not mention was broad based natural language understanding like systems
that can actually read text and do stuff with it. Do you think this kind of semantic parsing has a
role to play there in the future or is it just always going to be limited to these question
answering command following kinds of application?

</turn>


<turn speaker="Jonathan" timestamp="08:30">

Well I guess what do you mean by broad language understanding? I mean I think, you know, questions
and commands are definitely part of natural language that is quite rich. I mean what is the role of,
I dunno, machine translation and language understanding

</turn>


<turn speaker="Matt" timestamp="08:47">

That, that's a totally fair question. What I'm, what I meant was let's say I have a longer document
and I want to understand what this document means. Do you see semantic parsing playing a role?

</turn>


<turn speaker="Jonathan" timestamp="08:55">

Yeah. So I guess this is a little bit, uh, an open question. So definitely you can cast this as
semantic parsing by combining semantic parsing information extraction. You can cast this reading
problem in the same way you can say, okay, my goal is to understand texts. So, I'll have the
information extraction part that takes the unstructured text and constructs a knowledge base and
knowledge graph, some structural presentation that is the meaning of the text. And then if I have a
question over that, uh, in order to test whether I understood the test or not, I can parse that into
a query over that structured presentation. In 2014 we had a paper that tried to do that. This is not
the common approach nowadays with the end to end neural networks that are fully end to end
differentiable but it has inspired work on the euro modular networks.

</turn>


<turn speaker="Matt" timestamp="09:42">

Right. So I'm sure Jacob Andreas had sematic parsing in mind when he thought of neural module
networks where you have these modules that are kind of like these subprograms. So I think it does
inspire language understanding in general and might play a role, you know, like not be exactly
executing questions over structural representations, but some aspects of it can be considered part
of broad language understanding I think.

</turn>


<turn speaker="Matt" timestamp="10:07">

Great. Yeah. I want to come back to neural module networks a bit later, but I think for now we've
gotten a good handle on what semantic parsing is. What we're talking about here, when we say
executable, semantic parsing and on places where you might actually use this. Do you want to talk a
little bit about how you might build a system that translates from language to some kind of
executable representation?

</turn>


<turn speaker="Jonathan" timestamp="10:27">

So, at the highest level you have the model and the executor, right? So you have something that
takes as input, natural language and outputs a program. Then you have the executor that takes the
program and does something with it in the context; in the environment. Usually the executor is fixed
so you don't do a lot of stuff about it. So, we mostly focus on the first part on the translation
part of the model and that you can also divide into two parts. So, one part is like the structural
part and the other is the statistical part. So what I mean by structural part, I mean that given an
input, natural language utterance, you have a, something like a grammar that defines a usually
finite set of possible outputs for that input. And that is a pretty large set of, you know, grows
exponentially with the size of the inputs, but it's also rules out a lot of the things that are
impossible, you know, like programs that don't compile or various other constraints that you can
impose on this.

</turn>


<turn speaker="Jonathan" timestamp="11:33">

So basically there's no numbers here, right? It's just like completely structured. It's like a
formal language thing. You have a formal language and you have some grammar and this, these are the
set of things that can be the output. And then on top of that you have some statistical model that
assigned some scores, some probability for each one of those. And your goal is to learn a model that
will assign high probabilities for the correct translation, given the inputs in low probabilities
for those that are incorrect. So the model is like there's a grammar part, the structural part and
the statistical part. And because this space is really, really large, then you usually need also a
parser. So something that given an input and the possible outputs according to the grammar, well
actually output the program that has the highest probability. And because the search space is very
large, this is a non treatable problem.

</turn>


<turn speaker="Jonathan" timestamp="12:23">

Uh, you know, if your features decompose, you can do CKY, but nowadays they never decompose. So
people do things like Bing search and basically have to solve the search problem of finding the
highest probability program according to your current model. So that's the parser. And I guess maybe
the last thing is if you're training is non-trivial, if you're training from what's called
denotations or something like that, then there's also the learning algorithm, which we can or cannot
go into. So I guess these are the things, there's an executor, the model has a grammar and
statistical model and you have a parser for solving the argmaxproblem to finding the highest
probability program and you have a learning algorithm.

</turn>


<turn speaker="Matt" timestamp="13:06">

Wow. So that's a whole lot of moving parts for what sounded originally like a, a relatively simple
problem of translating language to programs.

</turn>


<turn speaker="Jonathan" timestamp="13:14">

Yeah, yeah. I mean it's like a sequence to sequence model, but you have a grammar that's constraints
your output and just like a sequence-to-sequence model, you need to solve the argmax problem by
doing research and just like sequence-to-sequence model and you have some objective which might be
maximum likelihood, so it's just like translation except there's a grammar on the outputs and then
you can do also other stuff if you want, if that makes, simplifies it.

</turn>


<turn speaker="Matt" timestamp="13:39">

Yeah. Yeah, that, that might be nice for current listeners, I guess thinking five years ago before
we moved to these seek-to-seek models, it was in fact a whole lot more complicated because you had a
lexicon that said for every word in my input, question or command, these are the possible little
program pieces that this word might map to and I have to do chart parsing to go from the individual
words up to a full program in really complex ways, but nowadays you can even just do a seek to seek
model without a grammar at all and hope, cross your fingers, that it works.

</turn>


<turn speaker="Jonathan" timestamp="14:16">

Yeah. I guess that transition was a bit abrupt though, right? Like, you know, a 2015, as you said,
people were building logical forms or programs over the input. You get to like the input like a tree
where the leaves are the words you do like some CKY style search algorithm and so on, and then very
quickly it was just sequence-to-sequence where there's absolutely no alignment between the output
program and the inputs except for the attention, mechanism. And I actually think, you know, there's
might be something in the middle of that makes more sense even nowadays. So there was like maybe a
second in time in the universe where I was working with Ice and Percy [Liang] and other people on
what's called a floating parser that was this like hybrid creature where you can uh, build a trees
that are partially over their inputs.

</turn>


<turn speaker="Jonathan" timestamp="15:07">

Some sub-trees actually aligned to your input and some sub trees don't. And you can have a stronger
notion of compositionality and in a sense both model the fact that the structure of the program
might align well with the structure of the language but also sometimes when it doesn't kind of like,
you know, use learning to overcome this obstacle. But the neural revolution basically wiped this out
and I kind of think, you know, it might be back and using grammars on the output side also is a, a
little bit of a way to say that it has returned, but I don't think like the full spectrum was
explored in a very scientific way. or logically, do you agree? You've done a lot of work on that
too.

</turn>


<turn speaker="Matt" timestamp="15:53">

Yeah. Yeah. I agree. I was going to ask if you could comment on like the pros and cons of going from
this CKY chart style parsing to the seek-to-seek models. Like what do you gain and what do you lose?
You kind of touched on that in what you just said, but I wonder if you could expand on it a little.

</turn>


<turn speaker="Jonathan" timestamp="16:09">

Yeah. So moving to sequence to sequence model, as you said, it just simplifies things a lot. You
just have a fully differentiable end-to-end model where the way that you decode the output is
completely free. You don't have any alignment. Whenever you decode a token, like a knowledge based
constant. You know, maybe it's like some knowledge base about papers. If you decode, the constant
about some author, you know it's not aligned explicitly to any input token. It's just basically
aligned through an attention mechanism. So it's very, very simple. You don't have to learn this hard
line at all. So it makes things easier to develop like the speed with which you can develop things
as higher. But on the other hand, your search space becomes huge, right? So now you're
unconstrained. You can do whatever you want in order to generate the program and you need to
overcome this very difficult search problem where basically any program is possible.

</turn>


<turn speaker="Jonathan" timestamp="17:09">

The lexicon was extremely useful in restricting the search space. If every word in the inputs can
only map to like maybe 10 things, then the search space was much more manageable and you can do
things like CKY and now we basically shifted the burden from search to learning. You assume that you
know biLSTMs and LSTMs are just have such high capacity. They're so powerful that you will not
really need any sophisticated search. Just a simple Bing search left to right or top down if you're
decoding trees will be enough. I don't think this is true. I don't think it's correct. I think at
some point this breaks but for existing data sets that obtain similar performance.

</turn>


<turn speaker="Matt" timestamp="17:49">

Yeah, I think there are. There are two places in particular where this breaks down. One is when you
have weak supervision. That is instead of, instead of having my training data be my inputs, be
questions in my outputs be programs and I have labeled programs to train a system. If instead of
that I have just like the denotation of the answer or the results of following a command. If that's
all I have and I have to figure out which programs map to the correct answer or to the correct
execution, then it's really, really hard to train this thing in the absence of some kind of lexical
information because as you say, the search problem is just impossible. There are a number of papers
including one by your group, one from me, other people that show that you basically make no progress
at all if you just try to do a search based training algorithm when all I have is a seek-to-seek
model and answer supervision, you need some kind of additional lexical information.

</turn>


<turn speaker="Jonathan" timestamp="18:42">

Yeah, I mean but both are groups trained from the denotations, right? So we still use this model
where you don't have any exclusive alignment but you can do other stuff like you had the NAACL now,
iterative search or whatever auxiliary information you can find to try to still solve this problem.
In the past I worked on like large scale stuff and freebase I think there when like the number of
constants that you have is you know you can have like thousands of possible knowledge based
constants per word. I think there it would not work at all even for simple questions, probably. Well
you can always maybe bridge that using embeddings or something.

</turn>


<turn speaker="Matt" timestamp="19:18">

Yeah. Yeah. And the other place where this, this approach falls down I think, is when you have very
templated or rather, it's really easy for the LSTM to memorize templates and not generalize to new
syntactic structures. And so there have been a few works that show that if you change the way you
split the data to have logical form structures be held out at test time, you show that these LSTM
based models fall down pretty miserably at generalizing to new kinds of things.

</turn>


<turn speaker="Jonathan" timestamp="19:50">

Yeah, I think this is a super, super important point. Like the whole point of semantic parsing. I
mean regardless of like the the application, I think it's like in my head it's something very nice
in terms of compositionality you have the way that the parts of the language map to the meaning of
the whole and you have the way that the parts of the program map to the meaning of the whole and you
would like to learn this in a compositional way and this should be like the case where you show most
clearly that even though you train on, I don't know, like trees of depth until depth five and this
to generalize to deeper trees, but this work by Dragomir Radev's student, Catherine [Finegan-Dollak]
really showed that this is not the case, that it just memorizes templates. It's unclear to me. So I
think there they did not have a grammar on the output side. Do you, do you remember?

</turn>


<turn speaker="Matt" timestamp="20:40">

They didn't in that work? No.

</turn>


<turn speaker="Jonathan" timestamp="20:42">

Right. So, I mean I'm wondering if you actually decode trees whether that would improve, but it was
like a quite substantial hit in the accuracy. Actually I have a work in submission now. I don't know
if I'm allowed to talk about it or not. That tangentially has a similar finding, basically. It's not
the focus of our paper, but we also observe this very strong memorization effect. And this is, I
think it's really important to investigate this further. I mean, this is ridiculous to some extent.
It's just ridiculous.

</turn>


<turn speaker="Matt" timestamp="21:16">

Yeah. It kind of defeats a lot of the original intent as you say.

</turn>


<turn speaker="Jonathan" timestamp="21:20">

Yeah, yeah. If not here than where in a sense.

</turn>


<turn speaker="Matt" timestamp="21:23">

So now that we've gotten more of an overview of all of the pieces of a semantic parser, it might be
interesting to come back to neural module networks, which I asked Jacob Andreas about this on
Twitter a while ago, after a previous episode where we mentioned these and he agrees with me in
saying that these are basically semantic parsers with learned execution modules. Do you want to
expand on this or do you want me to,

</turn>


<turn speaker="Jonathan" timestamp="21:45">

so, uh, neurological networks that was proposed by Jacob Andreas. The idea is that, uh, you have
these modules whose parameters are tied that performed as specific functions. And so in images,
which was the application where it was used most, you have something like what is the color of the
object that is held by some person. So you have these modules that are repeated across examples. You
need to learn how to find certain object in the image conditioned on some word and then you need to
learn that, I forget my example, that's left off is some relation that tells you if you're looking
at one object you should move your attention to the left and then if he end you answer by extracting
the property of color. So all these are there are, there's like a small sets of atomic modules, uh,
one for finding objects, one for changing the attention from one object to the other based on some
relation and so on.

</turn>


<turn speaker="Jonathan" timestamp="22:50">

And these, each one of these modules is it's own neural networks that has parameters that are shared
across all of the examples and the parameters of the networks are trained end to end. So you can, I
don't know what you guys talked about exactly, but you can use this as semantic parsing where given
a sentence, you basically construct this tree that assembles modules where the input is the
sentence, the input to the modules is the sentence and the output is the answer. And the parameters
are basically learning the executors. So you learn, given the word ball to find in the image, the
object ball and you know, pick it from, from the image.

</turn>


<turn speaker="Matt" timestamp="23:32">

So to summarize, we basically have two learning problems here. One is mapping language to a program.
This is the traditional semantic parsing problem that we've been talking about this whole time. It's
just these programs are themselves modules that are learned. And so we need to learn both the
mapping from the language to the program and the execution of the program at the same time and
typically with only the answer as supervision. And so this is an extremely hard learning problem and
this is why I think it hasn't really been successfully used in language as of yet, though, we'll
see.

</turn>


<turn speaker="Jonathan" timestamp="24:08">

Yeah, I actually saw now in ICLR, I just read a paper by Josh Tenenbaum's group where they have
something called neural concept learner. Did you see that where they do map the question into a
program like the executor is not to learn, they just have an executor over vector space. So your
program has some functions and these functions just do things in vector space. So instead of like
some non differential operations is relaxed through some differentiable operations instead of
intersection, you might have, I don't know, multiplication or things like that. I think it's an
interesting approach. Like you write an executor that is deterministic, that is applied in vector
space. So an image is transformed to vectors. A question is transformed to a program and the program
is executed with this differentiable executor that does things over vectors into image. You can
think about it about it like a spectrum, right? Like a on one end of the spectrum there's like fully
end to end differentiable models.

</turn>


<turn speaker="Jonathan" timestamp="25:06">

So you know RNN CNNs there's the MAC architecture from Drew Hudson and Chris Manning that is just
fully end to end differentiable. Maybe the architecture is kind of like biased towards reasoning.
And then in the other end of the spectrum there's semantic parsing where you actually map the
question to a program and execute it. And then in the middle there's other stuff, right? So neural
modular networks is somewhere in the middle where the executor is learned. And then there's work by
Nitish Gupta and Mike Lewis and also this Josh Tenenbaum work where kind of a design your executer
to be differentiable. So you don't learn the executer, but everything is kind of like differentiable
by design. So I actually think this spectrum is super interesting in terms of like how does it
affect generalization, how does it affect sample complexity, how much data is needed. This is I
think, a really interesting direction.

</turn>


<turn speaker="Matt" timestamp="25:58">

Yeah, I agree with you as evidenced by the fact that I'm actively working in this space. So yes, I
think this is very interesting. I'd like to move on to a different, but related topic. How does the
programming language that you're parsing into affect the performance or the characteristics of your
parser?

</turn>


<turn speaker="Jonathan" timestamp="26:16">

So I don't think there was a lot of work on that. I think if I remember correctly, the original
Zelle and Mooney paper on Geo880, they kind of like say briefly, you know, we're going to parse
language to some executable program, but we're not going to use sequel because it's super weird.
Instead, we're going to use something more like Lambda calculus just as an argument. It's just like,
that's what they said without any experiment. And indeed like a GO880 is kind of like lambda
calculus calculus-based and all the work by Luke starting from 2005 is based on CCGs and lambda
calculus, like originating, I think the motivations were more linguistic for Mark Steven and so on.
It was more about like understanding of language rather than the application itself. So the logical
forms and data sets were in this Lambda Calculus format.

</turn>


<turn speaker="Jonathan" timestamp="27:09">

Then later there was a little bit of work on lambda DCS, uh, from, uh, Percy Liang. And then in
recent years, there's like a lot of work on SQL just because it's very ubiquitous. It's everywhere.
So I don't think there's like a very clear paper that kind of like clearly compares them. But
there's a lot of evidence, I think, out there. So recently there was a paper on the spider dataset,
where they showed that by like translating, moving from SQL. So, SQL has this property, okay, maybe,
let me step back for a second. I think there's two ways of which the former language matters. One is
how well it aligns with the natural language. So, you know, maybe in natural language you kind of
have these adjacent phrases that compose such that the meaning of the entire span is a function of
the meaning of it's parts.

</turn>


<turn speaker="Jonathan" timestamp="27:59">

But maybe on the former languages might not be like that. So maybe in SQL, you know, the way that
they wrote it, they didn't think about parsing. They thought about, I don't know, other
considerations, like having fast queries. So, they have things like, you know, select something from
something where blah, blah, blah, blah, blah. And then there's something like group by whatever. So
whatever is after group by is really related to what's the columns you selected. But those are
extremely far away in the output language. So the way that the natural language expresses at these
things might be close to one another. And then the way that it's expressed, on the output side might
be very, very different. This problem of the fact that the way that the composition of the natural
language is different from the composition of the formal language might make things harder.

</turn>


<turn speaker="Jonathan" timestamp="28:44">

And this is evidenced by a recent paper where they show that when they translate sequel to some
nicer language, they get substantial gains on the what the SPIDER data set from Yale. So this is
one, one I think one access, like whether things kind of like compose nicely and align well with a
natural language. There's also the granularity aspect. So you might have like words in natural
language that mean like a huge thing in the former language. So when I was working on Freebase, I
had this example where the word Expat, which is a single word in natural language was a huge query
over Freebase. It's the people that were born in one country and are now we're living in a different
country. Uh, the fact that sometimes language has these high level phrases that mean very, very
detailed things in that particular language can also cause problems.

</turn>


<turn speaker="Jonathan" timestamp="29:34">

So in general, what we would want is that the formal language would align well with the natural
language, the more it aligns well, I think the problem becomes easier even though, you know, when
the questions are short and uh, there's a lot of data and the biLSTM has a lot of capacity, it might
not matter that much. I think that this paper that we talked about that talks about generalization
things there, it probably should matter. I'm not sure if this is correct or not, but if the formal
language is nice, you might expect to generalize better compared to it before the language is very,
very, doesn't align very well with the natural language.

</turn>


<turn speaker="Matt" timestamp="30:09">

Yeah. That matches my intuitions a lot. We're getting a little bit low on time. I want to, I have
two questions left that I want to be sure that we ask you. Um, the first one is what do you think
are the most interesting current data sets for semantic parsing research? If I'm just getting into
semantic parsing now, what should I focus my time on?

</turn>


<turn speaker="Jonathan" timestamp="30:27">

So I don't know at least in my head, like there's various different interesting research questions
and semantic parsing, and it depends a little bit on which one you want to focus on. Both of us have
been working recently on the SPIDER dataset and the SPIDER dataset is a data set that contains
something like 10,000 natural language questions that are paired with their translation to SQL,
where these SQL queries are also accompanied by a database. There's hundreds of databases. In a
training time you observe some subset of the databases and then at test time you need to parse a new
question to sequel given a completely new database that you have never seen before. Okay, so you've
never seen this database. It has arbitrary names for columns and for tables, but you need to
understand the language of the question well enough such that you can do that.

</turn>


<turn speaker="Jonathan" timestamp="31:19">

Sometimes people refer to this as zero-shot-semantic parsing in the sense that at test time your
database is new. You haven't observed any examples from that database. I think the zero-shot set up
is quite interesting. So we would like, as we said, to have models that generalize well and by being
able to generalize from existing databases to new databases, we think show in a more interesting way
that we understood the structure of the natural language and the way that it maps to sequel. So I
like, I really liked the spider dataset from Yale from the perspective of the zero-shot aspect.
Sometimes I think that the phrasing of the question is not super natural, but I think there's a lot
of interesting research to be done in that direction. They also now have a new data set called SPARK
that I haven't even seen. It's published now where they add the context. So, instead of having a
single question, you have a sequence of questions and then you also have problem. You know,
interesting research questions about co-reference of entities and events. And this probably should
also be interesting.

</turn>


<turn speaker="Matt" timestamp="32:27">

I'll jump in here with the little comment about SPIDER. I was talking with a friend of mine who is a
vice president of something at Tableau and he was very interested in hearing about Spider and wanted
to hire anyone who is working on this. I told them that unfortunately there aren't a whole lot of
people who actually do this kind of stuff, but this is like exactly the kind of problem that people
in industry at a place like Tableau want to solve because they're trying to visualize data for their
customers. Every customer is going to have different databases and I want to be able to learn, like,
answer complex queries over their customer's tables where I don't know a priori, I don't want to
build a specific model for each customer's table. I want a single model that can transfer across all
of these.

</turn>


<turn speaker="Jonathan" timestamp="33:13">

Yeah. So I was talking to Mark Johnson at NAACL, he expressed a similar thoughts. And also Ben, my
student who, uh, as both of us know, did, a lot of them did most of the work for, our collaboration.
So he also has been approached already, but I think more than one person. So it is interesting for
people, I think. I think they, they did something right with this data set and creating good
datasets is hard as we know.

</turn>


<turn speaker="Matt" timestamp="33:37">

Yeah. Okay. So, what other datasets, do you think are interesting for semantic parsing?

</turn>


<turn speaker="Jonathan" timestamp="33:42">

Again, this is my own opinion and I'm definitely gonna forget stuff, but I really liked NLVR
because, from a, you have [Yoav] Artzi, and the Cornell Group, Alane Suhr, I don't remember if there
are any other authors on that paper, uh, where you have a sentence now there's also NLVR for real or
NLVR2 where you have a sentence and two images and a sentence is very compositional, you know, tell
me whether one box has three more yellow triangles than the right box. And you get like an image or
a knowledge base that describes that image. And the only signal that you get is true or false. So
one of the research issues in semantic parsing is what's called spuriousness. The fact that if you
are training from denotations, that is you're only seeing questions and answers and not questions in
programs, then you basically have to search for programs that get to the right answer.

</turn>


<turn speaker="Jonathan" timestamp="34:35">

And in some cases the number of programs that get to the right answer is extremely large. So if your
signal is just true, false, any program that returns true will be correct in the context of an
example where the answer is true. This is a huge spuriousness issue and I think spuriousness is an
interesting research question, so I think that's nice from that perspective. We had some work on
Scone from Stanford where you have this virtual world and five sentences that describe some actions
that you have to do in this world. So for example, move some person with the red hats to position
one and replaces hats from yellow to green or something like that. So that's a long sequence of
instructions. And then the only supervision that you get is what the word looks like at the end. So
we have a state, an initial state, what the word looks like in the beginning, a state, what the word
looks like at the end and natural language instructions for how to manipulate the world.

</turn>


<turn speaker="Jonathan" timestamp="35:28">

And there, the point is that the program is long so you have a very difficult search problem. So if
you're interested in search algorithms and coming up with smart search algorithm or learning through
search algorithms where you can, you know, try to overcome a hard search problem. This is like a
nice data set to look at from the perspective of like actually parsing text to code for people are
interested in tools for developers. There's CoNaLa from Graham Neubig's group, Pengcheng Yin; and
Srini lyer and Luke Zettlemoyer hav CONCODE, they were more focused on actual code and they have
some differences. And I also like the generalization setup from Yale where you have to basically
generalize to compositions that you have never seen. At training time you see some way in which
language composes into programs and then at test time you see completely different ways in which
language composes to programs. And this touches upon this generalization issue, which I think is
very central.

</turn>


<turn speaker="Matt" timestamp="36:27">

I noticed you didn't mention any of yours; complex web questions. Do you view that as a semantic
parsing dataset?

</turn>


<turn speaker="Jonathan" timestamp="36:34">

No, it's not. So complex web questions, we were aiming to view this more as a reading comprehension
task where you are inspired by semantic parsing to do like kind of like what's called multi-hop
reasoning nowadays and you know, do some inference over texts. There is some very interesting work
from people at Google from William Cohen's group at Pittsburgh where they actually treat this as a
semantic parsing problem and they have some good results. They are the best results on overcomplex
web questions and I think that's super cool. Yeah, I guess we did overnight, but I don't recommend
using it anymore. And I did web questions in the past, but I don't recommend using that anymore. So,
uh, yeah, this is what I think.

</turn>


<turn speaker="Matt" timestamp="37:15">

okay. Cool. Yeah, I guess I agree that the interesting data sets to work on these days are the
places where there are still interesting open research questions around say zero-shot-semantic-
parsing like you mentioned or various kinds of weak supervision. So like NLVR or places where you
need executable environments. You don't have a fixed deterministic execution environment. So things
like NLVR2 where you have to operate on the image itself; a natural image that you don't have some
already structured representation of what's in the image or to give a self-serving advertisement
myself, DROP, where this is a reading comprehension dataset with compositional questions where you
probably for some of these questions need to execute some kind of program against a paragraph of
text, but there is no given programming language. You probably need something like a neuromodual
network or something along those lines. These to me feel like the interesting research directions
still in semantic parsing.

</turn>


<turn speaker="Jonathan" timestamp="38:19">

Yeah. So I guess like I was trying to be strict among a definition of semantic parsing, but I think
even at least for myself, the most, like what's the main drawbacks of semantic parsing? Maybe it's
related to your question about will it be like general natural language understanding? Is that, you
know, you're constraint and your context, your environment. But I think its like, maybe the most
interesting thing is how to be inspired by sematic parsing to do things where you don't have that.
So in the paper where we released complex web questions, we basically were motivated by this. Just
imagine that a search engine is like your knowledge base and then you can do question answering over
the web or, in images, uh, you know, just imagine that the image is a structure and do something on
your neural module networks. So the goal is to be inspired by semantic parsing, which says you get
some question and you want a very full compositional understanding of the question such that you can
just deterministically execute it and get an answer. And we, if we can do that for tables, for text,
for the web, for images, then that would be super cool.

</turn>


<turn speaker="Matt" timestamp="39:27">

Yeah. Great. This, has been a really fun conversation. We are getting close to out of time. Is there
anything that you wanted to talk about that we didn't get to, that we want to talk about in the last
bit?

</turn>


<turn speaker="Jonathan" timestamp="39:37">

I guess one thing, maybe to mention, I think this is also like an interesting research problem. So
we just touched upon this idea that semantic parsers should cover things that are not in knowledge
bases, but I think this virtual assistant thing that is happening in our lives right now where tons
of people are just wanting to develop thousands of natural language interfaces and for each one of
them you need to train a semantic parser is also a very fruitful ground for interesting research.
How do you do that? How do you develop thousands of semantic parsers very quickly? And there's a lot
of interesting work, both on how to collect the data on how to use semi-supervised learning and how
to do interactive learning. Basically, how do you start from nothing and then be able to develop a
platforms that accommodate thousands of, natural language interfaces. Whether you're a startup that
wants to have just one or a Google that wants to have like a million. I think there's a lot of
interesting issues on how to deal with like very, very little data regime.

</turn>


<turn speaker="Matt" timestamp="40:45">

yeah, I, this is a big problem, say with Alexa, if you want to build a skill, for instance, for
Alexa, there was a startup that AI2 incubated a few years ago called Kitt.AI that got acquired by
Baidu that was trying to build tools for this space. I know Semantic Machines recently gave a public
demo as kind of the virtual assistant that they've been trying to build after they recently got
acquired by Microsoft. I've reached out to people at Semantic Machines to have them come on the
podcast and they're not ready to yet, but hopefully they will soon and we'll get some more
information about this kind of application.

</turn>


<turn speaker="Jonathan" timestamp="41:21">

Yeah, I mean task-based dialogue, which I don't know anything about Semantic Machines, but I think
this is something pretty central to what they do. Like task based dialogue in contextual semantic
parsing is, I don't know if it's even two different things or not, might be just exactly the same
thing. Maybe with some generation a little bit. So yeah, definitely I think this is a huge
application of semantic parsing. It also has within it tons of interesting research problems. I'm
all, I have worked on this, but I'm always conflicted whether like the solution will actually come
from people trying to build it or people in academia. I hope that's ideas coming from academia,
inspire also people in the real world trying to build these things.

</turn>


<turn speaker="Matt" timestamp="42:06">

Well, great. Thanks Jonathan. This has been really fun.

</turn>


<turn speaker="Jonathan" timestamp="42:08">

Yeah, it was great. I had a great time.

</turn>
