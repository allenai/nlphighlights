---
title: "Recurrent Neural Network Grammars"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Speaker 6","Chris Dyer"]
number: "004"
tags: []
description: "An interview with Chris Dyer. https://www.semanticscholar.org/paper/Recurrent-Neural-Network-Grammars-Dyer-Kuncoro/1594d954abc650bce2db445c52a76e49655efb0c"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F322196878&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:11">

So today's paper is Recurrent Neural Network Grammars written by Chris Dyer, Adhiguna Kuncoro,
Miguel Ballesteros, Noah Smith. Today we're very pleased to have Chris Dyer with us on the podcast.
Chris Dyer is a researcher at Google Deep Mind and an assistant professor in School of Computer
Science at Carnegie Mellon University. His research contributions, span many topics including
machine translation, morphology, distributional semantics, parsing among other topics in natural
language processing and machine learning. Chris lives in London and in his spare time he plays
settle. On a more personal note, Chris was my PhD advisor at CMU and I learned so much from him. It
is a true pleasure finding an excuse to meet with you again, Chris.

</turn>


<turn speaker="Chris Dyer" timestamp="00:59">

Well thanks Waleed, it's a great pleasure for me too.

</turn>


<turn speaker="Waleed Ammar" timestamp="01:03">

Okay. So the one sentence summary about this paper is that it describes a probabilistic model for
generating sentences with an explicit phrase structure. And this can be used for both parsing and
language modeling. So what gets you most excited about this work, Chris?

</turn>


<turn speaker="Chris Dyer" timestamp="01:23">

I think what I really like about this is that it's a generative model that works really, really well
on a problem that we usually think is best solved with discriminative methods. So parsing for
example, we give some input, we want to predict some output that seems like a discriminative setup.
But here what we're doing is we're saying, well, we're building a joint model where we generate
sentences by generating a syntactic structure and then to do parsing. We compute the posterior
distribution over trees, given that sentence and say, find the best one. And this turns out to work
really well. And that's exciting because for me as a sort of someone with a background in
linguistics syntax, that's what syntax is designed to do, is to describe how sentences come to be.
We think they aren't just tools for analysis. They are actually a record of how in some sense
sentences are generated. We simplified it in various ways and it's not perfect, but it's still
essentially a generative model. And so to model this using a generative approach and seeing good
performance is to me almost a confirmation of the idea of syntax.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:53">

Okay, great. So one of the new themes in this paper compared to previous work in transition based
parsing is that it constructs the parse tree in a top down fashion rather than a bottom up fashion.
Could you explain the difference between the two and why one is better than the others or what are
the differences?

</turn>


<turn speaker="Chris Dyer" timestamp="03:15">

Right. So a top down process is a more natural order for the generation of a parse tree, so if you
go back to these phrase structure parse trees, they really were characterized in terms of a top down
process. And so we can use the chain rule to factorize a big joint probability distribution in any
way we want. But there really is a inherent reason to think that generating top down is good for
this problem. We saw this back, we've known this was probably sensible for a long time. We would do
things like parent and grandparent annotations to build better grammars for generative models of
parsing back in the days when we were doing count based or smoothing based approaches to inferring
probabilistic grammars. And those worked really well.

</turn>


<turn speaker="Chris Dyer" timestamp="04:16">

In fact, when you conditioned on a sort of very long history going all the way up the tree, you got
very, very beautiful grammatical sentences. It was just very hard to estimate them because the data
became very sparse. So you can think about what we did in this paper in saying, well, we want to
condition on all of this stuff, including the, you know, the ancient ancestors going all the way up
the tree. But we're going to use neural networks to control the capacity of the model. So rather
than having a massive sparse model we're going to have everything embedded in a low dimensional
space. And that'll make the estimation problem a little easier.

</turn>


<turn speaker="Waleed Ammar" timestamp="04:51">

Absolutely. So we can think of this as a more elaborate, more expressive way of generating sentences
compared to a CFG an SNN based on a CFG parsing.

</turn>


<turn speaker="Chris Dyer" timestamp="05:10">

Right, right. So I think, to me what this model does is it says, well, we want to model this big
joint distribution on trees and strings. And we know that we might've gotten some details of our
theory of syntax wrong. In fact, I would bet on it. And so really any decision we make somewhere in
the distant past might be important for predicting, say, the subsequent decision about building
structure, the subsequent word. But apriori, we probably assume that things that are close by
syntactically in the tree say who your sibling is or who your parent is. That's probably pretty
important information for making good decisions about what the next bit of structure to build this.
And so RNNs tend to build in this bias where they can see gradients flow more easily to things in
the recent past rather than in the distant past.

