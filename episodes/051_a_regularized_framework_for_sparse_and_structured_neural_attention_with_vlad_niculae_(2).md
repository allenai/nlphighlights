---
title: "A Regularized Framework for Sparse and Structured Neural Attention, with Vlad Niculae (2)"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Vlad Niculae"]
number: "051"
tags: []
description: "NIPS 2017 paper by Vlad Niculae and Mathieu Blondel. Vlad comes on to tell us about his paper. Attentions are often computed in neural networks using a softmax operator, which maps scalar outputs from a model into a probability space over latent variables. There are lots of cases where this is not optimal, however, such as when you really want to encourage a sparse attention over your inputs, or when you have additional structural biases that could inform the model. Vlad and Mathieu have developed a theoretical framework for analyzing the options in this space, and in this episode we talk about that framework, some concrete instantiations of attention mechanisms from the framework, and how well these work."
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F412719792&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
artificial intelligence. Our guest today is Vlad Niculae, Vlad is a PhD candidate in computer
science at Cornell, advised by Claire Cardie. He is also a scientific Python developer maintainer of
the polylearn library for factorization machines and polynomial networks in Python and sometimes
contributes to the scikit-learn machine learning library. Today we'll be talking about some of his
recent work on neural attention. Vlad, welcome to the podcast.

</turn>


<turn speaker="Vlad Niculae" timestamp="00:40">

Hi Waleed. Thanks for having me.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:42">

So the title of the NIPS 2017 paper we're discussing today is A Regularized Framework for Sparse and
Structured Neural Attention. Most models with an attention mechanism uses softmax to compute a
probability distribution over the inputs. So what are the limitations of softmax which you're trying
to address in this paper?

</turn>


<turn speaker="Vlad Niculae" timestamp="01:02">

Exactly. So softmax is the most commonly used mapping in attention, not just in attention, right?
It's very commonly used when you want to, generate a discreet probability distribution over some
items. Like words, which is basically what they do in attention. And yeah, we noticed that this is
one of the crucial points where people like to interpret neural networks. Because unlike most hidden
layers, the outputs of these attention mechanisms are interpretable because we know what the
dimensions need, they are the weights that you put on the words in your input. So it became very
common for people to show attention plots in papers and basically looking at these plots, you can
see that direct tendencies, you know, this seems to be like clusters of words that get similar
weights, but it's not quite there because as you said, softmax has some limitations from this point
of view in particular, it's dense. It gives some probability to every word and basically in the
general case, all scores will be different after a softmax tense form. These are basically the
motivations that drove us to look for how we could change these properties.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:19">

So just to be clear, you're saying that softmax gives away a little bit of the probability mass to
each input and that's undesirable. Is that a fair assessment?

</turn>


<turn speaker="Vlad Niculae" timestamp="02:28">

It could be, it could be undesirable sometimes for interpretability and you know, for some
applications we might not want to consider every possible word as having some contribution to some
computation. Right,

</turn>


<turn speaker="Waleed Ammar" timestamp="02:42">

Right. Yeah. I mean some people consider this to be a feature and not a bug, in the sense that we
don't want to be completely confident in our prediction cause we know that at least at the beginning
of the learning we're not that accurate.

</turn>


<turn speaker="Vlad Niculae" timestamp="02:56">

Yeah, I completely agree. It's also, so basically the whole reason why we use softmax is that we
cannot, and we don't want you as just a plain old argmax that would peak on the most competent word
and put like zero probability everyone else, first of all, this is a, a flat discontinuous mapping
that you can just plugin for neural architecture, but also it doesn't deal with any uncertainty,
right? Like the second or the third most important words might still play an important part in your
learning. So you don't want to ignore it. So indeed what we would like is some sort of middle ground
between these. And actually in terms of sparsity, this middle ground was already started in the
sparsemax paper by André Martins and colleagues previous to our work and they introduced a sparse
mapping that works basically as a drop into placement for softmax. And it still has uncertainty that
it doesn't peak on a single highest scoring word except if that word is like very unambitious
prominent.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:05">

You mentioned sparsemax, could you say a little bit more about it so that the audience is familiar?

</turn>


<turn speaker="Vlad Niculae" timestamp="04:10">

So sparsemax is a mapping that works just like softmax. So it takes a vector of scores and it
produces a probability distribution over the items such as words and it's tends to produce sparse
distribution. So unlike softmax it's assigns exactly zero weights to a lot of the words.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:32">

And your work is generalizing sparsemax, my understanding is that the general feeling that I am
coming up with is that we can see sparsemax as a special case as well as softmax.

