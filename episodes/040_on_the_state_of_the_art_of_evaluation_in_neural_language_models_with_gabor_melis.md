---
title: "On the State of the Art of Evaluation in Neural Language Models, with Gabor Melis"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Gabor Melis"]
number: "040"
tags: []
description: "Recent arxiv paper by Gábor Melis, Chris Dyer, and Phil Blunsom. Gábor comes on the podcast to tell us about his work. He performs a thorough comparison between vanilla LSTMs and recurrent highway networks on the language modeling task, showing that when both methods are given equal amounts of hyperparameter tuning, LSTMs perform better, in contrast to prior work claiming that recurrent highway networks perform better. We talk about parameter tuning, training variance, language model evaluation, and other related issues.

https://www.semanticscholar.org/paper/On-the-State-of-the-Art-of-Evaluation-in-Neural-La-Melis-Dyer/2397ce306e5d7f3d0492276e357fb1833536b5d8"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F352511039&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

So today our guest is Gabor Melis from the DeepMind office in London. Welcome to the podcast.

</turn>


<turn speaker="Gabor Melis" timestamp="00:20">

Thank you very much.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:22">

And we're going to talk about his paper title On the State of the Art of Evaluation in Neural
Language Models. It's co-authored by Chris Dyer and Phil Blunsom. So the paper was trying to give us
a more a more clear picture of what the state of the art is in this important problem of language
modeling and we wanted to know what's the motivation for this paper?

</turn>


<turn speaker="Gabor Melis" timestamp="00:48">

Well, you can tell probably by the choice of topic here that we were burned a couple of times by
trying to reproduce the results from various papers and trying to build on their findings and use
the most baselines for further research. And it's very frustrating when one does that, finds a
really cool model and has the greatest idea in the world, how to turn that into something even
better and more buzz worth compliant as well. Such as you take the deterministic model and you make
it variational and suddenly you think it's going to change the world, but it doesn't because the
baseline model doesn't do what's written on the tin. And I think this is not a unique experience.
Every researcher in the field or in other fields will face this issue. So I thought okay let's take
a step back and use all that experience in a positive way to actually say something about what's
wrong and how possibly how we could improve how we go about research.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:12">

Makes sense. So what models did you decide to compare?

</turn>


<turn speaker="Gabor Melis" timestamp="02:17">

So they decided to compare out LSTMs because they are very core of NLP. I guess that's our reason in
hindsight. And we also chose a recurrent neural network to compare with because it has extremely
good results on some task and we are concentrating on language modeling here because that's the,
basically the smallest non trivial building block that all neural approaches basically boil down to
even machine translation is conditional language modeling on the decoder side, loss attention, but
let's disregard that for a minute. So we included a recurring type neural networks and integrate
this version of the paper also, these NAS cells, the neural architecture search cells, from Brain
because it's designed by an algorithm reinforcement learning running in a model space, which should
make it pretty different from hand designed cell.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:37">

Could you just give us like a very brief like introduction about like the Recurrent Highway Networks
and the third model so that the audience can follow what are the main differences between the three
models that you're comparing?

</turn>


<turn speaker="Gabor Melis" timestamp="03:54">

Right. So LSTM are the most well known of the lot. And LSTMs basically can be interpreted in various
ways. Even at ICLR I think there is now a paper that tries to cast them in a different light. So I'm
not going to go out on a limb and say something interesting about them and I will just assume that
everybody knows them. And Recurrent Highway Networks seemed to be very different as they were
presented in the original publication from LSTMs because they do multiple processing steps for each
input. On the other hand, if you take a slightly different approach as to drawing them, you can draw
all those processing step vertically. And it all boils down to not having a recurrence state at the
same layer in your multi-layer recurrent highway networks only from the top of layer at the previous
timestamp to the lowest layer at the next time step. It's pretty hard to follow this when described
in a speech, but it's a kind of trivial on the diagram.

</turn>


<turn speaker="Gabor Melis" timestamp="05:21">

So viewing RHNs in this light makes it a bit harder to see why they would be so much better than
LSTMs because all they have is a different kind of bias possibly due to the different connectivity
structure in the model. And this was also one of the things that made me interested in recurrent
highway networks, maybe we have just found the right kind of bias there, right? And so we spent
quite some time trying to reproduce their results and we could, and that was good, by some tuning we
could actually improve on their results. But they also wanted to give a fair chance to the baseline,
which is sadly lacking in most works. And we wanted to see how LSTM would do if we took
regularization and architectural decisions seriously.

</turn>


<turn speaker="Gabor Melis" timestamp="06:33">