</turn>


<turn speaker="Chris Dyer" timestamp="06:10">

And so in some sense, what this model is doing is it's making things that are syntactically recent
also close in the RNNs that are parameterizing this work and things that are close by sequentially
might actually be somewhat far away. And this is exactly what linguistic theory tells us might be
happening. So the claim that's been made for a long time in the theory of generative grammar is that
the human mind, the language faculty isn't sensitive to things that happen nearby in time. Basically
the standard temporal mark of assumption, but rather things that are close by in these syntactic
structures.

</turn>


<turn speaker="Matt Gardner" timestamp="06:55">

But don't you actually get both of them because because you're embedding the buffer and you're
embedding the stack, can you actually look at the weights that are learned to actually tease apart
what's actually going on here?

</turn>


<turn speaker="Chris Dyer" timestamp="07:08">

Yeah, that's a great question. I put that in because of course I didn't trust myself to give up on
that on sequentiality too much because, well, we know sequential models work really, really well. So
there's actually a follow on paper by my, a student Adhiguna Kuncoro, who is the second author on
this paper that just came out at EACL a couple of weeks ago in Valencia. And he tested this by
ablating the model. And we actually found that when we got rid of the encoding of the buffer we did
better then when we had it in there.

</turn>


<turn speaker="Matt Gardner" timestamp="07:44">

Oh, that's surprising.

</turn>


<turn speaker="Chris Dyer" timestamp="07:44">

So that was actually the best possible result that I could have hoped for. And, and a real surprise,
in fact, I thought, well, language is partially sequential. There actually are some interesting
interference effects. So another interesting recent paper looking at syntax and RNN from a different
side saying how much do the sequential ones look at is this paper by Tal Linzen, Yoav Goldberg and
Emmanuel Dupoux that was in TACL either earlier this year or late last year. And they talk about
this phenomenon where if you have a sentence like "The keys to the cabinet are on the table." That
"are" word, that agrees with "keys" the subject of the sentence. But there's this intervening
singular noun which might confuse a learner. So you have to know the syntactic structure in order to
make the right prediction and they looked into what extent RNNs are figuring out this sort of thing
and have it have a really nice set of results, very, very detailed analysis. The point of bringing
this up actually was to say that, they point out that people aren't actually perfect in these things
either. About 10% of the time you'll say the wrong word and agree with the most recent noun rather
than the one you should have agreed with.

</turn>


<turn speaker="Chris Dyer" timestamp="09:06">

So I always thought, well, really what we need is probably a little bit of both. So I'm going to
have both the sequential encoding of the buffer and also the tree encoding that comes through the
stack. But I was happy to see that if we got rid of them we could do better.

</turn>


<turn speaker="Matt Gardner" timestamp="09:20">

Interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:21">

Yeah, that's really interesting. One of the things that I found most exciting about this paper also
is the intuition that you can modify or adapt the parser transitions to generator transitions. Could
you tell us a little more about this and how did you come up with this idea?

</turn>


<turn speaker="Chris Dyer" timestamp="09:45">

Well, basically what we're doing is we're defining a distribution over these structures and trees
are, can be enumerated in a whole bunch of different ways. You can traverse them in unambiguous way.
So there's exactly one unique depth first left, right, traversal as a tree with ordered children.
And we basically just said, well, we're going to generate trees by following this ordering. And this
has been done previously in discriminative models by Oriol Vinyal now my colleague at DeepMind who
was formerly with Google Brain. And this basically though idea of decomposing complex structures
into little pieces and predicting those in some order is a classic way to build complex probability
distribution. So in particular in this with RNNs where you can expect the RNN, or at least hope the
RNN will remember anything important from the past you can actually justify this using the chain
rule.

</turn>


<turn speaker="Chris Dyer" timestamp="11:05">

And so it's not always the case that there's a very obvious set of transitions that you can define.
So in some cases you can't compute in an easy way the set of transitions that would let you build a
valid structure at any particular given time. There can be very complex dependencies across time,
but when you're building trees, well, they turn out to be fairly simple. So the idea, this is
basically two ideas. One is factorizing this distribution in terms of the chain rule and two is
breaking down the structure building operations in terms of little simple actions and those two
things work nicely. I presented it more in terms of transition based parsing and these abstract
state machines. Because I had been working on, I had been coming from this from a parsing background
and most recently before that I had been working on pure transition based parsing. And that was just
the kind of metaphor I had in mind. But I think it is maybe not the best way of thinking about this
work actually. It's just basically decomposing a complex structure in terms of the chain rule and
these structure building operations.

