---
title: "Classical Structured Prediction Losses for Sequence to Sequence Learning, with Sergey Edunov and Myle Ott"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Sergey Edunov","Myle Ott"]
number: "053"
tags: []
description: "NAACL 2018 paper, by Sergey Edunov, Myle Ott, Michael Auli, David Grangier, and Marc'Aurelio Ranzato, from Facebook AI Research In this episode we continue our theme from last episode on structured prediction, talking with Sergey and Myle about their paper. They did a comprehensive set of experiments comparing many prior structured learning losses, applied to neural seq2seq models. We talk about the motivation for their work, what turned out to work well, and some details about some of their loss functions. They introduced a notion of a \"pseudo reference\", replacing the target output sequence with the highest scoring output on the beam during decoding, and we talk about some of the implications there. It also turns out the minimizing expected risk was the best overall training procedure that they found for these structured models. https://www.semanticscholar.org/paper/Classical-Structured-Prediction-Losses-for-Sequence-Edunov-Ott/20ae11c08c6b0cd567c486ba20f44bc677f2ed23"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F417310266&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar we are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:13">

All right. Today our guests are Sergey Edunov and Myle Ott who are researchers at Facebook AI
research and they're here to talk to us about a paper that recently got accepted at NAACL 2018
called Classical Structured Prediction Losses for Sequence to Sequence Learning. Sergey, Myle,
welcome.

</turn>


<turn speaker="Sergey Edunov" timestamp="00:29">

Hello,

</turn>


<turn speaker="Matt Gardner" timestamp="00:30">

So last episode we talked with Sam Weizmann about a paper on beam search optimization, which is when
we have sequence models or structured prediction models. There are often better ways to train them
then simply maximizing the likelihood at the token level and your paper continues very much in this
vein, I guess what I got out of this paper was that it's a much more thorough exploration of the
options here and you ran a whole bunch of experiments. Is that a fair characterization of this work?

</turn>


<turn speaker="Myle Ott" timestamp="01:02">

Yeah, I think so.

</turn>


<turn speaker="Matt Gardner" timestamp="01:04">

So what to you is the difference between token level losses and structured prediction losses? Why is
this an important issue?

</turn>


<turn speaker="Myle Ott" timestamp="01:12">

Yeah. So as you mentioned, people typically optimize these token level or non-structured losses. So
you find this in simple classification or regression problems where your output is more or less just
a single scaler. So in the context of machine translation, you might train a model to say predict
the next word in the translation, conditioned on the source sentence that you're translating and
maybe the previous words in the translation that you've already produced. But this is basically a
multi-class classification problem. What we ultimately want is a model that can produce good
sequences. And so one way you can achieve this is by, instead of optimizing sort of this multi-class
classification problem, you can optimize the so called structured prediction losses. So these are
losses that are defined at a sequence level and over basically the entire space of possible outputs
not just individual tokens. And there's a couple of reasons you might want to do this. I should go
into this.

</turn>


<turn speaker="Matt Gardner" timestamp="02:18">

Yep.

</turn>


<turn speaker="Myle Ott" timestamp="02:18">

So one of the main the advantages of doing this is that it can let you optimize to a more
complicated metrics, than token level training. So an example of this is in machine translation we
use a metric called BLEU. So BLEU is basically a function of how similar your translation is to the
gold reference translation. But it can be decomposed into token level loss. So if you wanted to
optimize something like that you might consider using a structured prediction loss instead. And a
second advantage of these structured prediction losses that they address this exposure bias, this
concern that when you're doing standard token level training, where you are trying to basically
predict the next translated word conditioned on previous translated words.

</turn>


<turn speaker="Myle Ott" timestamp="03:13">

You basically give the model the ground truth translated prefix at each step. But at test time, when
you no longer have access to a ground truth translation. We instead give the model its own
predictions, which can be distributed quite differently than the ground truth translation and it can
potentially propagate translation errors. So with these sequence level losses you can train the
model, based on its own outputs, which hopefully addresses this exposure bias problem too.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:45">

