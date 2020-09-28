---
title: "Common sense reasoning, with Yejin Choi"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Yejin Choi","New Speaker"]
number: "095"
tags: []
description: "In this episode, we invite Yejin Choi to talk about common sense knowledge and reasoning, a growing area in NLP. We start by discussing a working definition of “common sense” and the practical utility of studying it. We then talk about some of the datasets and resources focused on studying different aspects of common sense (e.g., ReCoRD, CommonsenseQA, ATOMIC) and contrast implicit vs. explicit modeling of common sense, and what it means for downstream applications. To conclude, Yejin shares her thoughts on some of the open problems in this area and where it is headed in the future. Yejin Choi’s homepage: https://homes.cs.washington.edu/~yejin/ ATOMIC: https://homes.cs.washington.edu/~msap/atomic/ ReCoRD: https://sheng-z.github.io/ReCoRD-explorer/ CommonsenseQA: https://www.tau-nlp.org/commonsenseqa"
type: episode
---

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence recently one of the podcast listeners suggested that we talked about common
sense reasoning. So we invited Yejin Choi, one of the leading researchers in this research area to
tell us about common sense reasoning Yejin is an assistant professor at the school of Computre
Science and Engineering at the University of Washington and a senior research manager at AI2.
Welcome to the program Yejin.

</turn>


<turn speaker="Yejin Choi" timestamp="00:29">

Hi, thanks for inviting me. I'm happy to be here.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:33">

So first, could you tell us what is Common Sense and why is it relevant to us as NLP researchers?

</turn>


<turn speaker="Yejin Choi" timestamp="00:39">

So the operational definition that I like to go with is that common sense is the basic level with
practical knowledge and reasoning that concerns everyday situations and events that are commonly
shared by most people. So here are the key is that common is shared by most people, not everybody.
So, for example, it's okay to keep the closet door open for a while, but it's not okay to keep the
refrigerator door open for awhile because the food inside might go bad. Most people will agree with
this, but of course there can always be some exceptional cases when this is not true. If the fridge
was actually inside of another fridge, then maybe it doesn't matter whether you keep that inside the
fridge open or not or if the fridge was empty, then again, it doesn't matter whether you keep it
open or not, if there's no food inside anyway. There always can be exceptional situations. But in
general, people do seem to have this sort of general expectation about how the world works, how the
physical world works, and as well as how the social world works. These types of knowledge is
important for humans to interact with each other in a reasonable way then interact with the physical
world in a safe way. So as AI becomes more relevant to your lives, it's important that we model
this.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:53">

And do you perceive this area and inquiry into the scientific nature of common sense reasoning or is
it more of adding an ability so that we can do the NLP tasks we care about better?

</turn>


<turn speaker="Yejin Choi" timestamp="02:04">

That's a great question. And in fact I think research about common sense, knowledge and reasoning
should be motivated in both ways. On one hand it's intellectual interest and then the other
practical significance. What I mean my intellectual interest is that, well it was the only AI dream
to build common sense models and then soon enough people realize that, Oh, that's too big of a
dream. So let's rather focus on a particular well-defined task. But even though we do see some of
these data specific models, performance, human level today, there's some fundamental differences in
the way AI operates and human intelligence works. And one of them is this knowledge about the world,
common sense, understanding about the world. For a long time it seems that the AI community has
tried to avoid this question of how do we acquire knowledge and represents knowledge and store
knowledge so that you can rely on that.

</turn>


<turn speaker="Yejin Choi" timestamp="03:02">

When reasoning about previous nuance situations, which humans are very robust at, but today's AI is
not. In terms of the practical significance, there are a lot of NLP slash AI applications that we
deliberately ignore where we don't seem to make as much progress on today. And for those problems or
applications, it's likely that we do need to seriously think about how to attack this and solve the
question of a knowledge representation, some sort of like memory representation about how the world
works. And so in the case of NLP, I would say conversational AI is one example where clearly
conversation is easier than language translation for humans. And yet it's reversed today for
machines, machines find translation is relatively easy compared to making chitchat or reasonable
dialogues with humans. So in order to really solve that sort of challenge, we do need to address
knowledge and representation about the world.

