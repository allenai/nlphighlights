---
title: "Neural models of factuality, with Rachel Rudinger"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Rachel Rudinger"]
number: "068"
tags: []
description: "NAACL 2018 paper, by Rachel Rudinger, Aaron Steven White, and Benjamin Van Durme Rachel comes on to the podcast, telling us about what factuality is (did an event happen?), what datasets exist for doing this task (a few; they made a new, bigger one), and how to build models to predict factuality (turns out a vanilla biLSTM does quite well). Along the way, we have interesting discussions about how you decide what an \"event\" is, how you label factuality (whether something happened) on inherently uncertain text (like \"I probably failed the test\"), and how you might use a system that predicts factuality in some end task. https://www.semanticscholar.org/paper/Neural-models-of-factuality-Rudinger-White/4d62a1e7819f9e3f8c837832c66659db5a6d9b37"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F495123891&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt gardener and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guest is Rachel Rudinger who is a final year PhD student at Johns Hopkins
university studying with Ben Van Durme. She's done a lot of work on natural language understanding,
particularly common sense inference, semantic parsing and knowledge acquisition from texts, these
kinds of things. Rachel, welcome to the program.

</turn>


<turn speaker="Rachel Rudinger" timestamp="00:28">

Thank you so much for having me. I'm really excited to be here.

</turn>


<turn speaker="Matt Gardner" timestamp="00:31">

And today we're going to talk about a paper that you published at NAACL 2018 called Neural Models,
models of Factuality with Aaron White at the university of Rochester and your advisor Ben Van Durme.
So I guess the, where we should start here is talking about what factuality is and how it relates to
people that, how it relates to things that people might be familiar with because I think this is
more of a less well known kind of phenomenon. Do you want to tell us about what this is?

</turn>


<turn speaker="Rachel Rudinger" timestamp="00:56">

Yeah, absolutely. So what we're concerned with here is the task of event factuality prediction and
what that is simply is determining whether some event mentioned in text happened or not. We're just
simply asking the question did it happened? And note that this is with respect to the author's
perspective. So did the event happen according to the author rather than some absolute real world
truth. And I think this is easiest to understand with respect to a few simple examples. So I'll just
start out with a few examples. So consider the sentences. "Pat watered the plants." And "Pat did not
water the plants." Both of these are referring to a watering event, but of course in the first case
that watering event happened and in the second one it didn't. Of course event factuality prediction
is a much broader than just negation detection.

</turn>


<turn speaker="Rachel Rudinger" timestamp="01:43">

It actually encompasses a lot of very interesting diverse linguistic features that are going to play
a role in the determination of factuality. So I think it would be helpful to perhaps run through a
few examples of the different types of linguistic features that are going to play a role in
factuality. So I think the, perhaps the best studied of these are these various types of clause
embedding verbs like verticals, non verticals, factive, implicative consider for example, the
difference between "Pat failed to water the plants" and "Pat did not fail to water the plants." In
that case failed is going to flip the factuality of the embedded clause and when fail is under
negation that flips the, the polarity again. So "Pat did not fail to water the plants." means that
Pat did water the plants. And so there's a lot of different kinds of behaviors that linguists have
categorized under these different types of clause embedding verbs.

</turn>


<turn speaker="Rachel Rudinger" timestamp="02:40">

But there's a lot of other features that we would want to be interested in as well. So for example,
a modal auxiliaries, "Pat could water the plants." We're going to be concerned with epistemic
modals. So like "Pat probably watered the plants." Or "Pat definitely watered the plants." And
evidentials. So things like "John heard that Pat watered the plant." Adjectives like "Pat was glad
to water the plants." Means that Pat watered, the plants quantifieres as well. So things like "Pat
watered all of the plants." So a watering event happened versus "Pat watered none of the plants." We
can even get into things like nouns. So "Pat's watering the plants was a hallucination." This sounds
like it's going to be factual all the way up and all the way until we get up to the word
hallucination and we realized that it's not factual.

</turn>


<turn speaker="Rachel Rudinger" timestamp="03:27">

