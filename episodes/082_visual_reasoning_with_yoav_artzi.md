---
title: "Visual Reasoning, with Yoav Artzi"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Yoav Artzi"]
number: "082"
tags: []
description: "In this episode, Yoav Artzi joins us to talk about visual reasoning. We start by defining what visual reasoning is, then discuss the pros and cons of different tasks and datasets. We discuss some of the models used for visual reasoning and how they perform, before ending with open questions in this young, exciting research area.

Yoav Artzi: https://yoavartzi.com/

NLVR: https://github.com/clic-lab/nlvr/tree/master/nlvr

NLVR2: https://github.com/clic-lab/nlvr/tree/master/nlvr2

CLEVR dataset: https://cs.stanford.edu/people/jcjohns/clevr/

VQA: https://visualqa.org/

GQA: https://cs.stanford.edu/people/dorarad/gqa/index.html

Neural module networks: https://arxiv.org/abs/1511.02799"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F585869442&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guest is Yoav Artzi who is an assistant professor at Cornell, with appointments
in the department of computer science and the Cornell tech. Yoav has done a whole lot of work. I
guess I remember him mostly from the semantic parsing works that he did like a University of
Washington with Luke Zettlemoyer and others. Yoav It's good to have you on the program.

</turn>


<turn speaker="Yoav Artzi" timestamp="00:30">

Thanks Matt.

</turn>


<turn speaker="Matt Gardner" timestamp="00:30">

Today we wanted to talk about visual reasoning give overview of this kind of stuff because Yoav,
you've been doing a lot of work in this recently with a couple of data sets and so we thought it
would be good to have you on to talk about what this is, what people have been doing, what data sets
and models look like for this kind of stuff. So do you want to start us off with a description of
what visual reasoning means?

</turn>


<turn speaker="Yoav Artzi" timestamp="00:52">

I think definitions of tasks are always a tricky thing because whenever you define something,
someone will come along, have a different definition in mind, write a few papers and everything will
broaden up. So I'm always cautious with that. I had the same experience in the past with semantic
parsing. I had a very specific definition in mind and it seems to be broadening and broadening and
kind of like changing over time. I think some of our initial correspondence you put kind of
something that got me thinking, so if I have to write something down, I would say it's like
reasoning about natural language and a visual stimuli, to generate an output that depends on the
combination of both. So I hope this is general enough so it won't, so you know, the next archive
psycho won't make it completely invalid.

</turn>


<turn speaker="Matt Gardner" timestamp="01:37">

Yeah, yeah, definitely. This is something that's very broad and we're just trying to get an idea of
like what's the range of stuff in here. I think that's a good, a good description. So specifically
you're saying my input is both language and images and I'm going to output something. Why do I need
both of those to do visual reasoning?

</turn>


<turn speaker="Yoav Artzi" timestamp="01:53">

So a lot of it is about the grounding and the output is, I would say it's importance actually
depends on both. It's a generate example, but I can take language and text and just do semantic role
labeling on the text for the image and so I can take language and images, so that's one, definitely
one visual listening. The goal, at least the way we're looking at it is to really think about what's
the, what's the grounding of language, what's the meaning of language in the sense of like very
grounding in a, in a visual input and that allows you to do a much more interesting reasoning. It's
a lot about spatial relations. It also can get you to do interesting reasoning as far as like dual
linguistic phenomenon that we have been observing now I think something, something's happening to
visual reasoning, when we started using this term in the last probably a year or so, it's a
relatively fresh term. A lot of it came about because of emphasis on certain phenomenon in data
collection. It's not that the task didn't exist before under different names. So I would say that
visual QA definitely falls under this definition. But they use of the term visualising started when
we switched data collection process to have a very specific emphasis.

</turn>


<turn speaker="Matt Gardner" timestamp="03:08">

And what emphasis is that would you say?

</turn>


<turn speaker="Yoav Artzi" timestamp="03:11">

So I think the emphasis would be very broad, the presentation of linguistic phenomena and then you
can tie it to more complex types of reasoning. So there's been a lot of impressive work on visual
QA. It's a data set that definitely kicked out a lot of research. But then there has been some
follow up work even from the people who created a data set about some of their linguistic biases and
linguistics simplicity that is there. In visual QA the language in a way outlines the computation,
the reasoning that you are going to do. So if the language is relatively simple, the type of
reasoning you will be required to do is relatively simple and that doesn't stress test our models in
the way that you would like to do.

</turn>


<turn speaker="Matt Gardner" timestamp="03:55">

So I guess other kinds of things that involve vision and language are like image captioning. Also
something that it seems related is like imSitu which is like scene parsing kind of stuff. How would
you put those in relation to how you're thinking about visual reasoning?

</turn>


<turn speaker="Yoav Artzi" timestamp="04:13">

