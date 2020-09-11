---
title: "End-to-end Differentiable Proving, with Tim"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Tim Rocktäschel"]
number: 019
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:11">

All right. For today's episode, we have Tim Rocktäschel with us to talk about his paper titled: End-
to-end Differentiable Proving. Tim recently finished a PhD with Sebastian Riedel at University
College London and is now a postdoc at the University of Oxford. And he's done a lot of work related
to stuff that I've looked at recently. So I thought this would be an interesting paper to talk
about. This differentiable proving paper is in this line of like, I have a knowledge base, I want to
infer new facts about it and he's got some cool ideas about how to do this in a nice way. So, Tim,
you want to tell us about how it works?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="00:49">

Sure. first of all, thanks a lot for the invitation. I'm very happy to be here. So I guess as you
said, we want to infer facts given a knowledge base of known facts. That has been, I guess tackled
for a long time. There are various approaches to this. Yeah, I guess approaches that are based on
representation learning. So approaches that try to learn some dense vector representations of
symbols such as constants and predicates. And then on the other hand, there are approaches that I
guess come a little bit more from the statistical, relational AI fields or I guess path ranking is
one of these approaches. And what we've been, I guess, exploring is for a long time now the
combination of logic and these neural representations. So these vector representations of entities
and predicates.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="01:47">

And previously we've been, what we've been doing is with we were interested in, I guess these
approaches that the score or learn to score facts on a quite local basis. So basically these are
models that in order to predict a statement or the truthness of the statement, they just take the
vector representations of let's say the predicate and the two constant symbols and have some
aggregation function or some I guess function that,measures the comparability of the predicate and
the two constant representations come up with a score. So these are, I guess neural link prediction
models. There are instances such as matrix factorization, tensor factorization and various other
proposals in the previous years. And what's nice about these models is that they are very scalable
so they can be trained on very large knowledge bases and test time inferences is extremely fast.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="02:45">

You just take a statement where you want to predict the truthness and you just take, I guess the
three symbols are predicate and the two constants map them to vector representations and then you
apply the scoring function. So that's nice. But at the same time we, I guess a lot of background
knowledge that we would like to incorporate into these systems. So what we've been doing for the
past years was thinking of can we take logical rules first-order logical formally and can we somehow
regularize these symbol representations in steps that they incorporate that logical knowledge. But
then I guess last year we started to think a bit more about more explicit ways of working with
rules. So we didn't just want to regularize these representations because surely that has some
limitations. We actually wanted to be able to, I guess do more explicit first order logic reasoning,
but with a symbol representation. So that's basically the setup of this paper.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:45">

It looks to me like the gist of this paper is you take Prolog and you essentially do the whole
algorithm just in a differentiable way. Is that a fair characterization of what you're doing?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="04:00">

I think that's partly right. I think it makes sense to say that we take Prolog, but we actually use
Prolog, the backward chaining algorithm in Prolog to construct a neural network that represents all
possible proofs up to some predefined depth, right? So now we have this really large neural network
that includes all possible proofs, but now we can basically back propagate through that neural
network that means we can learn, use similar representations based on factual knowledge that we have
in a knowledge.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:31">

So in what instances do you think this actually helps you? Like what can't you do with the typical
Prolog backward chaining algorithm that you can do with this?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="04:40">

Yeah, sorry. Yeah. What you can't do with typical Prolog backward chaining or any symbolic theorem
prover if you want to say, is that you can't really learn that for instance, a grandfather of symbol
is similar to grandpa of symbol that they even mean the same thing right. Or you can't learn that a
professor is something quite similar to a lecturer or you can't learn that a constant such as Maggie
Simpson is similar to another constant Bart Simpson because similar relationships hold for these two
constants, right? They have both the same parents, they live in the same city and whatnot. So these
symbolic theme improvers are symbolic logic is quite, I guess, constrained and the generalization
that we can get from the systems, we would I guess ideally we would like to still train symbol
representations from large knowledge bases and make use of the generalization abilities that we get
by learning such subsymbolic vector representation, but at the same time also be able to do explicit
logical inference if it makes sense. Right.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="05:45">