</turn>


<turn speaker="Yejin Choi" timestamp="04:04">

And then even for some of the tasks where we do feel like things are working pretty well, even
including machine translation, there are always some strange examples that people can easily find
that kind of don't make sense. And it's a case where if you had the common sense capability, then
you wouldn't have made such a mistake and these are basically the long tail problem that's really,
really long in most of the data sets evaluation scenarios, maybe they seem like relatively small
cases, but if you want to build a system that really robust against all these long tail situations,
then it's likely that we do need to still think about how to address this unsolved question about
common sense.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:47">

Yeah, that's a good point because I was thinking earlier about whither the existing tasks that
people already care about in the NLP community are sufficient for motivating work on common sense
and I think what you're seeing is they're not because even though they will benefit from it, there's
only a few handful of examples in a test set which will benefit. It's not going to be easy to
demonstrate the benefit empirically.

</turn>


<turn speaker="Yejin Choi" timestamp="05:11">

Yes, exactly. So I think it's in part to, due to the dataset design itself being a little bit narrow
for lets just say QA for example, most QA problems make rather full question or literal information
in text. In recent years though, there haven't been a lot of new research that tries to live to that
assumption and make the QA much harder, including one by Matt, and that is one other example where
you do need to really understand the task event. For example, even like Google search or other
search engine results based on the personal chat with Fernando Pereira at AKBC conference this year,
some of these search engine challenges that they're facing today are also very much common sense
challenges, so the long tail problems are always there. It's a serious practical concern for them
because there are always new problems that the training data does not cover and so for that, again,
common sense knowledge is a big concern.

</turn>


<turn speaker="Matt Gardner" timestamp="06:15">

I feel like this problem probably comes up in basically all of NLP at all levels. Even part of
speech tagging or dependency parsing. There's this very common example about "eating spaghetti with
meatballs" versus "eating spaghetti with a fork." Basically it's common sense knowledge about what a
fork is and what meatballs are that let you know how things attach correctly, right. Maybe some of
these like traditional NLP tasks are easy enough with only very shallow common sense knowledge a lot
of the time. But we could, if we wanted to talk about like a hard dependency parsing common sense
data set. Does this make sense?

</turn>


<turn speaker="Yejin Choi" timestamp="06:51">

Yeah, that would be great. In fact, I suppose I was recently thinking more about very different
types of NLP/language and vision challenges, that might require common sense knowledge more
directly, but I really liked that idea of maybe going back to these core NLP datasets and then
really dial up the portion of the challenges that do require common sense.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:18">

Just like subsets in the existing system, we could try to find those examples.

</turn>


<turn speaker="Matt Gardner" timestamp="07:23">

Yeah, I guess my thought was just that as you say this, this problem really is pervasive, like
understanding language, really understanding language requires really understanding the human
experience and all of this stuff that we call common sense. And so we should be able to see these
phenomenon across any tasks that we can think of as long as we like look for it.

</turn>


<turn speaker="Yejin Choi" timestamp="07:42">

Yeah, totally.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:43">

So could you tell us about some of the challenge data sets that you've been working on?

</turn>


<turn speaker="Yejin Choi" timestamp="07:48">

Yeah, so, a lot has happened in the past, maybe nine to 12 months, it seems, so my group has
generated about seven different data sets. I don't know what happened with my group, we all got very
excited and there were different ideas that we didn't want to give up. So they spend over things
like social IQA which is about social IQ problems, formulated as QA problems, multiple choice
problems. And then there's physical IQA data set that's social but, focusing on physical knowledge,
physical interactions. And then we had a SWAG and HellaSWAG earlier, that is sort of like a
generalization of SNLI were natural language inference data set, but focusing more on the kind of
premise of hypothesis pairs so that would require common sense inferences.

</turn>


<turn speaker="Yejin Choi" timestamp="08:45">