Yeah, so capture generation is definitely something I would include. It has all the components that
fulfills the requirement. There is a very difficult evaluation problem in caption generation, which
personally scares me. I think other people might have more more courageous now scene graph parsing
I'm less familiar with, their are other tasks like what imSitu corpus does, which I'm hope I'm
pronouncing it right, which is basically doing some kind of like semantic role labeling but on
visual input. I would say that doing something like semantic role labeling or visual input is not a
natural language task. It's very similar to image net, you know, image net took word net and from
that created a classification and object recognition task. Inseto, took it one level up. So now we
are trying to recover these frames from images but the only relation to natural language is that we
are taking this resource that was used extensively in NLP and was originally developed by NLP
people.

</turn>


<turn speaker="Matt Gardner" timestamp="05:10">

Yeah. I guess thinking about what does it mean to reason over an image. So you have some example
tasks that we'll get to in a minute that you, as you said, describe the reasoning you might want to
do over an image in language, right? For example, maybe I have an image with a bunch of shapes in it
and I have a question. Like, "Is there a triangle touching a corner of a box?" Something like this.
So the interesting thing in your perspective, and I also agree this is really interesting, is how do
I understand the reasoning that was described in the language and then execute those reasoning steps
over the image in some way. So you have to have some kind of implicit or explicit structured
representation of the image and of the language so that you can match these two. Right. What if I
just had completely synthetic programs that describe the reasoning over the image instead of natural
language text, would this still fit to you?

</turn>


<turn speaker="Yoav Artzi" timestamp="06:08">

So it potentially captures the reasoning process, but it's not really a natural language problem. So
one of the, you know, there are some key properties of natural language that are really important to
make it a natural language program and when you have formal programs naturally presented. So there
is a ambiguity, there is sparsity and there is the scale of the lexical resource. So these are like
the basic building blocks of natural language. And these are the things that make it so challenging.
You know, when you build on top of those, you start to have other problems like syntactic ambiguity
and the composition of structure that are becoming harder and harder to interpret.

</turn>


<turn speaker="Matt Gardner" timestamp="06:47">

Yeah. I guess, in understanding images you might call it visual reasoning, like even to just take a
program to understand what it means to execute that program over the image. This is a nontrivial
problem, but it's more of a vision problem than an NLP problem. And the reason that we as NLP folks
are interested in this is because we want to know how do people express these programs or this
abstract computation or whatever in language in a way that we can understand it and know what it
means, how it corresponds to the visual reasoning that's more of the vision problem. Is that fair?

</turn>


<turn speaker="Yoav Artzi" timestamp="07:20">

Yeah. So, so if to go is to go back to your example of a program. So I won't say it's only a vision
problem because there are other aspects of high level reasoning depending on how you, you know,
what's the learning problem, you know, if you have a program you want to learn what are the, each of
the operators are doing, there might be some aspects of planning. So it potentially goes above
vision, but for a natural language perspective, it covers half the problem, but it doesn't cover the
whole problem. So when we talk about visual reasoning, at least in my group, we have this, we talk
about natural language, visual reasoning because this natural language aspect is for us at least
very critical.

</turn>


<turn speaker="Matt Gardner" timestamp="07:57">

I think we've got a good enough handle of what exactly the range of things we're talking about are
we want situations where we're connecting natural language with vision in some non-trivial kind of
settings.

</turn>


<turn speaker="Yoav Artzi" timestamp="08:08">

Yeah. And this can start with very simple examples. So you can say something like, "There is a blue
umbrella." That's a very simple example. You have an existential, you have an adjective modifying a
noun. You basically, all you have to do is just find the umbrella line and validate its, its color.
And it can be more complicated. So you can say something like, "There are five umbrellas, three on
the rack and two held by people, one of those is half open." This is much more complicated. I think
that at least for current models, it's very challenging, but it's the same problem, on the other end
of the complexity range.

</turn>


<turn speaker="Matt Gardner" timestamp="08:42">

Yeah, definitely. And I want to dig more into that. I think we should talk about specific data sets
first and maybe I think that was a reference to your most recent natural language, visual reasoning
two or squared or however you say this dataset.

</turn>


<turn speaker="Yoav Artzi" timestamp="08:55">

Yeah, I don't think it's an example from them. It's just an example I came up.

</turn>


<turn speaker="Matt Gardner" timestamp="08:59">

related to that.

</turn>


<turn speaker="Yoav Artzi" timestamp="09:01">

But this is kind of thing that we have been trying to emphasize and express in recent work.

</turn>


<turn speaker="Matt Gardner" timestamp="09:08">

So do you want to describe this data set and then I want to dig into some details?

</turn>


<turn speaker="Yoav Artzi" timestamp="09:12">

Yeah, so about a year and a half ago we had this data set called natural language for visual
reasoning and NLVR. And this data set basically was really focused on trying to get more broader
coverage of semantic phenomena. The data set was based on synthetic vision. So we could create, we
could create a highly controlled visual stimuli. And the Alane Suhr, my students put a lot of effort
and creativity in creating, in building an environment that will elicit very specific kinds of
natural language descriptions. And then we had this data collection process, which I won't get into
too much detail, but the goal of the data collection process was to collect natural language
descriptions and pair them both with images where that are true and images that are false. So you
have a relatively balanced data set where each sentence appears with images for which it is true and
with images for which it is false and because of how the visual stimulates constructed it rules out
the type of simple examples that I've shown. So examples like "there is a blue triangle" are
unlikely to be discriminative, as required in the data collection process. So you get, you get more
complex and natural language statements.

