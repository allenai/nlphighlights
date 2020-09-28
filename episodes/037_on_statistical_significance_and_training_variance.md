---
title: "On Statistical Significance and Training Variance"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "037"
tags: []
description: "In this episode we talk about a couple of recent papers that get at the issue of training variance, and why we should not just take the max from a training distribution when reporting results. Sadly, our current focus on performance in leaderboards only exacerbates these issues, and (in my opinion) encourages bad science. Papers: https://www.semanticscholar.org/paper/Reporting-Score-Distributions-Makes-a-Difference-P-Reimers-Gurevych/0eae432f7edacb262f3434ecdb2af707b5b06481 https://www.semanticscholar.org/paper/Deep-Reinforcement-Learning-that-Matters-Henderson-Islam/90dad036ab47d683080c6be63b00415492b48506"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F348377621&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:13">

Today I wanted to cherry pick a couple of small results from two different papers and instead of
talking about a single paper, I just thought we'd have a focus discussion about a topic I've been
thinking a lot about recently. And this is training variance and statistical significance in neural
net neural network methods. This comes up because we have leaderboards. People like we have some
shared task and there's a lot of incentive to get the best result on a leaderboard. And I've
reviewed a lot of papers recently that will report something like, Hey, I got the best result on
this leaderboard is so my method is awesome, you should accept my paper.

</turn>


<turn speaker="Matt Gardner" timestamp="00:58">

And I get really nervous when that's the evaluation that I see and these results that I'm cherry
picking that I'm going to talk about from these two papers highlight why this makes me nervous. So
the papers that we'll look at are the first is an EMNLP paper from this last year called Reporting
Score Distributions Makes a Difference: Performance Study of LSTM-networks for Sequence Tagging. And
this is by Nils Reimers and Iryna Gurevych at the University of Darmstadt in Germany. It's got a
German name that I'm not going to try to pronounce, but I hope I got that right. And then the second
paper is called Deep Reinforcement Learning that Matters and it's by folks at the University of
Montreal and Maluuba.

</turn>


<turn speaker="Matt Gardner" timestamp="01:50">

So just to mention this first paper they tried to reproduce the result. They take open source code
from some neural nets that were trained for named entity recognition. I'm not going to even bother
telling you which systems those are. We'll call them system A and system B system A reported the
number in their paper that was higher than system B's number. And so this work took both of those
systems and retrained them lots of times to see what performance they got. Really and system A, so
they ran each of these systems tens of times. One of them was 41, one of them was 86 and they got
distributions of numbers over training runs where the only thing that was different was the random
seed.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:46">

So now we can look at a distribution of results you get from method A and the solution you get from
method B and use some statistic like the mean, and decide that, "Hey, maybe this is on average, like
if we sample one random initialization, maybe this method will work better.

</turn>


<turn speaker="Matt Gardner" timestamp="03:06">

Right? And so what they found was that these distributions are actually different which is good for
one of the methods, right? Because that means one of the methods is probably better than the other
one in some sense. But what they found was that on average over training runs, system B was better
than system A. Whereas if you just looked at the performance metrics that were reported in the
paper. System A reported a higher number than system B. And it turned out that system A reported a
number that was very, that was essentially the max of the training distribution that this current
paper found. Whereas system B reported a number that was essentially the mean of the training
distribution that this paper found by rerunning their code lots of times.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:53">

So there are like, there are two chances, two explanation's for this. One of them, is they got very
lucky and the one experiment they ran, they got almost the best result you could have from this with
this method, the other that they ran a hundred experiments and pick the best one and reported it.

</turn>


<turn speaker="Matt Gardner" timestamp="04:14">

It's actually quite likely that it's the second. And in fact, it's really easy to do this in a, in a
totally innocent, well-meaning way. You just do a large grid search over hyperparameters and if the
effect of your hyperparameters is smaller than the effect of the random seed, which might actually
be the case, you're effectively doing lots of samples from this training distribution. So what does
this actually tell us? That's the question

</turn>


<turn speaker="Waleed Ammar" timestamp="04:44">

That's very interesting as the paper like the papers highlighting this problem. Right. And did it
propose a method for solving it or for like, I guess one obvious solution is to actually run
multiple experiments and like with the same hyperparameters and report the mean result. But yeah, I
don't know that people do that.

</turn>


<turn speaker="Matt Gardner" timestamp="05:05">

Yeah. As the title of the paper says, reporting score distributions matters. And their point is that
we really should not be reporting the max of these training distributions because that's really kind
of a meaningless metric. And unfortunately that's what leaderboards encourage us to do. So not to
pick on people that run leaderboards, but actually I think it encourages bad science. When someone
gets the best result on a leaderboard, it's really hard to know if that's just because they sampled
the heck out of their training distribution and found a really good result or if they actually have
a method that's in some sense statistically better. This is even confounded by the fact that this
notion of statistical significance is different from the notion that you might typically think of
when you see this.

</turn>


<turn speaker="Matt Gardner" timestamp="05:52">

