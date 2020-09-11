---
title: "Attention Is All You Need, with Jakob Uszkoreit and Ashish Vaswani"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Jakob Uszkoreit","Ashish Vaswani"]
number: "036"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Waleed Ammar. we are research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:12">

Great. Well, our guests today are Jakob Uszkoreit and Ashish Vaswani, Jakob and Ashish work at
Google's Mountain View office. Where they develop large scale systems for language understanding.
Their work help Google's products understand user's questions and commands better. Very happy to
have you with us.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="00:34">

Thank you.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="00:34">

Thank you.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:35">

So today we're gonna discuss your paper titled Attention Is All You Need. It's coauthored with Noam
Shazeer, Niki Parmar, Llion Jones, Aidan Gomez, Lukasz Kaiser and Illia Polosukhin. And so the key
idea of this paper is that, RNNs and CNNs are useful building blocks for modeling sequences but they
have inherent structural constraints which limit the utility. So this paper proposes using a new
type of attention network that addresses these limitations. And out performed previous state-of-the-
art results in challenging tasks, machine translation. It also has been shown to work in
constituency parsing. So could you give us a little bit more information about the limitations of
the RNNs which triggered this problem.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="01:28">

So I think basically the intuition that got this started is that despite gating mechanisms like LSTM
or GRU cells it's still challenging for RNNs to effectively learn or efficiently learn long
distance, long range dependencies in language but also images and then other potential applications
and that ultimately gave rise to this in claim or this intuition that having some having a mechanism
where within each layer you basically have a much more global view of your input structure and your
output structure could be beneficial for learning. And then potentially also be more efficient in
terms of computational complexity or at least not less efficient despite the global view.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="02:28">

And so how about CNN? So RNNs have this like a constraint that you cannot really jump ahead of
yourself and do a later computation. But in CNN this kind of is not a problems, but still like your
proposed architecture is improved. Could explain. What are the limitations of CNNs?

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="02:47">

Well, I think ultimately the CNN suffer from the same issue. If you look at any given layer, right,
you usually have to limit your receptive field size. You can't process your entire input or output
signal with a single application of a convolution. You're typically strided across your input and
output. And as a result need multiple layers to obtain a more global two in particular contrasting
kind of with ByteNet or ConvSeq2Seq, and ByteNet through this dilation technique, you need a
logarithmic number of layers before you actually can combine information from different positions.
In ConvS2S you in fact need a linear number of layers before that information kind of meets in the
network.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="03:46">

Now to say something good about this, I mean, convolutional models, if they were sort of inspired by
these limitations of sequential models like LSTM, gated linear units that the Jakob talked about and
they also solve the partial problem of gradient propagation instead of having gradient propagating
through length, gradient propagating through height and instead of sequential computation, you can
consume all your inputs and outputs at training time simultaneously. So they do have these
properties. But as Jakob pointed out the number of layers you need or for every position to interact
with every position, the number of layers is a function of the length of the input logarithmic or
linear. Logarithmic in the case of ByteNet linear in the case of Convseq2seq.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="04:44">

Yeah. I think actually comparing convolutions and this kind of self attention or purely intentional
architecture the thing that in a certain sense they share I think most prevalently or most saliently
in comparison to recurrent models is that they're much more parallelizable right? So in recurrent
models due to the fact that you push along this hidden state, that depends on the entire history of
basically one side or even both sides of a certain position in a linear signal. You are limited
fundamentally or inherently limited in the parallelism that you can obtain within a given instance
and both CNNs and the transformer and the fully attentional models don't have that limitation, which
ultimately allows you to parallelyze them much more effectively.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:45">

So we've talked about some of the problems and parallelization and then ease of connecting distant
dependencies of LSTM or other RNNs and CNNs what's your solution to this problem? I think some
people are probably familiar with this already cause this paper was submitted like four months ago.
But can you give a description of the model that you're proposing here?

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="06:08">

The basic building block is a self attention mechanism in which you effectively do a pairwise
comparison between every two positions of your signal. So let's just for the sake of simplicity,
stick with linear sequences for now. You basically compare, within any given layer you compare each
pair of positions or rather the representations for those positions at that layer with each other.
And then that comparison you then use to generate the distribution for each position a distribution
over other positions and that you use in weighting the representations for the other positions in a
weighted average that you then combine with the current position in order to, in our case with the
fully connected neural network, compute the representation for that position at the next layer. So
one way of thinking about that is you basically compute an attention for each position you compute
and attention distribution over all the other positions.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="07:23">