</turn>


<turn speaker="Vlad Niculae" timestamp="04:43">

Exactly. So we were motivated by the work on sparsemax and, and basically the sparsemax paper, the
test form that is given, which is a projection on the simplex is just given in a way out of thin
air. So we were wondering whether they, whether sparsemax and softmax are actually products of some
sort of family that can be generalized further, right? Whether there's a family of transformations
that take scores and produce probability mappings and whether this family can be paralleled somehow
like for example, by an irregular riser penalty or some sort of function that can incorporate
desirable priors or properties onto the output probability distribution.

</turn>


<turn speaker="Waleed Ammar" timestamp="05:30">

Great. So how, what is the framework or the operator that you defined as the main proposal in this
paper?

</turn>


<turn speaker="Vlad Niculae" timestamp="05:37">

So what we proposed, which we call a regularized max operator is basically, based on intuition that
both softmax and sparsemax, what they really do is they try to approximate discontinuous peaking,
you know, one versus zero argmax operator. And the way they do this is, so we observed that you can
recover these to operators by taking the, conjugate of max and regularizing its conjugates right. So
with the negative entropy regularization what you get is softmax and with the L2 regularization you
get sparsemax.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:19">

What are the properties that you would get with each of these different triggerizers?

</turn>


<turn speaker="Vlad Niculae" timestamp="06:24">

So the entropy regularizer, because basically, so it has a value of a negative infinity, I think on
the edge of the simplex. So it prevents the solutions from being exactly sparse effects, like a
barrier.

</turn>


<turn speaker="Vlad Niculae" timestamp="06:39">

So this is why softmax has the properties that it does, this is why it's always dense. On the other
hand, sparsemax because it's the L2 penalty, it leads itself to a natural rewriting of the
optimization problem is just a Euclidean projection onto the simplex. And this projection is likely
to be sparse because it's likely to hit the edge of the simplex sort of corner. But we can also
incorporate other penalties. And this is what we did in our work. So the existing literature and
algorithms for structured sparse and structured sparse penalties in particular things like if you
use LaSO to derive what we call fusedmax, which is an attention mechanism that likes to fuse
together the weights of consecutive words so that after applying the transform, they get exactly the
same score.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:35">

And do you need to specify which of these should be considered as input or is this part of the
optimization?

</turn>


<turn speaker="Vlad Niculae" timestamp="07:42">

So with fusedmax you do not need to specify the groups. The groups are automatically selected in an
unsupervised fashion, which is pretty cool, but there are other kinds of structured sparse penalties
that we didn't look into in this work in particular group LaSO which allows the user to specify
groups that are known a priori. And to say for instance, it would make a lot of sense if you select
one of these words, please select all of these words together. So these are other kinds of penalties
that could be simply dropped into our framework in order to get an attention mechanism with this
kind of property.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:18">

Yeah, and both make sense in different situations. I think it's great to have a framework where you
can actually plug different regularizers, Any idea, how can we, a reason about the complexity of
actually computing the forward and backward when we're plugging in a new regulaizer?

</turn>


<turn speaker="Vlad Niculae" timestamp="08:39">

That's a great question. And indeed a defense. So in the general case, the forward pass is an
optimization problem, it's a constrained optimization problem. It could be solved with things like
this style or other projected gradient methods. But you know these are iterative methods that you
don't always wants to compute inside of a layer in your neural net. For specific cases, like
fusemax. We found that it can be computed very efficiently. I think n log n is what we have. And
that's because there's a property that's shows that, so we were able to prove that you can compute
the optimal value of the fusedmax stands for by computing the optimal value of the fuse LaSO
proximity operator, and then projecting the result onto the simplex. And both of these are
algorithms that have been previously studied independently. And basically all we had to do is just
after we prove this, we can just, you know, call the two functions from existing libraries.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:44">

So that's not very expensive, right? You are just increasing the costs from end to end login. I
think that's fine for the forward pass. So what about the backward pass for [inaudible]

</turn>


<turn speaker="Vlad Niculae" timestamp="09:56">

In general, it might require inverting a small matrix like solving a small system depending on the
sparsity of the solution. So, that's one nice thing about sparsity is that it speeds up the backward
pass as well. But for a fusedmax and also for oscarmax, which we studied in our paper the backward
pass can be computed pretty fast because of the structure of the solutions themselves. So for a
fusedmax because the groups are always continuous, like adjacent to each other. It's enough to do a
single linear pass over the output to compute the backward pass given the solution. Of course in the
general case these might require, you know, some further study on a case by case basis. But these
structures usually translate themselves into nice algorithms as well.