And then we also have yet another generalization of the NLI focusing on objective reasoning instead.
And then, we also had recently WinoGrande dataset, which is much larger version of the Winograd
schema challenge data set. And then we also had the VCR, which is a visual common sense reasoning
data set that combines images together with the QA, data set in natural language so that you have to
do both. And then finally, we have a customer QA two up here at EMNLP which is about reading
comprehension but it does require understanding common sense reasoning again. So one quick example,
maybe given a text snippet which is about someone struggling to get help wearing clothing every
morning but having to get help from someone else and the text reads like "the person is new to the
situation and really finding that experience not very pleasant."

</turn>


<turn speaker="Yejin Choi" timestamp="09:43">

When you read that sort of context. Most people can understand the person may have acquired the new
physical circumstances that requires getting help, there may be a physical disability so people can
make a reasonable guess that maybe the author has a physical disability that the person has recently
acquired. And so current QA systems rely on finding text snippet that happened in the context
whereas these sort of QA problems require actually reasoning about something that's not in the text
context.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:18">

So the answers, the choices that you get in the question are not necessarily snippets in the text
then, in that program?

</turn>


<turn speaker="Yejin Choi" timestamp="10:21">

Yes and no. So still formulated that as multiple choice questions so that it's easy to evaluate. We
also report model performance in a general setting. Meaning what if the model has to just answer by
generating the answer instead of choosing one of the four or five choices. So, in this setting of
course the evaluation is much harder, but it is still more realistic framing of the problem that I
wish the community works on. So we report both ways.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:54">

That's great. So are there other datasets?

</turn>


<turn speaker="Yejin Choi" timestamp="10:55">

So right, so those are, what we did but there are a lot of other really exciting datasets that came
out at the same time. So of course common sense QA data set by Alon Talmor and other coauthors that
received the best resource paper at NAACL this year. So that's really very exciting. And then
there's also a really interesting data set known as Record that became officially part of the super
guru and this is also based on reading comprehension and in their case the answer is always entity
mentioned in the context. So the setting is a little bit different from ours. That's also quite
interesting and that dataset by the way is almost automatically generated and then validated by
humans whereas ours was crowd source by and large. And then all there than that, there were other
datasets like ordinal Common-sense Inference Dataset by John Hopkins, which was published in 2017 so
just only two years ago. But it seems that the past one year or two we've started to see a lot more
data sets. I think I noticed some at EMNLP this year too, we find it more.

</turn>


<turn speaker="Matt Gardner" timestamp="12:08">

So when you're thinking about building these datasets, the space of possibilities seems vast. How do
you decide what to do? Do you have some kind of categorization of what kinds of things you might
want to build a data set around? How do you think about this?

</turn>


<turn speaker="Yejin Choi" timestamp="12:22">

So that's really great question. And I don't think personally that too, we have really nailed it
down data ets yet despite the fact that as a community we suddenly have a lot more new data sets.
But the way that we thought about our design was to start with existing QA problems or existing
natural language inference datasets and then think about whether we can generalize those to common-
sense reasoning cases. So for example, if VCR is in a way a generalization of VQA and then
customers, QA maybe a generalization of squad dataset or other types of machine reading
comprehension datasets. And then SWAG, HelaSWAG or deductive NLI can be viewed as a generalization
of NLI. So that's one way to do that. But there may be other ways to do that. And even when we build
on existing core NLP problems, we might realize that we really needed to make a different design
choices.

</turn>


<turn speaker="Yejin Choi" timestamp="13:24">

So I feel like I'm only beginning with understanding of other datasets this year after new
experience of making a bunch of them. And I hope that as a community we can make better data sets
one four and we definitely to need better data sets to facilitate really good research. And then
another really interesting phenomenon that I personally experienced that I see others also
experience is as soon as you make a data set, it's a softer by the largest, in neural network that
didn't really existed before the dataset making. But you know, it comes out just after. So it's
interesting to question whether that's because these neural networks have really acquired common-
sense knowledge and reasoning capabilities or is it because the data set, had had a biases and then
we didn't know that there was too as a result, we will also have to research more about data set
biases, how we automatically remove them and then how to acquire a better problem question answer
pairs.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:26">

Well that brings me to the next question I have in mind, just to play the devil's advocate here with
so much energy and efforts focus on building common-sense data sets. I wonder if we actually need to
explicitly model common-sense. Maybe if we just structure our model in the right way and train on
large data sets and pre-train on conceptualized representations. Maybe we don't need to explicitly
model common-sense anymore and our models will still learn those associations.

