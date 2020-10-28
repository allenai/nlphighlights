---
title: "Matchbox: Dispatch-driven autobatching for imperative deep learning, with James Bradbury"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["James Bradbury"]
number: "055"
tags: []
description: "In this episode, we take a more systems-oriented approach to NLP, looking at issues with writing deep learning code for NLP models. As a lot of people have discovered over the last few years, efficiently batching multiple examples together for fast training on a GPU can be very challenging with complex NLP models. James Bradbury comes on to tell us about Matchbox, his recent effort to provide a framework for automatic batching with pytorch. In the discussion, we talk about why batching is hard, why it's important, how other people have tried to solve this problem in the past, and what James' solution to the problem is. Code is available here:

https://github.com/salesforce/matchbox"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F421493592&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting work in natural
language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute for
Artificial Intelligence.

</turn>


<turn speaker="Matt Gardner" timestamp="00:12">

Okay. Today our guest is James Bradbury. James Bradbury is a research scientist at Salesforce
research. His research mainly focuses on making things fast and easy, both in model architectures
and in software. He developed quasi recurrent neural networks and non auto regressive seek to seek
models, both of which removes sequential dependencies and model architectures to increase
parallelism, and reduce training and inference time. Today we're going to be talking about some of
his recent work on a new method for automatically creating mini batches in code. James, welcome to
the program.

</turn>


<turn speaker="James Bradbury" timestamp="00:39">

Hi, great to be here.

</turn>


<turn speaker="Matt Gardner" timestamp="00:41">

So the title of this paper is Matchbox: Dispatch-driven autobatching for imperative deep learning.
Can you tell us about the setting of this paper? Like what is autobatching?

</turn>


<turn speaker="James Bradbury" timestamp="00:51">

So this is a systems paper where I'm describing a toolkit that I put together to make deep learning
code easier and more convenient to write. In particular in the setting of a dynamic or imperative or
defined by run deep learning frameworks like PyTorch. The motivation is that the reason why people
want to use these dynamic frameworks is because they want to right deep learning models in a way
that looks a lot more and feels a lot more like code. It's sort of a lot of cognitive overhead and
unnecessary complexity to write models in a graph based approach of something like Theano or
TensorFlow where the code you write doesn't actually run on the data in the machine learning model.
It runs once at the beginning and creates a graph structure and that graph structure later runs the
machine learning model.

</turn>


<turn speaker="James Bradbury" timestamp="01:52">

So people have appreciated the simplicity and straightforwardness and ease of debugging of tools
like PyTorch to let you just write the code that will actually run. But there's still some gaps
between something like PyTorch and what we'd like to be able to do, and I think one of the biggest
ones is batching. So in the ideal case, you'd write code that applies to a single training example
and it might use control flow like for loops and if statements, and I might do things that are
different depending on some of the properties or content of that training example. So if it's a
natural language processing problem, that training example might have a different number of words in
it. If it's something like machine translation a training example might have a different number of
words in the source and also a different number of words in the target.

</turn>


<turn speaker="James Bradbury" timestamp="02:52">

And the problem is that frameworks like PyTorch, even though they let you write code, like if
statements and for loops, that code needs to run on an entire batch of training examples. So in
order to achieve the performance benefits of like parallel hardware like GPU's is you really need to
run on an entire minibatch at once. And as soon as you need to do that, you can't actually write the
most natural example level coding anymore because you have to write code that applies to a mini
batch. And so that process of turning a model, which is inherently example level into code that
works at the batch level, often involves some tradeoffs and sort of the abstractions that you have
to write, things you have to keep track of like padding or masking or other kinds of metadata that
you have to follow through the network.

</turn>


<turn speaker="James Bradbury" timestamp="03:52">

Now the goal of matchbox is to just do all of that for you, keep track of the metadata attached to a
batch, automatically perform masking so that you can write code that applies at the example level
and then run it on mini batches. So what exactly is the issue here with padding and masking? Why is
this even a problem and in what circumstances is it a problem? Why do we have to think about this at
all? Well, the thing is that when you when you write a batch deep learning model, let's pick a
particular example, doing sequence classification. So you have a data set that consists of a bunch
of sentences of various lengths. And your goal is to predict the sentiment or other kind of class of
each of the sentences and you're going to use the recurrent neural network.