So generation tasks are difficult, right and I noticed that all the experiments that you've run are
based on generation tasks, so I'm curious if you tried the same losses on other sequence prediction
tasks like part of speech tagging or name entity recognition.

</turn>


<turn speaker="Myle Ott" timestamp="04:03">

Yeah, I don't think we have yet, but I mean that would be interesting to try and I think a lot of
the brilliant work in structured prediction looked at some of those tasks as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:12">

But there's nothing fundamental that prevents us from applying the same losses to these tasks.

</turn>


<turn speaker="Myle Ott" timestamp="04:17">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="04:21">

And in fact your paper settled classical structured prediction losses, these are losses that were in
fact used previously on different problems, right?

</turn>


<turn speaker="Myle Ott" timestamp="04:30">

Yeah,

</turn>


<turn speaker="Matt Gardner" timestamp="04:30">

That's probably a good point then to talk about what you mean by classical structured prediction
loss. What are you talking about here?

</turn>


<turn speaker="Myle Ott" timestamp="04:40">

Yeah, that's fair. So there's no standard definition of classical, we're mostly referring to
structured prediction losses that were explored it in the 90s, early two thousands, often in the
context of log linear models, tasks, you know, some you mentioned, I name entity recognition or
other sequence tagging tasks, parsing OCR, stuff like that. But many of these losses haven't really
been tested and more modern neural sequence to sequence models. I think the beam search optimization
work you mentioned probably also can be considered classical in some sense from the learning and
search optimization work, but it's not quite structured in the same way.

</turn>


<turn speaker="Matt Gardner" timestamp="05:22">

Right. So then your point is, Hey, there was a whole lot of work back decades ago that did some
really cool stuff on making better structured models, we've kind of forgotten about them in the days
of neural seq2seq models let's rethink this and see if they actually help. Right?

</turn>


<turn speaker="Myle Ott" timestamp="05:38">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="05:39">

So what are exactly these losses they you talk about in the paper?

</turn>


<turn speaker="Sergey Edunov" timestamp="05:44">

So the main idea behind all of those losses is what you generate the set of sequences and you score
them, right. And then do you want to make sure about the best sentence, however you define the best,
is guessing the highest score and everything else is getting lower scores in particular you're
interested in sentences but are reachable by your model by the beam search, right well my details
how exactly you push the sentences up or down depends on the loss. While we considered five
different losses, I think. So let me briefly go over a few of them, but one that stands out is
sequence negative log likelihood. It's different from everything else because it doesn't take into
account at all the BLEU score, what it takes into account instead is the relative order of sequences
that you generate. And in effect is just the cross entropy, but applied to a sequence level instead
of a token level okay. The next loss that is interesting, is expected risk. The idea behind this
loss is again pretty straight forward, do you want to make sure, but you want to optimize expected
risk of sequences, that your model produces expected cost or expected BLEU in our case.

</turn>


<turn speaker="Sergey Edunov" timestamp="07:02">

And what we found is this loss works best across a wide range of different tasks and datasets. Then
we consider a bunch of margin losses such as max-margin. What this loss does is enforces the margin
between the highest scored candidate sequence and the correct sequence, and in our case we used the
reference and then the comes multi-margin losses, which is essentially an extension of idea of max-
margin, but here you want to enforce margin between all the sequences you produce and the best in
the reference.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:43">

One common theme here is, the idea of generating a bunch of trained outputs and using them to define
the loss function. Could you tell us a little more about how you do that?

</turn>


<turn speaker="Sergey Edunov" timestamp="07:52">

So we use beam search, we tried different beam sizes, the way we do it, we take our model when we
applied beam search to generate a set of hypothesis and these are our candidates, we score them
according to our model and we also measured variable scores to figure out which one is our best
hypothesis.

</turn>


<turn speaker="Matt Gardner" timestamp="08:15">

So just to make the distinction here, between this token level loss and the sequence loss a little
bit more clear. I thought we could dive a little more deeply into this sequence level negative log
likelihood loss here, the token level loss, assumes you have a model that decomposes at every time
step, you have a locally normalized prediction, every word they are outputting, and so you can
define your loss just at every time step, right. And then the sequence level loss says instead of
defining the loss of every word or instead of defining a probability distribution over each token
individually, I'm going to define a probability distribution over sequences and I'm going to have my
loss try to put the correct sequence above all other possible sequences.

