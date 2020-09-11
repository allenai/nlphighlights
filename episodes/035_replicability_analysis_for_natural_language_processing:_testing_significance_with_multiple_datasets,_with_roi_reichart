---
title: "Replicability Analysis for Natural Language Processing: Testing Significance with Multiple Datasets, with Roi Reichart"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Roi Reichart"]
number: 035
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Walleed Ammar we are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:11">

Today our guest is Roi Reichart. Roy is an assistant professor at Technion Institute in Israel. He's
interested in a variety of topics in NLP and machine learning. Especially learning with little or no
direct human supervision. The paper we're discussing today asks, how do we draw conclusions when we
compare different methods in multiple datasets? So the title of the paper is Replicability Analysis
for Natural Language Processing: Testing Significance with Multiple Datasets. It's accepted for
publication at TSEL 2017. The authors are Rotem Dror, Gili Baumer, Marina Bogomolov and Roi
Reichart. Roi, welcome to the podcast.

</Turn>


<Turn speaker="Roi Reichart" timestamp="00:59">

Hey. Hi. Very nice to be here.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="01:02">

Thank you. So the paper challenges the standard practice of reporting results in NLP community and
proposes, a new framework for doing replicability analysis. Could you start by telling us the
difference that you, you mentioned that the paper between replicability analysis and reproducibility
because that's kind of something tha we don't talk about very often in NLP.

</Turn>


<Turn speaker="Roi Reichart" timestamp="01:25">

Yeah, I agree. It's definitely not something that we talk about very often. So I think that what we
were mostly worried about is that there is something inherent in language. I mean the multiple
domains and languages are inherent to natural language. So you would expect a good researcher that
develops a new algorithm to compare their algorithms across many domains and many languages. And
this is something that, okay, and of course to draw the right conclusions from these comparisons.
And this is something that is known in the statistical literature as a replicability analysis. Even
though I agree that as someone that doesn't come from a statistical background, it wasn't
necessarily the best term, at least for my intuition, but this is what the, let's say the standard
in the statistical literature and at least to the the best of our knowledge. And reproducibility is
more about taking well on algorithm and reproducing its results in a well defined setup. And so of
course we, in this paper we were worried about the first problem and not the second,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:58">

All right. Hypothesis testing Is an established method, many NLP researchers use it to establish
credibility of the results. So why, do you think that this is not a sufficient,

</Turn>


<Turn speaker="Roi Reichart" timestamp="03:14">

So the thing that we were concerned about in this paper was not checking for statistical
significance, which is like you'll say something that we do quite a lot in NLP. By the way, during
the work on the paper, we found out that in different papers people do not necessarily use the right
significance test, but this is another issue and we intend maybe to write a survey paper about that
for ACL, but given that in many papers, the right statistical significance test is used. So that was
not what we were worried about. We were worried about the question of, suppose that you compare two
algorithms on 10 or 20 or 30 datasets, which for many problems now it's quite standard.

</Turn>


<Turn speaker="Roi Reichart" timestamp="04:15">

What conclusions can you draw from that? And naturally, I mean, and I think that this is something
that many people are well aware of. If you just count the number of datasets for which you get a P
value below a pre-defined threshold, this is not something statistically valid. This is some, it's
very easy to see that. Right? So the question was what you should really do and that was the main
problem that we address in this paper.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:46">

Can you give just a simple example for why that isn't statistically valid for people who haven't
read the paper yet?

</Turn>


<Turn speaker="Roi Reichart" timestamp="04:53">

Yeah, sure, of course. So the thing is that, let's take a simple example, which were given the paper
and suppose that you have hundred datasets. And let's say that you assume independence between these
datasets. I mean of course I'm keeping it simple, but I think that for example, if you consider
multiple languages it makes sense to assume independence, now suppose that your probability to do
type one or rejecting the null hypothesis of this even though it's true, even though the algorithms
perform similarly, you reject the null hypothesis and get to the conclusion that on this specific
dataset they don't perform similarly. Okay, so that's the probability for that, which is it's well
known as alpha is let's say 0.5 0.05 or .05 so then your probability to make at least one error for
example, to get to the conclusion that one algorithm is better than the other in 51 datasets instead
of 50 okay. Is very, very close to one. Now of course if you increase the number of errors, the
probability becomes slower, but still the probabilities are quite high if you'll make this
independence assumption, which quite often is true and this problem was is a very well known problem
in many other scientific disciplines. It was, I mean, I think that the biologists were a very, or
maybe aware of, very worried about because it's something that they, you know, they deal with, but
you know, you hear it from psychologists and from many other people that do experimental work.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:50">

