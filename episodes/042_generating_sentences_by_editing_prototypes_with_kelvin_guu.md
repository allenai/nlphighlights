---
title: "Generating Sentences by Editing Prototypes, with Kelvin Guu"
hosts: ["Matt Gardner","Waleed Ammar"]
guests: ["Kelvin Guu"]
number: "042"
tags: []
description: TODO
type: episode
---

<Turn speaker="Matt Gardner" timestamp="00:00">

Hello and welcome to the NLP highlights podcast where we talk about interesting recent work in
natural language processing.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="00:06">

This is Matt Gardner and Walleed Ammar, we our research scientists at the Allen Institute for
Artificial Intelligence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:11">

All right, so today our guest is Kelvin Guu, who is a student at Stanford that's advised by Percy
Liang, he's done work on Semitic, parsing and on knowledge graph inference, and a number of other
different things. And today we're going to talk about a paper of his title, generating sentences by
editing prototypes. Thanks for joining us Kelvin.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="00:31">

Hey, yeah, thanks for having me. Really appreciate that you're doing this NLP podcast. It's hard to
find something in this category.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:38">

I'm glad you like it.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="00:39">

Yeah. Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="00:40">

So can you tell us about what this work is doing? Like just a simple overview of what the paper's
about?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="00:47">

Yeah, sure. So the paper is called Generating Sentences by Editing Prototypes. And the title pretty
much gives the main idea. The main idea here is that we're trying to generate sentences and most
existing methods basically generate one word at a time from left to right. Although I can think of a
few very recent exceptions to that and we're proposing a new way to generate sentences where you
basically grab a sentence that you've already seen before and edit it into a new sentence. And the
main intuition there is just that we thought it would be easier to start with an existing sentence
that's already grammatical already semantically coherent and then just tweak it a little bit rather
than starting from scratch. So that's the high level idea and then, this sort of second idea in
there is that we then want to be able to control how that editor edits the sentences. So we try to
model the variation over edits using an edit vector so that you could say like, if I set that edit
vector to the word pizza, the editor would try to find a way to incorporate the word pizza into the
sentence without changing the meaning of the sentence too much.

</Turn>


<Turn speaker="Matt Gardner" timestamp="01:51">

To summarize then if I want to generate a sentence, I have some corporates of sentences that I've
already used as training data or something that I've collected somehow. And then I find a sentence
in there and then I edit it somehow. Right?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="02:04">

Exactly.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:07">

How do you actually get a probability distribution over language given this process?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="02:14">

Yeah. so the kind of generative model if you think of this as a language model, basically you first
choose uniformly from your corpus of sentences, you pick a sentence and then what happens
mechanistically basically is that sentence gets fed into a sequence-to-sequence model with
attention. That then puts a probably distribution out over new sentences, which tend to be small
variations of the sentence that you fed in.

</Turn>


<Turn speaker="Matt Gardner" timestamp="02:42">

And so when you actually want to generate like compute perplexity or something that actually
generates sentences, like I guess if, you're just generating, you can just sample a sentence and
only just pick one. But if I want to do something that's a little bit more general, I'd want to like
have like actually sample multiple sentences and combine their probabilities to somehow to get
actual probability distributions over words at each step.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="03:08">

Yeah. So if you actually wanted to compute like the full perplexity under this model that I just
described you would actually want to marginalize out over all the possible sentences you could
retrieve. But because of the way the editor works, it basically is only going to edit sentences into
things that are relatively close by in terms of some sort of edit distance. And so really you only
have to sum over the sentences that are actually close to the target sentence, whose probability you
want to evaluate.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="03:37">

So how do you pick the set of sentences that are close to the target sentence?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="03:45">

Oh yeah. So I guess now we're sort of getting into how to do like the perplexity evaluation.

</Turn>


<Turn speaker="Matt Gardner" timestamp="03:51">