</turn>


<turn speaker="Matt Gardner" timestamp="12:36">

That's interesting. When I read this paper I thought it was a, I read it as a pretty natural
transition from your dependency parsing stack LTMS to constituency parsing. It sounds like you're
hedging on that characterization level.

</turn>


<turn speaker="Chris Dyer" timestamp="12:50">

I guess it was also a completely natural transition for me too, which is why I did this. On the
other hand, maybe a better way of saying it is I think transition based parsing sort of misses the,
it's a little narrower than it needs to be. So transition based parsing usually thinks, well, I'm
going to be operating on some data structures until I get to an end condition. Somehow I'm going to
be consuming some input. And really yeah, sometimes they're inputs, but sometimes your just this,
it's this little automaton that's executing until it gets to some start state. And sometimes some of
these automata will consume inputs and other ones will just generate things or maybe we'll do a mix
of the two. And so I don't think I really appreciated that until I started using these things to
build generative models.

</turn>


<turn speaker="Matt Gardner" timestamp="13:49">

I see. Do you think you could similarly, just as how for this constituency parsing work, you have a
discriminative version and a generative version, could you go back and make the dependency parser
generative?

</turn>


<turn speaker="Chris Dyer" timestamp="14:01">

Yeah, sure. And people have done this. There's a paper by Jan Buys who is a PhD student finishing at
the University of Oxford right now working with my colleague Phil Blunsom and he has exactly that, a
version that builds dependency structure using basically the same shift reduce, so bottom up style
construction of the tree. And that works, you know, that's another approach. Another one of my
students at CMU is also working on a top down generator for trees based on dependency formalism
rather than phrase structure formalism. So yeah, there, there are many, many different things that
you can do here. I think this question though of you know being able to compare bottom up and top
down generation orders is going to be particularly interesting to look at in the dependency case. So
it'll be interesting to see what those results are.

</turn>


<turn speaker="Matt Gardner" timestamp="15:15">

Yeah, do you have enough results yet to know if your generative model, so your result in this paper
was that generative models did better than discriminative models. Do we have enough results in the
dependency parsing case that it holds there too?

</turn>


<turn speaker="Chris Dyer" timestamp="15:31">

No. We just literally got this implemented last week and we only have very, very preliminary
results. In fact, we can just generate things from it right now we can't actually parse with it yet
because we haven't built the parser, which is a little bit of a challenge. So computing that most
probable posterior parts is kind of a tricky problem. We had to use important sampling. Some other
follow on work that I think has been very interesting was done by a student of Dan Klein's and that
will be coming out at ACL this summer where they develop a beam search algorithm for decoding
directly from this RNNG model. And they are able to then show some interesting stuff.

</turn>


<turn speaker="Chris Dyer" timestamp="16:25">

One is that the algorithm that we use to do posterior inference which was based on important
sampling, well important sampling is a biased estimator and it basically drags the distribution that
you're, in some sense inferring toward the instrumental or proposal distribution that you're using.
And we were using a discriminative version of our parser as the proposal distribution. And it turns
out they were able to show that there's an ensembling effect going on. So the generative model is
better than the discriminative model that was confirmed, but there's further benefit when you put
together the two models. And so they've actually got some truly outstanding results. They look at
another generative model and when they put all three of them together, they're almost getting to 95%
F on section 23, which for those poor souls worried about parsing accuracy on section 23 is a really
phenomenally good result. We've seen just a huge set of improvements over the last couple of years
with the neural networks on this task. So I think it's time to work on a different tasks.

</turn>


<turn speaker="Waleed Ammar" timestamp="17:45">

Do you think that the generative model works better than this third model really because it is a
better fit for how that data is generated? Or is there a different hypothesis that you have about
why this is the case?

</turn>


<turn speaker="Chris Dyer" timestamp="17:59">

That's a good question. I think there are two things. One, I would like to say it's a better fit two
we've got some other work coming out this year. Well hopefully it's in review at ICML right now
where we compare the performance of discriminative and generative models on the same task. And we
look at really simple tasks, just text classification and so you know, really something where we
don't think the data generating process is correct at all. But we do find that some of the old
results that Andrew Ng and Michael Jordan had identified about 15 years ago, that generative models
have higher asymptotic errors, but approach to the error rates more rapidly. That is they have a
better sample complexity. Those poled also empirically with big fancy neural network generative
models.

</turn>


<turn speaker="Chris Dyer" timestamp="19:00">