</turn>


<turn speaker="James Bradbury" timestamp="04:46">

If you don't worry about padding and masking, then you're going to take a bunch of sentences of
different lengths and you're going to put them into a minibatch together. Well, first of all, you
can't do that without padding the shorter ones out to the length of the longer ones. Okay? You pay,
you pad them out, then you run that recurrent neural network. A lot of the computations in that RNN
are going to use the padding. That's going to be part of the computation and the result is that the
result is not going to be accurate. You're going to be training on some padding. You're going to
hope that your model learns to ignore it. Maybe in practice that happens in the simplest cases and
it doesn't happen at all when the situation is any more complicated than that.

</turn>


<turn speaker="Matt Gardner" timestamp="05:35">

Have you actually run experiments with that? Can you quantify at all, even anecdotally how much this
hurts you in complicated cases?

</turn>


<turn speaker="James Bradbury" timestamp="05:43">

Yeah. So I've done a lot of work in neural machine translation and most recently using Google's
transformer architecture attention is all you need self attention. And when you don't restrict that
self attention layer from attending to padding tokens, the performance actually drops significantly.

</turn>


<turn speaker="Matt Gardner" timestamp="06:09">

Interesting.

</turn>


<turn speaker="James Bradbury" timestamp="06:10">

Anecdotally. Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="06:11">

Okay.

</turn>


<turn speaker="James Bradbury" timestamp="06:12">

And so that's something that if you're a researcher, you don't want to leave that, even if you don't
know, you don't want to leave that on the table. And so usually you go ahead and you write up that
masking code even if you don't want to.

</turn>


<turn speaker="Matt Gardner" timestamp="06:27">

Yeah. And I guess back when I was in school before the days of deep learning for NLP, we used to
talk a lot about probabilistic models and I had lots of experiment or lots of programming
assignments in my NLP classes that made sure that my models were proper probability distributions
because that was actually important if you wanted this to behave like you expect. We don't talk
about this very much anymore. But, when we talk about things like attention, we're really
constructing probability distributions over some piece of our input. And if you're constructing that
probability distribution over padding tokens, that means your distribution is deficient. Like this
isn't a proper probability distribution anymore. So, your model might still work maybe, but it's not
doing what you, what you claim it's doing.

</turn>


<turn speaker="James Bradbury" timestamp="07:10">

Yeah. And, and we've as a community, we often gloss over those things. I mean I I worked with
sequence to sequence translation models for several months without caring about whether I'm
attending to padding or not.

</turn>


<turn speaker="Matt Gardner" timestamp="07:27">

So what are the ways that people handle this these days? Like, how do you deal with masking and
current machine learning code?

</turn>


<turn speaker="James Bradbury" timestamp="07:34">

I feel like it's, it's kind of analogous to the state of gradients in machine learning code before
toolkits like Theano that right now everyone does it themselves and people do it in different ways.
People do it again and again for every project they write. And I feel like it's the kind of thing
that's best done once and it's best done behind the scenes. Just like we wouldn't want to hand write
gradients anymore. I don't think we should need to hand write masking code. And the reason that I
think that is that it's the hardest part to be sure that you've got it right. So, like parts of
coding in ML. Like, Well it just won't run the types we'll miss, like won't match. But one of the
most common kinds of implementation bugs. That you're not going to notice because it's not going to
give you a run time or compile time error, but it's just going to silently misbehave is when you
made a mistake in writing this like padding and masking.

</turn>


<turn speaker="Matt Gardner" timestamp="08:48">

So, then, you can write it yourself. I know Keras has some options for doing this. DyNet has some
options. What about TensorFlow? Does plain TensorFlow has any options for doing kind of masking or
padding? Like do you have some sense of like patterns that people currently do other than just
writing your own handwritten code?

</turn>


<turn speaker="James Bradbury" timestamp="09:08">

Yeah. So I'm most familiar with PyTorch where there really isn't built in support for these things
except in the case of optimized RNNs, there's a specific module that lets you apply optimizes RNNs
with builtin padding. But in other frameworks there's been more attention paid. So yeah. Keras
builds in basically the ability to use padding to a lot of their core layers. I haven't used it in
awhile. I am not super familiar with the way that works, but I know that TensorFlow, like the
underlying TensorFlow part doesn't; that there's, there's no way.