And I think one other, one other interesting thing I'll throw in is that even holding a lexical item
constant, you can just slightly vary the syntactic frame that it occurs in and that will have an,
that could also have an impact on factuality. So an example here is something like with the verb
"remember" we can have a sentence like "Pat did not remember to water the plants." And that means
the plants didn't get watered. But "Pat did not remember that she'd watered the plants." means that
it did happen. And so just by changing that one syntactic feature, you actually get a different
result. So I think that this is why event factuality is really an interesting task is that it's very
simple to explain, but in fact it gives us this window into a lot of very interesting diverse
linguistic phenomena. So from a linguistic perspective, it's very interesting. But I think it also
has applications for useful NLP tasks as well. And I can get into some of that as well.

</turn>


<turn speaker="Matt Gardner" timestamp="04:28">

Yeah, I think it'd be interesting to talk a little bit more about the linguistic stuff first. You
gave a really nice overview. I wonder how this plays with like presupposition.

</turn>


<turn speaker="Rachel Rudinger" timestamp="04:38">

Oh yeah, absolutely.

</turn>


<turn speaker="Matt Gardner" timestamp="04:39">

Is there any, are there any interactions here?

</turn>


<turn speaker="Rachel Rudinger" timestamp="04:41">

So factive verbs like "know" are going to trigger a presupposition. And so that means like if we say
"John knows that Pat watered the plants." Presupposes that Pat watered the plants because we can put
this under negation and say, "John does not know that Pat wanted the plants." So this is a standard
test for presupposition and it still gives us the result that Pat watered the plants.

</turn>


<turn speaker="Matt Gardner" timestamp="05:05">

Okay. Interesting. Yeah, I guess the I feel like there are, there are a lot of NLP people who don't
really study linguistics or you've used a lot of words so far that I think they wouldn't be familiar
with. And so it's nice to give a good explanation of what's going on here. It's actually pretty
complicated to know what things are actually being asserted. It's not straightforward and in a lot
of cases.

</turn>


<turn speaker="Rachel Rudinger" timestamp="05:28">

Right. Absolutely. And so there is we are interested in different ways of getting at the inferences
that you'd want to make. So some of these are going to come from presuppositions, like in the case
of know, and others will be entailments or even implicature. So you're right. That's very
interesting. And it's sort of the intersection of all of these.

</turn>


<turn speaker="Matt Gardner" timestamp="05:48">

There were a few examples in your paper that I wanted to dig into a little bit more because there
were a few some issues that I'm still not totally clear on that seem a little ambiguous. So, you
said one of the examples is "Joe failed to leave no trace." So here, what event are you talking
about? It seems to me like there are possibly multiple events that you could be talking about when
you're looking at factuality. So what, what is it that we're looking at in this sentence?

</turn>


<turn speaker="Rachel Rudinger" timestamp="06:16">

So, first consider the case where Joe left something behind. That's certainly something that could
happen. So if we imagine that we're in some contexts like "Joe broke into a bank in the middle of
the night and Joe left behind fingerprints and therefore was caught by the police." That's sort of
the positive version of that event, leaving behind something. And so leaving no trace means that
that leaving didn't happen. I don't know if that answers your question.

</turn>


<turn speaker="Matt Gardner" timestamp="06:43">

Yup. Yup. And then would you also consider that failed? Is there a failing event that has some
notion of factuality or is that not considered?

</turn>


<turn speaker="Rachel Rudinger" timestamp="06:51">

Ah, I see. So I think what you're saying is can we frame a negative event as an event in and of
itself?

</turn>


<turn speaker="Matt Gardner" timestamp="06:57">

Yeah, I guess I'm even just trying to understand what is the task here, because there, there are a
few different ways where you can define these events, right?

</turn>


<turn speaker="Rachel Rudinger" timestamp="07:04">

Right. So I think we're starting off with a sort of commonsensical, a notion of some event happening
having some sort of manifestation and we can also talk about the absence of that manifestation. So
for example you know, we talk about, we say things like "it didn't rain." And that's clearly
something that conveys information. But we're talking about the absence of an event or the fact that
it didn't happen. So I think that is kind of what we're getting at here is, you know, we have a base
sense of some event can happen, but we can also observe that it didn't happen.

