---
title: "Learning What's Easy_ Fully Differentiable Neural Easy - First Taggers, with Andre Martins"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Andre Martins"]
number: "058"
tags: []
description: "EMNLP 2017 paper by André F. T. Martins and Julia Kreutzer André comes on the podcast to talk to us the paper. We spend the bulk of the time talking about the two main contributions of the paper: how they applied the notion of \"easy first\" decoding to neural taggers, and the details of the constrained softmax that they introduced to accomplish this. We conclude that \"easy first\" might not be the right name for this - it's doing something that in the end is very similar to stacked self-attention, with standard independent decoding at the end. The particulars of the self-attention are inspired by \"easy first\", however, using a constrained softmax to enforce some novel constraints on the self-attention. https://www.semanticscholar.org/paper/Learning-What's-Easy%3A-Fully-Differentiable-Neural-Martins-Kreutzer/252571243aa4c0b533aa7fc63f88d07fd844e7bb"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F455730531&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar, we are research scientists at the Allen Institute for
artificial intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:12">

Today our guest is Andre Martins, who is currently a research scientist at Unbabel. It's a
Portuguese startup which offers machine translation solutions at human quality. Andre also is an
invited professor at Instituto Superior Técnico, a researcher at Instituto de Telecomunicações and
just in case he has any time left, he consults for Priberam Labs. On a more personal note, Andre is
one of my role models in research. His defense at CMU was probably the first talk I listened to at
CMU. Most of the talk went over my head, later I heard his papers. I came to appreciate the
practicality and the scientific rigor of his work. So welcome to the podcast Andre.

</turn>


<turn speaker="Andre Martins" timestamp="01:04">

Thank you. Thank you. Yeah. And thanks for the nice introduction. I'm also a big fan of your work.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:08">

So today we're going to be talking about your paper titled: Learning What's Easy: Fully
Differentiable Neural Easy-First Taggers. Could you start by explaining what is easy first decoding
and why we might need it.

</turn>


<turn speaker="Andre Martins" timestamp="01:20">

Okay, so, the main motivation for this work is looking a little bit on the dominate approach as far
as structure prediction these days there are models like a sequence to sequence models and so on
that can be used to solve a lot of different tasks. They all decode in a left right manner. And this
is something that I find satisfactory. I mean it's true that you can already get spoken language as
a temporal dimension. It happens left to right in a way. But on the other hand, you feel decode you
get assumption, this can lead to things like error propagation you should omit every mistake early
on in your generation, then this is going to reflect on everything you do afterwards. Other problems
like labeled bias left, right bias like the fact that your model learns to do these also gives some
bias and in the end you get sub-optimal performance. So our initial motivation was to look at the,
to use like a planning mechanism that's a guide to your search. So instead of producing your outputs
from lefts to rights, trying to figure out what parts of the output is the easiest to predict first,
do something and then condition subsequent decisions on things that you have made before and it can
go with left and rights and proceed from there.

</turn>


<turn speaker="Andre Martins" timestamp="02:48">

This is not a new idea. I mean people are, have been working on easy first models a long time ago
and in NLP there's a few famous papers these at year four sequential problems like parts of speech
tagging. There's also implications to parseing. And and so what we try to do is to kind of use the
same sort of techniques, but avoiding reforming, discreet decisions. So we wanted to have like an
algorithm that was end-to-end differentiable and that allows us to learn the best ordering by which
decisions can be taken. So this doesn't happen in the classical vanilla easy first methods. So in
those methods I can describe it a little bit. Maybe it's better.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:36">

Yea, that would be good.

</turn>


<turn speaker="Andre Martins" timestamp="03:36">

So difficulty, you know, let's suppose that you are, that you want to tag a sequence. For example we
want to do parts of speech tagging. Now we start by scanning your sentence, looking at words
possible part of speech tags for that word. Then you use some sort of model to compute the score for
each tag, for every possible word, every position. And then you decide to start with the words and
end the tag that jointly has the largest score individually you use that, you start by performing
the action you are most confident about. So let's suppose you pick word number five and say it's a
noun, you scan the sentence again all the other words. And you condition your score computation on
actions that you have performed the way. So for example, maybe you are going to pick a word that is
next word, five, maybe word four or maybe what, six because that can give you some information about
what part of speech tag is likely to be next to a noun. And so you do it and you just proceed doing
this until we've completed the entire sequence.

</turn>


<turn speaker="Andre Martins" timestamp="04:38">

And so the way you learn a model to do this traditional methods is not to try to optimize over all
possible orderings because there is a factor in a number of possible arteries. This is a very
communitorial search space. Typically what we do is you just, do things like a great scent or
perception that are going to penalize you for you know, mistakes on your sequence tagging, but they
are not going to inform your model about what would be the best ordering strategy to start tagging.
So you just rely on these realistic, that the largest score means that you should probably start
with things that we are most confident about. And so what we do in our model is to try to optimize
for the ordering as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:25">