And also compared to big fancy neural discriminative models. So the original work was very
theoretical, but it relied crucially on linearity and condexity and all of this stuff that we've
completely gotten rid of. But we still see the same thing that basically we have lower sample
complexity or better sample complexity in generative models. And so I think there's good evidence
that we just don't have enough data to train a very good parser discriminatively on the Penn
Treebank and just the 40,000 sentences that are available from the Penn Treebank. So one other
hypothesis might be that we are doing better because we are working with a more sample efficient
learner namely this generative estimator rather than the discriminative one.

</turn>


<turn speaker="Matt Gardner" timestamp="19:54">

That's really interesting.

</turn>


<turn speaker="Waleed Ammar" timestamp="19:55">

Yeah. I'm looking forward to reading the paper when it comes out.

</turn>


<turn speaker="Chris Dyer" timestamp="20:00">

Well, you can find the ICML one, that's on archives somewhere. Dani Yogatama is the first author so
you can check that out.

</turn>


<turn speaker="Matt Gardner" timestamp="20:08">

I have one more kind of higher level point. In your intro to this paper, you talk about Chomsky's
work on hierarchical nature of language and you say that sequential models are apriori inappropriate
models of natural language. And this made me think of like how biLSTMs can generate syntactically
correct code leaving aside semantically coherent code, but it can generate nested structures inside
of code with the sequential model. So clearly it's doing something kind of like a stack internally.
It's going to have a bounded length of course, cause it's like saving the stack in the hidden state.
But you could make the argument that just with a sequential model, language isn't nested enough.
Maybe it can learn whatever hierarchy it needs just in the sequential depth of this biLSTM.

</turn>


<turn speaker="Chris Dyer" timestamp="21:01">

Yeah, that's absolutely right. I mean this is the this is the classic argument. So we know that
humans have only a limited capacity for center embedding probably three words. Sometimes people
marginally can understand four levels of center embedding. And the question though is one about
generalizations. So I think given enough data and enough capacity specifically enough data you could
easily learn everything you need to know about language or learn things pretty well from with just a
sequential model. The question that I'm interested in is how do we prevent these learners from
making the wrong generalizations? And I think the problem with sequential models is that they are
more apt to make the wrong kinds of generalizations that no human would make. And part of, you know,
longterm we want to bring human intelligence and artificial intelligence closer together.

</turn>


<turn speaker="Chris Dyer" timestamp="22:02">

Our artificial agents will behave more naturalistically and by doing this we will also learn
something about what humans are doing in their heads maybe, which will be scientifically
interesting. But that's, that's a very good question. And yeah, the answer is it's really just one
of, by getting the model biases right, we should have an easier time learning with less data. Not
that we can't possibly learn with these models that are wrong. And in fact, we have superhuman
amounts of data and we know that these models can be excellent on them. So the question is really
more of one of sample complexity.

</turn>


<turn speaker="Matt Gardner" timestamp="22:44">

Yeah, that's a really good point.

</turn>


<turn speaker="Waleed Ammar" timestamp="22:46">

Great. Are there any other things you'd like to discuss on this paper or new research you're working
on that is relevant?

</turn>


<turn speaker="Chris Dyer" timestamp="22:59">

So I'm still continuing on this with recurrent neural network grammars. I think there is a lot to be
done still with unsupervised learning and using them in conditional generation contexts. We started
to see some other groups publishing results on using them in translation and things like that. And I
think this is going to be a real great test of can they learn from in domains where there are fewer
samples of training data available. Because obviously if you're just doing language modeling, well,
we can really go out and find as many words at least in English as we need. But if you're doing
something like caption generation or translation modeling, then the training, the parent training
data starts to become a lot more expensive. So I'm optimistic that we'll see some positive results
there too.

</turn>


<turn speaker="Waleed Ammar" timestamp="23:59">

Excellent. Thank you so much for joining us today and hopefully we will see you again.

</turn>


<turn speaker="Chris Dyer" timestamp="24:05">

Thanks guys. It was great.

</turn>


<turn speaker="Speaker 6" timestamp="24:09">

Well, thank you Chris for talking with us. That was a really fascinating conversation. A note to any
of you listeners, if you want to similarly be on this podcast and talk with us about your paper,
please reach out to us. We're happy to have more people on. Next time we're going to talk about a
paper that came up in this conversation, which is what I think of as the precursor to the paper that
we've talked about today. It's called Transition-Based Dependency Parsing with Stack Long Short-Term
memory, and it was by Chris Dyer and other people in his group.

</turn>
