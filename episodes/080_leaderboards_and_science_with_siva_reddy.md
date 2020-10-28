---
title: "Leaderboards and Science, with Siva Reddy"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Siva Reddy"]
number: "080"
tags: []
description: "Originally used to entice fierce competitions in arcade games, leaderboards recently made their way into NLP research circles. Leaderboards could help mitigate some of the problems in how researchers run experiments and share results (e.g., accidentally overfitting models on a test set), but they also introduce new problems (e.g., breaking author anonymity in peer reviewing). In this episode, Siva Reddy joins us to talk about the good, the bad, and the ugly of using leaderboards in science. We also discuss potential solutions to address some of the outstanding problems with existing leaderboard frameworks.

Software platforms for leaderboards: http://codalab.org/ https://leaderboard.allenai.org/"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F566698206&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

All right. Today our guest is Siva Reddy, Siva is a post doc at Stanford University working with
Chris Manning. He's been there for about a year and a half. Before that, he was a PhD student at
Edinburgh working with Mirella Lapata and Mark Steedman. He's done a lot of work on semantic parsing
and question answering kinds of things, including most recently the CoQA datasets, conversational
question answering Siva, welcome to the program.

</turn>


<turn speaker="Siva Reddy" timestamp="00:35">

Thank you.

</turn>


<turn speaker="Matt Gardner" timestamp="00:36">

Today we wanted to talk about something that's been on my mind a lot recently. We had a brief
conversation with this with Sam Bowman in a previous episode where Sam was talking about GLUE and
how there was a leaderboard for GLUE. Today we want to tackle this issue of leaderboards a little
more broadly and what's good about them and what's bad about them and Siva a very kindly agreed to
come and talk about this with me. So Siva, what gets you interested in leaderboards? What experience
do you have with this?

</turn>


<turn speaker="Siva Reddy" timestamp="01:02">

First of all, I should clarify that I'm not the expert on leaderboards, but I did some research on
leaderboards. The main reason was we recently released a data set called CoQA. This is a joint work
with Danqi Chen and Chris Manning here and this is a question and answering data set and it's very
similar to SQuAD, but the main differences that you're having a question answering in a
conversational style and we wanted to have a leaderboard to track progress on this dataset. And when
I visited Irvine you thought I had some good points on what is good and bad about leaderboards So
here I am.

</turn>


<turn speaker="Matt Gardner" timestamp="01:34">

Yeah, I guess I was pretty negative. I've been pretty negative about leaderboards. And you brought
up some good points that I hadn't thought of before, so I thought this would be a good conversation.
So do you want to tell us what you found out in your research about leaderboards? First off, I guess
we should clearly define what a leaderboard is. What are we talking about here?

</turn>


<turn speaker="Siva Reddy" timestamp="01:50">

Yeah, a leaderboard is nothing but a table with some set of results. So if you see the evolution of
leaderboards, they first came through games and the, I could pinpoint to this evidence that Space
Invaders had the first leaderboard it was created in 1978 and the leaderboard has just top 10
players and because there are memory issues there, they just had three categories each.

</turn>


<turn speaker="Matt Gardner" timestamp="02:13">

Wait, wait, wait. So Space Invaders. are you talking about an arcade game. So the arcade machine had
a leaderboard, is that what you're talking about?

</turn>


<turn speaker="Siva Reddy" timestamp="02:21">

That's right.

</turn>


<turn speaker="Matt Gardner" timestamp="02:21">

Okay, I was wondering like 1978. How do you get like a global list of who's the best? But you mean
like per per machine? There's a leaderboard. Yeah, I remember those.

</turn>


<turn speaker="Siva Reddy" timestamp="02:31">

Also the main reason they introduced these here, the retention rate, they found that when you have
your boats more, more and more people, the same people come and play. And I agree on that. Like I
used to have this video game, a snake game and also a brick game where the leaderboard just had top
three in these. And I used to play with my sister. I was pretty good at it. So once in a while my
sister used to beat me and get on top of the leaderboard and that pissed me off and then I play a
lot. So it a, it was quite interesting.