Before we get into evaluation. How do you train this thing? And so this is a problem also at
training time, right? If I want to actually train the model, I need to have some scalable way of
actually computing the distribution so that I can like do a cross entropy loss over my model's
distribution versus my target distribution. Right. And so if your distribution is something over
your entire corpus, you're going to have problems.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="04:19">

Yeah. Yeah. So that, that would be computationally expensive. And so maybe I'll back up and explain
the whole training procedure, kind of give a quick run through it and then we'll sort of dive into
the details about where things are expensive and how we fix that. Okay. So kind of the first step is
a data preprocessing step. You get a big corpus of text. In our case we looked at 1 billion word,
the language modeling corpus, and we also looked at Yelp reviews because we thought that they would
have a lot of kind of reusable sentence structure. So you get that big corpus of text and then you
find all pairs of sentences that are close to each other by some edit distance. In our case we used
Jaccard distance, which is just a measure of word overlap. And you can really, you can get these
pairs whatever way you want.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="05:05">

Then the second step is you train your editor and I'll give sort of a naive version first just cause
I think it might actually be a good enough for many applications and just simpler to understand. And
then I'll kind of give the full version. So once you have these sentence pairs, what you could
really just do is train a vanilla sequence-to-sequence model going from one sentence in the pair to
the other sentence in the pair. And that would be a very basic version of the neural editor. You'd
be able to feed in a sentence and it would give you a randomly edited other sentence. And in the
paper we show that if you do that training procedure, it's a lower bound on the generative model
that we described earlier where you uniformly pick a sentence and then edit it.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="05:55">

So I think for some applications, that might be just good enough if you're just looking for sort of
roughly semantically similar sentences. But what it doesn't give you, it doesn't sort of give you
the full model in our paper in that you can't actually control the direction of the edits. So to
actually control the edits, we introduced this idea of an edit vector that's latent and to train
that we get into this variational training objective. And I can sort of dive into the details of why
we did this VA thing. Does that sound good?

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:28">

Yeah. Can I just repeat back to you how I understand this? And you can tell me if I'm right.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="06:32">

Yeah, sure.

</Turn>


<Turn speaker="Matt Gardner" timestamp="06:34">

So the model you want to distribution over language, right? And you're marginalizing out two
different things I guess, because the model goes from a prototype to the language you're trying to
generate and you don't know which prototype you should pick. That's one of the latent variables in
your model. And then your generation model also has a vector that controls the edits that you talked
about. And that's another latent variable so we have to marginalize over both of these. And I guess
now is the nitty gritty details, right, how you actually do these marginalizations. How does that
work?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="07:15">

Yeah. So to kind of answer your first question from earlier about like how do we marginalize out
over all sentences? The reason that this lower bound, there's sort of two lower bounds, one for each
latent variable in the model. So the first latent variable being the prototype and the second latent
variable being the edit vector. The, the way we deal with the marginalization over the prototype is
that we actually just select sentences that are close to the target sentence that you're trying to
predict. And so that sum is naturally not a sum over all the elements in that lower bound comes from
there. How we do the lower bound over the edit vector I can kind of talk about next.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="07:54">

So there's this variational auto-encoder involved and it's always kind of hard to explain these.
I'll try to give like the intuitive explanation that I have for it. So let's say you have some
sentence A in your dataset and it's close to sentence B and sentence C and sentence D. So then in
your training examples, you're going to get a bunch of pairs that look like A goes to B, A goes to
C, A goes to D. And when you just use basic seq2seq training on that, the model gets confused about
what you want. Like do you want A to be edited into to B, C or D? And cause it has no reason to
prefer one over another. It'll just put probability mass over all three of them. But we want to
actually control the editor so that we can pick B or C or D depending on what we want. And so the
main idea is that for each training example like A goes to B, we're going to augment it with this
extra edit vector.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="08:50">

