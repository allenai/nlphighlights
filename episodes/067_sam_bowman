---
title: "Sam Bowman"
hosts: ["Matt Gardner","Waleed Amar"]
guests: ["Sam Bowman"]
number: 067
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</Turn>


<Turn speaker="Waleed Amar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
artificial intelligence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guest is Sam Bowman, who is an assistant professor at New York University.
Welcome Sam.

</Turn>


<Turn speaker="Sam Bowman" timestamp="00:17">

Thanks for having me.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:18">

Today. We're going to talk about a paper that was posted on archive a little while ago and hopefully
we'll see it at EMNLP this year titled GLUE a Multitask Benchmark and Analysis Platform for Natural
Language Understanding. So I guess I've seen a lot of papers recently that try to understand what's
going on inside of these big models using a lot of different tasks to evaluate. And it seems like
this is an attempt to pull a bunch of things together and get a common framework to evaluate stuff.
Is that a good description of what's going on here?

</Turn>


<Turn speaker="Sam Bowman" timestamp="00:49">

Yeah, I think that's right. If we should launch in to this now, I guess I I could tell three
somewhat different stories for what GLUE is aiming at. The actual history is that this came out of
these RepEval workshops. These workshops on evaluating vector space representations for NLP and the
consensus that was emerging among a few of the organizers including Omer Levy, Felix Hill, who wound
up contributing a lot to GLUE was that the thing we wanted to do next wasn't necessarily workshop.
It was a shared task on this problem of building a reusable sentence understanding components.
Something like a sentence decoder something like what you see with Elmo. We ended up building the
shared task and not bothering with this year's iteration of the workshop. So this is kind of that.
The other kind of historical explanation for how it came about is I've been planning this JSALT
workshop. This is part of this, Johns Hopkins summer program where you get teams of researchers
together for a couple of months to hack away at some hard problem.

</Turn>


<Turn speaker="Sam Bowman" timestamp="01:52">

We were interested in, alright, what do, these sentence representation models learn. We want to have
some benchmarks that we could use to measure to make sure that the things that we were studying were
actually any good. We wanted to kind of a nice single number and GLUE was our attempt to produce a
single number that would be at least reasonably robust to our trying to aggressively over fit it
The, real pitch kinda stepping back though is we, we think there's a lot of interesting work
starting to go on on this problem of building reasonable sentencing encoders. And it didn't seem
like anyone had really put a really serious effort into figuring out what a good performance metric
would be. And we wanted to do that. The only clear competitor that was really trying to propose a
standardized evaluation was this project called SentEval. And that came out recently about the
standardizing and evaluation that had been around for five or 10 years and was based on kind of the
public data that was available five or 10 years ago. And we thought some of those decisions were
worth revisiting.

</Turn>


<Turn speaker="Waleed Amar" timestamp="02:48">

Yeah. And in the paper, you mentioned some of the distinctions between what you're doing in GLUE and
what a SentEval is about. Would you like to elaborate on this a little bit here?

</Turn>


<Turn speaker="Sam Bowman" timestamp="02:57">

Yes. So I see two differences, SentEval is focused on sentence to vector models. So something, I
guess the name says it all. A pre-trained function that gives you a fixed length vector for any
sentence. They do a lot of things to make evaluation very easy by assuming that, they will
automatically train models for each of the target tasks. Give you performance numbers for a suite of
target tasks. We wanted GLUE to be much more flexible. We wanted to make it possible to use it to
evaluate systems like Elmo or Cove or the the recent open AI transformer work where there is no
single bottleneck where you represent a sentences vector and there may not even be a fixed exact set
of parameters that's shared across models that represents your sentence encoder function.

</Turn>


<Turn speaker="Sam Bowman" timestamp="03:45">

We want this to be a useful benchmark for any project that is looking at standardized approaches to
sentence understanding. So that's one big point of contrast. We can evaluate this wider range of
things, but it also means that users have to train their own models for the target tasks. Yeah, I
guess that's, that's the big thing. The other big point of difference is just the yeah, that we've
picked this newer set of tasks we're including. We're including some tasks with, with somewhat
larger datasets. And we're putting up this online leaderboard open competition.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:13">

So can you describe what exactly GLUE is then? Like what, tasks do you put together? How does the
evaluation work? What is this?

</Turn>


<Turn speaker="Sam Bowman" timestamp="04:21">