</turn>


<turn speaker="Matt Gardner" timestamp="02:58">

So what telling us that the leaderboards that we have in NLP these days come from retention efforts
in games. So we're trying to game NLP, is that what I'm hearing?

</turn>


<turn speaker="Siva Reddy" timestamp="03:07">

You could call it that, we want to have high retention rates of our datasets. Particularly these
data sets are very expensive these days. So you want people to work on them. It's not like you
created a data set and you publish one or two papers on that and it's done. The best example I think
for the evaluation of leaderboard in computer science I would say is ImageNet challenge. So in 2010
Fei-Fei Li and colleagues here, they started the ImageNet challenge. It's a challenge of word object
recognition and if you see in 2012 AlexNet came and then that's where, that's where the deeper
evolution came from. And we could pinpoint to this particular time point and I think like people
notice this result. I would say to some reason because of leaderboards, everybody know that they
could trust these results and in NLP I think the most famous leaderboard is Stanford Question
Answering Dataset and you could clearly see that you could track progress on what's happening in
these datasets when you have a leaderboard.

</turn>


<turn speaker="Matt Gardner" timestamp="04:06">

So let's be a little clear here. What's the difference between what Stanford and ImageNet, like the
Stanford Question Answering dataset, what SQuAD did and what ImageNet did versus table and paper
that lists the current best result? What's, what's different here?

</turn>


<turn speaker="Siva Reddy" timestamp="04:21">

Yeah, there are many differences here. Like a leaderboards, I would say you could call a paper in a
table, a leaderboard and the difference there would be you're comparing only, it's a very controlled
experiment in a paper and you're comparing probably your own systems with each other and also a few
other systems. In the case of ImagineNet it was set up where you could upload test results. So
you're given test data and then you're going to upload the, your predictions and your predictions
are being evaluated on ImageNet challenge. And the difference with the Stanford Question Answering
dataset is that you have to upload a model file and this model file is done on the test set and
nobody could ever see what is in the test set. In the case of ImagineNet you could still see what is
in the test set, but, and Stanford Question Answer dataset you cannot see and I think that has some
advantages and also disadvantages.

</turn>


<turn speaker="Matt Gardner" timestamp="05:11">

Yeah. So I guess we can distinguish a few different levels or kinds of what you might think of as a
leaderboard kind of thing. The simplest one is as, as we mentioned earlier, just a table and a paper
a little bit better than that is an aggregation of several papers. So there's this recent NLP
progress website that tries to have crowdsource and aggregation of a whole bunch of results for a
lot of different tasks. You can think of that as a kind of leaderboard. Then there's also but, but
those are just like someone ran some experiments and reported results and I'm, I'm taking numbers
and putting them together to make it easy to find this stuff. And then that's qualitatively
different from what you were just talking about, which is something that has a hidden test set that
I need to evaluate on and there are a couple of different versions of that one. Only the labels are
hidden so someone can run on the test data, the inputs for the test data and then send their
predictions to be evaluated against the gold labels. And then the other one is the test data itself
is also hidden. And so I need to submit code that will run on those inputs and then be evaluated on
the hidden labels also. Right. Did we miss anything there? The, I would say those are like four
different kinds of leaderboards.

</turn>


<turn speaker="Siva Reddy" timestamp="06:21">

Yeah. So in the case of NLP progress, I think first of all it's a great initiative and I have been
looking into different problems and I could clearly find what I want sometimes. so I would say it's
a great initiative. We could talk about different pros and cons of these leaderboards I would say.

</turn>


<turn speaker="Matt Gardner" timestamp="06:38">

Which one do you think is best?

</turn>


<turn speaker="Siva Reddy" timestamp="06:39">

So there's no clear answer definitely. Ideally in an ideal world, I think a, the best would be
sharing the test set and you would trust people who would fine tune on the test set, but we know
that everybody does process the same knowledge at every point of time and mistakes could happen, its
not intentional mistakes. It could be unintentional mistakes. So I could tell you one story. When I
started my PhD, I, even now when I do an experiment, I have both development set results and test
set results and I thought that I thought like I should, uh, I should talk about the model that gives
me best results on the test set.