</turn>


<turn speaker="Matt Gardner" timestamp="10:30">

Right. And one drawback of that dataset was that it had synthetic images and you recently released a
new one that has natural images, right?

</turn>


<turn speaker="Yoav Artzi" timestamp="10:40">

Yeah. So one problem, it's a major deficiency of data set. It has synthetic images. Now you would
say, okay, we are natural language people. We don't care about vision. But actually it also
influences the kind of language you can get. So it had a tiny vocabulary of slightly over 200 words.
And the reason for that is because it was a very synthetic environment. So we thought, okay, well
let's go and just apply this process to a real image and then we can collect similar data with the
same properties, linguistic properties, just with real images. That was our starting point. It
proved to be a much more complicated. And one of the first things we bumped into is that actually,
you know, when we generate images, we can easily control what the visual stimuli look likes. So we
can easily control. So if we want certain type of language, we can manipulate the environment in a
specific way in really images it's impossible. We can't generate images in a reliable way that will
allow us to control them in such a fashion. So we had to figure out a way to collect images that
will support the kind of reasoning we wanted. So we started by collecting a large set of images that
if aligned with ImageNet synsets so you know, so you can use a previous smallest to initialize
whatever model you have. Then we filtered these images according to some criteria of interestingness
that we defined. And then we paired them together, to pairs of images and we ended up showing to
people sets of pairs of images and we ask them to compare and contrast between pairs.

</turn>


<turn speaker="Matt Gardner" timestamp="12:14">

That's really interesting. So would you get an example as complex as the one that you mentioned
earlier, like "There are four people sitting on a bench with three umbrellas and one of them is half
open," something like that.

</turn>


<turn speaker="Yoav Artzi" timestamp="12:24">

Okay. So maybe I should should've done my homework a bit better and prepared a few examples from the
data. This specific example, I don't know. But you do get the stuff like you know we have an example
in the paper that's kind of like, let me paraphrase from memory examples like you have a set of
items like in the paper it's acorns and there is a specific background and two of these items are in
specific orientation to one another so there are their backs are facing to one another

</turn>


<turn speaker="Matt Gardner" timestamp="12:53">

And so I would get a positive example with a particular image and a negative example with another
image. Like I'm just trying to understand what biases you get because I only have yes, no labels. Am
I going to get odd distributions with like overly complex stuff like I don't even know how to
express this very well. If we run with this like two umbrella example. If I just changed two to
three what we're really testing is can the model count like this is, this is getting into some
complex semantics and it seems hard to test with just yes, no questions. I don't know if I'm
phrasing this very well.

</turn>


<turn speaker="Yoav Artzi" timestamp="13:27">

So what you're going to get at the end is, you're going to take this sentence and this sentence is
going to be paired with four pairs of images, for two of the pairs It's going to have the label
false and for two of the pairs it's going to have the label true. So the goal there was to create a
data that is relatively robust to linguistic biases. So something that happened in VQA for example,
is that people tend to, certain things that people tend to describe are always false. There are the
things that are always true and neural networks apparently are pretty good at picking up on this
biases. And although for humans it's actually potentially a bit more difficult. So once you are a
bit more robust to these a language biases, then it starts to become a dependent on more complex
reasoning.

</turn>


<turn speaker="Yoav Artzi" timestamp="14:13">

So in some of these cases, yes you have, the model has to count. In other cases it has to really
evaluate how objects are aligned to one another in one way. So it kind of like a very visual,
problems that are difficult to discern, especially for current models. In other cases it has
different properties, kind of just to add different properties of the image, like the background
color or stuff like that. In many cases you get this combinations of them so you get to this
condition and this condition are true. Where as in the examples that are false, maybe only one of
the conditions is false while the other is actually still true. So you have to think about
conjunctions of multiple conditions

</turn>


<turn speaker="Waleed Ammar" timestamp="14:55">

And that person who looks at their sets of images, they need to decide what is in common, what's
very common. And like this, this question is answered by the person who was looking at the pair of
images. You don't do any filtering to kind of try to infer this before you show that sets of images.

</turn>


<turn speaker="Yoav Artzi" timestamp="15:11">

So the images themselves are are filtered to kind of like to create more interesting stimuli.
That's, that's partially the reason why we deviated from using a more traditional image sets. Like
ms COCO because they're very object focused and relatively simplistic. But the, the person who
writes the sentence, they get four pairs and they have to select two pairs that will be the true
pairs and two pairs that will be the false pairs and then they have to write a sentence that follows
their selection. Then we take these sentences and we validate them with a different worker and that
worker, basically we decompose this into four different tasks. So it gets one of the pairs, it gets
the sentence, we know what the expected a Boolean value is going to be if it's going to be false or
true. And now we ask them to basically give us an answer so we can validate against the expected
value.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:01">