For example, recurrent highway network there was this beautiful figure in the paper. As you increase
the number of time steps, which is basically number of layers it gets better and better. But upon
the 10th reading of the paper, I kind of thought, okay wait a minute, it has the same number of
parameters, no matter how many processing steps it does. But the total number of the parameters is
the same. But the number of parameters in the recurrent cell increases as the processing steps gets
higher because it gets a narrower and there is going to be fewer parameters in the embedding
matrices. So to compare apples to oranges it's great if you compare models with different number of
parameters in the embeddings in the recurrent cells, but this is a trade off that you can possibly
tune.

</turn>


<turn speaker="Gabor Melis" timestamp="07:50">

So this was one of the insights as to what kind of architectures hyperparameters we want to choose
and tune, and we looked for other hyperparameters and regularization choices that we were unsure
about. And variational dropout is pretty popular these days. The results though are slightly less
well known, recurrent dropout. And I'm using the original terminology from the respective papers.
The recurrent dropout is basically taking, if it's applied to an LSTM as originally done, what you
do is you take the update vector. I think that's the U in the original formulation before the gating
can you apply dropout to that vector and it seems to performing pretty much the same as variational
dropout. Sometimes one is better than the other, sometimes it's the other way around.

</turn>


<turn speaker="Gabor Melis" timestamp="09:06">

So to cut to the chase it, we found that LSTMs are extremely good across a number of language
modeling datasets, even to a point of beating RHNs when you actually take the time to tune those NAS
regularization parameters and the trade off between recurrent cell size and embedding size. So in a
sense we could verify some of the claims in the literature when it comes to regularization and
especially the papers about sharing input and output embeddings that you covered in a previous
episode. But the relative merits of RHNs and LSTMs. I think those came out in the reverse in our
experience.

</turn>


<turn speaker="Matt Gardner" timestamp="10:24">

I was gonna say I guess you've given us the highlight, the end results of your experiments. You want
to tell us a little more detail about what exactly you did. So you had this fancy hyperparameter
tuning set up.

</turn>


<turn speaker="Gabor Melis" timestamp="10:36">

Oh yeah. So we used Google Vizier, which is similar to Spearmint and all the other blackbox
hyperparameter tuners out there. And we defined as many hyperparameters as that tuner is confident
with. Right, these tuners tend to break down if they have more than a dozen. And even we had
something like nine hyperparameters to tune and we tried to narrow the tuning ranges as much as they
could without handicapping the model.

</turn>


<turn speaker="Matt Gardner" timestamp="11:14">

And the parameters were like embedding size and depth of the network or was that was depth fixed.

</turn>


<turn speaker="Gabor Melis" timestamp="11:19">

Depth we ran separate tuning around for a different depths.

</turn>


<turn speaker="Matt Gardner" timestamp="11:27">

All right, but you have a projection down from like the hidden size of the LSTM down to like a final
embedding size again. So like these parameters are the things that were tuned by the hyperparameter
optimization.

</turn>


<turn speaker="Gabor Melis" timestamp="11:42">

Yeah. So the embedding size, the ratio of the embedding size and the hidden size was one tuneable.
And for each tuning run, which involved one to 2000 deep model evaluations each we had parameter
budgets such as 10 million weights or 24 million weights. A model type such as LSTM or RHN or this
neural architecture search cell that was added in a later version of the paper. So you can see how
these numbers we multiply. You take four, three depths one, two or four layers, three architectures,
that's a multiplier of 12 already. And there are a couple of different flags you can choose and
these are only the things that you want to compare on equal grounds. And then you'll let for each of
those experiments in this matrix, you add the tuner to the parameters that are less interesting for
comparison such as the learning rate, the dropout rates, the decay embedding ratio.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:08">

So, in total, how many different hyperparameters sets did you experiment with and the results.

</turn>


<turn speaker="Gabor Melis" timestamp="13:20">

So one and a half thousand for each experiment and there were, I don't know, maybe 30 experiments.

</turn>


<turn speaker="Matt Gardner" timestamp="13:28">

Wow. So look looking at your results. You report previous results with LTMS on language modeling
they get perplexities I guess he best previous LSTM was around 70 perplexity depending on the number
of parameters. And you report perplexities around 60. So that's like a 10 to 14 point improvement.
Is that all due just to this hyperparameter optimization. Like why do you think previous LSTM
results? Like what's the explanation for this gap?

</turn>


<turn speaker="Gabor Melis" timestamp="14:00">

Well, practical tips, I think if you have too few parameters then the trade up between the cell size
and the embedding size is very important. The not tuning dropout rates and regularization parameters
learning rate is also responsible for a couple of perplexities at least. Doing grid search over your
hyperparameters space is going to lose two, three, four perplexity points as well according to some
you known scientific experience and more like guess work that I did looking at the sensitivity of
the hyperparameter space. So all of these add up, and if you miss any of those, and probably there
are more that I missed in all honesty, it's very hard to claim that improving a model by one and a
half perplexity points is suddenly better in some sense.