</turn>


<turn speaker="Siva Reddy" timestamp="07:13">

But like what is important is you should never see what's in the test set, what you should always
work with your dev set and report test set results only the final edition or just before we submit.
And when I went to Google, I did my internship there, I kind of did the same there and I got shouted
at, "Hey, this is bad science. You should never see test set." And that was eye opening to me. And I
will say like many people who are new research don't know everything. So we want to be careful. I
think that that's the reason why we need to have more control on datasets and the leaderboards are
kind of way to provide that, and with respect to like a NLP progress or tables on papers sometimes.
Like you'd not know whether these results are really trustworthy.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:55">

So another anecdote that's similar to what you said is, we recently had a NLP submission rejected.
But uh, the point I want to make is that the comparison that we're making was against a baseline,
which actually used a test set as part of there tuning. But they don't mention that in the paper and
we only found out by talking to the authors in person. It's very awkward. Like they've been helpful,
like helping us make sense of why the results are the way it is. So we try to replicate the results
and we are outperforming their method even the internal test set, but it's very hard to like, of
course it changes are going to be more pronounced if you don't tune the test. I think it results
invoke hardships or other people who are trying to kind of show the improvement of their work.

</turn>


<turn speaker="Siva Reddy" timestamp="08:38">

Yeah, true. Especially I think in these days when you get lot of PR on doing well at a dataset, you
should be careful that none of these practices would happen.

</turn>


<turn speaker="Matt Gardner" timestamp="08:48">

Yeah. I guess the underlying question is like, should we have a hidden test set at all? What, what
benefit do we get and what are the cons? And my initial thought here was that why have a hidden test
that does that mean you just don't trust your fellow researchers, you don't trust your colleagues,
you don't trust them not to cheat. Why would you do this? But yes, you bring up good examples that
it's actually pretty easy to do the wrong thing on accident or because you're new and you don't know
what you're doing. So, yeah, there is a lot of value in having a hidden test set, but I think there
are also some problems. For instance, if I don't have a hidden test set and all I have is a
leaderboard that computes a number on the hidden test set. How do I compute statistical significance
or do any kind of better? Um, you don't really want to do error analysis per se on a test set
because that will poison it for future researchers. But like any better statistics than a single
number that the leaderboard doesn't already do for you, you're kind of out of luck, right? You can't
do this because you don't have access to the data at all to run any numbers.

</turn>


<turn speaker="Siva Reddy" timestamp="09:44">

Right. I think like if it is just a statistical significance between two systems that two different
people have submitted, I think that could be run on the leaderboard end point. And I'm sure like the
creators of the datasets would to be very happy if somebody takes initiative and can run these
statistical significance tests and also have another column saying okay, compare these two systems
and for that they have statistical significance or not.

</turn>


<turn speaker="Matt Gardner" timestamp="10:08">

If I want to do that for the SQuAD leaderboard, I can't, right because I don't have access to the
test set.

</turn>


<turn speaker="Siva Reddy" timestamp="10:13">

That's right. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="10:14">

So it has, it has to be the person who does SQuAD.

</turn>


<turn speaker="Siva Reddy" timestamp="10:16">

That's true. Uh, and I think like it's because like people have limited resources. It's not that
they don't want you to do, like if somebody comes up and the volunteers that they want to do this
particular thing and I'm sure they'd be happy to do that and we would be happy with CoQA for
example, if somebody comes in. But if it is something that you want to find out, you have three or
four different models and you want to find out the statistical significance of these results on your
end. I think you could do that on the dev set rather than doing it on the test set.

</turn>


<turn speaker="Matt Gardner" timestamp="10:44">

Except the systems were tuned on the dev set probably. And so

</turn>


<turn speaker="Siva Reddy" timestamp="10:48">

I mean like you could also split, so in this, the dev sets are also quite large so you could split
the dev set into two different splits and do it on your end.

</turn>


<turn speaker="Matt Gardner" timestamp="10:57">

