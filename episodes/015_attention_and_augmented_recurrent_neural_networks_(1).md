---
title: "Attention and Augmented Recurrent Neural Networks"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: []
number: "015"
tags: []
description: "http://distill.pub/2016/augmented-rnns/"
type: episode
---

<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F326644810&show_artwork=true&show_comments=false"></iframe>

<turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. We are research scientists at the Allen Institute For
Artificial Intelligence.

</turn>


<turn speaker="Waleed Ammar" timestamp="00:11">

Today's paper is somewhat unconventional. It's a paper published at Distill pub, which we'll talk
about a bit later. The title of the article is: Attention and Augmented Recurrent Neural Networks.
It's written by Chris Olah and Shan Carter at Google Brain. In NLP, we care about modeling sequences
a lot. One of the standard ways of modeling sequences is to use a recurrent neural network, which
finds the output of each step as a function of its inputs and reuse the same parameters across all
the steps in the sequence. In this paper, Chris and Shen review some RNN extensions and discuss why
they think these extensions are going to be important for NLP?

</turn>


<turn speaker="Waleed Ammar" timestamp="00:56">

So the reason I said this article is not conventional is that it's published at a new journal. It
has a strong emphasis on outstanding communication with the goal of deepening our understanding of
the methods used in machine learning. And it doesn't necessarily require that you have a great
contribution in the methods that you're actually describing. And this new journal allows you to use
new types of interaction that are not possible in static mediums like like PDF files.

</turn>


<turn speaker="Matt Gardner" timestamp="01:29">

Okay. So the title of this paper is Attention and Augmented Recurrent Neural Networks. Like these
are things that we've studied for awhile. What, what does this paper do?

</turn>


<turn speaker="Waleed Ammar" timestamp="01:39">

Right, the paper discusses four extensions to RNNs. The first one is fairly standard. Many people
already use it, although it's only been around for a couple of years, it's the attentional
interfaces. So when humans process sequences, we often focus on one part at a time before moving to
process other parts in the sequence and attention interfaces enable you to do this point,
maintaining a distribution over positions in the sequence and use it to compute a weighted sum of
the sequence representation at each position. So to compute the distribution you can compute at a
product between a query vector, which represents the thing that you actually care about, and a
vector representation of each position in the sequence. And then produce a scalar score for each
position, which you then heat to a softmax layer and get a distribution over the different
positions. And you can get more complicated interactions between the query vector and the vector
representing every step by defining a more complex relation so you can have a parameterized function
and you learn the parameters of this function from your training data.

</turn>


<turn speaker="Waleed Ammar" timestamp="02:51">

The second extension is called in Neural Turning Machines here at every time step the RNN reads data
from an external memory, do some processing, then writes data back to the external memory. The
memory is simply a collection of vectors with addresses. And the tricky thing about reading and
writing is that we want them to be differentiable with respect to the address that we're writing or
reading from. So to accomplish this neural turning machines, read and write to all locations at the
same time, but do this at two different degrees. So when we're reading, we compute and attention
distribution over all positions in the memory and read the weighted sum of all the memory locations.
And then when we are writing, we update the value at each position using a weighted sum between the
previous value at this location and the new value that we're trying to write and the weight is
controlled by the attention score for this location.

</turn>


<turn speaker="Waleed Ammar" timestamp="03:52">

So the way the attention scores are computed in the Neural Turing Machines, is kind of interesting.
So you want to do both content-based and location-based attention and by, by content-base, what we
talked about a bit earlier, where you have a query vector and you're trying to match it to every
location in the memory to find which ones are most relevant to this query. Then you get a
distribution over these locations. But then you can also interpolate this with the attention that
you have from a previous step in order to maintain some level of continuity between the thing that
you've been processing before and the thing that you're currently processing. Sometimes you also
would like to introduce a shift in the attention. So in order to do this, they convolve the
attention scores with filter, which basically moves the attention one step further this way you can
say, you're really saying, look at the next position in the memory.

</turn>


<turn speaker="Matt Gardner" timestamp="05:05">

I guess this is so that you can encode, say you read in a sequence of words. You can write the
sequence of words to memory in successive memory slots and then read from them successively again.
So you can get like lists of things stored in your memory and operate on them as lists, right?

</turn>


<turn speaker="Waleed Ammar" timestamp="05:27">

Exactly. Yes. And the controller who is actually defining what the shift should look like, can go
back and reprocess the sequence from the beginning at a later time. So I thought that was kind of
interesting and we can think of applications where we need to store some data and then read it
again. Although currently I don't see myself using this.

</turn>


<turn speaker="Matt Gardner" timestamp="05:55">

I guess when I think about a neural net being able to reason over complex facts or common sense
knowledge or even like a knowledge graph for instance, it seems totally implausible for me to have
the network memorize all of these facts as weights in its network. And instead what you would
probably want to do is have some kind of memory mechanism. Maybe it's the tape on a neural Turing
machine. Maybe it's something else. I don't really know what this looks like. I don't think anyone
has really figured this out yet. There've been some ideas, but we still don't know. But having the
network to be able to access at runtime a discrete set of facts or other kinds of information, and
then be able to do operations on them, seems like a really important thing because we're just not
going to be able to encode arithmetic or chained inference over discrete facts in a network's
weights. It's just not gonna happen.

</turn>


<turn speaker="Waleed Ammar" timestamp="06:49">

Right. I think also, I remember others do this to a limited degree where you're only limited to one
vector. But this gives you the ability to do yeah, it's more flexible in how it stores the
information.

</turn>


<turn speaker="Matt Gardner" timestamp="07:01">