</turn>


<turn speaker="Matt Gardner" timestamp="07:43">

Okay. And then something like "I failed the test." Is in fact a failing event. And it can be cause
that's something that was actualized. Is that, am I understanding that right?

</turn>


<turn speaker="Rachel Rudinger" timestamp="07:53">

Sure. yeah, I guess a lot of this has to do with, you know, the lexicon and what kinds of events we
decide to draw a, a concept around. So we, we can have a concept of failing as an event where, you
know, it's, that condition is met. If you your score was below a certain grade, you know, if you,
you got a 55 or something could qualify as failing. So, you're right that, that it could depend on
the way that you frame it, that in some cases a negative event could qualify as a positive kind of
other event. But it's, in our case, what we're looking at is we're sort of, we're sticking very
close to the actual lexical items in the sentence. And so if it's written in terms of Joe failed to
leave no trace, then we're looking at is what we're looking at is the leaving event

</turn>


<turn speaker="Waleed Ammar" timestamp="08:47">

So concretely the each event and the data sets that you looked into, is one word and the sentence,
is that correct?

</turn>


<turn speaker="Rachel Rudinger" timestamp="08:54">

That's right. Right. So what we're looking at is the heads of predicates and this is all determined.
So, all of our data is on top of universal dependency parses. And so we just extract one token that
corresponds to some predicate or the head of a predicate.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:11">

And any head or a predicate would be a valid input to the model.

</turn>


<turn speaker="Rachel Rudinger" timestamp="09:16">

So, when we actually did the annotation, and I'll get into this more later we extracted predicate
candidates to label and we had a Mechanical Turk workers verify that those actually did correspond
to predicates and that the extraction was done correctly. What we're actually modeling here, I
should be clear that we're just, our task here is given some predicate. So given some target
predicate, we have to decide whether or not it's factual, but we're not doing the separate task of
event detection in this case.

</turn>


<turn speaker="Matt Gardner" timestamp="09:49">

Great. Yeah, that's a really good distinction. So, in a sentence like, Joe failed to leave no trace
something somewhere is going to decide for us what events I should care about. And then given that
event, which maybe is a leaving a trace event I'm going to build a model to say, does the sentence
imply that this happened or not?

</turn>


<turn speaker="Rachel Rudinger" timestamp="10:09">

That's correct.

</turn>


<turn speaker="Matt Gardner" timestamp="10:10">

Or, or to what extent does it, because we could have, we could have like a degree here with like
probably or could have or whatever. Right,

</turn>


<turn speaker="Rachel Rudinger" timestamp="10:16">

Exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="10:16">

So that's what, that's what's going on. Okay. So then I think we've got a good handle on what
exactly you're trying to do here. Do you want to tell us about what data people use to do this kind
of stuff?

</turn>


<turn speaker="Rachel Rudinger" timestamp="10:27">

Yeah, sure. So there are a few existing event factuality data sets. All first, describe the data set
that we constructed and then I'll sort of compare a few of these. So our new dataset, it's called,
"It Happened" and it's part of the universal decompositional semantics initiative or UDS. And what
UDS is, is it's this collaboration that we have between a few universities where we're layering on
different semantic annotations on top of universal dependencies. And so we're sort of farming out
the issue of a syntactic structure to the universal dependencies and a predicate argument extraction
tool that we have that runs on top of the universal dependencies. It's called a PredPatt and it's
just a rule based system. And then separately we want to annotate various semantic labels on top of
these predicates and arguments.

</turn>


<turn speaker="Rachel Rudinger" timestamp="11:27">

And we're doing this in a decompositional compositional way, which means that multiple labels can
potentially apply and we're interested in targeting very relatively simple labels that can be
translated into simple questions that could be answered by a crowdsource workers. And this is sort
of in contrast to these larger fixed ontologies where might need to train an expert to know the
ontology well to, to decide which one correct label to apply. So instead we're sort of breaking it
up into these different properties. And so one of these is factuality. And so getting back to the,
It Happened dataset. This is a dataset that covers about 27,000 predicates for factuality. That's as
far as we know about twice the size of the next largest factuality dataset. And this covers all of
the English web tree bank in the universal dependencies and that has different genres like blogs,
reviews, emails as well as newsgroups.