Okay. If, if in the end what we care about is leaderboard performance, we can talk in a minute about
whether we should care about that or not. If that's what we care about. We really want statistical
significance on that number. Right. And so def numbers don't tell us that.

</turn>


<turn speaker="Siva Reddy" timestamp="11:09">

right? Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="11:10">

Okay. Moving on to another con of the hidden test that at least for basically all of the
leaderboards that I know about, this isn't a problem inherent with with leaderboards per se, but
more of their current implementation. They rely on the grad student who runs the leaderboard to
actually run your code. And that grad student might be busy with meeting their own deadline, right
when you're trying to get a leaderboard number and so you better submit your system weeks in advance
or they might not have time to run your number and get back to you for your paper submission.

</turn>


<turn speaker="Siva Reddy" timestamp="11:40">

Very good point. Yeah, I could see that this is happening with me right now. The NACCL deadline is
coming closer and we have many new submissions to CoQA. We have to run a lot of semantics on our end
and also run things on test set. It's not just like we are running on the set. We also want to make
sure it's a controlled test environment. So we run some controlled tests on the dev sets and then we
run it on test set. And it takes a lot of time, but that's a commitment that we have taken and it's
frustrating sometimes to the people who upload those results. I think this is the price we are
paying for fair comparisons across models.

</turn>


<turn speaker="Matt Gardner" timestamp="12:16">

I think it's even a little bit deeper than this because if you're talking about like blind review,
so who is the best reviewer for someone who submits a model to CoQA? Arguably it's you or someone in
your group, but because they have to go through you to get their test number, there is no longer any
blind review.

</turn>


<turn speaker="Siva Reddy" timestamp="12:32">

That's a great point. We got some, uh, for example, Danqi Chen was asked to review the paper on CoQA
and she kindly declined it because we know that are some of these issues and I think we want to take
them quite seriously. As long as we do not know the others. I think that's fine. But the thing is
like if we haven't talked much about it, like what happens if you the others? That's a very good
point.

</turn>


<turn speaker="Matt Gardner" timestamp="12:54">

Again, this isn't a problem necessarily with leaderboards in general, it's just how they're
currently set up. Maybe we could set it up so that it's totally automated. Then we don't have almost
any of these problems. Right,

</turn>


<turn speaker="Siva Reddy" timestamp="13:04">

Right. So there is some automation there. I think like it could be purely automated at this point.
It's not complete automation but I think at some point we will, we will go there. I want to point
out other cons of having leaderboards. So one of is this fair comparison between models. So we know
that like implementing evaluation metrics is also a hard thing. Like if you take blue that are blue
on blue, two blue three blue four and when you say blue, it's some kind of average between these
things and like roots and there are all these complexities and we don't want people to work on, we
don't want to reinvent that metric on the end and run stuff differently from what other people have
run. So the numbers are exactly comparable. That is in that sense.

</turn>


<turn speaker="Matt Gardner" timestamp="13:49">

Yeah, I definitely agree with that. Like too many times I have tried to reimplement a baseline and
get matching numbers and I realized too late that I was using the wrong metric and when I fixed the
metric, either things like better than I thought or worse than I thought. But these official
evaluation scripts are super, super helpful, right?

</turn>


<turn speaker="Siva Reddy" timestamp="14:05">

Yeah. Okay. So what do I like most about leaderboards? I like one particular kind of leaderboards or
what a SQuAD started Stanford Question and Answering dataset. This is a bigger part from Percy Liang
here. So they created this platform called CodaLab where you could run models. It's not just
uploading tests, results and all the models that you see on SQuAD leaderboard. For example, anybody
could go and download the models. You could take those models and run on your own test sets or you
could do some kind of black box analysis and this is what Robin Jia did with the adversarial
examples. So now he has all the systems there and how robust are these systems. So the easiest way
to ask is creating new test set and just run all these models that are already presented this not
just because Robin is at Stanford, that he could do that. Anybody could go and download these models
and do those black box analysis for themselves. I think that encourages reproducibility and also
more analysis into black box models. So that's the best thing I like about leaderboards.

</turn>


<turn speaker="Matt Gardner" timestamp="15:06">