</turn>


<turn speaker="Sergey Edunov" timestamp="09:01">

Correct.

</turn>


<turn speaker="Matt Gardner" timestamp="09:01">

The trouble there is that there's an exponential number of possible other sequences and so how do
you actually do this maximization? And so the reason for this candidate that you need this candidate
set that Waleed was talking about was; I need some way to manage this exponential set, is that's
fair.

</turn>


<turn speaker="Sergey Edunov" timestamp="09:20">

Yes. That's fair point. Yeah, of course it's an approximation so we don't compute those exact losses
because our search space is exponential in terms of number of tokens in the sequence, so what we do
instead is we generate a set of sequences that are reachable by model and we tried to improve those
particular sequences. So we tried different set sizes. We tried to go, I think to beam 64, but the
majority of our experiments we did in size five so our search spaces is relatively small compared to
entire space of possible sentences.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:59">

So the idea of using the pseudo reference I think is very compelling, but I don't see why we cannot
apply it in the token level losses. So we can easily extend the first loss function, that you use as
a baseline the TokNLL, instead of optimizing the performance for individual, the observed tokens.
You maximized the pseudo reference token.

</turn>


<turn speaker="Myle Ott" timestamp="10:26">

Yeah, actually I can talk a bit about that. I think. Let me make sure I understand the proposal. So
you're saying we can basically take the highest scoring in/output and then train the model in sort
of the standard token level. Against this beam output.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:43">

Right, I'm curious that that's the key. Like if that's one of the key things that let's entropy loss
and then we would like to know how well does it work?

</turn>


<turn speaker="Myle Ott" timestamp="10:55">

Yeah. So there is actually this really cool paper I think by Yoon Kim about this, it's like
Sequence-Level Knowledge Distillation. Where they do basically this, you take output from, you can
take the maximum scoring hypothesis or you can take the hypothesis that has the best, say BLEU score
and train a model at the token level with this, I think they motivated their work more with the idea
of having like a smaller student network that could match the distribution of the teacher, but, or
not match the distribution, but to reproduce some similar outputs. But yeah, I mean I think it seems
to work quite well. In our context. I think it's a little bit different. I think the, in an ideal
world our losses, as you guys mentioned are defined over the entire space of possible outputs and
it's because we're using this approximation namely a subset of candidates that we find, say via beam
search we use a pseudo reference more for practical reasons because if you include the actual
reference in the candidate set but the reference is not reachable by the model, you often find this
kind of generate solution where the model scores the reference very highly but can't actually
produce it?

</turn>


<turn speaker="Matt Gardner" timestamp="12:18">

That's really interesting because I'm not sure what you mean by can't actually produce it because
all of these models are, it's just a choice from the vocabulary at every time step and the
vocabulary is always the same. So it can always produce the reference. Right. What am I missing
here?

</turn>


<turn speaker="Myle Ott" timestamp="12:35">

So it can produce it in a literal sense. I just mean that it won't be generated via say beam search.

</turn>


<turn speaker="Matt Gardner" timestamp="12:43">

Interesting.

</turn>


<turn speaker="Myle Ott" timestamp="12:44">

With small beams.

</turn>


<turn speaker="Matt Gardner" timestamp="12:45">

So, yeah, this notion of the pseudo reference, I thought was really interesting in a, I wasn't quite
sold, but I guess this kind of makes sense. So, instead of like, you have the results of your beam
search, and instead of taking my reference, which may not be on the beam and saying, please take all
of the probability max that you put assigned to things on the beam and assign it to the reference
instead, or push it towards the reference, you're saying, find the best thing on the beam and push
all of the probability max towards the best thing and let's hope that next time I do a search, I get
something better on the beam next time. Is that kind of the intuition for what's going on here?

</turn>


<turn speaker="Myle Ott" timestamp="13:18">