</turn>


<turn speaker="Yejin Choi" timestamp="14:54">

Yeah, so that's really a good philosophical question for which probably nobody really has a definite
answer yet, but my position this year is that we do need some combination of both in the following
sense in the past, in all the AI era like 70''s and 80s is when people used to think that we need to
write down everything so explicitly and that reasoning has to happen explicit as well, so for
example, all the research, and it was based on logics and then script logic and there was one which
was based on recent programs are the case when all the knowledge is very, very precise and explicit
and then reasoning builds on top of that. But after decades of research as a community, it seems to
be the case that these sort of super explicit approaches are fairly brutal and it's a little bit
hard to generalize out of it.

</turn>


<turn speaker="Yejin Choi" timestamp="15:51">

And then you have this burden of having to write down every single piece of knowledge. If you think
about how humans operate though, we never really write that much. We do write down a lot, but we
don't write down everything. And yet we can reason about knowledge. Like if I ask you a question;
"Are elephants bigger than butterflies." Even if you didn't write that down before you still can
think about it and then answer it correctly. So I do think that in this new era of larger scale
neural network models are amazing. Probably, the best bet is to build on top of that, which also
means that we do want to have this sort of knowledge implicit to some degree. But then the purist
might, you know, wish that, Oh, these neural network can just learn from unstructured text and
images and then acquire knowledge all just on it's own through unsupervised learning words, self
supervised learning at best.

</turn>


<turn speaker="Yejin Choi" timestamp="16:47">

It might seem like a supervised learning is sort of not as elegant, or not as principally to some
degree. But one way to think about hybrid between explicit and implicit primarily for practical
reasons that the larger scale neural networks, I don't think it's able to learn everything. They're
able to learn a good amount of patterns in language, but it's hard to generalize out of it to answer
questions like whither elephants are bigger than butterflies unless someone actually said so. People
did say so by the way, on that particular pair of texts, you will find the correct answer. But if I
come up with a new pair then it may not work. I think it's good to have some amount of explicit
knowledge that's written, in order to educate or provide as a training data for neural networks so
it's almost like how humans also learn about the world.

</turn>


<turn speaker="Yejin Choi" timestamp="17:42">

It's not the case that we only passively observe the world and then somehow, or just like read a lot
of texts, then acquire knowledge. We also learn language by taking classes and we also learn about
new knowledge, like deep learning lets say no sometimes we take tutorials. And those are the
examples of declarative knowledge for me that's different from observed knowledge. So it's good to
provide the declarative knowledge to neural networks as well as some sort of like textbook of
common-sense. And then the hope is that neural network can then learn to generalize out of it. So we
have found such initial results that we published an ACL this year that we named as Comet. So Comet
is a neural network based on transformers that were declarative knowledge included in autonomy,
which is yet another work that we had earlier this year at AAAI.

</turn>


<turn speaker="Yejin Choi" timestamp="18:36">

And that's a knowledge graph on common-sense. And it turns out by doing so this neural
representation of common-sense graph generalize much better than what you would have imagined based,
on just knowledge graph retrieval, more like a symbolical representation of a knowledge graph, so in
that sense it's a nice combination between explicit and implicit. It starts with explicit knowledge
that skiing used as a training data essentially for neural network. So the neural network can
translate that explicit knowledge into influence at neural space and then in this space it can also
generalize it better. And then even do the transfer learning from language models to knowledge
models?

</turn>


<turn speaker="Waleed Ammar" timestamp="19:16">

Yeah. Although in this particular case the task it's self is design can capture the degree to which
you have common-sense. So I wouldn't say it's a very fair experiments to judge that with the need
for explicit modeling. I'd be very curious to know if there are results that show how fast network
design without common-sense in mind benefited or did not benefit from adding some symbolic
representation of common sense in the model.

</turn>


<turn speaker="Yejin Choi" timestamp="19:45">