So I've seen a bunch of papers or at least a few papers that try to be smart about this. And they
mentioned something called the Bonferroni correction and, so I think this is where you just divide
the alpha value by the number of tests that you do so that you make the expected number of errors
still work out right. So is this sufficient? So this is related to what you did, is that good
enough?

</Turn>


<Turn speaker="Roi Reichart" timestamp="07:14">

Yeah, so to be honest, it's related only the name. I mean, because one of the methods we employ is
called the Bonferroni method or the Bonferroni criteria, they are all different names, but it just
the same Bonferroni but not the same math.

</Turn>


<Turn speaker="Matt Gardner" timestamp="07:30">

Okay.

</Turn>


<Turn speaker="Roi Reichart" timestamp="07:30">

And, and it's true, this is definitely the first thing that comes to mind. And it makes lots of
sense to divide the alpha by, for example, by N the number of datasets. The problem with that is
what is called in the statistical literature, the power of the test. The power of the test means
that when you should reject the null hypothesis, you want to do that, right? So if for example,
let's take the previous example, if you add 0.05 and you divide it by hundreds. So each dataset that
you can't is a case where one algorithm outperforms the other, you should get a P value below 0.05
divided by hundred. Right? And this will rarely happen.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:29">

Yeah,

</Turn>


<Turn speaker="Roi Reichart" timestamp="08:29">

It's a good trick. But it really depends on the number of datasets you have and, you know, the
confidence that you require. So with many datasets it's just that it just doesn't work.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:43">

So what's your solution to this problem?

</Turn>


<Turn speaker="Roi Reichart" timestamp="08:47">

Okay. So the solution, you know, I don't want to get into, you know, all the fine grain data and all
that, but the main idea is quite simple. The main idea say the following, when you have let's say a
hundred datasets, so you have a list of hundred not null hypothesis, right? And you can think of,
you have these probabilities of rejecting or accepting, let's say a "U" of these datasets or one
mean is you use the letter "U" there. And then you also have the probability of making a certain
number of errors when you do that. And it turns out that there are many methods, and I mean, I
wouldn't say many, but there are a number of methods in the statistical literature that can do two
things that we thought can be important for NLP.

</Turn>


<Turn speaker="Roi Reichart" timestamp="09:49">

So they can do the following, they can bound, upper bound, the probability to make a type one error,
meaning the probability to reject the null hypothesis when it's true, I mean when it's, when it's
actually false and at the same time they keep the power of the method as high as possible. And for
us the main question was which of these methods to choose, because there are a number of them, maybe
the most, the most well known one is a FDR false discovery rate, which is used quiet a lot in
biology. And we chose the Fisher method and the Bonferroni method for one main reason. And to be
honest, I think this is a point where I would expect the community maybe to come up with better
solutions but maybe not. I mean it's hard to tell. I mean it's, it's subject for research and the
thing is that we assume that we don't, we cannot model the dependency between different NLP
datasets.

</Turn>


<Turn speaker="Roi Reichart" timestamp="11:16">

So for example, I can maybe say that if they have a pass corpus in Greek and a pas corpus in Arabic,
they are in some sense independent. But if I take two, samples, let's say the Wall Street Journal
from the 80s and the Wall Street Journal from the 90s it makes sense that there is some dependency
with the tolerance between them, but I don't know how to model it. So the Fisher method assumes that
there is no dependency between the datasets and these quiet straightforwardly helps, for example,
for multiple languages. And the Bonferroni method

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:09">

Sorry. Do you think that's true even for say, I don't know Spanish and French or languages that are
really close.

</Turn>


<Turn speaker="Roi Reichart" timestamp="12:15">