Yeah, exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="13:20">

Interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:20">

I mean, since, so let me push on this a little bit more. Since the probability, so I'll talk about
the sequence log loss. I think that where we will see the distribution for the entire sequence, you
compose this into the individual outputs. So it's really not different from the token level, the
only reason using the pseudo reference helps is that for these outputs or the model is not or these
tokens are not in the beam, the model will assign a probability of zero for them. And that's the
same problem that you have in the token level NLL.

</turn>


<turn speaker="Myle Ott" timestamp="14:02">

Yeah so there is a couple differences I guess between the sequence level NLL and the token level
NLL, So yeah, I mean certainly we, because of our approximation of output space with this candidate
set, essentially assigning zero probability to the rest of the space. The other difference is that
the loss, we actually compute through the same gradient for all tokens in the sequence. Whereas with
token level we compute a separate gradient per token. So it is a little bit different in that it
sense as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:34">

More on the difference between putting in the gradients in these two cases.

</turn>


<turn speaker="Myle Ott" timestamp="14:39">

Yeah. So the gradient for the sequence level NLL is basically the same for all tokens in the
sequence. Right? But for token level NLL loss we have each token has its own target and it's own
gradient. So each token in a sequence gets a different gradient, right?

</turn>


<turn speaker="Waleed Ammar" timestamp="15:03">

But in the sequence level, it's an aggregation. It's really the submission of the individual tokens,
right?

</turn>


<turn speaker="Myle Ott" timestamp="15:10">

Yes.

</turn>


<turn speaker="Waleed Ammar" timestamp="15:11">

So that's practically if you match the token level, would not likely would you get the same effect
except I think in the sequence level you also normalize for the length of the sequence.

</turn>


<turn speaker="Myle Ott" timestamp="15:25">

So on the sequence level we do normalize for the length of the sequence and I mean we're computing
it over the sequence level probability, right? So it's a product of the token level probabilities.

</turn>


<turn speaker="Matt Gardner" timestamp="15:36">

Cool. So we've talked about some of the loss functions that you did. You also did some combinations
of losses, is that right? Have people done these combinations before? Can you tell us what the
combinations are that you did?

</turn>


<turn speaker="Sergey Edunov" timestamp="15:49">

So what we did is we, well what we found is that if you apply your sequence level losses, they are
kind of less stable in a sense of model will again learn and discriminate and assign a high score to
our high sequence, but that's does not, well, let's consider a sequence a sequence negative log
likelihood, right? It only cares about relative order. So as long as that model can produce, can
assign high score to the top sequence in the beam is perfectly happy and it doesn't need to really
push that sequence up. It doesn't needs to make sure that the sequence is assigned the high plus
score, right? What we found is what combination, if token level likelihood works as a kind of
regularize it kind of makes this training more stable. It keeps the model in some particular range
which we found useful. So we tried different ways to combine sequence level loss and token level
objectives and they all work roughly the same. What we ended up doing is just sum up a sequence
level loss and token level loss for an entire sequence, the particular weight. And when we optimize
that weight on a dev set.

</turn>


<turn speaker="Matt Gardner" timestamp="17:11">

So I guess a particular nasty failure case, you can imagine if you don't have this token level loss,
would be like I find something that has a really high BLEU score, but it's totally ungrammatic
right? Is that a good characterization of what's going on?

</turn>


<turn speaker="Sergey Edunov" timestamp="17:27">

So we've sequenced negative log likelihood the particular nasty case is what you find sequences, but
have very low BLEU score. Right? But the model routes them correctly effectively, right? So you
produce, let's say 10 sequences and well, the highest sequence in your model also has the highest
BLEU score, but that BLEU score turns out be very low. And since all that loss is, but since
everything that that loss cares about is the relative order of the sequences, it's perfectly happy
with this result.

</turn>


<turn speaker="Matt Gardner" timestamp="18:01">

Yeah. And that's only true because your using this pseudo reference instead of the actual target,
right?

</turn>


<turn speaker="Sergey Edunov" timestamp="18:06">

