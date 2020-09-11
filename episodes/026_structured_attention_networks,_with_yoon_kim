---
title: "Structured Attention Networks, with Yoon Kim"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Yoon Kim"]
number: 026
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

Okay. Today we have as our guest Yoon Kim who is a PhD student with Sasha Rush at Harvard University
and he's going to talk to us about a paper that was at ICLR 2017 titled: Structured Attention
Networks. So Yoon, it's good to have you with us.

</Turn>


<Turn speaker="Yoon Kim" timestamp="00:29">

Good to be here.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:30">

Can you tell us what this paper is about?

</Turn>


<Turn speaker="Yoon Kim" timestamp="00:33">

Sure. So as we all know sort of the reach in the past two years or so has been in viewing deep
neural networks with attention where roughly we can think of attention as performing soft selection
over some memory bank. This could be words in a source sense that you want to translate or a bunch
of sentences of facts over which you want to do inference, say the question/answering. And we
noticed that in this case you can sort of interpret this as there being one latent variable. And
then performing some sort of expectation over this latent variable. But because this is a single
latent variable, there's new sort of structure among that. There's new inherent structural bias
that's given in these attention networks. And the point of our work was, hey, can we make the
attention distribution take into account the often inherent structure that we see in the inputs.

</Turn>


<Turn speaker="Yoon Kim" timestamp="01:40">

For example, what if we're doing character level translation, we have this inherent structural bias
that words exist. Or if we're working with say natural language sentences we would ideally like to
think that there is, you know, there's still debate about whether this is really true or not, that
there is some recursive syntactic structure about the sentence that we want to incorporate into our
models. So the idea, the core idea of the paper is to consider these structural dependencies when
calculating the attention distribution. And we experiment with two types of attention, two types of
structured attention networks. First is using a linear chain conditional random field to compute the
attention distribution. And we do this for neural machine translation and question/answering. And
second, a slightly more involved model is to use a first order dependency parser,

</Turn>


<Turn speaker="Yoon Kim" timestamp="02:40">

Graph based dependency parser to compute the attention distribution. And I think what's neat about
this is that previously we've had neural networks parameterizing the potentials into some graphical
model, whether it be a CRF or a graph based dependency parser for structured prediction. But in our
case we're using these same graphical models as internal neural network layers. Instead of only
doing it for structured prediction. And we think this is one way of incorporating the structural
dependencies that exist in the inputs and into deep learning models.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:27">

Yeah, I really liked the way that you described in your paper using the example of machine
translation that the different kinds of attention that you would do and what implicit or latent
modeling that this is actually doing. So, the typical attention that was introduced a couple of
years ago says for each word in my output, when I'm decoding a new word, I look at all of my input
and I pick a word essentially, essentially doing an alignment with this attention.

</Turn>


<Turn speaker="Yoon Kim" timestamp="04:01">

Right.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:01">

And that's like what people have done so far. And what you're introducing here is instead of doing
an alignment between the word I'm outputting and the words that I have, let's implicitly or latently
model a segmentation or a or an orally parse and I can do an expectation over these latent
segmentations or latent parses and use the output of this expectation as my context vector or
whatever. Does that?

</Turn>


<Turn speaker="Yoon Kim" timestamp="04:29">

Right?

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:30">

So I, liked that analogy really helped me understand what was going on here.

</Turn>


<Turn speaker="Yoon Kim" timestamp="04:35">

That's exactly right. Yep.

</Turn>


<Turn speaker="Matt Gardner" timestamp="04:37">

So it seems like if you want to do this, you need more data. Is that, so you're having a larger
latent model in between. Does this change like the amount of data that you might need to use in
order to get good latent representations? Does this question even make sense?

</Turn>


<Turn speaker="Yoon Kim" timestamp="04:57">

Yes. So we've been asked that a couple of times and unfortunately we didn't do an analysis of
performance as a function of data. My sense is actually these types of models will require less data
because when you have these structural biases you're actually having quite a strong inductive bias
on the model architecture. So my sense is that it's actually more statistically efficient for the
model to learn with these types of extensively more complex networks. But I imagine you can do
better with less data with these types of networks.

</Turn>


<Turn speaker="Matt Gardner" timestamp="05:37">

That's interesting. I guess having a stronger bias definitely would make you think that there's a
smaller data requirement, but at the same time you introduced more parameters to your model don't
you?

</Turn>


<Turn speaker="Yoon Kim" timestamp="05:50">

