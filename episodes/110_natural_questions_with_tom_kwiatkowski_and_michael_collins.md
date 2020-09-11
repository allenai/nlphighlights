---
title: "Natural Questions, with Tom Kwiatkowski and Michael Collins"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Michael Collins","Tom Kwiatkowski"]
number: "110"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Welcome to the NLP highlights podcast where we talk about interesting work in natural language
processing. The hosts are Matt Gardner, Waleed Ammar and Pradeep Dasigi.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:08">

Okay. Today our guests are Tom Kwiatkowski and Mike Collins who are both research scientists at
Google and Mike is also a professor at Columbia University. Mike and Tom, welcome to the program.

</Turn>


<Turn speaker="Michael Collins" timestamp="00:18">

Thank you.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="00:19">

Thanks. Thanks for having us

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:21">

Today. We wanted to talk about natural questions, which is a dataset that you both were involved in
creating that was released, I guess about a year ago now. And we thought it would be nice to talk
about what this data set is and what has come out of the last year of research on it. So do you want
to start off by telling us what is natural questions?

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="00:40">

Yeah, so this is a dataset that we brought out. The focus is on question answering against a
Wikipedia. And I guess the novelty of this, you know, there are a few novelties in the test set, but
the reason it's called natural questions is that these questions are actually things that users
asked of Google search. And we think that's one novelty of the dataset. And the format is that we
take these questions, we find Wikipedia articles that we think might contain the answer. And then we
send the questions and those articles to annotators who will look for an answer in the document. And
we have two sort of definitions of answer. A long answer is just a block of text, typically a
paragraph that contains all of the information required for any person to sort of very confidently
infer the answer to the questions any showed, any person this piece of text along with the question,
they'd say, yes, I'm pretty confident that I know what the answer to this question is.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="01:36">

So that's a long answer. The short answer is just basically a span describing an entity or some
entities in that text which can succinctly also answer the question. So those are our definitions.
One of the most important things about dataset is that there can be either no answer on the page a
long answer but no short answer or both a long answer and a short answer. And we think that's quite
an important thing about this dataset because actually deciding whether there's enough information
on the page to really infer the answer is a hard thing and is a very natural thing that people do
when they're looking for information. So we would like our computers to be able to do the same
thing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:13">

So I guess fundamentally what you have then is a search query paired with a Wikipedia page and you
want to say where in this Wikipedia page is the answer, if anywhere, which I guess is pretty related
to say SQuAD, the Stanford Question Answering Dataset, which came out a few years before natural
questions with some key differences. But I guess in SQuAD we still have a question and we have a
paragraph from a Wikipedia page and we need to return an answer. So I guess, how would you describe
the differences or what your motivation was given existing resources? Why build this other one? What
was, missing that you were trying to capture here?

</Turn>


<Turn speaker="Michael Collins" timestamp="02:50">

So there are a couple of things. Firstly in SQuAD questions were written by people who'd read an
underlying paragraphs and then were making a question about that paragraph and so It's obviously
been an incredibly valuable resource but we were concerned about the priming effect there. And also
about the unnaturalness of questions with the person answering the question essentially who already
knows the answer to that question. We wanted to come up with a scenario where the person asking the
question had a genuine information need and wanted to know the answer to that question. And that I
think is going to, you know, lead to critical differences in the difficulty that data for example
concerning the degree of lexical overlap between the passage and the questions, the degree of
proximity between the passage and the questions. That's one key change that we had questions were
the users didn't know the answers. Another key differences is really that you know, we actually
think the problem of reading an entire Wikipedia page which can consist of many paragraphs and
deciding that there's not an answer on the page or identifying the paragraph that contains that
answer is probably the more challenging part of the natural questions task.

</Turn>


<Turn speaker="Michael Collins" timestamp="03:58">

If you're given a paragraph and told there is an answer in it, then extracting that short answer is
probably the easiest part of the process because at that point, and it's maybe more able to
shortcuts to be frank, statistical shortcuts. So we were very interested in the problem of actually
identifying which paragraph on a page contained an answer.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:17">

Yeah, that's great. That's a good summary. I and I totally agree with what you just said. What I
wonder still is what made you like what's your interest, your research interest in this particular
problem? Like what goal are you trying to solve in the end by encouraging systems that solve this
task? What do you think people will do?

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="04:38">

Well, you know, we are interested in systems that are useful to users and help people get the
information they're looking for. And so we do think that actually building, you know, on data which
is drawing from users who are looking for more information or more like is more likely to get us to
use full systems. So that is part of the motivation. Also, you know, we are just interested in using
this data to drive the state-of-the-art in natural language understanding for all the reasons that
Mike just mentioned. I mean we think that this is more challenging task than, many of the other
resources out there. But we also have a certainly higher level view on this, which is to say that we
do think that many of the greatest advances in NLP over the last decades really have been driven by
very real, you know, real world tasks.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="05:31">