</turn>


<turn speaker="James Bradbury" timestamp="09:49">

So even though TensorFlow has things like dynamic while loops, you can't create a dynamic while loop
that has a different number of iterations for each example in the batch, which is really the goal of
using padding and masking in RNN. All of the guidelines and tutorials for TensorFlow on RNN say,
okay, feed a dynamic while loop, whose length is the maximum length of the batch and then manually
like add these incantations to make the masking and padding work. So then the first two proposals to
really automate masking and padding and auto batching in the general case, both came out last year.
First some folks on the TensorFlow team came out with something called TensorFlow fold. So that was
an ICLR paper last year. The idea there was instead of writing their models in TensorFlow or Keras
or another existing TensorFlow wrapper, you wrote your models in this novel domain specific
functional programming language called fold that was embedded in Python.

</turn>


<turn speaker="James Bradbury" timestamp="10:59">

And if you specify your models in fold and that's a language composed of primitives, like, like sort
of the Haskell ish fold L or map or reduce, if you wrote your model composed of those primitives,
then it would automatically batch over arbitrary data structures. So you could write a model, that
performed folds over tree structures and graph structures. And variable length structures of all
sorts of kinds. Basically the one restriction being that all control flow in your model has to
ultimately come down to the data structure, the structural shape of the input. So that's one
drawback of TensorFlow Fold. The other is just that it's not maintained anymore. So it was released
with this ICLR paper and with like TensorFlow 1.1, 1.2 or something and it hasn't been updated. It
hasn't been maintained. I don't, I think the last commit was in November and I'm honestly not
entirely sure why.

</turn>


<turn speaker="James Bradbury" timestamp="12:12">

So this is the creation of different ways to use TensorFlow in particular more dynamic and flexible
ways like TensorFlow Eager and TensorFlow Fold. It's driven by the fact that researchers at Google
want to, have more flexibility in writing models. So I guess it was surprising to me that Fold in
particular didn't seem to have significant amount of uptake at least visibly outside of Google. So
that's Fold and basically saw that the, the auto batching algorithm itself, was pretty cool but that
you could apply it without creating a new domain specific language. So DyNet is a fully dynamic,
imperative, deep learning framework, really one of the first that lets you write arbitrary Python or
C plus plus code with control flow. And it's always had this approach that if you can't easily batch
something, just don't. So a lot of people write DyNet code that's expected to run on CPU rather than
GPU and expect it to run completely without batches.

</turn>


<turn speaker="James Bradbury" timestamp="13:28">

This is almost the canonical way to use DyNet. And so the DyNet folks built something where you
could take a mini batch of data and then write a literal for loop over that minibatch say, okay, run
example one and run example two, then run example three. And so the code that you write is code that
works on a single example. But DyNet has lazy semantics. So when you say run example one, it just
queues up the set of operations that you need to do to run example one. And then same for all of the
other examples. And then once all of the, once you've queued up the computation graphs for examples
one through N, you can call a method to perform the auto batching. And that means it looks at this
massive computation graph and it finds sub expressions that can be batched together.

</turn>


<turn speaker="James Bradbury" timestamp="14:25">

So if there are two matrix multiplies at the same size, you can stack those matrices or if there are
multiple different sigmoids, you can just concatenate those matrices before performing the sigmoid.
And this approach, I mean, it's the, it's the first time that, that you've gotten to a point where
you can right imperative code with control flow and have that automatically be batched. But the
downside is basically first that it requires this lazy semantics. So that control flow cannot depend
on actual values that the network produces because it has to be run lazily. So you have to be able
to run the entire graph for a particular example in the batch before we go to the next example. And
that means that the graph structure like which operations are performed can't depend on the actual
numerical values you get in the process.

</turn>


<turn speaker="James Bradbury" timestamp="15:26">

And that rules out an important class of of reinforcement learning models. Basically when models
where your your model is actually generating a probability distribution over actions and then you're
taking one of those actions, and that choice of taking an action determines like the structure of
your network through the next few steps. And that means things like architectures that build
implicit tree structures over language data, which is a sort of a hot topic these days. And then the
other drawback is that that process of looking at all of the graph structures that the various
examples have built and then finding the commonalities and merging them together. It has pretty bad
computational complexity because it doesn't take advantage of the fact that like a priori the same
code running on separate examples. Like the same line of code is likely to generate structures that
can be batched together.