Yeah. Sounds the first task time it seems actually a little challenging I think, uh, doesn't seem to
be very easy. Have you been able to, to do this well?

</turn>


<turn speaker="Yoav Artzi" timestamp="16:10">

I mean, yeah. So it's a very challenging task. It took us a while to refine the process. We had a
lot of going back and forth and getting some version of the task, putting it out there, seeing that
it's not really getting what we want and kind of like reiterating. We do it with other mechanical
Turk tasks in the groups now. We qualify workers so we have them go through a small test and if they
pass the test we let them do the task. And the specific that, because it's so complicated. We also
had this kind of like training regime. So when you start doing the tasks you are, you're a rookie,
you're a beginner and you are in the, you can only do a small set of hits. Now every time after
every cycle we are going to score you according to how many of your sentences actually following our
set of guidelines and are providing the interesting linguistic distribution that we were aiming to
get.

</turn>


<turn speaker="Yoav Artzi" timestamp="17:02">

And if you're, if you are starting to be good enough, if enough of your sentences are interesting we
are going to give you a bonus and then move you to a, you know, to kind of like an expert level so
you get exposed to more. So people have, so we created this very strong stimulus system that
basically when you get in you want to improve, you want to become better, it's kind of like writing
these elaborate things. You can think about them as reasoning challenges and then if you do that
well you get paid more and you get to do more. So you become, you know, happier. I mean I guess
that's our economy works.

</turn>


<turn speaker="Matt Gardner" timestamp="17:36">

Yeah. We did a similar process in a recent data collection projects that we had for paragraph
understanding stuff asking interesting and challenging questions. I'm glad to hear that the process
works for you too. I think this is really key to getting really interesting and good data.

</turn>


<turn speaker="Yoav Artzi" timestamp="17:50">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="17:50">

So I think we've talked so far about two different visual reasoning tasks that you have worked on
there are a bunch of others also. What others would you think are still interesting to work on? Like
I know there's CLEVR, and there's this new GQA dataset from Stanford. Do you want to talk about any
of these or any others that you're familiar with?

</turn>


<turn speaker="Yoav Artzi" timestamp="18:11">

Yeah, I mean, so I think the first one that came out is still VQA I think VQA still has interesting
challenges in it and you can even reform the task in different ways to do, for example, some kinds
of a more zero shot type of learning. So this data set still has a lot of interesting stuff to do
with that it may be the field of therefore the main task is potentially very crowded and that's
makes working on it's harder. But you know when VQA kind of like the way, because of some of the
biases and a relatively simple listening there, people try to do more complex reasoning and because
of it's very challenging to collect these kinds of data sets, they need a process to do a synthetic
data when once you write, say if you write, once you write the grammar and especially if you can
generate images, then you can create arbitrarily complex sentences.

</turn>


<turn speaker="Yoav Artzi" timestamp="19:02">

Especially as far as like their nesting and this is what CLEVR did. They generated images where you
have a bunch of, several objects scattered around in a 3D-scene and they created grammar that
generates sentences that are usually very highly nested and then they, and because they have the
generation process under control, they also have, they also can have some kind of a program
representation and CLEVR is getting a lot of attention. It's, I think the performance is at 99.9
point well no more points but there is probably a few more nine after that nine. You know, as a
language person, I'm still on the fence about how much value there is in studying synthetic
datasets. And I think the fact that CLEVR was broken kind of like, well I've broken is the right
term there, but if people achieved extremely high performance on CLEVR even before people gave the
talk at the conference, that's kind of a indicative of what was going on.

</turn>


<turn speaker="Yoav Artzi" timestamp="20:01">

But it did lead the community to build a set of a very interesting models and these, and some of
these models are models that we tried on our data set. So these are the numbers that we provide. So
this is CLEVR, along CLEVR there is, there are, there are some other simple data sets. There is a
shapes data set that was initially used in the neural model network set of papers. And more recently
there is GQA, GQA unlike CLEVR and shapes use real images. So it uses a ms COCO and flicker images
that were annotated as part of the visual genome effort. And I don't have like a good grasp of GQA
yet. I read the paper but I don't think I completely understand the mechanics of the process there.

</turn>


<turn speaker="Matt Gardner" timestamp="20:48">

Right? It's pretty new.

</turn>


<turn speaker="Yoav Artzi" timestamp="20:50">

Yeah, it's a, I mean I think I read the paper actually only yesterday the claim there is that they
were able to generate questions that are relatively robust to all kinds of biases. That's the, you
know, the generation process is based on a something like 500 templates there and they have a
process to create a kind of like this nesting, especially when they describe noun phrases. So if the
template has a place for a noun phrase instead of just putting in a direct reference it can be
highly nested like you know "The umbrella on the left of the kid on the left of the car on the left
of the image." Or something like that. The claim I guess would be that it requires complex reasoning
and the data set is extremely large. I think something like, they have two versions, there is the 20
million version and then there is a balanced version that has only 1.5 million or something like
that. When you generate sentences you can just probably keep generating forever.