We're going to assume that we didn't observe it, but it was there and it gives them model a hint
about what kind of edit we. So if A goes to B, the hint should somehow tell the model that it should
be out putting B and not C or D. And then the question is what should that hint be? So the hint
should, in our case, we decided the hint should tell you which words to insert and which words to
delete. And if you have a pair of sentences, you can just deterministically compute which words got
inserted and which words got deleted. We dropped like stop words and we also limitieze. So this
isn't quite as rigid as you might think. And then at a high level, the edit vector in our model is
basically just a sum of the word vectors that you inserted and sum of the word vectors that you
deleted.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="09:36">

And there's some noise added on top. And that noise is kind of where I can sort of introduce the
variational lower bound. So we've got this variational training objective that has two terms. The
first term is this thing that they usually call it reconstruction loss. And it says, if I give you
this hint about what edit I want how much log probability do you put on outputting the right thing?
And then there's the second term called the KL penalty, which is like a KL divergence and it
penalizes you for giving the hint. So if you give a very strong hint, the penalty is very large and
if you give a very weak hint, the penalty is Small. And what do I mean by like strong hints versus
weekends? So the hint is basically the sum of the word vectors that you're going to insert
concatenated with the, sum of the word vectors that you want to delete.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="10:31">

And to make that hint weaker, you basically add noise on top of that. So you can imagine that if you
add tons of noise to that vector, you've basically washed out all the original information in the
hint. And so it's very weak. And what the KL penalty is doing is it's comparing the distribution of
the hint after the noise has been added with like a totally uniform distribution. So when those two
end up being the same, the KL penalty is zero so that's the variational training objective. And the
way that mechanistically it actually gets learned is that you basically sample a hint hold it fixed
and then you do sort of a update on the sequence-to-sequence model that looks just like a supervised
update. And the KL penalty has this like closed form and in some mathematical expression that we put
in the paper. And you can take gradients with respect to that.

</Turn>


<Turn speaker="Matt Gardner" timestamp="11:27">

That was a really nice intuitive explanation. Thanks. That's really helpful.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="11:32">

Awesome.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="11:33">

Absolutely. I have some so I, I'll get back to my questions before. So when you would restrict your
set of sentences that you, set of prototypes, doesn't this give your model and advantage over just
like a regular model that just tries to generate one word at a time when it comes to a computing
it's perplexity because it already knows like what close by sentences to work from.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="11:55">

Yeah, yeah. That's a good question. So it would seem that when we're computing the perplexity we're
cheating because we can look at the target sentence, right. And part of the model involves looking
at the target sentence, computing that hint and then giving it to the editor. So the part about the
variational training objective or the variational lower bound that we're optimizing the sort of
theoretical result about it is that it's actually a lower bound on how well your model would do if
it did not receive the hint at all. And the reason that is is because in the reconstruction loss the
model gets the hint, which is unfair, but then there's the KL penalty, which penalizes you. It sort
of forces you to pay for the cost of the hint. And mathematically once you add that penalty on it's
sort of guaranteed to be a lower bound on the model's true perplexity.

</Turn>


<Turn speaker="Matt Gardner" timestamp="12:51">

Interesting. So you're reporting then in your table, you're reporting just the lower bound?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="12:57">

Yeah. So actually from perplexities point of view, it's an upper bound, sorry, it's a lower bound on
the on the log likelihood,

</Turn>


<Turn speaker="Matt Gardner" timestamp="13:08">

Interestingly, I might have to think about this a little bit more.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="13:11">

Yeah. Maybe another way I can put it is, so you've got the log likelihood under the model. And what
I mean by that is like the model that's following the generative process where it just uniformly
samples a prototype and then it samples an edit vector from the edit prior. So the edit prior
doesn't actually get to look at the output. So under that model there's some perplexity. But with
the VAE you can't actually compute that perplexity it in sort of closed form or just directly. And
so what you can get is you can get the variational lower bound of the perplexity. And that does
involve looking at the hint, but the math sort of guarantees that that thing is always worse than
the actual perplexity.

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:00">