So I'm talking really about machine translation, speech recognition here and we think that, you
know, while there's lots of really exciting work at the moment on trying to find challenged tasks
for specific phenomena. And map language understanding. It is also quite easy with those challenge
tasks to fixate on, I mean the specific phenomena and that may be sort of amenable to like focused
approaches that learn quirks of some annotation scheme we sort of think that actually having
naturally occurring data is less likely to be something that is just going to fit very simple
statistical regularities that occur in, for instance, you know, trivia question answering or
answering questions that have been written by an annotator who's very heavily primed.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:29">

Yeah. Yeah, those are good points. Well, I think we'll come back to this question of like targeted
phenomena versus end-to-end or some natural question distribution later on in the discussion. I
wondered, as you work at Google and there is like a one box response like where someone asks a
question and Google will try to answer it directly. I wondered if you had this in mind as you were
creating this. Like are you trying to like encourage research that would help Google do better, give
better search results? Or is that not really a motivation here? Is it more just basic language
understanding research?

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="07:04">

I think both of the above really. I think we would like to encourage it. We don't expect people to
build, you know, a system that we can use out of the box. There are all sorts of other requirements
when you're trying to build an end-to-end user system, but we would love to encourage fundamental
natural language understanding research, which would allow us to build better systems for sure.
Yeah.

</Turn>


<Turn speaker="Michael Collins" timestamp="07:25">

Yeah. I guess to add a little bit to that, yeah, I think there are two sides to it that we
definitely view question answering is a really, really useful task. It's many, many information
needs and actually pose this question. So you know, I'm personally very, very excited about that as
an end user problem, but I'm also excited about it because I think it is an amazing way to probe
models which are going to have to get into semantics and pragmatics and real world knowledge
eventually. And in some ways this dataset from our perspective was the first step in this direction.
But there are many things we would like to do in the future using it many ways we'd like to build on
top of it. And I think in getting real user questions and seeing the distribution of answers that we
would get from annotators and so on, it actually uncovered a lot of interesting properties of
questions which hinge on really core, semantic and pragmatic phenomenon.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:14">

Yeah, yeah. That's great. Part of why I asked this question is I've seen Fernando Pereira talk a
bunch about retrieval as like why it's a fundamental and like the perhaps the fundamental NLP task
and he's got some really compelling points and I can totally understand why this might drive your
research, which is good. I'm not trying to complain about this at all. So I think we've talked
enough about like, I guess the reasoning behind natural questions. We should probably move to
talking about what it actually is. Some more details about how you created this thing. We've already
said that this is a query entered into a Google search box paired with a Wikipedia page. What else
can you say about how the data was actually collected and what it looks like? What else is there
that someone should know?

</Turn>


<Turn speaker="Michael Collins" timestamp="08:59">

So it was a fairly info process. We came up with some annotation guidelines. We kind of crowdsourced
the annotations as Tom was saying, they have to select a long answer if they can find one on the
page, the short answer where appropriate. There are also Boolean questions, which are yes, no
questions, which maybe one set of the original dataset. But then we had a follow up release the
boolean questions, which was the largest set, the development and test data we had five-way
annotations. Because we found that we thought that our evaluation would be much more robust if we
started to pool annotator resources. Actually for a portion of the data. We got 25 way annotated
data that led to some interesting results in that we were curious about getting upper-bounds or
estimates of upper-bounds of performance on the task.

</Turn>


<Turn speaker="Michael Collins" timestamp="09:44">

And one thing we found, which is, I mean it's fairly obvious in hindsight if you just do the
analysis is that just taking a single user and a single random user and evaluating their accuracy, I
guess not five-way annotations greatly under performs taking ensemble of 20 humans where you are
essentially getting closer to the base optimal hypothesis. We should do something optimal under the
conditional distribution of answers given the input. And so yeah, we kept the computer super
annotator upper bounds which we've used the correct upper bound for the task in the paper. We also
did some expert evaluations of quality and I think we found around 90% of the answers we thought
were good. One interesting offshoot of that. Was there [was] a good number of questions where the
answers are essentially correct but reasonable people could quibble about the correctness of an
answer.

</Turn>


<Turn speaker="Michael Collins" timestamp="10:37">

And I think that actually future research might be a particularly interesting topic and that there
are nuances, there are conditions under which an answer is correct it's natural for human to say,
well if by this he meant that then this is the answer. If by this part you meant that this is the
answer, all kinds of pragmatic effects are coming in here where you have to sort of make a best
guess as to what a user is referring to in a question.

