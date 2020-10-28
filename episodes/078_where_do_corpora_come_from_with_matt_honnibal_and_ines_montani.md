---
title: "Where do corpora come from, with Matt Honnibal and Ines Montani"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Ines Montani","Matt Honnibal"]
number: "078"
tags: []
description: "Most NLP projects rely crucially on the quality of annotations used for training and evaluating models. In this episode, Matt and Ines of Explosion AI tell us how Prodigy can improve data annotation and model development workflows. Prodigy is an annotation tool implemented as a python library, and it comes with a web application and a command line interface. A developer can define input data streams and design simple annotation interfaces. Prodigy can help break down complex annotation decisions into a series of binary decisions, and it provides easy integration with spaCy models. Developers can specify how models should be modified as new annotations come in in an active learning framework.

Prodigy: https://prodi.gy

Prodigy recipe scripts: https://github.com/explosion/prodigy-recipes

Twitter: https://twitter.com/_inesmontani https://twitter.com/honnibal"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F559200912&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guests are Matthew Honnibal and Ines Montani. You might know them as the people
behind the spaCy library that a lot of us know and love. I guess in academia I think we mostly use
it as preprocessing to like do part of speech tagging or tokenization or whatever before you do
input to whatever model you want to do. Matthew and Ines might not think of it quite as a
preprocessing library. I probably gets a lot more use outside of academia for other things. Welcome
to the program.

</turn>


<turn speaker="Ines Montani" timestamp="00:37">

Yeah, Hi.

</turn>


<turn speaker="Matt Honnibal" timestamp="00:37">

Thanks. And I'm actually, yeah, I think pre-processing is, you know, a very common use case, the
library these days. But you know, often it is useful to pre-process with models as well, which is
why spaCy ships with like an entity recognizer and stuff.

</turn>


<turn speaker="Matt Gardner" timestamp="00:50">

It, there's a lot of nice stuff in there. But today we're not going to talk about spaCy. We're going
to talk about something else you've been working on, which is, where do corpora come from? Do you
want to give us an outline of what you're doing here? I guess this is a talk, you've given at a
bunch of meetups recently. This is, and you've built a tool called prodigy and this is like the
basis of that, right?

</turn>


<turn speaker="Matt Honnibal" timestamp="01:09">

So the high level idea behind this is when we were working with people who were doing commercial
NLP. We found that annotation workflows and questions around annotation where actually some of the
really high impact things that could be improved. They were the things where the projects were most
likely to be succeeding or failing where around questions around the data process and the annotation
process. That's why we think it's important to basically be talking about these things and why we
develop tooling that we think actually helps people get these questions more right than wrong. And
you know, it gives you the work flows from these things and especially helps the data writer you
know, basically do rapid prototyping.

</turn>


<turn speaker="Matt Gardner" timestamp="01:44">

I guess we don't think about this as much as we probably should in academia and research. And I was
trying to think about why. I guess I'm, I'm currently trying to build a data set right now, but it's
for like more complex question answering or reading comprehension kinds of stuff. We don't think
about this active learning kinds of annotation. We don't, we don't study the process of annotating
data because from a research perspective it's hard to get funding to like do a controlled study
where like you try different annotation methods and you see what works and it's hard to evaluate
this kind of thing. But I guess you run into this kind of problem a lot though, right?

</turn>


<turn speaker="Matt Honnibal" timestamp="02:21">

Yeah. And I would say actually say that, you know, the problems in academia are a little bit
different where when you're defining a new data set, you're usually thinking about defining a new
task. As you say, the problem that we are really talking about much more is basically deciding what
to do. Like how, you know, deciding how to solve some sort of problem.

</turn>


<turn speaker="Ines Montani" timestamp="02:38">