</turn>


<turn speaker="Waleed Ammar" timestamp="10:44">

Interesting. So practically speaking, when you actually run experiments, how much faster or slower
is it to say replace softmax with your framework?

</turn>


<turn speaker="Vlad Niculae" timestamp="10:56">

In the experiments, that's we report in this paper. So one of them is run entirely on the CPU and we
found, we observed exactly the same, like no visible change in the time taken by running these
things on the CPU, on the GPU there is a little bit of a cost incurred because you want to run the
bulk of the network on your GPU right, but you cannot. So some of these operations are not GPU
friendly because they involve, you know, optimization problems or just the algorithms insight on or
are seen that are hard to translate through a GPU. So what we do is in PyTorch, you can just copy
the, you know, the inputs or outputs through the CPU, perform your CPU balance of operations, and
then copy them back.

</turn>


<turn speaker="Vlad Niculae" timestamp="11:50">

And if we do this and properly batch everything before and after, the bottleneck is actually not all
that overwhelming. And of course it depends on the neural architecture but with OpenNMT-py which we
use here, which is a great piece of software. Basically the, the LSTMs are the bottleneck and not
the attention computation. So I think we were only like 25% slower or something like that. Basically
the same order of magnitude as just staying on the GPU and using softmax.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:29">

Got it. Nice. So could you tell us more about the experiments that you ran and how you evaluated the
performance?

</turn>


<turn speaker="Vlad Niculae" timestamp="12:36">

Sure. So we perform experiments on machine translation, on sentence summarization and on the natural
language inference on the SNLI datasets. So for SNLI we followed the methodology from the sparsemax
pape,r and actually we just modified their codes to add fusedmax and oscarmax on top, in the same
neural network. For machine translation and sentence summarization. In both cases we use OpenNMT-py,
which makes it super easy to prototype and to run sequence to sequence models for all of these
tasks. So basically we kept it very simple and we just wanted to show that using fusedmax and
oscarmax is easy and is just a drop-in replacement without having to re-optimize or re-tune a lot of
like parameters or learning traits. We just used all of the default options in all cases and the
performance was compatible and for sentence summarization it was a little better.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:40">

And I guess the important part here is that you get more interpretable results. So even though the
results don't improve you're able to see the output more clearly.

</turn>


<turn speaker="Vlad Niculae" timestamp="13:53">

Exactly. So in some cases you can even get like, if the structure prior that we are using makes a
lot of sense for a particular problem. I guess you may see performance improvements. I think this is
the application for the sentence summarization results. I think it makes sense there to select a
longer chunk of the input sentence in order to produce a single output words. Because we're trying
to produce a shorter output for a longer input. But in all cases for all tasks, we get superior
interpretability we get nicely clustered sparse attention plots as you can find, we included a bunch
of them in our supplementary material as well. So it's not a fluke because in all cases we solve
these optimization problems exactly. So we solved fusedmax and also oscarmax with exact algorithms,
not iterative ones. So we get exact like through sparsity and through clustering like the
neighboring values are exactly numerically the same. So I think this is a, this is helpful for
practitioners to see what exactly gets selected and with what ways, and I think it's, it's easier to
visualize

</turn>


<turn speaker="Waleed Ammar" timestamp="15:07">

Absolutly, alright are there any other thoughts you have on this work that you'd like to mention or
followup work maybe?

</turn>


<turn speaker="Vlad Niculae" timestamp="15:15">

Yeah, so I have two things I'd like to mention. First of all, one thing that we got really excited
when we are doing this work, so I come from an NLP background and Mathieu, he has a very strong
background in context optimizations. So like we're not really neural network people, but it was
really cool to find a way in which all of the body of work on complex optimization comes into play
in a useful way as a building block inside of these non-complex methods that we use these days. We
were both excited about this, to see the kind of contributions you could make using this literature.
And in terms of followup work, I would like to mention that we have some new stuff now on extending
these ideas to sparse structured inference in the sense of like practical models, because here you
need to pick your regularization from, you know, you need to have known algorithms for like if you
use LaSO and things like this. But in NLP, a lot of people are more familiar with interference in
the sense of like designing factor graphs and things like this. So we're looking into using that and
we have some followup work recently up on this.

</turn>


<turn speaker="Waleed Ammar" timestamp="16:27">

Awesome. I'll be looking forward to reading the papers. Yeah. Thank you very much for joining us, it
has been a pleasure talking to you.

</turn>


<turn speaker="Vlad Niculae" timestamp="16:34">

Thanks a lot for having me. That's great.

</turn>