A question before we go to who was it you introduce in this paper, I find it a little strange that
his is not a standard or the standard way people do decoding. It's very intuitive. I haven't done it
myself, so I don't have a good sense of how well it works. You know, even like the older methods
that people used, what one particular thing I'm concerned about is efficiency because you need to
make the same, you need to make inference for the same token multiple times. To what extent this a
problem in general and I think it applies in both the previous work and also the method introduced
in this paper.

</turn>


<turn speaker="Andre Martins" timestamp="06:05">

Right, right. And that's a great question. So there's a price you pay, these methods that are a
little bit slower because you need to scan the sentence multiple times. There are some things that
you can add to the model, for example, for sequential tagging. If you can constrain, okay, let me
just choose between tagging the word on the left side or tagging the word on the right side. So that
avoids looking at all the other words. In dependency parsing work there's a nice work by Yoav
Goldberg, and Michael Elhadad. They also formalized parsing as should I attach the next word on the
left or should I attach the next word on the right. And they came up with a nice strategy that can,
I think in the end they got like an additional load factor and they're decoding so it's not too
heavy. In our case, we didn't exploit those.

</turn>


<turn speaker="Andre Martins" timestamp="06:53">

Our hope is that was that we could eventually in the future come up with something more efficient by
exploiting the sparsity off our model? Which kind of maybe I'll post on that part when I describe
what our model in full detail. But in this paper we were not very concerned about efficiency. This
is just like a first step into neutralizing this idea of easy first tagging and making it
differentiable and apply it to sequence tagging, which is a simple problem. And we, in the future,
our idea is to extend this to more complicated structure prediction problems and to start looking at
efficiency.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:32">

So would you say that that efficiency or the lack of efficiency of previous methods for easy first
decoding? Was the primary reason why it's not widely adopted?

</turn>


<turn speaker="Andre Martins" timestamp="07:42">

Yeah, I mean maybe that and also simplicity also, I think that there was not like four problems like
part of speech tagging which is one of the tasks where people started to do easy first decoding. So
there is a paper by Yoshimasa Tsuruoka and Jun'ichi Tsujii in 2005, I think it was called
Bidirectional Inference. So it came by different names. There's also some work by Kristina
Toutanova, Cyclic Dependency Network, which are related to this as well. I think there's also the
fact that the models are a little bit more complex then other of the existing models and in the end,
we don't get like a much larger accuracy, probably because of the fact that you are not really your
model is not really learning the right ordering by which you should make decisions. It's relying on
this idea that a bigger score means that you should perform that action first.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:38">

Yeah. Could you explain how, I guess the limitations of the previous work, I guess one central
concept that has been used that your using in your work is the cost of a sketch and it doesn't
really lend itself naturally to neural models so If you could elaborate on this a little bit it
would be helpful.

</turn>


<turn speaker="Andre Martins" timestamp="08:55">

Sure. Okay. So, actually I think let me go back to the vanilla easy-first algorithm, because I think
it makes it easier to understand what we're doing differently. So, in the standard, vanilla easy-
first method, there are a few variables that you need to maintain. So you need to keep track of what
are the positions that you have covered already. So I think I'm still thinking about sequence
tagging as the, problem so we need to keep track of which words you tag already. So sort of covered
positions. You also need to keep track of what are the part of speech tags that you have assigned
for those words. And that did you set, what you are doing is picking your words and the doc for
network. And what we are doing is getting rid of all discrete variables in this model.

</turn>


<turn speaker="Andre Martins" timestamp="09:44">

So instead of picking a single word, we are using a probability distribution over all the words. So
by using attention mechanism, we are basically computing elements you should attend to which words
to perform the next section. So this is one of the differences. The second one is instead of you
know, keeping a set of positions that we have covered already. We keep how much attention each word
has already received, how much community attention each word has already received, like how much
from UT mass if we already spent for each particular word. So you can regard this as kind of a
continuous relaxation off zeros and ones that will denote whether word was already tagged or not. So
we can get something which is between zero and one because we are using a special kind of attention
that I'm going to talk about later. And the third aspect is the sketch that we are mentioning.

</turn>


<turn speaker="Andre Martins" timestamp="10:43">

