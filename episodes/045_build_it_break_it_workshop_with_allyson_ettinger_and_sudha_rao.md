---
title: "Build It Break It Workshop, with Allyson Ettinger and Sudha Rao"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Allyson Ettinger","Sudha Rao"]
number: "045"
tags: []
description: "How robust is your NLP system? High numbers on common datasets can be misleading, as most systems are easily fooled by small modifications that would not be hard for humans to understand. Allyson Ettinger, Sudha Rao, Hal Daumé III, and Emily Bender organized a workshop trying to characterize this issue, inviting participants to either build robust systems, or try to break them with targeted examples. Allyson and Sudha come on the podcast to talk about the workshop. We cover the motivation of the workshop, what a \"minimal pair\" is, what tasks the workshop focused on and why, and what the main takeaways of the workshop were. https://www.semanticscholar.org/paper/Towards-Linguistically-Generalizable-NLP-Systems-A-Ettinger-Rao/8472e999f723a9ccaffc6089b7be1865d8a1b863"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F377859797&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:11">

All right. Today for our episode, we have as guests with us, Allyson Ettinger and Sudha Rao who are
PhD students at the University of Maryland, College Park. Sudha works with Hal Daume and Allyson
works with Colin Phillips and Philip Resnick. Welcome to the podcast.

</turn>


<turn speaker="Allyson Ettinger" timestamp="00:29">

I thank you.

</turn>


<turn speaker="Matt Gardner" timestamp="00:30">

Today we'll be talking about a workshop that they co-organized with Hal and Emily Bender and it was
titled towards ling, or at least the paper that they wrote is titled Towards Linguistically
Generalizable NLP systems: A Workshop and Shared Task. So can you tell us about what the motivation
is for this workshop that you organized?

</turn>


<turn speaker="Allyson Ettinger" timestamp="00:49">

Yeah. So the idea here, this grew out of a panel discussion at ACL last year. And what came up in
that panel discussion among these discussions was that while NLP systems are very strong on the
evaluation metrics that we have available to us everyone basically recognizes that they're also very
brittle, much more brittle than say a human language speaker. And that if we were to put in a little
bit of effort to create an adversarial example, we would easily be able to break these systems that
are very strong in the metrics that are standard. So out this grew the idea to actually do a shared
task where we engage with NLP researchers and linguists or anyone else who's interested in creating
adversarial examples and see what we can actually learn by creating these types of examples that
will break systems and actually tell us about where those limitations are in the systems that are
the source of this brittleness.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:48">

And what kind of problems were you interested in looking at for this? Cause it seems to me that
maybe the kind of mistakes your models would be doing are different depending on the task.

</turn>


<turn speaker="Sudha Rao" timestamp="02:01">

So we considered a few bit of tasks like the usual NLP tasks like machine translation. But the
problem with those are the models right now themselves are very brittle already. Their scores are
really low in machine translation except for the well-known languages they don't perform quite well
to want it to pick a task which is known to do well and try to see if it can break that particular
task. So that's why one of the things we chose was sentiment analysis because it's a fairly easy
task and getting high score on some datasets for those tasks was much easier than the machine
translation.

</turn>


<turn speaker="Matt Gardner" timestamp="02:49">

So why do you think the systems are so brittle? Is it because of some problem with our training data
or what, what's the cause of this?

</turn>


<turn speaker="Allyson Ettinger" timestamp="02:58">

Yeah, that's a great question. And I think that there is not going to be any single source. I think
there's going to be a number of sources in the end. But one of the goals of this workshop was
exactly to try to get a more precise sense of what the sources of that brittleness exactly are. So I
think that absolutely it could be a matter of training data it can be a matter of, you know, system
architectures and evaluation metrics that tell us that systems are doing well. I think it's really a
combination of things. And yeah, the goal here is to try to zero in on certain aspects of what those
problems are.

</turn>


<turn speaker="Matt Gardner" timestamp="03:40">