Exactly. This is, it's a very good question. It's a very good question and this is exactly why I
said that. And we run very explicitly in different parts of the paper that we expect the community,
you know, maybe it will be us, I don't know. But we expect the community to take the next step and
we think that, you know, these are good methods as long as we make this assumption that there is
either a dependency or not. And then you know, you can use the Fisher method when use independence
Bonferroni when you use some dependence. Fine. But yeah,

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:58">

So you probably don't want to go too much into the math. The Fisher method involves like a formula
has some Chi squared stuff. The Bonferroni method seemed a little more easy to explain intuitively.
Do you want to give a stab at giving? So like the Bonferroni correction that some people may have
read in previous papers, just dividing by the total number of experiments. And this method that you
proposed in your paper is similar. Do you want to give an intuitive explanation for that?

</Turn>


<Turn speaker="Roi Reichart" timestamp="13:28">

I think that I would agree with you when it comes to the holm procedure. I mean, in the paper we
actually address two different problems, right? One is counting the number of hypothesis and the
other is identifying the specific datasets, where the null hypothesis should be rejected. Right? So
the holm procedure is the procedure that we propose to use in NLP for the identification question.
Right. So it's true that, you know, when you look on the simple algorithm that we give for the
computation of the one procedure, it looks very similar to the Bonferroni correction. Even though
you can see that you definitely don't need to divide by N, which makes the test much more powerful.
In these models. When you go to the counting question, you can see that you can actually be much
more liberal and let your methods count it much or maybe count many more cases when actually you
have an effect. And this is, I think it's a very big difference from,the Bonferroni correction.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:04">

Okay. Yeah. Do you want to then explain what these two questions are? Like what exactly do you mean
by this count question and the identification question. I don't think we've covered that yet.

</Turn>


<Turn speaker="Roi Reichart" timestamp="15:14">

Of course. So actually there is something here that is maybe a little bit counter-intuitive. When
you do your hundred comparisons you can ask two questions. One is very general, I did a hundred
comparisons and I want to know how many cases is algorithm one doing better than algorithm two? This
is a very straightforward, but then comes the question of I want to identify those, for example,
languages, right. So I mean, if we go back to your previous question about French and Spanish there
is a difference between a case, where I say algorithm one is better than algorithm two from French
and Spanish and maybe English and Italian, you know, and different Roman languages or if it's for
English and Chinese, right? If it's English and Chinese and not from Spanish, maybe I'll, you know,
I'd be a little bit confused why it was like that? So of course the identification question gives
more information, right?

</Turn>


<Turn speaker="Roi Reichart" timestamp="16:38">

On the one hand it may sound a little bit counter intuitive that you get different answers to this
question, but when you consider the fact that you get more information from the identification
portion, it makes maybe more sense that if you count those numbers, those languages, in our example,
if you count those languages that you identified very often the number that you'll get will be lower
than the number that you get in the answer for the counting question because the answer to the
counting questions tells you that there are 50 languages where the effect orders but the
identification question, tells you exactly for which languages the effect counts and it's a
different thing.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:44">

I see. So let me try to give an intuitive explanation for this holm procedure for the identification
question because I think there's a really nice intuitive explanation and you can tell me if I got
this right. So you order the P value. Say you did a hundred experiments, you order the P values that
you got from smallest to biggest, and you evaluate the lowest P value by dividing alpha by N , which
is essentially the same thing as the Bonferroni correction. And you evaluate the highest P value
just on your original alpha and you have a straight you just decreased the denominator as you go
from the smallest to the biggest, it's not as strict as the Bonferroni correction, but it's actually
statistically valid and it's more powerful because you're not dividing everything by N does this
fair?

</Turn>


<Turn speaker="Roi Reichart" timestamp="18:37">