</turn>


<turn speaker="Matt Gardner" timestamp="21:47">

Do you know what the vocabulary size of this data set is? I would imagine because its synthetic it'd
be relatively small, right?

</turn>


<turn speaker="Yoav Artzi" timestamp="21:54">

Yeah. So I think the vocabulary size, it's not as small as the original NLVR, because lexically it's
just a ritual resource, the visual genome, but I think it's a smaller then NLVR, if I remember
correctly, there are something like between 2000 and 3000 types of tokens there.

</turn>


<turn speaker="Matt Gardner" timestamp="22:12">

Interesting. Okay. Um, so let's see. CLEVR and GQA are specifically question answering, NLVR and the
NLVR-2 is that how you call it?

</turn>


<turn speaker="Yoav Artzi" timestamp="22:24">

Yeah,

</turn>


<turn speaker="Matt Gardner" timestamp="22:26">

These ones are binary yes/no, true/false kinds of statements. We didn't really get into image
captioning datasets, but I think it's fine to move on from that. Are there any, any other data sets
that you would highlight before we talk about modeling stuff?

</turn>


<turn speaker="Yoav Artzi" timestamp="22:41">

So there is this relatively old data set that's called dense visual annotation Corpus? It's from
2014 I think the first author is Mark Yatskar. It's much smaller than any of these, but it comes
with a very, very dense annotation. It might've been too early for when it came out to get the
traction, but it does include a lot of the properties we see in common data sets. Just you know,
they chose a different balance of annotation density inside of the dataset.

</turn>


<turn speaker="Matt Gardner" timestamp="23:10">

Oh and right. I almost forgot some others. There's one by Yonatan Bisk on instruction following in a
blocks kind of world. And there I think in general there are a bunch of other instruction following
on image kinds of stuff. Right?

</turn>


<turn speaker="Yoav Artzi" timestamp="23:23">

Yeah. So that's, that's actually a great point. So I completely ignored all the instruction
following work. So the, you know, there is Yonatan's stuff, the sale data set and we have a number
of data sets that have been released in the last year. They definitely require visual reasoning but
they also require more you know, action generation and planning. So the task is potentially a
broader in that sense.

</turn>


<turn speaker="Matt Gardner" timestamp="23:47">

Okay, great. I think at this point we should move on to talk about how you actually do visual
reasoning. Like what are some of the models that actually work for this kind of stuff. Are there
really broad trends that you can talk about?

</turn>


<turn speaker="Yoav Artzi" timestamp="23:59">

So most of the work has been on VQA and there has been a set of models, like numerous models that
came out of there. I guess you can, you can kind of like, and this is probably a very broad and
coarse generalization, but you can probably divide things into models that are trying to impose some
kind of structure that is dynamic on neural networks and these I would say are the neural network
kind of models. And then models that are just trying to have this like very large opaque
architecture with different features that are trying to just kind of like solve the task with a
static large architecture.

</turn>


<turn speaker="Matt Gardner" timestamp="24:35">

So I think the neural module network stuff is really interesting. Maybe I, and this is a line of
work that was started by Jacob Andreas at Berkeley and has continued on a number of related papers
since that a few years ago. The way I like to think of it is it's semantic parsing like the,
there's, there's been a very long history of translating language to programs and what what these
neural module networks do. At least the way I think of it is you translate language to a program
that has learned parameters. I don't think they were really described this way before, but this is
how I've always thought about them. It's a, it's a learned execution model on top of a semantic
parser. What do you, what do you think of that characterization?

</turn>


<turn speaker="Yoav Artzi" timestamp="25:17">

Yeah, I really like that. That's it's a short and and captures what's going on there. When I look at
the models conceptually and maybe because like you, I have a kind of like I have a history with
semantic parsing. I really like neural model networks. As a language person they can have
potentially the structure of the, of the syntactic structure of the language, so they are doing the
computation in what may be, I would consider the right way. Although this is always dangerous
because empiricism forever, so conceptually I think that they're doing the right thing.
Unfortunately. I think that they haven't proven themselves yet. They have some good results on
CLEVR, on VQA. They are usually behind the state of the art models as at least last time I checked
the results. Maybe I'm a, maybe I'm wrong, these things are rapidly changing on NLVR and LVR-2 there
actually top models, so that's kind of that. That's something that we were, when we saw it you
thought, Oh, this is actually, this is nice, this is cool. These structures are helping. They're
required for this kind of complex reasoning. The results in general alone on these datasets is still
on NLVR and NLVR-2 they are very are still very low, especially NLVR-2.

</turn>


<turn speaker="Matt Gardner" timestamp="26:27">