That's really, that's really interesting. I, apparently need to look more at the, at the math of
these things. But, so it sounds then like what you're saying is if you actually were to do the
really expensive thing and actually sum over every sentence in your corpus, you would get a better
number than what we see there. Yes. You can prove this mathematically.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="14:20">

Right, right. So it's two sums. It's like a sum over all the prototypes and then you have to
integrate over all possible edit vectors, which we wouldn't want to do. Just cause we can't,

</Turn>


<Turn speaker="Matt Gardner" timestamp="14:33">

Okay. That's interesting. So how well does this actually work in practice?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="14:40">

Yeah, so I can sort of give, I can read some examples of the sort of edits that you get. I think
they're sort of interesting to look at. One place is one of the examples is we had a Yelp review
that said "quick place to grab light and tasty teriyaki." It edits that into "this place is good and
a quick place to grab a tasty sandwich." I think that example is sort of interesting because it
maintains a lot of the syntactic structure, but it did change teriyaki to sandwich. So disclaimer,
this is not just a paraphrase model. This actually will edit your sentence into potentially
something else depending on what edit vector you feed it. Some other interesting kind of experiments
that we did. I guess first of all, the sort of quantitative results from this is that in terms of
perplexity you can get pretty good perplexity on this task using this approach.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="15:38">

So if we compare it against just a plain neural language model that generates from left to right and
we looked at the sort of examples that the, our neural editing approach does well on versus the
examples that the traditional neural language model does well on. And they, they work well on
different sets of examples. So when you actually define a language model that's a mixture of these
two approaches, you get overall better perplexity than you would get with either one of them alone.
And it seems to be the case that the neural editor does especially well on some of the longer
sentences that have a lot of neighbors in the training set. And that's kind of as you would expect
because it basically is able to make small tweaks to common sentence structures that get used a lot.

</Turn>


<Turn speaker="Matt Gardner" timestamp="16:28">

That's interesting. Can we dig a little bit more into this edit vector? So you said that you
computed essentially deterministically plus some noise and edit vector that is just the difference
in words that are added and subtracted from the prototype to the target sentence, right. What are
the drawbacks of this particular choice?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="16:52">

Yeah. so I think it's a very lexical hint about what sort of changes you might want to the sentence.
One thing that earlier in the project we really wanted to try and capture as well is like maybe we
should have some sort of edit that will allow you to do a passive active transform or negate the
sentence or something interesting like that. I think extensions like that are possible. The way that
we think you could go about doing this is basically right now the in this sort of variational
training objective, we've got this Q-function or this thing that we call the approximate edit
posterior. And it's the part of the model that's taking the diff between the two sentences and
saying, Oh, these words were added and these words were deleted. It can also do other operations
such as if it could recognize a passive active transform. It could say, Oh, between these two there
was a passive active transform and you could add that into the hint as well. As long as you can
embed it in some way into the hint and then add noise you can put that into your latent vector as
well. But it does require you having the machinery to recognize what the difference was.

</Turn>


<Turn speaker="Matt Gardner" timestamp="18:07">

Right? So if I can hand code some kind of language, recognizer right, then and additionally have
some way to embed it, then I can compute this can I learn this function? Is there a problem with
that?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="18:24">

Yeah. so the earlier work on VAEs really did try to just completely learn that function. So they
would give some sort of neural network model access to both the input sentence and the output
sentence and let it sort of compute a diff in neural network space. And one of the things that at
least folk knowledge wise people have found is that it's very hard to get that model to train well.
One of the things that happens is the model initially has a very weak encoding of the diff between
the input and the output. And so that that hint that it produces is not very useful to the sequence-
to-sequence model. And the sequence-to-sequence model ends up just ignoring the hint. And once it
stops using the hint, then if you look at the variational objective, there's that KL term which
penalizes you for the hint. And the training basically says, Oh, whatever, this is not useful at
all. I'm just going to make it totally noise and completely optimize the KL part of the objective.
And then it's just going to use the sequence-to-sequence model, just like a normal sequence-to-
sequence model. So it's kind of hard to prod these models into learning interesting useful hints and
I think it's still like an interesting direction to look into. So pretty early on we decided we
wanted a very structured hint that the model would just be able to do something with.