Yeah. Yeah. So a lot of the problems we, we've seen really come down more to that. The problem
definition and how do I design my labels scheme and how do I decompose the larger application that's
supposed to like do something in the real world into smaller tasks and into also smaller machine
learning problems that i can actually solve. So even things like should I use name entity
recognition model or is this a text classification problem? That's something that might sound
trivial and super simple in theory. But in practice if you're actually working with a real
application and real problem, it's not always that obvious and it takes a lot of trial and error and
a lot of experiments to really get this right. And it's very, it's actually surprisingly easy in and
more industry setting if you're solving a problem and trying to make something work to end up with a
model that's supposed to predict something similar to music I like, which of course seems like
something a model can learn. But you know, once you really deep in a very specific domain takes, it
takes a lot to really find a label scheme that makes sense. Final level scheme that a model can
learn. And that's, that's really something we trying to solve with better tooling around this type
of stuff.

</turn>


<turn speaker="Matt Gardner" timestamp="03:44">

Yeah, I guess I could think of this is how do I do better at applications of natural language
processing? Like I, we in the research community focus a lot more on like pushing boundaries for new
stuff, but industry has a whole lot of problems with like, how do I take what people have done and
apply it to my business problem, right?

</turn>


<turn speaker="Matt Honnibal" timestamp="04:01">

Exactly, so it's how do you compose these models together to make solutions? And there's a lot of
choices in that that you know, fundamentally pretty hard to study from an academic perspective. And
I don't think that it's necessarily the job of the academic community to develop those things that
it does come back to the annotation flows. Because once you're deciding what to annotate, you have
to have already decided what model you want to train. And so deciding what the output should look
like is basically the same as deciding the annotation scheme. And that's why we suggest it's sort of
either bit workflow and also workflows to help people annotate things. Fostering your annotation
processes that work at a smaller scale so that people can try things out and try different putting
togethers to see if they can, you know, basically come up with better solutions to this.

</turn>


<turn speaker="Matt Gardner" timestamp="04:41">

Can you give a concrete example of the kind of process you're talking about and the prodigy will
help people with?

</turn>


<turn speaker="Matt Honnibal" timestamp="04:48">

Well, let's say that you've, you're working on a a type of problem where there's only a fixed number
of the entities. So basically a lexicon will work pretty well in this type of problem. You might use
to say start off with a word vector model and then give it a couple of state terms and then
basically prodigy you will use the vectors to suggest a similar terms to what you gave it. And so
you can go to a lexicon pretty quickly this way and then you can use the lexicon to bootstrap an
entity recognizer.

</turn>


<turn speaker="Ines Montani" timestamp="05:13">

Yeah. Yeah. Often you might have some idea you want to train the model for you domain. Like we have
a lot of users from finance to health care. Often the areas where you kind of don't know what will
work until you try it. So you can have an idea. You can say, let's see if my text classification
model could learn this. That would really solve my problem and you can actually, go through this
very quickly, build a prototype, build a proof of concept and basically decide which of these
approaches you want to invest in and try more of. And that's only possible if like the tooling lets
you do this in a very quick way and you don't have to call a meeting, hire a bunch of people, put it
on mechanical Turk, wait a few weeks, train your model and NCR.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:51">

So, what kind of evolution do you recommend that we do?

</turn>


<turn speaker="Matt Honnibal" timestamp="05:53">

We recommend something like a bootstrapping type process where with very small questions is a
technique that we have in prodigy where you basically run AB evaluation. And so even for something
like end entity recognizer can run two versions of your model and pipe the outputs into this AB
comparison and you say which randomly allocates ones a green ones a red and then you click okay was
green better in this or red better in this. And that means that you know it even takes you only like
one minute or two minutes to get a robust evaluation over models that are only slightly different.
And so if you're working on something where you don't have a large evaluation set yet, this is a
very quick way that you can say, alright, am I moving in the right direction? But as you start
running these things and you keep working at some point it does become useful to get an evaluation
set and then you want to basically held that said the same way that you would for other
methodologies.

</turn>


<turn speaker="Ines Montani" timestamp="06:41">