Yeah. I guess just to give a brief description, I don't know if we described this well enough for
the listeners. The was a neural module network works is just to give a simple example like there is
a red square on top of a blue triangle or above a blue triangle. You would deconstruct this into a
program that has a structure directly analogous to the compositional structure of the sentence that
we saw, so you might have an above predicate and a blue predicate and a triangle predicate in this
programming language. The triangle predicate, I guess technically they have a find that takes
triangle as an argument that the triangle predicate when you execute this would return an attention
over the parts of the image that the classifier thinks is a triangle. And then above is a predicate
that might take as input the previous attention and shift the attention up to something that a like
a different attention for things that are above the input. And you can compose these things in a
very nice way that seems totally natural for someone who has worked on the composition of language
reasoning kinds of stuff. So that that's that kind of model. They, as you have said, they work
pretty well. You also mentioned another big class of models. You want to give some brief intuition
for what these do.

</turn>


<turn speaker="Yoav Artzi" timestamp="27:37">

I mean, so these are little classical in neural network architectures. It's a static architectures
that are, you know, they're doing various things. So there are architectures that are more close to
something called relation networks, the architecture that are more based on attention. So there is
like one. Now there are some stuff like FiLM and there are architectures like MAC net. I definitely
can't give an exhaustive list. It's very large. These architectures tend to work pretty well. So for
example, FiLM is a static architecture. It's very interesting and it performs roughly the same is
the model neural network on the original NLVR and the syntactic and NLVR. So the NLVR synthetic
images.

</turn>


<turn speaker="Yoav Artzi" timestamp="28:17">

There are arguments towards both directions. So on the one hand I can say, Oh we shouldn't try to
tell the neural network what to learn. We are just kind of like a handicapping it and so it won't be
able to, and it suffers from our biases and our assumptions. So let's just build this neural network
and let the weights do everything. That would be FiLM MAC-Net and in these family and on the other
hand will be, Oh actually we know how language is structure. There are these recursive structures,
there is a lot of compositionality in functions that are being reused. We don't need that many
parameters, all we need is this relatively small and lightweight operators, so let's take these
operators and combine them in different ways according to the sentence, and this will give us the
model neural network.

</turn>


<turn speaker="Matt Gardner" timestamp="29:02">

Yeah, that's, that's a nice overview. I guess we've been talking about how you might model structure
on the language side. Do you know if people have talked about or tried to model structure on the
image side as well? For example, using a scene graph, parsers or something like this? I'm really not
familiar with this so I don't know.

</turn>


<turn speaker="Yoav Artzi" timestamp="29:18">

That's a great question. I'm probably not much more familiar than you are. There is a lot of work in
division community on a scene graph parsing. I am not familiar with the model that was applied to
something like VQA or CLEVR that uses scene graph parsing. You know for VQA you can imagine that's
being done because the visual genome, which is the resource for scene graphs is using real images.
Of course these models won't translate well into something like CLEVR where it's, it's a very
different distribution of visual stimuli.

</turn>


<turn speaker="Matt Gardner" timestamp="29:51">

Oh, right. I'm, I guess I'm remembering a recent paper that someone talked about in a reading group
I was in recently and this was on CLEVR and they decompose the problem to parse the language to a
program, parse the image to a scene graph and then execute the program on the scene graph. And they,
because it's synthetic data and they had labeled example like labeled data for both pieces, they
could do this and get quite good results though it still seems questionable to me whether you,
whether this applies in something with a more natural images, the visual parsing is going to be a
whole lot worse than we don't have. Like we can't generate a whole bunch of training, training data
for the graph parsing kinds of stuff. So yeah, I don't know. Still it still remains to be seen I
guess.

</turn>


<turn speaker="Yoav Artzi" timestamp="30:32">

Yeah, so I mean, so it's interesting, I'm not familiar with this specific paper, but when you are
working on synthetic data, there is always the risk that the approach that you will develop will
rely too much on the synthetic data and transfer poorly to the real data. And I think the concern
that you're raising is, a valid concern. I don't totally clear how we can get this kind of
annotation at scale on real images.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:53">

So you have mentioned that the neural module networks they perform best in both NLVR and NLVR-2 I
wonder whether you've seen like a similar pattern, like the ones that tended to do work well for
NLVR also worked well for NLVR-2 or not.

</turn>


<turn speaker="Yoav Artzi" timestamp="31:09">

Okay. So I'll be more cautious. So for NLVR model neural networks, works best for models that
weren't developed specifically for NLVR. So there is a more recent work that there are models that
are built specifically within NLVR in mind, they perform a bit better than a model neural network.
So there is CNN-BiATT from the UNC group and there is another model called CMM that I can't remember
exactly from where that is. And they perform slightly better than a model neural network.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:39">

And when you say built with NLVR in mind, do you mean like they're designed specifically for this
data set and nothing else?

</turn>


<turn speaker="Yoav Artzi" timestamp="31:46">