You, aggregate the representations for all the other positions and weight them by that attention
distribution. And then combine that weighted average with the representation at the position itself,
either through residual or by simply including the current positions representation in the weighted
average, send that through a position wise function in our case like I said, a fully connected
neural network with two layers and a single non-unit linearity in between. And then you obtain the
next layer as representation for that position. And you do that for each of the positions in your
sequence.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="08:01">

And on the decoder side since we can peek into the future, you have to apply a mask on what are the
legal positions for a position. Basically, you can only see into the past because at inference time,
you don't have access to the future. So this mechanism is replicated on the decoder side. So we have
an encoder decoder architecture except that on the decoder side we have a mask that locks access to
future positions and the structure repeats itself. You have this self attention mechanism followed
by feed-forward layers and then you also have encoder sort of following the standard encoder decoder
attention in LSTM translation models we have encoder decoder attentions where each decoder layer
attends to the representations from the last encoder layer or the output of the encoder.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="09:04">

And I think the key insight is that that sounds like a lot of work, right? Because you now have this
N squared number of comparisons that you have to perform. But it turns out that it works in your
favor in two different ways. One is that those comparisons are trivially parallelyzable and not only
are the comparisons trivially parallelyzable but also then forming the resulting weighted averages
per position and performing the subsequent kind of integration computation where you recompute each
position's representation using that weighted average. These are also all inherently trival to
parallelized within each layer, but also works in your favor in the way that the comparison
operation you can employ are much simpler than the operations that in RNNs or CNNs you would employ
per position. And so in our specific incarnation, we have a scaled dot product that we compute
between the representations for each of the positions in order to obtain the attention
distributions.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="10:13">

And that in turn is linear in the dimension of your representations. Whereas what RNNs typically
execute per position is actually quadratic in the dimension of your representations. And it turns
out that for the representations that we commonly use variable length representations that we
commonly use for things like sentences the embeddings at each position say at each word or word
piece position. Actually the dimension is much larger than the length of the sequence. And so
performing something that's linear in that quantity. But becoming quadratic in the length is
actually preferable over being quadratic in the length and linear in the [inaudible].

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="11:07">

Yeah. So instead of, instead of having actually having an ND squared, which is the computational
complexity of the convolutions, if you're typically using a hidden dimension of 1024 and our cases
is N2D. So it's cheaper to do this versus the convolution. Now separable cons like we'd like to find
out how this property, because they break up the convolution, this N2 computation into into ND
because they break it up into two, into first running spatially and then depth wise. So they do a
shave off computation.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:50">

So, okay. So we've got then a model that you can think of essentially as replacing any RNN where
instead of doing your current computation, like we get an input of a vector of sequences embeddings
for each word and then we pass it through your attention encoder and get out a sequence of vectors
just like an LSTM gives us and you, your paper describes experiments with as Ashish talked about
earlier using this as both an encoder and a decoder to do machine translation. Right. And you showed
some really good results. We probably don't need to go into too many details on that cause I have
some more interesting questions to ask but do you want to give a summary of the results that you
found in these experiments.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="12:37">

Sure. so there are two well the two sets of experiments, there are machine translation and
constituency parsing. So machine translation, we ran experiments on the WMT'14 English, German
English, French translation task. And so we have two sets of models, the base model, which is a
smaller model and the big model which has many more parameters, it's the same number of layers. The
base, the larger model also has many more parameters. And the base model itself outperforms the
previous best ensemble results, which was the convolutional sequence-to-sequence translation model
from Facebook by about a BLEU point and our big model as a BLEU point on top of that for English,
German. Now this is a single model and this is a significant improvement over previous results, on
English/ French, our big model of sort of matches the previous best ensemble English/French
translation results on the WMT task. And running times are considerably lower than both previous
sequential models and sort of feed forward convolutional models.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:00">

Right. Because of the parallelization that you mentioned, right. It's a lot less computationally
expensive. Right.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="14:06">

And I think that that's kind of the, maybe even more importantly than the quality improvements, a
lot of which also stem from you know, very well tuned training set up and learning rate schemes and
all of these things. Ultimately, I think the thing that's unaffected by all of this tweaking is the
fact that you simply spend an order of magnitude fewer flops to attain those those results.
Ultimately a lot of the tools of the trade or tricks of the trade that we employed in training these
models. You can apply to recurrent models as well. Right? So you can imagine there is one
interesting component that we use on top of, we're kind of extending the self-attention and encoder
decoder attention in this model, which is multi-headed attention. And we can go into more detail
about that also if you'd like to, but that mechanism applies basically directly also to
convolutional and recurrent models. But ultimately the thing that remains where these self-
attentional models are fully self-attentional models have a clear advantage is the workload, is the
computational complexity and the parallelization,