So what's the best you can construct the neural network subset? It remains feasible to do with this
exploration?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="05:53">

Yeah, so that's, that's really great question because that directly can set the limitation, so we
can do a depth of two with rules that have up to three atoms in the body. So basically it's like the
rule itself is already a free hop rule, but then we can apply that I guess twice to you know, do
proofs, but this is extremely limited. Right. so that's really one of the severe limitations of this
approach because we really have to build a computation graph that represents all possible proofs up
to some predefined depth. We get this explosion in the breath of this tree that represents the
proofs. We have to have to constrain that quite a bit and we also have to apply various tricks to
make this remotely scalable for medium sized knowledge bases.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:42">

Interesting. So thinking about like when is this like applicable? So when would you actually need to
know grandfather of versus grandpa? For like a small knowledge base, you would think that the
designer of the knowledge base would put in symbols that are discreet and not overlapping. And it's
in the case where we have textual relations where we have like hundreds of thousands of them that we
actually run into this problem of needing to compute similarity between relations. So what you're
saying is that we can't scale to that size yet. So I guess you said it's more in the depth of the
proof tree and not as is it also, does it also have scalability problems and like the number of
ground atoms? Those are different, right?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="07:30">

Yeah, different but also related. So if you have, let's say you have, you have a rule that says a
grandfather is a father of a parent, right? So you have grandfather of X, Y as the rule head and the
body you have a father of X as Z and then Z parent of Z/Y. What's happening and backward chaining is
that you basically you get a question like grandpa off X, Y and now given that rule that you have,
you might be able to match grandpa of with grandfather of. That's something we can do because we
compare the symbols, grandfather of and grandpa of in vector space, something that backward
chaining, symbolic backward chaining can't do because at this point there's a mismatch between the
two symbols. Anyway, so now we take basically grandpa of query and we can translate that into two
crews, father of and parent of.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="08:21">

But now we actually get the substitution of Z with every possible, with every possible second
argument and ground atoms in the knowledge base, right? So if you have a knowledge base of let's say
a thousand facts, that means we get now a substitution of Z with a thousand possible entities,
right? And we also get a thousand different proof differentiable proof success scores at this point.
But now we also still have to prove the second atom and we found that parent of Z/Y. Now we again
have to compare these I guess thousand substitutions that we build with again, thousand ground atoms
in the knowledge base, right? Because we can't really stop proofs by just saying grandpa of and
parent of for instance are not the same symbol, we still have to continue proofs because we have
this differentiable I guess similarity metric in the vector space.

</Turn>


<Turn speaker="Matt Gardner" timestamp="09:16">

Yeah. So I'm not sure how much detail we should go into the method in audio form. Do you want to
give like a really high level summary of how this model actually works? Like what kind of graph do
you construct?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="09:33">

I can try. It's as you said, I think it's quite hard to do that in audio form, but we can give it a
try. So I think the, on a high level, that's maybe the first time I went backward chaining is doing
on a high level, on a high level, there's two functions called OR and AND and what OR is doing is
given a goal, it's trying to apply rules in the model's base, right, It's trying to see, first of
all, can given the goal, can we find that goal in the knowledge base, then we're done, right?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="10:09">

Then we have a proof. We can say we just know that that fact is true. But if that's not the case,
then given rules, we are basically translating that goal into subgoals. Right? If we have a rule
that says grandfatherOf X, Y is the case, if fatherOf X, Z and a parentOf Z, Y then we can translate
a certain goal into these two subgoals fatherOf and parentOf. Now when this happens, when we
basically get a match between our goal and rule hat and this function called AND and, AND is now
basically just iteratively trying to prove all the subgoals in the buddy of the rule. And basically
these two functions now call each other recursively. So the way AND is proving the subgoal is by
calling OR.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="11:02">