</turn>


<turn speaker="Rachel Rudinger" timestamp="12:32">

And the way that we get these labels, as I've already mentioned, is through crowdsourcing. So we
already talked about the predicate verification. So we use PredPatt to identify the candidate
predicates and we verified those with crowdsource workers. We, also asked first, you know, does the
sentence make sense? So we presented a sentence ask, does it make sense? Is the highlighted word a
predicate? And then the real the main questions of interest are, did that event happen? So we're
asking about factuality and that's just a binary yes, no question in our protocol. And then we ask
for a confidence score between zero and four. So in the end we have just a binary label plus a
confidence score. Now there are three other factuality datasets that we were looking at in this
work. And this was very much based on some work by Stanovsky et all 2017 in creating a unified
factuality dataset, basically taking a preexisting factuality data sets.

</turn>


<turn speaker="Rachel Rudinger" timestamp="13:30">

So that includes fact bank, a data set from the university of Washington and meantime and sort of
mapping all of their labels on to a unified negative three to three scales. So where positive three
is going to be definitely happened. The most factual and and negative three is definitely didn't
happen. And I think this borrows from the original labeling system of the university of Washington
dataset. And what's interesting is that when we look at, so having all of these datasets mapped to
negative three to three, so we also did that for our own dataset. We mapped using the confidence
scores and the polarity to map onto that minus three to three scale. Looking at the distribution
over these labels. One thing that we noticed is that a fact bank UDaB and meantime are all very
skewed toward the positive end of the scale. So it's very factual, heavy and our data set also has
that skew to some extent. But in contrast there is a lot more. It's a more in Tropic distribution
and we have more representation at the negative end of the scale. And we think that that's basically
a result of having a different genre coverage where a fact bank you'd have in meantime, these other
datasets are more focused on a Newswire data.

</turn>


<turn speaker="Matt Gardner" timestamp="14:52">

So can we back up just a, and talk about this Confidence judgment by the crowdworkers?

</turn>


<turn speaker="Rachel Rudinger" timestamp="14:55">

Sure. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="14:55">

So let's say I see a sentence like "Joe probably failed the test." That's a failing event, but it
says, probably, so how would, how would you expect a crowd worker to label this? Did it happen?

</turn>


<turn speaker="Rachel Rudinger" timestamp="15:14">

So I think that sort of what one issue that, that any protocol is going to run into is that there's
a many different sources of uncertainty. So there can be uncertainty just from the linguistic
content of the sentence. So what, what is the author attesting to? So the, the author is saying,
this event probably happened or there could just be annotator uncertainty on the basis of, you know,
some ambiguity or any other issue that arises that that causes annotator uncertainty. And so one
choice is to try to meet all of these out into you know, try to say, you know, what's what's
uncertainty from the text in and of itself? What's uncertainty based on some other linguistic
features like tense or modality. And what's confidence, you know, what's your own confidence rating
on top of all of that? And that's a little bit complicated. So we chose to just sort of smush it all
into one confidence rating. And so I would expect that that might be a positive rating with a low
confidence. But yeah, either way you can sort of choose between having a very complicated protocol
or conflating these issues.

</turn>


<turn speaker="Matt Gardner" timestamp="16:40">

Yeah, I guess you're forcing someone to make a binary decision. Yes. No, on something that is
inherently uncertain. Which seems interesting because I don't know if it's probably, yeah, like the,
there I guess language allows the threshold of certainty that you express as a speaker. Right. And,
and what you're saying when you say the annotator has to pick yes. No, you're, you're saying the
annotator has to impose a particular threshold on that spectrum and maybe different annotators will
put that threshold somewhere else. It seems a little bit tricky to get consistency in annotation
there. Any, any thoughts on that? I guess that, that, that sounds like an argument to me for having
a minus three to three rating, like the other datasets that you talked about instead of having this
separation.