</Turn>


<Turn speaker="Matt Gardner" timestamp="10:59">

Do you have any annotations of that kind of stuff?

</Turn>


<Turn speaker="Michael Collins" timestamp="11:02">

We have evaluations where we categorize answers as you've being wrong unequivalently correct or
correct but debatable and by debatable we literally meant the four of us so called experts could sit
around and have a lively discussion for a few minutes about whether something was correct or not.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="11:21">

If the question is who was the first person to see the earth from space and there's a document
saying, Yuri Gagarin was the first person in space. Some of the experts basically Mike had an issue
with this because he didn't know if Vostok 1 had a window, which is a very, it's a resonable quibble
once you raise it. Right. But that's, so that is something where we'd say, yeah it's probably
correct. Most people would quite like to see this answer but actually there is, there is a
reasonable doubt in maybe if we really wants to nail this down. You would want to go and sort of see
a photo of the Vostok spacecraft.

</Turn>


<Turn speaker="Michael Collins" timestamp="11:55">

Or to go deeper is space and outer space, are they the same thing? Seriously. This is the kind of
thing that comes up all the time in these questions. I mentioned this to Fernando and he started
talking about parabolic flights. I think the early days is sort of exploration and you know, how
high do you have to get up to be in space.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="12:16">

Was there anything surprising about when you did the analysis and looking at, you know, precision to
what extent people are consistent?

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="12:25">

The thing that really is surprised me was working out that there was this category of correct with
the data or things, right? So, you know, when we were collecting the data, we did, what people will
often do is we got some crowdsources, we looked at their annotations, we got everyone to label the
same things, and we did some inter annotator agreement. And you know, the numbers didn't look great
and we were actually hiring these people. So we sort of gave them more training materials and we
gave them more feedback and the numbers looked better but they still didn't look great. And you
know, we just keeping looking at these inter annotator agreement and the numbers, we were looking at
the stuff coming back from them and they look great. But the inter-annotator agreement was pretty
low. So that was when we all just sat down.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="13:05">

We said, okay, we have to go through these things. And we realized straight away, you know, after a
long meeting where we were actually getting two examples that fundamentally that Mike and I would
argue for 20 minutes about one example and just disagree, right? And you know, we'd like to think of
ourselves as reasonable people. So at some point we realized that there is this category of things
where there are just multiple interpretations. So that was very surprising. The other thing that we
observed that sort of might mention the super annotation number and I really do think that's an
important thing that we came up with in this paper is, you know, it's often in these tasks, we often
talk about human performance and you know, then sometimes computers get superhuman performance that
can lead to, you know, all sorts of breathless news articles and things.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="13:56">

And people ask me, do you really think your computers should be superhuman understanding language
and that's not even remotely what we are talking about. Right? The computer can be superhuman at
this task and should be because reading an entire Wikipedia article is hard and it's kind of boring
sometimes and depending on whether you care about the topic. So humans get bored, right? They get
bored and they have to have often quite low recall cause they just give up. They say, I don't see
any answers on this page, but our computers shouldn't get bored. Right. So that's the other thing we
sort of observed, we said, okay well we got to a point as Mike said, where we are looking at the
things that people were getting sending back to us, the annotators were sending back we said, well
90% of these look really good to us, but their recall numbers were way lower because people would
often give up. So you were asking about precision, you know, anything we saw in this data, that's
the thing we saw is like, it's fairly easy to get very high precision from annotators, but regal,
maybe not. You sort of have to let and hunt sometimes. And in that case you have to get multiple
annotations, certainly for eval.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:01">

So can you tell us more about how you decided if a particular query was a question that should go
into the data?

</Turn>


<Turn speaker="Michael Collins" timestamp="15:07">

Just a set of heuristics really, which we're looking for. Wh questions. I think that was one of the
main ones, right?

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="15:15">

There was a lens, there was a lens cut off. We wanted things to be interesting and one of the
easiest ways we got that was to just say it should have any saying words, things with wh question.
Start with a wh word, like what were when, these sorts of things. Things that had multiple mentions.
So now have a query. Sometimes we get very long queries coming into Google, which just like word
salad, which often ever have multiple entities named in them. They'll be quite structured. These
heuristics are listed in the paper and actually could be replicated by anyone externally. They're
very simple heuristics actually and the reason we chose them to be as simple as so that anyone could
replicate them, of course you don't have access to a huge number of Google search queries, but we
don't want to, we didn't want to be reliant on any sort of, you know, funky question classifier that
no one else could build.

</Turn>


<Turn speaker="Michael Collins" timestamp="16:03">