</turn>


<turn speaker="Matt Gardner" timestamp="15:10">

Interesting.

</turn>


<turn speaker="Gabor Melis" timestamp="15:11">

And that's the crux of the problem here. What we want is better models at the end of the day.

</turn>


<turn speaker="Matt Gardner" timestamp="15:19">

So I also think it's really interesting that the recurrent highway network, previous published
result was 65 text perplexity, and the comparable number for your experiments was 62, so you only
got a three. There was only a three point gap there. Why is that gap smaller than the gap for the
LSTMs? Any intuition on that?

</turn>


<turn speaker="Gabor Melis" timestamp="15:40">

Sure. well I think it's inevitable really that you give more love to your own brainchild, right. And
you better tune it. I might have tuned LSTMs better myself, right? Because after awhile I thought,
okay, there is a story here and I want this story to stand out. I tried to avoid that as much as I
could, but I probably still did it. And I think, yeah, every paper does that especially the model
innovation papers. In a previous version of this paper, there was a model in innovation in there.
But there were two problems with it that when we did the baseline evaluation to well the gap
suddenly went away and all we were left with was a bit faster training, which was not a great story
to tell. Yeah, but if we didn't spend all this time on getting the baselines up to speed, we could
have told a nice story about how advanced gating improves LSTMs,

</turn>


<turn speaker="Matt Gardner" timestamp="17:02">

So another possible hypothesis for the difference between these two gaps that the gap for the RHN is
a lot smaller than the gap for the LSTM is that the RHN is less sensitive to hyperparameters like
you could imagine looking at curves of your hyperparameter optimization algorithm that over time the
RHN gets faster to some asymptotic result, but it asymptotes lower. Right. Does this make sense? And
if you, do you have any, is this true? I imagine you've tested this hypothesis, but I didn't see any
results in the paper on it.

</turn>


<turn speaker="Gabor Melis" timestamp="17:36">

No, no. I think someone else solved this before, and I checked the sensitivity there and it was
actually the other way around. If anything RHN were a bit more sensitive to the choice of
hyperparameters.

</turn>


<turn speaker="Matt Gardner" timestamp="17:53">

Interesting. So I think of you at Google have a really large computation budget and I feel for the
people in academia that don't have such large computation budgets. And so I wonder, like, is that,
are we just doomed to have this 10 point gap in performance if we don't have access to thousands of
GPU hours of compute to do this hyperparameter optimization?

</turn>


<turn speaker="Gabor Melis" timestamp="18:17">

That's good and not true. No. there were a number of papers coming out recently, one of them I think
parallel to the work of this paper that had basically the same results with pure LSTM without
additional memory or a dynamic evaluation, and they could get really good results with less tuning.
So I guess it's not the question of wither you can get really good results. It's about the
confidence you have in your final numbers. And yeah, I would really like to cut down on the variants
of the results so that it becomes less of a fashion industry and more of a science.

</turn>


<turn speaker="Matt Gardner" timestamp="19:12">

I totally agree. In fact, like two episodes ago, we had a bit of a rant about this exact point. So
yes, I totally agree with you.I like this paper a lot.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:21">

So speaking of the training time a lot of train time, I'm curious to know if it's really like a
practical to apply a similar approach to larger datasets like the one billion word corpus often used
for language model, even within language models. So what can we do in these cases where it's really
hard to do 1.5 thousand experiments for every setup?

</turn>


<turn speaker="Gabor Melis" timestamp="19:52">

Yeah, that's a problem even with this amount of resources larger datasets take way too long, but
fortunately you need way less regularlization there. So the next dataset that I think is a sweet
spot for language modeling is the Wikitext 103 dataset, which is considerably larger than PTB and
Wikitext 2, but probably still feasible to cover the hyperparamater space a bit better. On the other
hand, the billion word dataset might be also a bit too large and a bit broken, I'm told. So the way
the data set was constructed is that probably warrants another episode, suffice it to say that it
has problems with the training test split. So I would much rather trust the Wikitext datasets and
try to make a compromise between the variance of the results and the toy-est of the dataset. So we
don't want to exclude people with no enterprise or resources. So I think investing time in doing a
much more efficient hyperparameter searches, reducing the number of hyperparameters is a very
worthwhile thing to do. I would, I would personally not go there myself, but I think it's a very
important topic for all fields. It's a cross cutting thing.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:00">

So I'm curious how much would we lose if we tune our hyperparameters on one in a smaller dataset but
then apply it on a bigger dataset or like something that you maybe you may be able to answer is what
happens if you tune like you had, I think three datasets that you use what happens if you use the
smaller one to tune your hyperparameters and then apply it on the bigger one? How much do you lose?

</turn>