In your paper describing this you mentioned that maybe this is a problem with a traditional
independent and identically distributed model of training these systems. Can you describe what you
mean by that?

</turn>


<turn speaker="Allyson Ettinger" timestamp="03:55">

Yeah. That comment in the paper wasn't exactly meant to pick on the ID assumption per se. So much as
to point out that the standard approach that's taken in applying machine learning to NLP results in
systems that do very well in certain conditions and don't generalize necessarily to other
conditions. And certainly don't generalize as well as humans are able to with data that they may not
yet have been exposed to. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="04:24">

And so if we can then come up with some good set of training examples that really teach systems to
handle rare, what a person might consider rare, unusual linguistic phenomenon with this solve our
problems.

</turn>


<turn speaker="Sudha Rao" timestamp="04:38">

I think to a certain extent it would be, but the caveat there is that is very hard to identify. Like
how would you identify what are the red pieces unless you actually look at the data and try to
segregate them to be there and I'm frequently occurring, so the issue is naturally occurring data
has this distribution of a long tail and we want to tackle that that problem by sort of doing
something on the model side because we cannot do a lot of thing on the data side.

</turn>


<turn speaker="Matt Gardner" timestamp="05:18">

So for listeners who may not have read this paper or thought too much about this problem, can you
give a quick example of like something in say, sentiment analysis, the test you're looking at where
a system might be particularly brittle or susceptible to like some crazy linguistic problem?

</turn>


<turn speaker="Allyson Ettinger" timestamp="05:34">

Yeah, we can take a look at specifically the example that we gave in the paper for sentiment
analysis. We have a positive sentiment example of "I love this movie" and then we have another
positive sentiment example, which has been slightly changed, which is "I'm mad for this movie,"
which we anticipate may throw systems off in that mad maybe a lexical item that's associated with
negative sentiment.

</turn>


<turn speaker="Matt Gardner" timestamp="05:57">

Great. So I guess this brings us then to your workshop, right? The point was to try to characterize
some of these issues. So can you tell us more about what the workshop was actually like what you
did?

</turn>


<turn speaker="Sudha Rao" timestamp="06:11">

In the workshop it was actually inspired by a workshop in programming language land or software
security land called Build it, Break it. That idea is you have two sets of participants, you have
builders and breakers. The builders would build systems and the breakers would try to come up with
test cases that would break the system. So inspired by that idea one of our authors my adviser Hal
suggested that, why don't we do a language edition of it? So we call out a shared task Build it,
Break It: The Language Edition. But the idea is, again, we have two sets of participants, builders
would build systems for a specific NLP task and the breakers would come up with test cases that
could potentially break that particular NLP system.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:58">

So in a real life scenario, there might be actually like more iterations of this right. Someone
builds a system and a bunch of people try to break it and then the other person tries to improve
their system. But in the workshop you focused on one iteration of this is that right?

</turn>


<turn speaker="Sudha Rao" timestamp="07:16">

Yes, exactly. So in the programming language for chatbots, the idea was build it, break it, fix it.
So there was a third phase in which the builders would come back and look at the cases that broke
their system and rebuild their system to fix it. But yes, as you pointed out, we only focused on the
first part of the thing of just building and breaking. Because rebuilding this system to fix it. It
is not trivial. It cannot be done in like a few days time or a few weeks time. It would probably
take another year or so. So that's why we focused only on the first aspect of it.

</turn>


<turn speaker="Matt Gardner" timestamp="07:57">

And NLP is a really broad field and there are a whole lot of different things you could look at this
in. So how did you pick which tasks to focus on?

</turn>


<turn speaker="Allyson Ettinger" timestamp="08:06">