And the piercings we assigned would be high recalls because the annotators could actually mark
things as not being not a valid question. And so I think the paper has some analysis where post-talk
we looked in and tried to see if there are questions we missed and we got most of them.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:19">

Yeah, I remember that. In your paper there's like one example of a why question, but when you have a
random sample later in the paper with a bunch of examples, they're basically no questions like that.
I ask about this because it's asking why something happened is very different from asking like a
factoid kind of question. And I wonder if you know like what percentage of the data has this like
requires a longer answer or this like why kind of explanation.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="16:46">

So I can't say specifically why. What we can say is you know, of the data, you know, as we both
mentioned, many of the questions don't have an answer. So this, you know, somewhat thing over
300,000 examples I believe about half of those have a long answer. And then about 35% of the full
data has a short answer. So 15% of all the data has a long answer then a shorter answer so, you
know, someone has gone to the work and said, okay, the information is here, but it can't be
succinctly answered with a short piece of text. So some of those will be why questions? I certainly
not all. Why questions?

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:27">

Does that number include yes, no questions or do yes, no questions have short answers

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="17:31">

That does not include yes, no questions actually in the original dataset. Yes, no questions. Were
only about 1% of the data.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:38">

Okay.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="17:39">

There was a follow up piece of work called the boolean questions where we all sample those.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:44">

I imagine it's a lot harder to get agreement on the long answers. Have you seen that multiple long
answers tend to be unequivocally correct?

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="17:55">

Yes. So we tell people to take the first one on the page, but the answer is yes. You know, sometimes
the same information is just repeated multiple places on the page. So it's not always the case. You
know when, where there are multiple short answer. Sorry, multiple long answers that this is like an
ambiguous question and there's opinion. Sometimes they are just repeating the same information.
Having said that, we do ask them to take the first on the page that pretty good at it. In the paper
again we have some analysis of actually how many of the examples will have multiple long answers and
it's relatively few and it's very rarely more than two.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="18:31">

Gotcha. Yeah. I imagine it's a little hard to like it is easier to say we want the first answer but
it's harder to say when to stop because you could take only the first two sentences or you could
take the entire paragraph cause it's often quite related.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="18:43">

Oh no. Sorry. So the long answer is actually an HTML bounding box. So the annotation tool that we
gave to people only let them click on like the full paragraph.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:52">

Yeah, that's a good way to get the higher agreement cause I can imagine lots of variation if you let
them select arbitrary spans.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="19:00">

And that is a thing that we saw a bit more in the short answers. Right. And our inter-annotator
agreement goes down a bit on, on the short answers.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:08">

Fair enough. I think my, my last question on like trying to understand what's in this data. I have a
way of thinking about these reading comprehension datasets of like what, what kind of phenomenon or
linguistic phenomenon they're targeting. So I think of a question as SQuAD like as basically you
need to find a paraphrase of the question in the paragraph and then extract an argument and that's
basically it. Then there are other datasets like DROP where you like you have to do something much
more complex to answer a question. I wonder what percentage of the natural questions do you imagine,
and you might not know the answer to this, but like how often is it just like simple paraphrase,
finding an argument extraction like SQuAD. Do you know

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="19:53">

You know, one thing to note is that the input format is very different the task is very different.
So, natural questions. There are a few decisions that the system has to make it first has to decide,
you know, is this question answerable and is there an answer on this page? And if so, which is the
paragraph once it's decided that, you know, then you decided is there a short answer here and then
you know, once it's made those decisions, it says, okay, I think there's a short answer here that's
as it were when the model actually has to extract the short answers. So it certainly is the case
that if we train models if we say, okay we're going to throw away all the data that doesn't have an
answer, which is half the data, right. And deciding whether or not to answer is I still believe I
actually really one of the hardest tasks for our current systems because they love to guess they
love to do word matching and they think, Oh, there's some good paraphrases here and lets just guess
at it.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="20:42">

Right. so deciding whether to answer is sort of the hardest thing. You know, the system also still
have some way to go in terms of finding the paragraph. Once you get down to something where you know
there's a paragraph that contains a short answer, extracting the answer is definitely a much easier
task. But again, because the questions are not sort of written by annotators being primed by the
paragraph even if it is just paraphrase, finding, it's often much harder than the stuff you seen
SQuAD which is honestly the, you know, very loosely paraphrasing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:14">

Right, right. Yeah. I guess I'm not trying to like trivialize natural questions and make it more
like SQuAD. I'm just trying to understand what you need to do to answer the questions and definitely
finding the answer is different. I, or sorry, finding whether the question is answerable. I know
like there's, there's Doctor QA and document QA, a bunch of systems that will like take a whole
document, a whole Wikipedia page. They did this with SQuAD in fact, where like, you take a question
and you try to find which paragraph, if any, has the answer. And then answer it that way. I guess to
try to answer my original question. You could imagine taking a system that was trained on SQuAD and
evaluating it without any other training on natural questions given the original paragraph like it
assuming for all the questions where there is a long answer, see if you can recover the short answer
and then that would get at my question at least a little bit.