So I think the easiest way to describe it at is as a shared task on multitask learning, there are
nine target tasks. They're all the input is always either a single sentence or a pair of sentences.
The task is always classification or regression. The goal is to build a model that does well in
aggregate across all the tasks. We essentially just measure performance on each of those tasks. Take
an average, that's your score. We have an online leaderboard for this. We have some software tools
you can download to make evaluation a little bit easier. Many of these tasks we have private test
data. In addition, we have some auxiliary diagnostic data in NLI format. That's meant to give
feedback on every submission for what kinds of linguistic properties your model is decent at. And
just to very quickly go through the list of tasks, we have two sentence classification tasks. CoLA
is a sentence, excitability tasks and is this string of words a sentence.

</Turn>


<Turn speaker="Sam Bowman" timestamp="05:14">

We have binary sentiment classification on the Stanford Sentiment Treebank. I've got three textual
similarity oriented tasks. Microsoft research paraphrase, core question, pairs and semantic textual
similarity benchmark. And then four tasks that broadly fit under natural language inference or
textual entailment. There is the multi-genre analy Corpus a version of SQuAD that we converted into
roughly NLI format to turn it into a sentence pair task. We have the the RTE shared task
competitions kind of bundled into one task from Ido Dagan and collaborators few years ago. And most
deliberately challenging is the WinoGrad Schema challenge converted into textual entailment format.
This is a tiny dataset that is explicitly meant to be impossible for statistical NLP models. So,
thats the set.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:07">

Yeah, it's, it's an interesting and diverse set of tasks that you collected. Though I wonder about
only picking sentence classification and sentence pair classification, right? Your goal is to
understand how well our models do across language understanding, I think. And so why restrict
ourselves to just sentence classification?

</Turn>


<Turn speaker="Sam Bowman" timestamp="06:27">

Yeah. So that was a choice. We argued over quite a bit and one that I think could have gone another
way, but that was essentially a concession to practicality ease of evaluation. We wanted to be one
step more ambitious than something like SentEval in allowing people to submit models that are really
competitive with the state of the art. In all of these nine tasks. We want people to be able to use
the models for core question pairs for MNLI, for Stanford sentiment that you would actually use it.
You wanted to solve these problems and we want to do this for any task that we're going to include.
What this meant though is that we're making evaluation pretty effort intensive, pretty slow and
we're hoping that with single sentence sense per task, we're hitting a bit of a sweet spot where
evaluation takes time and effort, but it's something where you start it running overnight in the
morning, you get your results, you've trained your models and your nine tasks and that's feasible
with state of the art systems on these tasks.

</Turn>


<Turn speaker="Sam Bowman" timestamp="07:21">

With modern GPUs right now. We were seriously considering adding tasks like question answering or
translation where you have either large inputs or a generation staved in the output. Both of those,
if you really want to get competitive performance, in those tasks you need to train much larger,
much slower models and just the evaluations stage of an experiment pipeline could expand into more
than a week and we're just worried that no one would actually want to, no one would actually want to
submit their systems if that was what it took.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:50">

What about sentence evaluation or sentence analysis or single passage analysis like predicting parse
trees or part of speech tags or negation scope or whatever, is that too low level for what you're
interested in or is it too difficult? Why not include these?

</Turn>


<Turn speaker="Sam Bowman" timestamp="08:10">

Yeah, that's a good question. I think all I can say is the a trivial answer that it's out of scope.
We wanted to focus on what we were considering language understanding tasks. I think a lot of those
tasks are meant as more syntactic task, more level tasks that are meant to be in service of language
understanding and yeah, it was, it wasn't, it wasn't the thing we set up study.

</Turn>


<Turn speaker="Waleed Amar" timestamp="08:30">

I mean, as a user, as a potential user of the platform, I don't want to use a platform which has
like a ton of tasks because it's not like I'm going to build one model and submit it. I would have
to build a model for each of these tasks.

</Turn>


<Turn speaker="Sam Bowman" timestamp="08:44">

Yeah. Yeah.

</Turn>


<Turn speaker="Waleed Amar" timestamp="08:45">

Which is the more tasks you have the the less feasible it will be for people to be able to use it.

</Turn>


<Turn speaker="Sam Bowman" timestamp="08:52">