Yeah, so we had a couple of considerations in selecting the tasks. One of the important things for
us was that we wanted these tasks to be ones that really got at more or less core fundamental
language comprehension and would require systems to do a fair amount of deep processing in order to
do the task. Well, this is one of the most important goals to allow the breakers to target
interesting aspects of natural language processing. Another logistical constraint though is wanting
to make sure that there are enough people who will participate in the task and submit systems and
submit breaking examples you know, to get traction. And finally, as Sudha mentioned a few minutes
ago, another consideration was that it's helpful to make the point if we believe that this is a task
on which we're doing well currently. So the two latter considerations were the primary
considerations and using sentiment. There are a lot of sentiment systems out there. There was low
barrier to participation and it's a task that we do fairly well on a standard metrics. And then the
QA-SRL, the symmetric role labeling based on question answering task was more driven by the first
consideration of wanting to have something to get these deeper levels of processing.

</turn>


<turn speaker="Matt Gardner" timestamp="09:35">

Right, predicate argument structure is pretty core and easy to mess up.

</turn>


<turn speaker="Allyson Ettinger" timestamp="09:39">

Right.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:41">

And it's clear that based on the participation level for the first task, it's clear that the
concentration of making sure there's no barrier to entry was an important one. So I'm glad you did
that.

</turn>


<turn speaker="Allyson Ettinger" timestamp="09:55">

Yeah, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="09:56">

Were there any other tasks you thought about?

</turn>


<turn speaker="Allyson Ettinger" timestamp="09:59">

Yeah, there were several. I can't remember exactly what they were.

</turn>


<turn speaker="Sudha Rao" timestamp="10:02">

Yeah, we considered I think textual entailment task, we considered machine translation. We, didn't
think of reading comprehension-based task, that is something that now that we think back could be
something that we could do for our next examination. Since there are already people thinking about
coming up with adversity cases for that particular example. But for that task. So the reasons we
sort of filtered out some of the other tasks out was basically from the aspect of, as I told before,
whether we think that there is an existing system that does really well that we could try to break.

</turn>


<turn speaker="Matt Gardner" timestamp="10:48">

Yeah, I guess the way that QA-SRL is formulated. It's essentially the same task as what people are
calling reading comprehension today. So

</turn>


<turn speaker="Allyson Ettinger" timestamp="10:58">

Yeah, definitely a lot of overlap. Right.

</turn>


<turn speaker="Matt Gardner" timestamp="11:01">

Interesting. Also when you said entailment that made me think of so we a couple of months ago
released this library Allen NLP with a demo of reference implementations of some models including a
popular entailing model and people promptly tore it apart. So I sympathize with the motivation of
this workshop.

</turn>


<turn speaker="Allyson Ettinger" timestamp="11:22">

Yeah, yeah, absolutely. And I think that there's a certain factor there where people just want to,
you know, break systems for fun. But I think there's also a sense in which people see systems
submitted that supposedly are doing well and they feel that there is an underlying brittleness that
isn't being exposed with the standard metrics or whatever examples are being given. And so the idea
there is really, I think for some people very similar to the motivation of the workshop where they
say, well, I suspect that this system is not going to be able to handle this type of thing. I think
that it's probably relying on this type of puristic rather than deep processing. And based on that
reasoning, I think it's not gonna be able to handle this example and they'll submit examples of that
kind.

</turn>


<turn speaker="Matt Gardner" timestamp="12:08">

Yeah. Yeah, I totally agree. The, reason that I really like the demos of reference implementations
that we're working on, it's the exact same motivation for what you're doing. It's so that we can
find where these systems break and give the researcher an easy way to interact with the system and
figure out where it breaks and how to improve it. So yes, I definitely agree.

</turn>


<turn speaker="Matt Gardner" timestamp="12:31">

So I guess the next thing to talk about is who participated and what, like what was the outcome of
this workshop?

</turn>


<turn speaker="Sudha Rao" timestamp="12:40">

So we had two tasks, the sentiment analysis and the QA-SRL for the sentiment analysis. We got three
systems participate in the building side. And in the breaking side we had four teams participate. On
the builder side, we had three outside participation. And in addition to that, we also submitted
three of our own systems. Which by own, I mean that we picked up some existing models that is known
to do well on these tasks and be, sort of got their implementation and implemented those and tested
these against the breaker teams. So we had six teams in all from the building side. And four
external breaker teams participate the breaking side,