Yeah. But if we use actual target gain the, model learns how to discriminate between target and its
own output. And it happily assigns high score to the target but a low score for everything else.

</turn>


<turn speaker="Matt Gardner" timestamp="18:21">

So for instance, optimizing or minimizing expected risks will tend to drive up BLEU score because
the BLEU score itself is part of the loss and so it won't have this problem where it's free to just
have a ranking, but still if you don't have some token level feedback, maybe you'll get something
finds good sequences that optimize BLEU but aren't good from a language model or grammatical
perspective.

</turn>


<turn speaker="Sergey Edunov" timestamp="18:48">

Yeah. It essentially works reasonably well. So we had some experiments with risk loss. It still
improves the results. But what we found is that the combination of token level loss and RISK
performs much better.

</turn>


<turn speaker="Matt Gardner" timestamp="19:03">

And, this is maybe getting ahead of ourselves just a little bit but it's about time to move to this
anyway, you say minimizing expected risk works well on its own, but actually what you did was you
pretrained with the token level loss in the first place. Right?

</turn>


<turn speaker="Myle Ott" timestamp="19:17">

Right.

</turn>


<turn speaker="Matt Gardner" timestamp="19:18">

And so it's not technically on its own, even in the case that you're talking about.

</turn>


<turn speaker="Sergey Edunov" timestamp="19:23">

Yeah, that's correct. Well, we also tried to train from scratch using those losses. But again, we
use the combination of token level loss and sequence level losses in those cases and it works
reasonably well. But again, it doesn't work as well as when you fine tune always with a trained
model you should also take into account the computational cost because those losses the most
expensive part is generation of sequences, right? So for example, we trained our baseline model for
200 people. Right? And if you want to do similar thing with sequence level losses you have to do the
same amount of training. It's quite expensive to do these things. So fine tuning an already well-
trained model makes sense from a cost perspective.

</turn>


<turn speaker="Matt Gardner" timestamp="20:16">

Interesting. So I guess now's a good time to talk about the experiments that you ran. What did you
do? How well did these things work?

</turn>


<turn speaker="Sergey Edunov" timestamp="20:23">

What we found effectively, most of those losses perform very similarly. Well the risk kind of stands
out. It's a little bit better than everything else, but the difference is not huge. It was also very
surprising to find that those classical losses perform and compete if modern techniques like beam
search optimization well as long as you keep the same baseline of course.

</turn>


<turn speaker="Matt Gardner" timestamp="20:48">

It's almost like the stuff that we did back in the day actually is useful and it's a bad idea to
forget all of that stuff when you go to neural nets.

</turn>


<turn speaker="Sergey Edunov" timestamp="20:56">

Right, right. No, but it's true.

</turn>


<turn speaker="Waleed Ammar" timestamp="20:59">

So I was going to ask since the performance is not, that much different according to your results,
practically speaking, what would you recommend? Especially around time, like the cost of actually
running these experiments.

</turn>


<turn speaker="Sergey Edunov" timestamp="21:13">

So in practical terms what I will recommend is, well, these losses they perform really well on small
data sets, right? So, but I use cases where you have low resource languages in case of machine
translation, their bank can really help you improve your results. So yeah, they are quite expensive
another thing that could be done to actually. Well, in a practical sense is some combination of
online and offline generation. In our experiments we actually used online generation and we compare
that to offline, but it's totally possible to do some combination of those two, let's say you can
generate your sentences once in a while and then do several updates of, and then do several updates
of model. So there are things that you can do to make this training faster.

</turn>


<turn speaker="Matt Gardner" timestamp="22:11">

So I don't know that we've talked about what the differences between online and offline generation.
What did you mean there?

</turn>


<turn speaker="Sergey Edunov" timestamp="22:18">

So in online generation, basically on every form of pass you compute your, you generate your
sequences and when you compute your sequence level losses with respected those generated sequences,
right? What you can do instead is you can take your model, original model and just generate
sequences for your entire dataset. And then just use the sequences from entire training.

</turn>


<turn speaker="Matt Gardner" timestamp="22:46">