As far as I know, these systems don't report results on other data sets, so they were, they were
really kind of developed I think looking at the properties of the NLVR task and that allows them to
perform better. I think. See, I think, I am not sure why, but for CNN I might be wrong in there and
that also results. I'm CLEVR. I'm not sure, someone should check the paper, but NLVR , when you look
at models that we just downloaded and ran without much tuning. Then a model neural network from
those does best FiLM also does pretty well on NLVR-2 their situation is a bit more complicated. Most
of the models do actually pretty bad on the data and model. Newer networks that doesn't get such
good results FiLM gets a bit better. The only method that actually makes a dent that is, it's still
a small dent is actually a maximum entropy model with features are based on object detectors. So
that dataset is a, and I think you know, we'll probably later on talk about open questions in this
domain and NLVR-2 is very much stands as an open question.

</turn>


<turn speaker="Waleed Ammar" timestamp="32:51">

So I guess what I'm trying to get to the bottom of is, if I'm trying to approach a very difficult
problem based on your learning experience with these two data sets, would you recommend starting
with a synthetic data and then, so that like we can, we can start working on this problem, which is
very difficult and then switch later to a more natural kind of dataset. Or would you now given this
experience, would you recommend starting directly with the more natural choice?

</turn>


<turn speaker="Yoav Artzi" timestamp="33:18">

I mean, so I would actually develop on and report results on both of them. I think that most
synthetic data will probably allow you to experiment faster at the end, given an approach. I would
try it on both and see what happens. I think that's what makes you know, given the available
resource that that would be a good evaluation strategy.

</turn>


<turn speaker="Waleed Ammar" timestamp="33:37">

Yeah. That makes a lot of sense.

</turn>


<turn speaker="Matt Gardner" timestamp="33:39">

I guess I would say the danger in starting with the synthetic dataset, you can take the bAbI dataset
for example. A lot of NLP folks love to hate on this. I've done it myself, but small synthetic data
sets like this can be useful if they are well-constructed. So like CLEVR for instance, seems good
enough to develop reasonable models because as you have said, at least the model architectures that
were developed to solve CLEVR are currently the best models on NLVR-2, Right. So this did give us...

</turn>


<turn speaker="Yoav Artzi" timestamp="34:10">

On NLVR, sorry, NLVR. Not NLVR-2.

</turn>


<turn speaker="Matt Gardner" timestamp="34:12">

Oh no, no. Okay. Sorry. Um, so, so learning this like the, the synthetic dataset, did in fact give
reasonable advice or like a reasonable problem to do architecture improvements to try to solve it.
In contrast, something like bAbI or a data set that's not very carefully constructed could lead you
to make poor modeling decisions to optimize the synthetic dataset like modeling decisions that
aren't realistic at all. Just as a very simple example, if you look at one of the earlier papers
that got state of the art results on bAbI it had three separate embedding layers for every word,
which makes no sense at all. In terms of like real language, the the embedding layer is like the
largest part of your model and if you, if you have three of these you're just going to way, way over
fit to anything real. And so like it is the case that some synthetic datasets will encourage you to
make bad modeling decisions for the case when you want to actually switch.

</turn>


<turn speaker="Yoav Artzi" timestamp="35:07">

I would say a lot of it is up to you and on your design decisions. So there is a lot of risk working
in synthetic data and that's maybe where I would recommend to work on that together. So use
synthetic data is scaffolding within your development process. But get back to the real data as fast
as possible so you won't find yourself in a place where all the work that you have done actually has
no implication on real tasks and real data.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:33">

And it's really hard to tell like whether the design choices made when you're constructing the
synthetic data are reasonable or not. Right. You can usually tell after working on this for some
time. So I feel like the caution of like, yeah, make sure that you have both datasets to work on
before spending a year working on it. Makes a lot of sense.

</turn>


<turn speaker="Matt Gardner" timestamp="35:52">

Yup. Okay. So far we've talked about what visual reasoning is, what data sets people have used to do
visual reasoning, what kinds of models tend to work. I think now is a good time to talk about, as
you hinted at Yoav, what are the interesting open questions that we still need to look at for visual
reasoning?

</turn>


<turn speaker="Yoav Artzi" timestamp="36:08">

Okay, so the, so the obvious first question is like, you know, how well are we doing? Are the
problems solved? You know, the results on CLEVR are pretty high. It's like it seems like a, the
differences are becoming a meaningless. NLVR to the baselines that experimented with are doing very
bad. There are a number of reasons for that. Some of them are related to the complexity of the
language, some of them are related to the complexity of the visual input. I suspect that they
require a lot of original thinking of the learning procedure. Maybe what kind of training data you
use. So let's say this is a giant corporate problem. The problem itself is is far from being solved.
Then there are questions of, I think there are a lot of interesting questions of data. So we worked
very hard and getting a lot of a broad semantic representation with different phenomena in NLVR-2.

</turn>


<turn speaker="Yoav Artzi" timestamp="36:56">