</turn>


<turn speaker="Waleed Ammar" timestamp="13:29">

Are there any quantitative differences that you can mention about between the six systems?

</turn>


<turn speaker="Allyson Ettinger" timestamp="13:36">

Yeah, so there was a variety of systems. We had one submitted that was just ngram-based. We had some
convolutional neural network systems. In fact, that system was both a builder and a breaker system,
which is interesting. And then our one created by one of our organizers was Bag-of-ngram. And we had
the Recursive Neural Tensor Network. There was actually quite a lot in terms of qualitative
differences between the systems. We spaned a fairly large variety,

</turn>


<turn speaker="Matt Gardner" timestamp="14:13">

But it sounds like none of these were purpose built to try to tackle any kind of like robustness to
language. It was just the typical, like all of these sound like things that would just read in any
typical conference paper. Right. Nothing was purpose built for this workshop.

</turn>


<turn speaker="Allyson Ettinger" timestamp="14:29">

A couple of them were specifically built for this workshop. The the first ngram one that I mentioned
was though it was built as a straw man model. The, CNN model from University of Melbourne was
specifically built for this workshop.

</turn>


<turn speaker="Matt Gardner" timestamp="14:45">

Yeah, yeah. Sorry. I didn't mean like they wrote like, say new code or new implementation of
something. It's just like these are all standard kinds of models and nothing that thinks
particularly hard about generalization to, or robustness to linguistic phenomenon. Right?

</turn>


<turn speaker="Allyson Ettinger" timestamp="14:59">

Yeah, yeah. To the extent that standard models don't necessarily give thought yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="15:05">

Okay.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:06">

All right, and the breakers?

</turn>


<turn speaker="Sudha Rao" timestamp="15:08">

So the breakers we had four teams and three of them were focused on coming up with test cases that
are manually chosen. So they targeted some linguistic phenomena and then modified the examples, so
for listener, the breakers were supposed to come up with test cases where the following: they were
given a sentence, they were given a bunch of sentences and they were to pick a sentence from that
and minimally modify it to create a pair of the original and modified sentence. And that would be
the test case that they would submit. So the way most teams or three out of four, created the test
cases whereby manually modifying the original sentence to get the minimal pair. One team
interestingly did this automatically by building a model to create these modified pairs to the
original sentence.

</turn>


<turn speaker="Matt Gardner" timestamp="16:12">

So I'm curious, how do you make sure that the examples of the automatically generated, I guess even
the manually generated ones are correct because they might be like gaming the system and gaming the
workshop right, by providing our own label for it.

</turn>


<turn speaker="Allyson Ettinger" timestamp="16:31">

Yeah. This is a definitely a legitimate concern and was one that we did not pay a lot of attention
to in this iteration. We, in the discussion section of the paper, we point this specifically out as
something that we would like to constrain more in the next iteration. In terms of the fact that we
gave a lot of leeway to breakers in terms of labeling examples and exactly how they interpreted the
definition of minimal pair, you know, making a minimal change to a sentence. So yeah, absolutely. In
order to have sort of a greater level of control over that and preventing people from gaming the
system in the way that you just described, that's definitely something that is on our radar now.

</turn>


<turn speaker="Matt Gardner" timestamp="17:09">

So I know that I talked like I took a bunch of linguistics classes and in college and grad school
though my degree is not in linguistics, so I've been exposed to this idea of minimal pair quite a
bit. But I imagine a lot of our listeners haven't. Could you describe what this is and why you chose
to use minimal pairs for your breakers?

</turn>


<turn speaker="Allyson Ettinger" timestamp="17:29">