I totally agree. And you really sold me on this point when we talked about this earlier. This is,
this is really great. One thing you mentioned in our earlier conversation that you didn't bring up
just now was that Google and Facebook for a long time were very reluctant to release code and I
talked to people who did internships at Google and were not allowed to submit to the SQuAD leader
board because they had to upload a code. Right, and that's changing because of SQuAD, because of
these leaderboards and so that that's an immense service. That methods that once were opaque are now
not, we can reproduce them exactly with their code because of these systems which, which is
phenomenal.

</turn>


<turn speaker="Siva Reddy" timestamp="15:40">

Yeah, that's, that's really great. Recently, let her like a CodaLab results. We're having some
problems with the proprietary code how to deal with these nuances. It's not clear if they have, if
they have found the solution, but at least we know we could access those models one one way or the
other.

</turn>


<turn speaker="Matt Gardner" timestamp="15:57">

Maybe I'm a little bit biased being at AI-2, where we don't really have proprietary stuff. I'm very
much in favor of, Hey, you're doing research. You're submitting like to an open platform to an open
benchmark. This should all be public. Don't use proprietary code to publish your research paper.
Maybe. Maybe I'm, maybe I'm a little bit extreme in that view, but yeah, I think this is, this is
really great.

</turn>


<turn speaker="Siva Reddy" timestamp="16:16">

Yeah, so like pointing somewhat con on having leaderboards. I think it's easy to track progress and
it's easy to spot outliers in a way. So like you ImageNet, we have AlexNet and that's an outlier.
Suddenly everybody was able to point to that and I think in NLP recently like Bert or Elmo, this got
so much attention I think in a way because of leaderboards and everybody was able to see, okay there
is something big here. Like we could trust these results and until this point there are these
incremental improvements but, what happened here? Like suddenly why, why is there that big jump? And
like you could get that kind of feeling when you write a paper but like it's different thing than
you see it on a leaderboard. You see the dates, you see the systems and you see the progress. That's
climbing and sudden jump and that's what we are talking about. Like pointing those things. I think
that that becomes easy.

</turn>


<turn speaker="Matt Gardner" timestamp="17:06">

Yeah. I guess a counter point to this. If you feel really strongly about blind review, once again,
we've broken the system, right? Because now, Hey, there's this Elmo thing it beat the SQuAD leader
board and it hasn't been through review. What do we do with this? That's kind of a problem if you
care about review, whether you should or not is is a debate lots of people have had, let's not
rehash that here, but this, this is problematic.

</turn>


<turn speaker="Siva Reddy" timestamp="17:31">

Are they like in the case of Bert, like the results were there on the leaderboard even before the
paper came out. I mean it's up to the others to reveal whether they want to show what it is or they
could wait until the reviews, the review cycle is done,

</turn>


<turn speaker="Matt Gardner" timestamp="17:45">

But okay, here, here's another really nasty case thats really obnoxious. I submit a paper to a
conference that's on a particular dataset that has a leaderboard. Yeah. I don't top the leaderboard,
right? Like let's say I'm not at the top and there are two things above me, but neither one has a
paper published. Like, I have no idea what it is. I just know that someone got a higher number than
me. What do I do? I'm, I'm publishing a paper somewhat like the reviewer is going to see this and
say, Oh, you're not at the top of the leaderboard reject. But those don't, those submissions don't
have a paper associated with them. So what on earth am I supposed to be doing here?

</turn>


<turn speaker="Siva Reddy" timestamp="18:16">

I would call that a bad review.

</turn>


<turn speaker="Matt Gardner" timestamp="18:18">

I agree with you. But, but it happens. It happens.

</turn>


<turn speaker="Siva Reddy" timestamp="18:22">

Yeah. So like the point of the paper is to do a controlled experiment. Right? And it's not to be on
the top of the leaderboard or it's, it's something else. I would say like it's perfectly fine to not
even cite the paper that's on top of the leaderboard. Basically. Like you are asking a question and
you're trying to answer that particular question, this paper and you're doing the controlled
experiments. So your, baselines might be something that are relevant to your question and need not
be any, any particular system on the leaderboard too. And I think like reviewers should be aware of
these facts. So I can tell you what, in my PhD I started working on, on this data set called Web
portions, the midpoint of my PhD. That's when like a neural models caught up in NLP and I was still
this old guy working with ]linear models. Um,