But I don't think that the, that our process is optimal. I think there is still a lot of room for
improvement and this is maybe more general for the NLP community. We need to think about how to
create data collection processes that are able to get us a diverse representation of language and of
semantic phenomenon. Because we want, yes, we want to solve the, the easy common cases, but we also
want to test our models on the complicated interesting cases. So for example, NLVR, we did, we did
alot of analysis on NLVR-2 and you can see that. So we did a pretty good work on comparatives, but I
think we could have gotten more interesting representation of cardinal reasoning. So we got really
good representation of cardinal reasoning, much better than existing resources. But I still, I still
feel it can be. So there is so much other phenomenon in language that that we are not even getting,
not even getting it now.

</turn>


<turn speaker="Matt Gardner" timestamp="37:55">

Yeah, that's a good point. One thing that I've been thinking about, and I guess I'll close with this
last question. You could imagine criticism for NLVR or for any kind of complex reasoning that you
express in language. Why should we care? Why is this an interesting problem? Like isn't this totally
unnatural? No one would really ever want to ask this about an image because I could just look at the
image and I know what's in it. Like why, why is this interesting to focus on and, and this isn't
just about, NLVR-2 this is also about GQA you said it, I was like heavily nested kinds of language.
Why?

</turn>


<turn speaker="Yoav Artzi" timestamp="38:27">

Well it's, it's a, it's a great question and I can, and I can give two answers and I think it's like
a, you know, it a apply to, they will appeal to different two types of people. I probably spent both
types. I think many are many people do. So on the one hand I think language is interesting. I think
that it uh, you know, we are here to study language and I want to study the full diversity of
natural language. So complex reasoning, even if it's rare in daily usage is something that I would
like to understand better. I would like my models to do. And I would like to understand this data
and this phenomena and how it, how it can be learned from different types of data. This is something
that I would like to explore. This is something that at least attracts me as an NLP researcher.

</turn>


<turn speaker="Yoav Artzi" timestamp="39:09">

So, but this is, this is very much not answering your question because you said nobody uses it what
is the application. You're right, nobody's going to ask these things about images, but there are
tasks where these kinds of like complex reasoning are going to appear. So if you think for example
about, you know, this is might be sound more science fiction, but robots that follow natural
language instructions in a assembly scenarios or maybe in large storage facilities, you do see a lot
of fair reasoning about comparisons between sets about a cardinality. You know, when you, when you
try to tell a robot, for example, take this package and put that on the smaller pile of packages or
something like that. You know, this task has other components like planning and execution and, and
generating actions. But the visual processing and the grounding of the language is actually very
similar to the kind of stuff we see in NLVR-2.

</turn>


<turn speaker="Matt Gardner" timestamp="40:03">

Yeah, those are great answers. Um, I'll add one of my own also. I've been building similar complex
data sets for paragraph understanding. My answer to this question is there are reasons to pose these
challenging reasoning tasks more than because I care about the reasoning itself. It's that I want to
understand what I'm asking about. Like I want to, how do I show that a system really understands an
image what's in an image. You can't just ask simple questions. This isn't about the question itself.
It's about understanding the image. And in order to show that I really understand it, I need to ask
complex stuff about the image. This, this is how we query each other about how we know that we
understand stuff. Like if you're trying to give a student an evaluation in a, in some school
setting, um, you will give them artificially challenging questions to be sure that they understand.
Similarly for reading comprehension. I can ask complex questions not because I care about the
questions themselves but because I want to know that the system really understands the paragraph and
then if I can understand the paragraph or understand the image, then that has lots of implications
down the road for general reading systems generals, the systems that learn from general visual input
and like actually understand what's going on and you can imagine doing really crazy stuff with that
in the future. But first we have to know that we understand and that's what this is about.

</turn>


<turn speaker="Yoav Artzi" timestamp="41:18">

Yeah, so I like this is basically we are going to use language to probe the understanding of our AI
and machine learning algorithm.

</turn>


<turn speaker="Matt Gardner" timestamp="41:26">

Right great. I think we should call it there. We've been talking for quite awhile. This is a really
interesting discussion. Do you have any last thoughts or something that we that you really want to
talk about quickly?

</turn>


<turn speaker="Yoav Artzi" timestamp="41:35">

I think this space has a lot of open problems, a lot of open problems with modeling, with learning,
with data. There are a lot of other problems from evaluation perspective, there are questions about
evaluation that we are not thinking about a lot. I mean there are generation evaluation questions
and then there are questions of like what kind of evaluation really evaluates understanding whatever
that means. So I think it's an exciting space. I hope that a, the kind of resources that we are
releasing, and I know that a AI-2 has been releasing in collaboration with the other people is
really going to kind of like encourage people to pick up the challenge and, and make progress. And I
hope that we're going to see some exciting things. I'm sure we are going to see some exciting things
in the next few years.

</turn>


<turn speaker="Matt Gardner" timestamp="42:18">

Great. Thanks. Thanks for coming out. This was really fun.

</turn>


<turn speaker="Yoav Artzi" timestamp="42:21">

Thanks guys.

</turn>