Yeah. It's a fair explanation. There's one thing that I think is important to consider here, that
the holm procedure, it's only relevant for the cases where you know that there are dependencies
between the datasets. I mean you can use it when you consider that set to be independent but then
you lose power of the methods. So what happens is that, let's say that for the [inaudible] we say
that the datasets are independent. Of course it's not 100% true, right? But if you have this case,
you will get different answers for the accounting question because the answer to this question is
based on the Fisher method and a different answer to the identification question., I mean if you
count those languages that you're identifying, you will get a different answer while if you assume
that there are dependencies, the holm procedure and the Bonferroni method for, I mean the Bonferroni
for counting and the holm for identification, will give you the same answer. So I mean there are,
you know, there are, there are some issues here, right? I mean there is, it's integrated, but, and
this is maybe one of the reasons that we do call for, you know, for maybe a simpler method, maybe a
more complicated method that we consider the dependencies, but we consider this to be a first
necessary step towards the solution of these problems.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="20:08">

Okay. So how what can we draw as conclusions from the results that from the experiments that you
provided in that paper comparing the different methods?

</Turn>


<Turn speaker="Roi Reichart" timestamp="20:19">

Okay. So in the paper we tried to experiment with a relatively large number of applications we had
only 10 pages, right. But we had four different applications and these applications had different
evaluation measures. That was also something that was important for us, right. I mean, we had
accuracy, we had F score, we had correlations, different evaluation measures, different statistical
significance tests. But in all cases we're trying to be, you know, multi domain, multi-lingual, the
cases where you would expect multiplicity in NLP. And I think that we had two main conclusions. One
was that when you expect or when you assume independence between the datasets, for example in multi-
lingual cases, If you just count as P values below the alpha number you will be too optimistic. So
in those cases we should be more strict.

</Turn>


<Turn speaker="Roi Reichart" timestamp="21:38">

On the other end. And that was maybe a bit surprising for us in those cases when there are probably
dependencies, so does this very simple erroneous counting of this cases where the P value was below
alpha. We're actually too strict. So you know, when we came to this research we assumed that the
phenomenon we are going to see is that in many cases people get to optimistic evaluations. But
actually that was not what we saw in some cases. In those cases when you assume that the datasets
are independent, yeah they were too optimistic, but when you would assume that the datasets are
dependent, the conclusions were actually too strict and you could, you could come up with more cases
where the F points. So it goes both ways.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:52">

That's interesting. This makes me a little bit nervous because how do I know if my datasets are
independent or not? Because like with, with the Bonferroni method versus with the Fisher method I'm
looking at the multi-lingual part of speech tagging result where just counting the alpha values,
gives you 11 datasets, languages where one method outperforms the other. But with the Bonferroni
method, you get six. And with a Fisher method you get 16. So if I assume they are dependent, I lose
power. But if I assume they are independent, I gain power. So how do I know which assumption is
correct?

</Turn>


<Turn speaker="Roi Reichart" timestamp="23:25">

Yeah, yeah. This is, you know, I'm not trying to not try to convince you that it's simple, but it's
a good question. But you know, it's part of the dealing statistics, right? I mean, we have to do
these assumptions. It's true when we apply statistical significance. You know, maybe it's not I that
part of the answer to your question will come from the standard practice. I mean, if the community
adopt these methods, which of course I encourage everyone to do, people we get those cases that
under, you know, one assumption you get 6 under another assumption you get 16 and the question is
how, I mean, we'll have to, you know, this is also some kind of a conclusion, right? And you know, I
think that in our field, which is very much engineering driven and for good reasons, right?

</Turn>


<Turn speaker="Roi Reichart" timestamp="24:23">

I mean, we develop applications that change the world. I mean, it's a good thing. I think that
sometimes it's hard to work with such conclusions. But in other fields like biology, when you
perform an experiment that it's not going, you know, to the big machine that understands life or
something like that. Of course you'll see that all the time in papers. So I don't know, maybe this
will be part of the ablation analysis. Maybe we want to have one number, but we also want to have
something more like a more general discussion or more in depth discussion. It's a good question. I'm
confused too.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:10">