</Turn>


<Turn speaker="Michael Collins" timestamp="22:07">

Again, we think that identifying the short answer once you know the paragraph contains an answer we
think that's probably not the most interesting part of the task.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:14">

Okay.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="22:16">

Also, to answer your question that's a very good suggestion Matt. I have, we have not ever done
that. I don't know why we've never done that. I would suspect that it would do pretty badly. I'm
going to throw my hat into the ring and say, I think that would do pretty badly. I think I do know,
I do know that people have used SQuAD as extra training data to get a little gain on natural
questions which is nice. But I think just training on SQuAD, I would guess that it would not do very
well.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:43">

It especially like the earlier models that were just trained on SQuAD and with no pre-training cause
they're going to be very, very heavily affected or influenced by the, very trivial lexical overlap
and a lot of the SQuAD questions. But something that's like that has Roberta and then was fine tuned
on SQuAD to do the argument extraction. Maybe it would be a little more, a little more robust to
paraphrase, but

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="23:03">

Yeah. Well well I, you know, I encourage you to try it or maybe we will, someone should do it. Yeah.
Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:10">

Cool. Yeah. And I guess I'm, again, my whole point here is just trying to understand like what do
you need to answer these questions? And to Mike's point, it sounds like at least Mike thinks that
the questions themselves once, you know, the long answer are relatively simple argument extraction
questions that if you think that task is easy, that's probably what you mean. Cause I can think of
plenty of questions for, like DROP questions for example, we're given a paragraph and a question.
It's not at all trivial. It's not a simple argument extraction. I wouldn't expect a system to just
do really well given the paragraph itself.

</Turn>


<Turn speaker="Michael Collins" timestamp="23:47">

Well remember that for maybe a quarter of our cases they don't even pick a short answer because it's
not possible. So those are probably the cases where something more is needed. But the, yeah, for
three quarters of the case where they pick a long answer, there is a short answer and those are
probably more extractive entity style answers for sure.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:08">

Great. So it's been a year since natural questions was released and what has happened since, do you
want to tell us how things have progressed, how happy you are with the progress? What do you think?
And I guess I'm specifically asking about like modeling stuff on this data.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="24:24">

Yeah. You know, there's been some activity on the leaderboard. The numbers have gone up quite
significantly. There's still a bit of a gap to what we think is possible. Many of the things that
have improved numbers have been, you know, bigger and better pre-raining. It is 2019 after all. And
there have been a few sort of different dataset specific things and particular there was some quite
nice work from IBM last year, which sort of trivialized itself by calling itself Frustrating the
Easy Natural Question Answering. But what, you know, what they did in that paper was essentially
they using these large pre-trained language models, as with everyone else that have a number of
quite nice modifications where they have some architectural modifications but also have really
worked out how to represent a document.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="25:17">

Right. So one of the issues that we have with our current huge retrain language models is you can't
actually fit an entire document into whichever accelerators we want to use and you have to some
slices it up in some sort of way and deal with those slices afterwards. So that has been one of the
biggest things that has come out in the last year is saying, well, how can we represent an entire
document by chopping it up into pieces and then aggregating predictions. That's one thing. Another
thing that has been quite important for this task, and I think we are still working on it, just
working out the sort of how to calibrate the models work out whether or not to answer. And so I
think there's been some nice gains coming from basically better ways of doing negative sampling.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="26:03">

One of the ways to calibrators you know, how many like answerable things you show and how many
unanswerable things do you show, right. Where there's been some stuff there that's sort of modeling
side. There have also been some follow up sort of data that stuff. So we mentioned that there's a
followup dataset focusing on the yes, no questions. And the interesting thing there is that that
actually is much more like a natural language inference task, right. Because someone's asking, you
know, some basically says a statement and says, is it true that someone says a statement and, and so
basically it becomes a sort of a entailment finishing task. I'm sure I'm missing things. Mike, do
you have other things?

</Turn>


<Turn speaker="Michael Collins" timestamp="26:48">

Not that I can think of. I think, you know, I think to flip that question around, I think I could
talk a little bit about what I think could be some really exciting directions in the future. And I
think in some sense that the neural say transform the base models work quite well on this task
although they are not up to human performance yet, but there is everybody's criticism that black
boxes that we don't understand and they are very likely picking up on a lot of spurious correlations
or statistical shortcuts to getting the correct answer. So somehow getting a better handle on that
problem. How do we build models where we can interpret what they're doing and where they are doing
something that is closer to the causal structure of what's really going on in language and how do
they prove that they're really doing that. How can we really build models that are robust
interpretable and understandable? I think that that is going to be a huge, huge problem going
forward.