Yeah, that's right. And there's another trade off here which is we do distribute baseline code and
the hope is that for a lot of research on onset of how do we build, how do we train some kind of
shared sentence understanding component. You could just plug that into our baseline code and keep
all of the code that trains the task specific models. The problem is that that's assuming that our
baseline code is close to the state of the art and as things change, people who want to do well on
the benchmark are going to have an incentive to rewrite and re-tune these tasks click models. So we
can try to save users some effort there, but it's inevitably going to be something that some people
have to worry about and that made us want to keep the diversity of output formats for tasks pretty
limited.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:31">

What are the, plug and play components in that implementation.

</Turn>


<Turn speaker="Sam Bowman" timestamp="09:36">

So we have a baseline code base and we're actually coming out with a revamp nicer version in a few
weeks. But essentially we have this big code base that's built around allennlp that makes it fairly
easy to do this three step process of pre-training, a shared BiLSTM sentence encoder. This could
easily be replaced with a transformer or something else, but BiLSTM in our experiments on some pre-
training task. Then either in single task training or multitask training; training task specific
models on the nine GLUE tasks and then evaluating those on the GLUE test sets and, and writing files
to disk that you can then send off for evaluation.

</Turn>


<Turn speaker="Waleed Amar" timestamp="10:18">

I am looking forward to it.

</Turn>


<Turn speaker="Sam Bowman" timestamp="10:19">

Good to here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:20">

Can I push just a little bit more on this task decision. So you said you're interested in
understanding and you have a diagnostic task which I wanted to get into cause I think it's really
cool. And as part of the diagnostic you're looking at predicted arguments structure and how well the
models capture that. But you're doing it kind of indirectly in the sentence pair classification. If
you're really interested in sentence in predicate argument structure, isn't it still in scope to say
I have a single sentence and I want to evaluate how well it captures predicate argument structure.

</Turn>


<Turn speaker="Sam Bowman" timestamp="10:48">

Yeah, that's a fair question. I think that I don't think we can, I don't think we have a completely
principled division of sentence understanding versus lower-level NLP. I'm not sure that we put a lot
of effort into making exactly the right cut there. But I think there is an important distinction
between these main nine tasks and this additional diagnostic data we're releasing. So the diagnostic
data we're asking everyone who submits system on GLUE to also submit their predictions on this, this
additional diagnostic data. But performance on that data doesn't count towards your primary score.
There's just something that you can if you click on a system on the leaderboard, you can see how it
does on these categories like predicate argument structure. We ultimately care about systems that
perform well on these language understanding I guess tasks. The point of the diagnostic task is to
give feedback to people who are building systems to say, Hey look, your system does well overall,
but it's much worse than, than a lot of the other systems we've seen at tracking sentence structure
correctly or at bringing in the kind of background knowledge that you need to do basic sentence
understanding. And so there we were willing to expand the scope of what we're interested in a little
bit to try to give useful feedback.

</Turn>


<Turn speaker="Waleed Amar" timestamp="11:57">

So in the diagnostics data set, you provide the pairs of sentences along with annotation course
green categories. And fine green categories. Could you elaborate on how you get the sentences and
what the categories are?

</Turn>


<Turn speaker="Sam Bowman" timestamp="12:09">

Yes. So, the diagnostic data set we have now, and this is something unlike the main task, we might
actually expand in the future. Diagnostic data set. We have now is a set of about a thousand textual
entailment examples. The way we produce these was by selecting examples from the multi-genre analy
Corpus one of the largest tasks in GLUE and systematically modifying them to make these examples as
much as possible exemplify one of about 30 target linguistic phenomena or reasoning phenomenon we
are interested in. So we by doing that we ourselves, the five authors were the annotators on this.
Did the annotation, did some filtering for agreement and came up with these thousand labeled
examples. The way that we're expecting them to be used is you do whatever you're going to do that,
that gets you your, your nine systems.

</Turn>


<Turn speaker="Sam Bowman" timestamp="13:02">

On the nine GLUE tasks. And here you just evaluate your MNLI classify your multianalyte classifier
on this, this data. And the ways in which your MNLI model gets examples wrong instead of the current
proxy we have for what kinds of phenomena your shared sentence and coder is decent at handling. And
this is a bit of a compromise where we're having to look at a lot of these phenomenon through the
lens of textual entailment and not by directly looking at whatever tool you chose to use for
sentence or presentation. But we think it does allow us to ask all the questions we're interested
in. And empirically we are seeing a fair bit of interesting variation across pre-training tasks. In
what kind of analysis examples systems get right and wrong.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:49">