Another little trick that we found to work quite well is we have one mode where you, if you have an
evaluation set or some data you can hold back, you run several training rooms training experiments
with different portions of the data. So you start off with 25%, 50, 75, and then all your data and
that can sometimes give you a very, nice rough approximation. How your model is improving with more
data. Like of course you still have to like try it out, but often if you see a significant increase
in the like last 25% as a rule of thumb, that's often an indicator that maybe if you keep collecting
more data of that type that your model will likely improve. Of course, it's not like a definitive
answer, but you know, if your prototyping this can often be a good indicator to find out whether am
I on the right track of, I'm a completely off and that's the type of question this can answer.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:29">

So the, the, this type of evaluation makes sense when we're trying to evaluate different approaches,
but we know exactly what is the thing that we're trying to predict. But like you said before,
oftentimes when we think about this, the downstream applications, we don't know exactly how to
decompose the problem into smaller NLP sub problems, right? Or just like how do we reduce or
decompose our problem into a series of predictions, which then we need to train a model for and it's
not clear to me how do you use this approach in order to make this decision?

</turn>


<turn speaker="Matt Honnibal" timestamp="08:00">

Ultimately it's like all the types of programming, right? So a model is just a function and in, you
know, normally in programming you've always got these decisions about where to do the work, right?
You can make one function like, you know, do a bit more to computation and output and different type
of a thing that another function will consume or you could like have a function in between. There's
always these decisions about how to divide up a label and we've got exactly the same type of
decision to make when we, you know, modeling things with a machine learning. So ultimately you have
to basically pick something, but then after having chosen, alright, I'll try it this way, I'll try
putting this together, this sort of pipeline to solve a problem. So for instance, I don't know, you
might say or I'll try it fully N to N model that we'll do something like semantic roles as an entity
recognition for a model.

</turn>


<turn speaker="Matt Honnibal" timestamp="08:46">

Maybe you decide that that's going to be, you know, probably have a decent chance of success in your
tasks. So okay, you try that out and then our recommendation is that you in a way that lets you
export that model in an easy to use format that you can plug into the rest of the application. And
that's why prodigy and spaCy make it pretty easy to get a model package that you can then plug into
another system. You basically uses as an artifact that you can try out in your sandbox of the next
application, even with a few percent of live data or something if your working in that type of
system. And the opposite of this that we recommend against is living in your Jupyter notebook or you
know, whatever environment that you're basically testing in pages, optimizing some score where you
don't know whether that score actually correlates with success in your application. You know, we
think that basically closing the loop as quickly as possible, so you can try exploring the model is
the answer to this.

</turn>


<turn speaker="Matt Gardner" timestamp="09:33">

Yeah, that's a really good point. So if I could summarize so far, I think at a high level of what
you want to do, the problem you're trying to solve is that if I want to apply NLP to my business
problem, probably I need to fine tune some models like get, get a new model that works for my
particular business use case. And you want to provide tools to make this easier for people who want
to do this. Right. I don't think we've actually described yet what your tools do. Do you want to
tell us about prodigy or whatever else you recommend?

</turn>


<turn speaker="Ines Montani" timestamp="10:04">

Yeah. So prodigy is, a developer tool, so it's a Python library you can install on your system. So
you download it, run it, it comes with a web application that you can spin up as a command line
interface and the option to write your own Python scripts. So what you do is you compose what comes
in, so your data stream, how it should be modified, whether something should be updated as new
annotations come in, then you can easily kind of pipe that forward start a server and see that in
your web interface and annotate. So the idea is you can have different interfaces. You can label a
whole text, you can label spans in a text, you can make them manually editable where you kind of
click and drag to highlight something. You can have an image, you can have HTML, so it's very free
form and it's also open to your interpretation.

</turn>


<turn speaker="Ines Montani" timestamp="10:48">

What this means in the end, what your labeling there. And we've really tried to focus on efficiency,
speed, the annotation. The Interface really focuses on three main actions accept, reject and ignore.
We try to break down as much as possible into very simple, very quick decisions because that also
helps the data quality. And if we really try to automate whatever a computer can do well and focus
on what we really need a human decision on, the quicker the human can make that decision the better
because we get better data and more data. So that's the philosophy.