</turn>


<turn speaker="Matt Gardner" timestamp="19:11">

I remember those days I was one of those old guys still doing that in my PhD when I should've been
switched to neural nets.

</turn>


<turn speaker="Siva Reddy" timestamp="19:17">

Yeah, actually we are not talking that long ago to right. Like I went to my supervisor and told her
like, oh there are these cool neural models now, I want to try this. But her first point was like,
this would change your research direction. You're asking some questions here, our goal is to answer
those questions. It's not that we want to beat those numbers, just forget. I still worked on linear
models and the numbers, my numbers and the set of their numbers are always like three or four points
below. Well, my numbers are four points below. And fortunately, not a lot of people actually
complained that I am not comparing to that particular model. At least it happened in my case, but I
could see some people just saying, okay, this is not the state of the art number.

</turn>


<turn speaker="Matt Gardner" timestamp="19:59">

So yeah, I guess we've come to one of my main gripes with leaderboards and that is that they
encourage the field to focus on black-box comparisons. The people get the idea because these
leaderboards are so public and so popular that that's all that matters and actually you can't really
do science with a leaderboard. Leaderboards don't answer scientific questions. They just give us
black box comparisons that don't give us any understanding.

</turn>


<turn speaker="Siva Reddy" timestamp="20:23">

They give you fair comparisons and you know, what are the trends in the models. But to answer
particular question, I think it's hard to really on leaderboard if you have one particular question
you're trying to answer,

</turn>


<turn speaker="Matt Gardner" timestamp="20:35">

Let's push on that a little bit. You said they give us fair comparisons. Actually, I completely
disagree. They give us, they give us consistent evaluations.

</turn>


<turn speaker="Siva Reddy" timestamp="20:42">

Oh yes, yes.

</turn>


<turn speaker="Matt Gardner" timestamp="20:43">

But a fair comparison. What is fair? So let's, let's consider what leaderboards actually do. They
keep the value that you submit. So a perfectly acceptable thing to do for a leaderboard is to tune a
model to death on a dev set. A very large dev set. Turns out our dev sets are large enough that if I
get something that works best on the dev set, it's very, very likely that it also works best on this
test set that comes from the same distribution. And so I can tune my model to death on the dev set
and get a really high number and get a correspondingly very high number on the leaderboard. And what
does that tell me? Is this a fair comparison to someone who ran a single model on the dev set and
submitted it?

</turn>


<turn speaker="Siva Reddy" timestamp="21:19">

Good point. Yeah. It's, it's not a fair comparison. There are definitely disadvantages with
leaderboards. And we should try and address them. I guess I have some thought about like how we
could address them. It's also a lot of work. I think it's not just that the organizers of
leaderboards should do this, it's also these are projects on their own.

</turn>


<turn speaker="Matt Gardner" timestamp="21:38">

Yeah. Let me continue on my soapbox for a little bit before we talk about the solutions. Um, so like
basically what you're doing is you're taking the max of a trainee distribution. It's not even just
tuning hyper-parameters. It's given a single set of hyper parameters. There's still variance and I
can train the same model over and over again with different random seeds and get a distribution. And
the leaderboard only tells me the max from this distribution, which is not very informative.
Basically whoever spends the most compute sampling from this distribution gets the highest number of
the leaderboard. And it's even worse than that because now we have Bert these days, which takes what
four tpu's in a cluster or a pod or whatever these are called, uh, to run at all. I'm exaggerating a
little bit, but if you want to get on the top of the leaderboard, we know now that you need to use
Bert in some way, which means I need some gigantic machine or some ensemble of gigantic machines,
that are just totally out of reach for the average researcher. Which means basically if I want to be
on the top of the leaderboard, I have to be a Google or Facebook.

</turn>