So you mean basically do beam search with your initial model and never update the beam and just use
that as, the set of things you're optimizing against.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:56">

Do you have a sense of how much we lose if we do it offline only?

</turn>


<turn speaker="Sergey Edunov" timestamp="23:01">

Yeah, I think we have a table. So in our results, you lose 0.4 BLEU on both validate and test if the
switch to offline mode, but this is much faster.

</turn>


<turn speaker="Matt Gardner" timestamp="23:14">

Interesting that loss. I'm trying, I'm looking at the other results that's almost as big as the gain
that you get from using these loses in the first place. Is that right?

</turn>


<turn speaker="Sergey Edunov" timestamp="23:24">

Correct. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="23:25">

So it's almost like if you use a stale model to do beam search, you're almost just as bad off as if
you, or maybe I'm reading the tables wrong,

</turn>


<turn speaker="Sergey Edunov" timestamp="23:36">

It's slightly improves your baseline, but it doesn't improve it as much as online generation.

</turn>


<turn speaker="Matt Gardner" timestamp="23:42">

Any other highlights you want to point out from the results in the paper?

</turn>


<turn speaker="Sergey Edunov" timestamp="23:46">

Well another thing that we noticed is that those losses performed really well when your model is
weak enough and again, if you train your baseline model and seal, it's very strong then the marginal
improvements that you get from applying the sequence level losses is relatively small, that was an
interesting find, Yes. That's it. Unless Myle has something.

</turn>


<turn speaker="Myle Ott" timestamp="24:09">

No, I think that's exactly right. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="24:11">

So it's hard to count even how many experiments there are in this paper. How long did you spend,
like how much compute time did you spend running all of these experiments?

</turn>


<turn speaker="Sergey Edunov" timestamp="24:23">

So we didn't track exactly how much time our entire project took, but it's kind of an advantage of
working in an industry research lab that's there. Where we have access though all this
infrastructure and awesome engineering, awesome engineers who can help us make these large scale
projects. Yeah, we actually found a lot of engineering challenges while doing this effort for
example, to make this thing work on a large dataset, WMT English to French, we had to implement
distributed training in fairseq, and it is now available in our Github, for everyone to us. Yeah,
this is, I was thinking about that too. Like someone at a university would almost certainly not have
the resources to do this kind of experiments. So I noted happily that you even have standard
deviations reported for one of the main results in your paper. So like you ran multiple runs,
accounted for training variants this would take an enormous amount of time. So it's, it is really
useful to have a really comprehensive set of experiments from someone that has the capacity to do
this. So thanks for this it's really nice,

</turn>


<turn speaker="Waleed Ammar" timestamp="25:34">

Right. I will add that this is one of my favorite kinds of papers where instead of trying to argue
for the latest and the greatest loss function or model it tries to take a broader picture and
analyze existing things and trying to come to conclusions. So thank for the work.

</turn>


<turn speaker="Matt Gardner" timestamp="25:52">

As my last question, do you have any practical tips for someone who it doesn't have access to all of
the engineering support that you did on, like any pitfalls that you might run into when you're
implementing this stuff?

</turn>


<turn speaker="Sergey Edunov" timestamp="26:05">

Well. Yeah. As I already mentioned, it's, it would be nice to have, think of some smart combination
of online and offline generation. As I mentioned, online is very expensive. Offline is very cheap,
but gives worse results. Maybe some combination of those two would really work better.

</turn>


<turn speaker="Myle Ott" timestamp="26:25">

One other thing we had to input a lot of loss functions in this work, right? Generally testing,
testing your losses is important. If you're able to try taking a small subset of your training set
and over fit that, right. And make sure that the loss is actually doing what you want was that
another thing that was pretty helpful when approaching this.

</turn>


<turn speaker="Matt Gardner" timestamp="26:50">

Cool. Any last thoughts before we conclude?

</turn>


<turn speaker="Sergey Edunov" timestamp="26:53">

No.

</turn>


<turn speaker="Matt Gardner" timestamp="26:54">

Okay, great. Thanks for coming on the show. It was really nice talking to you. Really nice paper.

</turn>