So we have this recursive structure, what's very important is that this matching between the goal
and the rule head, is done by a function. It's called unification. So basically we are really
looking at all the aligned symbols into atoms. So let's say we have again, this atom grandfatherOf
Ape, Bart, and we have a rule that says grandfather of X, Y. And then we could translate that goal
into subgoals. We're basically comparing grandfatherOf and grandfatherOf if that succeeds, then
fine. And we're comparing a variable like X with Ape and the variable Y with Bart basically at this
point finding the two constant symbols in our goal with the two variables in the rule head such that
when we use exactly these bound variables in subsequent steps in the proving when looking at the
body of the rule.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="12:00">

So this is how roughly I guess symbolic word chaining works. Now what we are doing is to take that
algorithm and building up a computation graph that lets us prove method spilled proofs for a given
goal but also gives us a differentiable proof success score attached to each of these proofs, right?
So it's basically the neural network, the neural network outputs a score between zero and one. And
that encodes, whether that proof is true or not or anything in between, basically. And the way we
are doing this is by saying, well, unification, is not going to happen on the symbolic level. We're
not just comparing their grandfatherOf and, grandpaOf is the same symbol, but we are, you know,
mapping both symbols into a vector space and then doing the comparison using a Radial Basis Function
kernel.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="12:52">

Right. So what's now funny is that I guess the way this neural network is constructed really looks
like the backward chaining algorithm, but what we actually passing around a partial constructed
neural networks right then in the recursive scores are basically expanded and stitched together. So
the way we I guess explain that in the paper is by saying, well, we have what we call these modules,
which partly have a discrete objects such as, you know, the kind of subgoals that we still have to
prove in a rule. And on the other hand, they pass around a proof state, which contains the
substitutions head, but also this partially constructed neural network. So I think that's the extent
to which I guess I can explain that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:40">

And that was good. That was nice. Are there any constraints on what you can unify in this symbolic
unification variant?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="13:50">

So one of the things that we don't support that is supported by Prolog are function terms. So if
your pencils have a function that says fatherOf Bart, and it shouldn't return Homer, right? So we
don't, we don't have that, we don't support that. We really just support I guess patterns. But with
that you get, I guess, function-free-first-order logic. So anything there is fine. Unary atoms
unrepaired atoms and whatnot.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:18">

There was one thing that confused me is I read the paper and looking at figure one in your paper,
you show an example of a constructed proof tree and it shows that fatherOf I,Z can't unify with the
grandfatherOf rule, where this grandfather of rule says that if the parents of someone's father is
the grandfather. And so I was confused as to why that failed. It looked like it should have unified.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="14:47">

Yeah. So we we didn't mention that I think in the paper what you usually do in backward chaining is
that you also have some cycle detection. So if you already have applied the rule and you already
have a binding of X to something like you shouldn't apply that again. But I think there's also ways
of doing some more sophisticated things. So I think sometimes it's fine to do such cycles, but in
our case, we just didn't we just didn't support that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:12">

Okay. Yeah, that makes sense.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="15:13">

So you mentioned there are many tricks that you needed to do in order to make this scalable. Are
there anything that's worth discussing or mentioning about these steps?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="15:24">

Yeah. So I think one thing is that I guess one should know about this kind of approach of taking an
existing, let's say data structure or an existing algorithm and turning that into a differentiable
computation graph is that it's usually not so hard to build that for a neural network that just
processes one example at a time. But what you usually want to do is you want to make use of modern
graphic cards and then you need to really think hard about how you actually can batch process
through your computation graph. And that makes things very tricky, right? So we really thought a lot
of how can we not just prove one goal at a time, but if we actually want to apply that to reasonably
sized knowledge bases, we want to prove let's say 10 or a hundred goals in parallel on the GPU.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="16:12">