</Turn>


<Turn speaker="Matt Gardner" timestamp="27:42">

I definitely agree.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="27:44">

Yeah. Just sort of a belief, they haven't looked at predictions that the current models are pretty
good at sort of identifying things that look like pretty valid answers, you know, really could be
valid answers. And then then guessing, right the question will be something like, you know, who
played Batman in Dark Night Rises and they'll find the page, we'll talk about someone playing
Batman. Right. And the model just thinks that's enough, that's enough. Like this is the, this is the
actor's name. And we will just choose to ignore half the question. Right? So our current model love
to do that. And which is funny because it's kind of in some ways the opposite of what people do
where they're much less good at recall. They get bored reading an article, but I'm are quite good at
precision, actually understanding, okay, like no, this is the wrong thing that's been talked about
here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="28:35">

But I guess if you're assuming a decent retrieval system that probably gives you the right, assume
that the question is answerable given the right paragraph on the web. And I can retrieve probably
the right paragraph for you. I guess you can understand why current systems do that because you are
pairing them with a plausible Wikipedia document, right?

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="28:56">

It's a plausible one. It's not always the correct one. And also do remember that our definition of
correctness is not just that it has to be the right answer, right? It's that the paragraph has to
contain all of the information required for anyone who maybe doesn't even know about this topic to
fully agree that this is the right answer. Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:15">

I see.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="29:16">

So sure. I mean, if the paragraph was talking about the right actor, but it might not be talking, it
might not even mention the movie. Right? So, you know, do we know that that's the right answer under
our definition of correctness, that's not a good answer.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:32">

Did you, did you evaluate that? Like how often does that happen? I'm imagining like in that, in that
exact case would the long answer actually the, as the paragraph that just says Batman and not Dark
Night,

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="29:44">

Sorry. So the long answer would not be given if it doesn't have all of the information required.
Right. Under our definition. So,

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:51">

Yeah, under your definition, right, I'm just wondering about the actual annotators, how they applied
that definition. Cause it seems hard to get people to agree there. Like, I can imagine myself as an
annotator selecting that paragraph.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="30:05">

I mean, that's our definition. And as Mike said earlier under that definition, we got 90% backers
according to ourselves. And we are pretty strict. Like that 10% had some, you know, had some correct
answers in it like what by which I mean, the answer most people would have been happy with it, but
under our definition, yes, 90% of it was correct. We, you know, we were lucky to have a pool of
dedicated annotators who we actually managed to work over an amount of time to train them to get use
to this definition.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:34">

Great. So Mike, you mentioned like what kind of research you would like to see and I agree, but I
would ask a more specific question. What, kind of research would help us actually solve natural
questions maybe to pose this another way? What, what's missing, what's not being solved and what is
needed to solve it?

</Turn>


<Turn speaker="Michael Collins" timestamp="30:52">

That's a great question. I mean I feel that to really solve these kind of tasks we not might be
models that really need to keep track of discourse structure, the set of entities and references in
a domain and the set of propositions in the domain and how they're linked to each other. Maybe
national questions is solvable without going all the way to that. But if that's the case, there are
going to be tasks that build on top of data, like natural questions like conversational systems and
so on where we can push models towards having to do that. Because having models, which aren't really
keeping track of entities and discourse and the propositions outlined, and discourse seems
problematic to me. I don't think these systems are really understanding language.

</Turn>


<Turn speaker="Matt Gardner" timestamp="31:38">

I definitely agree with you on that point. I wonder though about natural questions because you're
assuming that I have a single paragraph that has all of the information needed to answer the
question. And so doesn't that assume that I'm not going to have discourse that connects it to
previous parts of the document.

</Turn>


<Turn speaker="Michael Collins" timestamp="31:56">

Yeah, but even the disclose effects within single paragraphs can be fairly significant. Right, co-
reference bridging imply documents everywhere. One interesting experiment is just take a sentence
out of context and Wikipedia and see if it makes any sense, see if it's interpretable. You will see
that there are all kinds of referential effects and implied arguments about the things in there.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:25">

Yeah. Great. I guess my last line of questioning here you mentioned in your paper about like what,
and we talked about this earlier, so like what is a benchmark, a good benchmark for natural language
understanding and if we solve natural questions, do we understand language?

</Turn>


<Turn speaker="Michael Collins" timestamp="32:45">