Not really. Actually, as soon in the case of the linear chain CRF, we actually only have four more
additional parameters which parameterize the potentials. And compared to the other model parameters
of which there are millions it's a minuscule increase. And in the case of the syntactic attention
layer that has actually the exact same number of parameters as the normal attention goal really,
because the sense is, you just give these potentials to some attention network. And in the normal
attention case, you just pass that through a softmax function to get your marginals. Whereas in this
case, we pass the same potentials through and do some dynamic programming to get, again the
marginals, but the marginals you get have implicitly some do over typically an exponentially set of
structures. So it's inherent, implicitly taken into account the structure.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:49">

Interesting.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="06:50">

So then does it make sense to to say that you mean overhead of using structured attention is that
you have to do the inference and that like the competition overhead of computing the marginals maybe
more like, maybe more expensive than the original way we typically do attention.

</Turn>


<Turn speaker="Yoon Kim" timestamp="07:09">

Yes. The computation is definitely a big overhead. So for example, in the case of neural machine
translation both attention layers have the same asymptotic run time of O(N). But in reality, we
found that the linear chain CRF was about five times slower to train in the case of syntactic
attention networks we found that syntactic attention is now N^3 versus I think N^2 in the normal
case. And that was about I think a hundred times slower to train. But actually there was a really
nice paper that was posted on archive, I think a couple of weeks ago from the University of
Edinburgh. It's from Yang Lui and Maria Lapata. And they actually extend this syntactic attention,
the paper's called Learning Structured Text Representations and they make the syntactic attention.
They are actually much, much faster by calculating the marginals, not not with Eisner's algorithm
but with the matrix tree theorem and then using that to calculate the marginals and that bypasses,
you know, for example, that allows the dependency parser to be non projected, which is cool. I think
that's a really nice piece of work that everyone should check out.

</Turn>


<Turn speaker="Matt Gardner" timestamp="08:37">

Yeah, that's really interesting. I think we haven't described for the listeners what exactly the
method does, like how you actually incorporate a latent segmenter or parse trees into the model.
It's a little bit hard to describe math in this, but can you give like a brief description of how
exactly this actually works?

</Turn>


<Turn speaker="Yoon Kim" timestamp="09:03">

Sure. I think at a high level we can view attention networks as simply learning. Say you're given a
memory bank where these effectors and each element in this memory bank includes something about the
input. It could be a word in this sentence or a fact and typical attention networks gives you some
weighting function which you use to get a linear combination of these memory vectors. And typically
you take a convex combination, you produce a distribution over these memory vectors. In our case,
it's the same framework in that we use a similar model to learn a weighting function for each of
these memory vectors. But the way we do it is not through a simple softmax, but through something
slightly more complicated that implicitly considers the structure among the memory of vectors. So in
the case of for example, machine translation at each decoding step in the normal attention case, you
have a softmax over the source sentence that gives you a distribution over which word to soft the
translate at each time step. Now instead distribution in the case of machine translation can also be
encoded with the binary vector of length N and we can consider distributions over all possible now
binary vectors of length N, and to get the weighting for a particular element in the source
sentence, we implicitly sum up all the possible binary vectors using dynamic programming. And we use
that as a weighting function to weight the hidden state for the position at say I.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:04">

Yeah. So the way I understood this, you can correct me if I'm wrong, is that you can understand
typical attention mechanisms as computed expected feature counts, which you might do in say a
standard EM algorithm. And we can take this notion and generalize it to more complex graphical
models and still use our standard inference algorithms like forward, backward or inside out
algorithms to get expected feature counts and use that essentially as the next step in our model.
And so what you're actually doing is embedding this forward backward inference algorithm into the
network itself. And it works because it's all differentiable it turns out, which is pretty cool.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:54">

Okay. can you tell us about the experiments that you ran in the paper?

</Turn>


<Turn speaker="Yoon Kim" timestamp="12:02">

Yes, as indicated, we had two different types of structured attention network. First was a linear
chain conditional random field, which we applied for neural machine translation and question
answering. So in the case of neural machine translation, our attention distribution was again, over
all binary vectors of length N, where N is the length of the sentence. And we use that to weight
each of the words during each decoding step. And we experimented with Japanese to English
translation and we had two settings where we had Japanese characters to English words and then
Japanese words to English words. And the reason we choose this is for Japanese to English
translation, typically word segmentation is done as a preprocessing step for Japanese because
Japanese doesn't have sort of natural segmentation as is the case in English.

</Turn>


<Turn speaker="Yoon Kim" timestamp="13:10">