So you classified the kinds of phenomenon that the models could capture into four broad categories.
Can you tell us about those?

</Turn>


<Turn speaker="Sam Bowman" timestamp="13:58">

Yes. I'm pulling up the, pulling up the full tag set now to give credit where do Julian Michael at
Udot was the primary designer of this annotation scheme. But we started with about 30 categories we
are working with. And these were things where you could very easily design textual entailment
examples that exemplified this, these were things like mods in a city reasoning with quantifiers. If
I tell you that that some dogs bark, do you know that some animals bark things like lexical actually
left, one cam won't fit in the same category. Various kinds of negation, tracking handling some tech
be ambiguous sentences in a reasonable way, things like this.

</Turn>


<Turn speaker="Sam Bowman" timestamp="14:40">

We then kind of post-talk group these into four larger categories to try to get something that I
think would be more at the level of how you actually debug a deep learning model. So we focused on
phenomenon that were primarily about lexical knowledge phenomena that are primarily about predicate
argument structure and sentence level syntax phenomena that were primarily about logic and kind of
the reasoning process in textual entailment. And a phenomena that we're drawing on background
knowledge and the stuff that you need to know to do language understanding that isn't exactly part
of English.

</Turn>


<Turn speaker="Waleed Amar" timestamp="15:16">

And each example, each sentence pair will exhibit only one of the following categories or multiple,

</Turn>


<Turn speaker="Sam Bowman" timestamp="15:24">

Potentially multiple. So we were attempting to produce examples for each of the, each of the 30 odd
categories. But for many of them there was some unavoidable overlap. So for example, when you're
trying to find a good examples of monaticity reasoning, many of those will also be good examples of
negation or quantification. And so some of these do have multiple tags.

</Turn>


<Turn speaker="Waleed Amar" timestamp="15:46">

Yeah. I guess I'm actually not very clear on some of these categories. Like, I dunno what monaticity
and reasoning mean.

</Turn>


<Turn speaker="Sam Bowman" timestamp="15:56">

We have a lot of this we couldn't fit into the paper. We didn't want to give people 15 pages of
supplementary materials, but so the website, we have a long along write up trying to explain the,
the motivation and background for each of these categories.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:12">

And just to give the listeners a bit of an example here in the paper there's a table that shows a
whole arrange of these. One of the examples is "Tulsi Gabbard disagrees with Bernie Sanders on what
is the best way to deal with Bashar al Assad" is sentence one and sentence two is "Tulsi Gabbard and
Bernie Sanders disagree on what is the best way to deal with Bashar al Assad." And it might be kind
of hard. They were so close to you might not have noticed the difference in audio, but one of them
is Tulsi Gabbard disagrees with Bernie Sanders and the other one is Tulsi Gabbard and Bernie Sanders
disagree on. So this is like testing it, knowledge of argument, realization where disagree is a verb
that if you have subject disagrees with object of with, that's the same as two subjects disagree on.
So you need to understand this kind of stuff. And there are other like simple lexical entailment as
Sam mentioned earlier about if you see dog that entails animals in a certain logical direction. So
this kind of stuff.

</Turn>


<Turn speaker="Sam Bowman" timestamp="17:17">

Exactly and that disagreement example I think gets at the kind of thing that we're really wanting
this diagnostic data set to do. For each of these nine tasks. Some of what you're learning when you
train the task model is how to do the task. But we're hoping that a lot of what you want to learn if
you're training a good system for textual entailment for sentiment analysis, for sematic similarity,
is just how English works. And that's what's going to go into that chariton coder. And I think a
really clear example of one of these phenomena that's really just about how English works is that
kind of alternation that any good modeling technique for sentence understanding that's, task
independent should tell your task model that these two sentences have this really close structural
correspondence and they mean roughly the same thing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:02">

Yeah, I really like this idea of taking a different kind of dataset. Like we train models on these
huge, often artificially constructed datasets and then what we really want to do is understand
what's really going on and we can probe them in specific ways. And I really like this general idea.
I guess I saw at ACL, Schwartz presenting a paper that was also very interesting on NLI showing that
when you take models outside of the distribution, they were trained from often they break in
spectacular ways. Is that what you see here with this diagnostic data set also?

</Turn>


<Turn speaker="Sam Bowman" timestamp="18:40">