Yeah. So the concept of minimal pair in linguistics and the concept of minimal pair that we were
employing here is questionably equivalent. But for the sake of defining both; minimal pair in
linguistics, we use this to identify things that create meaningful changes in language. So for
instance, we know that bat and cat are different words and likewise that /b/ and /k/ are different,
meaningfully different sounds, right? So this is from the linguistics perspective, how we often
think about minimal pairs from our perspective. There's a lot of overlap in terms of the motivation
there. But there's a slightly different aspect to what we were doing in that. The point here was
that we wanted to zero in on limitations of the systems. So something that we haven't mentioned yet
is this more specific goal in using those minimal pairs. And the goals that we gave to the breakers
was that we wanted them, first of all, to make a change such that one item in the pair the system
would make a successful prediction on and one item in the pair of the system would make an
unsuccessful prediction on so that we actually identify a boundary in the system.

</turn>


<turn speaker="Allyson Ettinger" timestamp="18:48">

And the other goal is that the change would be small enough and targeted enough that when we see the
system go from being able to make a correct prediction to being unable to make a correct prediction,
we're actually able to identify what about the change caused that failure, the change in the success
of the system. So in trying to identifing minimal pairs here, we are more focused on that and
saying, your goal in making this minimal change should be to make it so the system will no longer
succeed or it can also go the other direction. Make it so the system will succeed on an example that
it previously was not succeeding on but we want this change. We want you to know, preferably what
you will conclude about the system based on that change in performance across those two examples.

</turn>


<turn speaker="Allyson Ettinger" timestamp="19:38">

So we had a lot of discussion about exactly how we should define minimal pairs. You know, what sorts
of things that are permissible. Certainly changing one word, but can you change order? And it became
very difficult to constrain this and define this in a very concrete way because we didn't
necessarily want to limit people in a way that would prevent them from identifying interesting
phenomena, but also having a complete lack of constraint results in potentially having examples that
that really don't get at what we have in mind. So, yeah, our definition of minimal pair for the
purpose of this workshop was really based in the goal of creating breaking examples that would help
us to identify limitations.

</turn>


<turn speaker="Matt Gardner" timestamp="20:22">

Yeah, that's a really great articulation of that. And it drives Waleed's point a little bit. I think
that, I guess people in the ML community are thinking a lot about generative adversarial networks
and adversarial examples. And how can we break systems automatically? The problem with that though
from your workshops perspective is that it doesn't give us any insight into why, right?

</turn>


<turn speaker="Allyson Ettinger" timestamp="20:42">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="20:44">

Interesting. So what was the result, how did these workshops, how did these participants do?

</turn>


<turn speaker="Allyson Ettinger" timestamp="20:52">

We had a couple of levels of analysis. First we just had in aggregate, you know, how we had some
scores that allowed us to say which teams did the best so to speak. And what we found as general
trends with the breakers in particular was that the manual examples were much more successful in
breaking the systems overall than were the automatically generated examples.

</turn>


<turn speaker="Matt Gardner" timestamp="21:16">

That's actually surprising because at least thinking about like adversarial example is in like CNNs
whatever where you like can just change a single pixel value. And all of like, all you have to do is
given a gradient. Like you can optimize your, input to make the system fail. It seems like it would
be trivial for a system to learn to make these other learned systems fail using these automatic
methods. Why, why do you think that the manual systems actually worked better?

</turn>


<turn speaker="Sudha Rao" timestamp="21:44">

So I think for the, what you just mentioned was for vision task, for the language task, this minimal
change itself is difficult because in the language world things are discreet, that is in the vision
world, things are more contiguous. So in discreet form it's hard to define. If I change a word
minimally, what is the next word that will come through? It's very difficult to identify this amount
of minimal change. And that's why it's more difficult also for these generative adversarial networks
to sort of assure they work well for the language task. So I think that's the difficulty. And as you
pointed out there have been some previous work in which people tried to come up with these
adversarial scenarios. For example, for the reading comprehension task there was a paper in which
they sort of added a new sentence to the original passage such that now these models would
incorrectly identify the new sentence to be the answer just because there was a lot of lexical
overlap between the question and the incorrectly added sentence. But the reason I would say that
this workshop is likely different and better is because as Allyson said before, we want to not post-
hoc-ly analyze what is the thing that caused the system to break, but sort of to motivate the
adversity addition by some linguistics phenomena such that when you modify your original sentence
you know what you're intending to do when the system breaks.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:27">