</Turn>


<Turn speaker="Matt Gardner" timestamp="19:58">

Interesting. Could you start out with the hint that you hard-coded and have that be like a good
initialization of some learned model or like penalize some regularization so that you're at least
close to this thing?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="20:14">

Yeah, I think that's a really good point. And we are actually looking at some of these ideas right
now. Like we're trying to get a bit farther away from using lexical similarity as the implicit
distance metric that we're using. Like one intuition that we have about this approach and I think
this is really do a lot to my first co-author Tatsu. He's like a big fan of semi parametric
statistics. You can think of approaches like K nearest neighbors or kernel density estimation and
those approaches. Like you look at a point that you want to predict and you just say, well, what
training examples are nearby? And let me take their predictions and just average them together. And
you can do that if you're just predicting a scaler, but you can't do that if you're trying to
predict a sentence.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="21:01">

And what we're trying to do is like kind of do the analog of K nearest neighbors for sentences and
structured prediction.

</Turn>


<Turn speaker="Matt Gardner" timestamp="21:09">

That's interesting.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="21:10">

Yeah. Yeah.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="21:11">

What are some applications of this way of doing language modeling? Like potentially what kind of
tasks can we include this kind of language modeling.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="21:22">

Yeah. so I'm actually most excited about extending this stuff to the conditional generation case
where you've got some sort of context. Like if you're in a dialogue, somebody has said a few things
already and now you want to generate a sentence that's conditioned on that context. I think dialogue
applications like customer service where people are saying almost the same thing over and over again
could be quite nice. Like, you know, I'm so sorry that your product was like not shipped on time and
then you just want to like edit the name that you're referring to or like the product that you're
referring to.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="21:59">

It kind of gets into this territory where templates would have almost gotten us there, but then
maintaining a sophisticated set of templates is actually pretty hard in practice. So you'd like to
be able to just lightly edit things.

</Turn>


<Turn speaker="Matt Gardner" timestamp="22:13">

Yeah. It sounds like a hard thing to do there is getting a prototype though, right? Like you had a
relatively easy time in perplexity, when computing perplexity because you knew the target you were
trying to generate, you just had to calculate the probability for it. Whereas in an actual real
dialogue, how do I get a prototype? There's no target to condition on. I have to generate that
myself. Right? So how do I get it?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="22:41">

Oh, yeah. So I think this, this seems to rise because like we're now in the conditional setting
maybe, and it's not so clear where the prototype comes from. One thing we've been thinking about, we
haven't done this yet, is let's say you already had a retrieval system that you trained on a bunch
of dialogue response pairs. You could take a new input, get something from the retrieval system and
then compare what the retrieval system output it versus the gold sentence. And if the retrieval
system is not completely overfit what it returns is not going to be exactly the same as the gold
sentence, but it's going to be hopefully close. And so that output and the true gold sentence
becomes an edit pair that you can then train on. So then what your editor would be learning is
basically how to fix up the output of the retrieval system.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:35">

Yeah, I guess I'm thinking more like how do I generate without a gold target at all?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="23:42">

Oh like just at test time.

</Turn>


<Turn speaker="Matt Gardner" timestamp="23:43">

Yeah. And I guess in that case, just sample from your corpus, right? But put in the conditional
case, you want to sample given some conditional vector, right?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="23:53">

Yeah. So in the conditional case, you would basically get your context, like maybe some of the
earlier things that the customer said and then you run your retrieval system, you get a bunch of
possible responses back and you could either just take the top one and edit it or you could sample
them and edit it. And in this case you would want to actually condition the editor on the context
too, so that it like knows who it's talking to.

</Turn>


<Turn speaker="Matt Gardner" timestamp="24:18">

