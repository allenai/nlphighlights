---
title: "Behavioral Testing of NLP Models, with Marco Tulio Ribeiro"
hosts: ["Pradeep Dasigi","Matt Gardner"]
guests: ["Marco Ribeiro"]
number: "114"
tags: []
description: "We invited Marco Tulio Ribeiro, a Senior Researcher at Microsoft, to talk about evaluating NLP models using behavioral testing, a framework borrowed from Software Engineering. Marco describes three kinds of black-box tests the check whether NLP models satisfy certain necessary conditions. While breaking the standard IID assumption, this framework presents a way to evaluate whether NLP systems are ready for real-world use. We also discuss what capabilities can be tested using this framework, how one can come up with good tests, and the need for an evolving set of behavioral tests for NLP systems. Marco’s homepage: https://homes.cs.washington.edu/~marcotcr/"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F828712537&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner Waleed Ammar and Pradeep Dasigi.

</turn>


<turn speaker="Matt Gardner" timestamp="00:09">

All right. Today our guest is Marco Ribeiro who is a senior researcher at Microsoft. Marco, welcome
to NLP highlights.

</turn>


<turn speaker="Marco Ribeiro" timestamp="00:15">

Thank you.

</turn>


<turn speaker="Matt Gardner" timestamp="00:16">

Today we wanted to talk about something you've published a few papers on recently and this is
Behavioral Testing of NLP Models. I guess a lot of people have been thinking these days about how
our evaluations don't always seem like they reflect the actual capabilities of the systems that we
build and you've had a pretty interesting take on this. Do you want to tell us about how you think
about this problem?

</turn>


<turn speaker="Marco Ribeiro" timestamp="00:42">

Sure. I mean there are a lot of papers on different ways of analyzing and evaluating models in terms
of different things like robustness, consistency, fairness and whatnot and I've written some of
those papers myself. One thing is pretty clear I think to me and I think to most people and that is
that accuracy on some cross validation data, while important is not enough. Like you can measure
accuracy all day long and your system can still behave in really weird ways and really silly ways.
So I've kind of had a string of papers culminating in one that I think is more principle, but we've
started with adversarial examples, then we moved to logical consistency. Like if you have a QA
system and you ask it, are there two people in the picture? Yes. And then you ask how many people
are in the picture, it should say two. So it should be consistent with itself. That was another one.
And then now I have a paper on this year's ACL that is behavioral testing is actually in the title.
So it's the one that's most on this topic where we're trying to apply principles from software
engineering to testing these NLP models. So the thing is, I'm not saying in any of these papers that
we should replace accuracy and stop using accuracy. Accuracy is good and cross validation is good.
It's just not enough to figure out if these models are behaving appropriately.

</turn>


<turn speaker="Matt Gardner" timestamp="02:02">

And so we recently had a talk with Ellie Pavlick who talked about probing and behavioral testing in
the context of probing things. And I think your use of behavioral testing here is related I guess
people from cognitive science and linguistics think about how I can test behaviourally from like a
linguistic standpoint. You're coming at this from a software engineering standpoint. It's kind of
interesting how these two terms and even like the practice here converges. Would you say this is
like behavioral testing as you're using it here is really pretty similar to how you might, if you
want to think about probes and like if a model captures some particular thing, it's basically the
same thing that you're talking about here. Is that right?

</turn>


<turn speaker="Marco Ribeiro" timestamp="02:42">

I think it's similar, but I think it's a little different from probing at times. So we're using
behavioral testing in the software engineering sense and not a lot of people know what that means,
but it's just another name for black box testing. It is saying instead of looking at the
implementation, I'm going to treat the model as a black box and just test the behavior. Given inputs
what behavior do I expect on the output, given perturbations on inputs, what behavior do I expect?

</turn>


<turn speaker="Matt Gardner" timestamp="03:07">

I think where these converge is the, if I'm testing a specific behavior, like say do I understand
propositional phrase attachment for instance, in a parsing model, I might probe whether a model
understands this with a particular behavioral test that's designed to tease apart whether the model
understands this thing and if in the software engineering perspective I presumably have something
that I'm trying to probe, like some behavior that I want to know whether the model does something
like that. I need to be able to write down what behavior I'm looking for and in that sense these two
things align.

</turn>


<turn speaker="Marco Ribeiro" timestamp="03:43">

They do align quite a bit. A lot of the probing literature that I've seen, instead of testing the
behavior directly, what you do is you take some representation given by BERT or whatever and then
you train another model on top and that is where I think a big difference lies because you're not
testing the behavior of the model itself. You're testing what can be done on top of what the model
has learned.

</turn>


<turn speaker="Matt Gardner" timestamp="04:05">

Yeah, yeah, that's fair. Probing has a lot of baggage. There are a lot of things that could mean and
some people like when we were talking with Ellie about this, we did make a distinction between like
fine tuning something to try and understand what's in the representation and just doing like
behavioral probes of a single model. And so that's probably the source of this disconnect. But
anyway you want to tell us more about what you do with these behavioral tests.

</turn>