So instead of keeping track of what are the parts of speech tags that we assigned for the words that
we have already tagged. We keep a continuous representation for those tags. That we call the sketch.
So the sketch is basically, you know a metrics, the number of columns of that metrics, number of
words in a sequence. And for every word we have a vector, we can regard that vector as output
embedding. So we never predict labels as the algorithm goes. You only predict them in the end. So
what the algorithm is doing, is deciding which word to attend but in a problematic manner. So it
computes an attention distribution over the words. Then it is going to emulate the sketch but
uplifting more words for which it spans more attention and after doing that, that's the community of
attention for all the words. And it does these in several steps for consistency with this first
algorithm you can set the number of steps to be the number of words which kind of means that you
know, you spend the same amount of attention to every word, you devote one unit of property to every
word.

</turn>


<turn speaker="Andre Martins" timestamp="12:02">

And then at the end we obtain a full sketch, that contains the embeddings for all the words. And
then there is a final softmax layer that is going to look at those embeddings and just use a softmax
too, compute a probability for the final items.

</turn>


<turn speaker="Matt Gardner" timestamp="12:20">

How do you compute the output representation? It's a function of the inputs and the attention. Is
that right?

</turn>


<turn speaker="Andre Martins" timestamp="12:27">

Yeah. So, the sketch metrics, the way we updated it is by, so we start by computinga representation
for every word that takes into account the neighboring words, the context of that word and also the
context of the sketches. So the sketches in the context of that words, right? The current sketches
and the attention that we, that we have for every word from that we update the next sketch. So
intuitively let's suppose that a particular step the attention peaks on a particular word like 90%
probability goes to word number four, and the other 10 are spread to the other words, I'm going to
update more of this sketch for these words, but I'm still going to take a little bit for the other
words. Yeah. And on updating the sketch for this word I'm going to not take advantage of the
sketches in the context of these words, the current sketches. So the final sketch is going to be
functional, the previous sketch. [inaudible]

</turn>


<turn speaker="Waleed Ammar" timestamp="13:35">

So it seems to me that one of the primary differences here is that you're not committing to a
choice, a label for each for the words that you consume. You allow yourself to make mistakes at the
beginning, maybe we're still like trying to solve an easier, to label an easier for of input first,
but we might still make a mistake and then we can reconsider that decision later and only make that
decision at the very end.

</turn>


<turn speaker="Andre Martins" timestamp="14:03">

Exactly. Yeah.

</turn>


<turn speaker="Waleed Ammar" timestamp="14:05">

Would you say this, do you have any intuition on whether the model actually does that have you seen
any examples of labels where if you were to use this from an earlier stage you would make more
mistakes.

</turn>


<turn speaker="Andre Martins" timestamp="14:20">

So what we observed empirically for the experiments where we actually do number of steps as the
number of words, which is more similar to the way we do it the first time, is that the model doesn't
tend to revisit the same word multiple times. Or let me rephrase that. Typically if in one direction
you spend, let's say 70% of attention to particular words, it's likely that in the next iteration
you're going to spend the rest 30 percent.

</turn>


<turn speaker="Andre Martins" timestamp="14:50">

So it's rarely case that you spend a little bit of attention to word and then some with other words
five steps later you revisit these words we didn't observed that very often. It happens sometimes,
but not very common. But we also did some other experiments where the number of steps was not equal
to the number of words, it was less the model is able to do some sort of parallel processing. So it
starts looking at words in different positions at the same time. Yeah. This was interesting for an
inference recognition, for example, where at the same time a model can be looking at two entities at
the same time in a sentence computing sketches for those words and in the end, it requires fewer
sketch steps because it takes advantage, of these parallel visiting behavior.

</turn>


<turn speaker="Matt Gardner" timestamp="15:45">

Can I paraphrase how this one works? Just to make sure I'm understanding what's going on and you can
clarify some details. So I have his input, some word embeddings for some sentence and then I run it
through some bi-directional LSTM or similar to get contexts vectors. And then I have this sketch
mechanism for some number of time steps, computes a constrained attention over my inputs and then
uses that attention plus my current sketches plus the word embedded in the LSTM outputs to update
the sketch in a soft way. And I do this for some number of times steps. And then at the end I take
the sketch representations and I predict labels, even though the sketch, is that right?

</turn>


<turn speaker="Andre Martins" timestamp="16:29">

Yeah exactly.

</turn>


<turn speaker="Matt Gardner" timestamp="16:31">

And then how do you actually do the prediction? Is it all independence after you have this done?

</turn>


<turn speaker="Andre Martins" timestamp="16:36">

The final production? Yeah, the final prediction would do everything. So actually let me rephrase
that. For one experiment, we also had the CRF layer instead of the softmax. So that was not in the
bands [inaudible] because there, is a, can we stick dependency between the labels? You cannot have
like a inside tag after an outside tag right. So we need to have a tag first, for all the other
tasks we did a re-ranker.

</turn>


<turn speaker="Matt Gardner" timestamp="17:08">