</turn>


<turn speaker="Matt Gardner" timestamp="11:19">

Just from listening to that description. Someone might think that this is like a collection of say
react components or I don't know what library are using, but like a, a set of like eb UI components
to make things easy. I would say looking at your presentations and other things, it seems like there
are three key ideas that you have that make this like more than just a nice interface, right? So
it's like easy integration with a model because of spaCy, right? So it's easy to hook up things so
you can get data the way you want. You also try to break down complex decisions into binary
decisions. We should talk about that more. And then the last thing is you've talked, at least in
your materials, you talk about active learning and I'd like to get more information about how
exactly you do active learning in this kind of setting because I think that's really interesting. So
how about we talk about this binary decision thing first? What is this?

</turn>


<turn speaker="Matt Honnibal" timestamp="12:12">

Okay, so I would actually just clarify a little bit inside it. Now, even if you note, I'm not
working in a binary interface. I think that a lot of the annotation tools do, that's an ideal, is
present really long documents with lots of decisions and complicated interaction patterns. And then
you do a whole bunch of work for minutes at a time and then you submit that off. I think this really
runs counter to the way that that application design works?

</turn>


<turn speaker="Ines Montani" timestamp="12:35">

Yeah. Also how humans work in general. Like if yeah, we, we are quite bad at all things. If you ask
a human to perform a series of these steps, they're most likely gonna make some mistake somewhere.
And also in general, the more friction you have, the less satisfying the interaction. So that's,
that's something, yeah, we did want to get across.

</turn>


<turn speaker="Matt Gardner" timestamp="12:53">

Yeah, that, that's a good point. And it's one that I know a bunch of people are thinking about with
NLP annotation in general. Like there's this QA SRL project that tries to take what is a complex
decision over the whole sentence structure. Like what's the predicate argument structure, the
sentence you could like annotate this whole thing in one go with this complicated annotation scheme
and they're saying, how about we make this a lot simpler and just have people ask questions if we
get the right questions and answers, this will give us pretty good arguments structure. And another
thing, similar ideas with co-reference resolution. So, so yes, breaking stuff down into this is
really good.

</turn>


<turn speaker="Ines Montani" timestamp="13:24">

That's also something we've seen that basically often instead of focusing on every single thing you
might want to annotate, often if you have a few small things, everything else will fall into place.
So if you even if you're annotating part of speech tags and you know what the verb is, that has a
huge impact on all of the other predictions you're making. If you had the verb wrong, just changing
that one decision can really make a much bigger impact than having a human annotate every article,
every instance, every instance of the, and then they're gonna make one mistake and then you have
your model trying to fit on that one example. And trying to come up with some theory. So yeah. Yeah.
We've, we've basically, we've come to the exact same conclusion. Yup. Yeah.

</turn>


<turn speaker="Matt Honnibal" timestamp="14:00">

Said slightly differently to build an intuition for this. If you're doing structured prediction,
like the thing that makes structure prediction kind of attractive as an inference style or learning
style is that there's so much mutual inflammation in the structures that we're out. Right. And so
one bit of the parse tree, if you know that information is really useful information for another
part of the parse tree. And similarly, you know, what is the predicate is really useful features,
but what argument you are deciding? And so given that there's so much mutual information, there, if
you could pick which bits of information to provide about the structure of a, like a whole Corpus,
the sort of least informative ones, you want the bits to be spread out over all the examples because
given some bit of information on one predicate argument structure, you can really reasonably guess
all of the other ones, right? And so you're streaming information more usefully from the human into
the model if you spread this out and have different bits of each structure annotated rather than
having all of the bits of one structure annotated completely. And then all of the bits of the next
structure annotated completely and having bits of fewer structures.

</turn>


<turn speaker="Matt Gardner" timestamp="15:01">