Right? Yeah. I guess if you want to do machine translation or anything, the tricky thing is, is
deciding how do I get the prototype in this setting when I'm actually at test time trying to produce
something.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="24:31">

Right? Right.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="24:33">

If you stick to tasks where there is like a notion of prototype and like we can get a sense of this
by looking at previous examples, I think that makes a lot of sense. In fact, I'm pretty sure that
most of the commercial applications for this actually use prototypes to generate the next sentence.
and just fills in the slots.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="24:53">

Oh yeah, yeah, yeah. Actually like, one thing that we were thinking about which would be kind of
interesting is in our current approach we just find all pairs of sentences that are close in some
sort of lexical distance metric. We were thinking that in some applications you might have like a
controlled set of things you actually want to talk about. So you might already have a set of
templates, maybe a hundred of them. And then the way we would actually collect the edit pairs is we
would take all of the actual responses generated by real customer service agents and just map those
to one of the templates. So all the utterances are paired up with one of the templates. And the nice
thing about that is if you have a hundred templates, you can annotate them with additional semantic
information about like, Oh, when is this template appropriate, when is that template appropriate?
And when you go to generate, you can have explicit control over which sorts of templates you
retrieve as the prototype at certain points in time. So if like there's a certain response that you
really don't want, you just simply don't retrieve that prototype and the editor will never start
with that as it's starting sentence.

</Turn>


<Turn speaker="Matt Gardner" timestamp="26:03">

Interesting. You could also imagine if you're annotating for a given utterance, what it's prototype
is, you could also annotate the edit. If you want to go to more fancy kinds of edit models than just
word insertion and deletion and you're willing to annotate this, then just annotate something more
interesting about the edit from template to template.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="26:24">

Yeah, yeah, yeah. Yeah, cause what we're really trying to do here is kind of decompose the model
more so we can get more interpretability out of it. Yeah. And I think that having the prototype
gives you a little bit more sense of where the model was coming from. .

</Turn>


<Turn speaker="Matt Gardner" timestamp="26:42">

Interesting. So in a previous example that we talked about earlier. You said a customer service
agent might want to mention a particular person's name or a product but your model only uses, say
the most frequent 10,000 words in your vocabulary as its outputs. So actually you probably wouldn't
be able to generate a particular product name or a person's name. So did you use it? Did you try any
kind of copy mechanism? Is that just a simple, straightforward addition to your model?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="27:16">

Yeah, pretty much. You can just add a copy mechanism to the editor part and really you can swap out
the sequence-to-sequence model that we have with any of the latest new cool things that you can use
to do sequences-to-sequence. Yeah.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="27:30">

Cool. Would it make sense to use the prototype and edit mechanism to kind of concatenate a first
extract? So if I'm trying to make a summary, but I don't want to just like put together some of the
sentences that put into in the original document. Can I use first you some extracted summarization
method to pick the sentences that are actually important and then use the, basically I already have
the prototype and then I just need to edit it.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="28:02">

Oh yeah, that's actually a really cool idea that I hadn't been thinking about. I think that'd be
really interesting as well. Yeah.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="28:12">

Yeah. I guess I there's no clear way of like defining what the prototype, sorry, what the edit
vector would look like there. But we can think about that.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="28:22">

Yeah. Yeah. I mean it might actually be summarization might be one of the better places to use this
sort of edit vector we have because the lexical elements that you drop kind of lead to you doing
some form of sentence compression on the sentence. One of the experiments we did was we wanted to
kind of look at the properties of the edit vector and, and sort of whether it's actually
semantically interpretable. So we looked at this in a few ways. One of them was we took a sentence
and we would repeatedly edited using randomly drawn edit vectors. So you're kind of taking a random
walk in sentence space and you can kind of do this thing where you either accept the next thing that
happens or you rejected. And we can kind of incrementally shorten the sentence over a few steps and
each of the points along that path are very highly similar sentences.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="29:21">

Yeah, that's pretty cool.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="29:22">

Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="29:23">