</turn>


<turn speaker="Rachel Rudinger" timestamp="17:31">

I think either way you have somewhat of a problem just because either way you have a bit of a
calibration issue and when you, you still have the ability to express a confidence. So either way we
would expect the rating to be you know, after scaling somewhat closer to zero.

</turn>


<turn speaker="Matt Gardner" timestamp="17:55">

Okay. Yeah, that, that makes a lot of sense. So like I, yes, I forced the person to pick a binary
thing, but that's just going to be the sign on something that has a very small value in the first
place. And so maybe the annotator in the negative three to three sense, sort of put this somewhere
between negative one and one a in your setting. It'll be kind of random whether they pick yes or no,
but they'll have picked a low confidence value. And so it'll be in the same range in the end anyway.

</turn>


<turn speaker="Rachel Rudinger" timestamp="18:21">

Right. And, and I think that even, if you're doing a minus three to three scale, you know, the
annotator still has to pick, you know, decide has to make a binary choice about whether or not it's
going to be positive or negative. You know, is it greater than zero or less than zero? So I'm not
sure that using a minus three to three scale, you know, really escapes it. I think either way you're
going to have that sort of issue.

</turn>


<turn speaker="Matt Gardner" timestamp="18:42">

Yeah, that's a good point. Okay. And before I interrupted you, you were telling us about these
datasets. I guess one question that I still had is maybe this is going back a little bit to even
though the linguistic phenomenon that we're looking at here, what, what kinds of features in this
dataset might help you decide factuality does that question make sense? I'm like, what, what kinds
of things would you be looking at as a linguist, as an annotator trying to decide if a particular
event was factual or not?

</turn>


<turn speaker="Rachel Rudinger" timestamp="19:14">

So I think it gets back to a lot of the examples that I gave in the beginning. So those are various
kinds of lexical cues or even syntactic cues that are going to influence the annotation. But I think
the, the idea behind our annotation scheme is not to have a really trained experts who are, you
know, looking for very specific features, but rather these are sentences that can be understood by
any speaker of English. And so any sort of common sense understanding should enable a, an annotator
to decide whether an event happened or not. So they may or may not be aware of the specific you
know, features that are firing.

</turn>


<turn speaker="Matt Gardner" timestamp="19:55">

Okay. so then I guess to summarize the discussion that we've had so far, we've talked about
factuality as a linguistic phenomenon that there's some process somehow that that gets us from
language to a set of events. And then for each event, we want to judge whether or not the person who
spoke the language is, is asserting that this event factually happened or not. And then you've told
us about a data set that you've constructed and, and some others that other people have constructed
to let us build models to actually test this. And by construction these datasets do both go from
language to a set of events using some process. And then and then label the actual events is factual
or not. And then I guess now's a good time to talk about what kind of models people use to try to
solve this task. Do you want to tell us about that?

</turn>


<turn speaker="Rachel Rudinger" timestamp="20:46">

Sure. a lot of prior work on this has been based on using a rule based systems. That sort of capture
various linguistic theories about how factuality is determined. So one thing that we see in a lot of
prior work are these type level implication signatures that are going to so, so a verb that has an
embedded clause that embedded clause can be positive or negative. On the basis of what type of verb
is embedding it and whether that verb is under negation. And so you can come up with these one place
or two place implication signatures that describe that behavior. And then what a lot of these
systems do is sort of starting at the top of a parse tree with a positive polarity at the top, at
the root.

</turn>


<turn speaker="Rachel Rudinger" timestamp="21:52">

You kind of work your way down the tree and every time you hit one of these signatures, you based on
the current polarity, decide what the new polarity is and sort of propagate your way down the tree.
And so that's sort of what a lot of these rule-based systems look like. And more recently there have
been, there's been some work. I think by, let's see we had Al 2015 and Stanovsky at all 2017 on
using more feature-based systems or combining rule-based systems with feature-based systems. And you
know, passing these through some kind of support vector regression. And as far as I know, this is,
this is the first work that's trying to do this task with neural models. And so I can get into some
of the details about what we actually implemented here.