Okay. So then the simplest kind of tagger that I can build in the neural model these days is to have
word vectors run it through some bi-directional LSTM and then decode. I like predictive tags using
the upper representations that each hidden the hidden state output from the each word of the BiLSTM.
I could view your sketching algorithm as essentially another L step layer number of word step layer.
It still meets that same API, right? I'm still getting word vectors, as input and then different
word vectors where there, here it's the sketch vector for each word as output. And so this sketch
actually is acting it seems a whole lot more like some different kinds of MultiStep self attention
kind of operation. Right? Is this actually doing easy first? Like what's going on here?

</turn>


<turn speaker="Andre Martins" timestamp="17:58">

Yeah. Okay. So that's an excellent question. So okay. There are two comments that I have. So, one is
actually name, we cannot regress in the name that we chose for this model. I think it can be a
little bit misleading. To call these easy first, because it's, it's not easy in the same sense that
vanilla first algorithms are easy. yeah. So we can motivate easy first, by performing actions that
you are most confident about first. But in our case, it's not really that we need a little bit more
than that. We are kind of learning a strategy that tries to perform the best actions first, even if
they're not easiest ones. So for example, for some of the experiments that we did in the part of
speech tagging, we observed that it was typical that the models spent in the first round. Most of
the attention went to verbs, but verbs are typically use. So those are definitely not the easiest
actions to perform. But the reason that he was attending to verbs first is that they are good to
give you like a global perspective of how the sentence is going to look like because you can then
look at the arguments of those verbs and so on. So yeah, I would say that easy first can be a little
bit more than that. It's trying to optimize for the best strategy. So you went some other remarkeing
questions.

</turn>


<turn speaker="Matt Gardner" timestamp="19:28">

Right, even you said that this is like some kind of different kind of decoding except really at the
end what you have is a representation for each word. That's just, that's a hidden, some hidden
dimension. It's different from your initial LSTM output and then I'm just doing independent
prediction. At every time stamp.

</turn>


<turn speaker="Andre Martins" timestamp="19:46">

You can also, you can regard it to multiple decoding steps or optical coding, but you are decoding
or something like that where we are repeatedly computing a potential for inputs, refining your
sketches, then attention again. Then refining the steps so that that's a, there's some work that
does something like that. Yeah, so we have a discussion about related work in our paper. That was
not our initial motivation. There's a, I think our model is a little bit different in the sense that
you keep kind of a global state along the way. So we have this community of attention that kind of
limits how much attention you can give to the same words. So it's not that each sketch step. It's
not the case that it only depends on the previous one. It depends on the entire scenes that we have
done so far. Because we, first of all, we need to keep track of how much attention each word has
received already. So we really try to promote diversity in each of these sketch steps. And I think
this is a one unique aspect in this approach.

</turn>


<turn speaker="Matt Gardner" timestamp="20:58">

I think it's really interesting how you approached this. I think I do think that you ended up at a
place that's in the end, very similar to the transformer, multi-step, self attention kind of thing.
It's just because you approached it from the easy first kind of mindset. You have very different
constraints that give you, a model that's unique. It's, it's interesting.

</turn>


<turn speaker="Andre Martins" timestamp="21:18">

Yeah, I agree. Yeah. That's an interesting connection with the transformer network. Yeah, I agree
with that. I think that there's also some challenges here. So one thing that you notice, you don't
see that in the paper, but I can discuss it now, one thing that you notice is that if you look at
the documentation graph, there are a few you know, long range dependencies there because you are
doing these multiple attention steps. One thing that you needed to do in the end before the final
softmax was to have some sites and kind of a skip connection that puts the bi-LSTM States as well in
the last layer. And we tried, we didn't like that very much. We wanted the model, okay, these models
would be able to do all these sketch steps and in the end just use the final steps. It should not
need the initial bi-LSTMs, but they were actually necessary. And our intuition about why they
weren't necessarily is that the gradient was kind of vanishing over all these contextual graphs. So
we might be suffering some sort of punishing grade problem with this approach. I think it is a very
interesting problem that we need to look at more casually.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:25">

So another important part of this model is the attention. So you mentioned two kind of requirements
or designer properties for the attention that you use here to distribute like the weights across the
inputs. So could you talk a little bit about the evenness and the sparsity constraints, why they're
important, how you enable them.

</turn>


<turn speaker="Andre Martins" timestamp="22:49">

So the sparsity constraint is our attribution there was try to make our model a little bit more like
vanilla easy-first algorithm. By try to push the attention to be peaks on one word or at least a
small number of words and giving exactly zero attention to everyone else. Also. Because by doing
that we were looking at something that could be competition. Cause if you have like a long sentence,
let's say 50 words, but at each step you only attend to two or three words, maybe there is a lot of
steps in the outcome that can be made faster by explaining these things in a smart way. So it was
one motivation for sparse attentions.

</turn>