Yes, we do. This is paper is a great example of this, the results on our diagnostic set mentions the
same things. And I was at the new forms of generalization workshop at NAACL this year. There were a
lot of conversations about this issue that looking at test sets that are drawn from the same
distributions as training sets for high-profile language understanding tasks. Gives us this, it
turns out wildly misleading view about how good we are at building systems for language
understanding. And this wasn't I think the diagnostic set is meant to help temper expectations here
a bit using with the Winograd schema, data in GLUE has helped. We've met to help temper expectations
a little bit. This is data that's explicitly meant to be resistant to a lot of the kinds of of task
fitting that make this possible.

</Turn>


<Turn speaker="Sam Bowman" timestamp="19:26">

But we did do a couple of other things that in creating GLUE that I think are meant to help inform
users a little bit about limitations to generalization in these models. So these are two of the
tasks where the task development and test sets aren't drawn from the same distributions of the
training set in multiNLI. I we make this special conspicuous in the interface we have this matched
and mismatched test set. They're both annotated by the same pool of annotators in the same way, but
the source text that's being annotated are quite different. For example, in the match test set and
in the training set we have a section that's drawn from switchboard drawn from telephones featured
in strangers in the mismatched test set.

</Turn>


<Turn speaker="Sam Bowman" timestamp="20:10">

The test data for spoken language is drawn from a different dataset of spoken conversation face to
face among friends. And similarly we have a genre mismatch for every piece of data there that's
meant to hopefully mitigate this a little bit. Also in this Cola data set, this accessibility
dataset. We have a slightly different set of linguistic phenomena covered in the test set then in
the training set. That's meant to give you more of a fair estimate of how well your system is
actually solving this problem of identifying grammatical sentences.

</Turn>


<Turn speaker="Waleed Amar" timestamp="20:48">

I was wondering how do you think that the same architecture, like let's think about one architecture
that would be optimal for these tasks, right? For like a one time the single sentence tasks and
another architecture for maybe all the similarity tasks and a third one for the inference tasks. Do
you really think that's what's gonna happen or do you think each of these data sets may have its own
optimal architecture? Because if the platform doesn't require you to submit the same model, a
really, you can design your own model for it, a different model for each of the tasks and overfit
still to each of the tasks. Of course, it will take more effort to do this. But I am interested in
your view on how exactly is this helping us show that our model is generalized better. Yeah. So

</Turn>


<Turn speaker="Sam Bowman" timestamp="21:40">

We did paint ourselves into the corner, into a corner in how are we're designing this and that we
really want to be able to evaluate the tools that work for sentence understanding regardless of what
forms those tools take. So we really didn't want to place any limitation that these, that your model
for all of your nine tasks share the same architecture or shares some substantial component in
common or anything like that. We're already seeing some split in that there are some models like
Elmo where there is an exact set of parameters shared in common and other models like the open AI
work where you pre-train all the models in the same way but then fine tune them in a way that each
mnls diverge and they have no shared parameters at the end.

</Turn>


<Turn speaker="Sam Bowman" timestamp="22:27">

So we felt like we really needed to make it possible to evaluate systems like this on a roughly
level playing field. But that also meant that we couldn't really rule out in any serious way the
possibility of just submitting a basket of nine completely unrelated models that have no techniques
in common. I think that's something actually, now that we've made that possible, I hope that people
continue to do this. We have a baseline our single task models where we tried to within some fairly
tight constraints, pick the best model for each task and train it separately. And we actually do
hope that people keep working on advancing that baseline. Cause I think what makes work on this
problem of reasonable sentence understanding feels exciting is when we can get big improvements over
that kind of baseline for most of these tasks.

</Turn>


<Turn speaker="Waleed Amar" timestamp="23:17">

That's fair.

</Turn>


<Turn speaker="Sam Bowman" timestamp="23:18">

Sorry if that didn't answer your question completely.

</Turn>


<Turn speaker="Waleed Amar" timestamp="23:18">

No, that's a, that's a fair answer. I guess I'm understanding a little more insight on how you think
we will reach the generalization that we're hoping for. So yeah, one way to do this is to improve
the architectures we're using. Another is to improve the which like to pick better data set that
actually represent the target the target data we're interested in, but then we would really be
generalizing. So I guess I'm not sure how are we going to bridge this gap that we can clearly see in
generalization?

</Turn>


<Turn speaker="Sam Bowman" timestamp="23:51">