</turn>


<turn speaker="Matt Gardner" timestamp="22:47">

Sure, that'd be great.

</turn>


<turn speaker="Rachel Rudinger" timestamp="22:48">

Yes. So one thing we mentioned is that the there's outside context and inside context and those are
going to be things like clause embedding verbs for outside context or nouns for inside contexts like
hallucination. And there's a lot of examples of cases where it would be important to look both above
and below the verb of interest in the syntax tree. And so what we're doing is we're working with bi-
directional neural networks. And I should just mentioned that the kind of philosophy that we have
here is not to develop the most fancy or complicated network possible to do this task, but rather to
focus on relatively simple architectures that we think might be able to be capable of doing the
factuality detection test and pushing those as far as they can go and see what they're capable of.

</turn>


<turn speaker="Rachel Rudinger" timestamp="23:50">

So in that spirit, we're dealing entirely with bi-directional recurrent neural networks. And we have
three different models. We have a linear biLSTM, just the standard implementation a dependency tree
biLSTM. So that's notable for, being a, a bi-directional tree LSTM on top of dependency tree
structure. And then finally we tested a hybrid version where we just concatenated the States from
the linear model and the tree model and train that end to end. And so to actually do the factuality
prediction on this minus three to three score for any of these models, we take the hidden state of
interest that corresponds to the token that we want to make the prediction on. And we just pass that
hidden state through a two layer NLP. We use the smooth L1 loss and train it end to end. And I
should also note that we used glove embeddings for the embedding layer. So that's, that's basically
the structure of the networks. Fairly simple. But they work actually fairly well.

</turn>


<turn speaker="Matt Gardner" timestamp="24:52">

Yeah. I guess lots of people have said these days that if you want to do NLP, what you should do is
take your text, use some kind of glove embedding, I guess these days it would be Elmo then a run a
couple of bi-directional LSTMs on top of your data and then predict what you want to predict and
sounds like that's exactly what you're doing here.

</turn>


<turn speaker="Rachel Rudinger" timestamp="25:10">

Yeah, I think that our results would support that.

</turn>


<turn speaker="Matt Gardner" timestamp="25:13">

Yeah. Yeah. So you want to tell us about how all that works?

</turn>


<turn speaker="Rachel Rudinger" timestamp="25:15">

Yeah, sure. So what we found generally was a little bit to our surprise that the linear model
generally was outperforming the tree model. We thought that the tree model might do well just
because of the basis of these rule based systems that have, you know, this percolating down the tree
of the, of the polarity. But in general, the, the linear model worked, worked better. And we did
find though that the hybrid model in some cases was able to outperform either the tree or the
linear. So I think that does suggest that to a certain extent the tree model is contributing
something. And I can get into a little bit of the details of, you know, what might be going on
there. We also ran some you know, multitask experiments that I can talk about. So

</turn>


<turn speaker="Matt Gardner" timestamp="26:07">

I guess, I guess first is there a high level picture of like how well this works? If, if given a
random sentence, do I get it right most of the time? How far off are we?

</turn>


<turn speaker="Rachel Rudinger" timestamp="26:16">

So so it depends on the dataset. We measured performance in terms of correlation over. So we also
reported on a mean absolute error, but we think that correlation is a, is a little bit of a better
measure just because some of these data sets have different distribution so that controls for that a
little better.

</turn>


<turn speaker="Matt Gardner" timestamp="26:37">

Yeah. Yeah. When the data is highly skewed and absolute accuracy is not always the best metric.

</turn>


<turn speaker="Rachel Rudinger" timestamp="26:42">

Right. In some of these, the data is so skewed that just a baseline of all just guessing three all
the time has a very, very low mean absolute error. And so I think that yeah, correlation is a little
bit more informative. Just to give a sense, like in general, we're doing somewhere on the larger
data sets in, in the 0.7 0.8 range on correlation.

</turn>


<turn speaker="Matt Gardner" timestamp="27:10">

Is there is there any intuition for what 0.8 correlation means? I don't think I have any myself.
Like I just have a hard time placing like, how good is that?