<turn speaker="Marco Ribeiro" timestamp="04:29">

So first what we're suggesting is that people should write a bunch of tests just like in software
engineering, think unit tests. Like if you have a sentiment analysis model, you should make sure
that your model works on stuff. Like this is a good book, this is not a good book or something like
that. And right now what we do is we take this big datasets, like you take STB Stanford Treebank,
there's, I think it's tens of thousands of examples where you have very complex behavior, you have
negation there, but it's entangled in a bunch of other stuff. And we're saying let's do the opposite
of that as well. Like, let's have the entangles stuff and let's also test individual things like
individual components and we have a guide of what people should test and how they should test. So in
terms of what to test, we have 10, in software engineering, you just have individual functions,
right?

</turn>


<turn speaker="Marco Ribeiro" timestamp="05:20">

Where you test individual components, maybe, objects or classes and whatnot. In NLP we don't have
that. Typically you don't train a model that has all this separate components. So you have one model
for everything or you have a couple of models for basically everything. So our translation of this
principle of testing, one thing at a time to NLP was testing linguistic capabilities is what we're
calling them. So things from the classical NLP pipeline, like does my model understand part of
speech, different parts of speech. Can it handle adjectives and nouns and whatnot? Does it
understand name entities? Does it understand negation? So when we have 10 of them, but the key point
is that we have to test them as they applied to the task? So we're not testing negation in the
abstract. We're testing negation for sentiment analysis. And that's going to be different than
negation for question answering, even though there's going to be obviously some overlap.

</turn>


<turn speaker="Marco Ribeiro" timestamp="06:14">

So this is what to test, like we're testing these individual capabilities, how and how they manifest
in the test. In terms of how to test, we're proposing different test types. We have three, I'm
talking too much, you can interrupt me at any time, but so we have three test types. One, the
simplest one is what we call a minimum functionality tests. It's just a unit test. So if you're
testing negation, the simplest thing for sentiment analysis, again, the simplest thing you can do is
to just have very short examples. I don't like this, this is not good. And so on. So testing, what's
the minimum that the model should be able to do for us to say it can kind of handle negation. That's
basically it. And in this we're creating tests from scratch, like you're creating very focused small
datasets as it were.

</turn>


<turn speaker="Marco Ribeiro" timestamp="07:00">

For the other two tests types we are relying on perturbation, so you take an existing dataset and
then you perturb it in some way and then one test is you expect predictions not to change. We called
it an invariance test and it's just what it sounds like. You do a perturbation and you say, no
prediction should change. So to continue the sentiment analysis example, if you have, "I like this
book" and you change it to "I like this movie" or "I like this TV show" sentiment should not change.
And you can think of various invariances like that for specific capabilities. And then lastly, the
last kind of test we have is what we call directional expectation tests. It's the same thing. You
apply perturbation, but instead of expecting prediction not to change, you expect something else. So
one example we had in the paper was; take some example and add, "I hate you" to the end and then
expect sentiment to not go up. It's back to to be monotonically decreasing. So that's a directional
expectation test. So that's a mouthful of things. But the point is like we kind of construct this
matrix where the rows are capabilities and the columns are test types and it's very easy you just
follow the matrix one step at a time in order to test the model.

</turn>


<turn speaker="Matt Gardner" timestamp="08:11">

So this is great. There are a lot of interesting things to ask about. I guess to start the first
test type that you talked about, there was a minimal functional test, I believe the MFT.

</turn>


<turn speaker="Marco Ribeiro" timestamp="08:24">

Minimum functionality tests.

</turn>


<turn speaker="Matt Gardner" timestamp="08:25">

Minimum functionality test. And so here you're basically saying I want a very small input that that
should very clearly result in a particular output. And what I wonder is, you're essentially like
changing your test distribution and why is it the case that we don't have these examples in our test
distributions? And why is the one that you're suggesting better than what we have? Does this
question make sense?

</turn>


<turn speaker="Marco Ribeiro" timestamp="08:51">

It does make sense. You would expect that we would have them, but the way that we collect datasets
is such that we do not have them. If you're collecting a machine comprehension test, it would make
sense to start very simple and say, can we do machine comprehension on single sentences? And then
can we move to paragraphs and then whole articles or something. But the way we do it right now is we
say, okay, let me define a procedure. I'm going to take Wikipedia paragraphs and then let me define
the way I'm going to get the questions and then okay, Turkers are going to get them. So we end up
with this datasets that have a particular distribution that typically is not exactly what we care
about. It's still useful, but it's not what we care about. So if we have a dataset with all of those
examples, maybe we wouldn't need to create all of these minimum functionality tests. But even then
it's useful to separate things out. So if you had a dataset with all of the simple examples and a
ton of complicated examples, it would still be useful to slice it out and say, my model can handle
simple negation. It cannot handle nation that's slightly more complicated and it just fails
completely when the negation is within this kind of context that is X, Y or Z. Does that make sense?

</turn>


<turn speaker="Matt Gardner" timestamp="10:00">