So it if you're at say comparing two parsing on the PennTreeBank each of these. So each parser makes
a bunch of attachment decisions and you can see whether one model does statistically better than
another model on attachment decisions, right? But and then we have typical statistical significance
metrics that people use and it's really good that they use this. But still that's not even the right
information that we're talking about here, right? Because that's one model is statistically better
than one other model. And the issue that's going on in this paper is actually that model came from a
distribution over parameters that that resulted from a training, from some training algorithm. And
is that training algorithm statistically better than some other training algorithm? And that's not
tested at all by this standard notion of statistical significance.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:49">

Right. To what extent do you feel like the trend of using deep learning methods for our NLP tasks
have a confounding factor there? It seems to me that we didn't have as much of a problem when the
objectives we optimized tended to be convex. Other like the effect of random initialization was not
nearly as important.

</turn>


<turn speaker="Matt Gardner" timestamp="07:16">

Yeah, those are good points. I think cross-validation does get at this issue a little bit because
you're running multiple training runs over different datasets, not the same dataset, but it's at
least close to what's going on here. So when you run cross validation like tenfold cross-validation
or whatever, so you actually train your model 10 times and then you report averages over different,
either the same validation set or whatever. But you use different training data to do this that
helps alleviate these issues. I think we don't do that typically as much these days because these
networks are so hard to train and they take so long. I can't really remember any papers recently
that I've seen. Maybe I just have a poor memory, but I can't really remember papers that do cross
validation with neural nets, it's just too expensive. But, but it leads to bad science, right? We're
making erroneous conclusions because we're just reporting the max from our training distribution.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:20">

Yeah. Good point. Thank you for pointing that out. Is there another paper that you want to talk
about?

</turn>


<turn speaker="Matt Gardner" timestamp="08:26">

Oh right. I didn't mention this other paper. So it does, it makes very much the same point. At least
part of the paper. I said I'm cherry picking results. So this other paper called Deep Reinforcement
Learning that Matters makes it a very similar point about reinforcement learning. The first paper
did this in the context of NLP, so I focused on it, but this other paper makes a very similar point.
They have a really interesting section. There's a figure that's figure 5 in the paper if you want to
look at it. What they did was they're training policy gradient methods to do a control problem in
reinforcement learning. You're trying to figure out how to control a robot in simulation
essentially. And they show a performance according to some metric that isn't important here over
time as this reinforcement learning method is learning.

</turn>


<turn speaker="Matt Gardner" timestamp="09:15">

And they ran the learning algorithm 10 times where the only thing that was different was the random
seed and they split this into two different sets of five runs each. And then reported average
results from the five runs that really it's from the same distribution but they're pretending that
it's from two different distributions just to see if statistical significance tests will tease these
apart and they show in their figure that actually these distributions look very different. Which
means essentially that the variance in training is high enough that even taking a small sample from
this can make you think that one method is better than the other. That these two distributions are
different. Unless you're really careful about the statistics that you compute. Because probably
looking at this, a sound statistical test would not say these two things are different because the
sample size is so small. But if you're just looking at the plot they look like they get very
different performance even though the only difference is the random seed.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:19">

Yeah. And I'm looking at the numbers. The metric they're using is average return. That like there is
like we're talking about at any given time step we're talking about the difference of maybe 25 or
30% difference in the total results, which is pretty big.

</turn>


<turn speaker="Matt Gardner" timestamp="10:36">

Yeah. And, and the point here is that even reporting averages on a small number of samples can lead
you to bad conclusions. And so you really need to be careful or you're going to just make non-
scientific invalid conclusions. So if you're looking at papers, if you want to actually follow along
the paper, I think figure 2 in the Reporting Score Distributions Makes a Difference paper that NER
paper is really nice. It would be lovely if all results were reported like this. It's got the, it's
called a violin plot. It shows two distributions next to each other from performance over training
runs for two different methods. It's a, I really like this.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:24">

It's not really practical in a lot of cases we want, we don't want to just like compare two numbers
or two methods. We have a large number of methods that we want to compare to. Oftentimes we don't
have access to the code that we can actually recompute this distribution. There are many different
configurations. Maybe you're trying to compute like dependency parsing results for large number of
languages. Each of these pair-wise comparisons and for every language need to create a one of these
graphs.

</turn>


<turn speaker="Matt Gardner" timestamp="11:56">

Okay. That, that's a totally fair point. So let me amend my recommendation slightly and that is that
any paper these days that has published with with significant training variants should report, I
mean and a standard deviation at least for many runs of training their algorithm.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:15">

That makes sense. How many runs do you think is reasonable?

</turn>


<turn speaker="Matt Gardner" timestamp="12:18">

The more that you can do, the better the statistical tests that other people can do to compare to
your work and how many that requires. Well, statistics will tell you that, right? The more the
better, I guess is all you can say. But I, yeah, we won't go into the power of statistical tests.
You can look at a statistics textbook for that.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:44">

That's good. Thank you very much for for this interesting discussion.

</turn>