</turn>


<turn speaker="Waleed Ammar" timestamp="27:21">

I guess, let me rephrase my question in a way that we often think, often on my project, would you
think of integrating this model as part of a production system?

</turn>


<turn speaker="Rachel Rudinger" timestamp="27:31">

I mean, I think that, I think that's a very context specific question. So I, you know, I would
certainly want to test it out in whatever application you wanted to use it in. Sort of depending on
you know, what, what the downstream task is, you know, I, I think that sort of depends on that yet.
I don't know if that answers your question. I, I think, I guess, I guess briefly I would say that,
you know, I think we've, we've shown some definite improvements on this task, but I, I wouldn't call
it solved. That's, that's what I would say.

</turn>


<turn speaker="Matt Gardner" timestamp="28:00">

One thing I've been thinking about recently is how if you have large datasets and I train, I split
this large data set into train and test and evaluate just on this data set date on this test set
that's in the same distribution as my train set. I might not get a good performance, a good picture
of how performances like in the wild when I would actually want to use this thing. And I wonder if
you've thought about like building a small diagnostic dataset for this where it's small, so you
wouldn't train on this thing. But after having trained on it, you could like probe and see if this
is actually capturing what we want from a linguistic sense. Has anyone done this?

</turn>


<turn speaker="Rachel Rudinger" timestamp="28:39">

Yes. In fact, we have this is actually one of our upcoming papers at EMNLP on lexical syntactic
inference in neural models. And this is work with Aaron White and Kyle Rollins and Ben Van Durme. So
basically we have this dataset. It's, it's called mega verticality. And the idea is that you take
all of these different clause embedding verbs of interest and drop them into a bunch of different
syntactic frames. And so it's really a type level data set. And we fill in the sentence with really
semantically bleached arguments. So you would get sentences that look like someone verbs that some,
that a particular thing happened. And so we just have a bunch of these very generic semantically
bleached sentences that test out different clause embedding verbs in different syntactic frames. And
what we find is that there are a lot of cases that these models don't do very well on.

</turn>


<turn speaker="Rachel Rudinger" timestamp="29:41">

And another interesting thing that these experiments revealed is that where we had originally
thought that the linear model was doing much better than the tree model. It actually turns out that
on this targeted type level dataset the, tree model does a little better. And this I think is sort
of a result of the tree in the linear models doing well on complimentary syntactic frames. And so
the distribution in this type level data set, of course, it doesn't match the distribution in the
real world or token level data sets that we are evaluating on in, in the NAACL paper. And so I think
that is sort of to account for some of the differences.

</turn>


<turn speaker="Matt Gardner" timestamp="30:24">

Interesting. Yeah, that's nice. I saw a talk at ACL by Schwartz about doing something very similar,
where you able to diagnostic data set for NLI kinds of stuff that you get very different pictures
out like that. I like this. So I'm excited to read your NLP paper. I guess the last thing I guess
that we can talk about here is you ran a whole bunch of experiments, you hinted at some of them. Are
there any highlights from the, all of the experiments that you ran that you want to tell us about?

</turn>


<turn speaker="Rachel Rudinger" timestamp="30:55">

Sure. so one, one major thing that we tried out was treating factuality prediction on all of these
datasets as a multitask problem because what we have is four different event factuality datasets.
All, all of their data is collected under slightly different protocols, slightly different genres
but still at the end of the day, very similar tasks. And so what we did was we so first we just
tried lumping all the data together. So treating it as sort of the single task problem and then
implementing a multitask architecture where the basic idea was that the biLSTM parameters were
shared across all of the datasets. But then for each individual data set, we had a task specific or
dataset specific really multilayer perceptron parameters independent. And so this actually gives us
additional boost on, these tasks. So we were able to do a little better with that multitask set up.

</turn>


<turn speaker="Matt Gardner" timestamp="32:04">

Yeah. I guess when the datasets aren't huge, it's not that surprising that you're going to get gains
by combining the data. Right. I guess sometimes the problem is that the data sets aren't close
enough that I'm sharing really helps you. Right. But in this case it looks like it does, so that's
good.