Right. So that would be definitely one of the important next steps. In fact, there have been some
research about this nature always in the past as well. So I think more depends on for example, had
these concepts in their base knowledge integration in order to improve the performance of narrative
QA. And if I remember right, it may have been last year in an NLP paper of course you know this sort
of like SOTA always gets updated and then maybe the story is a little bit different with Roberta,

</turn>


<turn speaker="Waleed Ammar" timestamp="20:14">

Yeah.

</turn>


<turn speaker="Yejin Choi" timestamp="20:14">

We still do not know how to best integrate knowledge representation down to some neural network for
a particular target task. Whatever we did in the past are reasonable first steps, but I don't think
those are definitely the best options and that integration sorta depends on how we even model
knowledge in the first place.

</turn>


<turn speaker="Yejin Choi" timestamp="20:37">

And a lot of the previous work has this flavor of retrieving knowledge from knowledge graph and then
go from there. But it might be that we should rather focus on neural representation of knowledge and
then try to integrate that. And in some sense when we start to seeing some promises into that
direction to work like Coment versus AI2 that integrates knowledge into language models. I'm hoping
that that sort of direction like to have some promise down the road, but it's a little too early to
say whether how exactly we have to do it and then whether it's completely possible or impossible. I
do have some unpublished results that seem to suggested that sort of knowledge integration doesn't
help them for some demonstrated tasks.

</turn>


<turn speaker="Waleed Ammar" timestamp="21:23">

You mentioned atomic passing, but I think it deserves more of a discussion because I feel like it's
a very valuable resource when it comes to using common-sense reasoning. So can you elaborate a
little bit on what atomic is?

</turn>


<turn speaker="Yejin Choi" timestamp="21:36">

Right? So Atomic is knowledge graph described in natural language that includes 900 thousands of
if/then rules all in natural language. Those rules focus on by and large social situations that
involve people doing some actions to each other. So for example, if person X repels the person Y's
attack, what are the intense, person X and person Y what kind of actions might people do before and
after. So the knowledge covers a lot of causes and effects, pre-conditions and post-conditions. Sort
of like a theory of mind of people, what kind of actions do they do before after,that's sort of a
stuff. To our surprise, even though there haven't been a lot of other knowledge resources built
before, such as concepts psych and open psych, a lot of these existing resources focused rather on
taxonomic acknowledges instead of if/then reasoning models that focus more on causes and effects so
due to the necessity of wanting to have this if/then knowledge revealed to that resource you've
other existing resources covered those you would have not needed to do that.

</turn>


<turn speaker="Yejin Choi" timestamp="22:53">

There are two interesting aspects of this. One is that everything is included in language, natural
language. Instead of trying to come up with list of programs or some sort of like a prologue or some
of the logical representation of such knowledge because the complexity of the knowledge that we
cover are really difficult to translate down to logical forms. Everything is in natural language and
that way it's much easier to crowd source that knowledge without relying on experts who understand
these logical forms. Another aspect of it is that in some sense we translate or shifts more of this
reasoning down to knowledge. So in some sense some of these like if/then reasoning can be almost
memorized knowledge that's reactive and you don't necessarily think so hard to draw any of these
inference but it's almost like we know them so well enough so we just reason about them,

</turn>


<turn speaker="Yejin Choi" timestamp="23:51">

It's sort of like type one type two type reasoning and we are looking at shifting some of this
reasoning into the knowledge space and then trying to see what we can do with it.

</turn>


<turn speaker="New Speaker" timestamp="24:05">

Yeah. What I find most exciting about atomic is that it captures events that are not typically
discussed in text so I remember on your talks before you talk about how the reporting bias would
influence what kind of knowledge we represent our dataset for sources. In this particular piece, you
made sure that you're not recapturing what people already talk about texts because people typically
don't talk about the common-sense reasoning, it's just not news worthy. So I feel like that's,
that's very valuable.

</turn>


<turn speaker="Yejin Choi" timestamp="24:36">