And we wanted to see if the structured attention network could be a way of performing character
segmentation at in a soft way. So that was the point of our Japanese characters to English word
experiments. And we also experimented with a standard case where we did segment as a pre-processing
step and tried Japanese words to English word translation. And in that case, you can sort of think
of this structured attention as performing maybe phrase based neural machine translation because now
you're segmenting it to phrases. And what we found was on the character to word task the attention,
structured attention outperform the normal attention model by quite a bit or doing the word to work
task it was, the outperformance was only very slight. And then we also experimented with question
answering with the BAbi tasks.

</Turn>


<Turn speaker="Yoon Kim" timestamp="14:13">

And I think even though BAbi task is quite synthetic, what's nice about it is, so we in that case,
the state-of-the-art on BAbi tasks sort of attend to one fact in the memory bank and then condition
on that they attend to other facts. So you can sort of interpret this as doing greedy inference. And
we wanted to see if structured attention could be a way of performing global inference. And again I
think what's nice about the BAbi tasks is that because it's synthetic, you can actually see whether
you to the correct fact in the memory bank given your attention layers.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:59">

Yeah, I'll jump in here and say that I've been critical of the BAbi tasks in the past. And if you're
calling it language, then I think those criticisms are justified, but at the same time, there's a
place for synthetic datasets to help you tease apart what exactly your model is doing. So yeah, this
is totally a fine application.

</Turn>


<Turn speaker="Yoon Kim" timestamp="15:18">

Right. and I think what we found was indeed the structured attention layers were able to attend to
the correct sequence of facts versus normal attention layers. But unfortunately, if you look at the
question accuracy, which is what we really care about the performance was quite similar and I think
this means that the correct sequence of facts are not really necessarily to solve the BAbi tasks.
And I think Matt, you made a similar point on the podcast with the relational learning paper that
you can exploit some other sort of template type features to solve the BAbi tasks as opposed to
being required to do infix.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:01">

Yup. Exactly.

</Turn>


<Turn speaker="Yoon Kim" timestamp="16:03">

And then for the syntactic attention layer, ie. with the graph-baced dependency parser, we tested on
a very simple synthetic task of formula reordering where you convert from I think prefix formulas to
infix and then also natural language inference where we modified one of the existing models from
Google Ankur Parikh's decomposeable attention model to take into account what we call soft parents,
which are a convex combination of the wide vectors where the weighting is given by the parsing
marginals that you get from running the inside outside algorithm.

</Turn>


<Turn speaker="Yoon Kim" timestamp="16:43">

And in that case we observed small improvements.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:48">

Interesting. So Ankur Parikh had a version, I think you compared to this, right where you use I
think they call it an inter-sentence attention or essentially each word can soft select its head
hopefully in the same way as what you're doing. Except I thought it was interesting that you
compared to that as a baseline in most of the tasks that you did and

</Turn>


<Turn speaker="Yoon Kim" timestamp="17:14">

Right. Because for us, that was sort of the natural, that was the modeling contribution that we were
arguing for in that you could do this in sort of a naive way with a simple softmax or you can do
something maybe slightly more complicated and consider this structural dependency. So that was a way
that our baseline.

</Turn>


<Turn speaker="Matt Gardner" timestamp="17:33">

Yeah. So it made me wonder what exactly is the difference like what causes the gains that you see in
it? Am I right in thinking that it's enforcing global constraints of like, well formedness of the
tree, because in your baseline you still get some notion presumably of headedness for each word and
you get the word's head is part of the context of the word am I right in understanding what the
differences

</Turn>


<Turn speaker="Yoon Kim" timestamp="18:06">

That's right. And yeah, that's exactly right. So it's,

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:14">

Yeah, it's interesting that you can get such a big boost by enforcing the constraints. I guess

</Turn>


<Turn speaker="Yoon Kim" timestamp="18:22">

I wouldn't call it a big boost. I think on that dataset it's definitely statistically significant,
but actually it would be quite interesting to see what the gap looks like as a function of the
training data science. My conjecture is it's going to be, it's going to be bigger and earlier
training stages, but because this dataset is quite large. The soft sort of the naive softmax model
sort of learns the same types of attention that the structured attention, the marginals that you get
from structured attention. And indeed, when we looked at sort of the grid of the parsing marginals,
they were quite similar for natural language inference as opposed to the synthetic tree manipulation
task, where it was quite different.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:12">

Yeah. Yeah. I was just looking at that table in your paper and you get a much larger boost in
different kinds of attention. There's also perhaps SNLI is just too easy and you don't need the
structured attention as much. Like maybe there's some of that going on too.

</Turn>


<Turn speaker="Yoon Kim" timestamp="19:33">

Yeah. And I think we didn't pick like the best task to maybe test these models on. I think the idea
of like sort of incorporating a parser as a hidden layer is a nice thing. But yeah, it'd be
interesting to see where we could apply these types of models.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:54">