</Turn>


<Turn speaker="Matt Gardner" timestamp="15:25">

Yeah, that was the next thing I was going to ask you about actually. So nice segue there. I've seen
this notion of like multi-headed similarity and just one or two other places. There's a paper called
Multi-perspective Context Matching for Machine Comprehension that did a very similar kind of you it,
it's the same mechanism that you have for multi-headed attention. And I think it's a really
interesting and important idea like being able to not judge the similarity between word vectors on a
single access but on multiple different axes. Do you want to give us some more detail on what you're
doing here and how it works?

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="16:10">

Sure. So in our case, I mean, one could imagine she really having multiple heads that operate on the
same dimension on a very large dimension say 1024 and you essentially have eight heads that are
operating in 1024 dimensional space, but that's extremely computationally expensive. So what we do
is we carve up the model dimension into, into N8, 16 for discontinuous blocks. And each head
essentially does attention separately in each one of dimension block separately. So if you had 512,
then you'd break it up into 64 dimensional blocks. If you had eight heads and then you'd have eight
you'd have attentions on each one of these each one of these different dimensions. And one advantage
of this is that if you had a single attention head then you wouldn't be able to sort of combine
pieces of, you wouldn't be able to combine pieces of information from two positions because imagine
if you had, you have just one probability distribution and if you wanted to combine one portion of
the dimension, one portion of the space from one position and another portion of this space from
another position you'd end up getting averaging effects.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="17:32">

Whereas here you can actually stitch these two things together because one head could assign high
probability to one sub-space in one of the positions and another head could assign high probability
to another sub-space. In the other position.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="17:47">

That also relates to the positional encoding part of the one continual could you elaborate a little
bit about how'd you do the position encoding?

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="17:55">

So I think there's one thing we should say there, which is that one thing that we didn't have in the
very first revision of the paper that we've added since is a comparison of the positional encoding
scheme, the sinusoidal positional encoding scheme that we use for most of the experiments with
learned positional encodings where we show that they're basically equivalent when it comes to end-
to-end performance. So you don't necessarily need to rely on that positional encoding scheme. We do
think it's particularly pretty because it doesn't have any parameters; any trainable parameters. And
the idea is basically that you represent positions as the values of sinusoidal functions with
different phases different periods. And as a result, you know, kind of maybe intuitively thinking of
this as something like a frequency domain transformation effectively represent positions as the
super position of a bunch of different sinusoids at different frequencies.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:09">

So backing up just a minute there, it seems like LSTMs because they encode things sequentially, you
can get some notion of what word goes where, right? And so what, when you do the self attention, you
lose this notion, right? So just backing up a little bit for people who aren't familiar with what
you did in the paper. That's what we're trying to solve here, right? So that you can know that two
words are close to each other when you're doing some attention because that actually is sometimes
important for certain kinds of things you might want an encoder to know. So I actually would like to
dig into this a little bit more. Do you know how, so you introduced this sinusoidal positional
encoding where you construct apriori, this matrix for each position in the sentence. You get a
vector for each position and then you add that to the word vector at that position, at the very
bottom of your network. And it never shows up again?

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="20:20">

It kind of does, right? Because there's visual connections that have the ability to sort of move
this information around. And we ran an experiment where we sort of cut the residuals and the results
were sort of catastrophic. You could tell that the later layers are not picking up on typically the
alignments or the attentions are somewhat close to the diagonal because of locality. And you could
tell that they're not picking it up and we attach the residuals and then we then added positional
encodings at every layer without the residuals. And then we saw these effects sort of come back in
where the models now, because that position and information, each layer was able to get reasonable
attentions along the diagonal. But again, the scores are not the same as having residual. So the
residuals are definitely carrying more information, but certainly we do think that the residuals are
responsible for carrying positional information also.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="21:16">

There's, there's other ways of mitigating the effect of kind of washing out positions. That you
could imagine we're actually experimenting more with the respect to the effects of using those. So
one way for instance, is to not just add whether it's learned or coming from the sinusoids, not just
add the positional encoding, but concatenated. At which point if you're using multi-head attention,
you're actually able to learn that you should propagate only the position part untouched. And only
or the position part untouched only combine non position representing pieces of the other positions
representations but still outstanding. That's the wrong term in English, the results are
outstanding. We'll get some, we'll get some, some there in the future. But the the residuals like
Ashish said, right. Clearly you do other things than just propagate them. Another fix, and I guess
this is what you alluded to is to just add in position encodings at every layer.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="22:29">