<turn speaker="Andre Martins" timestamp="23:33">

So, so that you sketch that looks at a small number of words did even as property, it was kind of
review as we started to experiment with this model, we just standard softmax and sparse max realize
that there was many sentences in which the model would give attention to the same words over and
over. We do a little bit of a difference but not that much. And in the end we seem to work
performance. Like for example, for part of speech tagging, there was kind of a default behavior,
which is the model chooses a default type, like the most frequent type. It doesn't really attend to
words that have that type. It just attends the others. But sometimes it wastes too much attention to
the same word over and over. So we needed something in a model that this discourage the model too
put the attention over the same words all the time. We started by doing something like a soft
constraints, like putting a penalty on the scores for words that have already received some
attention. So we did similar keep track of how much community of attention each word has received.
And then you have like a linear penalty that you know, tries to move the attention away from that
word. But to keep these more similar to the original easy first motivation. And because we also
wanted to do these at the same time if possible, we thought about, Oh, maybe we can with some put
some hard constraint on the attentions such that you know, we keep accumulating how much actually is
what has received, but you give exactly one unit of credit to every word. So in the end each word
needs to get exactly one unit of probability.

</turn>


<turn speaker="Andre Martins" timestamp="25:24">

And then if it's exhausted, if it exhausts all these probability max, we just get it done. Just say,
okay, this word doesn't have any more credit. So there is no more attention going into these words.
Or if the word already used like let's say 70% tension, there's only 30% remaining, then you could
put a constraint like, okay, let's go get attention. But that's good to hyper bond constraint. Like
this word cannot receive more than 30% attention. And in terns out that, there's a very nice way of
formalizing these. So you can rewrite the original softmax by using [inaudible] as minimizing a
function that includes the entropy penalty and the linear function. And that's objective. He's going
to correspond to a version of the softmax. So we wanted to do something similar, but we think some
additional hard constraints.

</turn>


<turn speaker="Andre Martins" timestamp="26:26">

So let's have the same objective. So like a linear objective and the entropy penalty. But now let's
say that we also want the final probability to be a separate constraint. This work cannot receive,
each word and receive more than these upper bounds of probabilities. And so we formalize this and we
realize that, Oh, we can actually optimize. You can actually compute the minimizer of these problems
very efficiently. Which is needs, right? So, you know, for neural networks, you also need to compute
gradients, right? So our next thought was, Oh, okay, so maybe you can also do something with
gradients and by writing all the conditions and so on. We realize that there's also a closed form
expression for computing the gradients of these both with respect to the scores, but also we respect
to the upper bounds, which is quite neat because this means that you can use these constraints
softmax attention with upper bounds are a function of your competition.

</turn>


<turn speaker="Andre Martins" timestamp="27:36">

So you know, in our case it's very simple we are just accumulating how much attention as we see it.
But you can imagine, you know, something more sophisticated I don't know, original encoder or
whatever there is some variable there that is like a meaning of that variable is given the upper
bound each word and you can plug that in these constraints, softmax attention and you can back
propagate everything back. So yeah, so this was what, what did with softmax? And this idea is so
there, there is like some years ago, like this line of research on posterior regularization, which
is basically you know there are different angles that you can use to motivate this framework. But
basically you have some scores, you want to compute some {inaudible} scores, but you constrain
You've got some, some constraints about your probabilities or okay, let me rephrase that?

</turn>


<turn speaker="Andre Martins" timestamp="28:43">

You have some constraints that you need to demand an expectation, then you can rewrite this
expectations like a integration between a probability factor and some features and we can regard
this constraint softmax. It's a very simple particular case of regularization. So we are currently
thinking about other ways of extending these to more sophisticated constraints. But yeah, so the
basic idea is we start at softmax and then we put some constraints on top for this particular kind
of constraint, which is very simple. We have a close from expression for doing the forward step and
for doing the backwards step.

</turn>


<turn speaker="Matt Gardner" timestamp="29:21">

So I've seen a lot of alternatives to the softmax recently. There's yours sparse max. You have this
constraint softmax. I've also heard rumblings of this Gumbell-Softmax trick might do something
similar to that easy first notion that you're trying to do, like if you're trying to predict
discrete things but be able to differentiate or back propagate through these discrete decisions. You
could, I think as I understand it, the Gumbell-Softmax would work here or reinforce why constraints
softmax instead of other other options would they work?

</turn>


<turn speaker="Andre Martins" timestamp="29:54">

So okay. I don't, we never considered to use a gumball softmax here. So like the way I see it is
more like a sampling trick. So we are trying to, for this particular model we're trying to avoid
sampling completely. So we set up going that route. We tried to have like a fashion that is
completely differential. So I guess that was one of the reasons why we chose the softmax.

</turn>