This was one of the tricks that we have to apply. And another one that I found very interesting is
that what we are doing here is basically we're learning to prove goals from other facts that we have
in the knowledge base, right? And let's say we don't have any rules, right? Let's say we have a
knowledge base without any rules, then what this means is that we are basically trying to prove a
goal by unification with all facts in the knowledge base. And it turns out that this is extremely
slow to train because in the beginning you basically initialize all the symbol representations
randomly. And that means in the beginning you just get very noisy proofs, right? So you get just
random things I guess as high predictions and that's really annoying.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="17:06">

Partly also because at the end you only care about one of these proofs to succeed. So basically the
way we aggregate all of these proofs is by taking the max. That means we get very noisy gradients
and we only have updates on I guess one proof. So, which makes training very slow. So one of the
tricks that I found quite interesting is to actually still train a neural link prediction model
alongside the differential prover. So we, in this case, we do use ComplEx, which is a study of
state-of-the-art in ruleing prediction model. That again tries to just score a ground atom locally
by looking at the three vectors of the predicate and the two constant symbols and then spilling out
a score and we basically take that neural link prediction model as a regularizer for learning very
quickly about similarities of symbols. But then we still, you know, we still train the NTP and at
test time. You only use this neural theme prover this differentiable proven. So the ComplEx is
really is just a regularizer. And what that means is again, that ComplEx is very quickly letting us
learn similarities of symbols that then the prover can actually use to make quite a useful multi-hop
inferences.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="18:22">

So all of the same word representations are shared across the two in neural net.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="18:25">

Yes, exactly. Yeah. Which is also a bit odd because ComplEx is actually representing symbols as
complex vectors. And our differentiable prover is just representing them as real K dimensional like
this. But the RBF kernel you can just still I guess measure the distance between the K dimensional I
guess real vector and the K/2 dimensional complex vector.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:49">

This sounds like a pretty complicated computation graph. What framework did you use to write the
code?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="18:54">

We implemented this in Tensorflow and in hindsight that might have been the wrong decision because
now there are so many nice, I guess dynamic computation graph libraries including PyTorch, but also
DyNet I think. But even back then there was a Torch which I somehow disliked. So we just went with
Tenorflow.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:17">

I'm just kind of surprised this is even possible is even possible in Tensorflow. That's interesting.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="19:22">

Well, it's possible because given a goal and a given knowledge base, the computation graph stays
steady, right? So basically you only have to build this computation graph once and then you can
prove many goals of the same structure. And structure here means let's say a ground vector, right so
basically the inputs to your, to your proof tree are going to be the placeholders for the, let's say
three symbols in a binary ground item. And that's not going to change. So it's basically, still a
steady computational graphs. That's why you can do it with this.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:52">

Interesting. So one one thing that I haven't liked very much about recent neural link prediction
models is that they try to encode these dimensional high rank tensors in low rank vectors. So like,
it seems mathematically impossible to me to recover who's married to who in a vector for each entity
and a vector for each relation. Like you just can't encode marriage relationships or other kinds of
sparse facts inside of these neural link prediction models. And it seems like what you're doing
still has access to one time facts, right? You can still look up that Bart is, Abe is the
grandfather of Bart, it's a fact in your knowledge base and you're using sub symbolic
representations to do similarities in an interesting way, but you still have runtime access to these
sparse facts. So you're not losing the information. Does it seem right?

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="20:45">

Yes. That's absolutely right. Yep. And particularly what we disliked about neural link prediction
models is the fact that they're only, you know, scoring these quadrenniums locally, which means they
have a really, really hard time with, I guess things like transitivity, right so if X is located in
Y and Y is located in Z then X also be located in Z. And that's exactly, I think we look at our
experiments. That's exactly where our model seems to be quite good at compared to neural link
prediction models.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:16">

Yeah.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="21:17">

So what is the main difficulty in consolidating the approach that you're using in this paper with
learning from text? Like for example, universal schema approach is learning from both knowledge base
types as well as texts.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="21:31">