So this approach to annotation makes a lot of sense and it also motivates different types of
algorithms for learning from them. Could you elaborate a little on what kind of, so why are the
current methods I mean, obviously current methods or the standard thing to do is to use the
annotation for the entire inputs that your trying to make prediction about. But now you were saying
this is not the most efficient way to collect data. And I wonder is in your experiments, what turns
out to be a better way to do this?

</turn>


<turn speaker="Matt Honnibal" timestamp="15:27">

Just to preface this slightly, it's really only easy to do to binary style if you've got an initial
model. So there's kind of a cold start problem to get over. So at some point you do need to, you
know, if you're starting a new task, you know, you've got no reasonable basis to start with then
sure you need to annotate some structures entirely because otherwise you're doing this randomly and
it's not efficient. But at some point I do think it's efficient to switch over to the binary
interface to basically build out the model and do this. So are you asking that the algorithms to use
a like, you know the annotation process or,

</turn>


<turn speaker="Waleed Ammar" timestamp="16:00">

So I guess there are two important questions here. One is how to pick which parts of the input that
we should ask the annotator to work on. And then once we have this annotation, this incomplete
annotation, how to use it to update our model.

</turn>


<turn speaker="Matt Honnibal" timestamp="16:12">

What we do in open podiatry is basically just ask questions that try to maximize the uncertainty.
You know, this is a form of active learning. What we found is, you know, a simple policy that people
can Intuit that also works pretty well. So the idea there is that you're just sort of maximizing the
expected size of the gradient. So if you ask questions near 0.5 then in expectation you're gonna
have the largest update of the model to make. There's some situations where this isn't best there is
also difficulty if you know, if the Model is super miscalibrated and it's hard to rely on thies
selection mechanism, there's also questions around how to order the examples to get the same sort of
questions are asked at the time. So in particular, we like to ask questions about one label at a
time. And let's say you've got like a model of like 20 different labels. We always encourage people
to work on one label at a time because then you've got much less clicking in the interface that
you're only thinking about one part of the annotation scheme or things of that actually makes the
annotation both go faster and be much more accurate.

</turn>


<turn speaker="Matt Gardner" timestamp="17:05">

Earlier you, you brought up this idea of like if I knew where the root was or I knew where the what,
which ones of these things were verbs, I could do a whole lot better. And that sounded like a really
interesting kind of active learning sampling strategy where like you're doing some counterfactual
kind of search, but it sounded like that's not what you're actually doing. Do you have any thoughts
there?

</turn>


<turn speaker="Matt Honnibal" timestamp="17:25">

You can argue the data, however you like in prodigy you know, it's just these piping screens.

</turn>


<turn speaker="Ines Montani" timestamp="17:29">

Yeah. Yeah. And also you can decide when to update the models. So that's, yeah, you're writing your
own logic as optional, but you can have a callback that's executed every time you get a new batch
back. So you can then say, okay, I have this knowledge, now I can update the model. And then I can,
for example, get the same data back or like other examples back with the adjusted predictions and
see what I get out of this. So that's, that could be one option. And sometimes you have this nice
effect where you click through a few examples or maybe you reject some things that are almost
correct and then in the next batch, if it goes over the data again, you actually get the correct
paths because you're like, yep, model, try it again and going right this time. But that's often kind
of nice because it's also very motivating if you, if you're doing the annotation to really see the
impact.

</turn>


<turn speaker="Matt Gardner" timestamp="18:11">

So if I'm understanding right, then what you have built into prodigy already says, I'm going to
sample based on the uncertainty of the model and show those particular decisions to the user, the
annotator. But you're not saying like, if I get this annotation and then train with it, how much
will my model change? Or like if I can condition on this, how much does the rate, how much does
uncertainty drop for my model for the rest of the sentence?

</turn>


<turn speaker="Matt Honnibal" timestamp="18:37">

You're right that we're not, we're not doing it that way. You know, it might be easy to just
describe in detail the card, like any outreach, recipe. Again, these are kind of subject to play
testing, which is the way that I think of this. And I actually really like to experiment with more
dependency parsing annotation strategies, like things like starting from the root down is, you know,
I think that that's a reasonable thing to try with it, right?