Was there anything interesting you want to tell us about from your experiments on querying the
semantics of this edit vector?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="29:31">

Let's see. So one thing that we are still trying to think about which is sort of full disclaimer, is
that this model doesn't just generalize to new domains of texts. So just because it is editor, it
doesn't mean that it can edit any form of text. We've noticed that if you train it just on the Yelp
corpus for example, and then you go and you try to edit some Newswire texts you know, you'll start
with some event about wall street stocks and then it'll sort of bias itself towards making some kind
of comment about the wall street stocks or something about food that really isn't desirable.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:10">

That's really interesting. And actually I wonder if if you had added a copy mechanism, if it would
be less prone to doing that.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="30:16">

Yes, I'm definitely getting that signal strong and clear from you Matt.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:24">

I don't, it's just my intuition. I wonder if that would actually help this problem.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="30:28">

Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="30:29">

And anyway, sorry, I interrupted you. You were telling us something interesting.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="30:33">

Oh, sure. Yeah. So that was, that was one of the things we were looking at. Another experiment that
we did was we tried to do sentence analogies with this approach and we're basically trying to do it
in the same set up that you do word analogies. So like the standard word vector evaluation task
where you have better and best and bad and worse. What we tried to do is we took all of these
analogy pairs that are already in the existing evaluations for word vectors and we tried to find
edit pairs in the Yelp corpus that were different by exactly these words. So maybe an example of
this would be one sentences "I've had better service at Denny's" and then the other one is "best
service I've had at Denny's." So there are different just by adding a worst and subtracting worse.
So we tried to see if our model we could give it that edit vector of plus worst minus worse and to
see if it could perform that transformation. Basically kind of make the sentence more extreme. And
it does actually seem to be able to do that to some extent, which was kind of interesting.

</Turn>


<Turn speaker="Matt Gardner" timestamp="31:51">

Does it matter which superlative comparative pair you give it? Cause I was a little confused by this
when I read the example cause you have better and best in this actual sentences but worse than worse
in the edit.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="32:05">

Yeah. So I think what's interesting about that example is it's not actually just inserting worst and
deleting worse. It's actually taking the word better and converting it to best.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:18">

I know and just to be clear, the edit vector you were giving it is you're taking the word vector for
worst and the word vector for worse, worse and worst. That is the vector you're giving it. And yeah,
that's really interesting. I guess this makes me think of like the intuition behind the GloVe
embeddings that really is just log PMI counts and like, I guess it's not just the GloVe embedding,
but like the notion of word analogies in vector space in general that the difference between worst
and worse is the same as the difference between best and better.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="32:52">

Yeah. Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="32:53">

It's interesting that your model can capture that just in the edit vector itself. Like, that's
actually kind of interesting to me just because of the mechanics of like this concatenation, you're
not even doing anything fancy other than to concat between these two factors.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="33:07">

Yeah. In fact, I think it's the fact that we're not doing anything too fancy that allows us to kind
of lift word vector analogies up into sentence analogies. Because all this sort of linear properties
still hold with that edit factor.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="33:22">

May I clarify something? I thought that what you're doing here is to fill in the first half of the
edit vector by the positive of like the worst of the embedding for the words worst and the second
half of the edit vector by the negative one multiplied by the embedding for worse, which kind of
mimics what you had like that posterior distribution you hadfor the edit vector. Is that what you're
doing or is it just like the difference between the two vectors?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="33:53">

Oh yeah, it is actually in the format that you described, which is that we're concatenating the
insert and the delete. Okay. So actually, yeah, that's, that's a good point. Then we're not doing it
in the same way that the word vector analogies would normally have. You do it. Yeah.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:08">

Yeah. And it, yeah, it's just really interesting to me that it works this way. It's almost a little
magical. I guess if you were to like really look at the linear algebra probably it would fall out,
but it's just interesting that the model just recovers this.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="34:21">