Yeah, and there's a lot of similarity between how the neural turning machine works and how a memory
network works.

</turn>


<turn speaker="Waleed Ammar" timestamp="07:08">

Right. So the next extension they discuss in the article is Adaptive Competition Time. So by
default, RNN do the same amount of computation at each position in the sequence. So the idea here is
to enable us to do up to K computations as needed or, or less if there's no need to do all the K
computations. So whenever we're doing a competition at a particular step, in addition to consuming
the hidden state at the previous position and generating a new hidden state, we also compute a
probability that represents the degree to which this computation fulfills our need at this position
in the sequence. And we keep aggregating the probabilities after every competition within the same
step until this community probability exceeds one at which point we move on to compute the next
position in the sequence.

</turn>


<turn speaker="Matt Gardner" timestamp="08:04">

So you could think of an RNN that's doing some kind of language modeling thing or like trying to get
representations for individual words in a sentence. You could imagine that the amount of thinking or
computation you might want to do for each word is different because maybe some words are expected
and syntactically easy to process and some words are hard, like garden path sentences, something
like "The cat the dog bit meowed." is just hard to parse. And so when you get to the word meowed
maybe in order to process that word, you'll take a few more steps and reevaluate what you did. Like
the adaptive computation time stuff doesn't do this exactly. But these kinds of things help to
motivate this idea I think.

</turn>


<turn speaker="Waleed Ammar" timestamp="08:45">

Right. And I think also the question answering, when you do multi-step reasoning. It makes sense to
make the number of reasoning steps you want to do in the memory network adaptive. I think Mark
Neumann may have some, we have done something.

</turn>


<turn speaker="Matt Gardner" timestamp="09:06">

Yeah, we played around with this for a little bit briefly. Mark Neumann is working with me for now
and his master's thesis at the University of College London was examining adaptive computation time
on entailment decisions. And then we tried it out with memory networks for a bit. I guess we have
code that implements it, but didn't pursue it very much because decided that memory networks weren't
that interesting to pursue.

</turn>


<turn speaker="Waleed Ammar" timestamp="09:33">

So the next extension is called the Neural Programmer. Here. We try to learn how to apply operations
to solve a problem given input and output pairs of the problem. So at every step, the controller RNN
outputs a probability distribution over a predefined set of operation that you could achieve, you
could perform. And each operation operates on the output of the previous step and the output of the
two steps back. So this is just a restricted way of defining how to make computations or how to
write programs and yeah, so the first step is to define the distribution over the operations that
are possible. And the next step is to actually compute all run the inputs through each of the
operations and compute an average, a weighted average for the outputs of every operation in order to
feed into the following steps.

</turn>


<turn speaker="Matt Gardner" timestamp="10:38">

I guess it seems a little odd to me to have this like weighted combination of operations. So the
reason they have to do this at all it seems is because they only get a question answer pair and
there's some sequence of operations that you have to take to get from the question to the answer.
And this set of operations is not observed. And so in order to handle the fact that your latent
decisions are not observed, they do this attention and do this weighted sum over the output of all
the outcome of each operation in order to make this differentiable end-to-end. I guess thinking,
there are lots of problems in NLP where we have these kinds of action sequences and like, could you
even do this kind of method at all in a shift, reduce kind of dependency parse that this seems
implausible. But, it's an interesting idea. Doing this weighted combination of the outcome of some
action seems like a narrow, it has pretty narrow application though I think.

</turn>


<turn speaker="Waleed Ammar" timestamp="11:39">

I think it's a mediocre solution to a tool like to make the network differentiable. We have also the
same problem in the Neural Turning Machines where you don't really want to write all the locations
at the same time. Typically we want to write to one location and we want to read from location, but
for the same reason you also decided to compute a distribution and write and read from everything,
all locations at the same time. I think it may be less of a problem if you intensify the property
distribution. Hard enough if you sharpen the distribution enough but it's not going to go away.

</turn>


<turn speaker="Matt Gardner" timestamp="12:21">

So we just talked about four different ideas. Does this paper like introduce all of them? Like
what's going on? Like all of these ideas were published by other people. Right.

</turn>


<turn speaker="Waleed Ammar" timestamp="12:31">

Exactly. The paper does not introduce any of them. It just tries to make it easier for people to
understand these ideas and I think it's doing a good job at this.

</turn>


<turn speaker="Matt Gardner" timestamp="12:43">

Yeah. So I guess this particular episode is probably best thought of as a pointer to Distill, which
is like the whole point of Distill, this journal is to show things in an interactive way and
visualize them in nice ways. So it's a little hard to talk about this in a podcast I think, but you
should definitely check out this website, the article is online, you can see it, they have really
nice visualizations, really nice explanations for what's going on. So if you want to understand all
these things that we talked about a little bit better that's the whole point of this new journal and
it so far does a really good job at it.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:23">

Alright, it is a peer reviewed journal, although most of the papers there were written by the
editors of the journals,

</turn>


<turn speaker="Matt Gardner" timestamp="13:30">

It's still pretty new. Hopefully that will change.

</turn>


<turn speaker="Waleed Ammar" timestamp="13:32">

Yeah. And so if you're compelled to write a very clear visual, like to create very clear
visualizations for your research. There's also something called the Distill prize. So it's like
$10,000 if you manage to do a great job at writing an article and submitting it at Distill.

</turn>


<turn speaker="Matt Gardner" timestamp="13:56">

Okay. Thanks Waleed for talking about that paper. Next time we'll talk about a paper titled: Arc-
swift: A Novel Transition System for Dependency Parsing.

</turn>