</turn>


<turn speaker="James Bradbury" timestamp="16:33">

It instead just looks at the whole graph as a single data structure and so on fast modern hardware,
like an Nvidia P100 GPU or something. It actually takes significantly longer to perform that auto
batching than it does to run the resulting graph on the GPU. And so if, right now the auto batching
and the building of the graphs takes 60 or 70% of the wall clock time, then a GPU that's 10 times
faster. Well that's 10 times faster, but only for the 30% so the whole thing won't get more than 50%
faster.

</turn>


<turn speaker="Matt Gardner" timestamp="17:15">

Right. So what's your approach to solving this problem?

</turn>


<turn speaker="James Bradbury" timestamp="17:18">

Trying to turn auto batching into a more general or more difficult compiler problem? I wanted to
automate the sort of well-established process of manual batching. Basically I looked up what people
usually do when they're padding masking and padding to deep learning models for NLP.

</turn>


<turn speaker="James Bradbury" timestamp="17:39">

And then I wanted to make that implicit and automated. So, in particular, you usually keep track of
a Mask tensor for each data tenser or set of activations in the model. And that mask tensor is one
when when the activation represents valid, meaningful data and it's zero when it represents
something that's masked out. And then I take those mask tensors and I propagate them through the
network alongside their data tensors. And so basically I've just written overloads for the different
neural network operations in PyTorch that mean that those operations, which would ordinarily apply
to a PyTorch variable, will also apply to a matchbox batch and will do the right thing to the data
tensor and then the right thing to the mask tensor. So that's the basic idea. And then there's so
that, so overloads work for everything that's a function. And then there's also control flow. And
the problem with control flow is that, let's say you have a for loop, different examples in the
batch, well might run that for loop for different numbers of iterations. And so you have to do some
special rewriting of the for loop to make sure that in iterations where particular example doesn't
get touched because it doesn't have a value for that index that that part of the batch stays the
same and doesn't get affected.

</turn>


<turn speaker="Matt Gardner" timestamp="19:16">

So basically it sounds like you're... PyTorch has operations like Index Select and BMM and Add and
Multiply and all of these things and you're just, you're overloading these operators or implementing
this interface for a new object. And then instead of passing in a variable, I pass in a batch
object. Yeah. Because all of these operators, they concluding like the array access array operator,
will just be aware of the mask and if you're trying to access something that it doesn't actually
exist, that git operation will just be a no op, it won't, it won't do anything.

</turn>


<turn speaker="James Bradbury" timestamp="19:52">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="19:52">

Right.

</turn>


<turn speaker="James Bradbury" timestamp="19:53">

Well, it'll, it'll return. So if you do it, if you do it like get index or a slice on a down, like a
dynamic dimension, a dimension that varies in length among many batches, the result is that you'll
get a mini batch that is valid in certain examples and completely invalid in others. So, it'll be
completely masked out for certain whole examples in the batch.

</turn>


<turn speaker="Matt Gardner" timestamp="20:19">

Interesting. So this sounds a whole lot like the way that Keras handles masking. You said you
weren't too familiar with it. I'm quite familiar with it. I spent a long, too much of my life trying
to figure out how to get this to work right for NLP. And it turns out, it's really complicated to
get Keras to do complex NLP architectures with this masking stuff. But the way that it works is
Keras has a layer abstraction similar to a module in PyTorch and every layer can take a mask and
modify the mask and propagate it. And the thing I struggled with was that I really only needed the
mask in a few specific places.

</turn>


<turn speaker="James Bradbury" timestamp="20:53">

Yeah.

</turn>


<turn speaker="Matt Gardner" timestamp="20:53">

Because I needed it towards the end of my network, every intermediate operation had to know about
the mask, know what computation to do and propagate it correctly. And because I was implementing
lots of my own layers, I had to do lots of my own masking code to figure out how the mask should
propagate correctly. It sounds like you have a really similar approach. Do you want to say anything
there?

</turn>


<turn speaker="James Bradbury" timestamp="21:18">