Yeah. One question I was going to ask you, I think you, we mostly already hit on this though, is
like how does this actually affect run times? So you said you get about a five X drop in performance
when you do the segmentation attention and a hundred X drop for the parsing. Do you think it's
practical to actually do this?

</Turn>


<Turn speaker="Yoon Kim" timestamp="20:14">

So these were definitely not optimized, and like it turns out when you, so a lot of these dynamic
programming algorithm, you've got to index into various parts of, you know, see a dynamic program
programming table. And that's not necessarily the fastest on a GPU. So sometimes you have to do some
of these on the CPU and there's overhead and you know, shifting these across. So I think these are
definitely not very optimized. I think in its current implementation, especially the syntactic
attention layer is probably not as practical to implement. So that paper I mentioned before, does I
think, I'm gonna see, so it's called Learning Structured Text Representations and they have some
speed comparisons. Yeah, they find that, Oh wow. So their sort of way of getting the marginals
through the matrix tree sort of matrix inversion is almost the same as simple attention to, Oh, this
is really cool actually.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="21:22">

I mean there's difference still in cubic and the length of the sentence.

</Turn>


<Turn speaker="Yoon Kim" timestamp="21:25">

Yes. So I guess, yeah, because their speed is only like, the speed they report is very similar to
the simple attention model. So it must be that on like the bottleneck is not coming from the
cubicness, but maybe from like the sort of the matrix operations.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="21:51">

They're reporting 10 times about 10 X improvement from the forward backwards. Yeah, probably makes
sense that using matrix operations is getting too much info matching their improvements on the GPO.

</Turn>


<Turn speaker="Yoon Kim" timestamp="22:05">

And this also has like a nice application of the tree attention model by, so they do a sort of a
parse tree over a document instead of a sentence. And I think that type of sort of applying what
types of inputs can be imposed, a tree structure bias to thinking about that would be a nice
application for example, can we have a parse tree over an image. What would that look like?

</Turn>


<Turn speaker="Waleed Ammar" timestamp="22:33">

Cool. So I had another question. So currently we're learning the attentions completely in an
unsupervised way. I wonder if it makes sense to in cases where we have a supervision where we know
what the segments are for some training data. Would it make sense to set up an additional objective
function and do some sort of multitask learning to learn the attention?

</Turn>


<Turn speaker="Yoon Kim" timestamp="23:00">

I think so. Yeah. so or maybe even to just initialize these layers. So actually for the natural
language inference task, we did have a setting where we obtained the pods for the sentences and that
we pre-trained the attention layer on it dependency parse on the sentence for like a one epoch to
initialize the attention later, but we found that that actually did worse than training from
scratch, which could mean that sort of the recursive structure that you get from a dependency parse
is not necessarily the best recursive structure that you want for this task. And then but yeah,
doing some sort of semi-supervised learning or having some weak supervision is, I think it makes
sense.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:50">

Do you have any notion of the, the difference in the structures learned in the pre-supervised case
versus the learning from scratch case? Does that question make sense?

</Turn>


<Turn speaker="Yoon Kim" timestamp="24:07">

Yeah. So in general we found that the attention layer is learned from training from scratch, mostly
only focused on the main verb as in we typically got the main verb correct. But the other sort of
attachments weren't as correct. Whereas with the structured attention layer that was initialized
from a pre-trained parser, it lossly preserved the parse tree of, the actual parse tree.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:39">

Interesting. yeah, I wonder if, You said that maybe the dependency parse isn't the best
representation. I wonder if we could learn something about the dataset by seeing what the model
picked out, what it decided to do with this structured representation. That'd be an interesting way
to analyze properties of datasets. I think

</Turn>


<Turn speaker="Yoon Kim" timestamp="25:01">

And the paper I mentioned before also does a more extensive analysis on the types of recursive
structures learned by these models versus ones you get from a dependency tree.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:13">

So the character of the machine translation, maybe a more direct way of [inaudible].

</Turn>


<Turn speaker="Yoon Kim" timestamp="25:18">

Yes. I think that makes, yeah, that probably makes much more sense. Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:23">

Well, cool. I think that's all the questions I had. Any last words?

</Turn>


<Turn speaker="Yoon Kim" timestamp="25:28">

No. I think you guys are doing great and yeah, keep doing it.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="25:34">

All right. Thank you so much, Yoon.

</Turn>


<Turn speaker="Yoon Kim" timestamp="25:36">

Thank you. Have a nice day.

</Turn>


<Turn speaker="Matt Gardner" timestamp="25:38">

You too.

</Turn>