It does. And I guess from a machine learning perspective, when you change distributions this way,
you lose all kinds of guarantees about generalization and such. And it's just interesting to think
about like the whole premise that actually this dataset that we collected. It's not what we are
interested, that the accuracy metrics on this particular dataset aren't actually what we care about.
And so there fundamentally is a mismatch between our train and what we really want for our test
distribution.

</turn>


<turn speaker="Marco Ribeiro" timestamp="10:32">

You're right, this does break all of the theory of machine learning of the premises we have. But if
you think about it that is almost always the case in reality. Like you almost never care about that
particular dataset. The way you gather the data, it's almost never the right thing. So if you
generalize to that distribution, that's nice. You can prove all sorts of things about that. But do
we actually care about generalizing to that or to the real world? I would argue that in general we
care about generalizing to the real world.

</turn>


<turn speaker="Matt Gardner" timestamp="11:01">

Or, I guess just to push on this one last little bit. If if you're like actually deploying something
in the real world, then you should get samples from the real world usage that you expect and label
that as your training set instead of some random academic thing that doesn't actually match what you
want. And then I can keep all of my machine learning guarantees.

</turn>


<turn speaker="Marco Ribeiro" timestamp="11:26">

You should. But even, do you get that data set and then you start using your system and your system
interacts with the world and that changes the kind of examples that you start seeing. So your system
is working great and then you get new clients and now you have all of this new domains that you
didn't have before and your distribution just shifted. Now you're doing sentiment analysis on law
review rather than Twitter that you weren't doing before.

</turn>


<turn speaker="Matt Gardner" timestamp="11:51">

Yeah, that's a great point. And another easy response to my devil's advocate point is that language
is, the space of possible inputs in language is just so large that you're really never going to see
all of the stuff you want to see in any realistic training set. And so if you want to be able to
handle all kinds of arbitrary stuff that you might see at test time, you're going to have to do
something like what you're doing here with these behavioral tests.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="12:20">

Right. Given that point, can you even make an argument that, for example, if you're model fails on
some examples which include negation given that you're not testing all possible contexts with the
negation, can you even make a claim that your model is failing on negation?

</turn>


<turn speaker="Marco Ribeiro" timestamp="12:38">

Yeah, it's sometimes even with a test, it's hard to pinpoint is it negotiation itself or is it some
other thing that is correlated with the way that I generated this test? So we have to be very
careful about naming things precisely. But I would argue that if my sentiment analysis model fails
on, "This is not a good book." "This is not a great movie." It doesn't matter if we call it negation
or not. We should go and fix that behavior. It should work on that kind of stuff. What I'd be more
careful with is saying that it works. Like if it passes all the tests, I would not say, Oh, okay, my
model can handle negation now. And it's the same with software engineering. If you write a bunch of
unit tests, you can pass all of them, but you know that there could still be a bunch of bugs hiding
in there. It just gives you a little more confidence. At least it works in the sanity checks. If it
doesn't work even in the sanity checks, then you should go and fix it.

</turn>


<turn speaker="Matt Gardner" timestamp="13:27">

I guess this also brings up an interesting way in which our NLP models are not at all like software
in that we can have unit tests for software because the execution of the functions that we're
testing in software are in fact independent. Unless you have some like complex, crazy global state
where you've actually implemented something poorly, and maybe that's the analogy here. Our models
have like some, that the execution of each say negation or linguistic capability that you might care
about are not actually independent. And so you can have some crazy interactions such that I could
pass some suite of unit tests for negation, but if I introduce some correlate that the model tries
to, like some confounding factor that the model actually doesn't disentangle the way you might think
it should, then all of a sudden the model fails on negation in the presence of this extra thing.

</turn>


<turn speaker="Marco Ribeiro" timestamp="14:21">

Right, right. And that's why I'd be very careful with saying it works because it passed my unit
tests, but I'd be comfortable saying it fails because it failed my unit tests. Or even writing a
unit test, like what you're just describing. Let me add some little confounder here seeing if the
model can handle it. Something that should not change the behavior.

</turn>


<turn speaker="Matt Gardner" timestamp="14:42">

Yeah. And this is kind of related to your other two kinds of tests, which I think would be good to
talk a little bit more about. So you have these perturbation tests were, I guess, can you give just
a simple example of the kind of change that you would make again?

</turn>


<turn speaker="Marco Ribeiro" timestamp="14:56">

Sure. So one change that you would make, I actually wrote one paper where it was just about one kind
of perturbation is to do paraphrases and say the model should be robust to paraphrases and you can
define paraphrase however you like. If you're thinking sentiment analysis for, I don't know, movie
reviews, you can create a very targeted list of words that are interchangeable and just say, does it
work for these words, like if I change these whatever reviews I get even on labeled data that the
prediction remained the same. So that's one kind of perturbation that people have explored a lot.
One that I haven't seen as much is adding. So I had an example of adding very negative phrases to
the end of a review. "I hate this." Or you can think of the most traditional ones like adding typos
doing like testing robustness to contractions. One that we use a lot in the paper was changing
people or location names for NER. So if the example says "John is good," we replace that with
"Matthew is good" and they expect it to be the same.