Yeah. So it's exactly that. Due to reporting bias, it's really hard to learn, acquire this sort of
knowledge entirely automatically from unstructured texts, no matter how much text the model may be
able to read. So it doesn't have to have more explicit description of such knowledge. The nice thing
about neural network is that then you can generalize the now the declarative knowledge together with
language model parents so you can then reason about previously unseen events quite reasonably well.
So that was really exciting for us that that Atomic knowledge is written in a particular weird form,
like a person X does something to person Y and then the events are not very complex. They're very
usually short sentences. But the Comet model builds on top of that can reason about much longer
events that include people's names. You can handle much more computational phrases reliably and
oftentimes can make correct predictions about such computational cases beyond our expectations. So
that's really demonstrating the strength of today's neural language models that are just so powerful
in generalizing over, you know, many different previous events in sequence of words and phrases.

</turn>


<turn speaker="Waleed Ammar" timestamp="25:57">

Yeah. I'm wondering, uh, if you needed to do any model customization to enable this kind of transfer
because the language is different. You have X's and Y's and you're in Atomic. So how do you?

</turn>


<turn speaker="Yejin Choi" timestamp="26:10">

So we didn't do very much for that particular paper, but I suspect that one can do probably much
better with more experiments. But the simple thing we did was we started from GPT-2, pre-trained
GPT-2 and then converted atomic knowledge graph into just textual encoding. That's just long
sequence of, some special symbols with some atomic if/then events. And that was just enough for the
results in final Comet model, to be able to generalize Atomic for just natural language descriptions
of events. So we have this online demo that's linked from either my home page or also theres a link
from AI-2 that you can play with and see what happens.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:01">

Great, so what are some of the interesting research questions in common-sense reasoning today you
think people should be working on?

</turn>


<turn speaker="Yejin Choi" timestamp="27:08">

Like we discussed earlier having better data sets, better challenge datasets I think is likely to be
the ongoing input time to research a question and then I wish to see knowledge modeling being a
thing, not just language model but really focusing on knowledge models. It seems almost strange to
me that AI can be on national intelligence without knowing how to store represents knowledge and
then be able to really reason based on that. Today a lot of this learning paradigm is trained under
this input/output pairs a lot of input/output pairs. For particular target task when it's trained as
supervised tasks. Although language model or pre-trained models in general are powerful to enable,
supervised learning down the road.

</turn>


<turn speaker="Yejin Choi" timestamp="28:00">

The thing is language model on their own don't do really well in a zero shot setting. It's almost
useless for most of these QA problems. Reasoning challenges unless you have a lot of in domain
training data. Ideally I would like to really see a zero shot reasoning in order to really, really,
really challenge AI. But even before going there, it would be nice to think about how to really
improve the quality of knowledge that we have today. Even though Atomic is fairly large, it's still
covering only particular narrow slice of common-sense knowledge and reasoning that humans are able
to do and we do need to think about how can we make, I would have them so they can acquire knowledge
or medical aid, ideally from unstructured text or be able to interact with humans to acquire new
declarative knowledge that it's lacking, and then also how do we then integrate that knowledge to
neural networks in a more efficient way. So multiple really hard challenges that we need to
investigate.

</turn>


<turn speaker="Matt Gardner" timestamp="29:04">

Yeah. On along the lines of one of those things that you said for Atomic for instance, you said as a
very small slice of common-sense, are there any theories of common-sense that we could build off of?
Do you know of any?

</turn>


<turn speaker="Yejin Choi" timestamp="29:17">

So like i'm a little hesitant here because I, so I know that there's this some AI sub community that
has focused on common-sense knowledge and reasoning for a long time and they're still working on
that. But maybe we didn't talk about it as much because their methods are based more on logic and
it's not clear today how to translate that research to some down stream task performances. It's
really, really hard challenge and I don't think anybody knows how to do it. So I think there are
some theories around there. It's just that always translating that to some actionable items for
actually building systems and models seems to be a major challenge. So basically I don't really have
a good answer for that. That's a really good question to perhaps think more about as a community,

</turn>


<turn speaker="Matt Gardner" timestamp="30:11">

More than just theories of how we reason with common-sense. Just even what is common sense. There
are a lot of linguistic theories about what is language, what are the phenomena in language. We use
these to build particular tasks. Like, I wonder if there's some kind of theory of what is common-
sense that we can then build datasets around and so on.