<turn speaker="Gabor Melis" timestamp="22:26">

I don't know. I I thought about this, how to make the tuning more efficient by tuning on small
datasets but in the end, I didn't want to make this compromise as much as I can avoid it because
it's inevitable, it brings some uncertainty,

</turn>


<turn speaker="Matt Gardner" timestamp="22:51">

I guess you do have some results where you tuned on the Penn Treebank and evaluated on Wikitext 2.
Right. And there we see a drop of at least 10 points perplexity. And so yeah, it looks like these
matter quite a bit and are even dataset specific. I was wondering if like, if I'm using an LSTM as
part of like some question answering model, if I could just use the hyperparameter values that you
found that work in these LSTMs and that result seems to say no, I definitely can't. That I need to
do tuning, it's not even data. You can't even transfer these hyperparameters across datasets.
There's no reason to think you should be able to transfer them across tasks, which is a much larger
gap, right?

</turn>


<turn speaker="Gabor Melis" timestamp="23:37">

Yeah. And also across implementation. Right. Implementations I guess. So a different system can add
up.But this brings me to the point, to one of my pet peeves basically. So whenever we say that we
test the model, we often have a training testlet and we also care about transfer learning and this
PTB train on PTB and apply on Wikitext to set up was kind of a transfer. But it's not a binary
thing. You can, you can take PTB and make sure that those tests centers are very different, more
different, less overlap in the training set as you normally have and how much effort, how much you
put there or how different you make the tests set is, it's a continuum. At one extreme you train on
one data set, you get another.

</turn>


<turn speaker="Gabor Melis" timestamp="24:46">

But the way that we measure generalization with training and test sets splits often makes us forget
that there are very important implicit assumptions and factors in how we split those sets. And this
is especially important for domains that are highly structured, such as, all the linguistic
datasets. So sometimes I'm really not sure how relevant some of the work we do in NLP is in an
applied setting because of this, which is hard to do. Something about. I guess all the dataset
people who actually go about constructing datasets give way more thought to this, but let's keep it
in mind that all these data sets are toy PTB is the toy-eist of all right. You, can interpret, these
our results as saying that let's not use PTB anymore. Let's use sets for which regularization is not
an issue anymore, but then you have the other problem because training now takes ages.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:18">

Yeah, that makes allot sense. And I'm sure you don't mean to undermine the effort that went into
constructing the PTB corpus it did drive a lot of research, but in context of language modeling, it
has this very serious limitations.

</turn>


<turn speaker="Gabor Melis" timestamp="26:34">

Yeah. I think it survives a bit too long. And it's very convenient because everyone has PTB setups.
But we should probably move to more interesting datasets.

</turn>


<turn speaker="Waleed Ammar" timestamp="26:52">

So I have one last question. What do you think is the right way to evaluate language models? Some
people think perplexity is a great way to do that, other people think doing extrinsic evaluations,
machine translation or other tasks would be the right way to do it. But of course it's more complex.
So I guess one concrete question for you is how much of a difference have you seen if you try
different variations of the model, which have very different perplexities on a downstream task.

</turn>


<turn speaker="Gabor Melis" timestamp="27:26">

Okay. So we haven't really done a downstream task at all in this in this setup. But yeah. So the
ability of your language model will matter a lot in semantic parsing or anything that basically
employs the same building block often at least if you do neural models. The right way to evaluate
these things, we all know that perplexity is a proxy and it's a nice proxy that correlates with lots
of things, but it's still a proxy. And we have a nice number to tune for. And that makes us forget
that it's not what we actually care about. Machine translation is nicer in that regard because you
can make the argument that BLEU is closer to what we care about, but that only lasts as long as you
don't try to optimize directly for it.

</turn>


<turn speaker="Gabor Melis" timestamp="28:42">

Because if you start, you might see that you can improve the BLEU but not human's perception of
goodness. So all these metrics are, wrong. Some are more wrong than the other but the perplexity
seems to be pretty safe. It's correlates with lots of things. So I think it's a very important thing
to figure out what, to actually optimize for, how to come up with the losses. Maybe learn them, but
I think we don't have data sets or should I say dynamic environments in which language plays a role
in which you could actually deduce losses from environmental factors. That would be nice but we
don't have that.

</turn>


<turn speaker="Waleed Ammar" timestamp="29:37">

All right. Thank you very much for the discussion. I hope more people will be as careful as you did
in this paper evaluating the different variations of their models. Thank you.

</turn>


<turn speaker="Gabor Melis" timestamp="29:50">

I wish them all as much gray hair as I get.

</turn>


<turn speaker="Matt Gardner" timestamp="29:55">

Thanks.

</turn>


<turn speaker="Gabor Melis" timestamp="29:56">

Thank you very much.

</turn>