But that's exactly how we define the posterior distribution for the edit distance. So I don't see
why this is surprising that that's exactly how they to distance the edit vector is constructed while
you're training the model.

</Turn>


<Turn speaker="Matt Gardner" timestamp="34:33">

The interesting thing to me is that It's able to capture the notion of the difference between
comparative and superlative in an abstract way that like we know that word vectors do this. When you
do differences between these vectors they capture word analogies. We know this,

</Turn>


<Turn speaker="Waleed Ammar" timestamp="34:57">

But that comes directly from that property of the word embedding, oh, you're saying. I guess that's
a more insight question for Kelvin, whether you train the embeddings for the words or you take the
embeddings coming from GloVe, which would inherit these property basically.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="35:12">

Yeah, so we actually did initialize these with GloVe embeddings. So I think that that certainly
explains part of it. I am actually still a little bit surprised at the model does this myself,
because I could imagine, I could easily imagine that the model would do something such as it would
just ignore the deletion of worse because worse is not in the original sentence. And then it would
just try to worst to the, to the new sentence. So it might say something terrible, like I've had
better worst service at Denny's. But it doesn't do that. And I wonder if part of that is just that
it has a very strong prior about what sorts of sentences it can produce and better, worse. It's just
not something it could produce. And so it's best alternative is to go for this superlative change
instead. But hat's just speculation.

</Turn>


<Turn speaker="Matt Gardner" timestamp="36:06">

How consistent is this? Like you've shown two small examples here, can you really reproduce this
across a large range of sentences and even just with like comparative versus a superlative, can you
reliably change this with the edit vector?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="36:24">

Yeah. So if you look at our table results for the edit vectors, we can do this to some extent, but
it's not at the same level of accuracy that GloVe does for some of the different categories. Like
maybe to just throw some numbers in the air here GloVe is sort of 0.8 on certain sort of adjective
transformations and our edit is 0.4. Even when you look at the top 10 sentences generated by our
model. So we're definitely not making the claim that it's at the same strength as GloVe.

</Turn>


<Turn speaker="Matt Gardner" timestamp="36:58">

But yeah, I agree with you that it's really interesting that you can even do this at all. That's
pretty cool.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="37:03">

How about the simpler requirement of if defined edit vector to be just removing a particular word
that appears in the prototype, does it consistently remove it from the output or if you add an
additional word and just don't remove anything till it consistently add it.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="37:22">

Yeah. We were actually going to add some more experimental results to a revision of the paper
showing how consistently we could do that kind of thing. It's actually pretty consistent. But we
it's not as consistent as we could actually optimize it to be, because one of the things that the KL
penalty does is in the variational objective is it actually regularizes the model so that it doesn't
become overly dependent on the hint. That actually gives it a little bit more flexibility in what it
chooses to add and delete. It's good for generalization, but maybe not as good if you wanted fine
grain control of what enters in what leaves.

</Turn>


<Turn speaker="Matt Gardner" timestamp="38:02">

Well, cool. This was a really interesting conversation. I think this idea of generating from
prototypes instead of just from scratch is. Really cool. And has a lot of potential do you have any
last thoughts before we conclude?

</Turn>


<Turn speaker="Kelvin Guu" timestamp="38:17">

Yeah, maybe I'll throw a thought out there. I'm really excited about generative models of texts, not
just for like end goals of the end goal of generating texts that a human will consume. I think it's
actually a really interesting direction for producing more interpretable NLP models. Like if they
generate text as intermediate step in the process of reasoning about other things. And I'm kind of
looking into stuff on that right now. I just think it's a really exciting area.

</Turn>


<Turn speaker="Waleed Ammar" timestamp="38:45">

Perfect. Thank you very much for joining us.

</Turn>


<Turn speaker="Kelvin Guu" timestamp="38:47">

Yeah, thanks guys. Thanks for hosting the show.

</Turn>


<Turn speaker="Matt Gardner" timestamp="38:50">

Thanks.

</Turn>