</turn>


<turn speaker="Matt Gardner" timestamp="15:55">

Yeah, this is interesting. So for the sentiment analysis where you're adding a negative sentiment
sentence at the end, do you only do that for negative sentiment examples or do you do that also for
positive sentiment examples?

</turn>


<turn speaker="Marco Ribeiro" timestamp="16:08">

I'm doing for all of them and notice that I'm not expecting the prediction to become negative. I'm
only expecting you to not become more positive.

</turn>


<turn speaker="Matt Gardner" timestamp="16:16">

Right. So this is the directional change, not the invariants test and that's a really interesting
idea. I like that a lot. That there are some things that should at least not make my. that should
have a known directional effect on my output. That's a really sensible thing to try to test. Yes.
You also have some the invariants, so like I should make a change where my model doesn't, I make a
change to my input and my model should not have any corresponding change to its output because these
should be at least according to the function that I'm trying to learn. These two inputs should be
equivalent. And those are great we can talk, I know you have some really great examples of this
later, which we can talk about when we get to the actual experiments that you ran. One thing that I
wonder though is what's the extent of the cases where you can actually do this?

</turn>


<turn speaker="Matt Gardner" timestamp="17:04">

You had a paper, not your most recent one, but you had one at ACL last year I believe on
consistency. You mentioned this at the beginning of the episode, for SQuAD, for instance, the
Stanford Question Answering Dataset. You can do some subject object rotation basically and take
something that was the answer and make it an object and find a new answer in a way that I can
predict in the paragraph. So I can, there are classes of changes that I can make deterministically
and know what the answer is going to be. My question is like what, how far can you push this? At
some level you're going to end that, you're going to try to make perturbations where if I could
actually know what the corresponding output should be, I'd have already solved the task. So how do
we think about pushing this kind of test farther?

</turn>


<turn speaker="Marco Ribeiro" timestamp="17:53">

I think it's a valid concern. Like do we need to basically solve the tasks to come up with the
perturbations? And sometimes it's hard to come up with perturbations. However, you don't need to
know how the model should behave everywhere. It just needs to come up with these counterfactual
functions that should be true. So for example, if I say look, changing people's names should not
change sentiment. I don't need to solve sentiment analysis for that. I just need to know this
property of one particular kind of perturbation and I think that's a much more manageable approach
than trying to exhaustively list everything that the model should do. Again, we're talking about
testing here. We're not talking about expert systems where we're trying to encode everything that
the model should be doing under every perturbation. We're just talking about, Hey, this basic tests,
we should be able to do this. Sometimes it is the case that you have to write a paper on it, like
the consistency one you just mentioned. I actually did write a paper on that, so it's not something
that I expect some software engineering testing their sentiment analysis model to come up with in an
afternoon, that kind of perturbation, but many others are of that kind where you can just come up
with something very quickly and easily.

</turn>


<turn speaker="Matt Gardner" timestamp="19:04">

So you're specifically recommending this kind of thing for simple behaviors that I might want to
test and more complex things probably need something else. Is that fair?

</turn>


<turn speaker="Marco Ribeiro" timestamp="19:14">

No, I'm saying we should do both. Realistically, if you're testing your own model, you probably,
it's easier to start with the simple ones. But what would be ideal is if we as an NLP community
could come up with a lot of these, put them in a repository somewhere so that people could go and
test them on their own models. So yeah, maybe it's hard, you have to write a paper, but after you
write a paper, can you put it somewhere so that other people can test if their models are consistent
or whatever else perturbation you come up with.

</turn>


<turn speaker="Matt Gardner" timestamp="19:44">

Just to make this particular discussion concrete. If we're running what we've been talking about,
sentiment analysis a lot people can get creative when writing reviews of stuff and use sarcasm to
express negative sentiment or metaphor like this is as bad as, or this makes me feel like some
situation X where X is obviously negative but maybe not to a machine. And can you imagine behavioral
tests like these template or automated kinds of tests that that can capture this kind of phenomenon?

</turn>


<turn speaker="Marco Ribeiro" timestamp="20:16">

Sure. It's easy to think of template and minimum functionality tests. It's a little harder to think
of how you would turn an example into sarcasm, thinking of perturbations is a little harder, but you
can easily come up with a list of, let's say you say something like, "Oh, this X is like getting
water when you're in a desert." Like you can create a list of those and test your model on that.
Sarcasm is the same thing, you can come up with a few sarcasm templates and test sets that that kind
of behavior though is way more complex than the kind of things that we had in the paper and I think
that if your model is not able to figure out, this is not a good movie, maybe it's a little early to
have it try to figure out sarcasm and metaphor and so on. But again, it's the same thing. If you
have a list of very smart people testing models, you would expect that after some time you'd have a
suite of tests, like for sentiment analysis, we've been doing this for how many years? 20 years or
something. There's NLP research on segment. There should be a list of things or datasets that we can
go and test. Does the model understand sarcasm? Can it pick up on metaphor and so on?