It's a good question. We were trying to come up with a good benchmark for question answering and I
will say that I think it will push research and semantics and pragmatics but it certainly wasn't
meant to be the final story on testing natural language understanding for me the test of real
natural understanding is that the Turing test, right, if it wants, a system can have a conversation
with me and really interact with me the way human would then I think it would fully understand
language but we may have to build all kinds of tasks on the way to that. And you know question
answering is one of them I guess.

</Turn>


<Turn speaker="Matt Gardner" timestamp="33:20">

I guess you say question answering like it sounds like what you mean when you say question answering
is open domain give me a search bar and have me answer a question.

</Turn>


<Turn speaker="Michael Collins" timestamp="33:30">

There are going to be many variants. Yeah. This is just one variant and there are many all of which
are interesting. which are different, it's actually it's, yeah I think it's a mistake to lump them
all into the same category. That's part of the problem. Machine translation, speech recognition of
fairly well defined, you know, task which or you say it is clear what you mean. Question answering
actually lumps in a lot of, some are related but also rather different tests.

</Turn>


<Turn speaker="Matt Gardner" timestamp="33:55">

Yeah, I guess an alternative approach, one that I am pushing in my research agenda quite a bit so I
am a little bit biased here but is you can use questions to probe whatever you want and you're using
it to probe,ctually you're not using it to probe much, you're not using it as a probe I think it's a
totally different approach. And I, and I liked the, I like this approach and I think it's good to
distinguish between them. They're both useful where I'm trying to say does the machine understand
say co-reference for instance you talked about entities and stuff and like can I design questions
that really, really probe this. Whereas you're saying I have people asking questions, can I answer
them? And I wonder what your thoughts are on like what's the I, it's, I don't know that I would say
either way is better, but do you have any thoughts on like which one of these is like possibly more
fruitful in pushing natural language, understanding research?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="34:48">

I think the question answering like a definition in national questions is trying to assess, you
know, the question answering as a task that humans ask that like an actual information need and it
is an important task and it's all right. I think what you're doing, Matt, is also important for
helping us as natural language researchers, you know, address these various linguistic questions
that we care about, but we don't necessarily know how to define a task around. So defining it, like
framing it as a question answering problem makes it easier for us to get annotations and reuse some
of the models that we know already work well for question answering. So it feels like they're very
orthogonal.

</Turn>


<Turn speaker="Matt Gardner" timestamp="35:35">

Yeah, I'll give a better posing of what I was trying to say, which might help clarify some things.
It's like, so natural questions is great. The question that started this was like if we solve
natural questions, have we solved language understanding? And I guess the thing that I think about
is like what would a linguist want to see in order to be convinced that the machine understands
language given some natural questions result? Like what would have to change about natural questions
in order to really be convincing in this regard.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="36:06">

Yeah. And that question repeat sort of what Mike said. I don't think there's any results on natural
questions that would make me feel that the machine understood language. And I'm not sure that we
need a linguist. I think we just need someone who speaks the language. And as Mike said, I think the
task is getting them to speak. I mean, getting the computers to have this conversation for instance.
We're very far from that. You know, I think it also is very useful to have linguistics, you know,
help us understand ways of probing our models and understand ways and sort of working out, you know,
what do they and do they not capture and Mike also talked about many of the, phenomenon that we
think will be very important for natural questions.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="36:44">

I think in parallel it would be amazingly good to have linguists help us understand, you know, to
what extent the models are actually capturing these phenomena. I'm sometimes a little bit wary of
probing tasks where one also trains on the same probes, same source of probes that are being used to
look into the models. Right. Because my only concern is that it's so hard to get annotators to do
this in a very diverse way, these probes done in a diverse way. So I sometimes do worry that when we
ask the annotators to write down pros for certain phenomena, they're going to fall into the habit of
just using the same pattern over and over again. And the second that we train on those things, I'm
models have such high capacity, they can memorize those patterns in a second. So that is something
where I'm a little bit more skeptical. But in general I think linguistic probing tasks are great. I
strongly encourage people to work on them in parallel working on other sort of more general tasks
like natural questions.

</Turn>


<Turn speaker="Matt Gardner" timestamp="37:46">

Fair enough. Yeah. I completely agree with what you say about picking up on biases in the training
data sounds like we're basically in agreement on this point.

</Turn>


<Turn speaker="Michael Collins" timestamp="37:56">

But coming back to what might be convincing in terms of whether the machine can really understand
language. If we come back to that Yuri Gagarin example, you know, who was the first person to see
earth from space, you know, system which came back to you and said, well if by space you mean out of
space, then this guy went up in this thing and you could look at it, you could see it as a window
there. I know last year I found this quote where he says, actually there is some quote on the web
where he says how amazing it was to see the earth, you know, something, was actually conversational.
But then it would say on the other hand, it's also arguable that this is a notion of space and in
that case parabolic flights might've made it, you know, that would be, that seems very, very far
off. But that would be an amazing, a demonstration of real natural language understanding. Right. So
at the moment, I think we're still at the early stages where we're just sort of getting back
snippets or paragraphs, but I hope we can start building towards these more sort of sci-fi
scenarios.