<turn speaker="Matt Gardner" timestamp="30:22">

And reinforce, would reinforce work.

</turn>


<turn speaker="Andre Martins" timestamp="30:25">

Yeah. I mean it's, we avoided it for some reason. I mean people could do something similar with
reinforced and keeping discrete actions. It will just be a different approach. But yeah, I would say
that would be an alternative to this.

</turn>


<turn speaker="Waleed Ammar" timestamp="30:40">

It is not immediately clear to me how the constraint softmax enabled sparsity it's clear how it
allows you to do make the problems like the weights eventually even but how do grantee sparsity
here?

</turn>


<turn speaker="Andre Martins" timestamp="30:54">

Oh, okay. So, so it's kind of like if you regard sparse max as something that gives you a result of
sparsity in the sense that the for each sketch set some of the words that are getting zero
probability and you know others that are going to receive some attention, constraints softmax is
giving you vertical sparsity and its already underway. But it's more like a, when you exhaust the
attachment, when word exhausts, the amount of probability that it can receive after that point is
going to be zero all the time. So we have some spots in the paper where we are showing detention
over all the sketch steps. And when you use the constraint soft, it looks like raindrops. So it's,
you see like some colors there that show much attention to words we see and then suddenly it stops
and it gets gets zero attention after that one. So yeah, it's, it's that kind of potential it does
involve sparsity.

</turn>


<turn speaker="Waleed Ammar" timestamp="31:49">

So it doesn't guarantee in the first route for example.

</turn>


<turn speaker="Andre Martins" timestamp="31:56">

Yeah. So actually the first step is going to be exactly the same as softmax because your constraints
are going to be completely used. So this is something that I forgot to mention. If you think about
the constraints of softmax, there are two extreme cases. One is if your upper bounds is a factor of
ones or any factor that is larger than ones then this is completely on constraints. So solution of
that problem is going to be exactly softmax, this is what happens in the first situation. And on
the, on the other hand, if your upper bound vector, is this simplex treats a problem through
distribution then the constraints are going to be tight, which means that the solution is going to
be exactly a factor of the constraints, this is what happens in the last situation of these easy
first algorithm Yeah. So the interesting stuff happens in between these two extremes.

</turn>


<turn speaker="Waleed Ammar" timestamp="32:48">

Right, so you've had a bunch of experiments, what are the main highlights of the results.

</turn>


<turn speaker="Andre Martins" timestamp="32:54">

So yeah. So we applied this to three tasks. Part of speech tagging, with a bunch of different
languages using using universal dependency treebanks, experimented using named entity recognition,
and translation quality estimation. For part of speech tagging, we got some marginal improvements
over biLSTM tagger. But I wouldn't say that the differences are striking. So it's very small, like I
don't have numbers that are like below some 1 point some average its like a small improvement.
Overall it seems that for all the languages that we tried, it was better than the baseline for most
of languages. But by a very small difference, it's interesting to look an then to put it aside. like
look at what exactly is going on? Like why was the model putting detention over time. And we have
some plots in the paper that try to show this. So for parts of speech tagging, as I was saying in
the beginning, we noticed that it's very often the case that model prefers to disambiguate firsts
first.

</turn>


<turn speaker="Andre Martins" timestamp="34:00">

Which usually you find surprising. But our interpretation for that is that if you disagree with the
verb, then you get a very good feeling about what happens in the rest of the sentence. So maybe it's
like the right thing to do as a, in a longterm strategy if you want to tag the sentence. So we also
noticed that the model tends to learn too. You don't, you didn't, it doesn't jump very often. So if
you exhibit weight where if you, if you put most of the attention on word number five on the next
step, you're probably going to finish with one number five. And then your going put most of the
attention on word number six or word number four eventually you are to the left of the word you
started with. So there are some exceptions, but this happens most of the time. And we also compared
different attention strategies. So we compare using constraint softmax with just using softmax, with
using sparse max and with the vanilla easy first.

</turn>


<turn speaker="Andre Martins" timestamp="35:02">

So there's a figure in the paper that, you know, the four plots side-by-side. And so with softmax we
noticed that you know, the model tends to put attention over the same words, it is just not very
interesting and they're words that know, and that's our ignored. And that reflects in the score. So
you should get the title of results then the models that just do softmax tend to be worse then the
ones that used constrained softmax. And the case of sparse max the performance is actually quite
bad. And so it kind of suffers from the same problem as softmax, giving the attention over and over
on the same words. But it's even more striking because since it's sparse, then there are some words
that are completely ignored. And in the end it just gets some default tag or something that is that
might not be the best choice.

</turn>


<turn speaker="Andre Martins" timestamp="35:52">