I think that's a great question. So partly this architecture is also inspired because ultimately you
would like to have text as an input to these kind of models. So for instance, you could think of a
predicate like I guess my favorite predicate is like, "Is the movie directed by the author of the
same book?" So it's a, it's like a national language phrase that basically represents a predicate,
but it's quite hard to work with this pedicle as a symbol. So you would run something like an
encoder that reads this you know, text snippet and that basically built up the compositionally this
representation of the predicate. And that's potentially exactly what we could do with this
architecture, right? So we don't care about whether our inputs are predicate symbols that we map to
vector representations or whether our input is a text number that we encode using an RNN. But we
haven't done that, right? We just, you know, did this embedding look up approach. But since our
architectures enter branchable what you can potentially conceive this, you have as inputs these on
encoders that are then hooked up with the differential prover and the whole model can be trained
jointly by back propagation. So that's definitely a very interesting, I guess, future work I would
like to do.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:51">

Yeah, that's an interesting idea. What I thought the answer to Waleed's questions was is that it's a
scalability problem, right? Like if we take the same universal scheme idea from Sebastian a few
years ago, you just have one big tensor, right? And then you're just exploding this bace of ground
atoms that you have. And so you're just going to have scalability problems basically.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="23:10">

Yep. So the reason why we can't do this right now is because we have executive these scalability
issues particularly, our problem is that we have to basically make sure that this unification of a
net term with all factors in the knowledge base can be done efficiently on a GPU. So basically that
has to fit on a GPU. Our entire neural representation of the knowledge base has to fit on a GPU.
Otherwise this will be way too slow.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:36">

Yeah. You could imagine like pruning that somehow then it gets a whole lot harder with TensorFlow.
Right. Cause he probably have a dynamic graph and you might want to do like have the pruning that
you do change during the course of training.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="23:51">

Exactly.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:51">

Yeah. They're interesting directions for future work.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="23:55">

Yeah. Maybe one thing I can also talk about which I guess again was a motivation of this
architecture is actually to be able to incorporate prior knowledge. Right? So if we have a logical
rule that we want to make sure holds, then we can just write that down and include it in the
knowledge base. But more importantly, what I find very interesting is that people have been looking
a lot into this, I guess it's called inductive logic programming. So can we induce these logic rules
automatically from data and people have been using, I guess lots of symbolic approaches for doing
so. And what we can do here quite easily is to actually say we know or we assume that there is a
transitivity now in knowledge base, but we don't know between which predicates we can just write
down I guess what we call a rule template.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="24:40">

So we can say there's some sensitivity between some predicate representation, you know, one and you
know, two other predicate representations two and three. We just write that down as a rule with I
guess parameters for these predicates and then we can just optimize that like all other symbol
representations. So basically the model can now make these predicate parameters, these predicate
representations close to actual predicates such that it can improve things in the knowledge base,
which allows us to induce a rules by grading descent and gives us some way of then afterwards
actually inspecting what the model has learned. So that was one of the things that I guess we found
quite nice about this approach.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:21">

Yeah. I first saw that idea from William Wang and William Cohen's proper work and yeah, I liked when
I saw it in your paper because it's a nice extension because it lets you learn these rules over
vectors, right. The predicates are just represented as vectors and so I guess it's a nice, a sub
symbolic extension of this line of work.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="25:41">

Yeah, exactly. So this is this is definitely the work that we draw inspiration from. So what William
Wang had was these, what he called really rule templates where you say, I assume they are, let's say
10 transitiveness in my knowledge base, and then instantiate all these parametric walls and you can
use them in our case using gradient descent, in their case using something different.

</Turn>


<Turn speaker="Matt Gardner" timestamp="26:03">

Yeah. Cool. I think that's all the questions that we had. That was a really interesting discussion.
Thanks for talking with us Tim.

</Turn>


<Turn speaker="Tim Rocktäschel" timestamp="26:11">

Yup. Thanks to you.

</Turn>