Yeah. So we put this all out there because we don't have we don't have an answer that we're really
convinced of, but to speculate a little bit I guess I see a short term and a longterm way that you
could attack this in the short term, I think the kind of work that's most exciting is finding better
ways to do pre-training. This is work like work like Elmo figuring out alright, language modeling
works in this way. Let's find some good language modeling data and scale this up. How best to do
multitask learning. If maybe you have multiple pre-training objectives that each seems to teach you
something different, doing multitask, learning effectively in NLP is still very hard. And how to do
transfer learning? Do we want to to start with a common model and fine tune it for each of these
tasks? Do you want to share parameters rigidly between these tasks? Kind of how do we want to do
this? I think there are a lot of fairly fine grain practical questions about how best to build this
pipeline of pre-training than task training.

</Turn>


<Turn speaker="Sam Bowman" timestamp="24:55">

Architecture plays into that somewhat. I don't know that it's, it's the question that I'm most
excited about or betting most is going to make the crucial difference on performance and GLUE in
the, in the longer term, I hope that people submit systems here that, that are completely
unrecognizable. I buy into the claim that maybe we can get a few points about random baseline on,
on, on this Winograd scheme of data. But I do think that that data like this is genuinely
challenging in a way that systems built on building blocks, like a few layers of BiLSTMs of
attention that we are used to using probably aren't going to get to near human performance in some
of these tasks. And so I very curious to see what it takes to actually get substantial agreements on
these smaller tasks.

</Turn>


<Turn speaker="Sam Bowman" timestamp="25:47">

But in the short, in the short term, I expect there's a lot of interesting fine-grained work to be
done on figuring out how do we get that 25% error reduction or 75% reduction in the amount of
training data we need on some of these medium data tasks. I think that's still something that would
have a huge impact on applied work in NLP and the GLUE is as well set up to measure.

</Turn>


<Turn speaker="Matt Gardner" timestamp="26:14">

So I think at this point, I think we've talked quite a bit about what GLUE is, what tasks you've
assembled, people will submit systems and you'll keep track of what happens in your paper. You also
ran a bunch of baseline experiments using this framework. Do you want to tell us about those?

</Turn>


<Turn speaker="Sam Bowman" timestamp="26:32">

Sure, sure. So we were trying to, as of April, we were putting the last of this together, get as
comprehensive a picture as we of what people were using for problems like this at the time. So we
built three categories of model. There were single task train models and these all had this shared
architecture of there is a BiLSTM every task model contains a BiLSTM sentence encoder. The sentence
pair model is mostly used attention, the single sentence models didn't, but we designed kind of
similar architectures for each of the nine tasks, train them directly. And where this gets
interesting is that we also trained versions of these that used glove embeddings, Elmo States, and
Cove States, these translation, pre-trained vectors as the inputs.

</Turn>


<Turn speaker="Sam Bowman" timestamp="27:26">

This was our way of evaluating glove, Elmo and Cove kind of in their natural habitats as tools for
solving problems like this. The next thing we did was evaluate systems, sentence to vector system
systems, more like the ones that you're seeing evaluated on. This existing SentEval benchmark. These
systems don't lend themselves as well to building kind of interesting neural network architectures
on their outputs. So what we did for these, these are tools like Skip Thought was simply run roughly
the same thing you'd see run in SentEval but just on our tasks. So for the single sentence task we
just did we just stuck at one layer, a one layer neural that were classify or on the output of the
sentence encoder didn't update sentence coder and use that to get task predictions.

</Turn>


<Turn speaker="Sam Bowman" timestamp="28:13">

For the sentence pair tasks we'd simply concatenate the vector representation for two sentences and
build a predictor of that way. So we did that for a number of the best and most prominent systems
evaluated on SentEval vector systems. The third category, which is a little bit strange but is what
gets us our best performance are these multitask models. Where here we took all of the single task
models, these these BiLSTM based models that we were training with or without Elmo, with or without
Cove and trained all of the task models simultaneously. So our MNLI model and our Core question
pairs model and our Cola model, each had different tasks that, that parameters above the sentence
encoder layer, but they were all passing gradients into the same shared sentence encoder that's what
gets us the best performance. I think it makes sense.

</Turn>


<Turn speaker="Sam Bowman" timestamp="29:02">