So in the end the form is one or two points below the others. And, and the vanilla easy first is
like the extreme case where the attention is completely peaks at each points as expected because
it's been hard attention. So he's speaking one word at a time. But one thing that you not do and was
different from what we're expecting is that the other choice is very different from what we get in
constrained softmax, we initially were expecting, Oh, the model is just going, it's just going to
learn, do something similar to easy-first. But it turns out that it learns completely different
orderings which are not like the things that model was confused about. So that part was interesting.
So for the negatives recognition, we tried something different, which is instead of ending all these
sketch steps, having a small number of sketch steps, for example, five steps, 10 steps. So we tried
a different number of steps.

</turn>


<turn speaker="Andre Martins" timestamp="36:49">

And we noticed that in that task, in NER, you have this BIO tagging and you know, there is one type
which means no entity that is much more frequent than all the other tags. And we thought, okay,
maybe the model doesn't really need to spend a lot of time attending to words that are not entities
or not parts of entities. So maybe we don't need as many sketch steps as in part of speech tagging.
And this hypothesis was confirmed in our experiments. So the model that just uses five sketch steps,
that's fine. And it outperforms the standard biLSTM So, our results are not state of the art because
our model is not as strong as other models that have been proposed in the literature. But we can see
that there is a, there is a logical difference than in the parts of speech tagging case when you
include these sketch steps in a model as opposed to just using the biLSTM.

</turn>


<turn speaker="Waleed Ammar" timestamp="37:51">

Is there a natural way to reason about the number of steps needed during the decoding instead of
pre-specifying it?

</turn>


<turn speaker="Andre Martins" timestamp="37:59">

No, that's, that's a good question. So there's a related model, by Alex Graves, I think where they
actually tried to learn the bond week, like how much time they need to refine the decoding so to
speak. I forgot the name that they called this.

</turn>


<turn speaker="Matt Gardner" timestamp="38:22">

Adaptive computation time.

</turn>


<turn speaker="Andre Martins" timestamp="38:24">

Yeah, exactly. Exactly. Yeah. So, there they tried to learn how many steps are needed. We didn't try
to do this, I mean it would be possible. It's just a matter of adding another variable in your model
or do exactly the same way as they are. Yeah. I guess that that could be interesting because
intuitively for some tasks, like for more complex tasks, maybe you need more sketch steps for
simpler tasks, maybe just one step is fine and this is a good compromise. And also this idea of
having different sketches is also related to draw. Which is another paper. Not in the computer
vision literature. Yeah, these are different. It's very different, they use a variational
autoencoder and make it recurrent and so on, but they also have this idea of producing sketches of
their outputs along the way. So this is actually what motivated our name, sketch for our metrics.

</turn>


<turn speaker="Waleed Ammar" timestamp="39:24">

I guess that concludes the NER experiments.

</turn>


<turn speaker="Andre Martins" timestamp="39:27">

Oh, so yeah, there was a, we also tried these using quality estimation. So I mean we did them. The
results were kind of similar to what we observed with NER. There was some improvements over the
model that just uses the bi-LSTM states, the improvement was not as big but so, and the reason why
we were we got this is that this is quite related to the research that we are doing as Unbable.
Where we are investing a lot in participation. The things is that it was a little bit hard to put in
all the details in our strongest model into a model that fits this framework. So our numbers are,
you know, very far away from the current state of the art datasets.

</turn>


<turn speaker="Waleed Ammar" timestamp="40:11">

How do you formulate that qualitative estimation problem?

</turn>


<turn speaker="Andre Martins" timestamp="40:15">

So this is word level estimation where we are given some sentence and the translation for that
sentence, the machine translated a sentence. And our goal is to tag each word in the MT as good or
bad you know, to create data. for this task and compare that with both translations. So basically
translations that have been checked by human translators. And we check what words are inserted
deleted, replaced and so on. And you use that information to tag words in the MT as, okay, this word
is correct, this word is incorrect so on. So it's like a binary sequence labeling task. So yeah, you
just use the same model that we're using for NER and parts of speech tagging.

</turn>


<turn speaker="Waleed Ammar" timestamp="41:03">

So the input here needs to have both.

</turn>


<turn speaker="Andre Martins" timestamp="41:15">

The input is the source the sentence in the source language and the machine translated sentence. The
goal is to produce a translation score that doesn't use the reference at all. So for example my blue
scores were, so this will not be the case for everyone, but if you, if you think about most metrics
that are used in MT they require a reference, it compares a reference with the output of the machine
translation system and then rate it. In this case the goal is to build something that is able to
EMT, but without any reference just by trying to model fluency now automatically by inserting a
bunch of examples.

</turn>


<turn speaker="Waleed Ammar" timestamp="41:54">

Supposedly this can help you like re rank like a beam, a bunch of translations that your model
generated.

</turn>