</Turn>


<Turn speaker="Matt Gardner" timestamp="38:56">

Yeah. Great. Great answer. Okay, I lied. One more question. Is there anything that you would've done
differently if you could go back and build natural questions again?

</Turn>


<Turn speaker="Michael Collins" timestamp="39:06">

I think this is not well understood, but I do wonder if there's some way we could have up sampled
and down sampled certain portions or stratified samples in that you, there are quite a lot of
questions about entertainment like, who played this role in this movie and you know, we probably
could've annotated less of that and more interesting stuff. You know, active learning is one way of
doing that, but it's very dependent on the model you're using and beyond that, I don't actually know
of a good particularly good way of getting a theoretical handle on how to do that. Well. Yeah, I
think there are plenty of interesting questions there. So you, we wanted to follow the input
distribution, which I think was the sort of default decision and it was an okay decision, but I
think exploring out little turns would have been interesting.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="39:53">

Yeah, I mean I think that would be good. It's very hard to do. It would be also very hard to do that
without destroying the fording again in the devices though and since you mentioned entertainment
questions, I mean some of the entertainment questions are the ones that to me personally are the
most boring. But from a linguistic perspective can be fascinating because when people ask about the
plots of certain say Operas that have been running for 20 years the, I mean the discourse structure
is insane you know, everyone's been in a relationship with everyone else. And the question is, you
know, which time is being asked about. So some of these things, you know, maybe topically, lots of
interesting, but to actually to some of us but can be very linguistically interesting.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="40:43">

Other things, I mean, you know, just talk about Mike mentioned active learning. I mean, I think
another thing that maybe we're moving towards as a community, which I think is a good thing is the
idea of fast iteration on these datasets. I think we sort of came out of an era in which there were
like these big benchmarks that people have been working on for, you know, decades in some cases. And
I think that's great. And we learned a lot from those things. And there has been some effort to sort
of build the benchmarks for the next decade. And you know, I would love it. Well actually I wouldn't
love it if people were working in natural questions in a decade. I hope we're doing much more
interesting. I'm not saying it's not interesting right now, but I hope, I hope we're sort of doing
other things in a decade. But this idea that, you know, maybe if we don't go all the way for active
learning but we sort of iterate with the community more quickly and okay look we're going to do
something this year. Maybe it's not going to be so big. Maybe it's not going to be so well honed,
but we're going to get feedback, see what people do and then we integrate that feedback and see waht
version two looks like.

</Turn>


<Turn speaker="Matt Gardner" timestamp="41:46">

Have you thought about what might come next? Like what is, what would a version two or a harder
version or a next step look like?

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="41:54">

One thing I can say is that there's been some very exciting work recently. The user's natural
questions also has some of its use other datasets. The natural question seems to be the most widely
used one on question answering where you don't have access to the document. And so there's stuff
from Hannah Hajishirzi's group at UW, and Danqi Chen at Princeton include other people so at Google
and I'm sure I'm missing other people, but have been working on this open domain question answering
thing where the input is just question and you have to spit out an answer. And I find that very
interesting because you know, it sort of is wide open as to how you do that, some of these
approaches are retrieval based, but also there've been more recent stuff including from Google and
some approaches which just a generation models, you know, you just read the question and generate
the answer that's the 2-5 model. Google Brain. And so there's a whole load of stuff that one can do
there. And I think that was an exciting actually next step. And I think it's probably a lot less
amenable to some of the sort of statistical regularities the we sort of see the models latching onto
on the Google comprehension task.

</Turn>


<Turn speaker="Matt Gardner" timestamp="43:12">

Right. Great. This has been a really fun conversation. Any final thoughts or things you really
wanted to talk about that we didn't get to?

</Turn>


<Turn speaker="Michael Collins" timestamp="43:20">

I think we covered a lot of ground.

</Turn>


<Turn speaker="Matt Gardner" timestamp="43:22">

Great. This is fun. I'm looking forward to the next year.

</Turn>


<Turn speaker="Michael Collins" timestamp="43:26">

Yeah, thanks very much. Thank you.

</Turn>


<Turn speaker="Matt Gardner" timestamp="43:27">

Thanks for coming on.

</Turn>


<Turn speaker="Tom Kwiatkowski" timestamp="43:28">

Thank you so much for having us. Thanks.

</Turn>