And one might wonder that like just adding would that be risky because you're adding it on top of
your learned embeddings if your look ups. Right. But one point to note is that the model is actually
learning the embeddings so it could adjust the input embeddings of such that these positional
encodings are being added to it, but in case you wanted to use position encodings in another sort of
task where the inputs actually had some information like spectrograms or the outputs of some
convolution network that actually crunched an image, then you'd run the risk of actually washing all
the information away with your visit by adding position encodings that you'd rather concatenate. But
in this case, the model has the ability to adjust the input embeddings that are being learned and
adjust for the fact that they're going to be added with the positional encoding.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:15">

Yeah, we were wondering how the model could actually learn without watching this out. We wondered
like, is this rotating vectors in this space? Because you're normalizing them before? Like if you
add a sinusoid to a vector and then renormalize it, so it's on the unit sphere you can think of this
as a rotation maybe. And I wondered if that was what was going on or I just wanted to know if you
had an intuition for how this actually works.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="23:41">

So it's tricky because this works with learned embeddings as well, right? So this doesn't
necessitate some, I mean this might be true for some sets, but because this phenomenon, because
adding learned positional encodings works equally well, it's able to separate out that information
somehow.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="23:59">

Basically, first of all, I don't think we know exactly how this is working. I have, I don't know,
one hypothesis is that not all the frequencies of the sinusoids are equally important for any given
problem, right. And you know, you could imagine that you basically not only are they not equally
important, some are you can say the length of a typical sentence some well very much much less than
others. And so as a result, you could imagine that the model just uses those dimensions for the word
embeddings more. Like I said, more experiments are needed and we're actually working on trying a
bunch of different things here. I'm not entirely sure we'll ever exactly know.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="24:52">

Yeah, but this in an interesting question. I mean your question suggests one could also examine the
learn positional encodings and see what properties they have, and if they have some intersecting
properties with the sinusoids that would be very interesting but we haven't sort of done this as
yet.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:07">

Right. Our two hypotheses were either be the case and like, if this is a rotation, then you should
be able to learn that it's a rotation and you should see it in the learned embeddings or it's
essentially pushing the vectors doing a concatenation by reducing the size of the actual word
embedding space effectively, which are both the two things that you came up with. I'm glad we, at
least in our discussion, came up with the same intuitions that you guys had.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:34">

So I wonder if in your controlled experiments you were able to get like similar results or much
worse or much better with replacing some of the transformer layers with RNNs or CNNs because you can
potentially interleave them but then you can benefit also from all the other aspects that you
discussed in the model, including the positioning encoding.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="25:56">

So we have we have some results both around CNNs in certain places and using RNNs instead of the
self attentive decoder using RNNs instead of the self attentive decoder has some advantages at
inference time computational complexity wise or allows for certain optimizations that the attention
or self attention layers don't and we can get roughly the same equality under certain circumstances.
You do pay a penalty at training time and that's the one thing that you can't get around. And then
do you want to talk abount CNNs?

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="26:43">

This is a good point. I mean Jakob also mentioned before, sort of the, the, the inability of RNNs to
capture sort of distant information or relay distant relationships between positions which seems to
indicate that these relationships are probably important on the encoder side. And on the language
modeling side, you probably don't need to look very far behind N-Gram models are quite good. So like
swapping that N with with a model that doesn't or has difficulty looking really far back, is still
probably okay because those dependencies are somewhat fairly local. On the decoder side.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="27:16">

In particular, if you have attention between the encoder entity.

</Turn>


<Turn speaker="Matt Gardner" timestamp="27:19">

Yeah. Cool. This, this is kind of related to another thing I was thinking about. As we mentioned
briefly earlier, this is essentially a new encoder, right? You could use this as a drop in
replacement for any LSTM. So have you tried this on any other tasks with like just replacing
encoders?

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="27:38">

So the answer is yes. Quite a number of different tasks actually. It's not always trivial and we
don't exactly understand yet why we have some intuitions and we can tell you more about that in a
bit. But so far it usually eventually works and when it does, it works really well. And even just in
an encoding set up. So to give you kind of kind of a flavor, we've tried it in tasks such as; next
response prediction and pairwise, textural semantic text similarity type tasks. Classification so
far was one of the areas in which it was more challenging.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="28:33">