</turn>


<turn speaker="Yejin Choi" timestamp="30:30">

I think there's some more maybe to be learned from developmental psychology and literature where
they do study how babies, when and how babies acquire different types of common-sense, understanding
about the world like object permanence the fact that objects that are temporarily hidden under a
hat, the fact that it's still there, you see something that they are not born with but they acquire
maybe during the first year, I believe maybe after eight months or so. I'm probably quoting a wrong
number here, but something like that. So, and the animals similarly acquire some of these physical
common-sense knowledge as well. And then there's this notion that the time that seems to happen at
different time frame learning time frame and then there's this notion of numbers, which seem very
distinct in the way that humans learn about the world. And then theory of mind does not come right
away. So you know, babies cannot really understand the parents until they reach a certain age so it
seems that we might be able to look at this literature and at least to learn what kind of different
knowledge and reasoning we do need to cover eventually.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:42">

When you mentioned trying to do more of a knowledge modeling instead of just language modeling. The
question that comes to my mind immediately is which knowledge presentation do you want us model,
right. There is Atomic, there is other things that we could be modeling and it's not clear that any
other is natural or not. The nice thing natural language is that it occurs frequently enough that we
can trust its use for representation it's hard to argue the same for any particular knowledge
acquisition.

</turn>


<turn speaker="Yejin Choi" timestamp="32:09">

Sure. Yeah. So in that sense we probably should be super open minded about how that knowledge should
look and I have zero intent to say. Atomic is the way to go at all like for that kind of knowledge
representation. I think it maybe more that things can be more directly in the neural space. But the
thing is currently, we don't see that kind of knowledge acquisition is some sort of first goal or
direct goal in learning. A lot of this learning today is framed as task specific learning and
language model in the one might argue well that's different because it's a self supervision by
predicting words before and after, but still the goal is not really acquire knowledge abstract away
concepts in that somehow reason about that, store that in some mental space at all yet.

</turn>


<turn speaker="Yejin Choi" timestamp="33:02">

It seems that certainly that's how humans acquire their understanding all about the world and maybe
we need the different learning entirely different learning paradigm where the goal of learning for
machine is not particularly about a particular target task but really more about just making sense
of the world and building these concepts and being able to abstract away objects and concepts own.

</turn>


<turn speaker="Waleed Ammar" timestamp="33:26">

Wonderful. Do you think this is the future of this area or if you look still like things that
wouldn't happen or you will be working on further?

</turn>


<turn speaker="Yejin Choi" timestamp="33:36">

I definitely see that as a community there are increasing research interest in common-sense, which
is very exciting to me and in part that I was really surprised to see DARPA program which in common-
sense and the nice thing about that is these days we consider voice comment on our phones as a
given, you know, of course it should work but in early 2000 it was considered to be a crazy
technology to dream about. But DARPA had this program, I think it was called the Karalow that
started in 2003 and then Siri was some sort of spin-off project out of that program which was then
acquired by Apple in 2007 and then got commercialize in three years. So this is some time like, and
of course maybe a voice recognition assistant is something that people have worked on more before,
but with sometimes certain things can happen. Who knows? These days who knows, the field is
advancing so fast with neural networks, so maybe we can still hope that we did some reasonable
future. We can see alot of progress in the field with the support of DARPA.

</turn>


<turn speaker="Yejin Choi" timestamp="34:51">

And then even at, EMNLP this year, I see suddenly more papers with common-sense in the titles. I
think I noticed nine papers among the accepted papers in EMNLP this year, and that's only the title.
Who knows? There may be other papers that touch on common-sense.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:09">

Yeah, I bet you are reviewing some of these.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:09">

Great, so that's exciting. And also lots of funding for research for grad students, so that's great.
Were there anything that you were hoping or you would like to talk about, which we didn't cover in?

</turn>


<turn speaker="Yejin Choi" timestamp="35:25">

That might be all.

</turn>


<turn speaker="Waleed Ammar" timestamp="35:29">

Thank you for the discussion.

</turn>


<turn speaker="Yejin Choi" timestamp="35:29">

It was fun, thank you.

</turn>