</turn>


<turn speaker="Ines Montani" timestamp="18:58">

Because we also like consciously designed prodigy in a very modular way. So the idea is, for
example, that the uncertainly sampling, that's a function that you can import, which is called
prefer uncertain. You've wrapped that around your stream, that yields score example topples and then
it sorts that. And then there's another one called prefer score, so you can write your own and say,
Oh, let's try this kind of approach. So that's definitely something we've already built into the
thing.

</turn>


<turn speaker="Matt Gardner" timestamp="19:21">

Yeah, that's a great way to do it. And I, what you have is great. I was just thinking like there are
some really interesting and really cool stuff you could do with this like extensible framework that
you, that you have that seem really cool.

</turn>


<turn speaker="Matt Honnibal" timestamp="19:31">

One of the things that I find interesting about this is there's lots of decisions about minimizing
the cognitive load on the annotator. You know, if you're only thinking about the information theory
stuff, which I think is something that the active learning literature is a little bit weak on at the
moment, you know, they think of it in terms of alright, if I have this many samples, like how few
samples do I need to do something but the annotation speed is really an annotation accuracy, rate is
really important, right? So you'll probably not maximize the usefulness of each data point if you
have the annotators stream through all of the entities of the same like you know, phrase type. So
you know, you and you annotate all the, Elon Musks at once. Right now those are lots of useful and
per sample basis. But you can click through them fast, right?

</turn>


<turn speaker="Matt Honnibal" timestamp="20:15">

So they'll flash up on the screen, you'll click through it and be like less than one in a second. So
if you minimize diversity in the data and then the annotation speed goes up enormously. And
similarly if you sort the things by very high scoring ones are all together so you clicking yes a
lot and you basically standing accepted, you know often you go so fast that you have to like go back
and your kind of mental will do a playback of six seconds because you realize ah, that one a few
seconds ago was wrong. And this is the type of consideration that I think is, you know, you
basically just have the play test new usability testing. It's not something that's easy to study in
these kinds of experimental frameworks.

</turn>


<turn speaker="Matt Gardner" timestamp="20:51">

Yeah, those were really good points. One thing, so we need to get back to where we didn't ever
actually answer one of Waleed's questions, which is how do we, how do we learn in the presence of
these binary decisions? Right. So you, you're taking in some cases like a structured output like
dependency parse or a part of speech tag sequence and you're breaking it down into a bunch of binary
decisions. But I might not have all of them annotated for your particular example. How do I learn?

</turn>


<turn speaker="Matt Honnibal" timestamp="21:19">

Right? So let's take the model is suggested "Amazon is a person. "And you've clicked reject, right?
And maybe that's the only annotation you have about the whole sentence. So all you know about these
sentences, "Amazon is not a person." So how do we update on that? Well, so first we do, we run beam
search with a global model objective. So basically we're, you know, running the entity recognizer
and we might be outputting, say, 16 best analyses. Now, if the state of the model was such that in
none of those 16 best analyses, Amazon was even suggested as a person then we're actually not really
gonna make an update here, right? There's no information that we can teach the model about its
current state. But let's say instead that you know, the top rank piles of the third rank piles or
something like that, allocating some probability to a Amazon being a person where clearly we want to
update the weights such that that doesn't happen so that you can see already that, okay, there is a
path here is the thing got a current standard model and we know how to make it better.

</turn>


<turn speaker="Matt Honnibal" timestamp="22:12">

We've got a distribution out of the thing and we know what distribution we would prefer instead, or
at least a feature of the distribution of it. And so even without the details of this, you should be
able to see it as a way to calculate that gradient update. So the specifics of the algorithm that
we're using at the moment is we run the beam set twice once with these constraints that the
annotations impose that we say, all right, give me a beam that complies with these constraints. And
then we basically do this sort of multi labeled soft max procedure where we say update the weights
such that these parses get zero probability and then re normalize the scores on these other ones
that they sum to one and an update the weights with that type of distribution.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:51">