<turn speaker="Siva Reddy" timestamp="22:32">

Is that really a problem with leaderboards or in a year? I think it will be hard to sell the
contribution research contribution in a paper regardless of whether it has a leaderboard or not. If
you don't have a strong baseline that uses one of those improvements. Right.

</turn>


<turn speaker="Matt Gardner" timestamp="22:47">

I think that's fair. I think the, the thing I'm griping about is that the leaderboard encourages us
to do Blackbox comparisons and look at just at the top line number and not to do actual controlled
experiments that give us understanding because really for a lot of things I can do a gain that gives
me understanding with glove and yes, my absolute numbers will go up if I use Elmo or Bert, but I
don't need them in order to understand something about architectures. There are definitely places
you can push back on this. Like a lot of the multitask learning gains that people have seen have
kind of gone away when you use Elmo and so that that's fair. But there are still a lot of things
that can be learned without needing these super computationally expensive experiments or these
leaderboards that really only people with a ton of compute computational resources can win.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:30">

Sure. I mean this is not an argument about leaderboard as an argument about how do you make research
accessible to people with lower resources.

</turn>


<turn speaker="Matt Gardner" timestamp="23:37">

Yeah, yeah. Great. That's great. Thank you. Thank you for pointing that out. I agree. And I, my
gripe is that leaderboards encourage the wrong kind of science is all.

</turn>


<turn speaker="Siva Reddy" timestamp="23:44">

Yes, to be on top of a leaderboard board. I would say you have to have a lot of compute but I also
read this recent blog post by Stephen Merity. If you take evidence based research for example. So he
says that in 2012 there will be quite 16,000 CPU cores to identify cats. One year later we have,
like three servers, two quad-core CPUs and that's a great progress in a year. And some of these
improvements did not come from people with a lot of compute resources.

</turn>


<turn speaker="Siva Reddy" timestamp="24:14">

Other thing is like Google n-grams for example, like at some point Google n-grams where the de facto
like this state of the art language models and nobody ever thought we could beat them and then came
on much smaller dataset. It has nothing to do with compute. I would say here at this point it's much
better than we could have done and could still be. So these are points from Stephen Melody. So I
think it's okay to have this a people, it's okay for people to have these 10 compute resources and
it's a good thing that they have this. Because of that, we were able to find the models that would
work very well. And the next thing I think as academic people with low resources is what should we
do to scale up those models on, on low resources?

</turn>


<turn speaker="Matt Gardner" timestamp="25:00">

Yeah, great points. I now step down from my soapbox. We've, we've griped enough about this. And you
mentioned earlier that you had some ideas about how to fix these problems. So what do you, what do
you think?

</turn>


<turn speaker="Siva Reddy" timestamp="25:11">

Yeah. Uh, so about that distribution pot. Yeah. That is worrying. You have a lot of compute, you do
a lot of parameter tuning and just submit one model to leaderboard and that is a score you see. But
the better thing would be I think like on the leader board and having multiple test sets with
different distributions. I mean that way you know that like even if you do well on dev set, if you
haven't generalized well, you may not do well on dev set, we tried to do this with CoQA and you
could clearly see on like a in domain test set and off domain test sets you have some differences.
So that's, that could be one thing. And the other thing would be uploading multiple models and
reporting variances. But like that means a lot of compute on the leaderboards.

</turn>


<turn speaker="Matt Gardner" timestamp="25:59">

Yeah. It's also a little bit problematic because say I just uploaded the five best that I saw.
That's, that's still basically taking the max, right?

</turn>


<turn speaker="Siva Reddy" timestamp="26:07">

Yeah, exactly. Yeah. I think like this is something the authors have to take responsibility, like
running lots of experiments on dev sets, reporting, VHS, reporting, those graphs. What happens when
you change parameters and what's the variance on the little board and you could have other metrics
so you could report those double variance matrix on the leaderboard because you cannot run all these
models on the test set.

</turn>


<turn speaker="Matt Gardner" timestamp="26:31">