I mean some folks figured out how to use how to with the right loss and it seems to work quite well.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="28:38">

Yeah. one thing that that seems fairly consistent among all the different tasks where we've used it
is that one key challenge in many tasks where the environment isn't such that there is a strong bias
towards local dependencies or identifying local dependencies on the source side and tasks were
that's not the case. The attention can collapse and basically stay uniform across the entirety of
your signal and the lower layers never latch on to looking to effectively acting much more like very
limited receptive field convolutions in tasks where you have dependencies such as machine
translation that kind of strongly indicate local dependencies on top of maybe long range stuff.
There that problem doesn't seem to be the case. And there are two solutions that we've found to work
pretty consistently. Number one is you replace your lowest layers with convolutions and you just
have convolutions with a small receptive field, you run those for a few layers. And then on top of
that you start doing self attention. And another solution that we think is a bit more elegant is you
effectively reduce the, so to speak, receptive field of the self attention mechanism. So you provide
an inductive bias effectively towards looking into smaller neighborhoods at the lowest layers by
saying at the lowest layers the self attention mechanism only compares positions that are nearby
according to some neighborhood. Some definition of neighborhood around the positions. And both of
those consistently in different tasks seem to solve this problem.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:29">

Yeah, that's really interesting.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="30:30">

One other thing that we're also considering, or that's probably worth trying is auxiliary losses in
that might help in particular encoders to lock in to the right attention distributions. I do think
that that might also be a promising direction.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:51">

Are you thinking like if you know that one word modifies another word you use, say like some kind of
predicated argument structure as an auxiliary task? Like what are you thinking of here?

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="31:05">

So one could imagine language modeling or doing something language modeling or some, something.

</Turn>


<Turn speaker="Matt Gardner" timestamp="31:11">

Okay. Yeah, yeah. Okay. I thought you were saying something like supervision on the attention to
self, but you're, you're just thinking of multitask on some additional objective

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="31:21">

People have done in different work with kind of more traditional attention mechanisms. People have
shown additional supervision or additional losses on the attention distribution themselves to
potentially be beneficial. I think one should try this here also say for instance, you know, shallow
syntactic structure or things like that. I personally think that it's a double edged sword. It can
backfire. Especially because we've found that the problems are not at the more abstract levels or
layers, the problems typically show up in the lower layers where really the bias you want to give is
much simpler and not quite, you know, not as complex as say, shallow syntactic structure.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:09">

Yeah. we've tried recently using self attention to encode a passage in SQuAD or other question
answering kinds of things. And what we've found is that the, I'm not certain this is what's going
on, but if the vector, if the passage is really long it seems like you're going to have a harder
time. Like there will be more places where your attention is going to match and so you're gonna have
a harder time unless you have a stronger bias toward nearness. You have a harder time learning
things. In fact we did a very similar experiment where we constrained the attention to only be
within a window and found significantly better performance. I guess that's very similar to what you
just described also.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="32:48">

Yes. So, so try out doing that only for lower layers and then letting the high layers run free. That
has worked quite well for us.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:55">

That's interesting.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="32:56">

That's computationally feasible, right? If it's infeasible, then you know, that's an easy way of
basically constraining the model effectively without losing too much quality and gaining quite some
computational grounds.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="33:11">

I guess this is a good plugin for the Tensor2Tensor library, but these, this particular operation or
this particular computation that you want to carry out has been implemented in the local, in these
local attention functions where precisely these are very small receptive fields that allow for such
restrictions. And so it's, yeah you could explain it all of those things that all of us, including
people from outside Google have also been contributing to.

</Turn>


<Turn speaker="Matt Gardner" timestamp="33:37">

Cool.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="33:39">

So it seems like when you, when your task is like a classification problem for the entire text, it's
not really clear how to define the key like, Oh, sorry the query that you used to do the attention
feels like this is a fundamental question for this approach. How to define the query in these cases
do you have any comments how to do that?

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="34:01">

Yeah, this is a great question. Like, you know machine translation is fantastic because you get this
previous word and the decoder, then that first does it's self attention. And then it tends to be
encoder, which gets the signal from this previous versus previous word forms like sort of creates
this excellent query in machine translation. Whereas if you're just sort of encoding, Oh, you know,
what does an informative query is a harder question to ask and I suspect that you probably need to
know what you're looking for unpack it inside the query. I mean, what would be an example? Like, so
for example, a visual query, answering questions from visual queries, right? The question the next
line query that you can then sort of attend over the image and sort of figure out the important
parts. Right? But in sentence classification, perhaps some idea of somehow getting information about
the label in the query itself or what you're looking for would be, would be useful.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="35:20">