</turn>


<turn speaker="Rachel Rudinger" timestamp="32:21">

Right. So, yeah, this was really sort of a prime opportunity or a really prototypical case where we,
we thought that multitask learning might help and it, and it really did.

</turn>


<turn speaker="Matt Gardner" timestamp="32:30">

Yeah. I guess another in talking with people also at ACL, we, we were wondering how much of the gain
of multitask learning is from seeing more, language and that if you use some large pre-trained
language model, a lot of the times the gains that you see for multitask learning just go away
because you pre-trained the language model on billions of tokens, you've already seen gotten the
benefits from like seeing words in various trained sets, you don't get as much benefit.

</turn>


<turn speaker="Rachel Rudinger" timestamp="33:01">

Yeah. I think that's, that's a very real phenomenon and something that we have seen in other closely
related work on semantic protorole labeling. We tried a bunch of different related semantic role
labeling tasks and nothing worked better than initializing the, the encoder a nueral MT encoder. And
so I, I think that's a very real phenomenon and, and we would definitely like to look into that next
and see, you know, how much, how much we can get out of using something like Elmo. And, and what
happens in that case?

</turn>


<turn speaker="Matt Gardner" timestamp="33:37">

Interesting. Great. I think so that was all the questions that I had. Is there anything that you
wanted to talk about that we missed? Any or any last thoughts?

</turn>


<turn speaker="Rachel Rudinger" timestamp="33:45">

So I think, it would be nice to mention just a few cases where factuality detection event factuality
prediction might be useful for someone of a more applied NLP event. And I think that this would be
in cases, for instance, in information extraction or knowledge-based population where, you know,
you're extracting these information and you'd really like to know that what you're extracting is
true according to the text. And so, you know, if you imagine a sentence like his birth certificate
disproves conspiracy theories that Barack Obama was born in Indonesia, you know, really naive
information extraction system is going to pull out, you know an incorrect here of, you know, where
Barack Obama was born. And so you'd really like to be able to model that semantic context better and
know automatically whether, or not some thing you're extracting is factual or not.

</turn>


<turn speaker="Matt Gardner" timestamp="34:48">

Yeah. Yeah. That, that's a great point. I, I had meant to ask that and I forgot. So thanks for
bringing it up. I guess. If you followed work on open information extraction over the last few
years, people have tried to address this because you're right that the naive thing to do just
totally fails and these more complex nested clauses and so like they add some additional context
like this was seen inside or whatever. And it, I guess it feels like if they had actually taken the
linguistic perspective of factuality, they'd have come up with a stronger theory here. Or that you
could predict both the event that you pull out with the open IES system and predict whether or not
it's factual using something like your dataset. So, yeah, that, that's a really great point. I think
it would help.

</turn>


<turn speaker="Rachel Rudinger" timestamp="35:37">

And I'll just also add that I think, you know, natural language inference is, you know, one of my
interests and something that's very a big interest in the field. And I think there's a really tight
connection between factuality prediction and NLI where you know, for instance, if you're building an
NLI system and you want it to be really good, it really should have some sense you know, whether
implicitly or explicitly of factuality because it's going to be important in certain kinds of
inferences. Like, you know, we want to be able to distinguish a sentence like "Pat failed to water
the plants." Versus "Pat watered the plants." Because we want to know whether the soil is dry or
wet. And, and even more directly, we can recast factuality in NLI is such a, it's such a broad
framework that it's, it's really powerful. And it can subsume these smaller semantic tasks. So we
can even directly recast the task of factuality detection. As you know, premise hypothesis pairs
where, you know, I have paths. This might be something like the watering happened. And in fact,
we've actually done this as a way to enable probing of NLI systems. So that's maybe one other angle
that might be of interest.

</turn>


<turn speaker="Matt Gardner" timestamp="36:52">

Yeah. Great. Thanks. This is really interesting conversation. Thanks for joining us.

</turn>


<turn speaker="Rachel Rudinger" timestamp="36:55">

Thank you so much for having me.

</turn>