<turn speaker="Andre Martins" timestamp="42:00">

Yeah. There's a lot of features and implementations to this. So one of them is if we realize that
all the words are correct, if you are very confident that the translation is correct, suppose that
we are working in a approach that makes machine translation, which is actually the case at Unbabel.
So you would have like a committees of human translators, that are going to fix the errors of MT. So
if you have part estimation that tells you, Oh, I'm pretty confident that this sentence is fine,
then you don't really need to assign to you when you can deliver it directly to the final customer,
and this is going to save translation costs and save time. On the other hand, if we, if the sentence
is not perfect, but or if you are doing this at the document level and you can identify what parts
of the document need to be fixed, then you can highlight those words and provided information to the
human translators and they will become a lot more efficient because they can go straight to those
words and fix them. They don't need to spend a lot of time reading the entire documents. So this is
all about making like increasing the productivity of human translators or making the entire process
faster and reduce expenses.

</turn>


<turn speaker="Waleed Ammar" timestamp="43:13">

And in order to evaluate your model that does quality station, to have human translators even rate
word level.

</turn>


<turn speaker="Andre Martins" timestamp="43:22">

So in our case, we obtain the okay in bad labels directly from post edited texts. So they don't go
there and mark the words as okay or bad, they just produce something better. And then we project
that information as a tag, as okay or bad, for every word. Then, to apply the easy-first algorithm
to this problem. The intuition is that the model is, behaving like a human, like it's looking at the
words, trying to look for words that are bad and then based on these decisions decide of what's
going to happen, in the context of these words and so on. So the model is trying to learn some sort
of reasoning.

</turn>


<turn speaker="Waleed Ammar" timestamp="44:01">

Yeah, that's really cool, so it is my first time to to learn about the stuff. That's why I wanted
you to elaborate so I see there's only one row in that table. So you're comparing two variants of
your model.

</turn>


<turn speaker="Andre Martins" timestamp="44:20">

Oh yeah. So yeah. I didn't mention this distinction, but there are two variants that we tried for
these easy first models, we call one single state update and the other one full state updates. The
difference is that, let me see if I can remember so the diffference is that in a single set of
updates, so you have, it's all about how you get the final sketch. So you have the previous sketch
and you have the attention in the single state update. You use the attention to collapse all the
word representations to single vector. And then you just will run one update of your sketch metrics.
It just updates you know something that's if the attention was peaked, it will just involve one
words. And then the full state updates, you look and there is all the words weighted by how much
attention the words receives. So it's not the one that won't update anymore, but the extreme case is
that if a word gets all the attention and all the others have zero attention. This is going to
behave like the new easy first algorithm. So only one called the map sketch is going to get updated.

</turn>


<turn speaker="Waleed Ammar" timestamp="45:30">

So I feel like the results consistently suggest that using their full updates instead of the rank
one updates is better.

</turn>


<turn speaker="Andre Martins" timestamp="45:38">

Yeah. In all tasks, So that was very consistent. We are not using the single state anymore. It
looked interesting in the beginning but the full state update is much better.

</turn>


<turn speaker="Waleed Ammar" timestamp="45:46">

Well any other thoughts on this paper before we conclude?

</turn>


<turn speaker="Andre Martins" timestamp="45:51">

Yeah, so I that there's, we are looking at future work for this or you know we already did some of
that work. So I mean our initial motivation for this paper was, okay, let's start with the simple
task sequence title and the later we want to extend this to other structured prediction tasks. So we
are thinking about ways of extending these to sequence to sequence problems or more complicated
problems that can hold generation. It's not straightforward because in that case you can have a
static sketch metrics. It needs to be dynamic because you don't know the size of your outputs. The
direction that we are already doing is to, so remember when I was describing the constraints of
softmax attention where sparsemax was sparse in results and the constrained softmax was parsed in
the vertical. Now we are playing with constraints sparsemax which is parsed on both directions.

</turn>


<turn speaker="Andre Martins" timestamp="46:44">

And so we are using these constraint attentions as attention mechanisms, in sequence to sequence
problems. So for example, in machine translation, there is this concept of fortuity that exists,
models. It's trying to predict you know, how many words targets. Each source words will be aligned
to, and it truly fits this framework of putting the constraint on the attention to which words. So
if you know the fortuity of the words, then you can bounce how much attention that word needs to
receive into the decoder. And we are playing a little bit with these ideas. With new kinds of
attentions.

</turn>


<turn speaker="Waleed Ammar" timestamp="47:22">

That is really neat, I will be looking forward to the next paper.

</turn>


<turn speaker="Andre Martins" timestamp="47:26">

All right. Thank you.

</turn>


<turn speaker="Matt Gardner" timestamp="47:27">

Thanks for coming on. This was a really interesting discussion.

</turn>