Yeah. Even with that, so let's say maybe a good idea is to like have the author upload five models
and check a box that says, I affirm that these were randomly sampled and not the best ones that I
saw. And then we just trust the authors. Even that though you still have this problem of like people
tune hyper parameters to different amounts and it's really hard to control that. There are enough
benefits here that something like this where we can measure something like variance. While keeping
everything else controlled and having consistent baseline performance. This is probably a good
thing,

</turn>


<turn speaker="Siva Reddy" timestamp="27:03">

Right.

</turn>


<turn speaker="Waleed Ammar" timestamp="27:03">

I mean, since we're talking about how to address this problem, I think it's important not to stop
using what we used to have before the control experiment. So the leaderboards serve a purpose part
of it is marketing for, the dataset and part of it is engaging more people promoting a certain type
of fairness. But, we shouldn't stop using what we had before and some will, although you can do some
of these significance evaluations on your end as the person running that leaderboard some of the
analysis will still need to be done by the author.

</turn>


<turn speaker="Matt Gardner" timestamp="27:35">

Yeah, I totally agree.

</turn>


<turn speaker="Siva Reddy" timestamp="27:36">

I've been thinking, like one best way for leaderboards to contribute is if you take a setups like
Standford Question Answering datasets or CoQA, many of these datasets these days have CodaLab set
up. You have a couple of models and we could take those models and actually have live demos on the
flight whenever somebody submits. We already have a live demo for that and people trying to play
with these models. Breaking them clearly could know what are the advantages and disadvantages.

</turn>


<turn speaker="Matt Gardner" timestamp="28:04">

So that's a really great thing you just brought up. It turns out we on the Allen NLP team are
thinking a lot about how can we, we have demo.allennlp.org that has a whole bunch of models and
we've been wondering can we make it easy to take someone else's code hosted somewhere else and just
look it into our demo to show what they do too. And I think we should actually do this. So like
integrate what we have our demo with Coda lab results and show demos live. I think we should do
this. What do you think?

</turn>


<turn speaker="Siva Reddy" timestamp="28:32">

That'd be awesome. Yeah,

</turn>


<turn speaker="Matt Gardner" timestamp="28:33">

And like we can host this on demo.allennlp.org and like integrate it. It would be awesome. We should
do it.

</turn>


<turn speaker="Siva Reddy" timestamp="28:39">

I think you guys have to compute.

</turn>


<turn speaker="Matt Gardner" timestamp="28:40">

Okay, let's talk. That's a good idea. And then with that, I think we're running a bit short on time.
This has been a really great conversation. Thanks for coming on and talking to this with us. Do you
have any last thoughts? Anything we missed that you really wanted to talk about?

</turn>


<turn speaker="Siva Reddy" timestamp="28:51">

I think I covered everything.

</turn>


<turn speaker="Matt Gardner" timestamp="28:52">

I guess there was one point on here that you put in a pre-discussion notes that didn't come up and
that's it's welcoming to outsiders to have a leaderboard.

</turn>


<turn speaker="Siva Reddy" timestamp="29:02">

Oh, Yes.

</turn>


<turn speaker="Matt Gardner" timestamp="29:02">

It's easy to come in and like there's, there's a simple API. It's like Kaggle. Exactly. Yeah. Anyone
can come and do their best and you don't have to have a ton of expertise for better or worse, but it
helps people get into the field, which is a really great point.

</turn>


<turn speaker="Siva Reddy" timestamp="29:17">

Yeah. I think it's very welcoming, having a leaderboard. If you're a high school student or
somebody, you have this dataset that worked out. you have, they developments that have worked out as
a young kid that I think you are in this competitive spirit that I want to be on this leaderboard as
I said, like this game people found out that having leaderboards would mean welcoming more people.
Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="29:37">

Well great. Thanks. Thanks for coming on. It was nice talking with you.

</turn>


<turn speaker="Siva Reddy" timestamp="29:40">

Thanks a lot Matt. Thanks a lot Waleed. I really enjoy having these podcasts around. I hope you
could continue this.

</turn>


<turn speaker="Matt Gardner" timestamp="29:46">

Thanks. That's good to hear. We plan on it.

</turn>