We're using all the resources of all the pre-training resources that went into something like Elmo
or Cove combined with combined with a training set for all lines of these tasks. That's presumably
going to encourage generalization, but these results are somewhat different from the other results
in that they crucially used the entire GLUE benchmark in their training. And so I think the relative
rankings of systems that were trained in this multitask setting might not quite reflect the relative
ranking you'd see on a parallel universe version of blue that contained nine different tasks.
Because we're training specifically on these tasks.

</Turn>


<Turn speaker="Waleed Amar" timestamp="29:40">

Well, I'm looking at the table five and I'm seeing the multitask training results. Most of the time
there are lower than the single task training results. So that, that's not quite the same thing that
you're saying. I want to clarify this.

</Turn>


<Turn speaker="Sam Bowman" timestamp="29:53">

Yes. So this is a point I was hoping I was hoping we would, we would the timing would work out to
spare the listeners a little bit. So we had some it turns out training these models can take longer
than we expected. It turns out that we had some of them that were still running when we were
finishing the paper. And so the the results are different between the current archive paper and the
leaderboard online. And we're hoping to put up an updated version of the archive paper very soon
that should match the current results. So we have right now on the site our best systems are getting
around 69 Bluepoint 69 on our arbitrary scale. That is the average of task performance and that
comes from doing multitask learning with attention models with Elmo. And so that's kind of our best
of all the best of all our tools combined results.

</Turn>


<Turn speaker="Matt Gardner" timestamp="None">

29:53

</Turn>


<Turn speaker="Sam Bowman" timestamp="30:46">

Any interesting insights that you got from looking at the results of all of these experiments? One,
boring but important practical question that I've been very curious about since these two papers
came out is, we found that that Elmo pre-training in particular is is a really strong baseline.
Adding Elmo to anything is giving you improvements in performance consistently across all of these
tasks. Cove, which takes a very similar idea, but with a supervised pre-training doesn't seem to
behave in quite the same way. It does get you improvements in some settings, but those aren't as big
or as ubiquitous across tasks. Looking individually at the tasks. The Cola task, this sentence
accessibility task is a bit of an outlier because it's a little bit more syntactic than the others.

</Turn>


<Turn speaker="Sam Bowman" timestamp="31:34">

We see that Elmo and in our private experiments kind of language model, pre-training is very, very
important to get that to work. The other kinds of pre-training don't really help there, whereas
other tasks there's kind of more of a mutual benefit going on that pre-training on some subset of
these tasks, will generally get you a decent performance on the rest of them. That and probably
unsurprisingly using attention, using large models really helps you that none of these, none of
these sentence to vector bottles were able to get particularly competitive performance on GLUE. At
least the way we were evaluating them. But yeah, I should say I'm hoping to be able to say more
about the soon we've run plenty of experiments as part of this work that we'll be polishing up and
putting out a few months. My impression is that plenty of other people are doing the same this
summer. Right now our baseline experiments are just meant to answer a pretty small set of practical
questions about Elmo and Glove and Cove and where we need attention. And that's about it.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:35">

Great. that it's a really interesting set of experiments that you ran, sounds like I need to look
more at the results that you have online because I thought there were some things that I expected to
see in the paper, but I didn't, but you just mentioned them and said they're online, so I should go.
I should go look at that. It's fine. It's a lot of experiments and they take a long time to run. So
what you just said leads me to a point I was hoping to talk to you about, which I think we disagree
on. And so this might be an interesting discussion. So I find myself incredibly skeptical about a
sentence vectors in general, especially pre-trained sentence sectors. Do you think these are a good
idea, I guess from, from the experiments you just told us about you, I'm thinking maybe you don't
think they're as good an idea anymore. I dunno. What, would you say

</Turn>


<Turn speaker="Sam Bowman" timestamp="33:25">

So I've changed my mind on this? Or at least I've changed my mind on the kind of the kind of problem
I want to work on in sentence understanding. I have done some work on sentence to vector models.
Some of the stuff I did with, with multiNLI was trying to push this with the shared task there. Done
a couple of papers on that topic. I no longer believe that it is a useful tool for the kinds of
language understanding problems that are most high profile right now in NLP. I think sentence
vectors are an analytical, really interesting problem. I think they're very useful for tasks that
might involve retrieval where you need to do a lot of similarity judgments between sentence meetings
very quickly. But if you want to solve question and answering translation and entailment, things
like this, forcing sentence representations into a vector model, that doesn't seem to work. I think
Ray Mooney's famous, you can cram the meaning of a whole bleeping sentence and do a single bleeping
vector. I think that's, that is basically right. And that's, that's part of what motivated this.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:21">