</turn>


<turn speaker="Matt Gardner" timestamp="21:27">

Yeah, that's a really great point. I hadn't thought of it quite in that way before, but we in NLP
have basically been very much influenced by machine learning and taken all of our common practices
from machine learning in that our goal is I have some training distribution. I want to learn some
function that generalizes to an IID test distribution. And so we basically, like that. That's our
hammer and that's what we do for every single problem. But really probably a better way to think
about this is to slowly build up just a suite of tests that are independent of any training set. Who
really cares how you trained your model to get this thing. We just want to know, can I build a
model, any model that can pass this test set?

</turn>


<turn speaker="Marco Ribeiro" timestamp="22:13">

Yeah. Think of a customer nowadays. I think if you're an airline or if you're whatever, a bank and
you want to use machine learning and you're not going to develop it in house you're going to hire
some company like Microsoft or Google or whatever, are you going to do some partnership with some
university and say, Hey, can you guys help me build this machine learning model? Do you care about
how people do it? No, you just care that it works in your application and you have some tests that
Hey, it needs to work for this. It needs to work for that. It needs to work for this thing. Like it
does not matter. I think how we get there and I think, I don't know how people do it nowadays. Like
if you're a customer, like if you're an airline and you want to get sentiment analysis, do you go
see how well people do on Sanford's Treebank to figure out if that's going to help you if your tweet
brand awareness tool, I don't know. I don't know how people do it. It seems very painful.

</turn>


<turn speaker="Matt Gardner" timestamp="23:05">

Yeah. I would assume that they would collect some in house data and label in house data and then for
whatever model that they're testing, they would compute accuracy on their random sample of in house
data that was labeled by themselves. But again, as we've talked about previously, that can miss a
lot of really easy cases. Because the space of things they might want is so large, it's really hard
to make that comprehensive. Yup. So I think that was a great time to talk about what you actually
did with these tests. So your paper outlines how to build these tests, but also instantiates it with
some particular examples. Do you want to tell us about what did?

</turn>


<turn speaker="Marco Ribeiro" timestamp="23:46">

So we picked examples of models and stuff where we thought that people would think these are solved.
So we tested with Quora Question Pair which is from the GLEU benchmark. It's the task where BERT and
Roberta and so on are supposed to be beating humans by the largest margin with picked SQuAD because
we also think that we're beating humans these days on SQuAD. And we picked sentiment analysis. And
so we tested some research models. We tested BERT, we tested Roberta. We also tested a few other
ones like XLNet and or ELMo. But they didn't make it to the paper cause it was strictly worse than
BERT or Roberta. And we also threw in some commercial models for sentiment analysis. And the reason
we did this was when I was starting on this project and I pitched it to a few people and I said,
look, I'm finding these bugs, like would you be concerned?

</turn>


<turn speaker="Marco Ribeiro" timestamp="24:36">

And this is people at Microsoft, they were like, no, like this would never make it into production.
Like there's no way that the product team would let this kind of stuff pass by whatever metrics they
have. And I said, okay, I should add some commercial systems and find some bugs so that I'll
convince people as well. So we threw in some models that Microsoft, Google and Amazon sell as a
service that people can test. So we ourselves, so we had a few things. So we wrote a bunch of tasks
for all of these tested all of these models. And we also had two cases where it was not us writing
the test. So to show that the process is useful, not only for the authors of the paper but for other
people. So after testing the Microsoft Sentiment Analysis model, I went to the team that trains that
model and validates it and said, Hey, do you guys want to try this nifty new process and tool that I
have?

</turn>


<turn speaker="Marco Ribeiro" timestamp="25:27">

Let's see if we can find some bugs in your tool. So that was one. And then the other one was we did
a user study with people at UW so people have no experience on Quora Question Pair. We asked them to
come up with tests for Quora Question Pair using our process or not using our process and we saw
whether they could find a bunch of bugs. So basically we tested a bunch of models, had other people
test a bunch of models and we found a bunch of bugs. That's it in a nutshell.

</turn>


<turn speaker="Matt Gardner" timestamp="25:52">

Yeah. And I thought a lot of the stuff that you showed in the paper was really interesting. Can we
dig into some details, I guess? I guess what did you think was the most surprising failure of a
commercial system?

</turn>


<turn speaker="Marco Ribeiro" timestamp="26:03">

So it was very surprising to me that very simple sanity checks on commercial systems failed. Like
"this food is not great" if you're selling a sentiment analysis model, it should get, the food is
not great correct. Right. It should know that that is negative. And you have, like for this
particular one, Google had a failure rate of like 54% we can talk about what that failure rate means
in a second, but for a lot of examples that we tried, this did not work like simple, very simple
negation that this isn't a good customer service. So it was very surprising that it would fail stuff
like that.

</turn>


<turn speaker="Matt Gardner" timestamp="26:39">

Yeah. You also had some really interesting examples about changing names like country names. What
was it? Britain to Turkey or something like this.

</turn>


<turn speaker="Marco Ribeiro" timestamp="26:47">