Yeah, I think that's right. Probably the biggest difference is just that now given the state of
something like PyTorch and also something like Keras, you're not going to have to write as many of
your own layers as you used to. So, I think it's, it's something that is, maybe it's time has come
in the sense that these days the vast majority of people are in researchers can make do with the
sort of built in set of functions that PyTorch offers. And it's increasingly rare unless you're
working at a very low level to write your own autograd function . And if you do that, then, yes, you
now will have to write, you just seeing what happens to the mask? But, if nothing happens to the
mask, that's pretty easy to do. And that, see, that's fairly common. So, if something complicated
happens to the mask, well that's a real thing that happens in the network. I just, I basically, I
want people to think of the mask as a sort of critical part of the data type, the batch that's
flowing through their network. If you don't pay attention to it, like don't make use of it in the
computation then you're actually losing information. It's as if you like, your input was a complex
number and you just threw away the imaginary part.

</turn>


<turn speaker="Matt Gardner" timestamp="22:38">

Yeah. I think you were a little bit unfair to yourself in your comparison with Keras because the
Keras layer is actually a higher level abstraction than what you're dealing with. And so you're
dealing with like the tensor operation level, not at the layer level. And so I think lots of people
will still write their own PyTorch modules or Keras layers. They just probably won't be writing
their own tensor functions, tensor operations. That's a whole lot more rare. And so because you're
dealing with masking at that level, maybe you do have something that most people won't really have
to worry about very much. And so that's nice. I do still wonder though, there are only a few
operations where you actually need the mask. And that's like computing an Attention when you, when
you have a normalization like a Soft Max. Yeah. Over a set you need to have a mask in order to get a
proper probability distribution or when you're doing a recurrent computation and you have varying
sequence lengths you really need a mask there. I can't think of very many other places where you
actually need it. And so I wonder if like, even like are you wasting computation by doing the mask
computations in order to propagate the mask to places you don't need it. So, I don't know, I think
this, this seems like it's still an open question to me.

</turn>


<turn speaker="James Bradbury" timestamp="23:54">

Yeah. And we have like a couple basic benchmarks in the paper that show that it does add some
overhead over not dealing with the masks at all, but that overhead is not especially different from
what people were doing before with like manually dealing with the masks. So when you're just
propagating a mask and you're not running any computations on it, the only overhead you're adding is
the overhead of a couple of lines of Python. If you're doing computations with the mask, then those
computations are things which you basically can't avoid. If you're goal is to have a valid mask at
this point in the network. Like, you need to know what the mask should look like at this point in
the network. And that's the result of transformations that have happened to the mask before. So you
could, if you like, if you're running it manually, maybe you know more about the transformations and
can combine them together and sort of do like an optimization pass yourself to minimize the number
of operations. But that actually gets to the longterm goal for this project and I guess longterm in
the sense of next couple months, which is that PyTorch is working very, the PyTorch core team is
working very hard on something that will allow you to compile the modules and the, the code you've
written. And so the goal there is that you can export it to a static graph framework like TensorFlow
or Cafe 2 or MX Net using an intermediate representation called ONNX Open Neural Network Exchange.

</turn>


<turn speaker="James Bradbury" timestamp="25:31">

This is something that like, is a collaboration between a lot of companies, between a lot of
framework developers and on the PyTorch side involves a lot of very interesting compiler to work
because PyTorch is this dynamic framework in Python and getting a static graph out of it sounds
really hard. And so, one, basically the reason why getting a static graph out of a dynamic framework
like PyTorch is hard is that the most straightforward approach, which is what is already working in
PyTorch today is Tracing. So, if you have a PyTorch network, you can ask PyTorch to trace it into a
static graph representation. And that means you start with a mini batch and you run it through the
network and all of the operations that it calls, it just records those and then it puts them in a
graph and you can call them again later.

</turn>


<turn speaker="James Bradbury" timestamp="26:28">

And this covers everything except Python control flow because the tracer doesn't see the If
statement. It just sees which side of the If statement was selected.

</turn>


<turn speaker="Matt Gardner" timestamp="26:38">

Right.

</turn>


<turn speaker="James Bradbury" timestamp="26:40">