So one risk that we're doing here is that we might be shifting the probing distribution to something
that's also wrong. So maybe maybe we have three types a person, organization and location the return
may make hypotheses that are compatible with the annotation. We're all that Amazon is a location so
we would be shifting those attrition from person to location which is also wrong and then we will
top that the next, the future annotations with hopeless fix this. How often do you find this to be a
problem? As, I mean there is like, it feels like there is a trade off between giving more
information in each data point as opposed to doing a lot of alterations with smaller information.
Does this make sense?

</turn>


<turn speaker="Matt Honnibal" timestamp="23:30">

Yes. The note that we might be updating towards the distribution that's still unideal but we can't
be more wrong than we were because we still output something that you know, the score is still
proportionally amongst the ones which we evaded constraints, right. So let's say, you know, we're
still wrong in like it has Amazon as a location where we want it all and it has location at 0.5 or
whatever the ratio between those two classes won't change. It's just that they'll both be more
likely than they were because they've stolen the weight off person and so we're still moving in the
right direction, which is, you know, all you ever hope to do for gradient.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:03">

That makes total sense. I think the question more about like practically at what point does this
fall apart if we have a hundred different categories. For example, if you have a classification text
classification problem, this asking about each class doesn't seem like every efficient way to do it.
Well maybe it isn't. Or is there a cutoff where a, if your number of presses will be under a certain
limit, this doesn't become a very good way to do it anymore.

</turn>


<turn speaker="Matt Honnibal" timestamp="24:29">

In practice, if you're starting from a model that's pretty bad, then it's hard. If the model's
already like pretty decent, then it works really well.

</turn>


<turn speaker="Ines Montani" timestamp="24:36">

Yeah, and also if you look at it for more of an application context, okay, your company, you have a
model that works, you analyzing large volumes of text and you just want to have the best possible
output. You want your model to be more right, so every tiny bit that shifted towards better
predictions already makes a big difference, especially because you can average over those
predictions and that's what you care about. And so that's also a big use case. We're trying to
Sophia and it's okay how long you want it to be better and even 1% increase overall can already mean
a lot to you financially, for example, to your company.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:09">

Another thing that I'm curious about is what kind of limitations do we have when we use prodigy in
terms of defining the model itself? Are we allowed to design our own models or are we restricted to
a certain class of models?

</turn>


<turn speaker="Ines Montani" timestamp="25:23">

No, I mean you can design any, anything you want to label. If you can get that on the screen somehow
you can label it. Like of course there's some restrictions. If you actually want to have your own
model in the loop there obviously some modeling decisions you need to make in order to make this
work well, which is something we've optimized for our own models. But if you want to plug something
else in you for example, you have to make sure that it actually is more sensitive to updates because
it will get, for example, one batch of annotations every time they use an annotator batch. So even
if you set the batch size higher, you still need to be able to actually make meaningful updates for
most batches. Those are all considerations of course you have to make. But in general you can
define, you have data that's coming in or you have some idea of a labeling scheme, however you want
to label that data. So for most cases all you have to do is think about, okay, do I want to
highlight spans? Do I want to assign labels to the whole text? How do I maybe do I want to have a
multiple choice thing? How do I make this more efficient? How can I really reduce it to the core of
what I'm trying to find out? And at the end of it, you get the data out. Like it's also of course we
say for some things and make sense to annotate more statically. Take your Corpus at the end, have
the gold standard quotes that you've produced and entering from that. So that's all possible.

</turn>


<turn speaker="Matt Honnibal" timestamp="26:29">

Yeah. So you know it's just this Python script and you just need to write generated at outputs. If
you want to use other sources, then you would output at topple of let's say for example are the
examples just a chasing record and you know, it span offsets and that sort of thing. Or if we're
using a different type of view, like an image or something, you can use that instead. It's really
pretty simple. Like, you know, one of our like, you know, little mottoes is let them write code. So
you know, we think that it's a lot easier if you can just write this in python and then use that as
the big chunk of the API for that sort of customization.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:02">