I do think that ultimately the auxiliary loss strategy or multitask strategy is going to be more
effective for these kinds of things. There might very well be ways of doing it effectively without
going down that route. But it's very attractive anyway,

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="35:39">

Yeah, answering that question is probably the most important question for using something like self-
attention, like what goes into queries probably very important.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="35:51">

But I think in doing these at the lower layers doing these constrained receptive fields or reduced
receptor fields basically answers that question with your neighboring words, which we kind of know
from experience to be somewhat true. And then the hope is that at the higher layers you can just
figure it out. But that might not even be true, right? If your task really is just classification,
you, you might not even get it even if you provide that kind of inductive bias at the lower layers.
And you might need either other tricks or auxiliary losses.

</Turn>


<Turn speaker="Matt Gardner" timestamp="36:22">

So my last question is, do you have any notion of what these attention, like you have multi-headed
attention, you have many layers of this multi-headed attention. That's a lot of things to dig
through to try to figure out what's going on. I guess you've mentioned that it sure looks like the
lower layers look at more N-Grammy kinds of things at local context. Do you have any intuitive sense
for what this thing is actually learning?

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="36:47">

So we have some examples. In total, no, but we have some interesting observations that are very
consistent and so exactly what you said right. At the lower layers it seems like a lot of the heads
perform very convolution, like operations, very local, very kind of regular with respect to relative
positions and at higher layers that becomes increasingly it becomes increasingly chaotic or global
in a certain sense. But they're not always, they're often quite peaked, the attention. Distributions
are often actually quite peaked and in some cases in interpretable ways. So we've found, for
instance, that every translation model we've actually looked at in detail has an attention had in
the higher layers. That seems to be doing pronominal co-reference resolution. And so you basically
look at the at the positions at which the source sentence has a pronoun and you see that it attends
to potential candidates that pronoun might refer to.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="38:02">

And in some cases even in, in ways that suggests that the attention distribution reflects what the
model identified as the proper reference. That's one example. We've seen some cases where lexical
choice seems to be disambiguated by terms or phrases that are strongly indicative of the topic.
Right. So imagine you have a term that's ambiguous in terms of lexical choice in translation, you
then might see that at higher layers you attention distribution is peaked around topic indicating
terms that disambiguate, that specific, the translation of that specific term.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="38:49">

Some sort of examples of the Winograd scheme they have this flavor or resolution.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="38:58">

Exactly! These things are always a bit risky to mention, but we've played around a lot with the
fairly simplistic Winograd schema examples. And we've seen a very consistent uptick in translation
quality on those where the attention distribution is very consistently reflected you know attention
on the hints that give away the gender or the exact reference that then indicates the gender of the
translation of the pronoun.

</Turn>


<Turn speaker="Matt Gardner" timestamp="39:29">

It's really interesting,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="39:31">

Right. Thank you very much for joining us for this discussion. And I hope some of the audience will
be interested in going to the top events later this year.

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="39:42">

If people have questions, feel free to email all of us.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="39:44">

Use Tensor2Tensorr. So one thing that we've found is that's important for practitioners is we
haven't yet figured out exactly the right ranges of hyper parameter choices that make these models
these kinds of models as robust as a LSTM or GRUs in traditional Seq2Seq with attention setups. We
think this could be because we just haven't learned about them enough yet. It could also be because
they are inherently less robust. We don't know that yet, but one thing that you can basically where
you can use our experiments as a shortcut for yourself is to just download Tensor2Tensor and use
that for experiments in this direction.

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="40:36">

A lot of the kind of that exploration has already been done. Like Ashish said, there's a bunch of
operations now that Tensor2Tensor supports that we didn't have for the original models in the
Attention Is All You Need paper that we will use an upcoming work, such as the local attention with
limited receptive field local self attention with limited receptive field. Do we already have multi-
dimensional self attention?

</Turn>


<Turn speaker="Ashish Vaswani" timestamp="41:05">

We do not have multi-dimensional,

</Turn>


<Turn speaker="Jakob Uszkoreit" timestamp="41:08">

it's coming. Yeah. Yeah. So interesting stuff, right?

</Turn>


<Turn speaker="Matt Gardner" timestamp="41:12">

Yeah. That's a nice resource. Thanks for talking to us.

</Turn>