And so if you can get rid Python control flow, then you're at a situation where the trace exactly
represents the semantics of the PyTorch network. And so the core team is working on, basically, ways
to compile basic Python control flow into higher order functions. So to take a for loop and compile
that into like something that looks more like a Theano Scan or a TensorFlow While Op. I think
matchbox is pretty complimentary to that because we also do some basic static analysis, control flow
analysis on loops and conditionals. And we can benefit from the sort of more comprehensive static
analysis that PyTorch is adding. And then as soon as we're able to get rid of every last example of
Python control flow by lifting it into a higher order function, then we too can benefit from this
ONNX export and just-in-time-compilation because suddenly the Python code that, that the user writes
and that we write in the matchbox framework, that will only be run once and it will be building the
trace that the compiler later uses to create an optimized condition.

</turn>


<turn speaker="Matt Gardner" timestamp="28:04">

So, I'm not too familiar with the PyTorch team's efforts here. Does when you say, removing the
control flow, does that mean I literally don't write ifs anymore and instead I use a different
function?

</turn>


<turn speaker="James Bradbury" timestamp="28:14">

No, that means you write the If, but the back end actually lifts it into a different representation.
What they've written now is like, it's still in progress, but when you can find on the PyTorch
repository is an effort to basically convert Python source code into higher order functions and a
graph like representation.

</turn>


<turn speaker="Matt Gardner" timestamp="28:40">

So does that mean I use a different interpreter than the Python interpreter? I'm just confused as to
how this even works.

</turn>


<turn speaker="James Bradbury" timestamp="28:47">

Yeah, so it means that you have some parts of your network are not control flow, right? They are
just calling Python functions. Other parts of the network do involve control flow. So every time it
sees something like an IF or a While, it can analyze the contents of that statement or that block.
So, let's say it's a for loop, we can discover in the, the key thing to discover is the same thing
that matchbox needs to look for, which is loop carried dependencies. So, it needs to discover every
variable that is both read from and written to during the course of the loop. Everything that's
updated, each run to the loop. And once you identify those, you can pull them out and then you can
take the body of the loop and write it as a matchbox function. And rewrite the overall loop into a
call to a higher order function that takes that function as an argument, updates the loop carried
dependencies at each step. So, rewriting control flow as a higher order function, it's also called
Lambda lifting. And that's the only thing that needs to happen. So once that happens, you can use
the ordinary Python interpreter.

</turn>


<turn speaker="Matt Gardner" timestamp="29:53">

Interesting. That's cool.

</turn>


<turn speaker="James Bradbury" timestamp="29:56">

This is a good example of something that is a huge trend this year and like, pretty exciting to me,
which is the, this is machine learning and programming languages communities are starting to, to
talk to each other more. So this project at, on the PyTorch core team, this is the result of some
fantastic compiler engineers joining Facebook and working on what many people thought was
impossible, which is like statically analyzing Python code and converting into a graph
representation. These are like people who've worked on the Haskell compiler and people who, who
wrote a just in time compiler for like, Lua or other languages. And something similar is happening
at Google where they just recently hired one of the best known compiler engineers in the world.
Chris Lattner.

</turn>


<turn speaker="Matt Gardner" timestamp="30:46">

Yeah. It's an exciting time. There's a lot of nice stuff being built right now. Right. Again, going
back to my school days, I remember writing gradient code and machine learning used to feel so hard.
And now it's just like, I just declaratively write all of my operations and optimization just
happens for free. It's magic. It's pretty cool.

</turn>


<turn speaker="James Bradbury" timestamp="31:03">

ML researchers are never satisfied. Okay. We want it to be easier and faster. And I mean, it's,
there's a real motivation for this, which is that the hardware just keeps getting faster and
software, is not keeping up. Like, I mean, with a voltage GPU, it's, it doesn't make any sense
anymore to have a Python interpreter controlling it. The Python interpreters cannot keep up with the
GPU hardware anymore.

</turn>


<turn speaker="Matt Gardner" timestamp="31:31">

Great. This was a really interesting conversation. Any last thoughts before we conclude?

</turn>


<turn speaker="James Bradbury" timestamp="31:36">

Thanks so much. This is really enjoyable.

</turn>


<turn speaker="Matt Gardner" timestamp="31:38">

Yeah, it was nice talking to you.

</turn>