And so we, for the perturbation task for sentiment analysis I actually took a Twitter dataset. All
commercial systems say this is a use case for what we're selling, Twitter, Brand Awareness and so
on. So we took some Twitter data and what we did was we just changed location names, country names
to other country names or US city names to other US city names. You have a tweet that says, I want
you guys to fly to Cuba. And then I changed that to I want you guys to fly to Canada and expect the
predictions to be the same. Or if it said agents were super bad, but I really liked John and changed
that to I really liked Luke for changing people's names, maintaining the male or female distinction
and we're changing locations and seeing how often do predictions change. And we even put a margin on
that.

</turn>


<turn speaker="Marco Ribeiro" timestamp="27:32">

So if you have an example in the boundary and it changes from 55% positive to 45% we're not
considering that a failure, you have to change with some margin for us to consider it a failure. And
so in this one, for example, all of the commercial systems kind of failed the location one, it
depends on what you consider a failure. So 7% of Microsoft predictions changed. 21% of Google
predictions and 15% of Amazon predictions changed. If you changed location names, you would think
that someone would have found that and fixed it. Right, but apparently not.

</turn>


<turn speaker="Matt Gardner" timestamp="28:05">

Yeah. It's interesting to think about why that might happen. I can pretty easily imagine how if you
have some contextualized representation and sentiment is encoded somewhere in the representation for
each country name for instance, that that could bleed into the sentiment classifiers predictions.
It's harder to think of how that might happen with non contextual representations, but I suppose
even like pre-trained word embeddings might have some sentiment dimension that encodes because of
word usage in whatever corpus it was pre-trained on could encode this kind of sentiment.

</turn>


<turn speaker="Marco Ribeiro" timestamp="28:40">

Right, so we didn't have access to the commercial ones. I could have gotten access to Microsoft I
guess, but we did play around with this with BERT and Roberta and it is the case that there is some
very clear like BERT hates Turkey for example. If you put Turkey in, sentiment always goes down and
I think it likes Brazil. So you can imagine like if you have a corpus of news articles and you see
like what's going to be more positive or more negative, is it going to be Afghanistan or Hawaii? So
you can imagine that models would pick up on this stuff. But interestingly it also has something
with names. So certain names you could imagine Hitler being negative, but John, Mary, Luke, those
have a particular slant and it may be just randomness, but it is the case that this is happening.
You can imagine, even if you're training on bag-of-words, if your data said, it's going to be
sparse, how often are you going to see Cuba mentioned? So maybe if you see it mentioned a few times,
your model is not regularized enough. It picks up some spurious correlation that is in your dataset.
Oh, Cuba appeared three times as negative. Therefore Cuba is negative.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="29:46">

So these tests that you got when you asked the people who are deploying these commercial systems or
people who are a grad students at a university were they're experts on how the models worked or were
these non-experts.

</turn>


<turn speaker="Marco Ribeiro" timestamp="30:01">

So for the segment analysis one, these are the people who are developing the system that Microsoft
is selling. So I would call them experts, their experts on this particular model. That's their job.
For the Quora Question Pair, it was NLP grad students, so in a sense they are experts but only one
participant had prior experience with this particular task or this particular dataset QQP. So in
that sense, non-experts, they are NLP people. They know what a part of speech is, they know what a
model is. And so on,

</turn>


<turn speaker="Pradeep Dasigi" timestamp="30:34">

More generally speaking, do you think test like these can only be written by experts who know enough
about the tasks and how models work?

</turn>


<turn speaker="Marco Ribeiro" timestamp="30:44">

I don't think so. It definitely is a little harder. Like if you, in the matrix that we're proposing,
like one of the rows is semantic role labeling. So if you're not an NLP person, you have to explain
what that is. But I did explain this to my wife who is not an NLP person. Said, Hey, can you come up
with some tests? Like just here's some examples like change active to passive or stuff like that.
And all that's needed in this case is knowledge of the expected behavior. So if you know what should
happen for sentiment analysis, you can write tests, writing perturbation tests, you need to know how
to write programs. I guess.

</turn>


<turn speaker="Matt Gardner" timestamp="31:18">

So you've mentioned failure rates in this discussion a few times and I assume you get the failure
rate just by instantiating a bunch of these tests and then calculating how often the model fails the
test. But one thing that we may not have explained quite well enough in this conversation is that
some of these tests are essentially templates. You write down a template like item is sentiment
bearing word, and then I can instantiate that with a list of items and a list of like positive
sentiment words like "book is great" or whatever, like it'll hopefully be a little bit more
grammatical than that. But then essentially it seems like the failure rate is determined by how many
items I have in my instantiation. Right? I say I have two templates and one of them has a thousand
more instantiations than the other. It's not really clear to me how to interpret the failure rate
percentages.

</turn>


<turn speaker="Marco Ribeiro" timestamp="32:17">