So, this makes me think of a related point. I've seen some papers recently. I'm thinking of one from
EMNLP that was trying to reproduce a particular named entity recognition result. There's also a
paper about trying to decide which reinforcement learning methods were good. Both of these looked at
essentially what is training variance. So it's repeated experiments a kind of replicability,
reproducibility but slightly different from what you were saying. But the conclusion of these papers
was, there is variance in training neural nets just due to the random seat because these are
nonlinear non-convex optimization problems that are very hard. And what's typical, especially when
you look at leaderboards is the researcher will sample from this training distribution and report
the max. But, that can be really misleading because there's actually a distribution here. Does this
work in your paper give us any insight into solving this issue?

</Turn>


<Turn speaker="Roi Reichart" timestamp="26:16">

So to be honest, one thing to remember, I think, you know, they say that and we hear it all the
time, right, that the we reinvent research every few years we invent everything from scratch, right?
And this problem, which is of course it happens within neural networks and of course it has to be
the non convex optimization, all that. But we had that a few years ago with Bayesian methods, right?
I mean we have the hyper parameters and people reported the best set to hyper parameters. And then
at some point before neural networks took over, we started to see papers with the median. But these
weren't results with the best hyper parameters. So I remember that my first work was on active
learning for parsing and there the order of the example in the pool was very significant and I
didn't know what to do.

</Turn>


<Turn speaker="Roi Reichart" timestamp="27:10">

And I ended up you know, it was my first work as a PhD student. I ended up averaging over a hundred
cases, but of course the variance was very big. So I think that if you want to take our method and
apply it to this case to this issue, you can do that, right. And you can restart your model with a,
I think in one of these papers it was like 5,000 cases or something like that. And you can take
these 5,000 cases and employ our test, right? I mean, if it's 5,000 I would also consider FDR. But
you know, it's, you know, you can do that and then the numbers will tell you what happens. Right. I
mean, you may find out that you are vectoring only a very small fraction of the cases or if you
compare algorithm A to algorithm B or vice versa, you'll get the same numbers and so on and so
forth. But I agree that, I mean, I'm not sure that they, I'm not sure that it's really the same
problem. I think that I want them, yeah, I think that they would go more to the solutions that they
propose in the paper. One of the papers I think talk about distribution of, considering the
distribution of numbers, and not, you know, one specific number and I think this is more straight
forward.

</Turn>


<Turn speaker="Matt Gardner" timestamp="28:33">

Okay. Yeah, I review, I've reviewed lots of papers that don't even report any amount of statistical
significance and just say, Oh Hey, we evaluated this once on the leaderboard and we got the max and
I think these are the papers and your paper. Do a good job at pointing out these issues that if we
really want to make statistically valid conclusions, we really need to be careful about what exactly
we're reporting. So thanks for doing this work.

</Turn>


<Turn speaker="Roi Reichart" timestamp="28:56">

Yeah, thank you. I just want to to maybe to add one more comment. I think that another thing that
can come up, another positive effect that can come up from this line for work on replicability and
different, you know, better evaluation, but maybe for this conversation specifically from a
predictability that one thing that you see in the, you know, in recent years is that we have many
datasets and for every problem, right? For example, word embeddings we have many, many datasets,
right? Or you have all these semi-final datasets for different tasks and then you see a paper, you
review a paper and the paper reports very good results on three datasets. Right now you have no way
to know if those were the three datasets they were a mistake and they just happen to get very good
results they wrote a paper and they sent it for revision.

</Turn>


<Turn speaker="Roi Reichart" timestamp="29:48">

Or if they tried on 300 cases and they just report on three, right. Now, if you don't have means for
summarizing the results, you can't really ask anyone to evaluate on 300 datasets, right? Because
what are we going to have then three page statement from you know, just compare 300 cases. You can't
really do that, right. But if you look on table one in our paper, we just report those K Bonferroni,
K Fisher estimates. So, right? You have to know if it's dependent or independent. And if you have
insight into the nature of dependency, maybe you can come up with better numbers, fine. But if you
are willing to take this risk of making this assumption, you can summarize a very large number of
experiments with one data, and this can lead to a better standardization of experiments in our
field, I think this can be an important contribution here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:57">

Yeah, I agree.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="30:58">

Thank you very much for recording with us and yeah, I hope the community will start using some of
these methods.

</Turn>


<Turn speaker="Roi Reichart" timestamp="31:05">

Thank you very much for inviting me.

</Turn>