So there's a bit of detail that I'm missing here. Do the breakers have access to the builder's
system, or they do not?

</turn>


<turn speaker="Sudha Rao" timestamp="23:39">

No. So the breakers don't have access to the original system. All they have access to is the
performance of the builder systems on the test set.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:50">

So you wouldn't be able to optimize your breaker like you would.

</turn>


<turn speaker="Matt Gardner" timestamp="23:54">

Okay. Yeah. That is an important difference. Yes. But you could imagine in a different kind of setup
where you actually have an interactive capabilities with the system. Maybe you'd actually get a
better intuition for what the model is doing and be better able to target these adversarial examples
both on the linguistic side and the automatic side.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:14">

Yeah, I agree. I was going to ask how many examples does a breaker have to come up with in order to
participate?

</turn>


<turn speaker="Sudha Rao" timestamp="24:30">

So we expected 5 to 100 sentences from the breaker side at least, and most systems submitted at
least 50 one system submitted hundred test cases. But this was our ideal 50 to 100 test cases.

</turn>


<turn speaker="Waleed Ammar" timestamp="24:49">

That's reasonable.

</turn>


<turn speaker="Matt Gardner" timestamp="24:51">

And I guess it is encouraging then that linguists still understand how systems break better than
systems can break systems. Right. So I guess I interrupted you a while ago on when you were telling
us about the results. So you want to continue telling us about what happened.

</turn>


<turn speaker="Allyson Ettinger" timestamp="25:07">

Sure. Yeah. So, like I said, in aggregate, we see that the manual breaker teams do outperform the
automatic breaker teams. And then we went to a couple levels of finer grained analysis working
toward the actual goal, you know, really where the power is with this workshop, which is specific
item wise breaking. Because what we're interested in is these specific phenomenon that a given
example will target. So in the paper we also have this breakdown by system and breaker team and we
do see some interesting variation. In terms of those interactions though we don't have any specific
interpretations of those as yet. But moving on to the item based results, we do have a couple of
specific examples. We pulled out some interesting ones where people changed things like specific
phrases or changing something like emotional power to emotional pain.

</turn>


<turn speaker="Allyson Ettinger" timestamp="26:12">

And when we started seeing some interesting divergences between the systems, some of which were
predictable and some of which were slightly less easy to interpret. But the examples that we pulled
out for the paper were the ones where we were able to identify in an interesting way what we think
the change is, why we think the change is causing problem for the systems and which systems were
able to handle them, which systems were not. And this kind of fine-grained analysis where we look at
an item based level is exactly type of thing that we were trying to get at with with this workshop
was to say, okay, target something specific. Now let's see if your hypothesis that it will break the
system is correct.

</turn>


<turn speaker="Matt Gardner" timestamp="26:53">

Any high level takeaways from this work? Like what did you learn from running the workshop?

</turn>


<turn speaker="Sudha Rao" timestamp="27:01">

Right. So there were a number of lessons that we learned, some things that would be useful for the
future as well. So we didn't, so for the sentiment analysis, we got a small amount of participation,
but for the QA SRL we didn't get, we had only one breaker team participate and we built our own
builder system but we didn't get any builder participation. So there's one lesson that the choice of
an NLP task is very important and in order to increase the number of participation, one sort of an
idea would be pair up with an existing shared task. So, in NLP land theres already a lot of shared
tasks out there and we can add a breaking piece to the existing shared task that would just increase
the number or participant, because there was a lot of interest amongst breakers because I think
there is a lower barrier to entry for the breakers, all they have to do is come up with test cases.

</turn>


<turn speaker="Sudha Rao" timestamp="27:52">