Right. And it's actually worse than that. It also depends on how you define the test. So let's say
this is a test that I had for a SQuAD. It says, so you have the context, it says person one is a
profession, person two is another profession. So "John is a writer and Mary is a doctor." And then I
asked the question, who is not a writer? And the model should say, "Mary," one way of defining this
test is saying, "who is not a writer?" "Who is not a doctor?" And then counting those as two
different examples. Another way is to say, look, the model only passes the test if it gets them
both, right? So given this template, it has to know who is not profession one and who is not
profession two. Otherwise they didn't really understand. And if you define it like that, you're
going to get a failure rate that's higher because now the model has to really grasp it to pass the
test.

</turn>


<turn speaker="Marco Ribeiro" timestamp="33:05">

So the failure rate depends on how you feel in those templates. So the example you had, this is a
sentiment thing. If I had good great, excellent, there's going to give me a failure rate. If I have
a list of a hundred sentiment laden words, that's going to give me a different failure rate. And it
depends on which words I have. So maybe a model is really good on very common ones and not very good
on distinct ones. So all of this is to say it is hard to interpret the failure rate. It depends on
how the test was created and on what the expectation is. Roughly speaking, I think the percentage
doesn't matter so much as is it high enough to be troubling. So in the template example I just gave
for a SQuAD, if we required a model to get them all correct, the failure rate is a hundred percent
so for this particular instantiation, no matter what I put in there, BERT was never able to get all
of them correct.

</turn>


<turn speaker="Marco Ribeiro" timestamp="33:55">

Now, I don't care if it's a hundred percent, 85%, 95% I'll be concerned with all of those. I would
not be very concerned with 5% or 7%. So anyway, we have to communicate very, very clearly. What is
it that this number means? And it depends on the test. For the perturbation test, sometimes it's
easier, like the test that I just described, I changed a location to another location. It still
depends on what list of countries do I have in there. Am I trying every country in the world or just
the most populous countries? I actually did try only the highest population countries for this
particular test. But the failure rate does change. Like if you start adding Trinidad and Tobago,
that changes. Then if you have Russia and the U S.

</turn>


<turn speaker="Matt Gardner" timestamp="34:35">

And I guess especially because you're thinking about this in terms of sanity checks, simple tests
and not perhaps the very hard things that you might care about. Just as in unit tests with software
engineering, if you fail a unit test, it's broken. You don't merge the commit, and so presumably all
of this stuff that you're writing here is simple enough that you really want like a hundred percent
passing and all of these things

</turn>


<turn speaker="Marco Ribeiro" timestamp="35:00">

I wouldn't say a hundred percent yeah, close because language is complicated, right? Like maybe your
model, like if you're doing like, "I like this movie," okay, it should work on that, but if you
start adding like, I like this, whatever, some very rare word that is a noun maybe you're okay if it
fails sometimes on that kind of stuff you're not okay if it fails 50% of the time for whatever word
you put in there, but for 1% of words maybe I'm comfortable, maybe even 10% it depends on the
application I guess. But yeah, it's very subjective. What's acceptable and what's not acceptable.
But I think it's very clear that a hundred percent on stuff, this is not acceptable.

</turn>


<turn speaker="Matt Gardner" timestamp="35:38">

Okay. So we've talked a lot about sentiment analysis and a little bit about reading comprehension
style stuff. Do you think this paradigm works for more structured complex outputs? Like for instance
dependency person?

</turn>


<turn speaker="Marco Ribeiro" timestamp="35:52">

I think it should work for anything in NLP where you can specify behaviors. So basically anything,
so if you have a parser, I'm not a parsing expert, but you may want to know like if you have a parse
that says this is a verb phrase, this is a noun phrase, does this parse change? If I change John to
Luke, it should not. Right. So you can still test even the same test that we're applying here. Or
you can think of other perturbations. Like if you give me a noun phrase followed by a verb phrase,
there's specific changes that I should be able to make to the noun phrase that should not change the
parse or to the verb phrase or that should change the parse. Like if I remove the verb, it should
not be a verb phrase anymore. I imagine that most parses would pass that particular test, but the
point is if you have a set of expected behaviors, you should be able to write them down and even if
it's harder to write perturbations, sanity checks should abound for every one of these, right? It's
specifically sanity checks, testing specific things like names and negation and whatnot. If your
system deals with language, it should deal with these capabilities in language. It should be able to
handle names and negation and co-reference and whatnot.

</turn>


<turn speaker="Matt Gardner" timestamp="37:00">

Yeah, I guess I can, understand how you might write a minimum functionality test and how you might
write an invariant perturbation test where these things should not make my model change its output.
I have a harder time thinking about the directionality kinds of tests or tests where I can predict
what the output, like if my output should change, what should it change to without just like writing
it out. Writing that out as a minimum functionality test where I specify the whole output and not in
a templated way.

</turn>


<turn speaker="Marco Ribeiro" timestamp="37:29">

Sometimes you don't have to write what the expected output should be, but you can write a property
of the output. So if you're thinking translation for example, if you add a bunch of stuff to the end
of the source sentence, the translation should not become significantly shorter. So there's an
example of the kind of directional expectation tests you could write where you're testing a property
of the output rather than what the output itself should be.

</turn>