Right? So this would allow Matt for example, to try a different way of deciding which data points to
annotate and maybe compared to what you were doing and see what works better.

</turn>


<turn speaker="Ines Montani" timestamp="27:11">

Yeah, absolutely.

</turn>


<turn speaker="Matt Honnibal" timestamp="27:11">

Certainly

</turn>


<turn speaker="Matt Gardner" timestamp="27:12">

Great. So I think the last question that I had was along this line of we're trying to fine tune a
model, right? You've said a few times in this conversation that there is the cold start problem. You
really don't want to do this binary annotation kind of thing if you don't have something that's
already at least close and for business uses, it's a lot more take an existing model and apply it to
some new domain where like maybe I want to have a biomedical NER tag or something that's geared
towards fashion or whatever. Right? So this is less about defining new tasks and more about like
domain adaptation kinds of stuff. And we've seen a lot of work recently in natural language
processing research along the lines of pre-trained language models like ELMo and BERT and other
kinds of things. How do you see this changing what you do going forward?

</turn>


<turn speaker="Matt Honnibal" timestamp="28:02">

So we've been looking forward to being able to pre train what we call the encode step or like the
LSTM step or you know, whatever type of widget we are using to make the, the vectors context
sensitive. We've been looking forward to being able to pre train that for a long time. I think
actually we have like, you know, slides going back like a couple of years where we say, Oh we, I'm
sure we can pre-trained this bit. The output bit is where you actually get to sort of write your
program and when you get to define the output, you know, so thats the bit that you will always want
to annotate. Very excited to see these things coming together and to see thes really starting to
work because the results that are coming out with now, you only need like 1000 labels to get pretty
plausible accuracy, of some text cut tasks. Right. That means it takes you 15 minutes to find a text
cut. That's really good. And that fits exactly with what we're intending with, you know, rapid
prototyping and having just, you know, you have an idea and try it out.

</turn>


<turn speaker="Matt Gardner" timestamp="28:52">

Let me make sure I understand. You're basically saying these things just make our lives way easier
because the prodigy tool is designed exactly for the use case that these large pre-trained models
enable. Right.

</turn>


<turn speaker="Matt Honnibal" timestamp="29:02">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="29:03">

It's been really nice talking to you. Do you have any final thoughts or anything you wanted to talk
about that we missed?

</turn>


<turn speaker="Matt Honnibal" timestamp="29:08">

Well, actually one thing that hasn't come up that I think is a bit different from the way a lot of
people are designing annotation tools, especially commercially is that, you know, we really think
that people should want to hold onto their data and that they shouldn't want to upload, you know,
sensitive texts to some company, another aspect of this as well as the text, that people are trying
to sort of combine together from all these different sources to sort of make one master model that
will keep getting better or whatever is actually much less useful than people think. Prodigy really
works entirely offline. The data never has to leave your servers, which we think makes them tool
much more useful.

</turn>


<turn speaker="Ines Montani" timestamp="29:40">

Yeah. This is also how we did, we wanted to design other tools that we working on in the future. So
for example, at the moment we are working on a more services extension that actually let's use a
scale of the annotation project makes it easier to like manage multiple annotators multiple data
sources, create larger CoQA and bigger projects. And even there, we've come up with what we think is
a pretty good innovative solution to make this work in more of a cloud setting while still giving
users full control of their data. So basically there data stays on the cluster that they run, that
they control. We never see any of that. And they can still have the full experience of a service
without having to compromise on the data privacy.

</turn>


<turn speaker="Matt Gardner" timestamp="30:17">

Yeah. Great. Thanks for coming on. It was nice talking with you.

</turn>


<turn speaker="Matt Honnibal" timestamp="30:19">

Cool. Thanks

</turn>


<turn speaker="Ines Montani" timestamp="30:20">

Thanks.

</turn>