But for the builder systems, they have to build a system from scratch just for this task itself,
much higher value. So that was an important lesson. And the other is as we discussed before, we need
to sort of do some sort of analysis on the labels that are being assigned by the breaker teams and
also the minimal pairs that have been created by the breaker teams, to sort of ensure that these
agree to the constraints that we have put forward and the labels are correct. So what we we plan to
do the next time. It sort of has some crowdsourcing level of checking on these labels and also on
the minimal pairs that the breakers build to insure that the meet the constraints that we have for
our task. And the other thing is the notion of creating minimal pair itself was not clear and a lot
of minimal, a lot of the pairs created did not conform to this requirement of minimal pair.

</turn>


<turn speaker="Sudha Rao" timestamp="28:57">

Then some of them were variations that were much more than a certain lexical level. There were some
scrambling of the words and so on. So we want to restrain on those kinds of high variations in
creating the minimal pair. And another interesting thing to try would be to whether we should allow
the breakers to come up with there minimal pairs on their own. So this time what we did is we gave
them a bunch of sentences and they were supposed to pick one from them and minimally change them,
but this sort of constraints them in aspect of what sorts of linguistic phenomena that they want to
target. So if they were given the liberty of coming up with the pairs on their own with no a
starting point, then maybe they would be able to target some more interesting phenomenon.

</turn>


<turn speaker="Sudha Rao" timestamp="29:45">

And the other thing related with that would be have some sort of these categories pre-defined that
you want to target suppose these are some prior linguistic theories or phenomenon that you want to
target and then a bend your minimal pairs within those categories so that later on when you do the
analysis on the model side, you would understand okay, all the items in this bin failed seeing that
this aspect cannot be handled well by this builder system. So this analysis would be more easy for
us to do.

</turn>


<turn speaker="Allyson Ettinger" timestamp="30:26">

Yeah. Yeah. One thing I wanted to add is that one of the difficulties in defining minimal pairs is
that we don't necessarily want to limit people to making purely lexical changes, but we do want to
limit people to making targeted changes that you know, change one specific thing that we want to
check.v So that's really where the challenge is there, but it doesn't necessarily need to be, the
people are just changing a single word since that's limited in what it's able to target. And yeah,
exactly. Agreed. We want to have more examples. A group of examples that target given thing. So that
rather than saying, Oh, and this specific example system's broke. And trying to draw broad
conclusions from that. We want to be able to have a set of examples that targeted a given thing so
that we can ensure that it's going to generalize the conclusion.

</turn>


<turn speaker="Matt Gardner" timestamp="31:14">

And so it sounds to me like the motivation for this workshop was our systems are brittle, they don't
generalize well to linguistic phenomena, like this is an intuitive well known fact among serious NLP
researchers except it's not really quantified in any particular way and you wanted to quantify it
and show in what areas things break. And from the lessons you just told us about, it sounds like
this was an experiment trying to get there, but the next iteration might do a better job of actually
categorizing the things like give concrete, actionable advice for NLP researchers for what to do
next.

</turn>


<turn speaker="Allyson Ettinger" timestamp="31:52">

Yeah, that's absolutely the goal that we're working toward. And they're definitely lessons learned
in moving forward to be more effective in doing that. And absolutely as you mentioned, we didn't
have a fixing phase and as Sudha pointed out it's nontrivial to do the fixing phase. But the fixing
phase is really what we hope to contribute through this workshops to say, here's where the
limitations are. Here are just like you said, actionable suggestions that we can make, guided
suggestions for improving these systems and making it more generalizable.

</turn>


<turn speaker="Waleed Ammar" timestamp="32:21">

So my last question is how do you incentitize more people to participate both as builders and
breakers? As a scientist, I have limited time this is very interesting, but I also need to, you
know, get some progress in my research, which may not align very well with the purpose of the
workshop.

</turn>


<turn speaker="Sudha Rao" timestamp="32:42">

So one thing that we realized also led to low participation was not knowing about the shared task.
After we had the shared task, a lot of people came up to us and they said that they didn't know
about this. So sort of advertising about a shared task would be really helpful and thanks to your
invitation. Maybe this podcast will also help people know about our shared task more. So yeah, so
that would be a one way advertising mode about it. And the other is as I told before, just to lower
the barrier of entry to pair up with an existing shared task so that we just have to have some
breakers come up with and participate in our task.