<turn speaker="Matt Gardner" timestamp="37:54">

Okay. Yeah, that makes more sense. Okay. This has been interesting. I think my last question for you
is how should we think about what kinds of things to test? In your paper you talk about sentiment
analysis and reading comprehension. I would say one of these is much broader in scope than the other
that I could have a reading comprehension problem that's essentially targeted at like asking
questions all about the sentiment of a particular piece of text. And so like reading comprehension
has essentially arbitrary scope. So you could imagine something similar for natural language
inference. People talk about this a lot and they make a lot of different kinds of challenge tests or
other kinds of behavioral probing things for natural language inference. But again, there, the scope
is basically arbitrary because I can just put two sentences and have it test whatever I want
including say sentiment analysis. So how should I think about if I'm trying to build a model, what
kinds of tests I should write?

</turn>


<turn speaker="Marco Ribeiro" timestamp="38:55">

That's a great point that you are making there and it's obviously very, it's much easier to answer
the question if you have an application in mind. If you're trying to build something using NLP, you
kind of know what the goal is rather than if you're trying to solve a problem. Like if you're a
researcher trying to solve reading comprehension, like that's very broad. But if you're trying to do
like those boxes on Google or Bing where you ask who is the president of the US and it tells you
what it is, then the scope is clear and it's easier to write tests. I actually think it would be
great if we as a community had a pretty good sentiment checklist that we produce over the years and
that you could just plug in and say, Hey, I have a machine comprehension model. Can it handle
sentiment so that you're not having to build everything from scratch every time and we're trying to
get there.

</turn>


<turn speaker="Marco Ribeiro" timestamp="39:42">

I think this paper is one step in that direction and we did make it open source and I tried very
hard to make it easy to share stuff so that people try it out but to answer your question like, I
think in the very least we should start by testing the most basic stuff, and this is where the
matrix abstraction that I was talking about really helps. If you're thinking machine comprehension,
it's very hard to come up. What are the most basic behaviors for machine comprehension? That's very
broad, but if you say, Hmm, what about named entities, then it's a little more scope and you can
think about what kinds of examples you'd come up with to test that. Even within that you can go
deeper and deeper, but it's a first step. And as I was saying before, I think we should test at a
level that our current systems are close to being able to handle. So there's no point in testing if
my model understands sarcasm, if it cannot handle "this is a good movie" yet. And there is no point
in testing if my machine comprehension system can handle sentiment analysis as a sub task, if it
cannot even figure out who the agents and objects are. So I think we should start with what's likely
to be possible right now. And if we can't do level one, let's not test level three.

</turn>


<turn speaker="Matt Gardner" timestamp="40:52">

Yeah, that's great. I completely agree with your framing of this and like how we should as a
community build up these tests. I'm really glad to see work like yours that pushes people in this
direction. So thanks.

</turn>


<turn speaker="Marco Ribeiro" timestamp="41:07">

Thanks. I appreciate it.

</turn>


<turn speaker="Pradeep Dasigi" timestamp="41:08">

I have one, other general question here. So I guess this is related to one of the points that Matt
made earlier, how do we in general deal with the potential disconnect between what the user of a
system wants and what the person building the system thinks is important. For example, negation is
kind of fundamental for sentiment analysis, but say if you're talking about negotiation in the scope
of parsing as a system builder, as a researcher, you might think that it's very important, but if
the system does not handle negation properly, it's possible the user may not even realize it. How do
we deal with such a potential disconnect?

</turn>


<turn speaker="Marco Ribeiro" timestamp="41:54">

That's a great question. I'm glad you brought it up. My goal with this paper was not to come up with
something that only researchers could do. So I think that it should be the case that the end user
should be able to write his or her own tests rather than relying on whoever's building the model to
also provide the testing. So I think it's the case that different people are going to have different
priorities. Maybe even within sentiment analysis, maybe sometimes you don't care as much about
negation for whatever reason. Like if you're doing some application that there's not going to be a
lot of negation, maybe you don't care if you're doing movie reviews, maybe you care a lot about
sarcasm because people try to be witty and then you really care about that. So it should, the
process of testing should be one that's flexible enough that whoever is testing or using the system
should come up with their own tests.

</turn>


<turn speaker="Marco Ribeiro" timestamp="42:44">

And also whoever is developing the system should come up with their own test. So you should have
testing at every step of the way. So I think unless we decentralize evaluation, this problem is
never going to work. Like there's always going to be a disconnect between people building the model
people using it. If you want models that are flexible to be used everywhere in different situations
and whatnot, you cannot have everything be tailor made if you want stuff to be reusable. And if you
want stuff to be reusable, people have to be able to evaluate on their own. So again, it may sound
like a cop out, but I think that we should build systems like this where everyone in the pipeline is
applying some form of testing for their own application.

</turn>


<turn speaker="Matt Gardner" timestamp="43:26">

Great. This has been a really fun discussion. Thanks for coming on the program.

</turn>


<turn speaker="Marco Ribeiro" timestamp="43:30">

Thanks. Really appreciate it.

</turn>