Yeah. I agree. That makes a lot of sense. And, you're right that for some applications like say I
want to have some huge database of sentences that I can like do some locality sensitive hash to do
quick lookups in this vector space. That makes a lot of sense. Right? But even then, the particular
vector that you're going to use is going to have some extracted features that is a fixed, length
set. Right? And so like, however you pre-trained this is going to be focused on some particular
objective and hopefully it matches how you want to actually use it. I guess I feel like things like
Elmo or language models or something that gives you a vector per token is just inherently more
scalable to information content than a single vector. Right.

</Turn>


<Turn speaker="Sam Bowman" timestamp="35:08">

Yeah, I think that's right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="35:10">

Cool. one other thing I wanted to, pick on you for or at least have a discussion about is sorry, I
really liked this work. I'm, I'm not trying to be negative here. But I again am extremely skeptical
of leaderboards in general. I, I've, I'm on record, I recorded a podcast episode complaining about
them and how they encourage bad science. So what, why have a leaderboard and what do you think? I, I
think it's clear you've liked them. So why?

</Turn>


<Turn speaker="Sam Bowman" timestamp="35:40">

So we I, we had a, we had a long debate about this internally and I think they're a useful, evil,
maybe a necessary evil. I I completely agree that leaderboards do incentivize bad science, that
having this kind of conspicuous public number one spot incentivizes people to get that recognition
by doing a ton of experiments to try to exploit little quirks of the task of the benchmark to get
there at the expense of building experiments that actually allow you to answer interesting
questions. And so I think it does lead to these uninformative papers. At the same time, I think
having a public leaderboard prevents a couple of serious other kinds of bad science that we do see
in in applied machine learning in NLP. So one straight forward thing that it prevents by having this
public online platform with private test data is just the simple issue of overfitting the test set.

</Turn>


<Turn speaker="Sam Bowman" timestamp="36:42">

By having this online platform would make it difficult for people to evaluate more than a handful of
times on the test set. You can't look at the labels directly to analyze them. That makes the results
a bit more trustworthy. I think that that's the less serious issue. I think the slightly more
serious one. It's simply giving everyone the tools to make fair comparisons. One thing I've seen a
lot of as a reviewer is that the papers that dwell the most on reaching state-of-the-art performance
that are most motivated by this also tend to give the most misleading picture on what the state of
the art actually is. And so I think it is very useful, especially when reviewing papers and
evaluating existing methods to have a conspicuous public list of here's what works. Especially, and
this is what we're doing, a list that includes here are the perimeter rich models, here are the
small fast models. Here are the models that share a lot. Here are the models that don't. So before
any system that's being proposed, you can kind of look and straightforwardly see, all right, who
else has tried this and did it work? I think that's useful for eeping keeping us honest in these
conversations.

</Turn>


<Turn speaker="Matt Gardner" timestamp="37:43">

Yeah, I, I definitely agree that it helps you to know that you've evaluated things correctly and
like are in the same class of things. But you said that like as you're reviewing papers, people
might be led to what bad comparisons. I would say actually that the leaderboard encourages the wrong
kind of comparison because it's just someone built some architecture that got this number and, and
yes, I'm comparing against that number on the right metric on the right data, but actually it's not
a controlled experiments at all and I have no idea what gives me the performance gain over this
other black box method. And what we really need is like some controlled experiment where I run
things in the same setup switch one thing and one thing only and, and actually know what the, the
reason of this performance difference is. Does that, does that make sense?

</Turn>


<Turn speaker="Sam Bowman" timestamp="38:35">

Yeah. No, I agree that that's right. That is a real risk. I think it's, I think it is useful to have
these open comparisons on the question of just kind of what works in general, what collection of
strategies works. But I think for most of the questions people would use GLUE to answer cross paper
comparisons aren't going to give you good evidence on those questions. And I just have to hope that
the authors of these papers are taking this seriously.

</Turn>


<Turn speaker="Matt Gardner" timestamp="39:01">

Okay, great. Thanks Sam. This is a really interesting conversation. It's a really nice tool that
you've introduced. I hope people use it and gained some good understanding from it and a nice way to
compare on standard tasks. So it's a, it's a nice contribution.

</Turn>


<Turn speaker="Sam Bowman" timestamp="39:15">

Yeah, I hope so too. And thanks for having me very much appreciate having this podcast around.

</Turn>