</turn>


<turn speaker="Allyson Ettinger" timestamp="33:26">

Yeah, we did of course also have breakers who said, Oh yeah, I heard about that. I was really
interested in it. I just didn't end up doing it. And so we asked the people who said this, you know,
what were the reasons and what would incentivize you as you asked, what would incentivize you to do
this? We didn't have an entirely clear takeaway on what would solve this problem for us, but I think
there are a number of approaches that we can potentially take, including defining the task a little
bit better, increasing the timeline from what it was. There was at least one breaker team that
worked in a large team of people such that the work is distributed across those people. I know that
multiple people had that idea. Cause as Sudha said, if we team up with a shared task, we're reducing
the burden on the builders, but the breakers, it doesn't necessarily solve anything for them. And to
the extent that that's a difficult thing for them to put time into, we certainly would like to
reduce that for them. And we're of course open to any suggestions from folks in terms of things that
would make it easier because we absolutely would like to increase and encourage participation from
both builders and breakers so that we can get the best outcomes out of this that we can.

</turn>


<turn speaker="Matt Gardner" timestamp="34:38">

Do you need builders at all? Why not just use reference implementations of particular models that
are popular or well-performing?

</turn>


<turn speaker="Allyson Ettinger" timestamp="34:47">

Yeah, no, that's a great question. And one that has come up before and absolutely this is an
approach that we could take. We could just take existing, obviously we did take some systems that
were available to increase the number of systems that we were using. Our main idea in continuing to
try and sort of actively engage builders is just to, I suggested what I'm about to say already. We
want to have people actively engaged in this rather than just passively having their systems used
and broken. Which is a little bit less of a positive type of a community activity than having people
say, all right, wait, I think this system might be able to be more robust to the types of
adversarial examples you're going to submit. And having people be actively engaging like that
together. Rather than, there's a bit more of a negative component to us taking systems that didn't
necessarily expect to have this sort of submission and just saying, Oh, well this system isn't as
good as it thought it was, you know? So yeah, just, having that kind of active engagement from the
builders is great. But absolutely, it's also an option for us to just take existing systems. And see
how they do on these new data sets.

</turn>


<turn speaker="Matt Gardner" timestamp="36:03">

I guess I have two thoughts there. One is that if you were to do this with my model, like I've
published some semantic parsing and some question answering models. If you were to take my model and
show me what it does wrong so I can make it better, I would love that. Like I think any researcher
who wants to build good systems would really appreciate efforts to show us where they're breaking
and how to make them better. So I agree that yes, it sounds a little bit more negative, but actually
really you should be excited to have people look at your system seriously. And second where here at
AI2 we're building the system Allen NLP, where our explicit goal is to have reference
implementations that help people study things and easy interactive demos. And if you're interested
and would like, I'd be happy to work with you. So we provide reference implementations and make this
process a lot easier just a suggestion, throwing it out there.

</turn>


<turn speaker="Allyson Ettinger" timestamp="36:59">

Sounds great. We're, really glad to hear that take on things, especially since obviously anything
that reduces the barrier to getting more systems and testing more systems is awesome for us. So,
yeah, that sounds great.

</turn>


<turn speaker="Matt Gardner" timestamp="37:10">

Yeah, we should talk more. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="37:12">

Okay. And any, any last thoughts?

</turn>


<turn speaker="Sudha Rao" timestamp="37:16">

Just for the listeners, if you got interested in this, you should participate in our next iteration
we don't know when and where we will be doing this, but yeah, I hope we have a second iteration and
we are hoping for more participation in that.

</turn>


<turn speaker="Waleed Ammar" timestamp="37:31">

Awesome. Thank you very much for joining us for this.

</turn>


<turn speaker="Allyson Ettinger" timestamp="37:35">

Thank you.

</turn>


<turn speaker="Sudha Rao" timestamp="37:36">

Thank you. Thank you for inviting us.

</turn>
